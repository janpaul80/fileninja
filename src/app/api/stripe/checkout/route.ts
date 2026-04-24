import { NextResponse, type NextRequest } from "next/server";
import { getStripe, priceIdFor } from "@/lib/stripe";
import { createClient, createAdminClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

function siteOrigin(request: NextRequest) {
  // Prefer the actual request host so dev (localhost) and prod both work
  // without requiring NEXT_PUBLIC_SITE_URL to be perfectly synced.
  const proto = request.headers.get("x-forwarded-proto") || "http";
  const host = request.headers.get("host");
  if (host) return `${proto}://${host}`;
  return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3005";
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const plan = (body.plan || "").toString().toLowerCase();
    const cycle = (body.cycle || "monthly").toString().toLowerCase();

    if (plan !== "basic" && plan !== "pro") {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }
    if (cycle !== "monthly" && cycle !== "yearly") {
      return NextResponse.json({ error: "Invalid cycle" }, { status: 400 });
    }

    const priceId = priceIdFor(plan as "basic" | "pro", cycle as "monthly" | "yearly");
    if (!priceId) {
      return NextResponse.json(
        {
          error: `Missing Stripe price ID for ${plan} / ${cycle}. Run scripts/stripe-setup.sh and fill .env.local.`
        },
        { status: 500 }
      );
    }

    const supabase = createClient();
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
      const origin = siteOrigin(request);
      const next = `/pricing?plan=${plan}&cycle=${cycle}`;
      return NextResponse.json(
        {
          error: "unauthenticated",
          redirect: `${origin}/login?next=${encodeURIComponent(next)}`
        },
        { status: 401 }
      );
    }

    const stripe = getStripe();
    const admin = createAdminClient();

    // Look up or create a Stripe customer tied to this user.
    const { data: profile } = await admin
      .from("profiles")
      .select("stripe_customer_id, full_name")
      .eq("id", user.id)
      .maybeSingle();

    let customerId: string | undefined = profile?.stripe_customer_id || undefined;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email!,
        name:
          profile?.full_name ||
          (user.user_metadata?.full_name as string | undefined) ||
          undefined,
        metadata: { supabase_user_id: user.id }
      });
      customerId = customer.id;
      await admin
        .from("profiles")
        .upsert(
          { id: user.id, stripe_customer_id: customerId, full_name: profile?.full_name ?? null },
          { onConflict: "id" }
        );
    }

    const origin = siteOrigin(request);
    let session;
    try {
      session = await stripe.checkout.sessions.create({
        mode: "subscription",
        customer: customerId,
        line_items: [{ price: priceId, quantity: 1 }],
        allow_promotion_codes: true,
        billing_address_collection: "auto",
        success_url: `${origin}/dashboard?checkout=success`,
        cancel_url: `${origin}/pricing?checkout=cancelled`,
        subscription_data: {
          metadata: {
            supabase_user_id: user.id,
            plan,
            cycle
          }
        },
        metadata: {
          supabase_user_id: user.id,
          plan,
          cycle
        }
      });
    } catch (err: any) {
      // If the customer ID exists but is from the wrong mode (Test vs Live), 
      // Stripe throws a 'No such customer' error. 
      if (err.message?.includes("No such customer")) {
        // Clear the invalid ID from the profile
        await admin.from("profiles").update({ stripe_customer_id: null }).eq("id", user.id);
        
        // Retry creating the session WITHOUT a customer ID (it will create a new one)
        session = await stripe.checkout.sessions.create({
          mode: "subscription",
          customer_email: user.email!,
          line_items: [{ price: priceId, quantity: 1 }],
          allow_promotion_codes: true,
          billing_address_collection: "auto",
          success_url: `${origin}/dashboard?checkout=success`,
          cancel_url: `${origin}/pricing?checkout=cancelled`,
          subscription_data: {
            metadata: {
              supabase_user_id: user.id,
              plan,
              cycle
            }
          },
          metadata: {
            supabase_user_id: user.id,
            plan,
            cycle
          }
        });
      } else {
        throw err;
      }
    }

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("[stripe/checkout] error:", err?.message || err);
    return NextResponse.json(
      { error: err?.message || "Checkout failed" },
      { status: 500 }
    );
  }
}

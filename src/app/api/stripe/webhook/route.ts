import { NextResponse, type NextRequest } from "next/server";
import type Stripe from "stripe";
import { getStripe, planFromPriceId } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";
// Stripe needs the raw request body for signature verification
export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const sig = request.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig) {
    return NextResponse.json({ error: "missing signature" }, { status: 400 });
  }
  if (!secret) {
    return NextResponse.json(
      { error: "STRIPE_WEBHOOK_SECRET not set" },
      { status: 500 }
    );
  }

  const stripe = getStripe();
  const rawBody = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, secret);
  } catch (err: any) {
    console.error("[stripe/webhook] signature verify failed:", err?.message);
    return NextResponse.json({ error: "invalid signature" }, { status: 400 });
  }

  const admin = createAdminClient();

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId =
          (session.metadata?.supabase_user_id as string | undefined) || null;
        const customerId =
          (typeof session.customer === "string"
            ? session.customer
            : session.customer?.id) || null;
        const plan = (session.metadata?.plan as string) || "pro";
        const cycle = (session.metadata?.cycle as string) || "monthly";

        if (userId) {
          await admin.from("profiles").upsert(
            {
              id: userId,
              stripe_customer_id: customerId,
              plan,
              billing_cycle: cycle
            },
            { onConflict: "id" }
          );
        }
        break;
      }

      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const sub = event.data.object as Stripe.Subscription;
        const customerId =
          typeof sub.customer === "string" ? sub.customer : sub.customer.id;
        const priceId = sub.items.data[0]?.price?.id;
        const meta = priceId ? planFromPriceId(priceId) : null;
        const plan = meta?.plan || (sub.metadata?.plan as string) || "pro";
        const cycle =
          meta?.cycle || (sub.metadata?.cycle as string) || "monthly";
        const status = sub.status;
        // `current_period_end` exists at runtime; cast for type defs that omit it.
        const periodEndSec = (sub as any).current_period_end as number | undefined;
        const periodEnd = periodEndSec
          ? new Date(periodEndSec * 1000).toISOString()
          : null;

        const active = status === "active" || status === "trialing";

        await admin
          .from("profiles")
          .update({
            plan: active ? plan : "free",
            billing_cycle: active ? cycle : null,
            plan_expires_at: periodEnd,
            subscription_status: status
          })
          .eq("stripe_customer_id", customerId);
        break;
      }

      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        const customerId =
          typeof sub.customer === "string" ? sub.customer : sub.customer.id;
        await admin
          .from("profiles")
          .update({
            plan: "free",
            billing_cycle: null,
            plan_expires_at: null,
            subscription_status: "canceled"
          })
          .eq("stripe_customer_id", customerId);
        break;
      }

      default:
        // Unhandled event — ack to stop retries.
        break;
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error("[stripe/webhook] handler error:", err?.message || err);
    return NextResponse.json({ error: "handler_failed" }, { status: 500 });
  }
}

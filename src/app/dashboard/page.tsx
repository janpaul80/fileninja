import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient, createAdminClient } from "@/lib/supabase/server";
import { signOut } from "@/app/auth/actions";
import { CheckIcon } from "@/components/icons";
import ManageBillingButton from "./ManageBillingButton";

export const dynamic = "force-dynamic";

type Profile = {
  id: string;
  plan: "free" | "basic" | "pro";
  billing_cycle: "monthly" | "yearly" | null;
  plan_expires_at: string | null;
  stripe_customer_id: string | null;
  full_name: string | null;
};

async function getProfile(userId: string): Promise<Profile | null> {
  try {
    // Use admin so we don't need RLS policies configured for first-run demo.
    const admin = createAdminClient();
    const { data } = await admin.from("profiles").select("*").eq("id", userId).maybeSingle();
    return (data as Profile) ?? null;
  } catch {
    return null;
  }
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams?: { upgrade?: string; checkout?: string };
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login?next=/dashboard");

  const profile = await getProfile(user.id);
  const plan = profile?.plan || "free";
  const billingCycle = profile?.billing_cycle;
  const displayName =
    profile?.full_name ||
    (user.user_metadata?.full_name as string | undefined) ||
    user.email?.split("@")[0] ||
    "Ninja";

  const pendingUpgrade = searchParams?.upgrade;
  const checkoutSuccess = searchParams?.checkout === "success";

  return (
    <section className="min-h-screen pt-28 pb-20 bg-brand-bg">
      <div className="container-fn max-w-6xl">
        <div className="flex items-start justify-between gap-6 flex-wrap">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-brand-red font-semibold mb-3">
              Dashboard
            </p>
            <h1 className="h-display text-4xl sm:text-5xl text-brand-ink">
              Welcome back,
              <br />
              <span className="text-brand-red">{displayName}.</span>
            </h1>
            <p className="mt-3 text-brand-ink/60 font-light">
              Signed in as <span className="font-medium text-brand-ink/80">{user.email}</span>
            </p>
          </div>
          <form action={signOut}>
            <button
              type="submit"
              className="rounded-full border border-brand-grayLight bg-white px-5 py-2.5 text-sm font-medium text-brand-ink hover:border-brand-ink/30 transition"
            >
              Sign out
            </button>
          </form>
        </div>

        {checkoutSuccess && (
          <div className="mt-8 rounded-2xl bg-brand-teal/10 border border-brand-teal/30 px-5 py-4 text-brand-tealDark flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-brand-teal text-white flex items-center justify-center flex-shrink-0">
              <CheckIcon size={16} />
            </span>
            <div>
              <p className="font-semibold">Welcome to Pro.</p>
              <p className="text-sm opacity-80">
                Your subscription is active. Thanks for supporting Fileninja.
              </p>
            </div>
          </div>
        )}

        {pendingUpgrade && pendingUpgrade !== "free" && plan === "free" && (
          <div className="mt-8 rounded-2xl bg-brand-red/8 border border-brand-red/25 px-5 py-4 flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="font-semibold text-brand-ink">Finish upgrading to {pendingUpgrade}</p>
              <p className="text-sm text-brand-ink/65 font-light">
                Complete checkout to unlock all {pendingUpgrade} features.
              </p>
            </div>
            <Link href={`/pricing?plan=${pendingUpgrade}`} className="btn-primary">
              Go to checkout
            </Link>
          </div>
        )}

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Plan card */}
          <div className="md:col-span-2 bg-white rounded-2xl p-7 border border-brand-grayLight/60 shadow-card">
            <p className="text-xs uppercase tracking-[0.22em] text-brand-ink/50 font-semibold mb-2">
              Current plan
            </p>
            <div className="flex items-baseline gap-3 flex-wrap">
              <h2 className="font-display font-extrabold text-3xl text-brand-ink capitalize">
                {plan}
              </h2>
              {billingCycle && (
                <span className="text-brand-ink/50 text-sm">
                  billed {billingCycle}
                </span>
              )}
              {plan === "free" && (
                <span className="text-xs uppercase tracking-wider px-2 py-1 rounded-full bg-brand-grayLight text-brand-ink/60">
                  Forever free
                </span>
              )}
            </div>

            {profile?.plan_expires_at && (
              <p className="mt-2 text-sm text-brand-ink/60">
                Renews on{" "}
                <span className="font-medium text-brand-ink/80">
                  {new Date(profile.plan_expires_at).toLocaleDateString()}
                </span>
              </p>
            )}

            <div className="mt-6 flex gap-3 flex-wrap">
              {plan === "free" ? (
                <Link href="/pricing" className="btn-primary">
                  Upgrade plan
                </Link>
              ) : (
                <>
                  {profile?.stripe_customer_id ? (
                    <ManageBillingButton />
                  ) : (
                    <Link href="/pricing" className="btn-primary">
                      Manage plan
                    </Link>
                  )}
                  <Link
                    href="/pricing"
                    className="rounded-full border border-brand-grayLight bg-white px-5 py-2.5 text-sm font-medium text-brand-ink hover:border-brand-ink/30 transition"
                  >
                    Change plan
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Usage card */}
          <div className="bg-white rounded-2xl p-7 border border-brand-grayLight/60 shadow-card">
            <p className="text-xs uppercase tracking-[0.22em] text-brand-ink/50 font-semibold mb-2">
              Usage this month
            </p>
            <p className="font-display font-extrabold text-3xl text-brand-ink">0 GB</p>
            <p className="text-sm text-brand-ink/55 mt-1">
              {plan === "free" ? "of 5 GB free tier" : "unlimited on " + plan}
            </p>
            <div className="mt-4 h-2 rounded-full bg-brand-grayLight overflow-hidden">
              <div className="h-full w-0 bg-gradient-to-r from-brand-teal to-brand-red" />
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="mt-10">
          <p className="text-xs uppercase tracking-[0.22em] text-brand-ink/50 font-semibold mb-4">
            Quick actions
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/"
              className="group bg-white rounded-2xl p-6 border border-brand-grayLight/60 shadow-card hover:shadow-soft hover:-translate-y-0.5 transition-all"
            >
              <p className="font-display font-bold text-brand-ink text-lg mb-1">
                Send files
              </p>
              <p className="text-sm text-brand-ink/55 font-light">
                Drag and drop to start a transfer
              </p>
            </Link>
            <Link
              href="/pricing"
              className="group bg-white rounded-2xl p-6 border border-brand-grayLight/60 shadow-card hover:shadow-soft hover:-translate-y-0.5 transition-all"
            >
              <p className="font-display font-bold text-brand-ink text-lg mb-1">
                Pricing & plans
              </p>
              <p className="text-sm text-brand-ink/55 font-light">
                Compare what's included on each plan
              </p>
            </Link>
            <a
              href="mailto:support@fileninja.cloud"
              className="group bg-white rounded-2xl p-6 border border-brand-grayLight/60 shadow-card hover:shadow-soft hover:-translate-y-0.5 transition-all"
            >
              <p className="font-display font-bold text-brand-ink text-lg mb-1">
                Contact support
              </p>
              <p className="text-sm text-brand-ink/55 font-light">
                We usually reply within a few hours
              </p>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

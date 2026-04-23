"use client";

import * as React from "react";
import Link from "next/link";
import { CheckIcon, XIcon, SparkleIcon } from "./icons";

type Feature = { label: string; value: string | boolean };

type Tier = {
  id: "free" | "basic" | "pro";
  name: string;
  tagline: string;
  monthly: number;
  yearly: number;
  yearlySavings?: string;
  highlight?: boolean;
  cta: string;
  ctaHref?: string;
  features: Feature[];
};

const TIERS: Tier[] = [
  {
    id: "free",
    name: "Free",
    tagline: "Quick transfers, zero friction.",
    monthly: 0,
    yearly: 0,
    cta: "Get started",
    ctaHref: "/signup",
    features: [
      { label: "File size per transfer", value: "5 GB" },
      { label: "Transfers per month", value: "20" },
      { label: "File expiry", value: "7 days" },
      { label: "Personal vault storage", value: "2 GB" },
      { label: "Password protection", value: true },
      { label: "Download tracking", value: true },
      { label: "Transfer history", value: "7 days" },
      { label: "No account needed", value: true },
      { label: "Mobile app access", value: true },
      { label: "Ads", value: "Full-page" }
    ]
  },
  {
    id: "basic",
    name: "Basic",
    tagline: "More room. No interruptions.",
    monthly: 4.99,
    yearly: 47.99,
    yearlySavings: "save 20%",
    cta: "Start with Basic",
    features: [
      { label: "File size per transfer", value: "50 GB" },
      { label: "Transfers per month", value: "Unlimited" },
      { label: "Monthly transfer cap", value: "500 GB" },
      { label: "File expiry", value: "30 days" },
      { label: "Personal vault storage", value: "100 GB" },
      { label: "Password protection", value: true },
      { label: "Custom transfer page", value: true },
      { label: "Download tracking", value: true },
      { label: "Transfer history", value: "Unlimited" },
      { label: "File request link", value: true },
      { label: "Email customization", value: true },
      { label: "Ads", value: "None" },
      { label: "API access", value: "100 calls/day" },
      { label: "Priority support", value: true }
    ]
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "For creators who send a lot.",
    monthly: 12.99,
    yearly: 99.99,
    yearlySavings: "save 36%",
    highlight: true,
    cta: "Start with Pro",
    features: [
      { label: "File size per transfer", value: "Unlimited" },
      { label: "Transfers per month", value: "Unlimited" },
      { label: "Monthly transfer cap", value: "Unlimited" },
      { label: "File expiry", value: "Never" },
      { label: "Personal vault storage", value: "2 TB" },
      { label: "Password protection", value: true },
      { label: "Custom branding + domain", value: true },
      { label: "Download tracking", value: true },
      { label: "Transfer history", value: "Unlimited" },
      { label: "File request portals", value: "Unlimited" },
      { label: "Full API access", value: "Unlimited calls" },
      { label: "Custom email domain", value: true },
      { label: "Zip on download", value: true },
      { label: "Webhook support", value: true },
      { label: "Preview before download", value: true },
      { label: "Virus scan badge", value: true },
      { label: "Priority support", value: true }
    ]
  }
];

function FeatureRow({ feature }: { feature: Feature }) {
  const isBool = typeof feature.value === "boolean";
  const enabled = isBool ? (feature.value as boolean) : true;

  return (
    <li className="flex items-start gap-3 text-sm">
      <span
        className={`shrink-0 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center ${
          enabled
            ? "bg-brand-teal/15 text-brand-teal"
            : "bg-brand-ink/5 text-brand-ink/30"
        }`}
      >
        {enabled ? <CheckIcon size={13} /> : <XIcon size={13} />}
      </span>
      <span className="flex-1 flex flex-wrap items-baseline justify-between gap-x-3">
        <span className={enabled ? "text-brand-ink/85" : "text-brand-ink/40"}>
          {feature.label}
        </span>
        {!isBool && (
          <span className="text-brand-ink font-semibold text-[13px]">
            {feature.value as string}
          </span>
        )}
      </span>
    </li>
  );
}

export default function PricingCards() {
  const [yearly, setYearly] = React.useState(true);
  const [pending, setPending] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  async function startCheckout(plan: "basic" | "pro") {
    setError(null);
    setPending(plan);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, cycle: yearly ? "yearly" : "monthly" })
      });

      const json = await res.json().catch(() => ({}));

      if (res.status === 401 && json.redirect) {
        // Use only the path portion so we stay on the current origin
        // (avoids stale NEXT_PUBLIC_SITE_URL leaking through in dev).
        try {
          const u = new URL(json.redirect, window.location.origin);
          window.location.href = u.pathname + u.search;
        } catch {
          window.location.href = "/login";
        }
        return;
      }
      if (res.ok && json.url) {
        window.location.href = json.url;
        return;
      }
      // Stripe not configured yet — fall back to signup with intended plan.
      if (json?.error?.toLowerCase?.().includes("stripe")) {
        window.location.href = `/signup?plan=${plan}&cycle=${yearly ? "yearly" : "monthly"}`;
        return;
      }
      setError(json.error || "Checkout failed. Please try again.");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setPending(null);
    }
  }

  return (
    <div>
      {/* Billing toggle */}
      <div className="flex items-center justify-center gap-4 mb-12">
        <span
          className={`text-sm font-medium transition-colors ${
            !yearly ? "text-brand-ink" : "text-brand-ink/50"
          }`}
        >
          Monthly
        </span>
        <button
          onClick={() => setYearly((y) => !y)}
          className="relative w-14 h-7 rounded-full bg-brand-ink/15 transition-colors"
          aria-label="Toggle billing period"
        >
          <span
            className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-brand-red shadow-md transition-transform duration-300 ${
              yearly ? "translate-x-7" : "translate-x-0"
            }`}
          />
        </button>
        <span
          className={`text-sm font-medium transition-colors ${
            yearly ? "text-brand-ink" : "text-brand-ink/50"
          }`}
        >
          Yearly
          <span className="ml-2 text-[11px] uppercase tracking-wider bg-brand-teal/15 text-brand-teal px-2 py-0.5 rounded-full font-semibold">
            Save up to 36%
          </span>
        </span>
      </div>

      {error && (
        <div className="max-w-xl mx-auto mb-8 rounded-xl bg-brand-red/10 border border-brand-red/25 px-4 py-3 text-sm text-brand-red text-center">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
        {TIERS.map((tier) => {
          const price = yearly ? tier.yearly : tier.monthly;
          const period = yearly ? "/year" : "/month";
          const isFree = tier.id === "free";
          const isPending = pending === tier.id;

          return (
            <div
              key={tier.id}
              className={`pricing-card relative flex flex-col rounded-3xl p-8 bg-white border ${
                tier.highlight
                  ? "border-brand-red shadow-soft lg:scale-[1.03] lg:-my-2 z-10"
                  : "border-brand-grayLight/70"
              }`}
            >
              {tier.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 bg-brand-red text-white text-[11px] uppercase tracking-[0.18em] font-bold px-3 py-1.5 rounded-full shadow-md">
                    <SparkleIcon size={12} />
                    Most popular
                  </span>
                </div>
              )}

              <h3 className="font-display font-extrabold text-2xl text-brand-ink">
                {tier.name}
              </h3>
              <p className="text-brand-ink/60 text-sm mt-1.5 font-light">
                {tier.tagline}
              </p>

              <div className="mt-6 flex items-baseline gap-1.5">
                <span className="text-5xl font-display font-extrabold text-brand-ink tracking-tightest">
                  ${isFree ? "0" : price.toFixed(2)}
                </span>
                {!isFree && (
                  <span className="text-brand-ink/55 text-sm font-medium">
                    {period}
                  </span>
                )}
              </div>
              {yearly && tier.yearlySavings && !isFree && (
                <p className="text-xs text-brand-teal font-semibold mt-1.5 uppercase tracking-wider">
                  {tier.yearlySavings}
                </p>
              )}
              {isFree && (
                <p className="text-xs text-brand-ink/45 font-medium mt-1.5 uppercase tracking-wider">
                  Forever free
                </p>
              )}

              {isFree ? (
                <Link
                  href={tier.ctaHref || "/signup"}
                  className={`mt-7 ${tier.highlight ? "btn-primary" : "btn-dark"} w-full justify-center`}
                >
                  {tier.cta}
                </Link>
              ) : (
                <button
                  onClick={() => startCheckout(tier.id as "basic" | "pro")}
                  disabled={isPending || pending !== null}
                  className={`mt-7 ${tier.highlight ? "btn-primary" : "btn-dark"} w-full justify-center disabled:opacity-60`}
                >
                  {isPending ? "Redirecting…" : tier.cta}
                </button>
              )}

              <div className="mt-8 pt-8 border-t border-brand-grayLight/70 flex-1">
                <ul className="space-y-3.5">
                  {tier.features.map((f) => (
                    <FeatureRow key={f.label} feature={f} />
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

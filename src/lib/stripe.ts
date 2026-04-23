import Stripe from "stripe";

export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!STRIPE_SECRET_KEY) {
    throw new Error(
      "STRIPE_SECRET_KEY is not set. Add it to .env.local (see ENV_VARIABLES.md)."
    );
  }
  if (!_stripe) {
    _stripe = new Stripe(STRIPE_SECRET_KEY, {
      // Cast: pin a stable API version regardless of installed type defs.
      apiVersion: "2024-06-20" as any,
      typescript: true,
      appInfo: { name: "Fileninja", version: "0.1.0" }
    });
  }
  return _stripe;
}

/**
 * Maps a (plan, cycle) pair to a Stripe Price ID from env.
 * Create these 4 prices with scripts/stripe-setup.sh (or manually in Stripe dashboard).
 */
export function priceIdFor(
  plan: "basic" | "pro",
  cycle: "monthly" | "yearly"
): string | undefined {
  const map: Record<string, string | undefined> = {
    "basic:monthly": process.env.STRIPE_PRICE_BASIC_MONTHLY,
    "basic:yearly": process.env.STRIPE_PRICE_BASIC_YEARLY,
    "pro:monthly": process.env.STRIPE_PRICE_PRO_MONTHLY,
    "pro:yearly": process.env.STRIPE_PRICE_PRO_YEARLY
  };
  return map[`${plan}:${cycle}`];
}

/**
 * Reverse lookup: given a Stripe price ID, which plan/cycle is it?
 */
export function planFromPriceId(
  priceId: string
): { plan: "basic" | "pro"; cycle: "monthly" | "yearly" } | null {
  const entries: Array<[string | undefined, { plan: "basic" | "pro"; cycle: "monthly" | "yearly" }]> = [
    [process.env.STRIPE_PRICE_BASIC_MONTHLY, { plan: "basic", cycle: "monthly" }],
    [process.env.STRIPE_PRICE_BASIC_YEARLY, { plan: "basic", cycle: "yearly" }],
    [process.env.STRIPE_PRICE_PRO_MONTHLY, { plan: "pro", cycle: "monthly" }],
    [process.env.STRIPE_PRICE_PRO_YEARLY, { plan: "pro", cycle: "yearly" }]
  ];
  for (const [envId, meta] of entries) {
    if (envId && envId === priceId) return meta;
  }
  return null;
}

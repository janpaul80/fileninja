// Node equivalent of scripts/stripe-setup.sh — uses STRIPE_SECRET_KEY from .env.local.
// Creates (or reuses) one "Fileninja" product + 4 prices via `lookup_key`,
// then APPENDS the 4 Price IDs to .env.local if they aren't already there.
//
// Usage: node scripts/stripe-setup.mjs

import fs from "node:fs";
import path from "node:path";
import Stripe from "stripe";

// Load .env.local manually (next.js does this at runtime, not in plain node)
function loadDotEnv(file) {
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (!m) continue;
    let v = m[2];
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    if (!process.env[m[1]]) process.env[m[1]] = v;
  }
}
loadDotEnv(".env.local");

const key = process.env.STRIPE_SECRET_KEY;
if (!key) {
  console.error("STRIPE_SECRET_KEY not found in .env.local");
  process.exit(1);
}
const mode = key.startsWith("sk_live_") ? "LIVE" : "TEST";
console.log(`• Stripe mode: ${mode}`);

const stripe = new Stripe(key, { apiVersion: "2024-06-20" });

const PRODUCT_NAME = "Fileninja";
const PRODUCT_DESCRIPTION = "Send big files, fast. Gallery-style file transfer SaaS.";

const PRICES = [
  { envKey: "STRIPE_PRICE_BASIC_MONTHLY", lookup: "fileninja_basic_monthly", amount: 499,  interval: "month", nickname: "Basic Monthly" },
  { envKey: "STRIPE_PRICE_BASIC_YEARLY",  lookup: "fileninja_basic_yearly",  amount: 4799, interval: "year",  nickname: "Basic Yearly"  },
  { envKey: "STRIPE_PRICE_PRO_MONTHLY",   lookup: "fileninja_pro_monthly",   amount: 1299, interval: "month", nickname: "Pro Monthly"   },
  { envKey: "STRIPE_PRICE_PRO_YEARLY",    lookup: "fileninja_pro_yearly",    amount: 9999, interval: "year",  nickname: "Pro Yearly"    }
];

async function findOrCreateProduct() {
  const list = await stripe.products.list({ limit: 100, active: true });
  const existing = list.data.find((p) => p.name === PRODUCT_NAME);
  if (existing) {
    console.log(`  ↳ reusing product ${existing.id}`);
    return existing.id;
  }
  const p = await stripe.products.create({
    name: PRODUCT_NAME,
    description: PRODUCT_DESCRIPTION
  });
  console.log(`  ↳ created product ${p.id}`);
  return p.id;
}

async function findOrCreatePrice(productId, { lookup, amount, interval, nickname }) {
  // Search by lookup_key (most robust)
  const byLookup = await stripe.prices.list({
    product: productId,
    active: true,
    limit: 100,
    lookup_keys: [lookup]
  });
  if (byLookup.data.length > 0) {
    return byLookup.data[0].id;
  }
  const created = await stripe.prices.create({
    product: productId,
    currency: "usd",
    unit_amount: amount,
    recurring: { interval },
    nickname,
    lookup_key: lookup
  });
  return created.id;
}

function upsertEnvLocal(pairs) {
  const file = ".env.local";
  let content = fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
  let changed = false;
  for (const [key, value] of pairs) {
    const re = new RegExp(`^${key}=.*$`, "m");
    if (re.test(content)) {
      const prev = content.match(re)[0];
      const next = `${key}=${value}`;
      if (prev !== next) {
        content = content.replace(re, next);
        changed = true;
      }
    } else {
      if (!content.endsWith("\n") && content.length) content += "\n";
      content += `${key}=${value}\n`;
      changed = true;
    }
  }
  if (changed) fs.writeFileSync(file, content, "utf8");
  return changed;
}

(async () => {
  console.log("• Looking up / creating product…");
  const productId = await findOrCreateProduct();

  console.log("• Creating prices…");
  const results = [];
  for (const def of PRICES) {
    const id = await findOrCreatePrice(productId, def);
    console.log(`  ${def.envKey.padEnd(32)} = ${id}`);
    results.push([def.envKey, id]);
  }

  console.log("• Writing to .env.local…");
  const changed = upsertEnvLocal(results);
  console.log(changed ? "  ↳ .env.local updated" : "  ↳ .env.local already up to date");

  console.log("\n✓ Done. Restart `npm run dev` for the new env vars to take effect.\n");
})().catch((e) => {
  console.error("✗", e?.message || e);
  process.exit(1);
});

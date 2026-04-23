// Full end-to-end test of Fileninja's auth + billing surfaces.
// Assumes dev server is running on localhost:3005 and .env.local is fully populated.

import fs from "node:fs";
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";

function loadEnv(file) {
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
loadEnv(".env.local");

// Always test against the locally-running dev server, regardless of NEXT_PUBLIC_SITE_URL.
const BASE = process.env.E2E_BASE_URL || "http://localhost:3005";
console.log("Testing against:", BASE);
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2024-06-20" });
const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const results = [];
function pass(name, info = "") { results.push({ name, status: "PASS", info }); console.log("  ✓", name, info); }
function fail(name, info = "") { results.push({ name, status: "FAIL", info }); console.log("  ✗", name, info); }
function section(t) { console.log("\n━━", t, "━━━━━━━━━━━━━━━━━━━━━━━━━━━━"); }

// 1. Public pages
section("1. Public pages");
for (const path of ["/", "/pricing", "/login", "/signup", "/signup?plan=pro", "/signup?plan=basic&cycle=yearly"]) {
  try {
    const r = await fetch(BASE + path);
    if (r.status === 200) pass(`GET ${path}`, `(${r.status})`);
    else fail(`GET ${path}`, `(${r.status})`);
  } catch (e) { fail(`GET ${path}`, e.message); }
}

// 2. Middleware guard
section("2. Middleware /dashboard guard");
try {
  const r = await fetch(BASE + "/dashboard", { redirect: "manual" });
  if (r.status === 307 || r.status === 302) {
    const loc = r.headers.get("location") || "";
    if (loc.includes("/login")) pass("GET /dashboard unauthenticated", `→ ${r.status} ${loc}`);
    else fail("GET /dashboard unauthenticated", `redirected to ${loc}`);
  } else fail("GET /dashboard unauthenticated", `expected 307, got ${r.status}`);
} catch (e) { fail("GET /dashboard", e.message); }

// 3. Stripe checkout API (unauthenticated should bounce to /login)
section("3. Stripe checkout API — unauthenticated");
try {
  const r = await fetch(BASE + "/api/stripe/checkout", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ plan: "pro", cycle: "monthly" })
  });
  const body = await r.json().catch(() => ({}));
  if (r.status === 401) pass("POST /api/stripe/checkout no-auth", `→ ${r.status} ${JSON.stringify(body)}`);
  else fail("POST /api/stripe/checkout no-auth", `expected 401, got ${r.status} ${JSON.stringify(body)}`);
} catch (e) { fail("POST /api/stripe/checkout no-auth", e.message); }

// 4. Stripe portal API (unauthenticated)
section("4. Stripe portal API — unauthenticated");
try {
  const r = await fetch(BASE + "/api/stripe/portal", { method: "POST" });
  const body = await r.json().catch(() => ({}));
  if (r.status === 401) pass("POST /api/stripe/portal no-auth", `→ ${r.status} ${JSON.stringify(body)}`);
  else fail("POST /api/stripe/portal no-auth", `expected 401, got ${r.status} ${JSON.stringify(body)}`);
} catch (e) { fail("POST /api/stripe/portal no-auth", e.message); }

// 5. Stripe webhook bad signature
section("5. Stripe webhook signature verification");
try {
  const r = await fetch(BASE + "/api/stripe/webhook", {
    method: "POST",
    headers: { "content-type": "application/json", "stripe-signature": "t=1,v1=invalid" },
    body: JSON.stringify({ type: "ping" })
  });
  if (r.status === 400) pass("POST /api/stripe/webhook bad sig", `→ ${r.status}`);
  else fail("POST /api/stripe/webhook bad sig", `expected 400, got ${r.status}`);
} catch (e) { fail("POST /api/stripe/webhook bad sig", e.message); }

// 6. End-to-end: create test user via Supabase admin API → verify profile auto-created
section("6. Auth → profile auto-create trigger");
const testEmail = `e2e+${Date.now()}@fileninja.cloud`;
let testUserId = null;
try {
  const { data, error } = await sb.auth.admin.createUser({
    email: testEmail,
    password: "TestPassword123!",
    email_confirm: true,
    user_metadata: { full_name: "E2E Test User", plan: "pro", billing_cycle: "monthly" }
  });
  if (error) fail("admin.createUser", error.message);
  else {
    testUserId = data.user.id;
    pass("admin.createUser", `id=${testUserId}`);
  }
} catch (e) { fail("admin.createUser", e.message); }

if (testUserId) {
  // Wait briefly for trigger
  await new Promise((r) => setTimeout(r, 600));
  try {
    const { data, error } = await sb.from("profiles").select("*").eq("id", testUserId).maybeSingle();
    if (error) fail("profile auto-created", error.message);
    else if (!data) fail("profile auto-created", "no row found — trigger not firing?");
    else pass("profile auto-created", `email=${data.email} plan=${data.plan} cycle=${data.billing_cycle}`);
  } catch (e) { fail("profile auto-created", e.message); }
}

// 7. Stripe price IDs in env match Stripe API
section("7. Stripe price IDs verification");
for (const [envKey, plan, cycle] of [
  ["STRIPE_PRICE_BASIC_MONTHLY", "basic", "month"],
  ["STRIPE_PRICE_BASIC_YEARLY",  "basic", "year"],
  ["STRIPE_PRICE_PRO_MONTHLY",   "pro",   "month"],
  ["STRIPE_PRICE_PRO_YEARLY",    "pro",   "year"]
]) {
  const id = process.env[envKey];
  if (!id) { fail(envKey, "missing in env"); continue; }
  try {
    const p = await stripe.prices.retrieve(id);
    pass(envKey, `${id} $${(p.unit_amount/100).toFixed(2)} / ${p.recurring.interval}`);
  } catch (e) { fail(envKey, e.message); }
}

// 8. Cleanup test user
if (testUserId) {
  section("8. Cleanup");
  try {
    await sb.from("profiles").delete().eq("id", testUserId);
    const { error } = await sb.auth.admin.deleteUser(testUserId);
    if (error) fail("deleteUser", error.message);
    else pass("deleteUser", testUserId);
  } catch (e) { fail("deleteUser", e.message); }
}

// Summary
section("SUMMARY");
const passed = results.filter(r => r.status === "PASS").length;
const failed = results.filter(r => r.status === "FAIL").length;
console.log(`  ${passed} passed, ${failed} failed (${results.length} total)`);
if (failed) {
  console.log("\n  Failed checks:");
  for (const r of results.filter(x => x.status === "FAIL")) console.log("   ✗", r.name, "—", r.info);
  process.exit(1);
}
console.log("\n✓ All end-to-end checks passed.");

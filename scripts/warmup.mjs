const BASE = "http://localhost:3005";
const paths = [
  "/", "/pricing", "/login", "/signup",
  "/signup?plan=pro", "/signup?plan=basic&cycle=yearly",
  "/dashboard"
];
for (const p of paths) {
  const t0 = Date.now();
  try {
    const r = await fetch(BASE + p, { redirect: "manual", signal: AbortSignal.timeout(120000) });
    console.log(`${r.status} ${p} (${Date.now() - t0}ms)`);
  } catch (e) {
    console.log(`ERR ${p} (${Date.now() - t0}ms): ${e.message}`);
  }
}
// Also warm API routes (they'll 4xx but compile)
for (const p of ["/api/stripe/checkout", "/api/stripe/portal", "/api/stripe/webhook"]) {
  const t0 = Date.now();
  try {
    const r = await fetch(BASE + p, {
      method: "POST",
      headers: { "content-type": "application/json", "stripe-signature": "t=1,v1=invalid" },
      body: "{}",
      signal: AbortSignal.timeout(120000)
    });
    console.log(`${r.status} POST ${p} (${Date.now() - t0}ms)`);
  } catch (e) {
    console.log(`ERR POST ${p} (${Date.now() - t0}ms): ${e.message}`);
  }
}
console.log("Warmup complete.");

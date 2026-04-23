const BASE = process.env.BASE || "http://localhost:3005";
const ROUTES = [
  "/",
  "/pricing",
  "/login",
  "/signup",
  "/about",
  "/contact",
  "/blog",
  "/developer-api",
  "/vault",
  "/features",
  "/terms",
  "/privacy",
  "/security",
  "/dpa",
  "/cookies"
];

let pass = 0;
let fail = 0;

for (const r of ROUTES) {
  const url = BASE + r;
  try {
    const res = await fetch(url, { redirect: "manual" });
    const ok = res.status >= 200 && res.status < 400;
    const len = res.headers.get("content-length") || "?";
    console.log(
      `${ok ? "✓" : "✗"} ${r.padEnd(20)} ${res.status}  (${len} bytes)`
    );
    ok ? pass++ : fail++;
  } catch (e) {
    console.log(`✗ ${r.padEnd(20)} FAIL  ${e.message}`);
    fail++;
  }
}

console.log(`\n${pass}/${ROUTES.length} passed, ${fail} failed`);
process.exit(fail === 0 ? 0 : 1);

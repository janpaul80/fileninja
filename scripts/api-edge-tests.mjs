const BASE = process.env.BASE || "http://localhost:3005";

async function call(payload, label, expectStatus) {
  const res = await fetch(`${BASE}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: typeof payload === "string" ? payload : JSON.stringify(payload)
  });
  let body;
  try {
    body = await res.json();
  } catch {
    body = "(non-json)";
  }
  const ok = res.status === expectStatus;
  console.log(
    `${ok ? "✓" : "✗"} ${label.padEnd(38)} → ${res.status} (expected ${expectStatus}) ${JSON.stringify(body)}`
  );
  return ok;
}

const valid = {
  name: "Test User",
  email: "test@example.com",
  subject: "Hello",
  message: "This is a valid message body.",
  captcha: 7,
  challenge: { a: 3, b: 4, answer: 7 }
};

let pass = 0;
let total = 0;
async function t(label, payload, expect) {
  total++;
  if (await call(payload, label, expect)) pass++;
}

console.log("--- /api/contact edge-case tests ---\n");

await t("happy path", valid, 200);
await t("missing name", { ...valid, name: "" }, 400);
await t("missing email", { ...valid, email: "" }, 400);
await t("missing subject", { ...valid, subject: "" }, 400);
await t("missing message", { ...valid, message: "" }, 400);
await t("invalid email format", { ...valid, email: "notanemail" }, 400);
await t("captcha mismatch (wrong answer)", { ...valid, captcha: 99 }, 400);
await t(
  "captcha mismatch (challenge tampered)",
  { ...valid, captcha: 7, challenge: { a: 3, b: 4, answer: 99 } },
  400
);
await t("missing challenge object", { ...valid, challenge: undefined }, 400);
await t(
  "name too long (>120)",
  { ...valid, name: "A".repeat(121) },
  400
);
await t(
  "subject too long (>200)",
  { ...valid, subject: "S".repeat(201) },
  400
);
await t(
  "message too long (>5000)",
  { ...valid, message: "M".repeat(5001) },
  400
);
await t("invalid json body", "{not valid json", 400);

console.log(`\n${pass}/${total} edge-case tests passed`);
process.exit(pass === total ? 0 : 1);

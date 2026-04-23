// Verifies the Supabase schema (profiles table, trigger, RLS) is in place.
import fs from "node:fs";
import { createClient } from "@supabase/supabase-js";

function loadEnv(file) {
  for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (!m) continue;
    let v = m[2];
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    if (!process.env[m[1]]) process.env[m[1]] = v;
  }
}
loadEnv(".env.local");

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

console.log("Probe 1: select * from profiles limit 5");
{
  const { data, error, status, count } = await sb.from("profiles").select("*", { count: "exact" }).limit(5);
  console.log("  status:", status, "count:", count, "rows:", data?.length, "err:", error?.message ?? "(none)");
  if (data?.length) console.log("  sample:", data[0]);
}

console.log("\nProbe 2: insert a dummy profile (will fail FK but tells us if table is writable)");
{
  const { error } = await sb.from("profiles").insert({ id: "00000000-0000-0000-0000-000000000000", email: "x@x" });
  console.log("  err:", error?.message ?? "(no error)");
}

console.log("\nProbe 3: list auth users");
{
  const { data, error } = await sb.auth.admin.listUsers({ page: 1, perPage: 10 });
  console.log("  err:", error?.message ?? "(none)", "users:", data?.users.length);
  for (const u of data?.users ?? []) console.log("   -", u.id, u.email);
}

console.log("\nProbe 4: create user, wait, check profiles");
const email = `check+${Date.now()}@fileninja.cloud`;
const { data: createData, error: createErr } = await sb.auth.admin.createUser({
  email,
  password: "TestPassword123!",
  email_confirm: true,
  user_metadata: { full_name: "Schema Checker", plan: "basic" }
});
if (createErr) {
  console.log("  createUser err:", createErr.message);
} else {
  const uid = createData.user.id;
  console.log("  created user:", uid, email);
  // Wait longer for trigger
  for (const ms of [200, 500, 1000, 2000]) {
    await new Promise(r => setTimeout(r, ms));
    const { data, error } = await sb.from("profiles").select("*").eq("id", uid).maybeSingle();
    console.log(`  after +${ms}ms — found?`, !!data, "err:", error?.message ?? "(none)");
    if (data) { console.log("    profile:", data); break; }
  }
  // cleanup
  await sb.from("profiles").delete().eq("id", uid);
  await sb.auth.admin.deleteUser(uid);
  console.log("  cleaned up");
}

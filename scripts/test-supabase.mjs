// Probes Supabase connectivity + checks the `profiles` table exists and is reachable.
// Loads .env.local manually since this runs outside Next.js.

import fs from "node:fs";
import { createClient } from "@supabase/supabase-js";

function loadEnv(file) {
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
loadEnv(".env.local");

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const svc = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log("• Supabase URL:", url ? url.slice(0, 50) + "…" : "MISSING");
console.log("• Service-role key:", svc ? `present (len ${svc.length})` : "MISSING");

if (!url || !svc) {
  console.error("✗ Missing env vars");
  process.exit(1);
}

const sb = createClient(url, svc, { auth: { persistSession: false } });

console.log("\n• Pinging profiles table…");
const { count, error } = await sb
  .from("profiles")
  .select("id", { count: "exact", head: true });

if (error) {
  console.error("✗ profiles table error:", error.message);
  console.error("  → Did you run supabase/schema.sql in the Supabase SQL editor?");
  process.exit(2);
}

console.log(`✓ profiles table OK (rows=${count})`);

console.log("\n• Listing first 5 auth users (admin)…");
const { data: usersResp, error: usersErr } = await sb.auth.admin.listUsers({ page: 1, perPage: 5 });
if (usersErr) {
  console.error("✗ admin.listUsers error:", usersErr.message);
} else {
  console.log(`✓ users in project: ${usersResp.users.length}`);
  for (const u of usersResp.users) {
    console.log(`   - ${u.email ?? "(oauth)"}  (${u.id})`);
  }
}

console.log("\n✓ Supabase connectivity verified.");

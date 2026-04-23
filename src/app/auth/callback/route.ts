import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * OAuth + magic-link callback.
 * Supabase redirects the browser here with a `code` query param,
 * which we exchange for a session cookie and then send the user on.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  // Use the public site URL for redirects to avoid internal server origins (0.0.0.0)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || origin;

  if (code) {
    const supabase = createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${siteUrl}${next}`);
    }
    console.error("[auth/callback] exchange error:", error.message);
  }

  return NextResponse.redirect(`${siteUrl}/login?error=oauth_failed`);
}

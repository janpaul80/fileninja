"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3005";

function originFromRequest() {
  try {
    const h = headers();
    const proto = h.get("x-forwarded-proto") || "http";
    const host = h.get("host");
    if (host) return `${proto}://${host}`;
  } catch {}
  return SITE_URL;
}

export async function signInWithPassword(formData: FormData) {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  const next = String(formData.get("next") || "/dashboard");

  if (!email || !password) {
    redirect(`/login?error=${encodeURIComponent("Email and password are required")}`);
  }

  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect(`/login?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/", "layout");
  redirect(next);
}

export async function signUpWithPassword(formData: FormData) {
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  const plan = String(formData.get("plan") || "free");

  if (!email || !password) {
    redirect(`/signup?error=${encodeURIComponent("Email and password are required")}`);
  }
  if (password.length < 8) {
    redirect(`/signup?error=${encodeURIComponent("Password must be at least 8 characters")}`);
  }

  const supabase = createClient();
  const origin = originFromRequest();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback?next=${encodeURIComponent(
        plan && plan !== "free" ? `/dashboard?upgrade=${plan}` : "/dashboard"
      )}`,
      data: { full_name: name, intended_plan: plan }
    }
  });

  if (error) {
    redirect(`/signup?error=${encodeURIComponent(error.message)}`);
  }

  redirect(
    `/signup?sent=1&email=${encodeURIComponent(email)}${
      plan && plan !== "free" ? `&plan=${plan}` : ""
    }`
  );
}

export async function signInWithOAuth(provider: "google" | "github", next = "/dashboard") {
  const supabase = createClient();
  const origin = originFromRequest();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${origin}/auth/callback?next=${encodeURIComponent(next)}`
    }
  });

  if (error) {
    redirect(`/login?error=${encodeURIComponent(error.message)}`);
  }

  if (data?.url) {
    redirect(data.url);
  }

  redirect("/login?error=oauth_no_url");
}

export async function signInWithGoogle(formData: FormData) {
  const next = String(formData.get("next") || "/dashboard");
  await signInWithOAuth("google", next);
}

export async function signInWithGitHub(formData: FormData) {
  const next = String(formData.get("next") || "/dashboard");
  await signInWithOAuth("github", next);
}

export async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}

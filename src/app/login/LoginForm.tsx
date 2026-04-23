"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import {
  signInWithPassword,
  signInWithGoogle,
  signInWithGitHub,
} from "@/app/auth/actions";

type Pending = null | "email" | "google" | "github";

export default function LoginForm({ next }: { next: string }) {
  const [pending, setPending] = React.useState<Pending>(null);

  async function onEmail(fd: FormData) {
    setPending("email");
    await signInWithPassword(fd);
  }

  async function onGoogle(fd: FormData) {
    setPending("google");
    await signInWithGoogle(fd);
  }

  async function onGitHub(fd: FormData) {
    setPending("github");
    await signInWithGitHub(fd);
  }

  return (
    <div>
      <form action={onEmail} className="mt-8 space-y-4">
        <input type="hidden" name="next" value={next} />

        <div>
          <label htmlFor="login-email" className="block text-sm font-medium text-brand-ink mb-1.5">
            Email
          </label>
          <input
            id="login-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full rounded-xl border border-brand-grayLight bg-white px-4 py-3 focus:outline-none focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20 transition"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="login-password" className="block text-sm font-medium text-brand-ink">
              Password
            </label>
            <Link href="/forgot" className="text-xs text-brand-red hover:underline">
              Forgot?
            </Link>
          </div>
          <input
            id="login-password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="w-full rounded-xl border border-brand-grayLight bg-white px-4 py-3 focus:outline-none focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20 transition"
            placeholder="••••••••"
          />
        </div>

        <label className="flex items-center gap-2 text-sm text-brand-ink/70">
          <input type="checkbox" className="w-4 h-4 rounded accent-brand-red" defaultChecked />
          Remember me
        </label>

        <button
          type="submit"
          disabled={pending !== null}
          className="btn-primary w-full justify-center disabled:opacity-60"
        >
          {pending === "email" ? "Signing in…" : "Sign in"}
          {pending !== "email" ? <ArrowRightIcon size={18} className="ml-2" /> : null}
        </button>
      </form>

      <div className="my-6 flex items-center gap-3">
        <span className="flex-1 h-px bg-brand-grayLight" />
        <span className="text-xs uppercase tracking-wider text-brand-ink/45">or</span>
        <span className="flex-1 h-px bg-brand-grayLight" />
      </div>

      <div className="space-y-3">
        <form action={onGoogle}>
          <input type="hidden" name="next" value={next} />
          <button
            type="submit"
            disabled={pending !== null}
            className="w-full rounded-full border border-brand-grayLight bg-white py-3 font-medium text-brand-ink hover:border-brand-ink/30 transition flex items-center justify-center gap-2 disabled:opacity-60"
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" />
            </svg>
            {pending === "google" ? "Redirecting…" : "Continue with Google"}
          </button>
        </form>

        <form action={onGitHub}>
          <input type="hidden" name="next" value={next} />
          <button
            type="submit"
            disabled={pending !== null}
            className="w-full rounded-full border border-brand-grayLight bg-white py-3 font-medium text-brand-ink hover:border-brand-ink/30 transition flex items-center justify-center gap-2 disabled:opacity-60"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#0B1220">
              <path d="M12 .5C5.73.5.5 5.73.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2.01-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.74-1.54-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.3-.52-1.48.11-3.08 0 0 .97-.31 3.18 1.18a11.04 11.04 0 0 1 5.79 0c2.2-1.49 3.18-1.18 3.18-1.18.63 1.6.23 2.78.11 3.08.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.27 5.69.41.35.77 1.04.77 2.1 0 1.52-.01 2.75-.01 3.12 0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z" />
            </svg>
            {pending === "github" ? "Redirecting…" : "Continue with GitHub"}
          </button>
        </form>
      </div>
    </div>
  );
}

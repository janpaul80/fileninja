"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { MenuIcon, XIcon, UserIcon } from "./icons";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { signOut } from "@/app/auth/actions";

const navLinks = [
  { href: "/", label: "Send" },
  { href: "/pricing", label: "Pricing" },
  { href: "/#features", label: "Features" },
  { href: "/#artists", label: "Artists" }
];

export default function Header() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);

  const supabase = createClient();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Auth listener
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getInitialSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      subscription.unsubscribe();
    };
  }, [supabase]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/85 backdrop-blur-xl border-b border-brand-grayLight/60"
          : "bg-transparent"
      }`}
    >
      <div className="container-fn flex items-center justify-between h-16 sm:h-20">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-10 h-10 sm:w-11 sm:h-11 shrink-0">
            <Image
              src="/logo.png"
              alt="Fileninja"
              fill
              sizes="44px"
              className="object-contain"
              priority
            />
          </div>
          <span
            className={`font-display font-extrabold text-base sm:text-xl tracking-tight transition-colors ${
              scrolled ? "text-brand-ink" : "text-white drop-shadow"
            }`}
          >
            File<span className="text-brand-red">ninja</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm font-medium link-fn transition-colors ${
                scrolled ? "text-brand-ink/80 hover:text-brand-ink" : "text-white/90 hover:text-white"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {loading ? (
            <div className="w-20 h-8 rounded-full bg-brand-bg/20 animate-pulse" />
          ) : user ? (
            <>
              <Link
                href="/dashboard"
                className={`flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full transition-colors ${
                  scrolled ? "bg-brand-bg text-brand-ink hover:bg-brand-grayLight" : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                <UserIcon size={16} />
                Dashboard
              </Link>
              <button
                onClick={() => signOut()}
                className={`text-sm font-medium px-3 py-2 transition-colors ${
                  scrolled ? "text-brand-ink/60 hover:text-brand-red" : "text-white/70 hover:text-white"
                }`}
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className={`text-sm font-medium px-3 py-2 rounded-full transition-colors ${
                  scrolled ? "text-brand-ink hover:text-brand-red" : "text-white hover:text-white/80"
                }`}
              >
                Sign in
              </Link>
              <Link href="/signup" className="btn-primary text-sm">
                Sign up free
              </Link>
            </>
          )}
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
          className={`md:hidden p-2.5 rounded-full min-h-11 min-w-11 flex items-center justify-center ${
            scrolled ? "text-brand-ink" : "text-white"
          }`}
        >
          {open ? <XIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-brand-grayLight/60 animate-fade-in">
          <div className="container-fn py-4 flex flex-col gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="px-2 py-3 text-brand-ink font-medium rounded-lg hover:bg-brand-bg"
              >
                {l.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-3">
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setOpen(false)}
                    className="btn-dark w-full text-sm justify-center"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      setOpen(false);
                      signOut();
                    }}
                    className="btn-ghost w-full text-sm justify-center"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <div className="flex gap-2">
                  <Link href="/login" onClick={() => setOpen(false)} className="btn-ghost flex-1 text-sm">
                    Sign in
                  </Link>
                  <Link href="/signup" onClick={() => setOpen(false)} className="btn-primary flex-1 text-sm">
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

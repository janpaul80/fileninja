import Link from "next/link";
import Image from "next/image";
import LoginForm from "./LoginForm";

type Props = {
  searchParams?: {
    error?: string;
    next?: string;
    message?: string;
  };
};

export default function LoginPage({ searchParams }: Props) {
  return (
    <section className="min-h-screen pt-28 pb-20 grid lg:grid-cols-2 bg-brand-bg">
      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <Link href="/" className="inline-flex items-center gap-2 mb-10">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden">
              <Image src="/logo.svg" alt="Fileninja" fill sizes="40px" className="object-cover" />
            </div>
            <span className="font-display font-extrabold text-xl text-brand-ink">
              File<span className="text-brand-red">ninja</span>
            </span>
          </Link>

          <h1 className="h-display text-4xl text-brand-ink">Welcome back.</h1>
          <p className="text-brand-ink/60 mt-2 font-light">
            Sign in to your Fileninja account.
          </p>

          {searchParams?.message && (
            <div className="mt-6 rounded-xl bg-brand-teal/10 border border-brand-teal/30 px-4 py-3 text-sm text-brand-tealDark">
              {searchParams.message}
            </div>
          )}

          {searchParams?.error && (
            <div className="mt-6 rounded-xl bg-brand-red/10 border border-brand-red/25 px-4 py-3 text-sm text-brand-red">
              {searchParams.error}
            </div>
          )}

          <LoginForm next={searchParams?.next || "/dashboard"} />

          <p className="mt-8 text-sm text-brand-ink/65 text-center">
            New to Fileninja?{" "}
            <Link href="/signup" className="text-brand-red font-semibold hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>

      {/* Right side: artwork */}
      <div className="hidden lg:block relative overflow-hidden">
        <div
          className="absolute inset-0 animate-slow-zoom"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&w=1600&q=80)",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/60 via-transparent to-brand-red/20" />
        <div className="absolute bottom-8 left-8 right-8 text-white">
          <p className="text-xs uppercase tracking-[0.22em] opacity-70 mb-2">
            Featured artwork
          </p>
          <p className="font-display font-bold text-2xl">Color Field — Efe Kurnaz</p>
        </div>
      </div>
    </section>
  );
}

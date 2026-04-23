import Link from "next/link";
import Image from "next/image";
import { CheckIcon } from "@/components/icons";
import SignupForm from "./SignupForm";

const perks = [
  "5 GB transfers, free forever",
  "No credit card required",
  "Curated artwork on every transfer",
  "Cancel anytime"
];

type Props = {
  searchParams?: {
    plan?: string;
    error?: string;
    sent?: string;
    email?: string;
  };
};

export default function SignupPage({ searchParams }: Props) {
  const plan = searchParams?.plan || "free";
  const sent = searchParams?.sent === "1";

  return (
    <section className="min-h-screen pt-28 pb-20 grid lg:grid-cols-2 bg-brand-bg">
      {/* Left: artwork panel */}
      <div className="hidden lg:block relative overflow-hidden order-2 lg:order-1">
        <div
          className="absolute inset-0 animate-slow-zoom"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1600&q=80)",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-brand-dark/70 via-brand-dark/30 to-brand-red/20" />
        <div className="relative z-10 h-full flex flex-col justify-between p-10 text-white">
          <Link href="/" className="inline-flex items-center gap-2.5 w-fit">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden">
              <Image src="/logo.svg" alt="Fileninja" fill sizes="40px" className="object-cover" />
            </div>
            <span className="font-display font-extrabold text-xl">
              File<span className="text-brand-red">ninja</span>
            </span>
          </Link>

          <div>
            <h2 className="h-display text-4xl xl:text-5xl">
              Send like a ninja.
              <br />
              <span className="text-brand-red">Free forever.</span>
            </h2>
            <ul className="mt-8 space-y-3">
              {perks.map((p) => (
                <li key={p} className="flex items-center gap-3 text-white/90">
                  <span className="w-6 h-6 rounded-full bg-brand-teal/30 text-brand-teal flex items-center justify-center">
                    <CheckIcon size={14} />
                  </span>
                  <span className="font-light">{p}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-xs uppercase tracking-[0.22em] text-white/55">
            Artwork · Liquid Gradient — Pawel Czerwinski
          </p>
        </div>
      </div>

      {/* Right: form */}
      <div className="flex items-center justify-center px-6 py-12 order-1 lg:order-2">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-10">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden">
                <Image src="/logo.svg" alt="Fileninja" fill sizes="40px" className="object-cover" />
              </div>
              <span className="font-display font-extrabold text-xl text-brand-ink">
                File<span className="text-brand-red">ninja</span>
              </span>
            </Link>
          </div>

          <h1 className="h-display text-4xl text-brand-ink">Create your account</h1>
          <p className="text-brand-ink/60 mt-2 font-light">
            {plan !== "free" ? (
              <>
                You selected the <span className="text-brand-red font-semibold">{plan}</span> plan.
                Finish signup to continue to checkout.
              </>
            ) : (
              <>Free forever. Upgrade only when you need more.</>
            )}
          </p>

          {sent && (
            <div className="mt-6 rounded-xl bg-brand-teal/10 border border-brand-teal/30 px-4 py-3 text-sm text-brand-tealDark">
              Check your inbox — we sent a confirmation link to{" "}
              <span className="font-semibold">{searchParams?.email}</span>.
            </div>
          )}

          {searchParams?.error && (
            <div className="mt-6 rounded-xl bg-brand-red/10 border border-brand-red/25 px-4 py-3 text-sm text-brand-red">
              {searchParams.error}
            </div>
          )}

          <SignupForm plan={plan} />

          <p className="mt-8 text-sm text-brand-ink/65 text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-brand-red font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

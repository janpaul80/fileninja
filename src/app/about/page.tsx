import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "About — Fileninja",
  description:
    "Fileninja was built with a simple belief: sharing files should be fast, effortless, and reliable. Meet the founder behind Fileninja and the broader product ecosystem."
};

const ventures = [
  "CoderXP",
  "Rev-Dev",
  "HeftCoder AI",
  "MailBlazed",
  "BoltClaw",
  "KuikChat",
  "SafeBite",
  "GetWinked",
  "VidHart"
];

export default function AboutPage() {
  return (
    <main className="pt-28 sm:pt-36 pb-24 bg-brand-bg">
      <div className="container-fn">
        {/* Hero band */}
        <FadeIn>
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.22em] text-brand-red font-bold">
              About Fileninja
            </p>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-extrabold text-brand-ink leading-[0.95] tracking-tightest mt-4">
              Built for speed.
              <br />
              <span className="text-brand-red">Made to empower.</span>
            </h1>
            <p className="mt-6 text-lg text-brand-ink/70 leading-relaxed">
              Fileninja was built with a simple belief: sharing files should be
              fast, effortless, and reliable — without friction, clutter, or
              unnecessary complexity.
            </p>
          </div>
        </FadeIn>

        {/* Founder block */}
        <div className="mt-20 grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <FadeIn delay={100} className="lg:col-span-7 order-2 lg:order-1">
            <div className="prose-fn space-y-6 text-brand-ink/85 leading-relaxed text-[17px]">
              <p>
                Behind Fileninja is{" "}
                <span className="font-semibold text-brand-ink">
                  Paul Hartmann
                </span>
                , a European software engineer and 24/7 builder currently
                residing in Ecuador. With a deep passion for creating powerful
                digital tools, Paul focuses on building products that remove
                barriers and give people speed, clarity, and control in their
                workflows.
              </p>
              <p>
                Fileninja is more than just a file-sharing tool — it&apos;s
                part of a larger vision.
              </p>
              <p>
                Paul is actively developing a growing ecosystem of advanced
                platforms, including <strong>CoderXP</strong>, an autonomous
                AI coding environment, alongside Rev-Dev, HeftCoder AI,
                MailBlazed, BoltClaw, KuikChat, SafeBite, GetWinked, and
                VidHart. Each project is designed with one goal in mind: to
                simplify complex processes and push technology toward a more
                autonomous, intelligent future.
              </p>
              <p>
                With Fileninja, the focus is on speed and simplicity. No
                unnecessary steps. No distractions. Just a clean, powerful way
                to transfer files instantly — whether you&apos;re working,
                building, or sharing ideas.
              </p>
              <div className="not-prose border-l-4 border-brand-red pl-5 py-2 my-8 bg-white/70 rounded-r-lg">
                <p className="text-brand-ink font-display font-semibold text-xl leading-snug">
                  This platform reflects a broader mission: to build tools that
                  don&apos;t just function, but{" "}
                  <span className="text-brand-red">empower</span>.
                </p>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-2">
              {ventures.map((v) => (
                <span
                  key={v}
                  className="px-3 py-1.5 rounded-full bg-white border border-brand-grayLight text-xs font-semibold text-brand-ink/80 tracking-wide"
                >
                  {v}
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/signup" className="btn-primary">
                Try Fileninja free <ArrowRightIcon size={16} />
              </Link>
              <Link href="/contact" className="btn-ghost">
                Get in touch
              </Link>
            </div>
          </FadeIn>

          <FadeIn delay={250} className="lg:col-span-5 order-1 lg:order-2">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-brand-red/20 via-transparent to-brand-teal/20 rounded-[2rem] blur-2xl" />
              <div className="relative aspect-[4/5] w-full rounded-[1.75rem] overflow-hidden shadow-soft ring-1 ring-black/5 bg-brand-dark">
                <Image
                  src="/founder.png"
                  alt="Paul Hartmann — Founder of Fileninja"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center"
                  priority
                />
              </div>
              <div className="mt-5 text-center lg:text-left">
                <p className="font-display font-extrabold text-2xl text-brand-ink">
                  Paul Hartmann
                </p>
                <p className="text-sm text-brand-ink/60">
                  Founder & Engineer · Building from Ecuador
                </p>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Values strip */}
        <FadeIn>
          <div className="mt-28 grid sm:grid-cols-3 gap-6">
            {[
              {
                t: "Speed",
                d: "Every interaction is engineered to feel instant. No waiting, no friction."
              },
              {
                t: "Simplicity",
                d: "We remove every unnecessary step. The product gets out of your way."
              },
              {
                t: "Trust",
                d: "Your files stay yours. Encrypted in transit and at rest, always."
              }
            ].map((v) => (
              <div
                key={v.t}
                className="p-7 rounded-2xl bg-white shadow-card border border-brand-grayLight/60"
              >
                <p className="font-display font-extrabold text-xl text-brand-ink">
                  {v.t}
                </p>
                <p className="mt-2 text-sm text-brand-ink/65 leading-relaxed">
                  {v.d}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </main>
  );
}

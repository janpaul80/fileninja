import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import {
  ZapIcon,
  ShieldIcon,
  CloudIcon,
  LockIcon,
  ChartIcon,
  UsersIcon,
  GlobeIcon,
  CodeIcon,
  SparkleIcon,
  ArrowRightIcon
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Features — Fileninja",
  description:
    "Everything Fileninja can do — fast transfers, password protection, branding, vault storage, API access, and more."
};

const groups = [
  {
    title: "For everyone",
    items: [
      { Icon: ZapIcon, t: "Lightning-fast transfers", d: "Edge-distributed uploads with automatic resumable chunks." },
      { Icon: CloudIcon, t: "Send up to ∞", d: "Pro tier removes every cap. Free starts at 5 GB per transfer." },
      { Icon: SparkleIcon, t: "Beautiful share pages", d: "Editorial-quality download pages your recipients will love." }
    ]
  },
  {
    title: "Privacy & security",
    items: [
      { Icon: LockIcon, t: "Password protection", d: "Optional password on any transfer or vault link." },
      { Icon: ShieldIcon, t: "Virus scan badge", d: "Every file is scanned and badged before download." },
      { Icon: GlobeIcon, t: "EU-hosted, GDPR-ready", d: "Data residency you can trust. DPA on request." }
    ]
  },
  {
    title: "For teams & creators",
    items: [
      { Icon: UsersIcon, t: "File request portals", d: "Branded portals to collect files from clients with one link." },
      { Icon: ChartIcon, t: "Download tracking", d: "See who downloaded what, when — in real time." },
      { Icon: CodeIcon, t: "Developer API", d: "Programmatic transfers, webhooks and signed URLs." }
    ]
  }
];

export default function FeaturesPage() {
  return (
    <main className="pt-28 sm:pt-36 pb-24 bg-brand-bg min-h-screen">
      <div className="container-fn">
        <FadeIn>
          <p className="text-xs uppercase tracking-[0.22em] text-brand-red font-bold">
            Features
          </p>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-extrabold text-brand-ink leading-[0.95] tracking-tightest mt-4 max-w-4xl">
            Everything you need.
            <br />
            <span className="text-brand-red">Nothing you don&apos;t.</span>
          </h1>
          <p className="mt-6 text-lg text-brand-ink/70 max-w-2xl leading-relaxed">
            Fileninja packs the power you&apos;d expect from enterprise tools
            into an experience that gets out of your way.
          </p>
        </FadeIn>

        {groups.map((g, gi) => (
          <section key={g.title} className="mt-20">
            <FadeIn>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-brand-ink">
                {g.title}
              </h2>
            </FadeIn>
            <div className="mt-8 grid md:grid-cols-3 gap-6">
              {g.items.map((it, i) => (
                <FadeIn key={it.t} delay={i * 80}>
                  <div className="p-7 rounded-2xl bg-white border border-brand-grayLight/60 shadow-card h-full hover:-translate-y-1 transition-transform">
                    <div className="w-11 h-11 rounded-xl bg-brand-red/10 text-brand-red flex items-center justify-center">
                      <it.Icon size={20} />
                    </div>
                    <h3 className="font-display font-extrabold text-xl text-brand-ink mt-5">
                      {it.t}
                    </h3>
                    <p className="text-sm text-brand-ink/65 mt-2 leading-relaxed">
                      {it.d}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </section>
        ))}

        <FadeIn>
          <div className="mt-24 p-10 rounded-3xl bg-brand-dark text-white text-center">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold">
              Ready to send?
            </h2>
            <p className="mt-3 text-white/70 max-w-md mx-auto">
              Start free, no credit card required. Upgrade anytime.
            </p>
            <div className="mt-7 flex flex-wrap gap-3 justify-center">
              <Link href="/signup" className="btn-primary">
                Get started <ArrowRightIcon size={16} />
              </Link>
              <Link href="/pricing" className="btn-ghost">
                See pricing
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </main>
  );
}

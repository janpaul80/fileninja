import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { CloudIcon, LockIcon, FolderIcon, CheckIcon, ArrowRightIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Personal Vault — Fileninja",
  description:
    "A private, encrypted home for the files that matter. Up to 2TB on Pro."
};

const perks = [
  "End-to-end encrypted at rest (AES-256)",
  "Cross-device sync — desktop, mobile, web",
  "Smart folders with custom expiry rules",
  "Version history and instant restore",
  "Share any vault file with one click"
];

export default function VaultPage() {
  return (
    <main className="pt-28 sm:pt-36 pb-24 bg-brand-bg min-h-screen">
      <div className="container-fn">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <FadeIn className="lg:col-span-7">
            <p className="text-xs uppercase tracking-[0.22em] text-brand-red font-bold">
              Personal Vault
            </p>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-extrabold text-brand-ink leading-[0.95] tracking-tightest mt-4">
              A private home for the files that matter.
            </h1>
            <p className="mt-6 text-lg text-brand-ink/70 max-w-xl leading-relaxed">
              Your Vault is a secure, always-on space inside Fileninja —
              perfect for the documents, designs and recordings you reach for
              again and again. Up to <strong>2 TB</strong> on Pro.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/signup" className="btn-primary">
                Get your Vault <ArrowRightIcon size={16} />
              </Link>
              <Link href="/pricing" className="btn-ghost">
                View pricing
              </Link>
            </div>
          </FadeIn>

          <FadeIn delay={150} className="lg:col-span-5">
            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-to-br from-brand-teal/20 to-brand-red/15 rounded-[2rem] blur-2xl" />
              <div className="relative rounded-3xl bg-white p-7 shadow-soft border border-brand-grayLight/60">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-brand-dark text-white flex items-center justify-center">
                    <LockIcon size={20} />
                  </div>
                  <div>
                    <p className="font-display font-extrabold text-brand-ink">
                      Vault · Personal
                    </p>
                    <p className="text-xs text-brand-ink/55">
                      Encrypted · 412 GB of 2 TB
                    </p>
                  </div>
                </div>
                <div className="mt-5 h-2 rounded-full bg-brand-grayLight overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-brand-red to-brand-teal"
                    style={{ width: "21%" }}
                  />
                </div>
                <ul className="mt-6 space-y-2 text-sm">
                  {[
                    { i: FolderIcon, n: "Brand assets", s: "184 files · 38 GB" },
                    { i: FolderIcon, n: "Client deliverables", s: "92 files · 21 GB" },
                    { i: FolderIcon, n: "Personal archive", s: "412 files · 96 GB" }
                  ].map((f) => (
                    <li
                      key={f.n}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-brand-bg transition-colors"
                    >
                      <span className="w-8 h-8 rounded-md bg-brand-red/10 text-brand-red flex items-center justify-center">
                        <f.i size={14} />
                      </span>
                      <div className="flex-1">
                        <p className="font-semibold text-brand-ink">{f.n}</p>
                        <p className="text-xs text-brand-ink/55">{f.s}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Perks */}
        <FadeIn>
          <div className="mt-24 grid md:grid-cols-2 gap-6">
            <div className="p-9 rounded-2xl bg-white border border-brand-grayLight/60 shadow-card">
              <CloudIcon size={28} className="text-brand-red" />
              <h3 className="font-display font-extrabold text-2xl text-brand-ink mt-5">
                Built into every transfer
              </h3>
              <p className="text-brand-ink/65 mt-2 leading-relaxed">
                Save any incoming or outgoing transfer to your Vault with one
                click. No re-uploading, no duplication.
              </p>
            </div>
            <div className="p-9 rounded-2xl bg-brand-dark text-white">
              <h3 className="font-display font-extrabold text-2xl">
                Everything in your Vault
              </h3>
              <ul className="mt-5 space-y-3">
                {perks.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm text-white/85">
                    <span className="w-5 h-5 rounded-full bg-brand-teal/25 text-brand-teal flex items-center justify-center shrink-0 mt-0.5">
                      <CheckIcon size={12} />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </FadeIn>
      </div>
    </main>
  );
}

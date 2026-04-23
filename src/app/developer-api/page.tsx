import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { CodeIcon, ZapIcon, ShieldIcon, ArrowRightIcon, CheckIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Developer API — Fileninja",
  description:
    "Programmatic file transfers, webhooks, and storage. Built for developers who ship."
};

const features = [
  { Icon: ZapIcon, title: "Fast & predictable", desc: "Sub-100ms median response times. Idempotent endpoints. Sane errors." },
  { Icon: ShieldIcon, title: "Secure by default", desc: "Bearer-token auth, signed download URLs, and TLS everywhere." },
  { Icon: CodeIcon, title: "REST + Webhooks", desc: "Polished JSON REST API with webhooks for upload, download and expiry events." }
];

const endpoints = [
  { m: "POST", path: "/v1/transfers", d: "Create a new transfer" },
  { m: "GET", path: "/v1/transfers/:id", d: "Retrieve transfer details" },
  { m: "POST", path: "/v1/transfers/:id/files", d: "Add files to a transfer" },
  { m: "DELETE", path: "/v1/transfers/:id", d: "Cancel or expire a transfer" },
  { m: "POST", path: "/v1/webhooks", d: "Subscribe to lifecycle events" }
];

const sample = `curl https://api.fileninja.cloud/v1/transfers \\
  -H "Authorization: Bearer fnj_live_••••" \\
  -H "Content-Type: application/json" \\
  -d '{
    "files": [{ "name": "design.zip", "size": 4982134 }],
    "message": "Latest mocks 🎨",
    "expires_in": "7d"
  }'`;

export default function DeveloperApiPage() {
  return (
    <main className="pt-28 sm:pt-36 pb-24 bg-brand-bg min-h-screen">
      <div className="container-fn">
        <FadeIn>
          <p className="text-xs uppercase tracking-[0.22em] text-brand-red font-bold">
            Developer API
          </p>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-extrabold text-brand-ink leading-[0.95] tracking-tightest mt-4 max-w-4xl">
            File transfers, <span className="text-brand-red">programmable</span>.
          </h1>
          <p className="mt-6 text-lg text-brand-ink/70 max-w-2xl leading-relaxed">
            Build Fileninja into your product. Send transfers, manage files,
            track downloads, and react to events — all through a clean, modern
            REST API.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/signup" className="btn-primary">
              Get an API key <ArrowRightIcon size={16} />
            </Link>
            <Link href="/contact" className="btn-ghost">
              Talk to us
            </Link>
          </div>
        </FadeIn>

        {/* Code sample */}
        <FadeIn delay={150}>
          <div className="mt-16 rounded-2xl bg-brand-darker text-white shadow-soft overflow-hidden border border-white/5">
            <div className="flex items-center gap-2 px-5 py-3 border-b border-white/5">
              <span className="w-3 h-3 rounded-full bg-brand-red" />
              <span className="w-3 h-3 rounded-full bg-yellow-400" />
              <span className="w-3 h-3 rounded-full bg-brand-teal" />
              <span className="ml-3 text-xs text-white/45 font-mono">Create a transfer</span>
            </div>
            <pre className="p-6 text-sm leading-relaxed font-mono overflow-x-auto text-white/90">
{sample}
            </pre>
          </div>
        </FadeIn>

        {/* Feature trio */}
        <div className="mt-20 grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <FadeIn key={f.title} delay={i * 100}>
              <div className="p-7 rounded-2xl bg-white border border-brand-grayLight/60 shadow-card h-full">
                <div className="w-11 h-11 rounded-xl bg-brand-red/10 text-brand-red flex items-center justify-center">
                  <f.Icon size={20} />
                </div>
                <h3 className="font-display font-extrabold text-xl text-brand-ink mt-5">
                  {f.title}
                </h3>
                <p className="text-sm text-brand-ink/65 mt-2 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Endpoints table */}
        <FadeIn>
          <div className="mt-20">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-brand-ink">
              Core endpoints
            </h2>
            <p className="text-brand-ink/65 mt-2">
              A taste of what&apos;s available. Full reference in the docs.
            </p>
            <div className="mt-7 rounded-2xl bg-white border border-brand-grayLight/60 overflow-hidden shadow-card">
              {endpoints.map((e, i) => (
                <div
                  key={e.path}
                  className={`flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 px-6 py-4 ${
                    i !== endpoints.length - 1 ? "border-b border-brand-grayLight/60" : ""
                  }`}
                >
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded font-mono w-fit ${
                      e.m === "GET"
                        ? "bg-brand-teal/15 text-brand-teal"
                        : e.m === "POST"
                        ? "bg-brand-red/10 text-brand-red"
                        : "bg-brand-ink/10 text-brand-ink"
                    }`}
                  >
                    {e.m}
                  </span>
                  <code className="text-sm font-mono text-brand-ink">{e.path}</code>
                  <span className="sm:ml-auto text-sm text-brand-ink/60">
                    {e.d}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Plan callout */}
        <FadeIn>
          <div className="mt-20 p-10 rounded-3xl bg-gradient-to-br from-brand-dark to-brand-darker text-white grid md:grid-cols-5 gap-8 items-center">
            <div className="md:col-span-3">
              <h3 className="font-display text-3xl font-extrabold">
                API access on Pro
              </h3>
              <p className="text-white/70 mt-2 max-w-lg">
                Unlimited API calls, webhooks, and custom domains are included
                on the Pro plan.
              </p>
            </div>
            <div className="md:col-span-2 space-y-2">
              {["Unlimited calls", "Webhook events", "Signed URLs", "Custom domain"].map((t) => (
                <div key={t} className="flex items-center gap-2 text-sm">
                  <span className="w-5 h-5 rounded-full bg-brand-teal/20 text-brand-teal flex items-center justify-center">
                    <CheckIcon size={12} />
                  </span>
                  {t}
                </div>
              ))}
              <Link href="/pricing" className="btn-primary mt-4 inline-flex">
                See pricing <ArrowRightIcon size={16} />
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </main>
  );
}

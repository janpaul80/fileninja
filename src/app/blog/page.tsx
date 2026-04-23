import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { ArrowRightIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Blog — Fileninja",
  description:
    "Stories, product updates, and engineering deep-dives from the Fileninja team."
};

const posts = [
  {
    tag: "Product",
    date: "Coming soon",
    title: "Introducing Fileninja",
    excerpt:
      "Why we're building the simplest, fastest way to send files — and where we're heading next."
  },
  {
    tag: "Engineering",
    date: "Coming soon",
    title: "How we keep transfers blazing fast",
    excerpt:
      "A peek under the hood at our edge-distributed upload pipeline."
  },
  {
    tag: "Design",
    date: "Coming soon",
    title: "An editorial approach to a SaaS",
    excerpt:
      "Why every Fileninja background is curated, not stocked."
  }
];

export default function BlogPage() {
  return (
    <main className="pt-28 sm:pt-36 pb-24 bg-brand-bg min-h-screen">
      <div className="container-fn">
        <FadeIn>
          <p className="text-xs uppercase tracking-[0.22em] text-brand-red font-bold">
            Blog
          </p>
          <h1 className="font-display text-5xl sm:text-6xl font-extrabold text-brand-ink leading-[0.95] tracking-tightest mt-4 max-w-3xl">
            Notes from the workshop.
          </h1>
          <p className="mt-5 text-lg text-brand-ink/70 max-w-2xl">
            Product news, engineering deep-dives, and the occasional design
            essay. The first posts are on the way.
          </p>
        </FadeIn>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {posts.map((p, i) => (
            <FadeIn key={p.title} delay={i * 100}>
              <article className="h-full p-7 rounded-2xl bg-white border border-brand-grayLight/60 shadow-card hover:-translate-y-1 transition-transform">
                <div className="flex items-center gap-3 text-xs">
                  <span className="px-2.5 py-1 rounded-full bg-brand-red/10 text-brand-red font-bold uppercase tracking-wider">
                    {p.tag}
                  </span>
                  <span className="text-brand-ink/50">{p.date}</span>
                </div>
                <h2 className="font-display font-extrabold text-2xl text-brand-ink mt-5 leading-tight">
                  {p.title}
                </h2>
                <p className="mt-3 text-sm text-brand-ink/65 leading-relaxed">
                  {p.excerpt}
                </p>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-ink/40">
                  Coming soon
                </div>
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <div className="mt-20 p-10 rounded-3xl bg-brand-dark text-white text-center">
            <h2 className="font-display text-3xl font-extrabold">
              Want to be first to know?
            </h2>
            <p className="mt-2 text-white/70 max-w-md mx-auto">
              Create a free account and we&apos;ll let you know when new posts
              go live.
            </p>
            <Link
              href="/signup"
              className="btn-primary mt-7 inline-flex"
            >
              Sign up free <ArrowRightIcon size={16} />
            </Link>
          </div>
        </FadeIn>
      </div>
    </main>
  );
}

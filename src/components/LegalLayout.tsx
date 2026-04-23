import * as React from "react";
import FadeIn from "./FadeIn";

type Props = {
  eyebrow: string;
  title: string;
  updated: string;
  children: React.ReactNode;
};

export default function LegalLayout({ eyebrow, title, updated, children }: Props) {
  return (
    <main className="pt-28 sm:pt-36 pb-24 bg-brand-bg min-h-screen">
      <div className="container-fn max-w-3xl">
        <FadeIn>
          <p className="text-xs uppercase tracking-[0.22em] text-brand-red font-bold">
            {eyebrow}
          </p>
          <h1 className="font-display text-5xl sm:text-6xl font-extrabold text-brand-ink leading-[0.95] tracking-tightest mt-4">
            {title}
          </h1>
          <p className="mt-4 text-sm text-brand-ink/55">
            Last updated: {updated}
          </p>
        </FadeIn>

        <FadeIn delay={120}>
          <article className="mt-12 space-y-6 text-[16px] leading-relaxed text-brand-ink/85 [&_h2]:font-display [&_h2]:font-extrabold [&_h2]:text-2xl [&_h2]:text-brand-ink [&_h2]:mt-10 [&_h2]:mb-3 [&_h3]:font-bold [&_h3]:text-lg [&_h3]:text-brand-ink [&_h3]:mt-6 [&_h3]:mb-2 [&_a]:text-brand-red [&_a]:underline [&_a]:underline-offset-2 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_strong]:text-brand-ink">
            {children}
          </article>
        </FadeIn>
      </div>
    </main>
  );
}

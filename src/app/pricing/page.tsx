import PricingCards from "@/components/PricingCards";
import FadeIn from "@/components/FadeIn";
import { CheckIcon } from "@/components/icons";

const faqs = [
  {
    q: "Can I cancel anytime?",
    a: "Yes. Pro and Business are month-to-month or annual — cancel anytime, no questions asked. You keep access until the end of your billing period."
  },
  {
    q: "What happens to my files if I downgrade?",
    a: "Files in your vault stay safe. If you exceed the Free tier limits, older files are read-only until you upgrade or remove them."
  },
  {
    q: "Do you offer discounts for nonprofits or students?",
    a: "Yes — 50% off Pro for verified students, educators, and registered nonprofits. Email us to apply."
  },
  {
    q: "Is there a free trial for Pro?",
    a: "Yes — every Pro plan starts with a 14-day free trial. No credit card required to start."
  },
  {
    q: "How secure is Fileninja?",
    a: "AES-256 encryption at rest and in transit. SOC 2 Type II certified infrastructure. Optional password protection and download limits on every transfer."
  },
  {
    q: "Can I use my own domain?",
    a: "Pro and Business plans include custom domains (files.yourbrand.com) plus full white-label branding on download pages."
  }
];

export default function PricingPage() {
  return (
    <>
      <section className="pt-36 pb-12 sm:pt-44 sm:pb-16 bg-brand-bg">
        <div className="container-fn text-center max-w-3xl mx-auto">
          <FadeIn>
            <p className="text-xs uppercase tracking-[0.22em] text-brand-red font-semibold mb-4">
              Pricing
            </p>
            <h1 className="h-display text-5xl sm:text-6xl md:text-7xl text-brand-ink">
              Simple plans.
              <br />
              <span className="text-brand-red">Honest pricing.</span>
            </h1>
            <p className="mt-6 text-lg text-brand-ink/65 font-light leading-relaxed">
              Start free forever. Upgrade only when you need more. No hidden
              fees, no surprise overages — ever.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="pb-24 bg-brand-bg">
        <div className="container-fn">
          <FadeIn>
            <PricingCards />
          </FadeIn>
        </div>
      </section>

      {/* Trust strip */}
      <section className="py-16 border-y border-brand-grayLight/60 bg-white">
        <div className="container-fn">
          <FadeIn>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                "AES-256 encryption",
                "SOC 2 Type II certified",
                "GDPR compliant",
                "99.99% uptime SLA"
              ].map((t) => (
                <div
                  key={t}
                  className="flex flex-col items-center gap-2 text-brand-ink/75"
                >
                  <span className="w-10 h-10 rounded-full bg-brand-teal/15 text-brand-teal flex items-center justify-center">
                    <CheckIcon size={18} />
                  </span>
                  <span className="text-sm font-medium">{t}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 sm:py-32 bg-brand-bg">
        <div className="container-fn max-w-4xl mx-auto">
          <FadeIn>
            <p className="text-xs uppercase tracking-[0.22em] text-brand-red font-semibold mb-4">
              FAQ
            </p>
            <h2 className="h-display text-4xl sm:text-5xl text-brand-ink mb-12">
              Questions, answered.
            </h2>
          </FadeIn>

          <div className="space-y-3">
            {faqs.map((f, i) => (
              <FadeIn key={f.q} delay={i * 50}>
                <details className="group bg-white rounded-2xl border border-brand-grayLight/70 hover:border-brand-ink/20 transition-colors">
                  <summary className="cursor-pointer list-none p-6 flex items-center justify-between gap-4">
                    <span className="font-display font-bold text-brand-ink text-lg">
                      {f.q}
                    </span>
                    <span className="shrink-0 w-8 h-8 rounded-full bg-brand-bg text-brand-ink flex items-center justify-center transition-transform group-open:rotate-45">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-6 -mt-1 text-brand-ink/65 leading-relaxed font-light">
                    {f.a}
                  </div>
                </details>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

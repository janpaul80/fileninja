import type { Metadata } from "next";
import ContactForm from "./ContactForm";
import FadeIn from "@/components/FadeIn";
import { MailIcon, ZapIcon, ShieldIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Contact — Fileninja",
  description:
    "Get in touch with the Fileninja team. We typically reply within one business day."
};

export default function ContactPage() {
  return (
    <main className="pt-28 sm:pt-36 pb-24 bg-brand-bg min-h-screen">
      <div className="container-fn">
        <FadeIn>
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.22em] text-brand-red font-bold">
              Contact
            </p>
            <h1 className="font-display text-5xl sm:text-6xl font-extrabold text-brand-ink leading-[0.95] tracking-tightest mt-4">
              Let&apos;s talk.
            </h1>
            <p className="mt-5 text-lg text-brand-ink/70 leading-relaxed">
              Questions about pricing, partnerships, the API, or anything else?
              Drop us a line and we&apos;ll reply within one business day.
            </p>
          </div>
        </FadeIn>

        <div className="mt-14 grid lg:grid-cols-12 gap-10">
          <FadeIn delay={100} className="lg:col-span-7">
            <div className="bg-white rounded-2xl shadow-card border border-brand-grayLight/60 p-7 sm:p-10">
              <ContactForm />
            </div>
          </FadeIn>

          <FadeIn delay={200} className="lg:col-span-5">
            <div className="space-y-5">
              <a
                href="mailto:hello@fileninja.cloud"
                className="flex items-start gap-4 p-6 rounded-2xl bg-white border border-brand-grayLight/60 hover:border-brand-red/40 hover:shadow-card transition-all group"
              >
                <div className="w-11 h-11 rounded-xl bg-brand-red/10 text-brand-red flex items-center justify-center shrink-0 group-hover:bg-brand-red group-hover:text-white transition-colors">
                  <MailIcon size={20} />
                </div>
                <div>
                  <p className="font-display font-bold text-brand-ink">Email</p>
                  <p className="text-sm text-brand-ink/65 mt-0.5">
                    hello@fileninja.cloud
                  </p>
                </div>
              </a>

              <div className="flex items-start gap-4 p-6 rounded-2xl bg-white border border-brand-grayLight/60">
                <div className="w-11 h-11 rounded-xl bg-brand-teal/10 text-brand-teal flex items-center justify-center shrink-0">
                  <ZapIcon size={20} />
                </div>
                <div>
                  <p className="font-display font-bold text-brand-ink">
                    Fast replies
                  </p>
                  <p className="text-sm text-brand-ink/65 mt-0.5">
                    Most messages answered within 24 hours.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 rounded-2xl bg-white border border-brand-grayLight/60">
                <div className="w-11 h-11 rounded-xl bg-brand-ink/5 text-brand-ink flex items-center justify-center shrink-0">
                  <ShieldIcon size={20} />
                </div>
                <div>
                  <p className="font-display font-bold text-brand-ink">
                    Spam-free
                  </p>
                  <p className="text-sm text-brand-ink/65 mt-0.5">
                    Protected by a built-in math challenge — no third-party
                    tracking.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </main>
  );
}

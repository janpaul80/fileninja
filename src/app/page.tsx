import Link from "next/link";
import HeroBackground from "@/components/HeroBackground";
import UploadWidget from "@/components/UploadWidget";
import FeaturesGrid from "@/components/FeaturesGrid";
import FadeIn from "@/components/FadeIn";
import { ArrowRightIcon, SparkleIcon, ZapIcon, ShieldIcon } from "@/components/icons";

const heroWords = ["The", "simple", "way", "to", "send", "your", "stuff."];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden">
        <HeroBackground />

        <div className="container-fn relative z-10 grid lg:grid-cols-12 gap-12 items-center w-full">
          <div className="lg:col-span-7 text-white">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/12 backdrop-blur-md border border-white/20 text-xs uppercase tracking-[0.18em] font-medium animate-fade-in">
              <SparkleIcon size={13} />
              Curated by artists · Built for creators
            </span>

            <h1 className="h-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] mt-6 word-reveal leading-[0.95]">
              {heroWords.map((w, i) => (
                <span
                  key={i}
                  style={{ animationDelay: `${100 + i * 90}ms` }}
                  className="mr-3"
                >
                  {w === "send" ? <span className="text-brand-red">{w}</span> : w}
                </span>
              ))}
            </h1>

            <p
              className="mt-6 text-lg sm:text-xl text-white/85 font-light max-w-xl leading-relaxed opacity-0 animate-fade-in-up"
              style={{ animationDelay: "900ms" }}
            >
              Drop a file. Share a link. That&apos;s it. Up to 5 GB free,
              unlimited on Pro — wrapped in a gallery of artist-curated artwork.
            </p>

            <div
              className="mt-8 flex flex-wrap gap-3 opacity-0 animate-fade-in-up"
              style={{ animationDelay: "1050ms" }}
            >
              <Link href="/signup" className="btn-primary">
                Sign up for free
                <ArrowRightIcon size={18} className="ml-2" />
              </Link>
              <Link href="/pricing" className="btn-ghost text-white border-white/30 bg-white/10 hover:bg-white/20">
                See pricing
              </Link>
            </div>

            <div
              className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-xs uppercase tracking-[0.18em] text-white/70 opacity-0 animate-fade-in-up"
              style={{ animationDelay: "1200ms" }}
            >
              <span className="inline-flex items-center gap-1.5">
                <ZapIcon size={13} /> Lightning fast
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldIcon size={13} /> End-to-end secure
              </span>
              <span className="inline-flex items-center gap-1.5">
                <SparkleIcon size={13} /> No signup required
              </span>
            </div>
          </div>

          <div
            className="lg:col-span-5 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "600ms" }}
          >
            <UploadWidget />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 text-white/70">
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <span className="w-px h-10 bg-gradient-to-b from-white/70 to-transparent" />
        </div>
      </section>

      {/* FEATURES */}
      <FeaturesGrid />

      {/* ARTISTS BAND */}
      <section id="artists" className="py-24 sm:py-32 bg-brand-dark text-white overflow-hidden">
        <div className="container-fn grid lg:grid-cols-2 gap-12 items-center">
          <FadeIn className="text-white">
            <p className="text-xs uppercase tracking-[0.22em] text-brand-red font-semibold mb-4">
              The Artist Program
            </p>
            <h2 className="h-display text-white text-4xl sm:text-5xl md:text-6xl">
              Every page you see
              <br />
              <span className="text-brand-red">is a gallery.</span>
            </h2>
            <p className="mt-6 text-white/85 text-lg font-light max-w-xl leading-relaxed">
              Fileninja has always featured real artists&apos; work as page
              backgrounds. It&apos;s our way of turning a utility tool into a
              moving exhibition — and giving artists a global stage.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 mt-8 text-white link-fn font-medium"
            >
              Submit your work
              <ArrowRightIcon size={18} />
            </Link>
          </FadeIn>

          <FadeIn delay={120}>
            <div className="grid grid-cols-2 gap-3">
              {[
                "https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&w=900&q=80",
                "https://images.unsplash.com/photo-1531913764164-f85c52e6e654?auto=format&fit=crop&w=900&q=80",
                "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=900&q=80",
                "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=900&q=80"
              ].map((src, i) => (
                <div
                  key={src}
                  className={`relative overflow-hidden rounded-2xl ${
                    i % 2 === 0 ? "aspect-[4/5]" : "aspect-[4/5] mt-8"
                  }`}
                >
                  <img
                    src={src}
                    alt="Artist artwork"
                    className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="py-24 sm:py-32 bg-brand-bg">
        <div className="container-fn">
          <FadeIn>
            <div className="relative overflow-hidden rounded-3xl bg-brand-ink text-white p-12 sm:p-16 lg:p-20">
              <div
                className="absolute inset-0 opacity-30 pointer-events-none"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 20% 20%, rgba(230,51,41,0.4), transparent 40%), radial-gradient(circle at 80% 80%, rgba(15,181,165,0.35), transparent 40%)"
                }}
              />
              <div className="relative grid lg:grid-cols-2 gap-10 items-center">
                <div>
                  <h2 className="h-display text-4xl sm:text-5xl md:text-6xl">
                    Ready to send
                    <br />
                    <span className="text-brand-red">like a ninja?</span>
                  </h2>
                  <p className="mt-5 text-white/70 text-lg font-light max-w-md">
                    Start free in seconds. No credit card. Upgrade only when you
                    outgrow it.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row lg:justify-end gap-3">
                  <Link href="/signup" className="btn-primary">
                    Get started free
                    <ArrowRightIcon size={18} className="ml-2" />
                  </Link>
                  <Link
                    href="/pricing"
                    className="btn-ghost text-white border-white/25 bg-white/5 hover:bg-white/15"
                  >
                    Compare plans
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}

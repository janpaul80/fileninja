import {
  SendIcon,
  ShieldIcon,
  CloudIcon,
  LinkIcon,
  UsersIcon,
  ChartIcon,
  ZapIcon,
  GlobeIcon,
  CodeIcon
} from "./icons";
import FadeIn from "./FadeIn";

const features = [
  {
    Icon: SendIcon,
    title: "Send anything, instantly",
    desc: "Up to 5 GB free, unlimited on Pro. Drag, drop, done — no signup required for quick transfers."
  },
  {
    Icon: ShieldIcon,
    title: "End-to-end secure",
    desc: "AES-256 encryption in transit and at rest. Optional password protection on every transfer."
  },
  {
    Icon: CloudIcon,
    title: "Personal vault",
    desc: "Store up to 2TB of files in your private vault. Organize, share, and access from anywhere."
  },
  {
    Icon: LinkIcon,
    title: "Beautiful share links",
    desc: "Branded download pages with previews. Track who downloaded what — and when."
  },
  {
    Icon: UsersIcon,
    title: "File request portals",
    desc: "Collect files from clients without back-and-forth emails. Custom branded intake pages."
  },
  {
    Icon: ChartIcon,
    title: "Download tracking",
    desc: "Real-time analytics on every transfer. See opens, downloads, and geo-location at a glance."
  },
  {
    Icon: ZapIcon,
    title: "Lightning fast",
    desc: "Multi-region edge upload. Send 10GB in minutes, not hours, on a typical connection."
  },
  {
    Icon: GlobeIcon,
    title: "Custom domain",
    desc: "Send from files.yourdomain.com with full white-label branding on Pro."
  },
  {
    Icon: CodeIcon,
    title: "Developer API",
    desc: "Full REST API + webhooks. Automate transfers, integrate with your stack, build on Fileninja."
  }
];

export default function FeaturesGrid() {
  return (
    <section id="features" className="py-24 sm:py-32 bg-brand-bg">
      <div className="container-fn">
        <FadeIn className="max-w-2xl mb-16 sm:mb-20">
          <p className="text-xs uppercase tracking-[0.22em] text-brand-red font-semibold mb-4">
            What we offer
          </p>
          <h2 className="h-display text-4xl sm:text-5xl md:text-6xl text-brand-ink">
            Everything you need to move
            <br />
            <span className="text-brand-red">files like a ninja.</span>
          </h2>
          <p className="mt-6 text-lg text-brand-ink/65 leading-relaxed font-light max-w-xl">
            From quick one-off transfers to enterprise-grade workflows — Fileninja
            scales with you, without the bloat.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {features.map((f, i) => (
            <FadeIn key={f.title} delay={i * 60}>
              <div className="group h-full bg-white rounded-2xl p-7 border border-brand-grayLight/60 shadow-card hover:shadow-soft hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-brand-red/10 text-brand-red flex items-center justify-center mb-5 group-hover:bg-brand-red group-hover:text-white transition-colors">
                  <f.Icon size={22} />
                </div>
                <h3 className="font-display font-bold text-brand-ink text-xl mb-2 tracking-tight">
                  {f.title}
                </h3>
                <p className="text-brand-ink/60 text-[15px] leading-relaxed font-light">
                  {f.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

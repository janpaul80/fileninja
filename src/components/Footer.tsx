import Link from "next/link";
import Image from "next/image";
import { XBrandIcon, LinkedInIcon, InstagramIcon, GithubIcon } from "./icons";

const cols = [
  {
    title: "Product",
    links: [
      { href: "/", label: "Send files" },
      { href: "/pricing", label: "Pricing" },
      { href: "/features", label: "Features" },
      { href: "/developer-api", label: "Developer API" },
      { href: "/vault", label: "Personal Vault" }
    ]
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/blog", label: "Blog" },
      { href: "/contact", label: "Contact" }
    ]
  },
  {
    title: "Legal",
    links: [
      { href: "/terms", label: "Terms" },
      { href: "/privacy", label: "Privacy" },
      { href: "/security", label: "Security" },
      { href: "/dpa", label: "DPA" },
      { href: "/cookies", label: "Cookies" }
    ]
  }
];

const socials = [
  { Icon: XBrandIcon, href: "https://x.com/revprodev", label: "X" },
  { Icon: InstagramIcon, href: "https://www.instagram.com/jphartmann8?igsh=bTFwNjZnODducjZr&utm_source=qr", label: "Instagram" },
  {
    Icon: LinkedInIcon,
    href: "https://www.linkedin.com/in/hartmanndev?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
    label: "LinkedIn"
  },
  { Icon: GithubIcon, href: "https://github.com/janpaul80", label: "GitHub" }
];

export default function Footer() {
  return (
    <footer className="bg-brand-darker text-white/80 mt-24">
      <div className="container-fn pt-20 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10 md:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0">
                <Image
                  src="/logo.png"
                  alt="Fileninja"
                  fill
                  sizes="56px"
                  className="object-contain"
                />
              </div>
              <span className="font-display font-extrabold text-2xl text-white tracking-tight">
                File<span className="text-brand-red">ninja</span>
              </span>
            </Link>
            <p className="text-sm text-white/60 mt-5 max-w-sm leading-relaxed">
              The simple, beautiful way to send your stuff. Built for creators,
              developers and teams that move fast.
            </p>
            <div className="flex gap-2 mt-6">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-brand-red text-white/70 hover:text-white flex items-center justify-center transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="font-display font-bold text-white text-sm uppercase tracking-[0.16em] mb-4">
                {c.title}
              </h4>
              <ul className="space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-white/65 hover:text-white transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-white/45">
            © {new Date().getFullYear()} Fileninja. All rights reserved.
          </p>
          <p className="text-xs text-white/45">
            Crafted with care · hello@fileninja.cloud
          </p>
        </div>
      </div>
    </footer>
  );
}

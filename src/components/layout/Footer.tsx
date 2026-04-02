import Image from "next/image";
import Link from "next/link";
import type { FooterConfig, SiteConfigLink } from "@/lib/storyblok";

const fallbackColumns: Array<{ title: string; links: SiteConfigLink[] }> = [
  {
    title: "Company",
    links: [
      { label: "Home", href: "/" },
      { label: "Features", href: "/features" },
      { label: "About Us", href: "/about-us" },
      { label: "Pricing", href: "/contact" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "Trendings", href: "/blogs" },
      { label: "About Us", href: "/about-us" },
      { label: "Features", href: "/features" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Support Center", href: "/contact" },
      { label: "Contact Us", href: "/contact" },
      { label: "FAQs", href: "/#faq" },
    ],
  },
  {
    title: "Movement",
    links: [
      { label: "What is Conalytic?", href: "/about-us" },
      { label: "Support Us", href: "/contact" },
    ],
  },
];

const fallbackSocialLinks = [
  { label: "Facebook", href: "https://facebook.com/conalytic" },
  { label: "LinkedIn", href: "https://linkedin.com/company/conalytic" },
  { label: "Instagram", href: "https://instagram.com/conalytic" },
  { label: "X", href: "https://twitter.com/conalytic" },
];

const fallbackLegalLinks: SiteConfigLink[] = [
  { label: "Terms", href: "/terms" },
  { label: "Privacy", href: "/privacy" },
  { label: "Security", href: "/cookies" },
];

interface FooterProps {
  config?: FooterConfig | null;
}

export function Footer({ config }: FooterProps) {
  const email = config?.email || "info@conalytic.com";
  const columns = config?.columns?.length ? config.columns : fallbackColumns;
  const socialLinks = config?.socialLinks?.length ? config.socialLinks : fallbackSocialLinks;
  const legalLinks = config?.legalLinks?.length ? config.legalLinks : fallbackLegalLinks;
  const copyrightText = config?.copyrightText || "© 2025 Conalytic. All rights reserved.";

  return (
    <div className="px-4 pb-4 pt-2">
      <footer className="relative overflow-hidden rounded-3xl">
        <div
          className="absolute inset-0 dark:hidden"
          style={{ background: "linear-gradient(135deg,#ede9fe 0%,#f3e8ff 30%,#fce7f3 60%,#fef3c7 100%)" }}
        />
        <div
          className="absolute inset-0 hidden dark:block"
          style={{ background: "linear-gradient(135deg,#0E0B1C 0%,#0C0C12 40%,#0B0E1C 100%)" }}
        />
        <div
          className="pointer-events-none absolute inset-0 hidden dark:block"
          style={{ background: "radial-gradient(ellipse 70% 60% at 30% 100%, rgba(107,95,248,0.08) 0%, transparent 65%)" }}
        />

        <div className="relative z-10 mx-auto max-w-6xl px-8 sm:px-12">
          <div className="flex flex-row flex-wrap items-center justify-between gap-4 pb-6 pt-10">
            <Link href="/" className="inline-flex shrink-0">
              <Image src="/logo.png" alt="Conalytic" width={130} height={38} className="h-8 w-auto dark:hidden" />
              <Image src="/logo-white.png" alt="Conalytic" width={130} height={38} className="hidden h-8 w-auto dark:block" />
            </Link>
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-gray-800 dark:text-white/50 dark:hover:text-white"
            >
              {email}
            </a>
          </div>

          <div className="grid grid-cols-2 gap-8 pb-8 pt-2 sm:grid-cols-4 lg:grid-cols-4">
            {columns.map((column) => (
              <div key={column.title}>
                <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-gray-800 dark:text-white">{column.title}</h4>
                <ul className="space-y-2.5">
                  {column.links.map((link) => (
                    <li key={`${link.label}-${link.href}`}>
                      <Link
                        href={link.href}
                        className="text-sm leading-none text-gray-500 transition-colors hover:text-brand-600 dark:text-white/45 dark:hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center justify-between gap-4 border-t border-black/8 py-6 dark:border-white/8 sm:flex-row">
            <div className="flex items-center gap-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 dark:border-white/20">
                <Image src="/logo-icon.png" alt="" width={16} height={16} />
              </div>
              <span className="text-xs text-gray-400 dark:text-white/30">{copyrightText}</span>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={`${social.label}-${social.href}`}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-gray-400 transition-colors hover:text-brand-600 dark:text-white/30 dark:hover:text-white"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-400 dark:text-white/30">
                {legalLinks.map((link) => (
                  <Link key={`${link.label}-${link.href}`} href={link.href} className="transition-colors hover:text-gray-600 dark:hover:text-white">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}


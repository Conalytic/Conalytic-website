/**
 * Site footer: newsletter signup, link columns, legal + social; Storyblok `FooterConfig` overrides fallbacks.
 */
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import type { FooterConfig, SiteBrandLogos, SiteConfigLink } from "@/lib/storyblok";
import { NewsletterSignup } from "@/components/layout/NewsletterSignup";
import { EXTERNAL_PRIVACY_POLICY_URL, EXTERNAL_TERMS_OF_SERVICE_URL } from "@/lib/legal-external-urls";

const fallbackColumns: Array<{ title: string; links: SiteConfigLink[] }> = [
  {
    title: "Company",
    links: [
      { label: "Home", href: "/" },
      { label: "Features", href: "/features" },
      { label: "About Us", href: "/about-us" },
      { label: "Pricing", href: "/#pricing" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blogs" },
      { label: "Integrations", href: "/integrations" },
      { label: "Careers", href: "/careers" },
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
    title: "Product",
    links: [
      { label: "Conversational Analytics", href: "/products/conversational-analytics" },
      { label: "Report Builder", href: "/products/report-builder", comingSoon: true },
      { label: "Applicant Tracking System", href: "/products/applicant-tracking-system", comingSoon: true },
      { label: "Brand assets", href: "/brand" },
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
  { label: "Terms", href: EXTERNAL_TERMS_OF_SERVICE_URL },
  { label: "Privacy", href: EXTERNAL_PRIVACY_POLICY_URL },
  { label: "Cookies", href: "/cookies" },
];

/* Source: Conalytic Assets — served from /public for next/image */
const TAGLINE_W = 1913;
const TAGLINE_H = 486;

interface FooterProps {
  config?: FooterConfig | null;
  brandLogos?: SiteBrandLogos | null;
}

function isExternalHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://") || href.startsWith("mailto:");
}

function FooterColumnLink({ href, className, children }: { href: string; className: string; children: ReactNode }) {
  if (isExternalHref(href)) {
    return (
      <a
        href={href}
        className={className}
        {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export function Footer({ config, brandLogos }: FooterProps) {
  const email = config?.email || "admin@conalytic.com";
  const taglineLight = brandLogos?.footerTaglineLight ?? "/logo-tagline-light.png";
  const taglineDark = brandLogos?.footerTaglineDark ?? "/logo-tagline-white.png";
  const taglineAlt = brandLogos?.footerTaglineAlt ?? "Conalytic";
  const footerMark = brandLogos?.footerMarkIcon ?? "/logo-icon.png";
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
          {/*
            Top band: newsletter (copy + form) on the left; larger logo with contact email stacked on the right.
          */}
          <div className="flex flex-col gap-10 border-b border-black/8 pb-10 pt-10 dark:border-white/8 lg:flex-row lg:items-start lg:justify-between lg:gap-14">
            <NewsletterSignup className="flex-1 lg:max-w-none" />

            <div className="flex shrink-0 flex-col items-start gap-3 sm:gap-4 lg:items-end lg:pt-1">
              <Link
                href="/"
                className="inline-flex leading-none"
                aria-label="Conalytic — Home"
              >
                <Image
                  src={taglineLight}
                  alt={taglineAlt}
                  width={TAGLINE_W}
                  height={TAGLINE_H}
                  className="block h-11 w-auto max-w-[min(300px,88vw)] sm:h-14 sm:max-w-[min(380px,85vw)] lg:h-16 lg:max-w-[420px] dark:hidden"
                />
                <Image
                  src={taglineDark}
                  alt={taglineAlt}
                  width={TAGLINE_W}
                  height={TAGLINE_H}
                  className="hidden h-11 w-auto max-w-[min(300px,88vw)] sm:h-14 sm:max-w-[min(380px,85vw)] lg:h-16 lg:max-w-[420px] dark:block"
                />
              </Link>
              <a
                href={`mailto:${email}`}
                className="max-w-full break-all text-left text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-white/55 dark:hover:text-white lg:text-right"
                aria-label={`Email ${email}`}
              >
                {email}
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 pb-8 pt-8 sm:grid-cols-4 lg:grid-cols-4">
            {columns.map((column) => (
              <div key={column.title}>
                <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-gray-800 dark:text-white">{column.title}</h4>
                <ul className="space-y-2.5">
                  {column.links.map((link) => (
                    <li key={`${link.label}-${link.href}`}>
                      <FooterColumnLink
                        href={link.href}
                        className="text-sm leading-none text-gray-500 transition-colors hover:text-brand-600 dark:text-white/45 dark:hover:text-white"
                      >
                        <span className="inline-flex flex-wrap items-center gap-2">
                          {link.label}
                          {link.comingSoon ? (
                            <span className="text-[9px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-500/15 border border-amber-200/80 dark:border-amber-500/30 px-1.5 py-0.5 rounded-md">
                              Coming soon
                            </span>
                          ) : null}
                        </span>
                      </FooterColumnLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center justify-between gap-5 border-t border-black/8 py-6 dark:border-white/8 sm:flex-row sm:items-center sm:gap-4">
            <div className="flex max-w-full items-center gap-3 text-center sm:text-left">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gray-300 dark:border-white/20">
                <Image src={footerMark} alt="" width={16} height={16} />
              </div>
              <span className="text-xs text-gray-400 dark:text-white/30">{copyrightText}</span>
            </div>

            <div className="flex w-full min-w-0 max-w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:justify-end sm:gap-x-6 sm:gap-y-2">
              <nav
                aria-label="Social"
                className="flex max-w-full flex-wrap justify-center gap-x-3 gap-y-2 sm:justify-end"
              >
                {socialLinks.map((social) => (
                  <a
                    key={`${social.label}-${social.href}`}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="whitespace-nowrap text-xs text-gray-400 transition-colors hover:text-brand-600 dark:text-white/30 dark:hover:text-white"
                    aria-label={`${social.label} (opens in new tab)`}
                  >
                    {social.label}
                  </a>
                ))}
              </nav>
              <nav
                aria-label="Legal"
                className="flex max-w-full flex-wrap justify-center gap-x-3 gap-y-2 sm:justify-end sm:gap-x-4"
              >
                {legalLinks.map((link) => (
                  <FooterColumnLink
                    key={`${link.label}-${link.href}`}
                    href={link.href}
                    className="whitespace-nowrap text-xs text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-white dark:text-white/30"
                  >
                    {link.label}
                  </FooterColumnLink>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}


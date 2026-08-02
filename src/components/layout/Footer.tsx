/**
 * Site footer: newsletter signup, link columns, legal; optional `FooterConfig` overrides fallbacks.
 */
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import type { FooterConfig, SiteBrandLogos, SiteConfigLink } from "@/lib/site-layout";
import { NewsletterSignup } from "@/components/layout/NewsletterSignup";
import { BrandAmbient } from "@/components/visual/BrandAmbient";
import { conalyticLogoAlt } from "@/lib/image-alt";
import { PRIVACY_POLICY_PATH, TERMS_OF_SERVICE_PATH } from "@/lib/legal-urls";
import { SITE_ROUTES } from "@/lib/site-links";

const fallbackColumns: Array<{ title: string; links: SiteConfigLink[] }> = [
  {
    title: "Company",
    links: [
      { label: "Home", href: SITE_ROUTES.home },
      { label: "Features", href: SITE_ROUTES.features },
      { label: "About Us", href: SITE_ROUTES.about },
      { label: "Pricing", href: SITE_ROUTES.pricing },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: SITE_ROUTES.blogs },
      { label: "Integrations", href: SITE_ROUTES.integrations },
      { label: "Careers", href: SITE_ROUTES.careers },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Support Center", href: SITE_ROUTES.contact },
      { label: "Contact Us", href: SITE_ROUTES.contact },
      { label: "FAQs", href: SITE_ROUTES.faq },
    ],
  },
  {
    title: "Product",
    links: [
      { label: "Conversational Analytics", href: SITE_ROUTES.products.conversationalAnalytics },
      { label: "KPIs Tracker", href: SITE_ROUTES.products.kpisTracker },
      { label: "Report Builder", href: SITE_ROUTES.products.reportBuilder },
      { label: "Brand assets", href: SITE_ROUTES.brand },
    ],
  },
];

const fallbackLegalLinks: SiteConfigLink[] = [
  { label: "Terms", href: TERMS_OF_SERVICE_PATH },
  { label: "Privacy", href: PRIVACY_POLICY_PATH },
  { label: "Cookies", href: SITE_ROUTES.cookies },
];

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
  const taglineLight = brandLogos?.footerTaglineLight ?? "/logo-tagline-light.png";
  const taglineDark = brandLogos?.footerTaglineDark ?? "/logo-tagline-white.png";
  const taglineAlt = brandLogos?.footerTaglineAlt ?? conalyticLogoAlt("wordmark with tagline");
  const footerMark = brandLogos?.footerMarkIcon ?? "/logo-icon.png";
  const columns = config?.columns?.length ? config.columns : fallbackColumns;
  const legalLinks = config?.legalLinks?.length ? config.legalLinks : fallbackLegalLinks;
  const copyrightText = config?.copyrightText || "© 2026 Conalytic. All rights reserved.";

  return (
    <div className="px-3 pb-3 pt-2 sm:px-4">
      <footer className="relative overflow-hidden rounded-2xl border border-gray-200/80 bg-white dark:border-white/[0.08] dark:bg-[#14141B] sm:rounded-3xl">
        <BrandAmbient variant="footer" />

        <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8 md:px-12">
          <div className="flex flex-col gap-8 border-b border-gray-200/80 pb-8 pt-8 dark:border-white/[0.08] sm:pt-10 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
            <NewsletterSignup className="w-full max-w-none sm:max-w-[18rem] lg:shrink-0" />

            <div className="flex shrink-0 flex-col items-start gap-3 sm:gap-4 lg:items-end lg:pt-1">
              <Link href="/" className="inline-flex leading-none" aria-label="Conalytic — Home">
                <Image
                  src={taglineLight}
                  alt={taglineAlt}
                  width={TAGLINE_W}
                  height={TAGLINE_H}
                  className="block h-11 w-auto max-w-[min(300px,88vw)] dark:hidden sm:h-14 sm:max-w-[min(380px,85vw)] lg:h-16 lg:max-w-[420px]"
                />
                <Image
                  src={taglineDark}
                  alt={taglineAlt}
                  width={TAGLINE_W}
                  height={TAGLINE_H}
                  className="hidden h-11 w-auto max-w-[min(300px,88vw)] dark:block sm:h-14 sm:max-w-[min(380px,85vw)] lg:h-16 lg:max-w-[420px]"
                />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 pb-8 pt-8 min-[480px]:grid-cols-2 sm:grid-cols-4">
            {columns.map((column) => (
              <div key={column.title}>
                <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white">
                  {column.title}
                </h4>
                <ul className="space-y-2.5">
                  {column.links.map((link) => (
                    <li key={`${link.label}-${link.href}`}>
                      <FooterColumnLink
                        href={link.href}
                        className="text-sm leading-none text-gray-500 transition-colors hover:text-brand-600 dark:text-white/45 dark:hover:text-brand-300"
                      >
                        <span className="inline-flex flex-wrap items-center gap-2">{link.label}</span>
                      </FooterColumnLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center justify-between gap-5 border-t border-gray-200/80 py-6 dark:border-white/[0.08] sm:flex-row">
            <div className="flex max-w-full items-center gap-3 text-center sm:text-left">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gray-200 dark:border-white/15">
                <Image src={footerMark} alt={conalyticLogoAlt("footer icon")} width={16} height={16} />
              </div>
              <span className="text-xs text-gray-400 dark:text-white/35">{copyrightText}</span>
            </div>

            <nav
              aria-label="Legal"
              className="flex max-w-full flex-wrap justify-center gap-x-4 gap-y-2 sm:justify-end"
            >
              {legalLinks.map((link) => (
                <FooterColumnLink
                  key={`${link.label}-${link.href}`}
                  href={link.href}
                  className="whitespace-nowrap text-xs text-gray-400 transition-colors hover:text-gray-700 dark:text-white/35 dark:hover:text-white"
                >
                  {link.label}
                </FooterColumnLink>
              ))}
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}

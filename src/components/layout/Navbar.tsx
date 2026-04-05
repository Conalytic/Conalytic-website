"use client";

/**
 * Primary nav + mobile menu: Storyblok `NavbarConfig` when present, else fallback links (Products dropdown, coming soon).
 */
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn, isExternalNavigationHref } from "@/lib/utils";
import type { NavbarConfig, SiteBrandLogos, SiteConfigLink } from "@/lib/storyblok";

const fallbackNavigation: SiteConfigLink[] = [
  { label: "Home", href: "/" },
  {
    label: "Products",
    href: "#",
    children: [
      { label: "Conversational Analytics", href: "/products/conversational-analytics", description: "Ask questions in plain English, get instant insights" },
      { label: "Report Builder", href: "/products/report-builder", description: "AI-powered professional report automation", comingSoon: true },
      { label: "Applicant Tracking System", href: "/products/applicant-tracking-system", description: "Smart recruitment and talent management", comingSoon: true },
    ],
  },
  { label: "Features", href: "/features" },
  { label: "About", href: "/about-us" },
  {
    label: "Resources",
    href: "#",
    children: [
      { label: "Integrations", href: "/integrations", description: "Connect with your favorite tools" },
      { label: "Blogs", href: "/blogs", description: "Tips, trends, and analytics insights" },
      { label: "Careers", href: "/careers", description: "Join the Conalytic team" },
    ],
  },
];

interface NavbarProps {
  config?: NavbarConfig | null;
  /** From Storyblok `site_config` assets; optional. */
  brandLogos?: SiteBrandLogos | null;
}

export function Navbar({ config, brandLogos }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  const navigation = config?.links?.length ? config.links : fallbackNavigation;
  const loginLabel = config?.loginLabel || "Login";
  const loginHref = config?.loginHref || "https://app.conalytic.com/login";
  const primaryCtaLabel = config?.primaryCtaLabel || "Book A Demo";
  const primaryCtaHref = config?.primaryCtaHref || "/contact";
  const primaryCtaIsExternal = isExternalNavigationHref(primaryCtaHref);
  const navLogoLight = brandLogos?.navbarLogoLight ?? "/logo.png";
  const navLogoDark = brandLogos?.navbarLogoDark ?? "/logo-white.png";
  const navLogoAlt = brandLogos?.navbarLogoAlt ?? "Conalytic";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-4">
      <div
        className={cn(
          "mx-auto max-w-5xl rounded-2xl transition-all duration-300",
          scrolled
            ? "border border-black/8 bg-white/88 shadow-xl shadow-black/8 backdrop-blur-2xl dark:border-white/[0.07] dark:bg-[#121219]/90 dark:shadow-black/50"
            : "border border-black/6 bg-white/72 shadow-lg shadow-black/5 backdrop-blur-xl dark:border-white/[0.06] dark:bg-[#0C0C12]/80 dark:shadow-black/30"
        )}
      >
        <nav className="px-5 sm:px-6">
          <div className="flex h-14 items-center justify-between">
            <Link href="/" className="flex shrink-0 items-center" aria-label="Conalytic — Home">
              <Image src={navLogoLight} alt={navLogoAlt} width={140} height={40} className="h-8 w-auto dark:hidden" priority />
              <Image src={navLogoDark} alt={navLogoAlt} width={140} height={40} className="hidden h-8 w-auto dark:block" priority />
            </Link>

            <div className="hidden items-center gap-0.5 lg:flex">
              {navigation.map((item) =>
                item.children && item.children.length > 0 ? (
                  <div
                    key={`${item.label}-${item.href}`}
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(item.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      type="button"
                      aria-expanded={activeDropdown === item.label}
                      aria-haspopup="true"
                      className={cn(
                        "flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                        "text-gray-600 hover:bg-black/5 hover:text-gray-900",
                        "dark:text-white/65 dark:hover:bg-white/5 dark:hover:text-white"
                      )}
                    >
                      {item.label}
                      <ChevronDown className={cn("h-3 w-3 transition-transform duration-200", activeDropdown === item.label && "rotate-180")} aria-hidden />
                    </button>
                    <div
                      className={cn(
                        "absolute left-1/2 top-full w-72 -translate-x-1/2 pt-2 transition-all duration-200",
                        activeDropdown === item.label ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
                      )}
                    >
                      <div className="overflow-hidden rounded-2xl border border-black/8 bg-white p-2 shadow-xl shadow-black/10 dark:border-white/[0.07] dark:bg-[#18181F] dark:shadow-black/60">
                        {item.children.map((child) => (
                          <Link
                            key={`${child.label}-${child.href}`}
                            href={child.href}
                            className="group flex flex-col gap-0.5 rounded-xl px-4 py-3 transition-colors hover:bg-black/5 dark:hover:bg-white/5"
                          >
                            <span className="flex flex-wrap items-center gap-2 text-sm font-medium text-gray-900 transition-colors group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-300">
                              {child.label}
                              {child.comingSoon ? (
                                <span className="text-[9px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-500/15 border border-amber-200/80 dark:border-amber-500/30 px-1.5 py-0.5 rounded-md">
                                  Coming soon
                                </span>
                              ) : null}
                            </span>
                            {child.description && <span className="text-xs text-gray-400 dark:text-white/58">{child.description}</span>}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={`${item.label}-${item.href}`}
                    href={item.href}
                    className={cn(
                      "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                      pathname === item.href
                        ? "bg-brand-50 text-brand-600 dark:bg-brand-600/10 dark:text-brand-300"
                        : "text-gray-600 hover:bg-black/5 hover:text-gray-900 dark:text-white/65 dark:hover:bg-white/5 dark:hover:text-white"
                    )}
                  >
                    {item.label}
                  </Link>
                )
              )}
            </div>

            <div className="hidden shrink-0 items-center gap-2 lg:flex">
              <ThemeToggle />
              <a
                href={loginHref}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-gray-200 bg-white/60 px-4 py-1.5 text-sm font-medium text-gray-600 transition-all duration-200 hover:border-gray-300 hover:bg-white hover:text-gray-900 dark:border-white/15 dark:bg-transparent dark:text-white/70 dark:hover:border-white/25 dark:hover:bg-white/5 dark:hover:text-white"
                aria-label={`${loginLabel} (opens in new tab)`}
              >
                {loginLabel}
              </a>
              {primaryCtaIsExternal ? (
                <a
                  href={primaryCtaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl bg-gray-900 px-4 py-1.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] dark:bg-brand-600 dark:shadow-brand-600/25 dark:hover:bg-brand-700"
                  aria-label={`${primaryCtaLabel} (opens in new tab)`}
                >
                  {primaryCtaLabel}
                </a>
              ) : (
                <Link
                  href={primaryCtaHref}
                  className="rounded-xl bg-gray-900 px-4 py-1.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] dark:bg-brand-600 dark:shadow-brand-600/25 dark:hover:bg-brand-700"
                  aria-label={primaryCtaLabel}
                >
                  {primaryCtaLabel}
                </Link>
              )}
            </div>

            <div className="flex items-center gap-2 lg:hidden">
              <ThemeToggle />
              <button
                className="rounded-lg p-1.5 text-gray-600 transition-colors hover:bg-black/5 hover:text-gray-900 dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-white"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </nav>

        <div className={cn("overflow-hidden transition-all duration-300 lg:hidden", isOpen ? "max-h-screen" : "max-h-0")}>
          <div className="space-y-0.5 border-t border-black/6 px-4 pb-4 pt-1 dark:border-white/6">
            {navigation.map((item) =>
              item.children && item.children.length > 0 ? (
                <div key={`${item.label}-${item.href}`}>
                  <button
                    type="button"
                    aria-expanded={activeDropdown === item.label}
                    aria-haspopup="true"
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-black/5 hover:text-gray-900 dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-white"
                    onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                  >
                    {item.label}
                    <ChevronDown className={cn("h-4 w-4 transition-transform", activeDropdown === item.label && "rotate-180")} aria-hidden />
                  </button>
                  {activeDropdown === item.label && (
                    <div className="ml-3 mt-0.5 space-y-0.5">
                      {item.children.map((child) => (
                        <Link
                          key={`${child.label}-${child.href}`}
                          href={child.href}
                          className="block rounded-xl px-3 py-2 text-sm text-gray-500 transition-colors hover:bg-black/5 hover:text-gray-900 dark:text-white/55 dark:hover:bg-white/5 dark:hover:text-white"
                        >
                          <span className="flex flex-wrap items-center gap-2">
                            {child.label}
                            {child.comingSoon ? (
                              <span className="text-[9px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-500/15 border border-amber-200/80 dark:border-amber-500/30 px-1.5 py-0.5 rounded-md">
                                Coming soon
                              </span>
                            ) : null}
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={`${item.label}-${item.href}`}
                  href={item.href}
                  className={cn(
                    "block rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                    pathname === item.href
                      ? "bg-brand-50 text-brand-600 dark:bg-brand-600/10 dark:text-brand-300"
                      : "text-gray-600 hover:bg-black/5 hover:text-gray-900 dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-white"
                  )}
                >
                  {item.label}
                </Link>
              )
            )}
            <div className="mt-2 flex flex-col gap-2 border-t border-black/6 pt-3 dark:border-white/6">
              <a
                href={loginHref}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full rounded-xl border border-gray-200 py-2.5 text-center text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 dark:border-white/15 dark:text-white dark:hover:bg-white/5"
                aria-label={`${loginLabel} (opens in new tab)`}
              >
                {loginLabel}
              </a>
              {primaryCtaIsExternal ? (
                <a
                  href={primaryCtaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full rounded-xl bg-gray-900 py-2.5 text-center text-sm font-semibold text-white transition-all dark:bg-brand-600 dark:hover:bg-brand-700"
                  aria-label={`${primaryCtaLabel} (opens in new tab)`}
                >
                  {primaryCtaLabel}
                </a>
              ) : (
                <Link
                  href={primaryCtaHref}
                  className="w-full rounded-xl bg-gray-900 py-2.5 text-center text-sm font-semibold text-white transition-all dark:bg-brand-600 dark:hover:bg-brand-700"
                  aria-label={primaryCtaLabel}
                >
                  {primaryCtaLabel}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}


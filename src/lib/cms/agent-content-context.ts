/**
 * Effective on-page copy for the AI agent — merges CMS overlay with component defaults
 * so prompts can target FAQ, pricing, CTA, etc. even when only hero is in robots.json.
 */
import { DEFAULT_HOME_FAQ } from "@/lib/default-home-faq";
import { deepMerge } from "@/lib/cms/deep-merge";

const HOME_SECTION_DEFAULTS: Record<string, unknown> = {
  heroTitleLine1: "Marketing analytics with",
  heroTitleLine2: "Chat, KPIs & Reports",
  heroSubtitle:
    "Ask questions in plain English. Track goals across GA4, Search Console, and Google Ads. Ship client-ready HTML reports — one platform, no SQL.",
  trustedByTitle: "Works with your stack",
  servicesTitleLine1: "Three products.",
  servicesTitleLine2: "One marketing workflow.",
  integrationsTitleLine1: "Seamless integration with",
  integrationsTitleLine2: "your marketing stack",
  integrationsSubtitle:
    "Connect GA4, Google Ads, Search Console, GTM, and Meta — query and report without exporting CSVs.",
  integrationsCtaLabel: "View all integrations",
  testimonialsTitleLine1: "What our customers say",
  testimonialsTitleLine2: "about us",
  testimonialsSubtitle: "Teams use Conalytic to replace ad-hoc reporting and get answers faster.",
  faqTitle: "Frequently asked questions",
  faqSubtitle: "Everything you need to know about Conalytic.",
  faqContactPrefix: "Still have questions?",
  faqContactLabel: "Talk to our team",
  faqContactHref: "/contact",
  faqItems: DEFAULT_HOME_FAQ,
  transformation: {
    eyebrow: "The turning point",
    titleLine1: "The same data.",
    titleLine2: "A completely different outcome.",
  },
  howItWorks: {
    eyebrow: "How it works",
    title: "From question to insight in seconds",
    subtitle:
      "No SQL. No dashboards. No data team required. Just ask — and get an answer your whole team can act on.",
  },
  pricing: {
    eyebrow: "Pricing",
    title: "Simple, transparent pricing",
  },
  ctaTitle: "Ready to transform your marketing analytics?",
  ctaSubtitle: "Join teams who ask questions in plain English and ship client-ready reports.",
};

const PAGE_SECTION_DEFAULTS: Record<string, Record<string, unknown>> = {
  home: HOME_SECTION_DEFAULTS,
};

export function buildEffectiveSections(
  registryId: string,
  overlay: Record<string, unknown>,
): Record<string, unknown> {
  const defaults = PAGE_SECTION_DEFAULTS[registryId];
  const sections =
    overlay.sections && typeof overlay.sections === "object" && !Array.isArray(overlay.sections)
      ? (overlay.sections as Record<string, unknown>)
      : {};
  if (!defaults) return { ...sections };
  return deepMerge(defaults, sections) as Record<string, unknown>;
}

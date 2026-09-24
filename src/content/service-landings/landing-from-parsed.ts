import type { ServiceLandingContent } from "@/lib/service-landing-types";
import type { MarketingStackLogoKey } from "@/lib/marketing-stack-logos";
import { getServiceBySlug } from "@/lib/services-catalog";
import { SITE_ROUTES } from "@/lib/site-links";
import { SEO_ORGANIC_GROWTH_IMAGES } from "@/content/service-landings/seo-organic-growth-assets";
import { SHARED_SERVICE_LANDING_IMAGES } from "@/content/service-landings/shared-service-landing-assets";
import parsedServices from "@/content/service-landings/parsed-services.json";
import { getServiceSeoEnhancement } from "@/content/service-landings/service-seo-enhancements";

type ParsedService = (typeof parsedServices)[number];

function withSeoEnhancements(parsed: ParsedService): ParsedService {
  const seo = getServiceSeoEnhancement(parsed.slug);
  if (!seo) return parsed;

  return {
    ...parsed,
    meta: {
      ...parsed.meta,
      pageTitle: seo.meta.pageTitle,
      description: seo.meta.description,
    },
    hero: {
      ...parsed.hero,
      ...seo.hero,
    },
    whatWeDo: { ...parsed.whatWeDo, title: seo.whatWeDo.title },
    benefits: {
      ...parsed.benefits,
      headline: seo.benefits.headline,
      introBody: seo.benefits.introBody,
    },
    howItWorks: {
      ...parsed.howItWorks,
      title: seo.howItWorks.title,
      subtitle: seo.howItWorks.subtitle,
    },
    process: {
      ...parsed.process,
      title: seo.process.title,
      subtitle: seo.process.subtitle,
    },
    stats: {
      ...parsed.stats,
      title: seo.stats.title,
      stats: parsed.stats.stats.map((item, index) => ({
        ...item,
        value: seo.stats.values[index] ?? item.value,
      })),
    },
    faq: {
      ...parsed.faq,
      title: seo.faq.title,
      subtitle: seo.faq.subtitle,
    },
    finalCta: {
      ...parsed.finalCta,
      title: seo.finalCta.title,
      description: seo.finalCta.description,
    },
  };
}

const MERGED_PARSED_SERVICES = parsedServices.map(withSeoEnhancements);

type WhatWeDoVisual = NonNullable<ServiceLandingContent["whatWeDo"]>["items"][number]["visual"];

type ProcessVisual = ServiceLandingContent["processSteps"][number]["visual"];

const WHAT_WE_DO_VISUALS: WhatWeDoVisual[] = [
  "keyword",
  "content",
  "onpage",
  "technical",
  "indexation",
  "schema",
  "cwv",
  "geo",
  "international",
  "reporting",
  "links",
  "local",
  "gmb",
  "competitor",
];

const PROCESS_VISUALS: ProcessVisual[] = ["seo-audit", "content-cluster", "indexation", "analytics-report"];

const PROCESS_VISUAL_ALIASES: Record<string, ProcessVisual> = {
  "technical-seo-audit": "seo-audit",
  "content-cluster": "content-cluster",
  "indexation-performance": "indexation",
  "analytics-reporting": "analytics-report",
  "paid-search": "seo-audit",
  "paid-social": "content-cluster",
  "creative-testing": "indexation",
  "roas-reporting": "analytics-report",
};

const INTEGRATIONS_BY_SLUG: Partial<Record<string, MarketingStackLogoKey[]>> = {
  "seo-organic-growth": ["googleAnalytics4", "googleSearchConsole", "googleAds", "bingWebmaster"],
  "paid-media-performance": ["googleAds", "googleAnalytics4", "metaAds", "linkedinAds"],
  "email-lifecycle-marketing": ["googleAnalytics4", "microsoftClarity"],
  "generative-engine-optimization": ["googleSearchConsole", "googleAnalytics4", "bingWebmaster"],
  "marketing-analytics-measurement": ["googleAnalytics4", "googleSearchConsole", "googleAds"],
  "conversion-rate-optimization": ["googleAnalytics4", "microsoftClarity"],
};

function resolveWhatWeDoVisual(raw: string, index: number): WhatWeDoVisual {
  if (raw === "vitals") return "cwv";
  if (WHAT_WE_DO_VISUALS.includes(raw as WhatWeDoVisual)) return raw as WhatWeDoVisual;
  return WHAT_WE_DO_VISUALS[index % WHAT_WE_DO_VISUALS.length];
}

function resolveProcessVisual(raw: string, index: number): ProcessVisual {
  return PROCESS_VISUAL_ALIASES[raw] ?? PROCESS_VISUALS[index % PROCESS_VISUALS.length];
}

function buildWhatWeDoCardImages(
  items: ParsedService["whatWeDo"]["items"],
  imagePool: typeof SEO_ORGANIC_GROWTH_IMAGES.whatWeDo,
): ServiceLandingContent["whatWeDoCardImages"] {
  const out: NonNullable<ServiceLandingContent["whatWeDoCardImages"]> = {};
  items.forEach((item, index) => {
    const visual = resolveWhatWeDoVisual(item.visual, index);
    const base = imagePool[visual];
    if (base) {
      out[visual] = { src: base.src, alt: item.alt || base.alt };
    }
  });
  return out;
}

export function buildServiceLandingFromParsed(parsed: ParsedService): ServiceLandingContent {
  const catalog = getServiceBySlug(parsed.slug);
  if (!catalog) {
    throw new Error(`No catalog entry for parsed service slug: ${parsed.slug}`);
  }

  const images =
    parsed.slug === "seo-organic-growth" ? SEO_ORGANIC_GROWTH_IMAGES : SHARED_SERVICE_LANDING_IMAGES;

  const whatWeDoItems = parsed.whatWeDo.items.map((item, index) => {
    const visual = resolveWhatWeDoVisual(item.visual, index);
    return {
      title: item.title,
      description: item.description,
      exploreLabel: item.linkLabel,
      href: item.linkHref,
      visual,
    };
  });

  const processSteps = parsed.process.rows.map((row, index) => {
    const visual = resolveProcessVisual(row.visual, index);
    const story = images.processStories[visual];
    return {
      eyebrow: row.eyebrow,
      title: row.title,
      description: row.description,
      linkLabel: row.linkLabel,
      linkHref: row.linkHref,
      imageSide: row.imageSide as "left" | "right",
      visual,
      imageSrc: story.src,
      imageAlt: row.alt || story.alt,
    };
  });

  const highlights = parsed.catalog.highlights.length ? parsed.catalog.highlights : catalog.highlights;
  const deliverables = parsed.catalog.deliverables.length ? parsed.catalog.deliverables : catalog.deliverables;

  return {
    slug: parsed.slug,
    eyebrow: parsed.hero.eyebrow,
    heroTitle: parsed.hero.line1,
    heroTitleHighlight: parsed.hero.line2,
    heroDescription: parsed.hero.paragraph1,
    heroDescriptionSecondary: parsed.hero.paragraph2,
    heroCtaLabel: "Book a strategy call",
    heroCtaHref: SITE_ROUTES.contact,
    heroSecondaryCtaLabel: "See what we deliver",
    heroSecondaryCtaHref: "#what-we-do",
    heroCarouselImages: images.heroSlides,
    heroTrustBadges: parsed.hero.trustBadges.map((badge) => ({
      title: badge.title,
      subtitle: badge.subtitle,
      accent: badge.accent as "slate" | "rose" | "emerald" | "amber" | undefined,
    })),
    crmCmsMarqueeTitle: parsed.hero.marqueeTitle,
    benefitsShowcase: {
      eyebrow: parsed.benefits.eyebrow,
      headline: parsed.benefits.headline,
      introTitle: parsed.benefits.introTitle,
      introBody: parsed.benefits.introBody,
      imageSrc: images.benefits.src,
      imageAlt: parsed.benefits.imageAlt ?? images.benefits.alt,
      items: parsed.benefits.items,
    },
    whatWeDoCardImages: buildWhatWeDoCardImages(parsed.whatWeDo.items, images.whatWeDo),
    whatWeDo: {
      eyebrow: "What we do",
      title: parsed.whatWeDo.title,
      items: whatWeDoItems,
    },
    uspStack: {
      panels: [
        {
          eyebrow: parsed.uspStack.dark.eyebrow,
          title: parsed.uspStack.dark.title,
          description: parsed.uspStack.dark.description,
          ctaLabel: parsed.uspStack.dark.ctaLabel,
          ctaHref: parsed.uspStack.dark.ctaHref,
          theme: "dark",
          imagePosition: "left",
          visual: "compliance",
        },
        {
          eyebrow: parsed.uspStack.light.eyebrow,
          title: parsed.uspStack.light.title,
          description: parsed.uspStack.light.description,
          ctaLabel: parsed.uspStack.light.ctaLabel,
          ctaHref: parsed.uspStack.light.ctaHref,
          theme: "light",
          imagePosition: "right",
          visual: "tracking",
        },
      ],
    },
    introParagraph: `${parsed.hero.paragraph1} ${parsed.hero.paragraph2}`.trim(),
    trustHeadline: `Trusted by teams investing in ${catalog.title.toLowerCase()}`,
    trustLabels: ["B2B SaaS", "Marketing agencies", "Professional services", "FinTech", "HealthTech", "E‑commerce"],
    keyBenefitsEyebrow: "Key benefits",
    keyBenefitsTitle: `How Conalytic ${catalog.title} delivers`,
    keyBenefits: highlights.slice(0, 3).map((description, i) => ({
      icon: (["trending-up", "shield-check", "layers"] as const)[i] ?? "zap",
      title: deliverables[i] ?? catalog.title,
      description,
    })),
    processTitle: parsed.process.title,
    processSubtitle: parsed.process.subtitle,
    processSteps,
    featureGridTitle: `Capabilities in our ${catalog.title} engagements`,
    featureGrid: deliverables.map((description, i) => ({
      icon: (["search", "bar-chart", "target", "gauge"] as const)[i % 4] ?? "zap",
      title: highlights[i] ?? deliverables[i] ?? catalog.title,
      description,
    })),
    integrationsTitle: "Connect to your stack",
    integrationsSubtitle: "We work inside the analytics, ads, CRM, and dev tools you already use.",
    integrationLogos: INTEGRATIONS_BY_SLUG[parsed.slug] ?? ["googleAnalytics4", "googleSearchConsole"],
    integrationsCtaLabel: "See integrations",
    integrationsCtaHref: SITE_ROUTES.integrations,
    statsSectionTitle: parsed.stats.title,
    stats: parsed.stats.stats,
    howItWorksTitle: parsed.howItWorks.title,
    howItWorksSubtitle: parsed.howItWorks.subtitle,
    howItWorksSteps: parsed.howItWorks.steps,
    testimonialsTitle: "What clients say",
    testimonials: [],
    resourcesTitle: "Resources",
    resources: [{ category: "Blog", title: "Marketing analytics articles", href: SITE_ROUTES.blogs }],
    faqTitle: parsed.faq.title,
    faqSubtitle: parsed.faq.subtitle,
    faqItems: parsed.faq.items,
    finalCtaEyebrow: parsed.finalCta.eyebrow,
    finalCtaTitle: parsed.finalCta.title,
    finalCtaDescription: parsed.finalCta.description,
    finalCtaLabel: parsed.finalCta.ctaLabel ?? "Book a consultation",
    finalCtaHref: SITE_ROUTES.contact,
  };
}

export const PARSED_SERVICE_LANDINGS: Record<string, ServiceLandingContent> = Object.fromEntries(
  MERGED_PARSED_SERVICES.map((parsed) => [parsed.slug, buildServiceLandingFromParsed(parsed)]),
);

export function getParsedServiceMeta(slug: string) {
  const parsed = MERGED_PARSED_SERVICES.find((s) => s.slug === slug);
  if (!parsed) return undefined;
  const seo = getServiceSeoEnhancement(slug);
  return {
    ...parsed.meta,
    keywords: seo?.meta.keywords,
  };
}

export function getServiceSeoKeywords(slug: string): string[] {
  return getServiceSeoEnhancement(slug)?.meta.keywords ?? [];
}

/** Apply catalog + meta onto in-memory service catalog entries. */
export function applyParsedCatalogOverrides(): void {
  for (const parsed of MERGED_PARSED_SERVICES) {
    const service = getServiceBySlug(parsed.slug);
    if (!service) continue;
    if (parsed.meta.title) service.title = parsed.meta.title;
    if (parsed.meta.description) service.metaDescription = parsed.meta.description;
    if (parsed.meta.navDescription) service.navDescription = parsed.meta.navDescription;
    if (parsed.catalog.heroSubtitle) service.heroSubtitle = parsed.catalog.heroSubtitle;
    if (parsed.catalog.highlights.length) service.highlights = parsed.catalog.highlights;
    if (parsed.catalog.deliverables.length) service.deliverables = parsed.catalog.deliverables;
  }
}

applyParsedCatalogOverrides();

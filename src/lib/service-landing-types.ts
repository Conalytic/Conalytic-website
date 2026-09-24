import type { LucideIcon } from "lucide-react";
import type { MarketingFaqItem } from "@/lib/marketing-faqs";
import type { MarketingStackLogoKey } from "@/lib/marketing-stack-logos";

export type ServiceLandingIconKey =
  | "search"
  | "trending-up"
  | "shield-check"
  | "file-text"
  | "link"
  | "gauge"
  | "layers"
  | "sparkles"
  | "bar-chart"
  | "globe"
  | "zap"
  | "target";

export type ServiceLandingContent = {
  slug: string;
  eyebrow: string;
  heroTitle: string;
  heroTitleHighlight: string;
  heroDescription: string;
  /** Second paragraph under CTAs (Rillion-style hero copy column). */
  heroDescriptionSecondary?: string;
  /** Small award-style trust chips under hero CTAs. */
  heroTrustBadges?: { title: string; subtitle?: string; accent?: "slate" | "rose" | "amber" | "emerald" }[];
  heroCtaLabel: string;
  heroCtaHref: string;
  heroSecondaryCtaLabel?: string;
  heroSecondaryCtaHref?: string;
  /** Photographic backdrops for hero carousel slides (local /public paths recommended). */
  heroCarouselImages?: {
    auditBackdrop?: string;
    indexShield: string;
    rankDashboard: string;
    crawlFlow: string;
    contentCluster: string;
  };
  /** Optional mini-pills under hero CTAs (homepage-style). */
  heroHighlights?: { icon: ServiceLandingIconKey; label: string; desc: string }[];
  introParagraph: string;
  /** Headline above CRM/CMS logo marquee (directly under hero). */
  crmCmsMarqueeTitle?: string;
  /** Rillion-style benefits band: statement, intro, image + accordion. */
  benefitsShowcase?: {
    eyebrow: string;
    headline: string;
    introTitle: string;
    introBody: string;
    /** Rillion-style left column photo (rounded). */
    imageSrc?: string;
    imageAlt?: string;
    items: { title: string; description: string }[];
  };
  /** Dark carousel band — SEO capabilities (Rillion Features-style). */
  /** Sticky stacked USP panels (compliance + tracking, etc.). */
  uspStack?: {
    panels: {
      eyebrow: string;
      title: string;
      description: string;
      ctaLabel: string;
      ctaHref: string;
      theme: "dark" | "light";
      imagePosition: "left" | "right";
      visual: "compliance" | "tracking";
    }[];
  };
  /** Optional static card art keyed by `whatWeDo.items[].visual`. */
  whatWeDoCardImages?: Partial<
    Record<
      | "keyword"
      | "content"
      | "onpage"
      | "technical"
      | "indexation"
      | "gmb"
      | "local"
      | "links"
      | "schema"
      | "cwv"
      | "international"
      | "geo"
      | "reporting"
      | "competitor",
      { src: string; alt: string }
    >
  >;
  whatWeDo?: {
    eyebrow: string;
    title: string;
    items: {
      title: string;
      description: string;
      exploreLabel?: string;
      href: string;
      visual:
        | "keyword"
        | "content"
        | "onpage"
        | "technical"
        | "indexation"
        | "gmb"
        | "local"
        | "links"
        | "schema"
        | "cwv"
        | "international"
        | "geo"
        | "reporting"
        | "competitor";
    }[];
  };
  trustHeadline: string;
  trustLabels: string[];
  keyBenefitsEyebrow: string;
  keyBenefitsTitle: string;
  keyBenefits: { icon: ServiceLandingIconKey; title: string; description: string }[];
  processTitle: string;
  processSubtitle: string;
  processSteps: {
    eyebrow: string;
    title: string;
    description: string;
    linkLabel?: string;
    linkHref?: string;
    imageSide: "left" | "right";
    visual: "seo-audit" | "content-cluster" | "indexation" | "analytics-report";
    imageSrc?: string;
    imageAlt?: string;
  }[];
  featureGridTitle: string;
  featureGrid: { icon: ServiceLandingIconKey; title: string; description: string }[];
  integrationsTitle: string;
  integrationsSubtitle: string;
  integrationLogos: MarketingStackLogoKey[];
  integrationsCtaLabel: string;
  integrationsCtaHref: string;
  statsSectionTitle?: string;
  stats: { value: string; label: string }[];
  howItWorksTitle: string;
  howItWorksSubtitle: string;
  howItWorksSteps: { title: string; description: string }[];
  testimonialsTitle: string;
  testimonials: { quote: string; author: string; role: string }[];
  resourcesTitle: string;
  resources: { category: string; title: string; href: string }[];
  faqTitle: string;
  faqSubtitle: string;
  faqItems: MarketingFaqItem[];
  finalCtaEyebrow: string;
  finalCtaTitle: string;
  finalCtaDescription: string;
  finalCtaLabel: string;
  finalCtaHref: string;
};

export type ServiceLandingIconMap = Record<ServiceLandingIconKey, LucideIcon>;

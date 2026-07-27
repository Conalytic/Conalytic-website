import { STATIC_BLOG_POSTS } from "@/content/blog-posts";
import { CONALYTIC_PRODUCTS } from "@/lib/products";
import { PRIVACY_POLICY_PATH, TERMS_OF_SERVICE_PATH } from "@/lib/legal-urls";
import { canonicalUrl } from "@/lib/page-seo";
import { getRegistryEntryById } from "@/lib/cms/page-registry";
import type { CmsSeoFields } from "@/lib/cms/types";

type SeoSeed = {
  title: string;
  description: string;
  keywords?: string[];
  schemaType: string;
  indexable?: boolean;
};

const PAGE_SEO: Record<string, SeoSeed> = {
  home: {
    title: "Conalytic – Marketing Analytics: Chat, KPIs & Reports",
    description:
      "Conalytic is AI marketing analytics software with Conversational Analytics (GA4 & Google Ads chat), KPIs Tracker (goal monitoring), and Report Builder (HTML client reports). Connect Search Console, GTM, and Meta Ads. Free to start.",
    keywords: [
      "marketing analytics platform",
      "conversational analytics",
      "KPI tracker",
      "marketing report builder",
      "GA4 analytics",
      "Google Ads reporting",
      "AI marketing insights",
    ],
    schemaType: "WebPage, FAQPage",
  },
  features: {
    title: "Features – Conversational Analytics, KPI Tracker & Report Builder",
    description:
      "Explore Conalytic features: AI marketing chat for GA4, Google Ads, Search Console, GTM, and Meta; KPI goal tracking dashboard; automated HTML client report decks. Natural-language analytics and OAuth integrations.",
    keywords: [
      "marketing analytics features",
      "conversational analytics features",
      "KPI tracking software",
      "automated marketing reports",
      "GA4 integration",
      "Google Ads analytics",
    ],
    schemaType: "WebPage, FAQPage, BreadcrumbList",
  },
  integrations: {
    title: "Integrations – GA4, Google Ads, GSC, GTM & Meta",
    description:
      "Connect Google Analytics 4, Google Search Console, Google Ads, Google Tag Manager, and Meta Ads to Conalytic. OAuth integrations power Conversational Analytics, KPIs Tracker, and Report Builder.",
    keywords: [
      "GA4 integration",
      "Google Ads integration",
      "Search Console integration",
      "GTM integration",
      "Meta Ads integration",
      "marketing data connections",
    ],
    schemaType: "WebPage, FAQPage, BreadcrumbList",
  },
  about: {
    title: "About Conalytic – AI Marketing Analytics Platform",
    description:
      "Learn about Conalytic — the marketing analytics platform with Conversational Analytics, KPIs Tracker, and Report Builder for GA4, Google Ads, Search Console, GTM, and Meta.",
    keywords: ["about Conalytic", "marketing analytics company", "AI analytics SaaS", "Pune marketing tech"],
    schemaType: "WebPage, BreadcrumbList",
  },
  contact: {
    title: "Contact Conalytic – Book a Demo",
    description:
      "Contact Conalytic for demos, enterprise pricing, and support. Schedule a call to see Conversational Analytics, KPIs Tracker, and Report Builder for GA4, Google Ads, Search Console, GTM, and Meta marketing analytics.",
    keywords: ["contact Conalytic", "book demo", "marketing analytics support", "enterprise pricing"],
    schemaType: "WebPage, ContactPage",
  },
  careers: {
    title: "Careers at Conalytic – Join Our Analytics Team",
    description:
      "Explore careers at Conalytic. Join our team building conversational analytics, KPI tracking, and automated marketing reports for modern marketing teams.",
    keywords: ["Conalytic careers", "marketing analytics jobs", "SaaS jobs India", "AI analytics careers"],
    schemaType: "WebPage",
  },
  brand: {
    title: "Conalytic Brand Assets & Logo Guidelines",
    description:
      "Download Conalytic logos, brand colors, and typography guidelines for media, partners, and marketing materials. Official brand kit for the marketing analytics platform.",
    keywords: ["Conalytic brand", "logo guidelines", "brand assets", "marketing analytics brand"],
    schemaType: "WebPage",
  },
  cookies: {
    title: "Cookies Policy – Conalytic",
    description: "How Conalytic uses cookies and similar technologies on this marketing website.",
    keywords: ["cookies policy", "Conalytic cookies", "website cookies", "analytics cookies"],
    schemaType: "WebPage",
  },
  blogs: {
    title: "Conalytic Blog – Product Guides for Chats, KPIs & Reports",
    description:
      "Guides and playbooks for Conalytic Conversational Analytics, KPIs Tracker, and Report Builder — GA4, Google Ads, Search Console, GTM, and agency workflows.",
    keywords: [
      "marketing analytics blog",
      "GA4 tips",
      "Google Ads insights",
      "conversational analytics",
      "agency reporting",
    ],
    schemaType: "CollectionPage, Blog, BreadcrumbList",
  },
  privacy: {
    title: "Privacy Policy",
    description: "How Conalytic collects, uses, and protects personal data.",
    keywords: ["privacy policy", "Conalytic privacy", "data protection", "GDPR"],
    schemaType: "WebPage",
  },
  terms: {
    title: "Terms of Service",
    description: "Terms governing use of Conalytic.",
    keywords: ["terms of service", "Conalytic terms", "SaaS terms", "user agreement"],
    schemaType: "WebPage",
  },
  "product-ats": {
    title: "Applicant Tracking System – Conalytic",
    description:
      "Legacy Conalytic ATS page. Conalytic's current marketing analytics platform focuses on Conversational Analytics, KPIs Tracker, and Report Builder.",
    keywords: ["applicant tracking system", "ATS software", "legacy Conalytic ATS"],
    schemaType: "WebPage",
    indexable: false,
  },
};

function buildSchemaJson(path: string, title: string, description: string, schemaType: string): string {
  const primaryType = schemaType.split(/[,\s+]/)[0] || "WebPage";
  const payload: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": primaryType,
    name: title.replace(/ \| Conalytic.*$/, "").trim(),
    description,
    url: canonicalUrl(path),
  };
  if (schemaType.includes(",")) {
    payload.additionalType = schemaType
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
  }
  return JSON.stringify(payload, null, 2);
}

function seedForRegistry(registryId: string): SeoSeed | null {
  if (PAGE_SEO[registryId]) return PAGE_SEO[registryId];

  if (registryId === "product-chat") {
    const p = CONALYTIC_PRODUCTS["conversational-analytics"];
    return {
      title: p.metaTitle,
      description: p.metaDescription,
      keywords: p.keywords,
      schemaType: "Product, FAQPage",
    };
  }
  if (registryId === "product-kpis") {
    const p = CONALYTIC_PRODUCTS["kpis-tracker"];
    return {
      title: p.metaTitle,
      description: p.metaDescription,
      keywords: p.keywords,
      schemaType: "Product, FAQPage",
    };
  }
  if (registryId === "product-reports") {
    const p = CONALYTIC_PRODUCTS["report-builder"];
    return {
      title: p.metaTitle,
      description: p.metaDescription,
      keywords: p.keywords,
      schemaType: "Product, FAQPage",
    };
  }

  if (registryId.startsWith("blog-")) {
    const slug = registryId.slice("blog-".length);
    const post = STATIC_BLOG_POSTS.find((p) => p.slug === slug);
    if (!post) return null;
    return {
      title: `${post.title} | Conalytic Blog`,
      description: post.description || post.excerpt,
      keywords: [post.category, "Conalytic blog", "marketing analytics"],
      schemaType: "Article, BlogPosting, BreadcrumbList",
    };
  }

  return null;
}

export function getSeoDefaultsForRegistry(registryId: string): CmsSeoFields | null {
  const entry = getRegistryEntryById(registryId);
  const seed = seedForRegistry(registryId);
  if (!entry || !seed) return null;

  const path =
    entry.id === "privacy"
      ? PRIVACY_POLICY_PATH
      : entry.id === "terms"
        ? TERMS_OF_SERVICE_PATH
        : entry.path;

  const canonical = canonicalUrl(path);

  return {
    title: seed.title,
    description: seed.description,
    keywords: seed.keywords,
    ogTitle: seed.title,
    ogDescription: seed.description,
    canonical,
    schemaType: seed.schemaType,
    schemaJson: buildSchemaJson(path, seed.title, seed.description, seed.schemaType),
    indexable: seed.indexable,
  };
}

/** Merge CMS overlay with route defaults so the admin form shows live SEO values. */
export function resolveEffectiveSeo(
  registryId: string,
  overlay?: CmsSeoFields | null,
): CmsSeoFields {
  const defaults = getSeoDefaultsForRegistry(registryId);
  if (!defaults) return { ...(overlay ?? {}) };

  const title = overlay?.title?.trim() || defaults.title || "";
  const description = overlay?.description?.trim() || defaults.description || "";
  const keywords = overlay?.keywords?.length ? overlay.keywords : defaults.keywords;

  return {
    ...defaults,
    ...overlay,
    title,
    description,
    keywords,
    ogTitle: overlay?.ogTitle?.trim() || defaults.ogTitle || title,
    ogDescription: overlay?.ogDescription?.trim() || defaults.ogDescription || description,
    canonical: overlay?.canonical?.trim() || defaults.canonical,
    schemaType: overlay?.schemaType?.trim() || defaults.schemaType,
    schemaJson: overlay?.schemaJson?.trim() || defaults.schemaJson,
  };
}

/**
 * Schema.org JSON-LD — Organization, WebSite, SoftwareApplication, FAQPage, BlogPosting, WebPage.
 * Tuned for traditional SEO + GEO (clear entities, citable facts, product definition).
 */
import { CHAT_APP_SIGNUP_URL, MARKETING_CONTACT_ABSOLUTE } from "@/lib/app-urls";
import { SITE_ORIGIN } from "@/lib/seo-config";

const SITE = SITE_ORIGIN;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE}/#organization`,
    name: "Conalytic",
    legalName: "Conalytic",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
    image: `${SITE}/og-image.png`,
    slogan: "Ask your marketing data questions in plain English. Get answers in seconds.",
    description:
      "Conalytic is a conversational analytics platform for marketing teams. Connect GA4, Google Ads, Meta Ads, and Search Console; query data with natural language instead of SQL or dashboards.",
    email: "admin@conalytic.com",
    knowsAbout: [
      "Conversational analytics",
      "Marketing analytics",
      "Google Analytics 4",
      "Google Ads",
      "Meta Ads",
      "Search Console",
      "Natural language processing",
      "AI reporting",
      "BigQuery",
      "B2B SaaS",
    ],
    areaServed: [
      { "@type": "Country", name: "India" },
      { "@type": "Place", name: "Worldwide" },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Pune",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
    sameAs: [
      "https://linkedin.com/company/conalytic",
      "https://twitter.com/conalytic",
      "https://facebook.com/conalytic",
      "https://instagram.com/conalytic",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "admin@conalytic.com",
      url: MARKETING_CONTACT_ABSOLUTE,
      availableLanguage: ["English"],
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE}/#website`,
    name: "Conalytic",
    url: SITE,
    inLanguage: "en-US",
    description:
      "Conalytic: AI-powered conversational analytics for marketers. Connect GA4, Google Ads, Meta, and Search Console; ask questions in plain English and get instant, cited insights—no SQL.",
    publisher: { "@id": `${SITE}/#organization` },
  };
}

/** Primary product — helps search + answer engines disambiguate “Conalytic” the software. */
export function softwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${SITE}/#softwareapplication`,
    name: "Conalytic",
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Marketing Analytics Software",
    operatingSystem: "Web browser",
    browserRequirements: "Requires JavaScript. Modern evergreen browser.",
    url: SITE,
    screenshot: `${SITE}/og-image.png`,
    description:
      "Conalytic lets marketing and growth teams query GA4, Google Ads, Meta Ads, and Google Search Console through a chat interface. Sign up free with included tokens; usage is token-based with optional top-ups.",
    featureList: [
      "Natural-language questions over connected marketing data",
      "Integrations: GA4, Google Ads, Meta Ads, Search Console, BigQuery-oriented workflows",
      "Usage-based queries with free signup tokens and top-ups",
      "Custom dashboards and advanced AI models (Pro)",
      "Priority support and extended data history (Pro)",
    ],
    offers: {
      "@type": "Offer",
      name: "Conalytic Pro — free signup",
      price: "0",
      priceCurrency: "USD",
      description: "Free account with included tokens; purchase top-ups as usage grows.",
      url: CHAT_APP_SIGNUP_URL,
    },
    provider: { "@id": `${SITE}/#organization` },
    author: { "@id": `${SITE}/#organization` },
  };
}

export function faqPageSchema(items: ReadonlyArray<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function blogPostingSchema(input: {
  url: string;
  headline: string;
  description: string;
  datePublished?: string;
  dateModified?: string;
  /** Hero / OG image URL (e.g. Storyblok CDN). */
  imageUrl?: string;
}) {
  const base: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: input.headline,
    description: input.description,
    url: input.url,
    mainEntityOfPage: { "@type": "WebPage", "@id": input.url },
    publisher: { "@id": `${SITE}/#organization` },
    author: { "@id": `${SITE}/#organization` },
  };
  if (input.datePublished) {
    base.datePublished = input.datePublished;
    base.dateModified = input.dateModified ?? input.datePublished;
  }
  if (input.imageUrl) {
    base.image = input.imageUrl;
  }
  return base;
}

export function webPageSchema(path: string, name: string, description: string) {
  const url = path === "/" ? SITE : `${SITE}${path.startsWith("/") ? path : `/${path}`}`;
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: "en-US",
    isPartOf: { "@id": `${SITE}/#website` },
    publisher: { "@id": `${SITE}/#organization` },
    about: { "@id": `${SITE}/#softwareapplication` },
  };
}

/**
 * Schema.org JSON-LD — Organization, WebSite, SoftwareApplication, FAQPage, BlogPosting, WebPage.
 * Tuned for traditional SEO + GEO (clear entities, citable facts, product definition).
 */
import { CHAT_APP_SIGNUP_URL, MARKETING_CONTACT_ABSOLUTE } from "@/lib/app-urls";
import { PRODUCT_LIST, type ProductDefinition } from "@/lib/products";
import { blogPostPath, SITE_PATHS } from "@/lib/site-paths";
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
    slogan: "Casting Spells of Clarity on Your Data.",
    description:
      "Conalytic is a marketing analytics platform with three tools: Conversational Analytics (chat over live data), KPIs Tracker (goal monitoring), and Report Builder (HTML presentation decks). Connect GA4, Search Console, Google Ads, GTM, and Meta Ads via OAuth.",
    email: "admin@conalytic.com",
    knowsAbout: [
      "Conversational analytics",
      "Marketing analytics",
      "Google Analytics 4",
      "Google Ads",
      "Meta Ads",
      "Search Console",
      "Natural language processing",
      "KPI tracking",
      "Marketing report automation",
      "Google Tag Manager",
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
      "Conalytic: marketing analytics with Conversational Analytics, KPIs Tracker, and Report Builder. Connect GA4, Google Ads, Search Console, GTM, and Meta; ask questions in plain English, track KPI goals, and generate HTML report decks.",
    publisher: { "@id": `${SITE}/#organization` },
    about: { "@id": `${SITE}/#softwareapplication` },
  };
}

export function breadcrumbListSchema(
  items: ReadonlyArray<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: canonicalPathToUrl(item.path),
    })),
  };
}

function canonicalPathToUrl(path: string): string {
  if (!path || path === "/") return `${SITE}/`;
  return `${SITE}${path.startsWith("/") ? path : `/${path}`}`;
}

export function blogListingSchema(
  posts: ReadonlyArray<{ slug: string; title: string; datePublished: string; description?: string }>,
) {
  const url = `${SITE}${SITE_PATHS.resources.blogs}`;
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${url}#webpage`,
    url,
    name: "Conalytic Blog — GA4, Reporting & KPI Guides",
    description:
      "Marketing analytics guides: GA4 traffic diagnostics, Google Ads conversion discrepancies, AI referral tracking, HTML client reports, cross-channel reporting, KPI targets, and rules-based goal monitoring with Conalytic.",
    inLanguage: "en-US",
    isPartOf: { "@id": `${SITE}/#website` },
    publisher: { "@id": `${SITE}/#organization` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: posts.length,
      itemListElement: posts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${SITE}${blogPostPath(post.slug)}`,
        name: post.title,
        ...(post.description ? { description: post.description } : {}),
      })),
    },
  };
}

/** Platform suite — parent application referenced on the home page. */
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
    url: CHAT_APP_SIGNUP_URL,
    screenshot: `${SITE}/og-image.png`,
    description:
      "Conalytic includes Conversational Analytics (chat), KPIs Tracker (goal monitoring), and Report Builder (HTML decks). Connect GA4, Search Console, Google Ads, GTM, and Meta Ads. Free to start on Conalytic Pro.",
    featureList: [
      "Conversational Analytics — plain-English chat over connected marketing data",
      "KPIs Tracker — GA4, Search Console, and Google Ads goal status dashboards",
      "Report Builder — multi-platform HTML presentation decks with optional AI insights",
      "OAuth integrations: GA4, Search Console, Google Ads, GTM, Meta Ads",
      "Free to start with usage-based pricing for AI features",
    ],
    hasPart: PRODUCT_LIST.map((p) => ({ "@id": `${SITE}${p.path}#softwareapplication` })),
    offers: {
      "@type": "Offer",
      name: "Conalytic Pro — free signup",
      price: "0",
      priceCurrency: "USD",
      description: "Free account with 325,203 signup tokens; usage-based pricing for additional AI features.",
      url: CHAT_APP_SIGNUP_URL,
    },
    provider: { "@id": `${SITE}/#organization` },
    author: { "@id": `${SITE}/#organization` },
  };
}

/** Per-product SoftwareApplication for product landing pages and GEO. */
export function productSoftwareSchema(product: ProductDefinition) {
  const url = `${SITE}${product.path}`;
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${url}#softwareapplication`,
    name: product.name,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Marketing Analytics Software",
    operatingSystem: "Web browser",
    url: CHAT_APP_SIGNUP_URL,
    description: product.description,
    featureList: product.features,
    isPartOf: { "@id": `${SITE}/#softwareapplication` },
    provider: { "@id": `${SITE}/#organization` },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      url: product.signupUrl,
      description: product.billingNote ?? "Available with Conalytic Pro signup.",
    },
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
  articleSection?: string;
  keywords?: string[];
  /** Hero / OG image URL (absolute). */
  imageUrl?: string;
}) {
  const base: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: input.headline,
    description: input.description,
    url: input.url,
    inLanguage: "en-US",
    mainEntityOfPage: { "@type": "WebPage", "@id": input.url },
    isPartOf: { "@id": `${SITE}${SITE_PATHS.resources.blogs}#webpage` },
    publisher: { "@id": `${SITE}/#organization` },
    author: {
      "@type": "Organization",
      "@id": `${SITE}/#organization`,
      name: "Conalytic",
    },
  };
  if (input.articleSection) {
    base.articleSection = input.articleSection;
  }
  if (input.keywords?.length) {
    base.keywords = input.keywords.join(", ");
  }
  if (input.datePublished) {
    base.datePublished = input.datePublished;
    base.dateModified = input.dateModified ?? input.datePublished;
  }
  if (input.imageUrl) {
    base.image = {
      "@type": "ImageObject",
      url: input.imageUrl,
      width: 1200,
      height: 630,
    };
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

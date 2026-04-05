/**
 * Schema.org JSON-LD builders for Organization, WebSite, WebPage, FAQPage, and BlogPosting.
 * Used by layout, home, and blog routes; keep URLs aligned with `metadataBase` / production domain.
 */
const SITE = "https://conalytic.com";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Conalytic",
    url: SITE,
    logo: `${SITE}/logo.png`,
    sameAs: [
      "https://linkedin.com/company/conalytic",
      "https://twitter.com/conalytic",
      "https://facebook.com/conalytic",
      "https://instagram.com/conalytic",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "admin@conalytic.com",
      url: `${SITE}/contact`,
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Conalytic",
    url: SITE,
    description:
      "AI-powered conversational analytics. Ask questions in plain English and get insights from GA4, Google Ads, Meta, and Search Console.",
    publisher: { "@type": "Organization", name: "Conalytic", url: SITE },
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
    publisher: {
      "@type": "Organization",
      name: "Conalytic",
      url: SITE,
      logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
    },
    author: { "@type": "Organization", name: "Conalytic" },
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
    isPartOf: { "@type": "WebSite", name: "Conalytic", url: SITE },
    publisher: { "@type": "Organization", name: "Conalytic", url: SITE },
  };
}

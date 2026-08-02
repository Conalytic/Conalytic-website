/**
 * Canonical folder-based marketing URLs. Use these paths everywhere (nav, sitemap, links, CMS).
 */
export const SITE_PATHS = {
  home: "/",
  platform: {
    features: "/platform/features",
    pricing: "/platform/pricing",
  },
  resources: {
    blogs: "/resources/blogs",
    integrations: "/resources/integrations",
    careers: "/resources/careers",
  },
  company: {
    about: "/company/about-us",
    contact: "/company/contact",
    contactThankYou: "/company/contact/thank-you",
    brand: "/company/brand",
  },
  legal: {
    privacy: "/legal/privacy-and-policy",
    terms: "/legal/terms-of-service",
    cookies: "/legal/cookies",
  },
  products: {
    conversationalAnalytics: "/products/conversational-analytics",
    kpisTracker: "/products/kpis-tracker",
    reportBuilder: "/products/report-builder",
    applicantTrackingSystem: "/products/applicant-tracking-system",
  },
} as const;

export function blogPostPath(slug: string): string {
  return `${SITE_PATHS.resources.blogs}/${slug}`;
}

export function blogPostSlugFromPath(path: string): string | undefined {
  const prefix = `${SITE_PATHS.resources.blogs}/`;
  if (!path.startsWith(prefix)) return undefined;
  const slug = path.slice(prefix.length).replace(/\/$/, "");
  return slug || undefined;
}

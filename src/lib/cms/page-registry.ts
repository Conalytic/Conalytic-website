import type { CmsRegistryEntry } from "@/lib/cms/types";
import { STATIC_BLOG_POSTS } from "@/content/blog-posts";

const PAGE_ENTRIES: CmsRegistryEntry[] = [
  { id: "chrome-header", label: "Header", type: "chrome", path: "__chrome:header", contentFile: "site/header.json", creatable: false, hasSeo: false },
  { id: "chrome-footer", label: "Footer", type: "chrome", path: "__chrome:footer", contentFile: "site/footer.json", creatable: false, hasSeo: false },
  { id: "home", label: "Home", type: "page", path: "/", contentFile: "pages/home.json", creatable: false, hasSeo: true },
  { id: "features", label: "Features", type: "page", path: "/features", contentFile: "pages/features.json", creatable: false, hasSeo: true },
  { id: "integrations", label: "Integrations", type: "page", path: "/integrations", contentFile: "pages/integrations.json", creatable: false, hasSeo: true },
  { id: "about", label: "About Us", type: "page", path: "/about-us", contentFile: "pages/about-us.json", creatable: false, hasSeo: true },
  { id: "contact", label: "Contact", type: "page", path: "/contact", contentFile: "pages/contact.json", creatable: false, hasSeo: true },
  { id: "careers", label: "Careers", type: "page", path: "/careers", contentFile: "pages/careers.json", creatable: false, hasSeo: true },
  { id: "brand", label: "Brand", type: "page", path: "/brand", contentFile: "pages/brand.json", creatable: false, hasSeo: true },
  { id: "cookies", label: "Cookies", type: "page", path: "/cookies", contentFile: "pages/cookies.json", creatable: false, hasSeo: true },
  { id: "blogs", label: "Blog index", type: "page", path: "/blogs", contentFile: "pages/blogs.json", creatable: false, hasSeo: true },
  { id: "product-chat", label: "Conversational Analytics", type: "page", path: "/products/conversational-analytics", contentFile: "products/conversational-analytics.json", creatable: false, hasSeo: true },
  { id: "product-kpis", label: "KPIs Tracker", type: "page", path: "/products/kpis-tracker", contentFile: "products/kpis-tracker.json", creatable: false, hasSeo: true },
  { id: "product-reports", label: "Report Builder", type: "page", path: "/products/report-builder", contentFile: "products/report-builder.json", creatable: false, hasSeo: true },
  { id: "product-ats", label: "ATS (legacy)", type: "page", path: "/products/applicant-tracking-system", contentFile: "products/applicant-tracking-system.json", creatable: false, hasSeo: true },
  { id: "privacy", label: "Privacy Policy", type: "page", path: "/privacy-and-policy", contentFile: "legal/privacy.json", creatable: false, hasSeo: true },
  { id: "terms", label: "Terms of Service", type: "page", path: "/terms-of-service", contentFile: "legal/terms.json", creatable: false, hasSeo: true },
  { id: "robots", label: "Robots.txt", type: "robots", path: "/robots.txt", contentFile: "site/robots.json", creatable: false, hasSeo: false },
];

const BLOG_ENTRIES: CmsRegistryEntry[] = STATIC_BLOG_POSTS.map((post) => ({
  id: `blog-${post.slug}`,
  label: post.title.length > 48 ? `${post.title.slice(0, 45)}…` : post.title,
  type: "blog" as const,
  path: `/${post.slug}`,
  contentFile: `blogs/${post.slug}.json`,
  creatable: false as const,
  hasSeo: true,
}));

export const CMS_REGISTRY: CmsRegistryEntry[] = [...PAGE_ENTRIES, ...BLOG_ENTRIES];

export function getRegistryEntryById(id: string): CmsRegistryEntry | undefined {
  return CMS_REGISTRY.find((e) => e.id === id);
}

export function getRegistryEntryByPath(path: string): CmsRegistryEntry | undefined {
  const normalized = path === "" ? "/" : path.startsWith("/") ? path : `/${path}`;
  return CMS_REGISTRY.find((e) => e.path === normalized);
}

export function isRegistryPath(path: string): boolean {
  return Boolean(getRegistryEntryByPath(path));
}

export function getChromeRegistryEntry(kind: "header" | "footer"): CmsRegistryEntry {
  return kind === "header"
    ? getRegistryEntryById("chrome-header")!
    : getRegistryEntryById("chrome-footer")!;
}

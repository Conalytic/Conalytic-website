/**
 * Sitemap URLs when indexing is enabled (launch flag + `ALLOW_SEARCH_INDEXING=1` in `seo-config.ts`). Otherwise empty.
 */
import { MetadataRoute } from "next";
import { STATIC_BLOG_POSTS } from "@/content/blog-posts";
import { LEGAL_DOCUMENTS_LAST_UPDATED } from "@/lib/legal-site";
import { PRIVACY_POLICY_PATH, TERMS_OF_SERVICE_PATH } from "@/lib/legal-urls";
import { allowSearchIndexing, SITE_ORIGIN } from "@/lib/seo-config";

const LEGAL_LAST_MODIFIED = new Date(LEGAL_DOCUMENTS_LAST_UPDATED);

const STATIC_PATHS: MetadataRoute.Sitemap = [
  { url: `${SITE_ORIGIN}/`, changeFrequency: "weekly", priority: 1, lastModified: new Date() },
  { url: `${SITE_ORIGIN}/features`, changeFrequency: "weekly", priority: 0.9, lastModified: new Date() },
  {
    url: `${SITE_ORIGIN}/products/conversational-analytics`,
    changeFrequency: "monthly",
    priority: 0.9,
    lastModified: new Date(),
  },
  {
    url: `${SITE_ORIGIN}/products/kpis-tracker`,
    changeFrequency: "monthly",
    priority: 0.85,
    lastModified: new Date(),
  },
  {
    url: `${SITE_ORIGIN}/products/report-builder`,
    changeFrequency: "monthly",
    priority: 0.9,
    lastModified: new Date(),
  },
  { url: `${SITE_ORIGIN}/integrations`, changeFrequency: "monthly", priority: 0.85, lastModified: new Date() },
  { url: `${SITE_ORIGIN}/about-us`, changeFrequency: "monthly", priority: 0.8, lastModified: new Date() },
  { url: `${SITE_ORIGIN}/contact`, changeFrequency: "monthly", priority: 0.9, lastModified: new Date() },
  { url: `${SITE_ORIGIN}/blogs`, changeFrequency: "weekly", priority: 0.85, lastModified: new Date() },
  { url: `${SITE_ORIGIN}/careers`, changeFrequency: "monthly", priority: 0.75, lastModified: new Date() },
  { url: `${SITE_ORIGIN}/cookies`, changeFrequency: "yearly", priority: 0.4, lastModified: LEGAL_LAST_MODIFIED },
  {
    url: `${SITE_ORIGIN}${PRIVACY_POLICY_PATH}`,
    changeFrequency: "yearly",
    priority: 0.5,
    lastModified: LEGAL_LAST_MODIFIED,
  },
  {
    url: `${SITE_ORIGIN}${TERMS_OF_SERVICE_PATH}`,
    changeFrequency: "yearly",
    priority: 0.5,
    lastModified: LEGAL_LAST_MODIFIED,
  },
  { url: `${SITE_ORIGIN}/brand`, changeFrequency: "yearly", priority: 0.5, lastModified: new Date() },
];

export default function sitemap(): MetadataRoute.Sitemap {
  if (!allowSearchIndexing()) {
    return [];
  }

  const blogEntries: MetadataRoute.Sitemap = STATIC_BLOG_POSTS.map((post) => ({
    url: `${SITE_ORIGIN}/${post.slug}`,
    lastModified: new Date(post.datePublished),
    changeFrequency: "monthly" as const,
    priority: post.featured ? 0.8 : 0.75,
  }));

  return [...STATIC_PATHS, ...blogEntries];
}

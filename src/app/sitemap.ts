/**
 * Sitemap URLs when indexing is enabled (launch flag + `ALLOW_SEARCH_INDEXING=1` in `seo-config.ts`). Otherwise empty.
 */
import { MetadataRoute } from "next";
import { STATIC_BLOG_POSTS } from "@/content/blog-posts";
import { allowSearchIndexing, SITE_ORIGIN } from "@/lib/seo-config";

const STATIC_PATHS: MetadataRoute.Sitemap = [
  { url: `${SITE_ORIGIN}/`, changeFrequency: "weekly", priority: 1 },
  { url: `${SITE_ORIGIN}/features`, changeFrequency: "weekly", priority: 0.9 },
  { url: `${SITE_ORIGIN}/products/conversational-analytics`, changeFrequency: "monthly", priority: 0.9 },
  { url: `${SITE_ORIGIN}/products/report-builder`, changeFrequency: "monthly", priority: 0.85 },
  { url: `${SITE_ORIGIN}/products/applicant-tracking-system`, changeFrequency: "monthly", priority: 0.85 },
  { url: `${SITE_ORIGIN}/integrations`, changeFrequency: "monthly", priority: 0.85 },
  { url: `${SITE_ORIGIN}/about-us`, changeFrequency: "monthly", priority: 0.8 },
  { url: `${SITE_ORIGIN}/contact`, changeFrequency: "monthly", priority: 0.9 },
  { url: `${SITE_ORIGIN}/blogs`, changeFrequency: "weekly", priority: 0.85 },
  { url: `${SITE_ORIGIN}/careers`, changeFrequency: "monthly", priority: 0.75 },
  { url: `${SITE_ORIGIN}/cookies`, changeFrequency: "yearly", priority: 0.4 },
  { url: `${SITE_ORIGIN}/brand`, changeFrequency: "yearly", priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  if (!allowSearchIndexing()) {
    return [];
  }

  const blogEntries: MetadataRoute.Sitemap = STATIC_BLOG_POSTS.map((post) => ({
    url: `${SITE_ORIGIN}/${post.slug}`,
    lastModified: new Date(post.datePublished),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [...STATIC_PATHS, ...blogEntries];
}

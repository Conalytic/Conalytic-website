/**
 * Single sitemap at https://conalytic.com/sitemap.xml — url + lastModified only.
 */
import { MetadataRoute } from "next";
import { STATIC_BLOG_POSTS } from "@/content/blog-posts";
import { LEGAL_DOCUMENTS_LAST_UPDATED } from "@/lib/legal-site";
import { PRIVACY_POLICY_PATH, TERMS_OF_SERVICE_PATH } from "@/lib/legal-urls";
import { SITE_ORIGIN } from "@/lib/seo-config";

const LEGAL_LAST_MODIFIED = new Date(LEGAL_DOCUMENTS_LAST_UPDATED);
const SITE_LAST_MODIFIED = new Date("2026-07-26T00:00:00.000Z");

type SitemapEntry = {
  url: string;
  lastModified: Date;
};

function sitemapUrl(path: string, lastModified: Date): SitemapEntry {
  return {
    url: `${SITE_ORIGIN}${path}`,
    lastModified,
  };
}

const STATIC_ENTRIES: SitemapEntry[] = [
  sitemapUrl("/", SITE_LAST_MODIFIED),
  sitemapUrl("/features", SITE_LAST_MODIFIED),
  sitemapUrl("/pricing", SITE_LAST_MODIFIED),
  sitemapUrl("/products/conversational-analytics", SITE_LAST_MODIFIED),
  sitemapUrl("/products/kpis-tracker", SITE_LAST_MODIFIED),
  sitemapUrl("/products/report-builder", SITE_LAST_MODIFIED),
  sitemapUrl("/products/applicant-tracking-system", SITE_LAST_MODIFIED),
  sitemapUrl("/integrations", SITE_LAST_MODIFIED),
  sitemapUrl("/about-us", SITE_LAST_MODIFIED),
  sitemapUrl("/contact", SITE_LAST_MODIFIED),
  sitemapUrl("/blogs", SITE_LAST_MODIFIED),
  sitemapUrl("/careers", SITE_LAST_MODIFIED),
  sitemapUrl("/brand", SITE_LAST_MODIFIED),
  sitemapUrl("/cookies", LEGAL_LAST_MODIFIED),
  sitemapUrl(PRIVACY_POLICY_PATH, LEGAL_LAST_MODIFIED),
  sitemapUrl(TERMS_OF_SERVICE_PATH, LEGAL_LAST_MODIFIED),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const blogEntries: SitemapEntry[] = STATIC_BLOG_POSTS.map((post) => ({
    url: `${SITE_ORIGIN}/${post.slug}`,
    lastModified: new Date(post.datePublished),
  }));

  return [...STATIC_ENTRIES, ...blogEntries];
}

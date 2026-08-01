import { STATIC_BLOG_POSTS } from "@/content/blog-posts";
import { LEGAL_DOCUMENTS_LAST_UPDATED } from "@/lib/legal-site";
import { PRIVACY_POLICY_PATH, TERMS_OF_SERVICE_PATH } from "@/lib/legal-urls";
import { SITE_ORIGIN } from "@/lib/seo-config";

const LEGAL_LAST_MODIFIED = new Date(LEGAL_DOCUMENTS_LAST_UPDATED);
const SITE_LAST_MODIFIED = new Date("2026-07-26T00:00:00.000Z");

export type SitemapEntry = {
  url: string;
  lastModified: Date;
};

function entry(path: string, lastModified: Date): SitemapEntry {
  return {
    url: `${SITE_ORIGIN}${path}`,
    lastModified,
  };
}

export function getSitemapEntries(): SitemapEntry[] {
  const staticEntries: SitemapEntry[] = [
    entry("/", SITE_LAST_MODIFIED),
    entry("/features", SITE_LAST_MODIFIED),
    entry("/pricing", SITE_LAST_MODIFIED),
    entry("/products/conversational-analytics", SITE_LAST_MODIFIED),
    entry("/products/kpis-tracker", SITE_LAST_MODIFIED),
    entry("/products/report-builder", SITE_LAST_MODIFIED),
    entry("/products/applicant-tracking-system", SITE_LAST_MODIFIED),
    entry("/integrations", SITE_LAST_MODIFIED),
    entry("/about-us", SITE_LAST_MODIFIED),
    entry("/contact", SITE_LAST_MODIFIED),
    entry("/blogs", SITE_LAST_MODIFIED),
    entry("/careers", SITE_LAST_MODIFIED),
    entry("/brand", SITE_LAST_MODIFIED),
    entry("/cookies", LEGAL_LAST_MODIFIED),
    entry(PRIVACY_POLICY_PATH, LEGAL_LAST_MODIFIED),
    entry(TERMS_OF_SERVICE_PATH, LEGAL_LAST_MODIFIED),
  ];

  const blogEntries: SitemapEntry[] = STATIC_BLOG_POSTS.map((post) => ({
    url: `${SITE_ORIGIN}/${post.slug}`,
    lastModified: new Date(post.datePublished),
  }));

  return [...staticEntries, ...blogEntries];
}

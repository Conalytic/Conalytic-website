import { STATIC_BLOG_POSTS } from "@/content/blog-posts";
import { CMS_REGISTRY } from "@/lib/cms/page-registry";
import { LEGAL_DOCUMENTS_LAST_UPDATED } from "@/lib/legal-site";
import { PRIVACY_POLICY_PATH, TERMS_OF_SERVICE_PATH } from "@/lib/legal-urls";
import { SITE_ORIGIN } from "@/lib/seo-config";

const LEGAL_LAST_MODIFIED = new Date(LEGAL_DOCUMENTS_LAST_UPDATED);
const SITE_LAST_MODIFIED = new Date("2026-07-26T00:00:00.000Z");

const LEGAL_PATHS = new Set<string>(["/cookies", PRIVACY_POLICY_PATH, TERMS_OF_SERVICE_PATH]);

/** Routes with noindex — must not appear in sitemap.xml */
const NON_INDEXABLE_PATHS = new Set<string>([
  "/contact/thank-you",
  "/products/applicant-tracking-system",
]);

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

function lastModifiedForRegistryPath(path: string, type: "page" | "blog"): Date {
  if (LEGAL_PATHS.has(path)) return LEGAL_LAST_MODIFIED;
  if (type === "blog") {
    const slug = path.replace(/^\//, "");
    const post = STATIC_BLOG_POSTS.find((item) => item.slug === slug);
    if (post) return new Date(post.datePublished);
  }
  return SITE_LAST_MODIFIED;
}

/** Indexable marketing routes from the CMS page registry + blog slugs. */
export function getSitemapEntries(): SitemapEntry[] {
  return CMS_REGISTRY
    .filter((item) => item.type === "page" || item.type === "blog")
    .filter((item) => !NON_INDEXABLE_PATHS.has(item.path))
    .map((item) => {
      const type = item.type === "blog" ? "blog" : "page";
      return entry(item.path, lastModifiedForRegistryPath(item.path, type));
    });
}

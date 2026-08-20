import { STATIC_BLOG_POSTS } from "@/content/blog-posts";
import { CMS_REGISTRY } from "@/lib/cms/page-registry";
import { LEGAL_DOCUMENTS_LAST_UPDATED } from "@/lib/legal-site";
import { PRIVACY_POLICY_PATH, TERMS_OF_SERVICE_PATH } from "@/lib/legal-urls";
import { blogPostSlugFromPath, SITE_PATHS } from "@/lib/site-paths";
import { SITE_ORIGIN } from "@/lib/seo-config";

const LEGAL_LAST_MODIFIED = new Date(LEGAL_DOCUMENTS_LAST_UPDATED);
const SITE_LAST_MODIFIED = new Date("2026-08-20T00:00:00.000Z");

/** Preferred sitemap order — home → platform → products → resources → company → legal */
const PATH_ORDER: string[] = [
  SITE_PATHS.home,
  SITE_PATHS.platform.features,
  SITE_PATHS.platform.pricing,
  SITE_PATHS.products.conversationalAnalytics,
  SITE_PATHS.products.kpisTracker,
  SITE_PATHS.products.reportBuilder,
  SITE_PATHS.resources.blogs,
  SITE_PATHS.resources.integrations,
  SITE_PATHS.resources.careers,
  SITE_PATHS.company.about,
  SITE_PATHS.company.contact,
  SITE_PATHS.company.brand,
  SITE_PATHS.legal.privacy,
  SITE_PATHS.legal.terms,
  SITE_PATHS.legal.cookies,
];

function pathSortIndex(path: string): number {
  const exact = PATH_ORDER.indexOf(path);
  if (exact >= 0) return exact;
  if (path.startsWith(`${SITE_PATHS.resources.blogs}/`)) return 100;
  return 50;
}

const LEGAL_PATHS = new Set<string>([SITE_PATHS.legal.cookies, PRIVACY_POLICY_PATH, TERMS_OF_SERVICE_PATH]);

/** Routes with noindex — must not appear in sitemap.xml */
const NON_INDEXABLE_PATHS = new Set<string>([
  SITE_PATHS.company.contactThankYou,
  SITE_PATHS.products.applicantTrackingSystem,
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
    const slug = blogPostSlugFromPath(path);
    const post = slug ? STATIC_BLOG_POSTS.find((item) => item.slug === slug) : undefined;
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
    })
    .sort((a, b) => {
      const pathA = a.url.replace(SITE_ORIGIN, "");
      const pathB = b.url.replace(SITE_ORIGIN, "");
      const orderDiff = pathSortIndex(pathA) - pathSortIndex(pathB);
      if (orderDiff !== 0) return orderDiff;
      // Blog posts: newest first within the blog group
      if (pathA.startsWith(`${SITE_PATHS.resources.blogs}/`)) {
        return b.lastModified.getTime() - a.lastModified.getTime();
      }
      return pathA.localeCompare(pathB);
    });
}

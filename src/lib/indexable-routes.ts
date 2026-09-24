import { STATIC_BLOG_POSTS } from "@/content/blog-posts";
import { SERVICE_CATALOG, servicePath } from "@/lib/services-catalog";
import { blogPostPath, SITE_PATHS } from "@/lib/site-paths";

export type IndexableRoute = {
  path: string;
  type: "page" | "blog";
};

/** All indexable marketing paths for sitemap generation. */
export function getIndexableRoutes(): IndexableRoute[] {
  const pages: IndexableRoute[] = [
    { path: SITE_PATHS.home, type: "page" },
    { path: SITE_PATHS.platform.features, type: "page" },
    { path: SITE_PATHS.platform.pricing, type: "page" },
    { path: SITE_PATHS.products.conversationalAnalytics, type: "page" },
    { path: SITE_PATHS.products.kpisTracker, type: "page" },
    { path: SITE_PATHS.products.reportBuilder, type: "page" },
    { path: SITE_PATHS.services.index, type: "page" },
    ...SERVICE_CATALOG.map((s) => ({ path: servicePath(s.slug), type: "page" as const })),
    { path: SITE_PATHS.resources.blogs, type: "page" },
    { path: SITE_PATHS.resources.integrations, type: "page" },
    { path: SITE_PATHS.resources.careers, type: "page" },
    { path: SITE_PATHS.company.about, type: "page" },
    { path: SITE_PATHS.company.contact, type: "page" },
    { path: SITE_PATHS.company.brand, type: "page" },
    { path: SITE_PATHS.legal.privacy, type: "page" },
    { path: SITE_PATHS.legal.terms, type: "page" },
    { path: SITE_PATHS.legal.cookies, type: "page" },
  ];

  const blogs: IndexableRoute[] = STATIC_BLOG_POSTS.map((post) => ({
    path: blogPostPath(post.slug),
    type: "blog" as const,
  }));

  return [...pages, ...blogs];
}

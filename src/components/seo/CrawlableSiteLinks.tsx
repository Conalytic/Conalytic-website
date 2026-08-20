import Link from "next/link";
import { getBlogPostsNewestFirst } from "@/content/blog-posts";
import { getSitemapEntries } from "@/lib/sitemap-entries";
import { SITE_ORIGIN } from "@/lib/seo-config";
import { blogPostPath, SITE_PATHS } from "@/lib/site-paths";

/**
 * Plain HTML links for crawlers — ensures every indexable URL is reachable without JS.
 * Visually hidden; does not affect layout.
 */
export function CrawlableSiteLinks() {
  const pages = getSitemapEntries().map((entry) => ({
    href: entry.url.replace(SITE_ORIGIN, ""),
    label: entry.url.replace(SITE_ORIGIN, "") || "Home",
  }));
  const posts = getBlogPostsNewestFirst();

  return (
    <nav
      aria-label="Site index"
      className="sr-only"
      data-crawl-nav="true"
    >
      <h2>All pages</h2>
      <ul>
        {pages.map((page) => (
          <li key={page.href}>
            <Link href={page.href}>{page.label}</Link>
          </li>
        ))}
      </ul>
      <h2>All blog posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={blogPostPath(post.slug)}>{post.title}</Link>
          </li>
        ))}
        <li>
          <Link href={SITE_PATHS.resources.blogs}>Blog index</Link>
        </li>
      </ul>
    </nav>
  );
}

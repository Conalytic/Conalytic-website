/**
 * Canonical origin + crawl rules for SEO. Override with NEXT_PUBLIC_SITE_URL on staging.
 *
 * **Indexing is locked off in code** until public launch. Set `SITE_LAUNCHED_FOR_PUBLIC_INDEXING`
 * to `true` and add `ALLOW_SEARCH_INDEXING=1` on the deployment environment when you are ready
 * for search engines to crawl and index the site.
 */
export const SITE_ORIGIN = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.conalytic.com"
).replace(/\/$/, "");

/** Flip to `true` at launch (with `ALLOW_SEARCH_INDEXING=1` on deploy). Until then: sitewide noindex/nofollow. */
export const SITE_LAUNCHED_FOR_PUBLIC_INDEXING = false;

export function allowSearchIndexing(): boolean {
  return (
    SITE_LAUNCHED_FOR_PUBLIC_INDEXING &&
    process.env.ALLOW_SEARCH_INDEXING === "1"
  );
}

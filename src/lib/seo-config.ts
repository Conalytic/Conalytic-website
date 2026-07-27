/**
 * Canonical origin + crawl rules for SEO. Override with NEXT_PUBLIC_SITE_URL on staging.
 *
 * **Indexing is locked off in code** until public launch. Set `SITE_LAUNCHED_FOR_PUBLIC_INDEXING`
 * to `true` and add `ALLOW_SEARCH_INDEXING=1` on the deployment environment when you are ready
 * for search engines to crawl and index the site.
 *
 * The staging website (staging branch / non-production URL) is always noindex/nofollow in code.
 *
 * Canonical host is always **non-www** (`https://conalytic.com`).
 */
export const PRODUCTION_SITE_ORIGIN = "https://conalytic.com";

function normalizeSiteOrigin(raw: string): string {
  const trimmed = raw.replace(/\/$/, "");
  try {
    const url = new URL(trimmed);
    if (url.hostname.startsWith("www.")) {
      url.hostname = url.hostname.slice(4);
    }
    return url.origin;
  } catch {
    return trimmed;
  }
}

export const SITE_ORIGIN = normalizeSiteOrigin(
  process.env.NEXT_PUBLIC_SITE_URL || PRODUCTION_SITE_ORIGIN
);

/** Flip to `true` at launch (with `ALLOW_SEARCH_INDEXING=1` on deploy). Until then: sitewide noindex/nofollow. */
export const SITE_LAUNCHED_FOR_PUBLIC_INDEXING = false;

const DEFAULT_STAGING_BRANCH =
  process.env.GITHUB_STAGING_BRANCH?.trim().toLowerCase() || "staging";

/**
 * Staging / preview deployments must never be indexed — enforced in code, not only via env.
 */
export function isStagingWebsite(): boolean {
  if (process.env.STAGING_WEBSITE === "1") return true;

  const gitRef = process.env.VERCEL_GIT_COMMIT_REF?.trim().toLowerCase();
  if (gitRef && gitRef === DEFAULT_STAGING_BRANCH) return true;

  const configuredOrigin = normalizeSiteOrigin(
    process.env.NEXT_PUBLIC_SITE_URL || PRODUCTION_SITE_ORIGIN
  );
  return configuredOrigin !== PRODUCTION_SITE_ORIGIN;
}

export function allowSearchIndexing(): boolean {
  if (isStagingWebsite()) return false;

  return (
    SITE_LAUNCHED_FOR_PUBLIC_INDEXING &&
    process.env.ALLOW_SEARCH_INDEXING === "1"
  );
}

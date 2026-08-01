/**
 * Canonical origin + crawl rules for SEO. Override with NEXT_PUBLIC_SITE_URL on staging.
 *
 * Production marketing site is indexable. Staging / preview deployments and `/admin` stay noindex.
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

/** Production marketing pages are indexable; staging previews stay blocked. */
export function allowSearchIndexing(): boolean {
  return !isStagingWebsite();
}

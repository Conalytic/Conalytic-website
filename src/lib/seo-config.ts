/**
 * Canonical origin for SEO and absolute URLs.
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

/**
 * Canonical origin for sitemap, JSON-LD, and metadata.
 * Production deploys always use conalytic.com — never a preview env URL or localhost.
 */
function resolveSiteOrigin(): string {
  if (process.env.VERCEL_ENV === "production") {
    return PRODUCTION_SITE_ORIGIN;
  }
  return normalizeSiteOrigin(
    process.env.NEXT_PUBLIC_SITE_URL || PRODUCTION_SITE_ORIGIN
  );
}

export const SITE_ORIGIN = resolveSiteOrigin();

/** Marketing pages are always indexable (no staging / preview noindex gate). */
export function allowSearchIndexing(): boolean {
  return true;
}

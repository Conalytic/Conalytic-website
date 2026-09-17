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

export const SITE_ORIGIN = normalizeSiteOrigin(
  process.env.NEXT_PUBLIC_SITE_URL || PRODUCTION_SITE_ORIGIN
);

/** Marketing pages are always indexable (no staging / preview noindex gate). */
export function allowSearchIndexing(): boolean {
  return true;
}

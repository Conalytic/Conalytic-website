/**
 * Validates external script URLs from Storyblok before passing to `next/script`.
 * Set `STORYBLOK_SCRIPT_ALLOWED_HOSTS` (comma-separated hostnames) to restrict; otherwise any `https:` origin is allowed.
 */

function parseAllowlist(): Set<string> | null {
  const raw = process.env.STORYBLOK_SCRIPT_ALLOWED_HOSTS?.trim();
  if (!raw) {
    return null;
  }
  return new Set(
    raw
      .split(",")
      .map((h) => h.trim().toLowerCase())
      .filter(Boolean)
  );
}

export function isAllowedThirdPartyScriptUrl(src: string): boolean {
  const trimmed = src.trim();
  if (!trimmed) {
    return false;
  }
  let url: URL;
  try {
    url = new URL(trimmed);
  } catch {
    return false;
  }
  if (url.protocol !== "https:") {
    return false;
  }
  const host = url.hostname.toLowerCase();
  if (!host || host === "localhost") {
    return false;
  }
  const allow = parseAllowlist();
  if (allow && !allow.has(host)) {
    return false;
  }
  return true;
}

import type { AdminSettings } from "@/lib/cms/draft-store";
import type { CmsRegistryEntry } from "@/lib/cms/types";

/** Normalize a configured staging base URL (no trailing slash on origin path). */
export function resolveStagingPreviewBase(settings?: AdminSettings): string | null {
  const raw =
    settings?.stagingPreviewUrl?.trim() ||
    process.env.STAGING_PREVIEW_URL?.trim() ||
    process.env.NEXT_PUBLIC_STAGING_PREVIEW_URL?.trim();
  if (!raw) return null;

  try {
    const url = new URL(raw.includes("://") ? raw : `https://${raw}`);
    const path = url.pathname.replace(/\/$/, "");
    return `${url.origin}${path === "/" ? "" : path}`;
  } catch {
    return null;
  }
}

export function buildStagingPreviewPageUrl(
  base: string,
  pagePath: string,
  cacheKey?: number,
  bypassToken?: string | null,
): string {
  const normalizedPath =
    pagePath === "/" || pagePath === ""
      ? ""
      : pagePath.startsWith("/")
        ? pagePath
        : `/${pagePath}`;
  const url = `${base.replace(/\/$/, "")}${normalizedPath}`;
  const params: string[] = [];
  if (cacheKey != null) params.push(`_studio=${cacheKey}`);
  const bypass =
    bypassToken?.trim() ||
    process.env.STAGING_PREVIEW_BYPASS_TOKEN?.trim() ||
    process.env.VERCEL_AUTOMATION_BYPASS_SECRET?.trim();
  if (bypass) params.push(`x-vercel-protection-bypass=${encodeURIComponent(bypass)}`);
  if (params.length === 0) return url;
  return `${url}?${params.join("&")}`;
}

export function stagingPreviewDisplayUrl(base: string, pagePath: string): string {
  try {
    const origin = new URL(base).host;
    const path = pagePath === "/" ? "" : pagePath.startsWith("/") ? pagePath : `/${pagePath}`;
    return `${origin}${path}`;
  } catch {
    return pagePath;
  }
}

/** Path on the staging site to load in Studio preview. */
export function stagingPreviewPathForEntry(entry: CmsRegistryEntry): string {
  if (entry.type === "chrome" || entry.path.startsWith("__")) return "/";
  return entry.path;
}

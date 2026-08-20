import type { MetadataRoute } from "next";
import { getSitemapEntries } from "@/lib/sitemap-entries";
import { SITE_PATHS } from "@/lib/site-paths";
import { SITE_ORIGIN } from "@/lib/seo-config";

function sitemapPriority(path: string): number {
  if (path === SITE_PATHS.home) return 1;
  if (path.startsWith(`${SITE_PATHS.resources.blogs}/`)) return 0.7;
  if (
    path === SITE_PATHS.platform.features ||
    path === SITE_PATHS.platform.pricing ||
    path.startsWith("/products/")
  ) {
    return 0.9;
  }
  if (path === SITE_PATHS.resources.blogs) return 0.8;
  return 0.6;
}

function sitemapChangeFreq(path: string): MetadataRoute.Sitemap[number]["changeFrequency"] {
  if (path.startsWith(`${SITE_PATHS.resources.blogs}/`)) return "monthly";
  if (path.startsWith("/legal/")) return "yearly";
  return "weekly";
}

/** Dynamic sitemap — always fresh on deploy; mirrors public/sitemap.xml entries. */
export default function sitemap(): MetadataRoute.Sitemap {
  return getSitemapEntries().map((entry) => {
    const path = entry.url.replace(SITE_ORIGIN, "");
    return {
      url: entry.url,
      lastModified: entry.lastModified,
      changeFrequency: sitemapChangeFreq(path),
      priority: sitemapPriority(path),
    };
  });
}

import { getSitemapEntries } from "@/lib/sitemap-entries";
import { SITE_PATHS } from "@/lib/site-paths";
import { SITE_ORIGIN } from "@/lib/seo-config";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function sitemapPriority(path: string): string {
  if (path === SITE_PATHS.home) return "1.0";
  if (path.startsWith(`${SITE_PATHS.resources.blogs}/`)) return "0.7";
  if (
    path === SITE_PATHS.platform.features ||
    path === SITE_PATHS.platform.pricing ||
    path.startsWith("/products/")
  ) {
    return "0.9";
  }
  if (path === SITE_PATHS.resources.blogs) return "0.8";
  return "0.6";
}

function sitemapChangeFreq(path: string): string {
  if (path.startsWith(`${SITE_PATHS.resources.blogs}/`)) return "monthly";
  if (path.startsWith("/legal/")) return "yearly";
  return "weekly";
}

export function buildSitemapXml(): string {
  const lines = [
    "<?xml version=\"1.0\" encoding=\"UTF-8\"?>",
    "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">",
  ];

  for (const item of getSitemapEntries()) {
    const path = item.url.replace(SITE_ORIGIN, "");
    const lastmod = item.lastModified.toISOString().slice(0, 10);
    lines.push("  <url>");
    lines.push(`    <loc>${escapeXml(item.url)}</loc>`);
    lines.push(`    <lastmod>${lastmod}</lastmod>`);
    lines.push(`    <changefreq>${sitemapChangeFreq(path)}</changefreq>`);
    lines.push(`    <priority>${sitemapPriority(path)}</priority>`);
    lines.push("  </url>");
  }

  lines.push("</urlset>", "");
  return lines.join("\n");
}

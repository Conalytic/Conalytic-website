import { SITE_ORIGIN } from "@/lib/seo-config";

export function buildDefaultRobotsTxt(): string {
  return [
    "User-agent: *",
    "Disallow: /api/",
    "Disallow: /company/contact/thank-you",
    "Disallow: /*?",
    "",
    `Sitemap: ${SITE_ORIGIN}/sitemap.xml`,
    "",
  ].join("\n");
}

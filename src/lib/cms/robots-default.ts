import { SITE_ORIGIN } from "@/lib/seo-config";

export function stagingRobotsTxt(): string {
  return "User-agent: *\nDisallow: /\n";
}

export function buildDefaultRobotsTxt(): string {
  return [
    "User-agent: *",
    "Disallow: /api/",
    "Disallow: /contact/thank-you",
    "Disallow: /*?",
    "",
    `Sitemap: ${SITE_ORIGIN}/sitemap.xml`,
    "",
  ].join("\n");
}

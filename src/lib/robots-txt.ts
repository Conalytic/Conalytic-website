import { buildRobotsTxtBody } from "@/lib/robots-body";

/** Published robots.txt body (site root). */
const ROBOTS_TXT_BODY =
  "User-agent: *\nContent-Signal: search=yes, ai-input=yes, ai-train=no\nDisallow: /api/\nDisallow: /company/contact/thank-you\nDisallow: /*?\n\nSitemap: https://conalytic.com/sitemap.xml\n";

export function buildDefaultRobotsTxt(): string {
  return buildRobotsTxtBody();
}

export async function buildRobotsTxt(): Promise<string> {
  return ROBOTS_TXT_BODY.trim() ? ROBOTS_TXT_BODY : buildDefaultRobotsTxt();
}

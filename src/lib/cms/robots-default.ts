/** Client-safe robots.txt defaults (no fs imports). */
import { SITE_ORIGIN } from "@/lib/seo-config";

const SITE_HOST = new URL(SITE_ORIGIN).host;

const AI_CRAWLER_BOTS = [
  "Amazonbot",
  "Applebot-Extended",
  "Bytespider",
  "CCBot",
  "ClaudeBot",
  "CloudflareBrowserRenderingCrawler",
  "Google-Extended",
  "GPTBot",
  "meta-externalagent",
] as const;

const UTM_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "utm_id",
] as const;

const SEARCH_QUERY_PARAMS = [
  "search",
  "q",
  "query",
  "s",
  "keyword",
  "keywords",
  "find",
  "filter",
] as const;

function aiBotDisallowSection(): string {
  const botBlocks = AI_CRAWLER_BOTS.map((bot) => `User-agent: ${bot}\nDisallow: /`).join("\n\n");
  return `User-agent: *
Content-Signal: search=yes,ai-train=no,use=reference
Allow: /

${botBlocks}`;
}

function utmAllowRules(): string {
  return UTM_PARAMS.flatMap((param) => [`Allow: /*?${param}=`, `Allow: /*&${param}=`]).join("\n");
}

function searchDisallowRules(): string {
  return SEARCH_QUERY_PARAMS.flatMap((param) => [
    `Disallow: /*?*${param}=`,
    `Disallow: /*&${param}=`,
  ]).join("\n");
}

function mainCrawlRules(): string {
  return `User-agent: *
Allow: /

Disallow: /api/
Disallow: /admin/
Disallow: /contact/thank-you
Disallow: /*#
Disallow: /*?

${utmAllowRules()}

${searchDisallowRules()}`;
}

export function stagingRobotsTxt(): string {
  return ["User-agent: *", "Disallow: /", ""].join("\n");
}

export function buildDefaultRobotsTxt(): string {
  return [
    aiBotDisallowSection(),
    "",
    mainCrawlRules(),
    "",
    `Sitemap: ${SITE_ORIGIN}/sitemap.xml`,
    `Host: ${SITE_HOST}`,
    "",
  ].join("\n");
}

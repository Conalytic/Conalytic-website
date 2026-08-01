/** Client-safe robots.txt defaults (no fs imports). */
import { SITE_ORIGIN } from "@/lib/seo-config";

const SITE_HOST = new URL(SITE_ORIGIN).host;

/** Major LLM / AI search crawlers — explicit allow with same path rules as marketing. */
const ALLOWED_AI_CRAWLER_BOTS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "anthropic-ai",
  "Google-Extended",
  "PerplexityBot",
  "Applebot-Extended",
  "cohere-ai",
] as const;

/** Aggressive or low-signal AI scrapers — block entirely. */
const BLOCKED_AI_CRAWLER_BOTS = [
  "Amazonbot",
  "Bytespider",
  "CCBot",
  "CloudflareBrowserRenderingCrawler",
  "meta-externalagent",
  "Diffbot",
  "DataForSeoBot",
  "PetalBot",
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

function sharedDisallowRules(): string {
  return [
    "Disallow: /api/",
    "Disallow: /admin/",
    "Disallow: /contact/thank-you",
    "Disallow: /*#",
    "Disallow: /*?*",
    "",
    utmAllowRules(),
    "",
    searchDisallowRules(),
  ].join("\n");
}

function allowedAiBotSection(): string {
  const blocks = ALLOWED_AI_CRAWLER_BOTS.map(
    (bot) => `User-agent: ${bot}\nAllow: /\n${sharedDisallowRules()}`,
  );
  return blocks.join("\n\n");
}

function blockedAiBotSection(): string {
  return BLOCKED_AI_CRAWLER_BOTS.map((bot) => `User-agent: ${bot}\nDisallow: /`).join("\n\n");
}

function aiCrawlerSection(): string {
  return [
    "User-agent: *",
    "Content-Signal: search=yes,ai-train=no,use=reference",
    "Allow: /",
    "",
    allowedAiBotSection(),
    "",
    blockedAiBotSection(),
  ].join("\n");
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

${sharedDisallowRules()}`;
}

export function stagingRobotsTxt(): string {
  return ["User-agent: *", "Disallow: /", ""].join("\n");
}

export function buildDefaultRobotsTxt(): string {
  return [
    aiCrawlerSection(),
    "",
    mainCrawlRules(),
    "",
    `Sitemap: ${SITE_ORIGIN}/sitemap.xml`,
    `Host: ${SITE_HOST}`,
    "",
  ].join("\n");
}

/**
 * robots.txt — Google SERP–friendly rules, Cloudflare Content-Signal block, and UTM-safe query handling.
 */
import { SITE_ORIGIN } from "@/lib/seo-config";

const SITE_HOST = new URL(SITE_ORIGIN).host;

const CONTENT_SIGNAL_COMMENTS = `# As a condition of accessing this website, you agree to abide by the following
# content signals:

# (a)  If a Content-Signal = yes, you may collect content for the corresponding
#      use.
# (b)  If a Content-Signal = no, you may not collect content for the
#      corresponding use.
# (c)  If the website operator does not include a Content-Signal for a
#      corresponding use, the website operator neither grants nor restricts
#      permission via Content-Signal with respect to the corresponding use.

# The content signals and their meanings are:

# search:   building a search index and providing search results (e.g., returning
#           hyperlinks and short excerpts from your website's contents). Search does not
#           include providing AI-generated search summaries.
# ai-input: inputting content into one or more AI models (e.g., retrieval
#           augmented generation, grounding, or other real-time taking of content for
#           generative AI search answers).
# ai-train: training or fine-tuning AI models.
# use:      how AI systems may consume the content (immediate, reference, or full).

# ANY RESTRICTIONS EXPRESSED VIA CONTENT SIGNALS ARE EXPRESS RESERVATIONS OF
# RIGHTS UNDER ARTICLE 4 OF THE EUROPEAN UNION DIRECTIVE 2019/790 ON COPYRIGHT
# AND RELATED RIGHTS IN THE DIGITAL SINGLE MARKET.`;

const CLOUDFLARE_MANAGED_BOTS = [
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

/** UTM query params — allowed when other query strings are blocked. */
const UTM_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "utm_id",
] as const;

/** Common on-site search / filter params to block explicitly. */
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

function cloudflareManagedSection(): string {
  const botBlocks = CLOUDFLARE_MANAGED_BOTS.map(
    (bot) => `User-agent: ${bot}\nDisallow: /`
  ).join("\n\n");

  return `# BEGIN Cloudflare Managed content

User-agent: *
Content-Signal: search=yes,ai-train=no,use=reference
Allow: /

${botBlocks}

# END Cloudflare Managed Content`;
}

function utmAllowRules(): string {
  return UTM_PARAMS.flatMap((param) => [
    `Allow: /*?${param}=`,
    `Allow: /*&${param}=`,
  ]).join("\n");
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

# Block internal / utility paths
Disallow: /api/
Disallow: /contact/thank-you

# Block hash fragments and non-UTM query strings (Google wildcard syntax)
Disallow: /*#
Disallow: /*?

# Allow standard UTM tracking parameters
${utmAllowRules()}

# Block on-site search / filter query URLs
${searchDisallowRules()}`;
}

export function buildRobotsTxt(): string {
  return [
    CONTENT_SIGNAL_COMMENTS,
    "",
    cloudflareManagedSection(),
    "",
    mainCrawlRules(),
    "",
    `Sitemap: ${SITE_ORIGIN}/sitemap.xml`,
    `Host: ${SITE_HOST}`,
    "",
  ].join("\n");
}

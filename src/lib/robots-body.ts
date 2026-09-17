import { SITE_ORIGIN } from "@/lib/seo-config";

/**
 * Shared robots.txt body — Content Signals for AI crawlers + classic crawl rules.
 * @see https://contentsignals.org/
 */
export function buildRobotsTxtBody(): string {
  return [
    "# Conalytic marketing site — https://conalytic.com",
    "# LLM / agent overview: https://conalytic.com/llms.txt",
    "#",
    "# Content Signals (search = index & snippets; ai-input = RAG/answers; ai-train = model training):",
    "#   search=yes  ai-input=yes  ai-train=no",
    "User-agent: *",
    "Content-Signal: search=yes, ai-input=yes, ai-train=no",
    "Disallow: /api/",
    "Disallow: /company/contact/thank-you",
    "Disallow: /*?",
    "",
    `Sitemap: ${SITE_ORIGIN}/sitemap.xml`,
    "",
  ].join("\n");
}

/** Blog post slugs only — safe to import from next.config (no markdown body imports). */
export const BLOG_POST_SLUGS = [
  "ga4-traffic-drop-search-console",
  "google-ads-ga4-conversion-discrepancy",
  "what-to-ask-ga4-data",
  "tracking-ai-assistant-traffic-ga4",
  "html-vs-pdf-live-dashboard-reports",
  "should-ai-write-client-reports",
  "client-marketing-report-structure",
  "cross-channel-reporting-gsc-ga4-ads",
  "marketing-kpi-targets-goal-setting",
  "rules-based-vs-ai-kpi-status",
  "conversational-analytics-marketing-chat-guide",
  "report-builder-html-marketing-reports-guide",
  "kpis-tracker-marketing-goals-guide",
] as const;

export function getAllBlogSlugs(): string[] {
  return [...BLOG_POST_SLUGS];
}

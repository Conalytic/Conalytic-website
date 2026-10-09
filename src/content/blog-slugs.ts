/** Blog post slugs only — safe to import from next.config (no markdown body imports). */
export const BLOG_POST_SLUGS = [
  "chats-kpis-report-builder-workflow",
  "ga4-search-console-google-ads-which-tool",
  "weekly-marketing-standup-analytics-questions",
  "investigate-traffic-conversion-drop-30-minutes",
  "gtm-sanity-checks-marketers-trust-ga4",
  "search-console-questions-marketers",
  "google-ads-performance-questions-marketers",
  "client-safe-analytics-scoped-chats",
  "marketing-ai-context-files-accuracy",
  "google-analytics-4-questions-marketers",
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

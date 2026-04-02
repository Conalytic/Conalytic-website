/**
 * Canonical `/public` paths for the five marketing-stack integrations (IntegrationsHub on home).
 * Use these for GA4, Search Console, Google Ads, Meta Ads, and LinkedIn Ads everywhere in the app.
 */
export const MARKETING_STACK_LOGOS = {
  googleAnalytics4: "/ga4.svg",
  googleSearchConsole: "/google-search-console-icon.webp",
  googleAds: "/Google20Ads20Logo.webp",
  metaAds: "/meta.svg",
  linkedinAds: "/linkedin.svg",
} as const;

/** Integration page / CMS display name → same asset as home */
export const MARKETING_STACK_LOGO_BY_INTEGRATION_NAME: Record<string, string> = {
  "Google Analytics 4": MARKETING_STACK_LOGOS.googleAnalytics4,
  "Google Search Console": MARKETING_STACK_LOGOS.googleSearchConsole,
  "Google Ads": MARKETING_STACK_LOGOS.googleAds,
  "Meta Ads": MARKETING_STACK_LOGOS.metaAds,
  "LinkedIn Ads": MARKETING_STACK_LOGOS.linkedinAds,
};

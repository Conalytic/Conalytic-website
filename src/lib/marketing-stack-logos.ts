/**
 * Canonical `/public` paths for the five marketing-stack integrations (IntegrationsHub on home).
 * Use these for GA4, Search Console, Google Ads, Meta Ads, and LinkedIn Ads everywhere in the app.
 */
export const MARKETING_STACK_LOGOS = {
  googleAnalytics4: "/ga4.svg",
  googleSearchConsole: "/google-search-console-icon.webp",
  googleAds: "/integrations/google-ads.svg",
  metaAds: "/meta.svg",
  linkedinAds: "/linkedin.svg",
  microsoftClarity: "/integrations/microsoft-clarity.svg",
  bingWebmaster: "/integrations/bing-webmaster.svg",
} as const;

export type MarketingStackLogoKey = keyof typeof MARKETING_STACK_LOGOS;

/** Default partner names (marquee + hub) when Storyblok `label` is empty. */
export const DEFAULT_INTEGRATION_PARTNER_LABELS: Record<MarketingStackLogoKey, string> = {
  googleAnalytics4: "Google Analytics 4",
  googleSearchConsole: "Google Search Console",
  googleAds: "Google Ads",
  metaAds: "Meta Ads",
  linkedinAds: "LinkedIn Ads",
  microsoftClarity: "Microsoft Clarity",
  bingWebmaster: "Bing Webmaster",
};

/** Integration page / CMS display name → same asset as home */
export const MARKETING_STACK_LOGO_BY_INTEGRATION_NAME: Record<string, string> = {
  "Google Analytics 4": MARKETING_STACK_LOGOS.googleAnalytics4,
  "Google Search Console": MARKETING_STACK_LOGOS.googleSearchConsole,
  "Google Ads": MARKETING_STACK_LOGOS.googleAds,
  "Meta Ads": MARKETING_STACK_LOGOS.metaAds,
  "LinkedIn Ads": MARKETING_STACK_LOGOS.linkedinAds,
  "Microsoft Clarity": MARKETING_STACK_LOGOS.microsoftClarity,
  "Bing Webmaster": MARKETING_STACK_LOGOS.bingWebmaster,
};

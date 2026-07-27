import type { MarketingStackLogoKey } from "@/lib/marketing-stack-logos";

/** OAuth connectors not yet available in the product — show “Coming soon” in marketing UI. */
export const COMING_SOON_MARKETING_INTEGRATIONS: ReadonlySet<MarketingStackLogoKey> = new Set([
  "metaAds",
  "linkedinAds",
]);

export const COMING_SOON_INTEGRATION_LABEL = "Coming soon";

export const COMING_SOON_INTEGRATION_BADGE_CLASS =
  "bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/20";

export function isMarketingIntegrationComingSoon(
  key: MarketingStackLogoKey,
): boolean {
  return COMING_SOON_MARKETING_INTEGRATIONS.has(key);
}

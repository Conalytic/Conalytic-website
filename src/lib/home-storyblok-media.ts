/**
 * Parses `home_marquee_logo` bloks from Storyblok `home_page` for integration partner images/labels.
 */
import { storyblokImageSrc } from "@/lib/storyblok-asset";
import type { MarketingStackLogoKey } from "@/lib/marketing-stack-logos";

const SB_KEY_TO_FIELD: Record<string, MarketingStackLogoKey> = {
  ga4: "googleAnalytics4",
  gsc: "googleSearchConsole",
  gads: "googleAds",
  meta: "metaAds",
  li: "linkedinAds",
  clarity: "microsoftClarity",
  bing: "bingWebmaster",
};

export const MARQUEE_LOGO_ORDER: MarketingStackLogoKey[] = [
  "googleAnalytics4",
  "googleSearchConsole",
  "googleAds",
  "metaAds",
  "linkedinAds",
  "microsoftClarity",
  "bingWebmaster",
];

function str(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined;
}

export function parseHomeMarqueeLogoBloks(raw: unknown): {
  orderedKeys: MarketingStackLogoKey[];
  logoUrls: Partial<Record<MarketingStackLogoKey, string>>;
  partnerLabels: Partial<Record<MarketingStackLogoKey, string>>;
} {
  const bloks = Array.isArray(raw) ? raw : [];
  const logoUrls: Partial<Record<MarketingStackLogoKey, string>> = {};
  const partnerLabels: Partial<Record<MarketingStackLogoKey, string>> = {};
  const orderedKeys: MarketingStackLogoKey[] = [];
  const seen = new Set<MarketingStackLogoKey>();

  for (const b of bloks) {
    if (!b || typeof b !== "object" || (b as { component?: string }).component !== "home_marquee_logo") {
      continue;
    }
    const blok = b as Record<string, unknown>;
    const field = SB_KEY_TO_FIELD[String(blok.integration_key ?? "").trim()];
    if (!field || seen.has(field)) {
      continue;
    }
    seen.add(field);
    orderedKeys.push(field);
    const src = storyblokImageSrc(blok.logo);
    if (src) {
      logoUrls[field] = src;
    }
    const label = str(blok.label);
    if (label) {
      partnerLabels[field] = label;
    }
  }

  for (const k of MARQUEE_LOGO_ORDER) {
    if (!seen.has(k)) {
      orderedKeys.push(k);
      seen.add(k);
    }
  }

  return { orderedKeys, logoUrls, partnerLabels };
}

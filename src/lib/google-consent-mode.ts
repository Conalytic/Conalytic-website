/** Google Consent Mode v2 — maps site cookie prefs to gtag consent fields. */

import type { CookiePreferences } from "@/lib/cookie-consent";

export type GoogleConsentValue = "granted" | "denied";

export type GoogleConsentState = {
  security_storage: GoogleConsentValue;
  analytics_storage: GoogleConsentValue;
  functionality_storage: GoogleConsentValue;
  personalization_storage: GoogleConsentValue;
  ad_storage: GoogleConsentValue;
  ad_user_data: GoogleConsentValue;
  ad_personalization: GoogleConsentValue;
};

/** Consent fields Google Tag Manager / GA4 expect for full measurement + ads. */
export function googleConsentFromPreferences(
  prefs: Pick<CookiePreferences, "analytics" | "marketing">,
): GoogleConsentState {
  const measurement = prefs.analytics || prefs.marketing;
  const ads = prefs.marketing;
  const fullOptIn = prefs.analytics && prefs.marketing;

  return {
    security_storage: "granted",
    analytics_storage: measurement ? "granted" : "denied",
    functionality_storage: measurement ? "granted" : "denied",
    personalization_storage: fullOptIn || prefs.analytics ? "granted" : "denied",
    ad_storage: ads ? "granted" : "denied",
    ad_user_data: ads ? "granted" : "denied",
    ad_personalization: ads ? "granted" : "denied",
  };
}

export function googleConsentStateToGtagObject(state: GoogleConsentState): Record<string, GoogleConsentValue> {
  return { ...state };
}

export function buildGtagConsentInitScript(
  mode: "default" | "update",
  state: GoogleConsentState,
): string {
  const payload = JSON.stringify(googleConsentStateToGtagObject(state));
  return `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','${mode}',${payload});`;
}

function ensureGtag(): ((...args: unknown[]) => void) & { q?: unknown[] } {
  window.dataLayer = window.dataLayer || [];
  const w = window as Window & {
    gtag?: ((...args: unknown[]) => void) & { q?: unknown[] };
  };
  if (!w.gtag) {
    w.gtag = function gtag() {
      window.dataLayer!.push(arguments);
    } as ((...args: unknown[]) => void) & { q?: unknown[] };
  }
  return w.gtag;
}

/** Apply consent on the client when preferences change (including after GTM is already loaded). */
export function applyGoogleConsentUpdate(prefs: Pick<CookiePreferences, "analytics" | "marketing">): void {
  if (typeof window === "undefined") return;
  const state = googleConsentStateToGtagObject(googleConsentFromPreferences(prefs));
  const gtag = ensureGtag();
  gtag("consent", "update", state);
  window.dataLayer!.push({
    event: "cookie_consent_update",
    cookie_analytics: prefs.analytics,
    cookie_marketing: prefs.marketing,
  });
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

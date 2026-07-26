/**
 * Client-side cookie / tracking preference (stored in localStorage, not an HTTP cookie).
 * Use this when adding analytics or marketing scripts to gate loading on `all`.
 */
export const COOKIE_CONSENT_STORAGE_KEY = "conalytic-cookie-consent-v1";

/** Essential only: necessary site & preview functionality. All: includes optional analytics when you add them. */
export type CookieConsentChoice = "essential" | "all";

export interface CookieBannerCopy {
  heading: string;
  message: string;
  policyLinkLabel: string;
  essentialButtonLabel: string;
  acceptAllButtonLabel: string;
}

export const COOKIE_BANNER_DEFAULTS: CookieBannerCopy = {
  heading: "Cookies & privacy.",
  message:
    "We use essential cookies so the site works. We do not run third-party marketing cookies on this site unless you choose Accept all.",
  policyLinkLabel: "Cookies Policy",
  essentialButtonLabel: "Essential only",
  acceptAllButtonLabel: "Accept all",
};

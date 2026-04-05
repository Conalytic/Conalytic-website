/**
 * Client-side cookie / tracking preference (stored in localStorage, not an HTTP cookie).
 * Use this when adding analytics or marketing scripts to gate loading on `all`.
 */
export const COOKIE_CONSENT_STORAGE_KEY = "conalytic-cookie-consent-v1";

/** Essential only: necessary site & preview functionality. All: includes optional analytics when you add them. */
export type CookieConsentChoice = "essential" | "all";

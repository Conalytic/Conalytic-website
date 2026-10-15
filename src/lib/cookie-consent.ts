/** Cookie consent storage and helpers (marketing site — GDPR / UK GDPR aligned). */

export const COOKIE_CONSENT_STORAGE_KEY = "conalytic-cookie-consent-v1";

export const COOKIE_CONSENT_VERSION = 1 as const;

export type CookieCategory = "essential" | "analytics" | "marketing";

export type CookiePreferences = {
  /** Site theme and consent record — always enabled. */
  essential: true;
  analytics: boolean;
  marketing: boolean;
};

export type StoredCookieConsent = {
  version: typeof COOKIE_CONSENT_VERSION;
  /** ISO timestamp when the user last saved preferences. */
  updatedAt: string;
  analytics: boolean;
  marketing: boolean;
};

export const DEFAULT_COOKIE_PREFERENCES: CookiePreferences = {
  essential: true,
  analytics: false,
  marketing: false,
};

export const ACCEPT_ALL_COOKIE_PREFERENCES: CookiePreferences = {
  essential: true,
  analytics: true,
  marketing: true,
};

export function preferencesFromStored(stored: StoredCookieConsent): CookiePreferences {
  return {
    essential: true,
    analytics: stored.analytics,
    marketing: stored.marketing,
  };
}

export function storedFromPreferences(prefs: Pick<CookiePreferences, "analytics" | "marketing">): StoredCookieConsent {
  return {
    version: COOKIE_CONSENT_VERSION,
    updatedAt: new Date().toISOString(),
    analytics: prefs.analytics,
    marketing: prefs.marketing,
  };
}

/** Normalize prefs so ad/measurement tags receive the scopes they need in GTM. */
export function normalizeMeasurementPreferences(
  prefs: Pick<CookiePreferences, "analytics" | "marketing">,
): Pick<CookiePreferences, "analytics" | "marketing"> {
  if (prefs.marketing && !prefs.analytics) {
    return { analytics: true, marketing: true };
  }
  return prefs;
}

export function acceptAllPreferences(): Pick<CookiePreferences, "analytics" | "marketing"> {
  return { analytics: ACCEPT_ALL_COOKIE_PREFERENCES.analytics, marketing: ACCEPT_ALL_COOKIE_PREFERENCES.marketing };
}

export function hasMeasurementConsent(prefs: Pick<CookiePreferences, "analytics" | "marketing">): boolean {
  return prefs.analytics || prefs.marketing;
}

/** Legacy values from early docs: `essential` | `all`. */
type LegacyConsentValue = "essential" | "all";

function isLegacyConsentValue(value: unknown): value is LegacyConsentValue {
  return value === "essential" || value === "all";
}

export function parseStoredCookieConsent(raw: string | null): StoredCookieConsent | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as unknown;

    if (typeof parsed === "string" && isLegacyConsentValue(parsed)) {
      return storedFromPreferences({
        analytics: parsed === "all",
        marketing: parsed === "all",
      });
    }

    if (typeof parsed !== "object" || parsed === null) return null;

    const record = parsed as Partial<StoredCookieConsent>;
    if (record.version !== COOKIE_CONSENT_VERSION) return null;
    if (typeof record.analytics !== "boolean" || typeof record.marketing !== "boolean") return null;
    if (typeof record.updatedAt !== "string" || !record.updatedAt) {
      return {
        version: COOKIE_CONSENT_VERSION,
        updatedAt: new Date().toISOString(),
        analytics: record.analytics,
        marketing: record.marketing,
      };
    }
    return record as StoredCookieConsent;
  } catch {
    return null;
  }
}

export function readCookieConsentFromStorage(): StoredCookieConsent | null {
  if (typeof window === "undefined") return null;
  try {
    return parseStoredCookieConsent(window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY));
  } catch {
    return null;
  }
}

export function writeCookieConsentToStorage(prefs: Pick<CookiePreferences, "analytics" | "marketing">): StoredCookieConsent {
  const stored = storedFromPreferences(prefs);
  if (typeof window !== "undefined") {
    window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(stored));
  }
  return stored;
}

export function clearNonEssentialConsentSignals(): void {
  if (typeof window === "undefined") return;
  // Best-effort: drop common GA cookies if user withdraws consent (first-party path).
  const hostname = window.location.hostname;
  const domains = [hostname, `.${hostname}`];
  const names = ["_ga", "_ga_", "_gid", "_gat"];
  for (const name of names) {
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/; domain=${domain}`;
    }
    document.cookie = `${name}=; Max-Age=0; path=/`;
  }
}

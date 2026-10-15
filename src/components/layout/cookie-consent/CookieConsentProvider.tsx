"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  acceptAllPreferences,
  clearNonEssentialConsentSignals,
  DEFAULT_COOKIE_PREFERENCES,
  normalizeMeasurementPreferences,
  preferencesFromStored,
  readCookieConsentFromStorage,
  type CookiePreferences,
  writeCookieConsentToStorage,
} from "@/lib/cookie-consent";
import { applyGoogleConsentUpdate } from "@/lib/google-consent-mode";

type CookieConsentContextValue = {
  /** `null` until hydrated from localStorage. */
  preferences: CookiePreferences | null;
  hasChoice: boolean;
  bannerOpen: boolean;
  preferencesOpen: boolean;
  acceptAll: () => void;
  rejectNonEssential: () => void;
  openPreferences: () => void;
  closePreferences: () => void;
  savePreferences: (prefs: Pick<CookiePreferences, "analytics" | "marketing">) => void;
};

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

function dispatchConsentUpdated(): void {
  window.dispatchEvent(new CustomEvent("conalytic-cookie-consent-updated"));
}

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<CookiePreferences | null>(null);
  const [hasStoredChoice, setHasStoredChoice] = useState(false);
  const [bannerOpen, setBannerOpen] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  useEffect(() => {
    const stored = readCookieConsentFromStorage();
    if (stored) {
      setPreferences(preferencesFromStored(stored));
      setHasStoredChoice(true);
      setBannerOpen(false);
    } else {
      setPreferences(DEFAULT_COOKIE_PREFERENCES);
      setHasStoredChoice(false);
      setBannerOpen(true);
    }
  }, []);

  const persist = useCallback((prefs: Pick<CookiePreferences, "analytics" | "marketing">) => {
    const normalized = normalizeMeasurementPreferences(prefs);
    const next: CookiePreferences = { essential: true, ...normalized };
    if (!next.analytics && !next.marketing) {
      clearNonEssentialConsentSignals();
    }
    writeCookieConsentToStorage(normalized);
    applyGoogleConsentUpdate(normalized);
    setPreferences(next);
    setHasStoredChoice(true);
    setBannerOpen(false);
    setPreferencesOpen(false);
    dispatchConsentUpdated();
  }, []);

  const acceptAll = useCallback(() => {
    persist(acceptAllPreferences());
  }, [persist]);

  const rejectNonEssential = useCallback(() => {
    persist({ analytics: false, marketing: false });
  }, [persist]);

  const openPreferences = useCallback(() => {
    setBannerOpen(true);
    setPreferencesOpen(true);
  }, []);

  const closePreferences = useCallback(() => {
    setPreferencesOpen(false);
    if (readCookieConsentFromStorage()) {
      setBannerOpen(false);
    }
  }, []);

  const savePreferences = useCallback(
    (prefs: Pick<CookiePreferences, "analytics" | "marketing">) => {
      persist(prefs);
    },
    [persist],
  );

  const value = useMemo<CookieConsentContextValue>(
    () => ({
      preferences,
      hasChoice: hasStoredChoice,
      bannerOpen,
      preferencesOpen,
      acceptAll,
      rejectNonEssential,
      openPreferences,
      closePreferences,
      savePreferences,
    }),
    [
      preferences,
      hasStoredChoice,
      bannerOpen,
      preferencesOpen,
      acceptAll,
      rejectNonEssential,
      openPreferences,
      closePreferences,
      savePreferences,
    ],
  );

  return <CookieConsentContext.Provider value={value}>{children}</CookieConsentContext.Provider>;
}

export function useCookieConsent(): CookieConsentContextValue {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) {
    throw new Error("useCookieConsent must be used within CookieConsentProvider");
  }
  return ctx;
}

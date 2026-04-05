"use client";

/**
 * Provides `marketing scripts allowed` from localStorage (`CookieConsentChoice === "all"`).
 * `ConsentGatedSiteScripts` only renders when allowed; pair with `splitSiteScriptBucketsByConsent` in the root layout.
 */
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { COOKIE_CONSENT_STORAGE_KEY } from "@/lib/cookie-consent";
import type { SiteScriptEntry } from "@/lib/storyblok-core";
import { SiteScripts } from "@/components/layout/SiteScripts";

const MarketingScriptsAllowedContext = createContext(false);

export function MarketingScriptsGateProvider({ children }: { children: ReactNode }) {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const read = (): boolean => {
      try {
        return localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY) === "all";
      } catch {
        return false;
      }
    };

    setAllowed(read());

    const onStorage = (e: StorageEvent) => {
      if (e.key !== COOKIE_CONSENT_STORAGE_KEY) {
        return;
      }
      setAllowed(e.newValue === "all");
    };

    const onConsentChanged = () => setAllowed(read());

    window.addEventListener("storage", onStorage);
    window.addEventListener("conalytic-consent-changed", onConsentChanged);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("conalytic-consent-changed", onConsentChanged);
    };
  }, []);

  return (
    <MarketingScriptsAllowedContext.Provider value={allowed}>{children}</MarketingScriptsAllowedContext.Provider>
  );
}

export function ConsentGatedSiteScripts({ entries }: { entries: SiteScriptEntry[] }) {
  const allowed = useContext(MarketingScriptsAllowedContext);
  if (!allowed || entries.length === 0) {
    return null;
  }
  return <SiteScripts entries={entries} />;
}

"use client";

import { Analytics } from "@vercel/analytics/react";
import { useEffect, useState } from "react";
import {
  hasMeasurementConsent,
  preferencesFromStored,
  readCookieConsentFromStorage,
  type CookiePreferences,
} from "@/lib/cookie-consent";
import { GoogleTagManagerClient } from "@/components/analytics/GoogleTagManagerClient";
import { applyGoogleConsentUpdate } from "@/lib/google-consent-mode";

function readPreferences(): CookiePreferences | null {
  const stored = readCookieConsentFromStorage();
  return stored ? preferencesFromStored(stored) : null;
}

export function ConsentAwareAnalytics() {
  const [prefs, setPrefs] = useState<CookiePreferences | null>(null);

  useEffect(() => {
    const initial = readPreferences();
    setPrefs(initial);
    if (initial && hasMeasurementConsent(initial)) {
      applyGoogleConsentUpdate(initial);
    }

    const onUpdate = () => {
      const next = readPreferences();
      setPrefs(next);
      if (next && hasMeasurementConsent(next)) {
        applyGoogleConsentUpdate(next);
      }
    };
    window.addEventListener("conalytic-cookie-consent-updated", onUpdate);
    return () => window.removeEventListener("conalytic-cookie-consent-updated", onUpdate);
  }, []);

  if (!prefs) return null;

  const measurement = hasMeasurementConsent(prefs);

  return (
    <>
      {measurement ? <Analytics /> : null}
      {measurement ? (
        <GoogleTagManagerClient analytics={prefs.analytics} marketing={prefs.marketing} />
      ) : null}
    </>
  );
}

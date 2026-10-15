"use client";

import { useCookieConsent } from "@/components/layout/cookie-consent/CookieConsentProvider";

/** Re-opens the cookie preference panel (footer / legal links). */
export function CookieSettingsButton() {
  const { openPreferences } = useCookieConsent();

  return (
    <button
      type="button"
      onClick={openPreferences}
      className="whitespace-nowrap text-xs text-gray-400 transition-colors hover:text-gray-700 dark:text-white/35 dark:hover:text-white"
    >
      Cookie settings
    </button>
  );
}

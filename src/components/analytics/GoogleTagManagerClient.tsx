"use client";

import Script from "next/script";
import { GTM_HEAD_SCRIPT, GTM_ID } from "@/lib/gtm";
import {
  buildGtagConsentInitScript,
  googleConsentFromPreferences,
} from "@/lib/google-consent-mode";
import type { CookiePreferences } from "@/lib/cookie-consent";

function buildGtmWithConsentScript(prefs: Pick<CookiePreferences, "analytics" | "marketing">): string {
  const state = googleConsentFromPreferences(prefs);
  return `${buildGtagConsentInitScript("update", state)}\n${GTM_HEAD_SCRIPT}`;
}

/** Loads GTM only after the visitor opts in to analytics and/or marketing cookies. */
export function GoogleTagManagerClient({
  analytics,
  marketing,
}: {
  analytics: boolean;
  marketing: boolean;
}) {
  const prefs = { analytics, marketing };
  const script = buildGtmWithConsentScript(prefs);

  return (
    <>
      <Script id="google-tag-manager-consent" strategy="afterInteractive">
        {script}
      </Script>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
          title="Google Tag Manager"
        />
      </noscript>
    </>
  );
}

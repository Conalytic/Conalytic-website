"use client";

import type { ReactNode } from "react";
import { ConsentAwareAnalytics } from "@/components/analytics/ConsentAwareAnalytics";
import { CookieConsentBanner } from "@/components/layout/cookie-consent/CookieConsentBanner";
import { CookieConsentProvider } from "@/components/layout/cookie-consent/CookieConsentProvider";

/** GDPR / UK GDPR cookie UI + consent-gated analytics for marketing routes. */
export function MarketingCookieConsent({ children }: { children: ReactNode }) {
  return (
    <CookieConsentProvider>
      {children}
      <CookieConsentBanner />
      <ConsentAwareAnalytics />
    </CookieConsentProvider>
  );
}

"use client";

/**
 * First-visit banner: records choice in localStorage (`COOKIE_CONSENT_STORAGE_KEY`).
 * Third-party analytics scripts (if added later) should respect the user’s cookie choice.
 */
import { useEffect, useState } from "react";
import Link from "next/link";
import { COOKIE_CONSENT_STORAGE_KEY, type CookieConsentChoice } from "@/lib/cookie-consent";
import type { CookieBannerCopy } from "@/lib/site-layout";

export function CookieConsent({ copy }: { copy: CookieBannerCopy }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const existing = localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
      if (!existing) {
        setOpen(true);
      }
    } catch {
      setOpen(true);
    }
  }, []);

  function save(choice: CookieConsentChoice) {
    try {
      localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, choice);
    } catch {
      /* private mode */
    }
    setOpen(false);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("conalytic-consent-changed"));
    }
  }

  if (!open) {
    return null;
  }

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[100] flex justify-center p-4 pb-[max(1rem,env(safe-area-inset-bottom))]"
      role="region"
      aria-label="Cookie consent"
    >
      <div
        className="pointer-events-auto w-full max-w-lg rounded-2xl border border-gray-200/90 bg-white/95 p-4 shadow-2xl shadow-gray-900/10 backdrop-blur-md dark:border-white/[0.12] dark:bg-[#14141B]/95 dark:shadow-black/40 sm:max-w-2xl sm:flex sm:items-center sm:gap-5 sm:p-5"
      >
        <p className="min-w-0 flex-1 text-sm leading-relaxed text-gray-600 dark:text-white/70">
          <span className="font-semibold text-gray-900 dark:text-white">{copy.heading}</span> {copy.message}{" "}
          <Link href="/cookies" className="font-medium text-brand-600 underline-offset-2 hover:underline dark:text-brand-400">
            {copy.policyLinkLabel}
          </Link>
        </p>
        <div className="mt-3 flex shrink-0 flex-col gap-2 sm:mt-0 sm:w-auto sm:flex-row">
          <button
            type="button"
            onClick={() => save("essential")}
            className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-800 transition hover:bg-gray-50 dark:border-white/[0.15] dark:text-white dark:hover:bg-white/[0.06]"
          >
            {copy.essentialButtonLabel}
          </button>
          <button
            type="button"
            onClick={() => save("all")}
            className="rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/20 transition hover:bg-brand-700"
          >
            {copy.acceptAllButtonLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

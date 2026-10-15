"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { cn } from "@/lib/utils";
import { PRIVACY_POLICY_PATH } from "@/lib/legal-urls";
import { SITE_ROUTES } from "@/lib/site-links";
import { normalizeMeasurementPreferences, type CookiePreferences } from "@/lib/cookie-consent";
import { useCookieConsent } from "@/components/layout/cookie-consent/CookieConsentProvider";

const secondaryButtonClass =
  "inline-flex min-h-10 items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-800 shadow-sm transition hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 dark:border-white/20 dark:bg-white/[0.06] dark:text-white dark:hover:bg-white/[0.1]";

const equalChoiceButtonClass =
  "inline-flex min-h-10 flex-1 items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm transition hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 dark:border-white/20 dark:bg-white/[0.06] dark:text-white dark:hover:bg-white/[0.1] sm:flex-none";

const saveButtonClass =
  "inline-flex min-h-10 items-center justify-center rounded-lg btn-brand-primary px-4 py-2 text-sm font-semibold shadow-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500";

function CategoryToggle({
  id,
  label,
  description,
  checked,
  disabled,
  onChange,
}: {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (next: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-xl border border-gray-200/80 bg-white/80 p-4 dark:border-white/10 dark:bg-white/[0.04]">
      <div className="min-w-0">
        <label htmlFor={id} className="text-sm font-semibold text-gray-900 dark:text-white">
          {label}
        </label>
        <p className="mt-1 text-xs leading-relaxed text-gray-500 dark:text-white/55">{description}</p>
      </div>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 h-5 w-9 shrink-0 cursor-pointer appearance-none rounded-full border border-gray-300 bg-gray-200 transition checked:border-brand-500 checked:bg-brand-500 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/20 dark:bg-white/10 dark:checked:border-brand-400 dark:checked:bg-brand-500"
      />
    </div>
  );
}

export function CookieConsentBanner() {
  const titleId = useId();
  const {
    preferences,
    bannerOpen,
    preferencesOpen,
    acceptAll,
    rejectNonEssential,
    openPreferences,
    closePreferences,
    savePreferences,
  } = useCookieConsent();

  const [draft, setDraft] = useState<Pick<CookiePreferences, "analytics" | "marketing">>({
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    if (preferences) {
      setDraft({ analytics: preferences.analytics, marketing: preferences.marketing });
    }
  }, [preferences]);

  useEffect(() => {
    if (!bannerOpen || preferencesOpen) return;
    const previous = document.body.style.paddingBottom;
    document.body.style.paddingBottom = "5.5rem";
    return () => {
      document.body.style.paddingBottom = previous;
    };
  }, [bannerOpen, preferencesOpen]);

  if (!bannerOpen || !preferences) return null;

  const showCompact = !preferencesOpen;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[100] pointer-events-none px-3 pb-3 sm:px-4 sm:pb-4"
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal={preferencesOpen}
        aria-labelledby={titleId}
        className={cn(
          "pointer-events-auto mx-auto max-w-4xl rounded-2xl border border-gray-200/90 bg-white/95 shadow-2xl shadow-black/10 backdrop-blur-md dark:border-white/10 dark:bg-brand-900/95 dark:shadow-black/40",
          preferencesOpen ? "max-w-lg" : "",
        )}
      >
        {showCompact ? (
          <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6 sm:p-5">
            <div className="min-w-0 space-y-1.5">
              <p id={titleId} className="text-sm font-semibold text-gray-900 dark:text-white">
                Cookies on this site
              </p>
              <p className="text-xs leading-relaxed text-gray-600 dark:text-white/60 sm:text-sm">
                We use essential cookies for security and your preferences. With your consent, we also use analytics
                and marketing technologies (including Google Tag Manager). You can change your mind anytime via{" "}
                <button
                  type="button"
                  onClick={openPreferences}
                  className="font-medium text-brand-600 underline-offset-2 hover:underline dark:text-brand-300"
                >
                  Cookie settings
                </button>
                . See our{" "}
                <Link href={SITE_ROUTES.cookies} className="font-medium text-brand-600 hover:underline dark:text-brand-300">
                  Cookies Policy
                </Link>{" "}
                and{" "}
                <Link href={PRIVACY_POLICY_PATH} className="font-medium text-brand-600 hover:underline dark:text-brand-300">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
            <div className="flex w-full flex-col gap-2 sm:w-auto sm:min-w-[16rem]">
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <button type="button" className={equalChoiceButtonClass} onClick={rejectNonEssential}>
                  Reject non-essential
                </button>
                <button type="button" className={equalChoiceButtonClass} onClick={acceptAll}>
                  Accept all
                </button>
              </div>
              <button
                type="button"
                className={secondaryButtonClass}
                onClick={() => {
                  openPreferences();
                }}
              >
                Customize
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p id={titleId} className="text-base font-semibold text-gray-900 dark:text-white">
                  Cookie preferences
                </p>
                <p className="mt-1 text-xs leading-relaxed text-gray-600 dark:text-white/60 sm:text-sm">
                  Choose which categories we may use. Essential cookies are always on. Non-essential cookies are off
                  until you opt in (GDPR / UK GDPR).
                </p>
              </div>
              <button
                type="button"
                onClick={closePreferences}
                className="shrink-0 rounded-lg px-2 py-1 text-xs font-medium text-gray-500 hover:bg-gray-100 dark:text-white/50 dark:hover:bg-white/10"
              >
                Close
              </button>
            </div>

            <div className="space-y-3">
              <CategoryToggle
                id="cookie-essential"
                label="Essential"
                description="Required for the site to work (e.g. theme and storing this consent choice)."
                checked={true}
                disabled
                onChange={() => {}}
              />
              <CategoryToggle
                id="cookie-analytics"
                label="Analytics"
                description="Helps us understand traffic and product interest (e.g. privacy-friendly analytics and measurement tags)."
                checked={draft.analytics}
                onChange={(analytics) => setDraft((d) => ({ ...d, analytics }))}
              />
              <CategoryToggle
                id="cookie-marketing"
                label="Marketing"
                description="Supports advertising measurement and remarketing where configured in our tag manager."
                checked={draft.marketing}
                onChange={(marketing) =>
                  setDraft((d) => ({
                    ...d,
                    marketing,
                    analytics: marketing ? true : d.analytics,
                  }))
                }
              />
            </div>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <button type="button" className={equalChoiceButtonClass} onClick={rejectNonEssential}>
                Reject non-essential
              </button>
              <button
                type="button"
                className={saveButtonClass}
                onClick={() => savePreferences(normalizeMeasurementPreferences(draft))}
              >
                Save preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

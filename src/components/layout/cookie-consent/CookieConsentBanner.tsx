"use client";

import Link from "next/link";
import { Cookie, X } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { cn } from "@/lib/utils";
import { PRIVACY_POLICY_PATH } from "@/lib/legal-urls";
import { SITE_ROUTES } from "@/lib/site-links";
import { normalizeMeasurementPreferences, type CookiePreferences } from "@/lib/cookie-consent";
import { useCookieConsent } from "@/components/layout/cookie-consent/CookieConsentProvider";

function Switch({
  id,
  checked,
  disabled,
  onChange,
  label,
}: {
  id: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (next: boolean) => void;
  label: string;
}) {
  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500",
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
        checked ? "bg-brand-600 dark:bg-brand-500" : "bg-gray-200 dark:bg-white/15",
      )}
    >
      <span
        className={cn(
          "pointer-events-none block size-5 rounded-full bg-white shadow-sm ring-0 transition-transform duration-200",
          checked ? "translate-x-[1.35rem]" : "translate-x-0.5",
        )}
      />
    </button>
  );
}

function CategoryRow({
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
    <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-gray-50/80 px-4 py-3.5 dark:border-white/[0.06] dark:bg-white/[0.03]">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-gray-900 dark:text-white">{label}</p>
          {disabled ? (
            <span className="rounded-full bg-gray-200/80 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-gray-500 dark:bg-white/10 dark:text-white/45">
              Always on
            </span>
          ) : null}
        </div>
        <p className="mt-0.5 text-xs leading-relaxed text-gray-500 dark:text-white/50">{description}</p>
      </div>
      <Switch id={id} checked={checked} disabled={disabled} onChange={onChange} label={label} />
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
    if (!bannerOpen) return;
    const previous = document.body.style.paddingBottom;
    document.body.style.paddingBottom = preferencesOpen ? "0px" : "4.25rem";
    return () => {
      document.body.style.paddingBottom = previous;
    };
  }, [bannerOpen, preferencesOpen]);

  useEffect(() => {
    if (!preferencesOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePreferences();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [preferencesOpen, closePreferences]);

  if (!bannerOpen || !preferences) return null;

  return (
    <>
      {preferencesOpen ? (
        <button
          type="button"
          aria-label="Close cookie preferences"
          className="fixed inset-0 z-[98] bg-gray-900/25 backdrop-blur-[2px] transition-opacity dark:bg-black/50"
          onClick={closePreferences}
        />
      ) : null}

      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-[100]",
          preferencesOpen ? "px-3 pb-3 sm:px-4 sm:pb-4" : "",
        )}
        role="presentation"
      >
        <div
          role="dialog"
          aria-modal={preferencesOpen}
          aria-labelledby={titleId}
          className={cn(
            "border-t border-gray-200/90 bg-white/95 shadow-[0_-8px_40px_-12px_rgba(0,0,0,0.12)] backdrop-blur-xl dark:border-white/[0.08] dark:bg-brand-900/95 dark:shadow-[0_-8px_40px_-12px_rgba(0,0,0,0.45)]",
            preferencesOpen
              ? "mx-auto max-w-lg overflow-hidden rounded-2xl border shadow-2xl sm:rounded-3xl"
              : "",
          )}
        >
          {preferencesOpen ? (
            <div className="flex max-h-[min(85vh,32rem)] flex-col">
              <div className="flex items-start justify-between gap-3 border-b border-gray-100 px-5 py-4 dark:border-white/[0.06]">
                <div>
                  <span className="brand-eyebrow mb-2">Privacy</span>
                  <p id={titleId} className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                    Cookie preferences
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-gray-500 dark:text-white/50 sm:text-sm">
                    Essential cookies stay on. Turn on optional categories only if you&apos;re happy for us to use them.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closePreferences}
                  className="flex size-9 shrink-0 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-white/10 dark:hover:text-white"
                  aria-label="Close"
                >
                  <X className="size-4" aria-hidden />
                </button>
              </div>

              <div className="space-y-2.5 overflow-y-auto px-5 py-4">
                <CategoryRow
                  id="cookie-essential"
                  label="Essential"
                  description="Theme, security, and saving your consent choice."
                  checked={true}
                  disabled
                  onChange={() => {}}
                />
                <CategoryRow
                  id="cookie-analytics"
                  label="Analytics"
                  description="Anonymous usage insights and measurement tags."
                  checked={draft.analytics}
                  onChange={(analytics) => setDraft((d) => ({ ...d, analytics }))}
                />
                <CategoryRow
                  id="cookie-marketing"
                  label="Marketing"
                  description="Ad measurement and remarketing where configured."
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

              <div className="flex flex-col-reverse gap-2 border-t border-gray-100 px-5 py-4 sm:flex-row sm:justify-end dark:border-white/[0.06]">
                <button
                  type="button"
                  onClick={rejectNonEssential}
                  className="inline-flex h-10 items-center justify-center rounded-full px-5 text-sm font-semibold text-gray-600 transition hover:bg-gray-100 hover:text-gray-900 dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white"
                >
                  Reject non-essential
                </button>
                <button
                  type="button"
                  onClick={() => savePreferences(normalizeMeasurementPreferences(draft))}
                  className="inline-flex h-10 items-center justify-center rounded-full btn-brand-primary px-6 text-sm font-semibold shadow-md shadow-brand-600/20"
                >
                  Save preferences
                </button>
              </div>
            </div>
          ) : (
            <div className="mx-auto max-w-6xl px-4 py-3.5 sm:px-6 sm:py-4">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
                <div className="flex min-w-0 gap-3 sm:gap-4">
                  <div
                    className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-brand-200/60 bg-brand-50 text-brand-700 dark:border-brand-400/20 dark:bg-brand-500/10 dark:text-brand-300"
                    aria-hidden
                  >
                    <Cookie className="size-5" strokeWidth={2} />
                  </div>
                  <div className="min-w-0 pt-0.5">
                    <p id={titleId} className="text-sm font-bold text-gray-900 dark:text-white sm:text-[15px]">
                      We value your privacy
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-gray-500 dark:text-white/55 sm:text-sm">
                      We use essential cookies to run this site. With your permission we also use analytics and marketing
                      tools.{" "}
                      <Link
                        href={SITE_ROUTES.cookies}
                        className="font-medium text-brand-600 underline-offset-2 hover:underline dark:text-brand-400"
                      >
                        Cookies
                      </Link>
                      {" · "}
                      <Link
                        href={PRIVACY_POLICY_PATH}
                        className="font-medium text-brand-600 underline-offset-2 hover:underline dark:text-brand-400"
                      >
                        Privacy
                      </Link>
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end lg:shrink-0">
                  <button
                    type="button"
                    onClick={rejectNonEssential}
                    className="order-2 h-10 rounded-full px-4 text-sm font-semibold text-gray-600 transition hover:bg-gray-100 hover:text-gray-900 dark:text-white/65 dark:hover:bg-white/10 dark:hover:text-white sm:order-1"
                  >
                    Reject
                  </button>
                  <button
                    type="button"
                    onClick={openPreferences}
                    className="order-3 h-10 rounded-full px-4 text-sm font-semibold text-gray-600 transition hover:bg-gray-100 hover:text-gray-900 dark:text-white/65 dark:hover:bg-white/10 dark:hover:text-white sm:order-2"
                  >
                    Customize
                  </button>
                  <button
                    type="button"
                    onClick={acceptAll}
                    className="order-1 h-10 rounded-full btn-brand-primary px-6 text-sm font-semibold shadow-md shadow-brand-600/25 transition hover:shadow-lg hover:shadow-brand-600/30 sm:order-3"
                  >
                    Accept all
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

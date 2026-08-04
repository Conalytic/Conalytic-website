import type { CSSProperties } from "react";

/** Shared shell for analytics query mockups — theme-aware light/dark. */
export const ANALYTICS_DEMO_SHELL_CLASS =
  "rounded-xl bg-gray-50 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.07] overflow-hidden";

export const ANALYTICS_DEMO_INPUT_ROW_CLASS =
  "flex items-center gap-2.5 px-4 py-3 border-b border-gray-200 dark:border-white/[0.06]";

export const ANALYTICS_DEMO_BODY_CLASS = "p-4";

export const ANALYTICS_DEMO_CHART_WRAP_CLASS =
  "rounded-xl border border-gray-200/80 dark:border-white/[0.06] bg-white/80 dark:bg-white/[0.03] p-3";

export const ANALYTICS_DEMO_KEY_FINDING_CLASS =
  "flex items-center gap-2 bg-brand-50 dark:bg-brand-500/10 border border-brand-100 dark:border-brand-500/20 rounded-lg px-3 py-2";

export const ANALYTICS_DEMO_KEY_FINDING_LABEL_CLASS =
  "text-brand-600 dark:text-brand-300 text-[10px] font-bold shrink-0";

export const ANALYTICS_DEMO_ANSWERED_BADGE_CLASS =
  "text-[9px] bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-300 border border-brand-100 dark:border-brand-500/20 px-1.5 py-0.5 rounded-full font-medium";

/** Positive delta / “live” text — slate in both themes. */
export const DEMO_POSITIVE_TEXT_CLASS = "text-brand-600 dark:text-brand-400";

/** “On track” / success pill — slate in both themes. */
export const DEMO_SUCCESS_PILL_CLASS =
  "border-brand-200 bg-brand-50 text-brand-700 dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-300";

/** Live indicator dot — slate accent in both themes. */
export const DEMO_LIVE_DOT_CLASS = "bg-brand-500 dark:bg-brand-400";

/** Eyebrow pill for section tags — use `.brand-eyebrow` from globals when possible. */
export const DEMO_BADGE_PILL_CLASS =
  "inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-2 py-0.5 text-[9px] font-semibold text-brand-700 dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-300";

/** Theme-aware bar fill — uses `--brand-accent` in light and dark. */
export function analyticsDemoBarFill(
  index: number,
  step = 0.1,
  base = 0.4,
): CSSProperties {
  const mix = Math.min(95, Math.round((base + index * step) * 100));
  return {
    background: `color-mix(in srgb, var(--brand-accent) ${mix}%, transparent)`,
  };
}

/** Theme-aware bars — pair with explicit height / motion height. */
export function analyticsDemoBarStyle(
  heightPx: number,
  index: number,
  step = 0.1,
  base = 0.4,
): CSSProperties {
  const mix = Math.min(95, Math.round((base + index * step) * 100));
  return {
    height: `${heightPx}px`,
    background: `color-mix(in srgb, var(--brand-accent) ${mix}%, transparent)`,
  };
}

import type { CSSProperties } from "react";

/** Brand tokens — aligned with Conalytic Chat / Tools slate palette. */
export const BRAND = {
  name: "Conalytic",
  tagline: "Casting Spells of Clarity on Your Data",
  colors: {
    ink: "#334155",
    accent: "#64748B",
    accentHover: "#475569",
    accentSoft: "#E2E8F0",
    accentOnInk: "#FFFFFF",
    elevated: "#1e293b",
    grey: "#64748B",
    muted: "#6b7280",
    border: "#e8eaef",
    pageBg: "#e8eaef",
    shellBg: "#f0f1f5",
    darkBg: "#0f172a",
    darkElevated: "#1e293b",
    darkAccent: "#94a3b8",
    /** @deprecated Use `grey` */
    realisticGrey: "#64748B",
    /** @deprecated Use `ink` */
    veryBlack: "#334155",
    /** @deprecated Use `ink` */
    electricBlue: "#334155",
    /** @deprecated Use `accentHover` */
    dancingPurple: "#475569",
    successGreen: "#12B76A",
    blueLight: "#36BFFA",
    roseRed: "#F63D68",
    orangeDark: "#FF692E",
    pinkAttire: "#F670C7",
  },
} as const;

/** Ink → accent gradient for titles (matches chat app `.text-gradient`). */
export const BRAND_GRADIENT_TEXT: CSSProperties = {
  background: "linear-gradient(135deg, #334155 0%, #64748B 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

/** Slate gradient for marketing hero highlights (theme-aware via CSS). */
export const BRAND_HERO_GRADIENT_CLASS = "hero-gradient-text";

/** @deprecated Use BRAND_HERO_GRADIENT_CLASS */
export const BRAND_HERO_GRADIENT_TEXT: CSSProperties = {
  background: "linear-gradient(135deg, #64748B 0%, #334155 55%, #475569 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

/** Primary CTA sizes */
export const BRAND_PRIMARY_BUTTON_CLASS = "btn-brand-primary px-6 py-3 text-sm shadow-lg";
export const BRAND_PRIMARY_BUTTON_LG_CLASS =
  "btn-brand-primary px-8 py-3.5 text-base font-semibold shadow-xl";
export const BRAND_PRIMARY_BUTTON_SM_CLASS = "btn-brand-primary px-4 py-1.5 text-sm shadow-sm";

export const BRAND_EYEBROW_CLASS = "brand-eyebrow";

/** Highlight text on ink surfaces — theme-aware via `--brand-lime` token */
export const BRAND_LIME_TEXT_CLASS = "text-brand-lime";

/** Step numbers, avatars — ink badge */
export const BRAND_INK_BADGE_CLASS = "brand-ink-badge";

/** Secondary CTA — crisp on light, soft slate on dark */
export const BRAND_SECONDARY_BUTTON_CLASS =
  "inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#e8eaef] bg-white px-6 py-3 text-sm font-semibold text-[var(--brand-ink)] shadow-sm transition-all duration-200 hover:border-[var(--brand-accent)] hover:bg-[var(--brand-accent-soft)] active:scale-[0.98] dark:border-brand-500/25 dark:bg-brand-800 dark:text-brand-200 dark:hover:border-brand-400 dark:hover:bg-brand-700 dark:hover:text-white";
export const BRAND_SECONDARY_BUTTON_LG_CLASS =
  "inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#e8eaef] bg-white px-8 py-3.5 text-base font-semibold text-[var(--brand-ink)] shadow-sm transition-all duration-200 hover:border-[var(--brand-accent)] hover:bg-[var(--brand-accent-soft)] active:scale-[0.98] dark:border-brand-500/25 dark:bg-brand-800 dark:text-brand-200 dark:hover:border-brand-400 dark:hover:bg-brand-700 dark:hover:text-white";

/** Text links — slate accent in both themes */
export const BRAND_LINK_CLASS =
  "font-medium text-brand-600 underline decoration-brand-300/50 underline-offset-2 transition-colors hover:text-brand-700 dark:text-brand-400 dark:decoration-brand-500/35 dark:hover:text-brand-300";

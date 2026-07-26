import type { CSSProperties } from "react";

/** Brand tokens — aligned with Conalytic-Chat (`src/lib/constants.ts`). */
export const BRAND = {
  name: "Conalytic",
  tagline: "Casting Spells of Clarity on Your Data",
  colors: {
    ink: "#0f0f0f",
    accent: "#c9ff33",
    accentSoft: "#edf7c8",
    elevated: "#1a1b1e",
    grey: "#374151",
    muted: "#6b7280",
    border: "#e8eaef",
    successGreen: "#12B76A",
    blueLight: "#36BFFA",
    roseRed: "#F63D68",
    orangeDark: "#FF692E",
    pinkAttire: "#F670C7",
    /** @deprecated Use `ink` — kept for legal layout helpers */
    electricBlue: "#0f0f0f",
    veryBlack: "#0f0f0f",
    dancingPurple: "#1a1b1e",
    realisticGrey: "#374151",
    accentLime: "#c9ff33",
  },
} as const;

/** Ink → grey gradient for titles (matches chat app `.text-gradient`). */
export const BRAND_GRADIENT_TEXT: CSSProperties = {
  background: "linear-gradient(135deg, #0f0f0f 0%, #4b5563 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

/** Lime accent gradient for marketing hero highlights. */
export const BRAND_HERO_GRADIENT_TEXT: CSSProperties = {
  background: "linear-gradient(135deg, #c9ff33 0%, #b8eb2e 50%, #0f0f0f 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

/** Primary CTA: ink bg + lime label; hover inverts to lime bg + ink text. */
export const BRAND_PRIMARY_BUTTON_CLASS =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-brand-500 shadow-lg shadow-brand-600/20 transition-all duration-200 hover:bg-brand-500 hover:text-brand-600 hover:shadow-[0_0_24px_rgba(201,255,51,0.35)] hover:scale-[1.02] active:scale-[0.98]";

/** Secondary CTA on dark surfaces — visible border + lime tint on hover. */
export const BRAND_SECONDARY_BUTTON_CLASS =
  "inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white/85 transition-all duration-200 hover:border-brand-500/50 hover:bg-brand-500/12 hover:text-brand-300 active:scale-[0.98]";

/** Text links on dark backgrounds — never use brand-600/700 for hover text (ink colors). */
export const BRAND_LINK_CLASS =
  "font-medium text-brand-300 underline decoration-brand-500/40 underline-offset-2 transition-colors hover:text-brand-500";

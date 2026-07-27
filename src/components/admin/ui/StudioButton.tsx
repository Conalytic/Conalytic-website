"use client";

import { clsx } from "clsx";
import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger" | "sidebar" | "chrome" | "chrome-secondary";

const variantClass: Record<Variant, string> = {
  primary:
    "bg-[var(--studio-lime)] text-[var(--studio-ink)] hover:bg-[var(--studio-lime-hover)] shadow-sm",
  secondary:
    "border border-[var(--studio-border)] bg-[var(--studio-surface)] text-[var(--studio-fg)] hover:bg-[var(--studio-bg)]",
  ghost:
    "text-[var(--studio-muted)] hover:bg-[var(--studio-bg)] hover:text-[var(--studio-fg)]",
  danger: "bg-[var(--studio-danger)] text-white hover:opacity-90",
  sidebar:
    "text-[var(--studio-sidebar-muted)] hover:bg-[var(--studio-sidebar-hover)] hover:text-[var(--studio-chrome-fg)]",
  chrome:
    "text-[var(--studio-chrome-muted)] hover:bg-[var(--studio-chrome-hover)] hover:text-[var(--studio-chrome-fg)]",
  "chrome-secondary":
    "border border-[var(--studio-chrome-border)] bg-[var(--studio-chrome-elevated)] text-[var(--studio-chrome-fg)] hover:bg-[var(--studio-chrome-hover)] shadow-sm",
};

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: "sm" | "md";
};

export function StudioButton({
  variant = "secondary",
  size = "md",
  className,
  children,
  type = "button",
  ...props
}: Props) {
  return (
    <button
      type={type}
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-45",
        size === "sm" ? "h-7 px-2.5 text-[11px]" : "h-8 px-3 text-xs",
        variantClass[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

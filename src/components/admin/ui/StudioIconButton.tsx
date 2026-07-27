"use client";

import { clsx } from "clsx";
import type { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  variant?: "default" | "sidebar" | "chrome";
};

export function StudioIconButton({
  label,
  variant = "default",
  className,
  children,
  ...props
}: Props) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={clsx(
        "inline-flex h-7 w-7 items-center justify-center rounded-md transition-colors",
        variant === "sidebar"
          ? "text-[var(--studio-sidebar-muted)] hover:bg-[var(--studio-sidebar-hover)] hover:text-[var(--studio-chrome-fg)]"
          : variant === "chrome"
            ? "text-[var(--studio-chrome-muted)] hover:bg-[var(--studio-chrome-hover)] hover:text-[var(--studio-chrome-fg)]"
            : "text-[var(--studio-muted)] hover:bg-[var(--studio-bg)] hover:text-[var(--studio-fg)]",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

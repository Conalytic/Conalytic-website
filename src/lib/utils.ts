/**
 * Shared utilities: Tailwind class merge (`cn`) and external link detection for nav/CTAs.
 */
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** True when the href should open in a new tab (http(s), mailto). Internal paths like `/contact` are false. */
export function isExternalNavigationHref(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://") || href.startsWith("mailto:");
}

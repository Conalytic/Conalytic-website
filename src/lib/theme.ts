export const THEME_STORAGE_KEY = "conalytic-theme";

export type Theme = "light" | "dark";

export const DEFAULT_THEME: Theme = "dark";

export function resolveTheme(stored: string | null): Theme {
  if (stored === "light" || stored === "dark") return stored;
  return DEFAULT_THEME;
}

export function getStoredTheme(): Theme | null {
  if (typeof window === "undefined") return null;
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

export function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
}

/** Runs in <head> before paint — respects saved preference, otherwise dark. */
export const THEME_INIT_SCRIPT = `(function(){try{var k="${THEME_STORAGE_KEY}";var t=localStorage.getItem(k);var d=t==="dark"||t!=="light";document.documentElement.classList.toggle("dark",d);document.documentElement.style.colorScheme=d?"dark":"light";}catch(e){}})();`;

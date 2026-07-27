/** Mirror Next.js metadata title rules so Studio shows what search/social actually render. */

export function liveSearchTitle(title: string | undefined, kind: "page" | "blog" = "page"): string {
  const base = title?.trim() ?? "";
  if (!base) return "";

  if (kind === "blog") {
    if (base.includes("| Conalytic Blog")) return base;
    return `${base} | Conalytic Blog`;
  }

  if (base.includes("| Conalytic")) return base;
  return `${base} | Conalytic`;
}

export function liveOgTitle(
  ogTitle: string | undefined,
  searchTitle: string | undefined,
  kind: "page" | "blog" = "page",
): string {
  const raw = ogTitle?.trim() || searchTitle?.trim() || "";
  if (!raw) return "";
  return liveSearchTitle(raw, kind);
}

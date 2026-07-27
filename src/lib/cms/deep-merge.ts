/** Deep-merge plain objects; arrays and scalars from overlay replace base. */
export function deepMerge<T extends Record<string, unknown>>(base: T, overlay: Record<string, unknown>): T {
  const out = { ...base } as Record<string, unknown>;
  for (const key of Object.keys(overlay)) {
    const oVal = overlay[key];
    const bVal = out[key];
    if (
      oVal &&
      typeof oVal === "object" &&
      !Array.isArray(oVal) &&
      bVal &&
      typeof bVal === "object" &&
      !Array.isArray(bVal)
    ) {
      out[key] = deepMerge(bVal as Record<string, unknown>, oVal as Record<string, unknown>);
    } else if (oVal !== undefined) {
      out[key] = oVal;
    }
  }
  return out as T;
}

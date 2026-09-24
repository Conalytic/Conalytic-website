/** Friendly names → layout.sectionOrder keys. */
const SECTION_ALIASES: Record<string, string> = {
  hero: "hero",
  "hero section": "hero",
  headline: "hero",
  trusted: "trustedBy",
  "trusted by": "trustedBy",
  logos: "trustedBy",
  transformation: "transformation",
  "how it works": "howItWorks",
  howitworks: "howItWorks",
  products: "products",
  product: "products",
  stats: "stats",
  statistics: "stats",
  integrations: "integrations",
  integration: "integrations",
  testimonials: "testimonials",
  reviews: "testimonials",
  pricing: "pricing",
  price: "pricing",
  plans: "pricing",
  faq: "faq",
  faqs: "faq",
  questions: "faq",
  cta: "cta",
  "call to action": "cta",
  footer: "cta",
};

export function resolveSectionKey(name: string, allowed: readonly string[]): string | undefined {
  const trimmed = name.trim().toLowerCase().replace(/[^\w\s]/g, " ").replace(/\s+/g, " ").trim();
  if (!trimmed) return undefined;

  const alias = SECTION_ALIASES[trimmed];
  if (alias && allowed.includes(alias)) return alias;

  const compact = trimmed.replace(/\s+/g, "");
  for (const key of allowed) {
    if (key.toLowerCase() === trimmed || key.toLowerCase() === compact) return key;
  }

  return undefined;
}

export function normalizeSectionOrder(
  custom: unknown,
  allowed: readonly string[],
): string[] | undefined {
  if (!Array.isArray(custom) || allowed.length === 0) return undefined;

  const allowedSet = new Set(allowed);
  const seen = new Set<string>();
  const result: string[] = [];

  for (const item of custom) {
    if (typeof item !== "string") continue;
    const key = resolveSectionKey(item, allowed) ?? (allowedSet.has(item) ? item : undefined);
    if (key && !seen.has(key)) {
      result.push(key);
      seen.add(key);
    }
  }

  for (const key of allowed) {
    if (!seen.has(key)) result.push(key);
  }

  return result.length > 0 ? result : undefined;
}

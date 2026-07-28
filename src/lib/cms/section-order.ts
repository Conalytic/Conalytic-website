import { getSectionOrderKeys } from "@/lib/cms/agent-prompt";

/** Friendly names analysts use → layout.sectionOrder keys. */
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

export function resolveSectionKey(name: string, allowed: string[]): string | undefined {
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
  allowed: string[],
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

export function getEffectiveSectionOrder(
  layout: { sectionOrder?: string[] } | undefined,
  registryId: string,
): string[] {
  const allowed = getSectionOrderKeys(registryId);
  if (!allowed.length) return [];
  return normalizeSectionOrder(layout?.sectionOrder, allowed) ?? [...allowed];
}

export function moveSection(
  order: string[],
  sectionId: string,
  relation: "before" | "after",
  anchorId: string,
): string[] | null {
  if (!order.includes(sectionId) || !order.includes(anchorId) || sectionId === anchorId) {
    return null;
  }

  const next = order.filter((id) => id !== sectionId);
  const anchorIndex = next.indexOf(anchorId);
  if (anchorIndex < 0) return null;

  const insertAt = relation === "before" ? anchorIndex : anchorIndex + 1;
  next.splice(insertAt, 0, sectionId);
  return next;
}

export function moveSectionToEdge(order: string[], sectionId: string, edge: "start" | "end"): string[] | null {
  if (!order.includes(sectionId)) return null;
  const next = order.filter((id) => id !== sectionId);
  if (edge === "start") next.unshift(sectionId);
  else next.push(sectionId);
  return next;
}

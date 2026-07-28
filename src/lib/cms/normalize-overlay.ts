/**
 * Normalize CMS overlays so AI output matches what preview components read.
 * Fixes common mistakes like `sections.hero.heading` → `sections.heroTitleLine1`.
 */

function applyHeroHeading(sections: Record<string, unknown>, heading: string) {
  const text = heading.trim();
  if (!text) return;

  const withConalytic = text.match(/^(.*)\s+(Conalytic)$/i);
  if (withConalytic) {
    sections.heroTitleLine1 = withConalytic[1].trim();
    sections.heroTitleLine2 = withConalytic[2];
    return;
  }

  const parts = text.split(/\s+/);
  if (parts.length >= 4) {
    const half = Math.ceil(parts.length / 2);
    sections.heroTitleLine1 = parts.slice(0, half).join(" ");
    sections.heroTitleLine2 = parts.slice(half).join(" ");
    return;
  }

  sections.heroTitleLine1 = text;
  sections.heroTitleLine2 = "";
}

function normalizeLinkFields(sections: Record<string, unknown>) {
  const ctaAliases: [string, string, string][] = [
    ["primaryCta", "ctaPrimaryLabel", "ctaPrimaryHref"],
    ["secondaryCta", "ctaSecondaryLabel", "ctaSecondaryHref"],
    ["heroPrimaryCta", "heroPrimaryCtaLabel", "heroPrimaryCtaHref"],
    ["heroSecondaryCta", "heroSecondaryCtaLabel", "heroSecondaryCtaHref"],
    ["heroCta", "heroPrimaryCtaLabel", "heroPrimaryCtaHref"],
    ["heroButton", "heroButtonLabel", "heroButtonHref"],
    ["integrationsCta", "integrationsCtaLabel", "integrationsCtaHref"],
    ["faqContact", "faqContactLabel", "faqContactHref"],
  ];

  for (const [key, labelKey, hrefKey] of ctaAliases) {
    const block = sections[key];
    if (!block || typeof block !== "object" || Array.isArray(block)) continue;
    const obj = block as Record<string, unknown>;
    if (typeof obj.label === "string" && !sections[labelKey]) sections[labelKey] = obj.label;
    if (typeof obj.href === "string" && !sections[hrefKey]) sections[hrefKey] = obj.href;
    if (typeof obj.text === "string" && !sections[labelKey]) sections[labelKey] = obj.text;
    if (typeof obj.url === "string" && !sections[hrefKey]) sections[hrefKey] = obj.url;
    delete sections[key];
  }

  const hero = sections.hero;
  if (hero && typeof hero === "object" && !Array.isArray(hero)) {
    const h = hero as Record<string, unknown>;
    for (const [key, labelKey, hrefKey] of ctaAliases) {
      const block = h[key];
      if (!block || typeof block !== "object" || Array.isArray(block)) continue;
      const obj = block as Record<string, unknown>;
      if (typeof obj.label === "string" && !sections[labelKey]) sections[labelKey] = obj.label;
      if (typeof obj.href === "string" && !sections[hrefKey]) sections[hrefKey] = obj.href;
    }
  }

  if (typeof sections.buttonLink === "string" && !sections.heroPrimaryCtaHref) {
    sections.heroPrimaryCtaHref = sections.buttonLink;
    delete sections.buttonLink;
  }
  if (typeof sections.internalLink === "string" && !sections.ctaPrimaryHref) {
    sections.ctaPrimaryHref = sections.internalLink;
    delete sections.internalLink;
  }
}

function normalizeHeroSections(sections: Record<string, unknown>) {
  const hero = sections.hero;
  if (hero && typeof hero === "object" && !Array.isArray(hero)) {
    const h = hero as Record<string, unknown>;
    if (typeof h.heading === "string") applyHeroHeading(sections, h.heading);
    else if (typeof h.title === "string") applyHeroHeading(sections, h.title);

    for (const [key, val] of Object.entries(h)) {
      if (key === "heading" || key === "title") continue;
      if (key.startsWith("hero") || key.endsWith("Title") || key.endsWith("Subtitle")) {
        sections[key] = val;
      }
    }
    delete sections.hero;
  }

  if (typeof sections.heroHeading === "string") {
    applyHeroHeading(sections, sections.heroHeading);
    delete sections.heroHeading;
  }
  if (typeof sections.heading === "string" && !sections.heroTitleLine1) {
    applyHeroHeading(sections, sections.heading);
    delete sections.heading;
  }

  // AI often sets only heroTitleLine1; split or clear line 2 so preview does not keep code defaults.
  if (typeof sections.heroTitleLine1 === "string" && sections.heroTitleLine2 === undefined) {
    applyHeroHeading(sections, sections.heroTitleLine1);
  }
}

export function normalizePageOverlay(registryId: string, data: Record<string, unknown>): Record<string, unknown> {
  const out = { ...data };
  const rawSections = out.sections;
  if (!rawSections || typeof rawSections !== "object" || Array.isArray(rawSections)) return out;

  const sections = { ...(rawSections as Record<string, unknown>) };
  normalizeLinkFields(sections);
  normalizeHeroSections(sections);
  out.sections = sections;
  return out;
}

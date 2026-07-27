import { CMS_REGISTRY } from "@/lib/cms/page-registry";
import { getFieldHintsForRegistry } from "@/lib/cms/field-hints";
import { getSiteRoutesHint } from "@/lib/cms/site-routes-hint";
import type { CmsSeoFields } from "@/lib/cms/types";

const HOME_SECTION_ORDER_KEYS = [
  "hero",
  "trustedBy",
  "transformation",
  "howItWorks",
  "products",
  "stats",
  "integrations",
  "testimonials",
  "pricing",
  "faq",
  "cta",
] as const;

const PAGE_SECTION_HINTS: Record<string, string[]> = {
  home: [...HOME_SECTION_ORDER_KEYS],
  features: ["hero", "productGrid", "deepDives", "faq", "cta"],
  integrations: ["hero", "grid", "faq", "cta"],
};

export function getSectionOrderKeys(registryId: string): string[] {
  return PAGE_SECTION_HINTS[registryId] ?? [];
}

export function buildAgentSystemPrompt(
  registryId: string,
  entryLabel: string,
  entryPath: string,
  options?: { readOnly?: boolean },
) {
  const readOnly = options?.readOnly ?? false;
  const registryList = CMS_REGISTRY.map((e) => `- ${e.id}: ${e.label} (${e.path})`).join("\n");
  const sectionKeys = getSectionOrderKeys(registryId);
  const fieldHints = getFieldHintsForRegistry(registryId);
  const siteRoutesHint = getSiteRoutesHint();
  const sectionHint =
    sectionKeys.length > 0
      ? `\nSection placement keys for "${registryId}" (use layout.sectionOrder only — must be a permutation of these existing sections):\n${sectionKeys.join(", ")}`
      : "";

  if (readOnly) {
    return `You are Conalytic Studio — an SEO and content analyst for ONE marketing page. This turn is READ-ONLY.

PAGE: ${entryLabel} (${entryPath})
REGISTRY ID: ${registryId}

The user wants an audit, review, or answers — NOT edits. You must NOT change any CMS data.

Use effectiveLiveSeo in the user message as what the live page actually shows (includes code defaults when CMS seo is empty).

In summary, provide a clear structured report:
1. Current state — title, meta description, canonical, OG tags, schema types, indexability
2. Gaps — fields missing from CMS overrides vs live defaults
3. Issues — length, keyword coverage, duplication, weak copy
4. Recommendations — numbered, actionable (user can ask to apply later)

OUTPUT — return JSON only:
{
  "summary": "your full audit/report here (markdown bullets allowed in text)",
  "data": { ...exact copy of cmsOverlay from user message — byte-for-byte unchanged... }
}

FORBIDDEN on read-only turns: editing data, adding seo/sections, saying you applied changes.
${sectionHint}
Brand voice: professional B2B SEO consultant.`;
  }

  return `You are Conalytic Studio — a marketing CMS content assistant. You update draft JSON for ONE existing page only.

PAGE: ${entryLabel} (${entryPath})
REGISTRY ID: ${registryId}

SITE REGISTRY (fixed — pages cannot be created from admin):
${registryList}

FIELD MAP (use these exact JSON paths — preview only reads these keys):
${fieldHints}

IMPORTANT: Page copy is stored in sections as flat string fields (e.g. sections.heroTitleLine1). Never nest hero copy under sections.hero or use keys like heading/title.

ALLOWED:
- Answer questions about the current page JSON, SEO, schemas, and section layout in the summary without changing data.
- Run SEO audits, content reviews, and gap analysis in the summary — return the current JSON unchanged in data unless the user asks you to apply fixes.
- Update copy in existing fields: headlines, body text, CTAs, SEO (seo.*), nav labels, footer text, blog markdown, testimonials, FAQ items, etc.
- Update page-level button links and internal linking: heroPrimaryCtaHref, heroSecondaryCtaHref, ctaPrimaryHref, ctaSecondaryHref, heroButtonHref, integrationsCtaHref, faqContactHref, and markdown links in bodyMarkdown. Always set the matching *Label field when changing a button.
- Add or improve internal links between existing site pages using registry paths (e.g. point a CTA to /products/kpis-tracker or /features).
- Use attached documents as source material when the user provides files.
- Reorder existing page sections via layout.sectionOrder (array of section keys). Example: move "products" to position 3.
- Edit items inside existing arrays (e.g. FAQ questions) — do not invent new module types.

FORBIDDEN (developer scope — never do these):
- Create new pages, routes, slugs, or registry entries.
- Add chrome header/footer nav links to URLs outside the site registry.
- Add new React components, modules, section types, or JSON keys outside the current shape.
- Change code, APIs, integrations, or site architecture.
- Remove required legal disclaimers on privacy/terms pages.

${siteRoutesHint}

OUTPUT FORMAT — return a single JSON object:
{
  "summary": "2-4 plain sentences: what you changed, or your answer if the user only asked a question",
  "data": { ...full CMS overlay for this page — return UNCHANGED if no edits are needed... }
}

If the user only asks a question or wants an audit/review (e.g. SEO audit, schema check), put the full answer in summary and return data identical to the current JSON.

The "data" object must match the current CMS shape (seo, sections, layout, etc.). Return ONLY valid JSON — no markdown fences.
${sectionHint}

Brand voice: professional B2B marketing analytics — GA4, Google Ads, KPIs, conversational analytics, report builder.`;
}

export function buildAgentUserPrompt(
  current: Record<string, unknown>,
  prompt: string,
  attachmentBlock: string,
  options?: { readOnly?: boolean; effectiveSeo?: CmsSeoFields | null },
) {
  const readOnly = options?.readOnly ?? false;
  const context = {
    cmsOverlay: current,
    ...(options?.effectiveSeo ? { effectiveLiveSeo: options.effectiveSeo } : {}),
  };

  if (readOnly) {
    return `Page context (READ-ONLY — do not modify cmsOverlay):
${JSON.stringify(context, null, 2)}

User request:
${prompt}
${attachmentBlock ? `\n\nAttached reference documents:\n${attachmentBlock}` : ""}

Return cmsOverlay unchanged in "data". Put the full audit/report only in "summary".`;
  }

  return `Current CMS JSON for this page:
${JSON.stringify(context, null, 2)}

User request:
${prompt || "Apply relevant updates from the attached documents to this page's content and SEO."}
${attachmentBlock ? `\n\nAttached reference documents:\n${attachmentBlock}` : ""}

Decide which fields to update (content, SEO, section order). Return the full updated overlay in "data" plus a clear "summary".`;
}

export const HOME_DEFAULT_SECTION_ORDER = [...HOME_SECTION_ORDER_KEYS];

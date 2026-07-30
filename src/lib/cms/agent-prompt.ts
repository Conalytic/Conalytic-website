import { CMS_REGISTRY } from "@/lib/cms/page-registry";
import { getFieldHintsForRegistry } from "@/lib/cms/field-hints";
import { getSiteRoutesHint } from "@/lib/cms/site-routes-hint";
import { getEffectiveSectionOrder } from "@/lib/cms/section-order";
import { detectPromptSections } from "@/lib/cms/agent-section-intent";
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

function buildSectionOrderHint(registryId: string, current: Record<string, unknown>): string {
  const keys = getSectionOrderKeys(registryId);
  if (!keys.length) return "";

  const layout = current.layout as { sectionOrder?: string[] } | undefined;
  const order = getEffectiveSectionOrder(layout, registryId);
  const numbered = order.map((key, i) => `${i + 1}. ${key}`).join("\n");

  return `
SECTION ORDER (home page blocks — reorder via layout.sectionOrder only):
Allowed keys: ${keys.join(", ")}
Current order:
${numbered}

To move a section, return layout.sectionOrder as a full array of ALL keys in the new order.
Example — move pricing before FAQ:
"layout": { "sectionOrder": ["hero","trustedBy","transformation","howItWorks","products","stats","integrations","testimonials","pricing","faq","cta"] }
Example — move FAQ above pricing: swap "faq" and "pricing" positions in that array.`;
}

function buildExamplesBlock(registryId: string): string {
  if (registryId !== "home") {
    return `
EXAMPLE — update hero headline:
{
  "summary": "Updated the hero headline.",
  "data": {
    "sections": {
      "heroTitleLine1": "Marketing analytics with",
      "heroTitleLine2": "Conalytic"
    }
  }
}`;
  }

  return `
EXAMPLES (follow exactly — data is the overlay, NOT wrapped in cmsOverlay):

1) Change hero headline only:
{
  "summary": "Updated the home hero headline.",
  "data": {
    "sections": {
      "heroTitleLine1": "Marketing analytics with",
      "heroTitleLine2": "Conalytic"
    }
  }
}

2) Change FAQ section title (NOT hero):
{
  "summary": "Updated the FAQ section heading.",
  "data": {
    "sections": {
      "faqTitle": "Common questions about Conalytic"
    }
  }
}

3) Edit one FAQ answer (return full faqItems array):
{
  "summary": "Updated the first FAQ answer.",
  "data": {
    "sections": {
      "faqItems": [
        { "question": "What is Conalytic?", "answer": "..." },
        ...
      ]
    }
  }
}

4) Change transformation section title:
{
  "summary": "Updated the transformation block headline.",
  "data": {
    "sections": {
      "transformation": {
        "titleLine1": "Same metrics.",
        "titleLine2": "Better decisions."
      }
    }
  }
}

5) Move pricing above FAQ:
{
  "summary": "Moved the pricing section above FAQ.",
  "data": {
    "layout": {
      "sectionOrder": ["hero","trustedBy","transformation","howItWorks","products","stats","integrations","testimonials","pricing","faq","cta"]
    }
  }
}

6) Bottom CTA copy:
{
  "summary": "Updated the bottom CTA.",
  "data": {
    "sections": {
      "ctaTitle": "Start asking your data questions today",
      "ctaSubtitle": "Free signup with tokens — no credit card."
    }
  }
}`;
}

export function buildAgentSystemPrompt(
  registryId: string,
  entryLabel: string,
  entryPath: string,
  options?: { readOnly?: boolean },
) {
  const readOnly = options?.readOnly ?? false;
  const registryList = CMS_REGISTRY.map((e) => `- ${e.id}: ${e.label} (${e.path})`).join("\n");
  const fieldHints = getFieldHintsForRegistry(registryId);
  const siteRoutesHint = getSiteRoutesHint();
  const sectionHint = buildSectionOrderHint(registryId, {});
  const examples = buildExamplesBlock(registryId);

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
  "data": { ...exact overlay fields only — same shape as cmsOverlay in the user message... }
}

FORBIDDEN on read-only turns: editing data, adding seo/sections, saying you applied changes.
${sectionHint}
Brand voice: professional B2B SEO consultant.`;
  }

  return `You are Conalytic Studio — a precise marketing CMS editor. You apply copy and layout changes by returning valid JSON patches.

PAGE: ${entryLabel} (${entryPath})
REGISTRY ID: ${registryId}

SITE REGISTRY (fixed — pages cannot be created from admin):
${registryList}

FIELD MAP (preview ONLY reads these paths):
${fieldHints}

CRITICAL RULES:
1. Return "data" as the page overlay itself: { "seo"?, "sections"?, "layout"? } — NEVER wrap inside cmsOverlay or effectiveLiveSeo.
2. Put ALL page copy under "sections" as flat keys OR nested section objects (sections.transformation.titleLine1).
3. Use effectiveSections in the user message as the live copy baseline — edit the fields that match the user's target section.
4. Only change heroTitleLine1 / heroTitleLine2 when the user asks about the hero, headline, or H1 — NOT for FAQ, pricing, CTA, testimonials, etc.
5. For section moves: set layout.sectionOrder to a complete array of every allowed section key in the new order.
6. Return ONLY the fields you change plus summary — partial patches are OK; omitted fields stay unchanged.
7. When changing a button, set both *Label and *Href fields together.

ALLOWED:
- Copy edits: headlines, subtitles, CTAs, FAQ items, testimonials, blog markdown, SEO fields (seo.*).
- Internal links using registry paths (/features, /products/kpis-tracker, /contact, etc.).
- Section reorder on pages with layout.sectionOrder (see section list below).
- Questions / audits in summary with unchanged data when user does not ask to apply.

FORBIDDEN:
- New pages, routes, components, or JSON keys outside the field map.
- Nested hero objects (sections.hero), keys named heading/title/subtitle at wrong paths.
- chrome nav links to URLs outside the site registry.

${siteRoutesHint}
${sectionHint}
${examples}

OUTPUT FORMAT — single JSON object, no markdown fences:
{
  "summary": "2-4 plain sentences describing what changed",
  "data": { ...only changed overlay fields... }
}

If the user only asks a question, put the answer in summary and return "data": {} (empty object).

Brand voice: professional B2B marketing analytics — GA4, Google Ads, KPIs, conversational analytics, report builder.`;
}

export function buildAgentUserPrompt(
  current: Record<string, unknown>,
  prompt: string,
  attachmentBlock: string,
  options?: {
    readOnly?: boolean;
    effectiveSeo?: CmsSeoFields | null;
    registryId?: string;
    effectiveSections?: Record<string, unknown>;
  },
) {
  const readOnly = options?.readOnly ?? false;
  const registryId = options?.registryId ?? "";
  const sectionState =
    registryId && getSectionOrderKeys(registryId).length > 0
      ? buildSectionOrderHint(registryId, current)
      : "";

  const targetedSections = prompt ? detectPromptSections(prompt) : [];
  const sectionIntent =
    targetedSections.length > 0
      ? `\nUser likely refers to section(s): ${targetedSections.join(", ")}. Edit fields for those sections only unless they ask for multiple areas.\n`
      : "";

  const context = {
    cmsOverlay: current,
    ...(options?.effectiveSections ? { effectiveSections: options.effectiveSections } : {}),
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

  return `Current page overlay (cmsOverlay — merge your edits into this structure):
${JSON.stringify(context, null, 2)}
${sectionState}${sectionIntent}

User request:
${prompt || "Apply relevant updates from the attached documents to this page's content and SEO."}
${attachmentBlock ? `\n\nAttached reference documents:\n${attachmentBlock}` : ""}

Return JSON with "summary" and "data" containing ONLY the overlay fields you changed (seo, sections, layout). Do NOT echo cmsOverlay wrapper in data.`;
}

export const HOME_DEFAULT_SECTION_ORDER = [...HOME_SECTION_ORDER_KEYS];

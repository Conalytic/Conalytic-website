import { z } from "zod";
import type { ZodType } from "zod";

function coerceKeywords(value: unknown): string[] | undefined {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string").slice(0, 30);
  }
  if (typeof value === "string") {
    return value
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .slice(0, 30);
  }
  return undefined;
}

function sanitizeSeo(seo: unknown): unknown {
  if (!seo || typeof seo !== "object" || Array.isArray(seo)) return seo;
  const raw = { ...(seo as Record<string, unknown>) };
  if (raw.keywords !== undefined) {
    const keywords = coerceKeywords(raw.keywords);
    if (keywords?.length) raw.keywords = keywords;
    else delete raw.keywords;
  }
  if (typeof raw.schemaJson === "string") {
    try {
      JSON.parse(raw.schemaJson);
    } catch {
      delete raw.schemaJson;
    }
  }
  if (typeof raw.indexable === "string") {
    raw.indexable = raw.indexable === "true";
  }
  return raw;
}

/** Strip unknown keys and fix common AI shape mistakes before Zod validation. */
export function sanitizeAgentData(data: unknown): Record<string, unknown> {
  if (!data || typeof data !== "object" || Array.isArray(data)) return {};

  const raw = data as Record<string, unknown>;
  const out: Record<string, unknown> = {};

  if (raw.seo !== undefined) out.seo = sanitizeSeo(raw.seo);
  if (raw.layout !== undefined && typeof raw.layout === "object" && !Array.isArray(raw.layout)) {
    out.layout = raw.layout;
  }

  const sections: Record<string, unknown> =
    raw.sections && typeof raw.sections === "object" && !Array.isArray(raw.sections)
      ? { ...(raw.sections as Record<string, unknown>) }
      : {};

  // AI often puts section copy at the root instead of under sections.*
  for (const [key, value] of Object.entries(raw)) {
    if (key === "seo" || key === "layout" || key === "sections") continue;
    if (
      key.startsWith("hero") ||
      key.startsWith("cta") ||
      key.startsWith("faq") ||
      key.startsWith("trusted") ||
      key.startsWith("services") ||
      key.startsWith("integrations") ||
      key.startsWith("testimonials") ||
      key.endsWith("TitleLine1") ||
      key.endsWith("TitleLine2") ||
      key.endsWith("Subtitle")
    ) {
      if (sections[key] === undefined) sections[key] = value;
      continue;
    }
    if (key === "faqItems" || key === "testimonials") {
      if (sections[key] === undefined) sections[key] = value;
      continue;
    }
  }

  if (Object.keys(sections).length > 0) out.sections = sections;

  for (const key of ["title", "category", "readTime", "dateLabel", "datePublished", "excerpt", "description", "bodyMarkdown"]) {
    if (typeof raw[key] === "string") out[key] = raw[key];
  }
  if (typeof raw.featured === "boolean") out.featured = raw.featured;

  for (const key of ["links", "loginLabel", "loginHref", "primaryCtaLabel", "primaryCtaHref", "email", "columns", "legalLinks", "copyrightText", "newsletterTitle", "newsletterSubtitle"]) {
    if (raw[key] !== undefined) out[key] = raw[key];
  }

  return out;
}

const agentEnvelopeSchema = z.object({
  summary: z.string().min(1).max(16_000),
  data: z.unknown().optional(),
});

export type ParsedAgentResponse = {
  summary: string;
  data: Record<string, unknown>;
  usedFallbackData: boolean;
};

export function parseAgentResponse(
  parsed: unknown,
  contentSchema: ZodType,
  fallbackData: Record<string, unknown>,
): { ok: true; value: ParsedAgentResponse } | { ok: false; error: string } {
  const envelope = agentEnvelopeSchema.safeParse(parsed);
  if (!envelope.success) {
    return { ok: false, error: "AI response must include a summary string." };
  }

  const sanitized = sanitizeAgentData(envelope.data.data);
  const validated = contentSchema.safeParse(
    Object.keys(sanitized).length > 0 ? sanitized : fallbackData,
  );

  if (validated.success) {
    return {
      ok: true,
      value: {
        summary: envelope.data.summary.trim(),
        data: validated.data as Record<string, unknown>,
        usedFallbackData: Object.keys(sanitized).length === 0,
      },
    };
  }

  const fallbackValidated = contentSchema.safeParse(fallbackData);
  if (fallbackValidated.success) {
    return {
      ok: true,
      value: {
        summary: envelope.data.summary.trim(),
        data: fallbackValidated.data as Record<string, unknown>,
        usedFallbackData: true,
      },
    };
  }

  return { ok: false, error: "AI output failed validation" };
}

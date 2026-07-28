/**
 * Deterministic CMS patches for common analyst prompts — applied before/after AI so
 * simple copy and section moves work even when the model returns the wrong JSON shape.
 */
import { getSectionOrderKeys } from "@/lib/cms/agent-prompt";
import { deepMerge } from "@/lib/cms/deep-merge";
import { normalizePageOverlay } from "@/lib/cms/normalize-overlay";
import {
  getEffectiveSectionOrder,
  moveSection,
  moveSectionToEdge,
  resolveSectionKey,
} from "@/lib/cms/section-order";

function patchSections(sections: Record<string, unknown>, fields: Record<string, string>): Record<string, unknown> {
  return { ...sections, ...fields };
}

function parseHeadingReplacement(prompt: string): { line1?: string; line2?: string } | null {
  const patterns = [
    /(?:change|update|set|replace)\s+(?:the\s+)?(?:hero\s+)?(?:headline|heading|title)\s+(?:to|as)\s+["“]?(.+?)["”]?\s*$/i,
    /(?:headline|heading|title)\s+(?:should be|to)\s+["“]?(.+?)["”]?\s*$/i,
    /change\s+(?:this|it)\s+to\s+["“]?(.+?)["”]?\s*$/i,
    /update\s+(?:this|it)\s+to\s+["“]?(.+?)["”]?\s*$/i,
    /^["“](.+?)["”]\s*(?:for the hero|as the headline)?\s*$/i,
  ];

  for (const re of patterns) {
    const m = prompt.match(re);
    if (!m?.[1]) continue;
    const text = m[1].trim();
    if (!text) continue;

    const withBrand = text.match(/^(.*)\s+(Conalytic)$/i);
    if (withBrand) {
      return { line1: withBrand[1].trim(), line2: withBrand[2] };
    }

    return { line1: text, line2: "" };
  }

  return null;
}

function parseSectionReorder(
  prompt: string,
  allowed: string[],
  currentOrder: string[],
): string[] | null {
  const p = prompt.trim();
  const base = currentOrder.length > 0 ? currentOrder : [...allowed];

  const moveRel = p.match(/move\s+(.+?)\s+(above|before|after|below)\s+(.+?)(?:\.|$)/i);
  if (moveRel) {
    const sectionId = resolveSectionKey(moveRel[1], allowed);
    const anchorId = resolveSectionKey(moveRel[3], allowed);
    const relation = moveRel[2].toLowerCase();
    if (sectionId && anchorId) {
      const rel = relation === "before" || relation === "above" ? "before" : "after";
      return moveSection(base, sectionId, rel, anchorId);
    }
  }

  const putRel = p.match(/put\s+(.+?)\s+(above|before|after|below)\s+(.+?)(?:\.|$)/i);
  if (putRel) {
    const sectionId = resolveSectionKey(putRel[1], allowed);
    const anchorId = resolveSectionKey(putRel[3], allowed);
    const relation = putRel[2].toLowerCase();
    if (sectionId && anchorId) {
      const rel = relation === "before" || relation === "above" ? "before" : "after";
      return moveSection(base, sectionId, rel, anchorId);
    }
  }

  const toEdge = p.match(/move\s+(.+?)\s+to\s+(the\s+)?(top|bottom|start|end)(?:\.|$)/i);
  if (toEdge) {
    const sectionId = resolveSectionKey(toEdge[1], allowed);
    const edge = toEdge[3].toLowerCase();
    if (sectionId) {
      return moveSectionToEdge(base, sectionId, edge === "top" || edge === "start" ? "start" : "end");
    }
  }

  return null;
}

/** Returns a partial overlay patch, or null when the prompt has no quick-match intent. */
export function buildQuickPatch(
  prompt: string,
  registryId: string,
  current: Record<string, unknown>,
): Record<string, unknown> | null {
  const allowed = getSectionOrderKeys(registryId);
  const patch: Record<string, unknown> = {};
  let matched = false;

  const heading = parseHeadingReplacement(prompt);
  if (heading && (registryId === "home" || allowed.length > 0)) {
    const sections = patchSections(
      (current.sections as Record<string, unknown> | undefined) ?? {},
      {
        heroTitleLine1: heading.line1 ?? "",
        ...(heading.line2 !== undefined ? { heroTitleLine2: heading.line2 } : {}),
      },
    );
    patch.sections = sections;
    matched = true;
  }

  if (allowed.length > 0) {
    const layout = (current.layout as { sectionOrder?: string[] } | undefined) ?? {};
    const baseOrder = getEffectiveSectionOrder(layout, registryId);
    const reordered = parseSectionReorder(prompt, allowed, baseOrder);
    if (reordered) {
      patch.layout = { ...layout, sectionOrder: reordered };
      matched = true;
    }
  }

  if (!matched) return null;

  return normalizePageOverlay(registryId, patch);
}

/** Merge quick patch into overlay; quick wins on conflicting section/layout keys. */
export function mergeQuickPatch(
  registryId: string,
  base: Record<string, unknown>,
  quickPatch: Record<string, unknown> | null,
): Record<string, unknown> {
  if (!quickPatch) return base;
  return normalizePageOverlay(registryId, deepMerge(base, quickPatch));
}

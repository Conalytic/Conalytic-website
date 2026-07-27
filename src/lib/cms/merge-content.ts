import { deepMerge } from "@/lib/cms/deep-merge";
import { getDraft } from "@/lib/cms/draft-store";
import { getRegistryEntryById, getRegistryEntryByPath } from "@/lib/cms/page-registry";
import { readCmsJson } from "@/lib/cms/read-cms-file";
import { normalizePageOverlay } from "@/lib/cms/normalize-overlay";
import type { CmsBlogOverlay, CmsPageOverlay } from "@/lib/cms/types";

export async function getMergedRegistryData(
  registryId: string,
  sessionId?: string,
): Promise<Record<string, unknown> | null> {
  const entry = getRegistryEntryById(registryId);
  if (!entry) return null;

  const published = (await readCmsJson<Record<string, unknown>>(entry.contentFile)) ?? {};
  if (!sessionId) return normalizePageOverlay(registryId, published);

  const draft = await getDraft(sessionId, registryId);
  if (!draft?.data) return normalizePageOverlay(registryId, published);

  return normalizePageOverlay(registryId, deepMerge(published, draft.data as Record<string, unknown>));
}

export async function getMergedPageOverlay(
  path: string,
  sessionId?: string,
): Promise<CmsPageOverlay | CmsBlogOverlay | null> {
  const entry = getRegistryEntryByPath(path);
  if (!entry || entry.type === "chrome") return null;
  const merged = await getMergedRegistryData(entry.id, sessionId);
  return merged as CmsPageOverlay | CmsBlogOverlay | null;
}

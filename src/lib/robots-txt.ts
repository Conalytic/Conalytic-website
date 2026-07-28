/**
 * robots.txt — CMS body, Content-Signal directives, and crawl rules.
 */
import { readCmsJson } from "@/lib/cms/read-cms-file";
import { buildDefaultRobotsTxt, stagingRobotsTxt } from "@/lib/cms/robots-default";
import { allowSearchIndexing } from "@/lib/seo-config";

export { buildDefaultRobotsTxt, stagingRobotsTxt };

export async function getPublishedRobotsBody(): Promise<string | null> {
  const cms = await readCmsJson<{ body?: string }>("site/robots.json");
  const body = cms?.body?.trim();
  return body || null;
}

export function resolveRobotsBody(
  published: Record<string, unknown> | null | undefined,
  draft: Record<string, unknown> | null | undefined,
): string {
  const draftBody = typeof draft?.body === "string" ? draft.body.trim() : "";
  if (draftBody) return draftBody;
  const publishedBody = typeof published?.body === "string" ? published.body.trim() : "";
  if (publishedBody) return publishedBody;
  return buildDefaultRobotsTxt();
}

export async function buildRobotsTxt(): Promise<string> {
  const custom = await getPublishedRobotsBody();
  if (custom) return custom;

  if (!allowSearchIndexing()) {
    return stagingRobotsTxt();
  }

  return buildDefaultRobotsTxt();
}

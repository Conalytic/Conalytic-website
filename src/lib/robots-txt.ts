import { readCmsJson } from "@/lib/cms/read-cms-file";
import { buildDefaultRobotsTxt, stagingRobotsTxt } from "@/lib/cms/robots-default";
import { allowSearchIndexing } from "@/lib/seo-config";

export { buildDefaultRobotsTxt, stagingRobotsTxt };

export async function getPublishedRobotsBody(): Promise<string | null> {
  const cms = await readCmsJson<{ body?: string }>("site/robots.json");
  const body = cms?.body?.trim();
  return body || null;
}

export async function buildRobotsTxt(): Promise<string> {
  if (!allowSearchIndexing()) {
    return stagingRobotsTxt();
  }

  const custom = await getPublishedRobotsBody();
  if (custom) return custom;

  return buildDefaultRobotsTxt();
}

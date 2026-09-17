import { readCmsJson } from "@/lib/cms/read-cms-file";
import { buildDefaultRobotsTxt } from "@/lib/cms/robots-default";

export { buildDefaultRobotsTxt };

export async function getPublishedRobotsBody(): Promise<string | null> {
  const cms = await readCmsJson<{ body?: string }>("site/robots.json");
  const body = cms?.body?.trim();
  return body || null;
}

export async function buildRobotsTxt(): Promise<string> {
  const custom = await getPublishedRobotsBody();
  if (custom) return custom;

  return buildDefaultRobotsTxt();
}

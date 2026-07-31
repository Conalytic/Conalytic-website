import type { Metadata } from "next";
import { getPublishedPageOverlay } from "@/lib/cms/get-page-content";
import { buildPageMetadataFromCms } from "@/lib/cms/seo";

export async function buildRouteMetadata(
  path: string,
  defaults: {
    title: string;
    description: string;
    keywords?: string[];
  },
): Promise<Metadata> {
  const overlay = await getPublishedPageOverlay(path);
  return buildPageMetadataFromCms(path, defaults, overlay?.seo);
}

import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/page-seo";

export function buildRouteMetadata(
  path: string,
  defaults: {
    title: string;
    description: string;
    keywords?: string[];
    indexable?: boolean;
  },
): Metadata {
  return buildPageMetadata({
    path,
    title: defaults.title,
    description: defaults.description,
    keywords: defaults.keywords,
    indexable: defaults.indexable,
  });
}

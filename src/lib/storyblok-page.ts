/**
 * Thin helpers: load a Storyblok story by slug and merge SEO fields into Next Metadata.
 */
import type { Metadata } from "next";
import { getMetadataFromStory } from "@/lib/storyblok";
import { getPageStory } from "@/lib/storyblok-server";

export async function getPageMetadata(slug: string, fallback: Metadata): Promise<Metadata> {
  const story = await getPageStory(slug);
  return getMetadataFromStory(story, fallback);
}


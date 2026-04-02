import type { Metadata } from "next";
import { getMetadataFromStory, getPageStory } from "@/lib/storyblok";

export async function getPageMetadata(slug: string, fallback: Metadata): Promise<Metadata> {
  const story = await getPageStory(slug);
  return getMetadataFromStory(story, fallback);
}


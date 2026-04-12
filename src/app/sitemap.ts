/**
 * Sitemap URLs when indexing is enabled (launch flag + `ALLOW_SEARCH_INDEXING=1` in `seo-config.ts`). Otherwise empty.
 */
import { MetadataRoute } from "next";
import type { StoryblokStory } from "@/lib/storyblok";
import { allowSearchIndexing, SITE_ORIGIN } from "@/lib/seo-config";
import { getPublishedBlogStories } from "@/lib/storyblok-server";

const STATIC_PATHS: MetadataRoute.Sitemap = [
  { url: `${SITE_ORIGIN}/`, changeFrequency: "weekly", priority: 1 },
  { url: `${SITE_ORIGIN}/features`, changeFrequency: "weekly", priority: 0.9 },
  { url: `${SITE_ORIGIN}/products/conversational-analytics`, changeFrequency: "monthly", priority: 0.9 },
  { url: `${SITE_ORIGIN}/products/report-builder`, changeFrequency: "monthly", priority: 0.85 },
  { url: `${SITE_ORIGIN}/products/applicant-tracking-system`, changeFrequency: "monthly", priority: 0.85 },
  { url: `${SITE_ORIGIN}/integrations`, changeFrequency: "monthly", priority: 0.85 },
  { url: `${SITE_ORIGIN}/about-us`, changeFrequency: "monthly", priority: 0.8 },
  { url: `${SITE_ORIGIN}/contact`, changeFrequency: "monthly", priority: 0.9 },
  { url: `${SITE_ORIGIN}/blogs`, changeFrequency: "weekly", priority: 0.85 },
  { url: `${SITE_ORIGIN}/careers`, changeFrequency: "monthly", priority: 0.75 },
  { url: `${SITE_ORIGIN}/cookies`, changeFrequency: "yearly", priority: 0.4 },
  { url: `${SITE_ORIGIN}/brand`, changeFrequency: "yearly", priority: 0.5 },
];

function publicBlogPath(story: StoryblokStory): string {
  const fs = story.full_slug || "";
  if (fs.startsWith("blogs/")) return `/${fs.slice("blogs/".length)}`;
  if (fs.startsWith("blog/")) return `/${fs.slice("blog/".length)}`;
  return `/${story.slug}`;
}

function lastMod(story: StoryblokStory): Date | undefined {
  const raw = story.published_at || story.first_published_at;
  if (!raw) return undefined;
  const d = new Date(raw);
  return Number.isNaN(d.getTime()) ? undefined : d;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!allowSearchIndexing()) {
    return [];
  }

  let blogEntries: MetadataRoute.Sitemap = [];
  try {
    const stories = await getPublishedBlogStories();
    blogEntries = stories.map((story) => {
      const path = publicBlogPath(story);
      const lastModified = lastMod(story);
      return {
        url: `${SITE_ORIGIN}${path}`,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.75,
      };
    });
  } catch {
    /* Storyblok optional at build time */
  }

  return [...STATIC_PATHS, ...blogEntries];
}

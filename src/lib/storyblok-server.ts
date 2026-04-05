/**
 * Storyblok CDN fetches — imports `next/headers`. Use only from Server Components, route handlers, or `sitemap.ts`.
 *
 * Draft: `next dev`, Referer from storyblok.com, or `sb_visual_editor` cookie (see `src/middleware.ts`).
 */
import { cookies, headers } from "next/headers";
import type { StoryblokOptions, StoryblokStory } from "./storyblok-core";
import { getPageStoryCandidates } from "./storyblok-core";

const STORYBLOK_API_TOKEN = process.env.STORYBLOK_API_TOKEN;
const STORYBLOK_PREVIEW_TOKEN = process.env.STORYBLOK_PREVIEW_TOKEN;

const BASE_URL = "https://api.storyblok.com/v2/cdn";

const PREVIEW_COOKIE = "sb_visual_editor";

interface StoryblokResponse {
  story?: StoryblokStory;
  stories?: StoryblokStory[];
  total?: number;
  perPage?: number;
}

async function resolveContentVersion(explicit?: "draft" | "published"): Promise<"draft" | "published"> {
  if (explicit) {
    return explicit;
  }
  if (process.env.NODE_ENV === "development") {
    return "draft";
  }
  try {
    const h = await headers();
    const referer = h.get("referer") || "";
    if (referer.includes("storyblok.com")) {
      return "draft";
    }
    const cookieStore = await cookies();
    if (cookieStore.get(PREVIEW_COOKIE)?.value === "1") {
      return "draft";
    }
  } catch {
    /* Outside a request (or static context): default to published */
  }
  return "published";
}

function tokenForVersion(version: "draft" | "published"): string | undefined {
  return version === "draft" ? STORYBLOK_PREVIEW_TOKEN : STORYBLOK_API_TOKEN;
}

/** Fetch a single story by slug from Storyblok. Pass `version: "published"` to bypass preview (e.g. sitemap). */
export async function getStoryBySlug(slug: string, options: StoryblokOptions = {}): Promise<StoryblokStory | null> {
  const version = await resolveContentVersion(options.version);
  const token = tokenForVersion(version);

  if (!token) {
    console.warn("Storyblok API token not configured. Using static content.");
    return null;
  }

  try {
    const params = new URLSearchParams({
      token,
      version,
    });

    const pathSlug = encodeURIComponent(slug);
    const fetchOptions =
      version === "draft" ? { cache: "no-store" as const } : { next: { revalidate: 60 } };

    const response = await fetch(`${BASE_URL}/stories/${pathSlug}?${params}`, fetchOptions);

    if (!response.ok) {
      return null;
    }

    const data: StoryblokResponse = await response.json();
    return data.story || null;
  } catch (error) {
    console.error("Failed to fetch story from Storyblok:", error);
    return null;
  }
}

export async function getStories(options: StoryblokOptions = {}): Promise<StoryblokStory[]> {
  const version = await resolveContentVersion(options.version);
  const token = tokenForVersion(version);

  if (!token) {
    console.warn("Storyblok API token not configured. Using static content.");
    return [];
  }

  try {
    const params = new URLSearchParams({
      token,
      version,
      per_page: String(options.per_page || 25),
      page: String(options.page || 1),
    });

    if (options.starts_with) {
      params.set("starts_with", options.starts_with);
    }

    const fetchOptions =
      version === "draft" ? { cache: "no-store" as const } : { next: { revalidate: 60 } };

    const response = await fetch(`${BASE_URL}/stories?${params}`, fetchOptions);

    if (!response.ok) {
      return [];
    }

    const data: StoryblokResponse = await response.json();
    return data.stories || [];
  } catch (error) {
    console.error("Failed to fetch stories from Storyblok:", error);
    return [];
  }
}

export async function getFirstStoryBySlugs(slugs: string[]): Promise<StoryblokStory | null> {
  for (const slug of slugs) {
    const story = await getStoryBySlug(slug);
    if (story) {
      return story;
    }
  }

  return null;
}

export async function getPageStory(routeSlug: string): Promise<StoryblokStory | null> {
  return getFirstStoryBySlugs(getPageStoryCandidates(routeSlug));
}

export async function getBlogStoryByPublicSlug(slug: string): Promise<StoryblokStory | null> {
  const normalized = slug.replace(/^\/+|\/+$/g, "");
  if (!normalized) {
    return null;
  }

  return getFirstStoryBySlugs([
    `blogs/${normalized}`,
    `blog/${normalized}`,
  ]);
}

export async function getPublishedBlogStories(): Promise<StoryblokStory[]> {
  const [blogs, blog] = await Promise.all([
    getStories({ starts_with: "blogs/", per_page: 100, version: "published" }),
    getStories({ starts_with: "blog/", per_page: 100, version: "published" }),
  ]);

  const all = [...blogs, ...blog];
  const unique = new Map<string, StoryblokStory>();

  for (const story of all) {
    unique.set(story.uuid, story);
  }

  return Array.from(unique.values());
}

export async function getSiteConfigStory(): Promise<StoryblokStory | null> {
  return getFirstStoryBySlugs([
    "globals/site-config",
    "settings/site-config",
    "site-config",
  ]);
}

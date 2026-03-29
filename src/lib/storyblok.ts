/**
 * Storyblok API utilities
 *
 * This module handles all communication with the Storyblok Content Delivery API.
 * Each piece of content (page, blog post, etc.) is a "Story" in Storyblok.
 *
 * SETUP REQUIRED:
 * 1. Create a Storyblok account at https://app.storyblok.com
 * 2. Create a new space (project)
 * 3. Copy your API token from Settings > Access Tokens
 * 4. Add it to your .env.local file
 */

const STORYBLOK_API_TOKEN = process.env.STORYBLOK_API_TOKEN;
const STORYBLOK_PREVIEW_TOKEN = process.env.STORYBLOK_PREVIEW_TOKEN;
const STORYBLOK_VERSION = (process.env.NODE_ENV === "development" ? "draft" : "published") as "draft" | "published";

const BASE_URL = "https://api.storyblok.com/v2/cdn";

interface StoryblokOptions {
  version?: "draft" | "published";
  slug?: string;
  starts_with?: string;
  per_page?: number;
  page?: number;
}

interface StoryblokStory {
  id: number;
  uuid: string;
  name: string;
  slug: string;
  full_slug: string;
  content: Record<string, unknown>;
  created_at: string;
  published_at: string;
  first_published_at: string;
}

interface StoryblokResponse {
  story?: StoryblokStory;
  stories?: StoryblokStory[];
  total?: number;
  perPage?: number;
}

/**
 * Fetch a single story by slug from Storyblok
 */
export async function getStoryBySlug(slug: string, options: StoryblokOptions = {}): Promise<StoryblokStory | null> {
  const token = STORYBLOK_VERSION === "draft" ? STORYBLOK_PREVIEW_TOKEN : STORYBLOK_API_TOKEN;

  if (!token) {
    console.warn("Storyblok API token not configured. Using static content.");
    return null;
  }

  try {
    const params = new URLSearchParams({
      token,
      version: options.version || STORYBLOK_VERSION,
    });

    const response = await fetch(`${BASE_URL}/stories/${slug}?${params}`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      console.error(`Storyblok API error: ${response.status} for slug: ${slug}`);
      return null;
    }

    const data: StoryblokResponse = await response.json();
    return data.story || null;
  } catch (error) {
    console.error("Failed to fetch story from Storyblok:", error);
    return null;
  }
}

/**
 * Fetch multiple stories from Storyblok
 */
export async function getStories(options: StoryblokOptions = {}): Promise<StoryblokStory[]> {
  const token = STORYBLOK_VERSION === "draft" ? STORYBLOK_PREVIEW_TOKEN : STORYBLOK_API_TOKEN;

  if (!token) {
    console.warn("Storyblok API token not configured. Using static content.");
    return [];
  }

  try {
    const params = new URLSearchParams({
      token,
      version: options.version || STORYBLOK_VERSION,
      per_page: String(options.per_page || 25),
      page: String(options.page || 1),
    });

    if (options.starts_with) {
      params.set("starts_with", options.starts_with);
    }

    const response = await fetch(`${BASE_URL}/stories?${params}`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      console.error(`Storyblok API error: ${response.status}`);
      return [];
    }

    const data: StoryblokResponse = await response.json();
    return data.stories || [];
  } catch (error) {
    console.error("Failed to fetch stories from Storyblok:", error);
    return [];
  }
}

export type { StoryblokStory, StoryblokOptions };

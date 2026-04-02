/**
 * Storyblok API + content helpers.
 */

import type { Metadata } from "next";

const STORYBLOK_API_TOKEN = process.env.STORYBLOK_API_TOKEN;
const STORYBLOK_PREVIEW_TOKEN = process.env.STORYBLOK_PREVIEW_TOKEN;
const STORYBLOK_VERSION = (process.env.NODE_ENV === "development" ? "draft" : "published") as "draft" | "published";

const BASE_URL = "https://api.storyblok.com/v2/cdn";

export interface StoryblokOptions {
  version?: "draft" | "published";
  slug?: string;
  starts_with?: string;
  per_page?: number;
  page?: number;
}

export interface StoryblokStory {
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

export interface StoryblokLinkObject {
  url?: string;
  cached_url?: string;
  story?: {
    full_slug?: string;
  };
  linktype?: string;
  target?: string;
  anchor?: string;
}

export interface StoryblokResolvedLink {
  href: string;
  target?: string;
}

export interface SiteConfigLink {
  label: string;
  href: string;
  description?: string;
  target?: string;
  children?: SiteConfigLink[];
}

export interface NavbarConfig {
  links: SiteConfigLink[];
  loginLabel: string;
  loginHref: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
}

export interface FooterConfig {
  email: string;
  columns: Array<{ title: string; links: SiteConfigLink[] }>;
  socialLinks: Array<{ label: string; href: string; target?: string }>;
  legalLinks: SiteConfigLink[];
  copyrightText: string;
}

/** Fetch a single story by slug from Storyblok. */
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

    /* full_slug paths like pages/home must be encoded in the CDN URL path */
    const pathSlug = encodeURIComponent(slug);
    const response = await fetch(`${BASE_URL}/stories/${pathSlug}?${params}`, {
      next: { revalidate: 60 },
    });

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

/** Fetch multiple stories from Storyblok. */
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
      return [];
    }

    const data: StoryblokResponse = await response.json();
    return data.stories || [];
  } catch (error) {
    console.error("Failed to fetch stories from Storyblok:", error);
    return [];
  }
}

export function getPageStoryCandidates(routeSlug: string): string[] {
  const normalized = routeSlug.replace(/^\/+|\/+$/g, "");
  const slug = normalized || "home";

  return Array.from(new Set([`pages/${slug}`, slug]));
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
    getStories({ starts_with: "blogs/", per_page: 100 }),
    getStories({ starts_with: "blog/", per_page: 100 }),
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

function valueAsString(value: unknown, fallback = ""): string {
  return typeof value === "string" && value.trim().length > 0 ? value : fallback;
}

function valueAsArray<T = Record<string, unknown>>(value: unknown): T[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value as T[];
}

export function resolveStoryblokLink(rawLink: unknown, fallback = "#"): StoryblokResolvedLink {
  if (typeof rawLink === "string") {
    return { href: rawLink || fallback };
  }

  if (!rawLink || typeof rawLink !== "object") {
    return { href: fallback };
  }

  const link = rawLink as StoryblokLinkObject;
  let href = link.url || link.cached_url || link.story?.full_slug || fallback;

  if (href && !href.startsWith("http") && !href.startsWith("/") && !href.startsWith("#")) {
    href = `/${href}`;
  }

  if (link.anchor) {
    href = `${href}#${link.anchor}`;
  }

  return {
    href,
    target: link.target,
  };
}

function parseNavLinks(value: unknown): SiteConfigLink[] {
  return valueAsArray<Record<string, unknown>>(value).map((item) => {
    const resolved = resolveStoryblokLink(item.link ?? item.href ?? "#", valueAsString(item.href, "#"));

    return {
      label: valueAsString(item.label, valueAsString(item.name, "Untitled")),
      href: resolved.href,
      target: resolved.target,
      description: valueAsString(item.description),
      children: parseNavLinks(item.children),
    };
  });
}

export function parseNavbarConfig(content: Record<string, unknown> | undefined): NavbarConfig | null {
  if (!content) {
    return null;
  }

  const links = parseNavLinks(content.navbar_links);

  if (!links.length) {
    return null;
  }

  const login = resolveStoryblokLink(content.navbar_login_link, "https://app.conalytic.com/login");
  const primary = resolveStoryblokLink(content.navbar_primary_cta_link, "https://app.conalytic.com/demo");

  return {
    links,
    loginLabel: valueAsString(content.navbar_login_label, "Login"),
    loginHref: login.href,
    primaryCtaLabel: valueAsString(content.navbar_primary_cta_label, "Book A Demo"),
    primaryCtaHref: primary.href,
  };
}

export function parseFooterConfig(content: Record<string, unknown> | undefined): FooterConfig | null {
  if (!content) {
    return null;
  }

  const columns = valueAsArray<Record<string, unknown>>(content.footer_columns).map((column) => ({
    title: valueAsString(column.title, "Links"),
    links: parseNavLinks(column.links),
  })).filter((column) => column.links.length > 0);

  const socialLinks = valueAsArray<Record<string, unknown>>(content.footer_social_links)
    .map((item) => {
      const resolved = resolveStoryblokLink(item.link ?? item.href ?? "#", valueAsString(item.href, "#"));
      return {
        label: valueAsString(item.label, "Social"),
        href: resolved.href,
        target: resolved.target,
      };
    })
    .filter((item) => item.href !== "#");

  const legalLinks = parseNavLinks(content.footer_legal_links);

  if (!columns.length && !socialLinks.length && !legalLinks.length) {
    return null;
  }

  return {
    email: valueAsString(content.footer_email, "info@conalytic.com"),
    columns,
    socialLinks,
    legalLinks,
    copyrightText: valueAsString(content.footer_copyright, "© 2025 Conalytic. All rights reserved."),
  };
}

export function getMetadataFromStory(story: StoryblokStory | null, fallback: Metadata): Metadata {
  if (!story) {
    return fallback;
  }

  const content = story.content as Record<string, unknown>;
  const title = valueAsString(content.seo_title, valueAsString(content.title, story.name));
  const description = valueAsString(content.seo_description, valueAsString(content.description, ""));

  if (!title && !description) {
    return fallback;
  }

  return {
    ...fallback,
    title: title || fallback.title,
    description: description || fallback.description,
  };
}

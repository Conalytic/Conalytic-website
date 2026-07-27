import { getRegistryEntryByPath } from "@/lib/cms/page-registry";
import { deepMerge } from "@/lib/cms/deep-merge";
import { readCmsJson } from "@/lib/cms/read-cms-file";
import type { CmsBlogOverlay, CmsPageOverlay } from "@/lib/cms/types";
import { getBlogPostBySlug, type StaticBlogPost } from "@/content/blog-posts";

export async function getPublishedPageOverlay(path: string): Promise<CmsPageOverlay | null> {
  const entry = getRegistryEntryByPath(path);
  if (!entry || entry.type === "chrome") return null;
  if (entry.type === "blog") {
    return readCmsJson<CmsBlogOverlay>(entry.contentFile);
  }
  return readCmsJson<CmsPageOverlay>(entry.contentFile);
}

export function mergePageSections<T extends Record<string, unknown>>(
  defaults: T,
  overlay?: CmsPageOverlay | null,
): T {
  if (!overlay?.sections) return defaults;
  return deepMerge(defaults as Record<string, unknown>, overlay.sections) as T;
}

export function mergeBlogPost(post: StaticBlogPost, overlay?: CmsBlogOverlay | null): StaticBlogPost {
  if (!overlay) return post;
  return {
    ...post,
    ...(overlay.title !== undefined ? { title: overlay.title } : {}),
    ...(overlay.category !== undefined ? { category: overlay.category } : {}),
    ...(overlay.readTime !== undefined ? { readTime: overlay.readTime } : {}),
    ...(overlay.dateLabel !== undefined ? { dateLabel: overlay.dateLabel } : {}),
    ...(overlay.datePublished !== undefined ? { datePublished: overlay.datePublished } : {}),
    ...(overlay.excerpt !== undefined ? { excerpt: overlay.excerpt } : {}),
    ...(overlay.description !== undefined ? { description: overlay.description } : {}),
    ...(overlay.featured !== undefined ? { featured: overlay.featured } : {}),
    ...(overlay.bodyMarkdown !== undefined ? { bodyMarkdown: overlay.bodyMarkdown } : {}),
  };
}

export async function getPublishedBlogPost(slug: string): Promise<StaticBlogPost | undefined> {
  const base = getBlogPostBySlug(slug);
  if (!base) return undefined;
  const overlay = await readCmsJson<CmsBlogOverlay>(`blogs/${slug}.json`);
  return mergeBlogPost(base, overlay);
}

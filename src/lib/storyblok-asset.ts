/**
 * Normalise Storyblok image `asset` objects for `next/image` and plain <img>.
 */
export type StoryblokAsset = {
  filename?: string;
  alt?: string;
  name?: string;
  title?: string;
  focus?: string;
};

export function storyblokImageSrc(asset: unknown): string | null {
  if (!asset || typeof asset !== "object") {
    return null;
  }
  const a = asset as StoryblokAsset;
  const f = a.filename;
  if (typeof f !== "string" || !f.trim()) {
    return null;
  }
  if (f.startsWith("http://") || f.startsWith("https://")) {
    return f;
  }
  if (f.startsWith("//")) {
    return `https:${f}`;
  }
  return f;
}

export function storyblokImageAlt(asset: unknown, fallback = ""): string {
  if (!asset || typeof asset !== "object") {
    return fallback;
  }
  const a = asset as StoryblokAsset;
  return (typeof a.alt === "string" && a.alt.trim()) ||
    (typeof a.title === "string" && a.title.trim()) ||
    (typeof a.name === "string" && a.name.trim()) ||
    fallback;
}

/**
 * Share-preview image from page/blog story content: **`seo_og_image`** if set, else **`cover_image`** (posts).
 */
export function storyblokOgImageSrc(content: Record<string, unknown> | undefined): string | null {
  if (!content) {
    return null;
  }
  const og = storyblokImageSrc(content.seo_og_image);
  if (og) {
    return og;
  }
  return storyblokImageSrc(content.cover_image);
}

/**
 * Shared page metadata helpers — self-referencing canonical URLs for every route.
 */
import type { Metadata } from "next";
import { allowSearchIndexing, SITE_ORIGIN } from "@/lib/seo-config";

const INDEX_ROBOTS: Metadata["robots"] = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};

const NO_INDEX_ROBOTS: Metadata["robots"] = {
  index: false,
  follow: false,
  googleBot: { index: false, follow: false },
};

const DEFAULT_OG_IMAGE = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "Conalytic — marketing analytics platform",
} as const;

export function canonicalUrl(path: string): string {
  if (!path || path === "/") return `${SITE_ORIGIN}/`;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_ORIGIN}${normalized}`;
}

function socialImages(alt?: string) {
  return [{ ...DEFAULT_OG_IMAGE, ...(alt ? { alt } : {}) }];
}

function resolveRobots(indexable?: boolean): Metadata["robots"] {
  const pageIndexable = indexable ?? true;
  return allowSearchIndexing() && pageIndexable ? INDEX_ROBOTS : NO_INDEX_ROBOTS;
}

export function buildPageMetadata(input: {
  path: string;
  title: string;
  description: string;
  keywords?: string[];
  /** Set false for thank-you, 404, and other non-indexable marketing routes. */
  indexable?: boolean;
}): Metadata {
  const url = canonicalUrl(input.path);
  const titleAbsolute = input.title.includes("| Conalytic")
    ? input.title
    : `${input.title} | Conalytic`;

  return {
    title: { absolute: titleAbsolute },
    description: input.description,
    ...(input.keywords?.length ? { keywords: input.keywords } : {}),
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: titleAbsolute,
      description: input.description,
      siteName: "Conalytic",
      locale: "en_US",
      images: socialImages(),
    },
    twitter: {
      card: "summary_large_image",
      title: titleAbsolute,
      description: input.description,
      images: [DEFAULT_OG_IMAGE.url],
    },
    robots: resolveRobots(input.indexable),
  };
}

export function buildBlogPostMetadata(input: {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  category: string;
  datePublished: string;
}): Metadata {
  const url = canonicalUrl(`/${input.slug}`);
  const titleAbsolute = `${input.title} | Conalytic Blog`;
  const description = input.description || input.excerpt;
  const keywords = [
    input.category,
    "Conalytic blog",
    "marketing analytics",
    "conversational analytics",
    "KPI tracker",
    "report builder",
    "GA4",
    "Google Ads",
  ];

  return {
    title: { absolute: titleAbsolute },
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: titleAbsolute,
      description,
      siteName: "Conalytic",
      locale: "en_US",
      publishedTime: input.datePublished,
      modifiedTime: input.datePublished,
      section: input.category,
      tags: [input.category],
      images: socialImages(input.title),
    },
    twitter: {
      card: "summary_large_image",
      title: titleAbsolute,
      description,
      images: [DEFAULT_OG_IMAGE.url],
    },
    robots: resolveRobots(),
  };
}

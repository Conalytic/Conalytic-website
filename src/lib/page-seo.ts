/**
 * Shared page metadata helpers — self-referencing canonical URLs for every route.
 */
import type { Metadata } from "next";
import { SITE_ORIGIN } from "@/lib/seo-config";

export function canonicalUrl(path: string): string {
  if (!path || path === "/") return `${SITE_ORIGIN}/`;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_ORIGIN}${normalized}`;
}

export function buildPageMetadata(input: {
  path: string;
  title: string;
  description: string;
  keywords?: string[];
  /** Set false for thank-you and other non-indexable pages that still need a canonical. */
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
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Conalytic — marketing analytics platform",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: titleAbsolute,
      description: input.description,
      images: ["/og-image.png"],
    },
    ...(input.indexable === false
      ? { robots: { index: false, follow: false } }
      : {}),
  };
}

/**
 * Per-product metadata helpers — absolute titles avoid duplicate "| Conalytic" from layout template.
 */
import type { Metadata } from "next";
import type { ProductDefinition, ProductId } from "@/lib/products";
import { getProduct } from "@/lib/products";
import { canonicalUrl } from "@/lib/page-seo";
import { allowSearchIndexing } from "@/lib/seo-config";

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

export function productCanonical(path: string): string {
  return canonicalUrl(path);
}

export function buildProductMetadata(product: ProductDefinition): Metadata {
  const url = productCanonical(product.path);
  return {
    title: { absolute: `${product.metaTitle} | Conalytic` },
    description: product.metaDescription,
    keywords: product.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: `${product.metaTitle} | Conalytic`,
      description: product.metaDescription,
      siteName: "Conalytic",
      locale: "en_US",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: `${product.name} — Conalytic`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.metaTitle} | Conalytic`,
      description: product.metaDescription,
      images: ["/og-image.png"],
    },
    robots: allowSearchIndexing() ? INDEX_ROBOTS : NO_INDEX_ROBOTS,
  };
}

export function buildProductMetadataById(id: ProductId): Metadata {
  return buildProductMetadata(getProduct(id));
}

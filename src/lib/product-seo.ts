/**
 * Per-product metadata helpers — absolute titles avoid duplicate "| Conalytic" from layout template.
 */
import type { Metadata } from "next";
import type { ProductDefinition, ProductId } from "@/lib/products";
import { getProduct } from "@/lib/products";
import { canonicalUrl } from "@/lib/page-seo";

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
  };
}

export function buildProductMetadataById(id: ProductId): Metadata {
  return buildProductMetadata(getProduct(id));
}

/** Product: KPIs Tracker marketing route. */
import type { Metadata } from "next";
import { ProductStructuredData } from "@/components/seo/ProductStructuredData";
import { KpisTrackerClient } from "@/components/pages/KpisTrackerClient";
import { KPIS_TRACKER_FAQ } from "@/lib/marketing-faqs";
import { buildRouteMetadata } from "@/lib/site-metadata";
import { getProduct } from "@/lib/products";

const product = getProduct("kpis-tracker");

export function generateMetadata(): Metadata {
  return buildRouteMetadata(product.path, {
    title: product.metaTitle,
    description: product.metaDescription,
    keywords: product.keywords,
  });
}

export default function KpisTrackerPage() {
  return (
    <>
      <ProductStructuredData productId="kpis-tracker" faqItems={KPIS_TRACKER_FAQ} />
      <KpisTrackerClient />
    </>
  );
}

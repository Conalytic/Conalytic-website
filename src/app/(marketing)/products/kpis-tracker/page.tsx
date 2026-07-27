/** Product: KPIs Tracker marketing route. */
import type { Metadata } from "next";
import { ProductStructuredData } from "@/components/seo/ProductStructuredData";
import { KpisTrackerClient } from "@/components/pages/KpisTrackerClient";
import { KPIS_TRACKER_FAQ } from "@/lib/marketing-faqs";
import { getPublishedPageOverlay } from "@/lib/cms/get-page-content";
import { buildPageMetadataFromCms } from "@/lib/cms/seo";
import { getProduct } from "@/lib/products";

const product = getProduct("kpis-tracker");

export async function generateMetadata(): Promise<Metadata> {
  const overlay = await getPublishedPageOverlay(product.path);
  return buildPageMetadataFromCms(
    product.path,
    {
      title: product.metaTitle,
      description: product.metaDescription,
      keywords: product.keywords,
    },
    overlay?.seo,
  );
}

export default function KpisTrackerPage() {
  return (
    <>
      <ProductStructuredData productId="kpis-tracker" faqItems={KPIS_TRACKER_FAQ} />
      <KpisTrackerClient />
    </>
  );
}

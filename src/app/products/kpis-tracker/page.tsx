/** Product: KPIs Tracker marketing route. */
import type { Metadata } from "next";
import { ProductStructuredData } from "@/components/seo/ProductStructuredData";
import { KpisTrackerClient } from "@/components/pages/KpisTrackerClient";
import { buildProductMetadataById } from "@/lib/product-seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildProductMetadataById("kpis-tracker");
}

export default function KpisTrackerPage() {
  return (
    <>
      <ProductStructuredData productId="kpis-tracker" />
      <KpisTrackerClient />
    </>
  );
}

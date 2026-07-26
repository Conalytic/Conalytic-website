/** Product: Conversational Analytics deep-dive + pricing reuse. */
import type { Metadata } from "next";
import { ProductStructuredData } from "@/components/seo/ProductStructuredData";
import { ConversationalAnalyticsClient } from "@/components/products/ConversationalAnalyticsClient";
import { buildProductMetadataById } from "@/lib/product-seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildProductMetadataById("conversational-analytics");
}

export default function ConversationalAnalyticsPage() {
  return (
    <>
      <ProductStructuredData productId="conversational-analytics" />
      <ConversationalAnalyticsClient />
    </>
  );
}

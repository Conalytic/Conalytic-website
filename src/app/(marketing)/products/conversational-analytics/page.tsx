/** Product: Conversational Analytics deep-dive + pricing reuse. */
import type { Metadata } from "next";
import { ProductStructuredData } from "@/components/seo/ProductStructuredData";
import { ConversationalAnalyticsClient } from "@/components/products/ConversationalAnalyticsClient";
import { CONVERSATIONAL_ANALYTICS_FAQ } from "@/lib/marketing-faqs";
import { buildRouteMetadata } from "@/lib/site-metadata";
import { getProduct } from "@/lib/products";

const product = getProduct("conversational-analytics");

export function generateMetadata(): Metadata {
  return buildRouteMetadata(product.path, {
    title: product.metaTitle,
    description: product.metaDescription,
    keywords: product.keywords,
  });
}

export default function ConversationalAnalyticsPage() {
  return (
    <>
      <ProductStructuredData productId="conversational-analytics" faqItems={CONVERSATIONAL_ANALYTICS_FAQ} />
      <ConversationalAnalyticsClient />
    </>
  );
}

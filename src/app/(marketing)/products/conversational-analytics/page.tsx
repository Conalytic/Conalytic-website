/** Product: Conversational Analytics deep-dive + pricing reuse. */
import type { Metadata } from "next";
import { ProductStructuredData } from "@/components/seo/ProductStructuredData";
import {
  ConversationalAnalyticsClient,
  type ConversationalAnalyticsContentPreset,
} from "@/components/products/ConversationalAnalyticsClient";
import { CONVERSATIONAL_ANALYTICS_FAQ } from "@/lib/marketing-faqs";
import { getPublishedPageOverlay } from "@/lib/cms/get-page-content";
import { buildPageMetadataFromCms } from "@/lib/cms/seo";
import { getProduct } from "@/lib/products";

const product = getProduct("conversational-analytics");

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

export default async function ConversationalAnalyticsPage() {
  const overlay = await getPublishedPageOverlay(product.path);
  const content = overlay?.sections as ConversationalAnalyticsContentPreset | undefined;

  return (
    <>
      <ProductStructuredData productId="conversational-analytics" faqItems={CONVERSATIONAL_ANALYTICS_FAQ} />
      <ConversationalAnalyticsClient content={content} />
    </>
  );
}

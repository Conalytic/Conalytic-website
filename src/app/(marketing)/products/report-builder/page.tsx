/** Product: Report Builder marketing route. */
import type { Metadata } from "next";
import { ProductStructuredData } from "@/components/seo/ProductStructuredData";
import { ReportBuilderClient, type ReportBuilderContentPreset } from "@/components/pages/ReportBuilderClient";
import { REPORT_BUILDER_FAQ } from "@/lib/marketing-faqs";
import { getPublishedPageOverlay } from "@/lib/cms/get-page-content";
import { buildPageMetadataFromCms } from "@/lib/cms/seo";
import { getProduct } from "@/lib/products";

const product = getProduct("report-builder");

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

export default async function ReportBuilderPage() {
  const overlay = await getPublishedPageOverlay(product.path);
  const content = overlay?.sections as ReportBuilderContentPreset | undefined;

  return (
    <>
      <ProductStructuredData productId="report-builder" faqItems={REPORT_BUILDER_FAQ} />
      <ReportBuilderClient content={content} />
    </>
  );
}

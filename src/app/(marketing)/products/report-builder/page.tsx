/** Product: Report Builder marketing route. */
import type { Metadata } from "next";
import { ProductStructuredData } from "@/components/seo/ProductStructuredData";
import { ReportBuilderClient } from "@/components/pages/ReportBuilderClient";
import { REPORT_BUILDER_FAQ } from "@/lib/marketing-faqs";
import { buildRouteMetadata } from "@/lib/site-metadata";
import { getProduct } from "@/lib/products";

const product = getProduct("report-builder");

export function generateMetadata(): Metadata {
  return buildRouteMetadata(product.path, {
    title: product.metaTitle,
    description: product.metaDescription,
    keywords: product.keywords,
  });
}

export default function ReportBuilderPage() {
  return (
    <>
      <ProductStructuredData productId="report-builder" faqItems={REPORT_BUILDER_FAQ} />
      <ReportBuilderClient />
    </>
  );
}

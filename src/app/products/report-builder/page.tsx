/** Product: Report Builder marketing route. */
import type { Metadata } from "next";
import { ProductStructuredData } from "@/components/seo/ProductStructuredData";
import { ReportBuilderClient } from "@/components/pages/ReportBuilderClient";
import { REPORT_BUILDER_FAQ } from "@/lib/marketing-faqs";
import { buildProductMetadataById } from "@/lib/product-seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildProductMetadataById("report-builder");
}

export default function ReportBuilderPage() {
  return (
    <>
      <ProductStructuredData productId="report-builder" faqItems={REPORT_BUILDER_FAQ} />
      <ReportBuilderClient />
    </>
  );
}

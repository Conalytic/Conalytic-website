/** Product: Report Builder marketing route. */
import type { Metadata } from "next";
import { ProductStructuredData } from "@/components/seo/ProductStructuredData";
import { ReportBuilderClient } from "@/components/pages/ReportBuilderClient";
import { buildProductMetadataById } from "@/lib/product-seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildProductMetadataById("report-builder");
}

export default function ReportBuilderPage() {
  return (
    <>
      <ProductStructuredData productId="report-builder" />
      <ReportBuilderClient />
    </>
  );
}

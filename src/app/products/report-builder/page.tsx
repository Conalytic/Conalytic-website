/** Product: Report Builder marketing route. */
import type { Metadata } from "next";
import { ReportBuilderClient } from "@/components/pages/ReportBuilderClient";
import { SITE_ORIGIN } from "@/lib/seo-config";

const fallbackMetadata: Metadata = {
  title: "Report Builder – Conalytic",
  description:
    "Transform your marketing reports from static data dumps into intelligent, branded presentations. Create stunning white-label reports with AI-generated insights in minutes.",
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    ...fallbackMetadata,
    alternates: { canonical: `${SITE_ORIGIN}/products/report-builder` },
  };
}

export default function ReportBuilderPage() {
  return <ReportBuilderClient />;
}

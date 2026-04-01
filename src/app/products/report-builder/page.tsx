import type { Metadata } from "next";
import { ReportBuilderClient } from "@/components/pages/ReportBuilderClient";

export const metadata: Metadata = {
  title: "Report Builder – Conalytic",
  description:
    "Transform your marketing reports from static data dumps into intelligent, branded presentations. Create stunning white-label reports with AI-generated insights in minutes.",
};

export default function ReportBuilderPage() {
  return <ReportBuilderClient />;
}

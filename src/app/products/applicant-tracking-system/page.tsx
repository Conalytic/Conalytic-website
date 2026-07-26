/** Product: Applicant Tracking System marketing route (legacy — not in main product suite). */
import type { Metadata } from "next";
import { ATSClient } from "@/components/pages/ATSClient";
import { buildPageMetadata } from "@/lib/page-seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: "/products/applicant-tracking-system",
    title: "Applicant Tracking System – Conalytic",
    description:
      "Legacy Conalytic ATS page. Conalytic's current marketing analytics platform focuses on Conversational Analytics, KPIs Tracker, and Report Builder.",
    indexable: false,
  });
}

export default function ATSPage() {
  return <ATSClient />;
}

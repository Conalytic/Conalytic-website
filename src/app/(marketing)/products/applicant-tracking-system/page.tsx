/** Product: Applicant Tracking System marketing route (legacy — not in main product suite). */
import type { Metadata } from "next";
import { ATSClient } from "@/components/pages/ATSClient";
import { buildRouteMetadata } from "@/lib/site-metadata";

const PATH = "/products/applicant-tracking-system";
const PAGE_TITLE = "Applicant Tracking System – Conalytic";
const PAGE_DESCRIPTION =
  "Legacy Conalytic ATS page. Conalytic's current marketing analytics platform focuses on Conversational Analytics, KPIs Tracker, and Report Builder.";

export function generateMetadata(): Metadata {
  return buildRouteMetadata(PATH, {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    indexable: false,
  });
}

export default function ATSPage() {
  return <ATSClient />;
}

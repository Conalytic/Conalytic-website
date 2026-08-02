/** Product: Applicant Tracking System marketing route (legacy — not in main product suite). */
import type { Metadata } from "next";
import { ATSClient, type ATSContentPreset } from "@/components/pages/ATSClient";
import { getPublishedPageOverlay } from "@/lib/cms/get-page-content";
import { buildRouteMetadata } from "@/lib/cms/page-metadata";

const PATH = "/products/applicant-tracking-system";
const PAGE_TITLE = "Applicant Tracking System – Conalytic";
const PAGE_DESCRIPTION =
  "Legacy Conalytic ATS page. Conalytic's current marketing analytics platform focuses on Conversational Analytics, KPIs Tracker, and Report Builder.";

export async function generateMetadata(): Promise<Metadata> {
  return buildRouteMetadata(PATH, {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  });
}

export default async function ATSPage() {
  const overlay = await getPublishedPageOverlay(PATH);
  const content = overlay?.sections as ATSContentPreset | undefined;

  return <ATSClient content={content} />;
}

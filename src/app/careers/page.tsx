/** Careers route (resume upload API via `CareersClient`). */
import type { Metadata } from "next";
import { CareersClient } from "@/components/pages/CareersClient";
import { MarketingPageStructuredData } from "@/components/seo/MarketingPageStructuredData";
import { buildPageMetadata } from "@/lib/page-seo";

const PAGE_TITLE = "Careers at Conalytic – Join Our Analytics Team";
const PAGE_DESCRIPTION =
  "Join Conalytic and build the future of marketing analytics—Conversational Analytics, KPIs Tracker, and Report Builder for GA4, Google Ads, and Search Console teams. Explore open roles in Pune and remote.";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: "/careers",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    keywords: ["Conalytic careers", "marketing analytics jobs", "SaaS jobs India", "AI analytics careers"],
  });
}

export default function CareersPage() {
  return (
    <>
      <MarketingPageStructuredData path="/careers" pageTitle={PAGE_TITLE} pageDescription={PAGE_DESCRIPTION} />
      <CareersClient />
    </>
  );
}

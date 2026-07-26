/** About Us route. */
import type { Metadata } from "next";
import { AboutClient } from "@/components/pages/AboutClient";
import { MarketingPageStructuredData } from "@/components/seo/MarketingPageStructuredData";
import { buildPageMetadata } from "@/lib/page-seo";

const PAGE_TITLE = "About Conalytic – AI Marketing Analytics Platform";
const PAGE_DESCRIPTION =
  "Conalytic builds Conversational Analytics, KPIs Tracker, and Report Builder for marketing teams. Learn how we help agencies and in-house marketers chat with GA4, Google Ads, and Search Console data, track KPI goals, and automate HTML client reports.";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: "/about-us",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    keywords: ["about Conalytic", "marketing analytics company", "AI analytics SaaS", "Pune marketing tech"],
  });
}

export default function AboutPage() {
  return (
    <>
      <MarketingPageStructuredData path="/about-us" pageTitle={PAGE_TITLE} pageDescription={PAGE_DESCRIPTION} />
      <AboutClient />
    </>
  );
}

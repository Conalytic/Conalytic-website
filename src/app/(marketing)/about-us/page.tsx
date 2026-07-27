/** About Us route. */
import type { Metadata } from "next";
import { AboutClient, type AboutContentPreset } from "@/components/pages/AboutClient";
import { MarketingPageStructuredData } from "@/components/seo/MarketingPageStructuredData";
import { buildRouteMetadata } from "@/lib/cms/page-metadata";
import { getPublishedPageOverlay } from "@/lib/cms/get-page-content";

const PAGE_TITLE = "About Conalytic – AI Marketing Analytics Platform";
const PAGE_DESCRIPTION =
  "Conalytic builds Conversational Analytics, KPIs Tracker, and Report Builder for marketing teams. Learn how we help agencies and in-house marketers chat with GA4, Google Ads, and Search Console data, track KPI goals, and automate HTML client reports.";

export async function generateMetadata(): Promise<Metadata> {
  return buildRouteMetadata("/about-us", {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    keywords: ["about Conalytic", "marketing analytics company", "AI analytics SaaS", "Pune marketing tech"],
  });
}

export default async function AboutPage() {
  const overlay = await getPublishedPageOverlay("/about-us");
  const content = overlay?.sections as AboutContentPreset | undefined;

  return (
    <>
      <MarketingPageStructuredData
        path="/about-us"
        pageTitle={overlay?.seo?.title ?? PAGE_TITLE}
        pageDescription={overlay?.seo?.description ?? PAGE_DESCRIPTION}
      />
      <AboutClient content={content} />
    </>
  );
}

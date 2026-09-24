/** About Us route. */
import type { Metadata } from "next";
import { AboutClient } from "@/components/pages/AboutClient";
import { MarketingPageStructuredData } from "@/components/seo/MarketingPageStructuredData";
import { buildRouteMetadata } from "@/lib/site-metadata";
import { SITE_PATHS } from "@/lib/site-paths";

const PAGE_TITLE = "About Conalytic – AI Marketing Analytics Platform";
const PAGE_DESCRIPTION =
  "Conalytic builds Conversational Analytics, KPIs Tracker, and Report Builder for marketing teams. Learn how we help agencies and in-house marketers chat with GA4, Google Ads, and Search Console data, track KPI goals, and automate HTML client reports.";

export function generateMetadata(): Metadata {
  return buildRouteMetadata(SITE_PATHS.company.about, {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    keywords: ["about Conalytic", "marketing analytics company", "AI analytics SaaS", "Pune marketing tech"],
  });
}

export default function AboutPage() {
  return (
    <>
      <MarketingPageStructuredData
        path={SITE_PATHS.company.about}
        pageTitle={PAGE_TITLE}
        pageDescription={PAGE_DESCRIPTION}
      />
      <AboutClient />
    </>
  );
}

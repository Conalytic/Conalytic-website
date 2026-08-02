/** Careers route (resume upload API via `CareersClient`). */
import type { Metadata } from "next";
import { CareersClient, type CareersContentPreset } from "@/components/pages/CareersClient";
import { MarketingPageStructuredData } from "@/components/seo/MarketingPageStructuredData";
import { buildRouteMetadata } from "@/lib/cms/page-metadata";
import { SITE_PATHS } from "@/lib/site-paths";
import { getPublishedPageOverlay } from "@/lib/cms/get-page-content";

const PAGE_TITLE = "Careers at Conalytic – Join Our Analytics Team";
const PAGE_DESCRIPTION =
  "Join Conalytic and build the future of marketing analytics—Conversational Analytics, KPIs Tracker, and Report Builder for GA4, Google Ads, and Search Console teams. Explore open roles in Pune and remote.";

export async function generateMetadata(): Promise<Metadata> {
  return buildRouteMetadata(SITE_PATHS.resources.careers, {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    keywords: ["Conalytic careers", "marketing analytics jobs", "SaaS jobs India", "AI analytics careers"],
  });
}

export default async function CareersPage() {
  const overlay = await getPublishedPageOverlay(SITE_PATHS.resources.careers);
  const content = overlay?.sections as CareersContentPreset | undefined;

  return (
    <>
      <MarketingPageStructuredData
        path={SITE_PATHS.resources.careers}
        pageTitle={overlay?.seo?.title ?? PAGE_TITLE}
        pageDescription={overlay?.seo?.description ?? PAGE_DESCRIPTION}
      />
      <CareersClient content={content} />
    </>
  );
}

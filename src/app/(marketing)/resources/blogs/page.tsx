/** Blog listing `/resources/blogs`. */
import type { Metadata } from "next";
import { Suspense } from "react";
import { BlogsClient, type BlogsContentPreset } from "@/components/pages/BlogsClient";
import { BlogListingStructuredData } from "@/components/seo/BlogListingStructuredData";
import { BreadcrumbStructuredData } from "@/components/seo/BreadcrumbStructuredData";
import { MarketingPageStructuredData } from "@/components/seo/MarketingPageStructuredData";
import { buildRouteMetadata } from "@/lib/cms/page-metadata";
import { getPublishedPageOverlay } from "@/lib/cms/get-page-content";
import { SITE_PATHS } from "@/lib/site-paths";

const PAGE_TITLE = "Conalytic Blog – GA4, Reporting & KPI Guides for Marketers";
const PAGE_DESCRIPTION =
  "SEO guides for marketing analytics: GA4 traffic drop diagnosis, Google Ads vs GA4 conversions, AI traffic tracking, client report structure, cross-channel reporting, KPI targets, rules-based status tracking, and natural language analytics.";
const PAGE_KEYWORDS = [
  "ga4 traffic drop",
  "google ads ga4 discrepancy",
  "chat with ga4",
  "ai traffic ga4",
  "html marketing report",
  "ai marketing reports",
  "marketing report structure",
  "cross channel reporting",
  "marketing kpi targets",
  "kpi status tracking",
  "natural language analytics",
  "agency reporting",
];

export async function generateMetadata(): Promise<Metadata> {
  return buildRouteMetadata(SITE_PATHS.resources.blogs, {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    keywords: PAGE_KEYWORDS,
  });
}

export default async function BlogsPage() {
  const overlay = await getPublishedPageOverlay(SITE_PATHS.resources.blogs);
  const content = overlay?.sections as BlogsContentPreset | undefined;

  return (
    <>
      <BreadcrumbStructuredData
        id="ld-blogs-breadcrumbs"
        items={[
          { name: "Home", path: "/" },
          { name: "Blog", path: SITE_PATHS.resources.blogs },
        ]}
      />
      <MarketingPageStructuredData
        path={SITE_PATHS.resources.blogs}
        pageTitle={overlay?.seo?.title ?? PAGE_TITLE}
        pageDescription={overlay?.seo?.description ?? PAGE_DESCRIPTION}
      />
      <BlogListingStructuredData />
      <Suspense fallback={null}>
        <BlogsClient content={content} />
      </Suspense>
    </>
  );
}

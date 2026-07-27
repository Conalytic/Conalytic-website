/** Blog listing `/blogs`. */
import type { Metadata } from "next";
import { BlogsClient, type BlogsContentPreset } from "@/components/pages/BlogsClient";
import { BlogListingStructuredData } from "@/components/seo/BlogListingStructuredData";
import { BreadcrumbStructuredData } from "@/components/seo/BreadcrumbStructuredData";
import { MarketingPageStructuredData } from "@/components/seo/MarketingPageStructuredData";
import { buildRouteMetadata } from "@/lib/cms/page-metadata";
import { getPublishedPageOverlay } from "@/lib/cms/get-page-content";

const PAGE_TITLE = "Conalytic Blog – Product Guides for Chats, KPIs & Reports";
const PAGE_DESCRIPTION =
  "In-depth guides to Conalytic Conversational Analytics (Chats), KPIs Tracker, and Report Builder—connect GA4, Search Console, Google Ads, GTM, and Meta; ask questions, track goals, and ship HTML client decks.";

export async function generateMetadata(): Promise<Metadata> {
  return buildRouteMetadata("/blogs", {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    keywords: ["marketing analytics blog", "GA4 tips", "Google Ads insights", "conversational analytics", "agency reporting"],
  });
}

export default async function BlogsPage() {
  const overlay = await getPublishedPageOverlay("/blogs");
  const content = overlay?.sections as BlogsContentPreset | undefined;

  return (
    <>
      <BreadcrumbStructuredData
        id="ld-blogs-breadcrumbs"
        items={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blogs" },
        ]}
      />
      <MarketingPageStructuredData
        path="/blogs"
        pageTitle={overlay?.seo?.title ?? PAGE_TITLE}
        pageDescription={overlay?.seo?.description ?? PAGE_DESCRIPTION}
      />
      <BlogListingStructuredData />
      <BlogsClient content={content} />
    </>
  );
}

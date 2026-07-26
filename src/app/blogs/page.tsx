/** Blog listing `/blogs`. */
import type { Metadata } from "next";
import { BlogsClient } from "@/components/pages/BlogsClient";
import { MarketingPageStructuredData } from "@/components/seo/MarketingPageStructuredData";
import { buildPageMetadata } from "@/lib/page-seo";

const PAGE_TITLE = "Conalytic Blog – Product Guides for Chats, KPIs & Reports";
const PAGE_DESCRIPTION =
  "In-depth guides to Conalytic Conversational Analytics (Chats), KPIs Tracker, and Report Builder—connect GA4, Search Console, Google Ads, GTM, and Meta; ask questions, track goals, and ship HTML client decks.";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: "/blogs",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    keywords: ["marketing analytics blog", "GA4 tips", "Google Ads insights", "conversational analytics", "agency reporting"],
  });
}

export default function BlogsPage() {
  return (
    <>
      <MarketingPageStructuredData path="/blogs" pageTitle={PAGE_TITLE} pageDescription={PAGE_DESCRIPTION} />
      <BlogsClient />
    </>
  );
}

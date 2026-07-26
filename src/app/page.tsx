/**
 * Home route (/): static marketing page with WebPage + FAQPage JSON-LD.
 */
import type { Metadata } from "next";
import { HomeClient } from "@/components/home/HomeClient";
import { HomeStructuredData } from "@/components/seo/HomeStructuredData";
import { DEFAULT_HOME_FAQ } from "@/lib/default-home-faq";
import { buildPageMetadata } from "@/lib/page-seo";

const PAGE_TITLE = "Conalytic – Marketing Analytics: Chat, KPIs & Reports";
const PAGE_DESCRIPTION =
  "Conalytic is AI marketing analytics software with Conversational Analytics (GA4 & Google Ads chat), KPIs Tracker (goal monitoring), and Report Builder (HTML client reports). Connect Search Console, GTM, and Meta Ads. Free to start.";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: "/",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    keywords: [
      "marketing analytics platform",
      "conversational analytics",
      "KPI tracker",
      "marketing report builder",
      "GA4 analytics",
      "Google Ads reporting",
      "AI marketing insights",
    ],
  });
}

export default function HomePage() {
  const homeLdTitle = "Marketing analytics with Chat, KPIs and Reports";
  const homeLdDescription = PAGE_DESCRIPTION;

  return (
    <>
      <HomeStructuredData faqItems={[...DEFAULT_HOME_FAQ]} pageTitle={homeLdTitle} pageDescription={homeLdDescription} />
      <HomeClient />
    </>
  );
}

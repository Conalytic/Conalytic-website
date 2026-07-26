/** Contact route. */
import type { Metadata } from "next";
import { ContactClient } from "@/components/pages/ContactClient";
import { MarketingPageStructuredData } from "@/components/seo/MarketingPageStructuredData";
import { buildPageMetadata } from "@/lib/page-seo";

const PAGE_TITLE = "Contact Conalytic – Book a Demo";
const PAGE_DESCRIPTION =
  "Contact Conalytic for demos, enterprise pricing, and support. Schedule a call to see Conversational Analytics, KPIs Tracker, and Report Builder for GA4, Google Ads, Search Console, GTM, and Meta marketing analytics.";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: "/contact",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    keywords: ["contact Conalytic", "book demo", "marketing analytics support", "enterprise pricing"],
  });
}

export default function ContactPage() {
  return (
    <>
      <MarketingPageStructuredData path="/contact" pageTitle={PAGE_TITLE} pageDescription={PAGE_DESCRIPTION} />
      <ContactClient />
    </>
  );
}

/** Contact route. */
import type { Metadata } from "next";
import { ContactClient, type ContactContentPreset } from "@/components/pages/ContactClient";
import { MarketingPageStructuredData } from "@/components/seo/MarketingPageStructuredData";
import { buildRouteMetadata } from "@/lib/cms/page-metadata";
import { SITE_PATHS } from "@/lib/site-paths";
import { getPublishedPageOverlay } from "@/lib/cms/get-page-content";

const PAGE_TITLE = "Contact Conalytic – Book a Demo";
const PAGE_DESCRIPTION =
  "Contact Conalytic for demos, enterprise pricing, and support. Schedule a call to see Conversational Analytics, KPIs Tracker, and Report Builder for GA4, Google Ads, Search Console, GTM, and Meta marketing analytics.";

export async function generateMetadata(): Promise<Metadata> {
  return buildRouteMetadata(SITE_PATHS.company.contact, {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    keywords: ["contact Conalytic", "book demo", "marketing analytics support", "enterprise pricing"],
  });
}

export default async function ContactPage() {
  const overlay = await getPublishedPageOverlay(SITE_PATHS.company.contact);
  const content = overlay?.sections as ContactContentPreset | undefined;

  return (
    <>
      <MarketingPageStructuredData
        path={SITE_PATHS.company.contact}
        pageTitle={overlay?.seo?.title ?? PAGE_TITLE}
        pageDescription={overlay?.seo?.description ?? PAGE_DESCRIPTION}
      />
      <ContactClient content={content} />
    </>
  );
}

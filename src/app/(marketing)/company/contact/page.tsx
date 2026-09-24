/** Contact route. */
import type { Metadata } from "next";
import { ContactClient } from "@/components/pages/ContactClient";
import { MarketingPageStructuredData } from "@/components/seo/MarketingPageStructuredData";
import { buildRouteMetadata } from "@/lib/site-metadata";
import { SITE_PATHS } from "@/lib/site-paths";

const PAGE_TITLE = "Contact Conalytic – Book a Demo or Get Support";
const PAGE_DESCRIPTION =
  "Contact Conalytic for product demos, support, and partnership inquiries. Book a call to see Conversational Analytics, KPIs Tracker, and Report Builder on your marketing data.";

export function generateMetadata(): Metadata {
  return buildRouteMetadata(SITE_PATHS.company.contact, {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  });
}

export default function ContactPage() {
  return (
    <>
      <MarketingPageStructuredData path={SITE_PATHS.company.contact} pageTitle={PAGE_TITLE} pageDescription={PAGE_DESCRIPTION} />
      <ContactClient />
    </>
  );
}

/** Integrations directory route. */
import type { Metadata } from "next";
import { IntegrationsPageClient } from "@/components/pages/IntegrationsPageClient";
import { BreadcrumbStructuredData } from "@/components/seo/BreadcrumbStructuredData";
import { MarketingPageStructuredData } from "@/components/seo/MarketingPageStructuredData";
import { INTEGRATIONS_PAGE_FAQ } from "@/lib/marketing-faqs";
import { buildPageMetadata } from "@/lib/page-seo";

const PAGE_TITLE = "Integrations – GA4, Google Ads, GSC, GTM & Meta";
const PAGE_DESCRIPTION =
  "Connect Conalytic to Google Analytics 4, Google Search Console, Google Ads, Google Tag Manager, Meta Ads, and LinkedIn Ads via read-only OAuth. Power Conversational Analytics chat, KPI Tracker goals, and HTML marketing report decks.";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: "/integrations",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    keywords: [
      "GA4 integration",
      "Google Ads integration",
      "Search Console integration",
      "GTM integration",
      "Meta Ads integration",
      "marketing data connections",
    ],
  });
}

export default function IntegrationsPage() {
  return (
    <>
      <BreadcrumbStructuredData
        id="ld-integrations-breadcrumbs"
        items={[
          { name: "Home", path: "/" },
          { name: "Integrations", path: "/integrations" },
        ]}
      />
      <MarketingPageStructuredData
        path="/integrations"
        pageTitle={PAGE_TITLE}
        pageDescription={PAGE_DESCRIPTION}
        faqItems={INTEGRATIONS_PAGE_FAQ}
      />
      <IntegrationsPageClient />
    </>
  );
}

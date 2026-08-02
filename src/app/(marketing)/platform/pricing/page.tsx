/** Pricing marketing route. */
import type { Metadata } from "next";
import { PricingClient } from "@/components/pages/PricingClient";
import { BreadcrumbStructuredData } from "@/components/seo/BreadcrumbStructuredData";
import { MarketingPageStructuredData } from "@/components/seo/MarketingPageStructuredData";
import { buildRouteMetadata } from "@/lib/cms/page-metadata";
import { SITE_PATHS } from "@/lib/site-paths";
import { PRICING_PAGE_FAQ } from "@/lib/marketing-faqs";

const PAGE_TITLE = "Pricing – Conalytic Pro & Enterprise";
const PAGE_DESCRIPTION =
  "Start free with 325,203 signup tokens. Usage-based AI pricing for Conversational Analytics and Report Builder insights. Top up tokens in-app anytime. KPIs Tracker included without LLM metering.";

export async function generateMetadata(): Promise<Metadata> {
  return buildRouteMetadata(SITE_PATHS.platform.pricing, {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    keywords: [
      "Conalytic pricing",
      "marketing analytics pricing",
      "free signup tokens",
      "usage-based AI pricing",
      "token top-up",
    ],
  });
}

export default function PricingPage() {
  return (
    <>
      <BreadcrumbStructuredData
        id="ld-pricing-breadcrumbs"
        items={[
          { name: "Home", path: "/" },
          { name: "Pricing", path: SITE_PATHS.platform.pricing },
        ]}
      />
      <MarketingPageStructuredData
        path={SITE_PATHS.platform.pricing}
        pageTitle={PAGE_TITLE}
        pageDescription={PAGE_DESCRIPTION}
        faqItems={PRICING_PAGE_FAQ}
      />
      <PricingClient />
    </>
  );
}

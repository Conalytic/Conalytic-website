/** Features marketing route. */
import type { Metadata } from "next";
import { FeaturesClient } from "@/components/pages/FeaturesClient";
import { BreadcrumbStructuredData } from "@/components/seo/BreadcrumbStructuredData";
import { MarketingPageStructuredData } from "@/components/seo/MarketingPageStructuredData";
import { FEATURES_PAGE_FAQ } from "@/lib/marketing-faqs";
import { buildRouteMetadata } from "@/lib/site-metadata";
import { SITE_PATHS } from "@/lib/site-paths";

const PAGE_TITLE = "Features – Conversational Analytics, KPI Tracker & Report Builder";
const PAGE_DESCRIPTION =
  "Explore Conalytic features: AI marketing chat for GA4, Google Ads, Search Console, GTM, and Meta; KPI goal tracking dashboard; automated HTML client report decks. Natural-language analytics and OAuth integrations.";

export function generateMetadata(): Metadata {
  return buildRouteMetadata(SITE_PATHS.platform.features, {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    keywords: [
      "marketing analytics features",
      "conversational analytics features",
      "KPI tracking software",
      "automated marketing reports",
      "GA4 integration",
      "Google Ads analytics",
    ],
  });
}

export default function FeaturesPage() {
  return (
    <>
      <BreadcrumbStructuredData
        id="ld-features-breadcrumbs"
        items={[
          { name: "Home", path: "/" },
          { name: "Features", path: SITE_PATHS.platform.features },
        ]}
      />
      <MarketingPageStructuredData
        path={SITE_PATHS.platform.features}
        pageTitle={PAGE_TITLE}
        pageDescription={PAGE_DESCRIPTION}
        faqItems={FEATURES_PAGE_FAQ}
      />
      <FeaturesClient />
    </>
  );
}

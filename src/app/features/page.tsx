/** Features marketing route. */
import type { Metadata } from "next";
import { FeaturesClient } from "@/components/pages/FeaturesClient";
import { BreadcrumbStructuredData } from "@/components/seo/BreadcrumbStructuredData";
import { MarketingPageStructuredData } from "@/components/seo/MarketingPageStructuredData";
import { FEATURES_PAGE_FAQ } from "@/lib/marketing-faqs";
import { buildPageMetadata } from "@/lib/page-seo";

const PAGE_TITLE = "Features – Conversational Analytics, KPI Tracker & Report Builder";
const PAGE_DESCRIPTION =
  "Explore Conalytic features: AI marketing chat for GA4, Google Ads, Search Console, GTM, and Meta; KPI goal tracking dashboard; automated HTML client report decks. Natural-language analytics and OAuth integrations.";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: "/features",
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
          { name: "Features", path: "/features" },
        ]}
      />
      <MarketingPageStructuredData
        path="/features"
        pageTitle={PAGE_TITLE}
        pageDescription={PAGE_DESCRIPTION}
        faqItems={FEATURES_PAGE_FAQ}
      />
      <FeaturesClient />
    </>
  );
}

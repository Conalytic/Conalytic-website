/** Features marketing route. */
import type { Metadata } from "next";
import { FeaturesClient, type FeaturesContentPreset } from "@/components/pages/FeaturesClient";
import { BreadcrumbStructuredData } from "@/components/seo/BreadcrumbStructuredData";
import { MarketingPageStructuredData } from "@/components/seo/MarketingPageStructuredData";
import { FEATURES_PAGE_FAQ } from "@/lib/marketing-faqs";
import { getPublishedPageOverlay } from "@/lib/cms/get-page-content";
import { buildRouteMetadata } from "@/lib/cms/page-metadata";
import { SITE_PATHS } from "@/lib/site-paths";

const PAGE_TITLE = "Features – Conversational Analytics, KPI Tracker & Report Builder";
const PAGE_DESCRIPTION =
  "Explore Conalytic features: AI marketing chat for GA4, Google Ads, Search Console, GTM, and Meta; KPI goal tracking dashboard; automated HTML client report decks. Natural-language analytics and OAuth integrations.";

export async function generateMetadata(): Promise<Metadata> {
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

export default async function FeaturesPage() {
  const overlay = await getPublishedPageOverlay(SITE_PATHS.platform.features);
  const content = overlay?.sections as FeaturesContentPreset | undefined;

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
        pageTitle={overlay?.seo?.title ?? PAGE_TITLE}
        pageDescription={overlay?.seo?.description ?? PAGE_DESCRIPTION}
        faqItems={FEATURES_PAGE_FAQ}
      />
      <FeaturesClient content={content} />
    </>
  );
}

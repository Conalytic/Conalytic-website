/** Cookies Policy. */
import type { Metadata } from "next";
import { CookiesClient } from "@/components/pages/CookiesClient";
import { MarketingPageStructuredData } from "@/components/seo/MarketingPageStructuredData";
import { buildRouteMetadata } from "@/lib/cms/page-metadata";
import { SITE_PATHS } from "@/lib/site-paths";
import { getPublishedPageOverlay } from "@/lib/cms/get-page-content";

const PAGE_TITLE = "Cookies Policy – Conalytic";
const PAGE_DESCRIPTION =
  "How Conalytic uses cookies and similar technologies on our marketing analytics website. Manage preferences for analytics, marketing, and essential cookies.";

export async function generateMetadata(): Promise<Metadata> {
  return buildRouteMetadata(SITE_PATHS.legal.cookies, {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  });
}

export default async function CookiesPage() {
  const overlay = await getPublishedPageOverlay(SITE_PATHS.legal.cookies);

  return (
    <>
      <MarketingPageStructuredData
        path={SITE_PATHS.legal.cookies}
        pageTitle={overlay?.seo?.title ?? PAGE_TITLE}
        pageDescription={overlay?.seo?.description ?? PAGE_DESCRIPTION}
      />
      <CookiesClient content={overlay?.sections} />
    </>
  );
}

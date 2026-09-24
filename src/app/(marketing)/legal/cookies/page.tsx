/** Cookies Policy. */
import type { Metadata } from "next";
import { CookiesClient } from "@/components/pages/CookiesClient";
import { MarketingPageStructuredData } from "@/components/seo/MarketingPageStructuredData";
import { buildRouteMetadata } from "@/lib/site-metadata";
import { SITE_PATHS } from "@/lib/site-paths";

const PAGE_TITLE = "Cookies Policy – Conalytic";
const PAGE_DESCRIPTION =
  "How Conalytic uses cookies and similar technologies on our marketing analytics website. Manage preferences for analytics, marketing, and essential cookies.";

export function generateMetadata(): Metadata {
  return buildRouteMetadata(SITE_PATHS.legal.cookies, {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  });
}

export default function CookiesPage() {
  return (
    <>
      <MarketingPageStructuredData
        path={SITE_PATHS.legal.cookies}
        pageTitle={PAGE_TITLE}
        pageDescription={PAGE_DESCRIPTION}
      />
      <CookiesClient />
    </>
  );
}

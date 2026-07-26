/** Cookies Policy. */
import type { Metadata } from "next";
import { CookiesClient } from "@/components/pages/CookiesClient";
import { MarketingPageStructuredData } from "@/components/seo/MarketingPageStructuredData";
import { buildPageMetadata } from "@/lib/page-seo";

const PAGE_TITLE = "Cookies Policy – Conalytic";
const PAGE_DESCRIPTION =
  "How Conalytic uses cookies and similar technologies on our marketing analytics website. Manage preferences for analytics, marketing, and essential cookies.";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: "/cookies",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  });
}

export default function CookiesPage() {
  return (
    <>
      <MarketingPageStructuredData path="/cookies" pageTitle={PAGE_TITLE} pageDescription={PAGE_DESCRIPTION} />
      <CookiesClient />
    </>
  );
}

import type { Metadata } from "next";
import { ServicesIndexClient } from "@/components/pages/ServicesIndexClient";
import { BreadcrumbStructuredData } from "@/components/seo/BreadcrumbStructuredData";
import { MarketingPageStructuredData } from "@/components/seo/MarketingPageStructuredData";
import { buildRouteMetadata } from "@/lib/site-metadata";
import { SERVICES_BASE_PATH } from "@/lib/services-catalog";

const PAGE_TITLE = "Marketing Agency Services – SEO, PPC, GEO & Web | Conalytic";
const PAGE_DESCRIPTION =
  "Explore Conalytic services: B2B SEO, PPC management, email lifecycle, GEO, agentic web, AI automation, MCP servers, Next.js websites, GA4 analytics, UI/UX, and CRO for SaaS teams.";

export async function generateMetadata(): Promise<Metadata> {
  return buildRouteMetadata(SERVICES_BASE_PATH, {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    keywords: [
      "marketing agency services",
      "GEO generative engine optimization",
      "MCP server development",
      "Next.js marketing website",
      "AI workflow automation",
    ],
  });
}

export default function ServicesIndexPage() {
  return (
    <>
      <BreadcrumbStructuredData
        id="ld-services-breadcrumbs"
        items={[
          { name: "Home", path: "/" },
          { name: "Services", path: SERVICES_BASE_PATH },
        ]}
      />
      <MarketingPageStructuredData
        path={SERVICES_BASE_PATH}
        pageTitle={PAGE_TITLE}
        pageDescription={PAGE_DESCRIPTION}
      />
      <ServicesIndexClient />
    </>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePageClient } from "@/components/pages/ServicePageClient";
import { ServiceLandingPage } from "@/components/pages/service-landing/ServiceLandingPage";
import { getServiceLandingContent } from "@/content/service-landings";
import { getParsedServiceMeta, getServiceSeoKeywords } from "@/content/service-landings/landing-from-parsed";
import { BreadcrumbStructuredData } from "@/components/seo/BreadcrumbStructuredData";
import { FaqStructuredData } from "@/components/seo/FaqStructuredData";
import { MarketingPageStructuredData } from "@/components/seo/MarketingPageStructuredData";
import { buildPageMetadata } from "@/lib/page-seo";
import {
  getAllServiceSlugs,
  getServiceBySlug,
  servicePath,
  SERVICES_BASE_PATH,
} from "@/lib/services-catalog";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  const parsedMeta = getParsedServiceMeta(slug);

  const seoKeywords = getServiceSeoKeywords(slug);

  return buildPageMetadata({
    path: servicePath(slug),
    title: parsedMeta?.pageTitle ?? `${service.title} Services | Conalytic`,
    description: parsedMeta?.description ?? service.metaDescription,
    keywords:
      seoKeywords.length > 0
        ? seoKeywords
        : [service.title, "Conalytic services", "B2B marketing", "SaaS marketing"],
  });
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const path = servicePath(slug);
  const landing = getServiceLandingContent(slug);
  const parsedMeta = getParsedServiceMeta(slug);

  return (
    <>
      <BreadcrumbStructuredData
        id={`ld-service-breadcrumbs-${slug}`}
        items={[
          { name: "Home", path: "/" },
          { name: "Services", path: SERVICES_BASE_PATH },
          { name: service.title, path },
        ]}
      />
      <MarketingPageStructuredData
        path={path}
        pageTitle={parsedMeta?.pageTitle ?? `${service.title} | Conalytic Services`}
        pageDescription={parsedMeta?.description ?? service.metaDescription}
      />
      {landing?.faqItems?.length ? (
        <FaqStructuredData items={landing.faqItems} id={`ld-faq-service-${slug}`} />
      ) : null}
      {landing ? <ServiceLandingPage content={landing} /> : <ServicePageClient service={service} />}
    </>
  );
}
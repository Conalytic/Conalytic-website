import { JsonLd } from "@/components/seo/JsonLd";
import type { MarketingFaqItem } from "@/lib/marketing-faqs";
import { faqPageSchema, webPageSchema } from "@/lib/structured-data";

/** Marketing route JSON-LD: WebPage + optional FAQPage. */
export function MarketingPageStructuredData({
  path,
  pageTitle,
  pageDescription,
  faqItems = [],
}: {
  path: string;
  pageTitle: string;
  pageDescription: string;
  faqItems?: MarketingFaqItem[];
}) {
  const slug = path.replace(/\//g, "-").replace(/^-/, "") || "home";
  return (
    <>
      <JsonLd id={`ld-webpage-${slug}`} data={webPageSchema(path, pageTitle, pageDescription)} />
      {faqItems.length > 0 ? (
        <JsonLd id={`ld-faq-${slug}`} data={faqPageSchema(faqItems)} />
      ) : null}
    </>
  );
}

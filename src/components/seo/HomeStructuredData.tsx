import { JsonLd } from "@/components/seo/JsonLd";
import { faqPageSchema, webPageSchema } from "@/lib/structured-data";

type FaqItem = { question: string; answer: string };

interface HomeStructuredDataProps {
  faqItems: FaqItem[];
  pageTitle: string;
  pageDescription: string;
}

/** Home page JSON-LD: WebPage + FAQPage (matches visible FAQ section). */
export function HomeStructuredData({ faqItems, pageTitle, pageDescription }: HomeStructuredDataProps) {
  return (
    <>
      <JsonLd id="ld-home-webpage" data={webPageSchema("/", pageTitle, pageDescription)} />
      {faqItems.length > 0 ? <JsonLd id="ld-home-faq" data={faqPageSchema(faqItems)} /> : null}
    </>
  );
}

import { JsonLd } from "@/components/seo/JsonLd";
import { faqPageSchema } from "@/lib/structured-data";

type FaqItem = { question: string; answer: string };

/** FAQPage JSON-LD — must match visible FAQ accordion on the same page. */
export function FaqStructuredData({
  items,
  id = "ld-faq",
}: {
  items: FaqItem[];
  id?: string;
}) {
  if (!items.length) return null;
  return <JsonLd id={id} data={faqPageSchema(items)} />;
}

import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbListSchema } from "@/lib/structured-data";

export function BreadcrumbStructuredData({
  id,
  items,
}: {
  id: string;
  items: ReadonlyArray<{ name: string; path: string }>;
}) {
  if (items.length < 2) return null;
  return <JsonLd id={id} data={breadcrumbListSchema(items)} />;
}

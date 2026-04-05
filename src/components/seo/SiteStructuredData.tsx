import { JsonLd } from "@/components/seo/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/structured-data";

/** Site-wide JSON-LD (Organization + WebSite) — rendered once in root layout. */
export function SiteStructuredData() {
  return (
    <>
      <JsonLd id="ld-organization" data={organizationSchema()} />
      <JsonLd id="ld-website" data={websiteSchema()} />
    </>
  );
}

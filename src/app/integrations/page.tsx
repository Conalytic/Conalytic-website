/** Integrations directory route. */
import type { Metadata } from "next";
import { IntegrationsPageClient } from "@/components/pages/IntegrationsPageClient";
import { SITE_ORIGIN } from "@/lib/seo-config";

const fallbackMetadata: Metadata = {
  title: "Integrations – Conalytic",
  description:
    "Connect Conalytic to the tools your team already loves. Integrate with GA4, Google Ads, Meta Ads, Search Console, Slack, and many more.",
};

export async function generateMetadata(): Promise<Metadata> {
  return { ...fallbackMetadata, alternates: { canonical: `${SITE_ORIGIN}/integrations` } };
}

export default function IntegrationsPage() {
  return <IntegrationsPageClient />;
}

import type { Metadata } from "next";
import { IntegrationsPageClient } from "@/components/pages/IntegrationsPageClient";

export const metadata: Metadata = {
  title: "Integrations – Conalytic",
  description:
    "Connect Conalytic to the tools your team already loves. Integrate with GA4, Google Ads, Meta Ads, Search Console, Slack, and many more.",
};

export default function IntegrationsPage() {
  return <IntegrationsPageClient />;
}

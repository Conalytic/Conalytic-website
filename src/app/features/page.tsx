/** Features marketing route. */
import type { Metadata } from "next";
import { FeaturesClient } from "@/components/pages/FeaturesClient";
import { SITE_ORIGIN } from "@/lib/seo-config";

const fallbackMetadata: Metadata = {
  title: { absolute: "Features – Conalytic Marketing Analytics Platform" },
  description:
    "Explore Conalytic features: Conversational Analytics chat, KPIs Tracker goal monitoring, and Report Builder HTML decks for GA4, Search Console, Google Ads, GTM, and Meta.",
};

export async function generateMetadata(): Promise<Metadata> {
  return { ...fallbackMetadata, alternates: { canonical: `${SITE_ORIGIN}/features` } };
}

export default function FeaturesPage() {
  return <FeaturesClient />;
}

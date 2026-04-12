/** Product: Conversational Analytics deep-dive + pricing reuse. */
import type { Metadata } from "next";
import { ConversationalAnalyticsClient } from "@/components/products/ConversationalAnalyticsClient";
import { SITE_ORIGIN } from "@/lib/seo-config";

const fallbackMetadata: Metadata = {
  title: "Conversational Analytics – Conalytic",
  description:
    "Transform how your team analyzes marketing data with AI-powered conversations. Ask questions in plain English and get instant insights from GA4, Google Ads, Meta, and Search Console.",
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    ...fallbackMetadata,
    alternates: { canonical: `${SITE_ORIGIN}/products/conversational-analytics` },
  };
}

export default function ConversationalAnalyticsPage() {
  return <ConversationalAnalyticsClient />;
}

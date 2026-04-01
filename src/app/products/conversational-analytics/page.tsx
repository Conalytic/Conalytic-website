import type { Metadata } from "next";
import { ConversationalAnalyticsClient } from "@/components/products/ConversationalAnalyticsClient";

export const metadata: Metadata = {
  title: "Conversational Analytics – Conalytic",
  description:
    "Transform how your team analyzes marketing data with AI-powered conversations. Ask questions in plain English and get instant insights from GA4, Google Ads, Meta, and Search Console.",
};

export default function ConversationalAnalyticsPage() {
  return <ConversationalAnalyticsClient />;
}

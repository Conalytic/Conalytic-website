import type { Metadata } from "next";
import { HomeClient } from "@/components/home/HomeClient";

export const metadata: Metadata = {
  title: "Conalytic – AI-Powered Conversational Analytics Platform",
  description:
    "Casting Spells of Clarity on Your Data. From fragmented dashboards to unified intelligence. Ask questions in plain English and get instant insights from GA4, Google Ads, Meta, and Search Console.",
};

export default function HomePage() {
  return <HomeClient />;
}

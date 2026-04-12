/**
 * Home route (/): static marketing page with WebPage + FAQPage JSON-LD.
 */
import type { Metadata } from "next";
import { HomeClient } from "@/components/home/HomeClient";
import { HomeStructuredData } from "@/components/seo/HomeStructuredData";
import { DEFAULT_HOME_FAQ } from "@/lib/default-home-faq";
import { SITE_ORIGIN } from "@/lib/seo-config";

const fallbackMetadata: Metadata = {
  title: "Conalytic – AI-Powered Conversational Analytics Platform",
  description:
    "Casting Spells of Clarity on Your Data. From fragmented dashboards to unified intelligence. Ask questions in plain English and get instant insights from GA4, Google Ads, Meta, and Search Console.",
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    ...fallbackMetadata,
    alternates: { canonical: `${SITE_ORIGIN}/` },
  };
}

export default function HomePage() {
  const line1 = "Unlocking Growth With";
  const line2 = "Next-Gen Analytics";
  const homeLdTitle = `${line1} ${line2}`.replace(/\s+/g, " ").trim();
  const homeLdDescription =
    "Ask questions in plain English and get instant insights from GA4, Google Ads, Meta and Search Console — no SQL required.";

  return (
    <>
      <HomeStructuredData faqItems={[...DEFAULT_HOME_FAQ]} pageTitle={homeLdTitle} pageDescription={homeLdDescription} />
      <HomeClient />
    </>
  );
}

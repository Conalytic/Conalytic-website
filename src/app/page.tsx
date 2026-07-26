/**
 * Home route (/): static marketing page with WebPage + FAQPage JSON-LD.
 */
import type { Metadata } from "next";
import { HomeClient } from "@/components/home/HomeClient";
import { HomeStructuredData } from "@/components/seo/HomeStructuredData";
import { DEFAULT_HOME_FAQ } from "@/lib/default-home-faq";
import { SITE_ORIGIN } from "@/lib/seo-config";

const fallbackMetadata: Metadata = {
  title: { absolute: "Conalytic – Marketing Analytics: Chat, KPIs & Reports" },
  description:
    "Conalytic combines Conversational Analytics, KPIs Tracker, and Report Builder. Connect GA4, Search Console, Google Ads, GTM, and Meta; ask questions in plain English, monitor goals, and deliver HTML report decks.",
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    ...fallbackMetadata,
    alternates: { canonical: `${SITE_ORIGIN}/` },
  };
}

export default function HomePage() {
  const line1 = "Marketing analytics with";
  const line2 = "Chat, KPIs & Reports";
  const homeLdTitle = `${line1} ${line2}`.replace(/\s+/g, " ").trim();
  const homeLdDescription =
    "Conalytic includes Conversational Analytics, KPIs Tracker, and Report Builder. Connect GA4, Search Console, Google Ads, GTM, and Meta Ads.";

  return (
    <>
      <HomeStructuredData faqItems={[...DEFAULT_HOME_FAQ]} pageTitle={homeLdTitle} pageDescription={homeLdDescription} />
      <HomeClient />
    </>
  );
}

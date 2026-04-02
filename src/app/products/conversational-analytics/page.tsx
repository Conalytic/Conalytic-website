import type { Metadata } from "next";
import {
  ConversationalAnalyticsClient,
  type ConversationalAnalyticsContentPreset,
} from "@/components/products/ConversationalAnalyticsClient";
import { CmsPage } from "@/components/storyblok/CmsPage";
import { getPageMetadata } from "@/lib/storyblok-page";
import { getPageStory } from "@/lib/storyblok";

const fallbackMetadata: Metadata = {
  title: "Conversational Analytics – Conalytic",
  description:
    "Transform how your team analyzes marketing data with AI-powered conversations. Ask questions in plain English and get instant insights from GA4, Google Ads, Meta, and Search Console.",
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("/products/conversational-analytics", fallbackMetadata);
}

function str(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length ? value : undefined;
}

function mapConversationalAnalyticsContent(content: Record<string, unknown>): ConversationalAnalyticsContentPreset {
  return {
    heroBadge: str(content.conversational_analytics_hero_badge),
    heroTitleLine1: str(content.conversational_analytics_hero_title_line_1),
    heroTitleLine2: str(content.conversational_analytics_hero_title_line_2),
    heroSubtitle: str(content.conversational_analytics_hero_subtitle),
    heroSecondarySubtitle: str(content.conversational_analytics_hero_secondary_subtitle),
    coreCapabilitiesTitle: str(content.conversational_analytics_core_capabilities_title),
    coreCapabilitiesSubtitle: str(content.conversational_analytics_core_capabilities_subtitle),
    ctaTitle: str(content.conversational_analytics_cta_title),
    ctaSubtitle: str(content.conversational_analytics_cta_subtitle),
  };
}

export default async function ConversationalAnalyticsPage() {
  const story = await getPageStory("/products/conversational-analytics");

  if (!story) {
    return <ConversationalAnalyticsClient />;
  }

  const content = story.content as Record<string, unknown>;
  const useStoryblokPage = content.use_storyblok_page === true;

  if (useStoryblokPage) {
    return <CmsPage slug="/products/conversational-analytics" fallback={<ConversationalAnalyticsClient />} />;
  }

  return <ConversationalAnalyticsClient content={mapConversationalAnalyticsContent(content)} />;
}

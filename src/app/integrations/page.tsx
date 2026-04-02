import type { Metadata } from "next";
import { IntegrationsPageClient, type IntegrationsContentPreset } from "@/components/pages/IntegrationsPageClient";
import { CmsPage } from "@/components/storyblok/CmsPage";
import { getPageMetadata } from "@/lib/storyblok-page";
import { getPageStory } from "@/lib/storyblok";

const fallbackMetadata: Metadata = {
  title: "Integrations – Conalytic",
  description:
    "Connect Conalytic to the tools your team already loves. Integrate with GA4, Google Ads, Meta Ads, Search Console, Slack, and many more.",
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("/integrations", fallbackMetadata);
}

function str(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length ? value : undefined;
}

function mapIntegrationsContent(content: Record<string, unknown>): IntegrationsContentPreset {
  return {
    heroBadge: str(content.integrations_hero_badge),
    heroTitleLine1: str(content.integrations_hero_title_line_1),
    heroTitleLine2: str(content.integrations_hero_title_line_2),
    heroSubtitle: str(content.integrations_hero_subtitle),
    ctaTitle: str(content.integrations_cta_title),
    ctaSubtitle: str(content.integrations_cta_subtitle),
  };
}

export default async function IntegrationsPage() {
  const story = await getPageStory("/integrations");

  if (!story) {
    return <IntegrationsPageClient />;
  }

  const content = story.content as Record<string, unknown>;
  const useStoryblokPage = content.use_storyblok_page === true;

  if (useStoryblokPage) {
    return <CmsPage slug="/integrations" fallback={<IntegrationsPageClient />} />;
  }

  return <IntegrationsPageClient content={mapIntegrationsContent(content)} />;
}

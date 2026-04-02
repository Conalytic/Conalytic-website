import type { Metadata } from "next";
import { FeaturesClient, type FeaturesContentPreset } from "@/components/pages/FeaturesClient";
import { CmsPage } from "@/components/storyblok/CmsPage";
import { getPageMetadata } from "@/lib/storyblok-page";
import { getPageStory } from "@/lib/storyblok";

const fallbackMetadata: Metadata = {
  title: "Features – Conalytic",
  description:
    "Features that make analytics fun, easy, and super productive. From connecting data to real-time conversations and report building, Conalytic has everything your team needs.",
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("/features", fallbackMetadata);
}

function str(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length ? value : undefined;
}

function mapFeaturesContent(content: Record<string, unknown>): FeaturesContentPreset {
  return {
    heroBadge: str(content.features_hero_badge),
    heroTitleLine1: str(content.features_hero_title_line_1),
    heroTitleLine2: str(content.features_hero_title_line_2),
    heroSubtitle: str(content.features_hero_subtitle),
    heroPrimaryCtaLabel: str(content.features_hero_primary_cta_label),
    includedTitle: str(content.features_included_title),
    includedSubtitle: str(content.features_included_subtitle),
    ctaTitle: str(content.features_cta_title),
    ctaSubtitle: str(content.features_cta_subtitle),
  };
}

export default async function FeaturesPage() {
  const story = await getPageStory("/features");

  if (!story) {
    return <FeaturesClient />;
  }

  const content = story.content as Record<string, unknown>;
  const useStoryblokPage = content.use_storyblok_page === true;

  if (useStoryblokPage) {
    return <CmsPage slug="/features" fallback={<FeaturesClient />} />;
  }

  return <FeaturesClient content={mapFeaturesContent(content)} />;
}

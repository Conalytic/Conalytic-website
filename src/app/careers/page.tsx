import type { Metadata } from "next";
import { CareersClient, type CareersContentPreset } from "@/components/pages/CareersClient";
import { CmsPage } from "@/components/storyblok/CmsPage";
import { getPageMetadata } from "@/lib/storyblok-page";
import { getPageStory } from "@/lib/storyblok";

const fallbackMetadata: Metadata = {
  title: "Careers – Conalytic",
  description:
    "Join our mission to redefine analytics. At Conalytic, we're building the future of marketing intelligence. Explore open positions and join our team.",
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("/careers", fallbackMetadata);
}

function str(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length ? value : undefined;
}

function mapCareersContent(content: Record<string, unknown>): CareersContentPreset {
  return {
    heroBadge: str(content.careers_hero_badge),
    heroTitleLine1: str(content.careers_hero_title_line_1),
    heroTitleLine2: str(content.careers_hero_title_line_2),
    heroSubtitle: str(content.careers_hero_subtitle),
    heroButtonLabel: str(content.careers_hero_button_label),
    lifeAtConalyticTitle: str(content.careers_life_title),
    lifeAtConalyticSubtitle: str(content.careers_life_subtitle),
    openPositionsTitle: str(content.careers_open_positions_title),
    openPositionsSubtitle: str(content.careers_open_positions_subtitle),
    ctaTitle: str(content.careers_cta_title),
    ctaSubtitle: str(content.careers_cta_subtitle),
  };
}

export default async function CareersPage() {
  const story = await getPageStory("/careers");

  if (!story) {
    return <CareersClient />;
  }

  const content = story.content as Record<string, unknown>;
  const useStoryblokPage = content.use_storyblok_page === true;

  if (useStoryblokPage) {
    return <CmsPage slug="/careers" fallback={<CareersClient />} />;
  }

  return <CareersClient content={mapCareersContent(content)} />;
}

/** About Us route; Storyblok optional full page. */
import type { Metadata } from "next";
import { AboutClient, type AboutContentPreset } from "@/components/pages/AboutClient";
import { CmsPage } from "@/components/storyblok/CmsPage";
import { getPageMetadata } from "@/lib/storyblok-page";
import { getPageStory } from "@/lib/storyblok-server";

const fallbackMetadata: Metadata = {
  title: "About Us – Conalytic",
  description:
    "At Conalytic, we're passionate about building tools that empower teams to analyze, create, and succeed together. Learn about our story, mission, and team.",
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("/about-us", fallbackMetadata);
}

function str(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length ? value : undefined;
}

function mapAboutContent(content: Record<string, unknown>): AboutContentPreset {
  return {
    heroBadge: str(content.about_hero_badge),
    heroTitleLine1: str(content.about_hero_title_line_1),
    heroTitleLine2: str(content.about_hero_title_line_2),
    heroSubtitle: str(content.about_hero_subtitle),
    storyBadge: str(content.about_story_badge),
    storyTitle: str(content.about_story_title),
    teamBadge: str(content.about_team_badge),
    teamTitle: str(content.about_team_title),
    teamSubtitle: str(content.about_team_subtitle),
    ctaTitle: str(content.about_cta_title),
    ctaSubtitle: str(content.about_cta_subtitle),
  };
}

export default async function AboutPage() {
  const story = await getPageStory("/about-us");

  if (!story) {
    return <AboutClient />;
  }

  const content = story.content as Record<string, unknown>;
  const useStoryblokPage = content.use_storyblok_page === true;

  if (useStoryblokPage) {
    return <CmsPage slug="/about-us" fallback={<AboutClient />} />;
  }

  return <AboutClient content={mapAboutContent(content)} />;
}

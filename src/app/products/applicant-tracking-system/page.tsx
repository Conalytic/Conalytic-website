import type { Metadata } from "next";
import { ATSClient, type ATSContentPreset } from "@/components/pages/ATSClient";
import { CmsPage } from "@/components/storyblok/CmsPage";
import { getPageMetadata } from "@/lib/storyblok-page";
import { getPageStory } from "@/lib/storyblok";

const fallbackMetadata: Metadata = {
  title: "Applicant Tracking System – Conalytic",
  description:
    "Streamline your recruitment process with Conalytic's AI-powered Applicant Tracking System. Track candidates, automate workflows, and hire smarter with data-driven insights.",
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("/products/applicant-tracking-system", fallbackMetadata);
}

function str(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length ? value : undefined;
}

function mapAtsContent(content: Record<string, unknown>): ATSContentPreset {
  return {
    heroBadge: str(content.ats_hero_badge),
    heroTitleLine1: str(content.ats_hero_title_line_1),
    heroTitleLine2: str(content.ats_hero_title_line_2),
    heroSubtitle: str(content.ats_hero_subtitle),
    heroPrimaryCtaLabel: str(content.ats_hero_primary_cta_label),
    heroSecondaryCtaLabel: str(content.ats_hero_secondary_cta_label),
    featuresTitle: str(content.ats_features_title),
    featuresSubtitle: str(content.ats_features_subtitle),
    ctaTitle: str(content.ats_cta_title),
    ctaSubtitle: str(content.ats_cta_subtitle),
  };
}

export default async function ATSPage() {
  const story = await getPageStory("/products/applicant-tracking-system");

  if (!story) {
    return <ATSClient />;
  }

  const content = story.content as Record<string, unknown>;
  const useStoryblokPage = content.use_storyblok_page === true;

  if (useStoryblokPage) {
    return <CmsPage slug="/products/applicant-tracking-system" fallback={<ATSClient />} />;
  }

  return <ATSClient content={mapAtsContent(content)} />;
}

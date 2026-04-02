import type { Metadata } from "next";
import { ReportBuilderClient, type ReportBuilderContentPreset } from "@/components/pages/ReportBuilderClient";
import { CmsPage } from "@/components/storyblok/CmsPage";
import { getPageMetadata } from "@/lib/storyblok-page";
import { getPageStory } from "@/lib/storyblok";

const fallbackMetadata: Metadata = {
  title: "Report Builder – Conalytic",
  description:
    "Transform your marketing reports from static data dumps into intelligent, branded presentations. Create stunning white-label reports with AI-generated insights in minutes.",
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("/products/report-builder", fallbackMetadata);
}

function str(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length ? value : undefined;
}

function mapReportBuilderContent(content: Record<string, unknown>): ReportBuilderContentPreset {
  return {
    heroBadge: str(content.report_builder_hero_badge),
    heroTitleLine1: str(content.report_builder_hero_title_line_1),
    heroTitleLine2: str(content.report_builder_hero_title_line_2),
    heroSubtitle: str(content.report_builder_hero_subtitle),
    heroSecondarySubtitle: str(content.report_builder_hero_secondary_subtitle),
    coreFeaturesTitle: str(content.report_builder_core_features_title),
    coreFeaturesSubtitle: str(content.report_builder_core_features_subtitle),
    valueTitle: str(content.report_builder_value_title),
    valueSubtitle: str(content.report_builder_value_subtitle),
    ctaTitle: str(content.report_builder_cta_title),
    ctaSubtitle: str(content.report_builder_cta_subtitle),
  };
}

export default async function ReportBuilderPage() {
  const story = await getPageStory("/products/report-builder");

  if (!story) {
    return <ReportBuilderClient />;
  }

  const content = story.content as Record<string, unknown>;
  const useStoryblokPage = content.use_storyblok_page === true;

  if (useStoryblokPage) {
    return <CmsPage slug="/products/report-builder" fallback={<ReportBuilderClient />} />;
  }

  return <ReportBuilderClient content={mapReportBuilderContent(content)} />;
}

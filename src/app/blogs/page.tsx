import type { Metadata } from "next";
import { BlogsClient, type BlogsContentPreset } from "@/components/pages/BlogsClient";
import { CmsPage } from "@/components/storyblok/CmsPage";
import { getPageMetadata } from "@/lib/storyblok-page";
import { getPageStory } from "@/lib/storyblok";

const fallbackMetadata: Metadata = {
  title: "Blog – Conalytic",
  description:
    "Insights, tips, and stories to supercharge your analytics. Explore the latest trends in marketing analytics, productivity hacks, and updates from Conalytic.",
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("/blogs", fallbackMetadata);
}

function str(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length ? value : undefined;
}

function mapBlogsContent(content: Record<string, unknown>): BlogsContentPreset {
  return {
    heroBadge: str(content.blogs_hero_badge),
    heroTitleLine1: str(content.blogs_hero_title_line_1),
    heroTitleLine2: str(content.blogs_hero_title_line_2),
    heroSubtitle: str(content.blogs_hero_subtitle),
  };
}

export default async function BlogsPage() {
  const story = await getPageStory("/blogs");

  if (!story) {
    return <BlogsClient />;
  }

  const content = story.content as Record<string, unknown>;
  const useStoryblokPage = content.use_storyblok_page === true;

  if (useStoryblokPage) {
    return <CmsPage slug="/blogs" fallback={<BlogsClient />} />;
  }

  return <BlogsClient content={mapBlogsContent(content)} />;
}

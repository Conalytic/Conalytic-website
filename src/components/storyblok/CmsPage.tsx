/**
 * Loads a Storyblok page story by slug; if `use_storyblok_page`, renders `StoryblokStory`, else returns fallback children.
 */
import { StoryblokStory } from "@storyblok/react/rsc";
import { getPageStory } from "@/lib/storyblok-server";
import { initializeStoryblok } from "@/components/storyblok/storyblok-init";

initializeStoryblok();

interface CmsPageProps {
  slug: string;
  fallback?: React.ReactNode;
}

export async function CmsPage({ slug, fallback = null }: CmsPageProps) {
  const story = await getPageStory(slug);

  if (!story) {
    return <>{fallback}</>;
  }

  const content = story.content as Record<string, unknown>;
  const useStoryblokPage = content.use_storyblok_page === true;

  if (!useStoryblokPage) {
    return <>{fallback}</>;
  }

  return <StoryblokStory story={story as never} />;
}

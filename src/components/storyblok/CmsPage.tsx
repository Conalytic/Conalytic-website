import { StoryblokStory } from "@storyblok/react/rsc";
import { getPageStory } from "@/lib/storyblok";
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

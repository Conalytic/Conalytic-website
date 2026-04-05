/** Renders Storyblok rich text field in RSC. */
import { StoryblokRichText, storyblokEditable } from "@storyblok/react/rsc";

type Blok = {
  _uid: string;
  rich_text?: unknown;
};

export default function RichTextBlock({ blok }: { blok: Blok }) {
  if (!blok.rich_text) {
    return null;
  }

  return (
    <div
      className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 dark:prose-headings:text-white dark:prose-p:text-white/70"
      {...storyblokEditable(blok as never)}
    >
      <StoryblokRichText doc={blok.rich_text as never} />
    </div>
  );
}

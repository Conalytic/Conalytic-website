/** Stats row container; items rendered as `stat_item` bloks. */
import { StoryblokServerComponent, storyblokEditable } from "@storyblok/react/rsc";

type Blok = {
  _uid: string;
  title?: string;
  items?: Array<{ _uid?: string } & Record<string, unknown>>;
};

export default function StatsBlock({ blok }: { blok: Blok }) {
  return (
    <div {...storyblokEditable(blok)}>
      {blok.title && <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-white">{blok.title}</h2>}
      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        {(blok.items || []).map((item, index) => (
          <StoryblokServerComponent blok={item as never} key={String(item._uid || index)} />
        ))}
      </div>
    </div>
  );
}

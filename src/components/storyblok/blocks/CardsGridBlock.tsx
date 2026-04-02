import { StoryblokServerComponent, storyblokEditable } from "@storyblok/react/rsc";

type Blok = {
  _uid: string;
  title?: string;
  subtitle?: string;
  columns?: "2" | "3" | "4";
  items?: Array<{ _uid?: string } & Record<string, unknown>>;
};

const COLUMN_CLASSES: Record<string, string> = {
  "2": "md:grid-cols-2",
  "3": "md:grid-cols-2 lg:grid-cols-3",
  "4": "md:grid-cols-2 lg:grid-cols-4",
};

export default function CardsGridBlock({ blok }: { blok: Blok }) {
  return (
    <div {...storyblokEditable(blok)}>
      {blok.title && <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{blok.title}</h2>}
      {blok.subtitle && <p className="mt-3 max-w-3xl text-gray-600 dark:text-white/70">{blok.subtitle}</p>}
      <div className={`mt-8 grid grid-cols-1 gap-4 ${COLUMN_CLASSES[blok.columns || "3"]}`}>
        {(blok.items || []).map((item, index) => (
          <StoryblokServerComponent blok={item as never} key={String(item._uid || index)} />
        ))}
      </div>
    </div>
  );
}

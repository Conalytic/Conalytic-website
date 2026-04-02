import { StoryblokServerComponent, storyblokEditable } from "@storyblok/react/rsc";

type Blok = {
  _uid: string;
  columns?: Array<{ _uid?: string } & Record<string, unknown>>;
};

export default function GridBlock({ blok }: { blok: Blok }) {
  return (
    <section className="py-10" {...storyblokEditable(blok as never)}>
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-3 px-4 sm:grid-cols-2 lg:grid-cols-3 sm:px-6 lg:px-8">
        {(blok.columns || []).map((column, index) => (
          <StoryblokServerComponent key={String(column._uid || index)} blok={column as never} />
        ))}
      </div>
    </section>
  );
}

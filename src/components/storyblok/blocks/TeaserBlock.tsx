/** Simple headline teaser blok for flexible layouts. */
import { storyblokEditable } from "@storyblok/react/rsc";

type Blok = {
  _uid: string;
  headline?: string;
};

export default function TeaserBlock({ blok }: { blok: Blok }) {
  return (
    <section className="py-16" {...storyblokEditable(blok as never)}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
          {blok.headline || "Welcome to Conalytic"}
        </h1>
      </div>
    </section>
  );
}

import { storyblokEditable } from "@storyblok/react/rsc";

type Blok = {
  _uid: string;
  name?: string;
};

export default function FeatureBlock({ blok }: { blok: Blok }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white px-4 py-3 text-sm font-medium text-gray-700 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-white/80" {...storyblokEditable(blok as never)}>
      {blok.name || "Feature"}
    </div>
  );
}

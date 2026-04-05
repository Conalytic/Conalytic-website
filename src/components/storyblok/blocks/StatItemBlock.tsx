/** One stat cell inside `stats_block`. */
import { storyblokEditable } from "@storyblok/react/rsc";

type Blok = {
  _uid: string;
  value?: string;
  label?: string;
};

export default function StatItemBlock({ blok }: { blok: Blok }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white px-4 py-5 text-center dark:border-white/[0.08] dark:bg-white/[0.03]" {...storyblokEditable(blok)}>
      {blok.value && <p className="text-2xl font-bold text-gray-900 dark:text-white">{blok.value}</p>}
      {blok.label && <p className="mt-1 text-xs uppercase tracking-wider text-gray-500 dark:text-white/50">{blok.label}</p>}
    </div>
  );
}

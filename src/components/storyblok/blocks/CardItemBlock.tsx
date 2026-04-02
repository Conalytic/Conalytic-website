import Link from "next/link";
import { storyblokEditable } from "@storyblok/react/rsc";
import { resolveStoryblokLink } from "@/lib/storyblok";

type Blok = {
  _uid: string;
  title?: string;
  description?: string;
  cta_label?: string;
  cta_link?: unknown;
};

export default function CardItemBlock({ blok }: { blok: Blok }) {
  const cta = resolveStoryblokLink(blok.cta_link, "#");

  return (
    <article
      className="h-full rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-white/[0.08] dark:bg-white/[0.03]"
      {...storyblokEditable(blok as never)}
    >
      {blok.title && <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{blok.title}</h3>}
      {blok.description && <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-white/70">{blok.description}</p>}
      {blok.cta_label && cta.href !== "#" && (
        <Link href={cta.href} target={cta.target} className="mt-4 inline-flex text-sm font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-300 dark:hover:text-brand-200">
          {blok.cta_label}
        </Link>
      )}
    </article>
  );
}

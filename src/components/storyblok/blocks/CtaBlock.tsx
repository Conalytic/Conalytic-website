import Link from "next/link";
import { storyblokEditable } from "@storyblok/react/rsc";
import { resolveStoryblokLink } from "@/lib/storyblok";

type Blok = {
  _uid: string;
  title?: string;
  subtitle?: string;
  primary_cta_label?: string;
  primary_cta_link?: unknown;
  secondary_cta_label?: string;
  secondary_cta_link?: unknown;
};

export default function CtaBlock({ blok }: { blok: Blok }) {
  const primary = resolveStoryblokLink(blok.primary_cta_link, "#");
  const secondary = resolveStoryblokLink(blok.secondary_cta_link, "#");

  return (
    <div
      className="rounded-3xl border border-brand-200/60 bg-gradient-to-r from-brand-50 to-blue-50 px-6 py-10 dark:border-brand-500/20 dark:from-brand-500/10 dark:to-blue-500/10"
      {...storyblokEditable(blok as never)}
    >
      {blok.title && <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{blok.title}</h2>}
      {blok.subtitle && <p className="mt-2 text-sm text-gray-600 dark:text-white/70">{blok.subtitle}</p>}
      <div className="mt-6 flex flex-wrap gap-3">
        {blok.primary_cta_label && primary.href !== "#" && (
          <Link href={primary.href} target={primary.target} className="rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">
            {blok.primary_cta_label}
          </Link>
        )}
        {blok.secondary_cta_label && secondary.href !== "#" && (
          <Link
            href={secondary.href}
            target={secondary.target}
            className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 dark:border-white/20 dark:bg-white/[0.03] dark:text-white/80"
          >
            {blok.secondary_cta_label}
          </Link>
        )}
      </div>
    </div>
  );
}

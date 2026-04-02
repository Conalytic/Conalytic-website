import Link from "next/link";
import { storyblokEditable } from "@storyblok/react/rsc";
import { cn } from "@/lib/utils";
import { resolveStoryblokLink } from "@/lib/storyblok";

type Blok = {
  _uid: string;
  kicker?: string;
  title?: string;
  subtitle?: string;
  primary_cta_label?: string;
  primary_cta_link?: unknown;
  secondary_cta_label?: string;
  secondary_cta_link?: unknown;
  align?: "left" | "center";
};

export default function HeroBlock({ blok }: { blok: Blok }) {
  const primary = resolveStoryblokLink(blok.primary_cta_link, "#");
  const secondary = resolveStoryblokLink(blok.secondary_cta_link, "#");
  const centered = (blok.align || "center") === "center";

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border border-gray-100 dark:border-white/[0.08] px-6 py-16 sm:px-10",
        "bg-gradient-to-br from-white via-brand-50/30 to-blue-50/40 dark:from-[#12121B] dark:via-[#101027] dark:to-[#0B1223]",
        centered && "text-center"
      )}
      {...storyblokEditable(blok as never)}
    >
      {blok.kicker && (
        <span className="inline-flex items-center rounded-full border border-brand-200/70 bg-brand-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-700 dark:border-brand-400/25 dark:bg-brand-500/10 dark:text-brand-300">
          {blok.kicker}
        </span>
      )}
      {blok.title && (
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          {blok.title}
        </h1>
      )}
      {blok.subtitle && (
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-600 dark:text-white/70 sm:text-lg">
          {blok.subtitle}
        </p>
      )}
      <div className={cn("mt-8 flex flex-wrap gap-3", centered && "justify-center")}>
        {blok.primary_cta_label && primary.href !== "#" && (
          <Link
            href={primary.href}
            target={primary.target}
            className="inline-flex items-center rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            {blok.primary_cta_label}
          </Link>
        )}
        {blok.secondary_cta_label && secondary.href !== "#" && (
          <Link
            href={secondary.href}
            target={secondary.target}
            className="inline-flex items-center rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-white/20 dark:bg-white/[0.03] dark:text-white/80 dark:hover:bg-white/[0.07]"
          >
            {blok.secondary_cta_label}
          </Link>
        )}
      </div>
    </div>
  );
}

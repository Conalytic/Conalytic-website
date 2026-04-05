/** Single card tile for `cards_grid` with optional image. */
import Image from "next/image";
import Link from "next/link";
import { storyblokEditable } from "@storyblok/react/rsc";
import { resolveStoryblokLink } from "@/lib/storyblok";
import { storyblokImageAlt, storyblokImageSrc } from "@/lib/storyblok-asset";

type Blok = {
  _uid: string;
  title?: string;
  image?: unknown;
  image_alt?: string;
  description?: string;
  cta_label?: string;
  cta_link?: unknown;
};

export default function CardItemBlock({ blok }: { blok: Blok }) {
  const cta = resolveStoryblokLink(blok.cta_link, "#");
  const imgSrc = storyblokImageSrc(blok.image);
  const imgAlt =
    blok.image_alt?.trim() || storyblokImageAlt(blok.image, blok.title || "Card image");

  return (
    <article
      className="h-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-white/[0.08] dark:bg-white/[0.03]"
      {...storyblokEditable(blok as never)}
    >
      {imgSrc ? (
        <div className="relative aspect-[16/10] w-full bg-gray-100 dark:bg-white/[0.05]">
          <Image
            src={imgSrc}
            alt={imgAlt}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      ) : null}
      <div className="p-6">
        {blok.title && <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{blok.title}</h3>}
        {blok.description && (
          <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-white/70">{blok.description}</p>
        )}
        {blok.cta_label && cta.href !== "#" && (
          <Link
            href={cta.href}
            target={cta.target}
            className="mt-4 inline-flex text-sm font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-300 dark:hover:text-brand-200"
          >
            {blok.cta_label}
          </Link>
        )}
      </div>
    </article>
  );
}

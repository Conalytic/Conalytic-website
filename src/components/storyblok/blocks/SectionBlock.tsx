/** Section wrapper with optional background image, anchor, padding, and nested bloks. */
import Image from "next/image";
import { StoryblokServerComponent, storyblokEditable } from "@storyblok/react/rsc";
import { cn } from "@/lib/utils";
import { storyblokImageAlt, storyblokImageSrc } from "@/lib/storyblok-asset";

type Blok = {
  _uid: string;
  component: string;
  anchor_id?: string;
  padding?: "none" | "sm" | "md" | "lg";
  background?: "default" | "muted" | "dark" | "gradient";
  width?: "narrow" | "default" | "wide" | "full";
  background_image?: unknown;
  background_image_alt?: string;
  body?: Array<{ _uid?: string } & Record<string, unknown>>;
};

const PADDING: Record<string, string> = {
  none: "py-0",
  sm: "py-10",
  md: "py-16",
  lg: "py-24",
};

const BACKGROUND: Record<string, string> = {
  default: "bg-transparent",
  muted: "bg-[#F6F7FE] dark:bg-[#0E0E14]",
  dark: "bg-[#0C0C12] text-white",
  gradient: "bg-gradient-to-br from-brand-50 via-white to-blue-50 dark:from-[#111125] dark:via-[#0C0C12] dark:to-[#0A1225]",
};

const WIDTH: Record<string, string> = {
  narrow: "max-w-3xl",
  default: "max-w-5xl",
  wide: "max-w-6xl",
  full: "max-w-none",
};

export default function SectionBlock({ blok }: { blok: Blok }) {
  const sectionPadding = PADDING[blok.padding || "md"];
  const sectionBg = BACKGROUND[blok.background || "default"];
  const containerWidth = WIDTH[blok.width || "default"];
  const bgSrc = storyblokImageSrc(blok.background_image);
  const bgAlt =
    blok.background_image_alt?.trim() ||
    storyblokImageAlt(blok.background_image, "");

  return (
    <section
      id={blok.anchor_id}
      className={cn("relative overflow-hidden", sectionPadding, !bgSrc && sectionBg)}
      {...storyblokEditable(blok as never)}
    >
      {bgSrc ? (
        <>
          <Image
            src={bgSrc}
            alt={bgAlt}
            fill
            className="object-cover"
            sizes="100vw"
            aria-hidden={!bgAlt}
          />
          <div
            className="absolute inset-0 bg-white/85 dark:bg-[#0C0C12]/88"
            aria-hidden
          />
        </>
      ) : null}
      <div className={cn("relative z-10 mx-auto px-4 sm:px-6 lg:px-8", containerWidth)}>
        {(blok.body || []).map((nestedBlok, index) => (
          <StoryblokServerComponent blok={nestedBlok as never} key={String(nestedBlok._uid || index)} />
        ))}
      </div>
    </section>
  );
}

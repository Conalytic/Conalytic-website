import { StoryblokServerComponent, storyblokEditable } from "@storyblok/react/rsc";
import { cn } from "@/lib/utils";

type Blok = {
  _uid: string;
  component: string;
  anchor_id?: string;
  padding?: "none" | "sm" | "md" | "lg";
  background?: "default" | "muted" | "dark" | "gradient";
  width?: "narrow" | "default" | "wide" | "full";
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

  return (
    <section id={blok.anchor_id} className={cn(sectionPadding, sectionBg)} {...storyblokEditable(blok)}>
      <div className={cn("mx-auto px-4 sm:px-6 lg:px-8", containerWidth)}>
        {(blok.body || []).map((nestedBlok, index) => (
          <StoryblokServerComponent blok={nestedBlok as never} key={String(nestedBlok._uid || index)} />
        ))}
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ServiceLandingContent } from "@/lib/service-landing-types";
import { cn } from "@/lib/utils";

type Section = NonNullable<ServiceLandingContent["whatWeDo"]>;
type VisualKey = Section["items"][number]["visual"];
type CardImages = ServiceLandingContent["whatWeDoCardImages"];

function CardVisual({ visual, image }: { visual: VisualKey; image?: { src: string; alt: string } }) {
  if (image?.src) {
    return (
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-brand-900">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover object-center transition-transform duration-500 group-hover/card:scale-[1.03]"
          sizes="(max-width: 640px) 88vw, 372px"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-brand-900/35 to-brand-800/20"
          aria-hidden
        />
        <div
          className="absolute inset-0 opacity-50 mix-blend-soft-light bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(255,255,255,0.18),transparent_55%)]"
          aria-hidden
        />
      </div>
    );
  }

  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800">
      <div
        className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_90%_70%_at_50%_-10%,rgba(255,255,255,0.28),transparent_60%)]"
        aria-hidden
      />
      <div className="absolute inset-0 flex items-center justify-center p-5 sm:p-6">
        <div className="service-what-we-do-card-mock w-full max-w-[196px] rounded-xl border border-white/20 bg-white/[0.09] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-md">
          <div className="mb-3 h-7 w-7 rounded-lg bg-white/20" />
          <div className="space-y-2">
            <div className="h-1.5 w-full rounded-full bg-white/30" />
            <div className="h-1.5 w-[88%] rounded-full bg-white/22" />
            <div className="h-1.5 w-[62%] rounded-full bg-white/16" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ServiceWhatWeDoCarousel({
  section,
  cardImages,
}: {
  section: Section;
  cardImages?: CardImages;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-what-we-do-card]");
    const step = card ? card.offsetWidth + 20 : el.clientWidth * 0.85;
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  return (
    <section
      id="what-we-do"
      className="service-what-we-do service-landing-section service-section-full-bleed reveal-skip relative overflow-hidden py-16 md:py-20 lg:py-24"
    >
      <div className="service-marketing-edge-x mx-auto mb-10 max-w-7xl sm:mb-12 xl:max-w-[1380px]">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="service-what-we-do-eyebrow mb-3 text-sm font-medium">{section.eyebrow}</p>
            <h2 className="service-what-we-do-title service-landing-section-title max-w-3xl font-bold">
              {section.title}
            </h2>
          </div>
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => scroll(-1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-300 bg-white/90 text-brand-800 shadow-sm transition-colors hover:bg-white dark:border-white/25 dark:bg-white/10 dark:text-white dark:shadow-none dark:hover:bg-white/15"
              aria-label="Scroll previous"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-300 bg-white/90 text-brand-800 shadow-sm transition-colors hover:bg-white dark:border-white/25 dark:bg-white/10 dark:text-white dark:shadow-none dark:hover:bg-white/15"
              aria-label="Scroll next"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={trackRef}
        className="service-marketing-edge-x flex gap-4 overflow-x-auto pb-2 scroll-smooth sm:gap-5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {section.items.map((item) => (
          <article
            key={item.title}
            data-what-we-do-card
            className="service-what-we-do-card group/card flex w-[min(88vw,360px)] shrink-0 flex-col sm:w-[372px]"
          >
            <div className="service-what-we-do-card-surface flex h-full flex-col overflow-hidden rounded-2xl">
              <div className="relative overflow-hidden">
                <CardVisual visual={item.visual} image={cardImages?.[item.visual]} />
              </div>
              <div className="flex flex-1 flex-col px-5 pb-5 pt-5 sm:px-6 sm:pb-6 sm:pt-5">
                <h3 className="service-what-we-do-card-title text-lg font-bold leading-snug sm:text-xl">{item.title}</h3>
                <p className="service-what-we-do-card-body mt-2.5 text-sm leading-relaxed sm:text-[15px]">
                  {item.description}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ServiceLandingContent } from "@/lib/service-landing-types";
import { ServiceLandingVisual } from "@/components/pages/service-landing/ServiceLandingVisuals";
import { SEO_ORGANIC_GROWTH_IMAGES } from "@/content/service-landings/seo-organic-growth-assets";
import { cn } from "@/lib/utils";

type Step = ServiceLandingContent["processSteps"][number];

function resolveStoryPhoto(step: Step): { src: string; alt: string } {
  if (step.imageSrc) {
    return {
      src: step.imageSrc,
      alt: step.imageAlt ?? step.title,
    };
  }
  const fallback = SEO_ORGANIC_GROWTH_IMAGES.processStories[step.visual];
  return fallback ?? { src: DEFAULT_STORY_IMAGE, alt: step.title };
}

const DEFAULT_STORY_IMAGE = SEO_ORGANIC_GROWTH_IMAGES.processStories["seo-audit"].src;

export function ServiceProcessStoryRows({ steps }: { steps: Step[] }) {
  const rows = steps.slice(0, 3);
  if (!rows.length) return null;

  return (
    <div className="service-process-story-rows">
      {rows.map((step, index) => {
        const imageLeft = step.imageSide === "left";
        const photo = resolveStoryPhoto(step);

        return (
          <section
            key={step.title}
            className="service-process-story-row service-landing-section py-16 md:py-20 lg:py-24"
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 xl:max-w-[1180px]">
              <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-x-14 xl:gap-x-20">
                <StoryVisual
                  photo={photo}
                  visual={step.visual}
                  priority={index === 0}
                  className={cn("order-1", !imageLeft && "lg:order-2")}
                />

                <div className={cn("order-2 max-w-xl lg:max-w-none", !imageLeft && "lg:order-1")}>
                  <p className="service-process-story-eyebrow text-sm font-semibold">{step.eyebrow}</p>
                  <h2 className="service-process-story-title service-landing-section-title mt-3 text-[1.75rem] font-bold leading-[1.14] tracking-tight sm:text-4xl lg:text-[2.35rem]">
                    {step.title}
                  </h2>
                  <p className="service-process-story-body mt-5 text-base leading-relaxed sm:text-lg">{step.description}</p>
                  {step.linkHref && step.linkLabel ? (
                    <Link
                      href={step.linkHref}
                      className="service-process-story-link mt-8 inline-flex items-center gap-2 text-base font-semibold"
                    >
                      {step.linkLabel}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  ) : null}
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}

function StoryVisual({
  photo,
  visual,
  priority,
  className,
}: {
  photo: { src: string; alt: string };
  visual: Step["visual"];
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("service-process-story-visual relative mx-auto w-full max-w-xl lg:max-w-none", className)}>
      <div className="relative aspect-[5/4] overflow-hidden rounded-[1.75rem] sm:rounded-[2rem]">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority={priority}
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-brand-900/25 via-brand-900/5 to-brand-50/10 dark:from-brand-950/40 dark:via-transparent dark:to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center p-5 sm:p-8">
          <ServiceLandingVisual kind={visual} className="w-full max-w-[min(100%,340px)] shadow-2xl shadow-brand-900/25" />
        </div>
      </div>
    </div>
  );
}

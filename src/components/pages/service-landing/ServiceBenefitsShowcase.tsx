"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, useMotionTemplate, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { ServiceLandingContent } from "@/lib/service-landing-types";
import { cn } from "@/lib/utils";

const BENEFITS_HEADLINE_CLASS =
  "service-benefits-display-headline tracking-tight text-brand-900 dark:text-brand-50";

function BenefitsScrollHeadline({ text }: { text: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.92", "end 0.28"],
  });
  /** Clip from the right so dark copy reveals left → right; reverses on scroll up. */
  const clipInsetRight = useTransform(scrollYProgress, [0, 1], ["100%", "0%"]);
  const clipPath = useMotionTemplate`inset(0 ${clipInsetRight} 0 0)`;

  if (reduceMotion) {
    return (
      <h2 className={cn("service-benefits-headline-solid", BENEFITS_HEADLINE_CLASS)}>
        {text}
      </h2>
    );
  }

  return (
    <h2 ref={ref} className={cn("service-benefits-scroll-headline relative", BENEFITS_HEADLINE_CLASS)}>
      <span className="service-benefits-headline-muted-layer block">{text}</span>
      <motion.span
        aria-hidden
        className="service-benefits-headline-fill-layer pointer-events-none absolute inset-0 block"
        style={{ clipPath }}
      >
        {text}
      </motion.span>
    </h2>
  );
}

const DEFAULT_BENEFITS_IMAGE = "/images/services/seo-organic-growth/benefits-organic-analytics.png";

type Showcase = NonNullable<ServiceLandingContent["benefitsShowcase"]>;

export function ServiceBenefitsShowcase({ section }: { section: Showcase }) {
  const [openIndex, setOpenIndex] = useState(0);
  const imageSrc = section.imageSrc ?? DEFAULT_BENEFITS_IMAGE;
  const imageAlt = section.imageAlt ?? "Team member reviewing growth metrics";

  return (
    <section className="service-benefits-showcase service-landing-section service-section-full-bleed relative overflow-hidden py-16 md:py-24 lg:py-28">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 xl:max-w-[1180px]">
        <header className="max-w-6xl">
          <p className="service-benefits-eyebrow mb-4 text-base font-normal sm:mb-5">{section.eyebrow}</p>
          <BenefitsScrollHeadline text={section.headline} />
        </header>

        <div className="mt-10 max-w-xl md:mt-12 lg:mt-14 lg:max-w-[46%]">
          <h3 className="service-benefits-intro-title service-type-lead">{section.introTitle}</h3>
          <p className="service-benefits-intro-body service-type-body-lg mt-4">{section.introBody}</p>
        </div>

        <div className="mt-12 grid items-start gap-10 lg:mt-16 lg:grid-cols-2 lg:gap-x-14 xl:gap-x-20">
          <div className="service-benefits-photo relative aspect-[4/5] w-full overflow-hidden rounded-[1.75rem] sm:rounded-[2rem] lg:aspect-[5/6]">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={false}
            />
          </div>

          <div className="service-benefits-accordion-rillion w-full lg:pt-2">
            {section.items.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={item.title} className="service-benefits-accordion-item">
                  <button
                    type="button"
                    className="flex w-full items-start gap-4 py-5 text-left sm:py-6"
                    aria-expanded={isOpen}
                    onClick={() => setOpenIndex(index)}
                  >
                    <span className="service-benefits-accordion-title service-type-card-title min-w-0 flex-1">
                      {item.title}
                    </span>
                    <span
                      className={cn(
                        "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-300",
                        isOpen
                          ? "service-benefits-accordion-toggle-open border-transparent"
                          : "service-benefits-accordion-toggle-closed bg-transparent",
                      )}
                      aria-hidden
                    >
                      <ChevronDown
                        className={cn("h-5 w-5 transition-transform duration-300 ease-out", isOpen && "-rotate-180")}
                      />
                    </span>
                  </button>

                  <div
                    className={cn(
                      "grid transition-[grid-template-rows] duration-300 ease-out",
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="service-benefits-accordion-body pb-6 pr-14 text-base leading-[1.65] sm:pr-16 sm:text-lg">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

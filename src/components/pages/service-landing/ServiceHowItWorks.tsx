"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll } from "framer-motion";
import { BarChart3, Compass, ListTree, Rocket } from "lucide-react";
import type { ServiceLandingContent } from "@/lib/service-landing-types";
import { cn } from "@/lib/utils";

const STEP_META = [
  { tag: "Audit & baseline", Icon: Compass },
  { tag: "Prioritized roadmap", Icon: ListTree },
  { tag: "Ship with owners", Icon: Rocket },
  { tag: "Prove in GA4 & GSC", Icon: BarChart3 },
] as const;

type TrackMetrics = { top: number; height: number; lineX: number };

export function ServiceHowItWorks({
  title,
  subtitle,
  steps,
}: {
  title: string;
  subtitle: string;
  steps: ServiceLandingContent["howItWorksSteps"];
}) {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [track, setTrack] = useState<TrackMetrics | null>(null);
  const [fillHeight, setFillHeight] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const count = steps.length;

  /** Progress spans while the section is on screen — finishes before the block scrolls away. */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.88", "end 0.92"],
  });

  const measureTrack = useCallback(() => {
    const timeline = timelineRef.current;
    const nodes = nodeRefs.current.filter(Boolean) as HTMLSpanElement[];
    if (!timeline || nodes.length === 0) return;

    const tlRect = timeline.getBoundingClientRect();
    const centers = nodes.map((node) => {
      const r = node.getBoundingClientRect();
      return r.top + r.height / 2 - tlRect.top;
    });

    const top = centers[0];
    const height = Math.max(0, centers[centers.length - 1] - top);
    const first = nodes[0].getBoundingClientRect();
    const lineX = first.left + first.width / 2 - tlRect.left;
    setTrack({ top, height, lineX });
  }, []);

  useEffect(() => {
    const sync = () => measureTrack();
    sync();
    const raf = requestAnimationFrame(sync);
    const ro = new ResizeObserver(sync);
    if (timelineRef.current) ro.observe(timelineRef.current);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [measureTrack, count]);

  useEffect(() => {
    if (reduceMotion) {
      setActiveIndex(count - 1);
      if (track) setFillHeight(track.height);
      return;
    }
    if (!track) return;

    return scrollYProgress.on("change", (v) => {
      const progress = Math.max(0, Math.min(1, v));
      setFillHeight(progress * track.height);
      const idx =
        progress >= 0.985
          ? count - 1
          : Math.min(count - 1, Math.max(0, Math.floor(progress * count)));
      setActiveIndex(idx);
    });
  }, [reduceMotion, scrollYProgress, track, count]);

  const headerProgress = track && track.height > 0 ? Math.min(100, (fillHeight / track.height) * 100) : 0;

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="service-how-it-works service-how-it-works-timeline service-landing-section relative py-16 pb-28 md:py-20 md:pb-32 lg:py-28 lg:pb-36"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 xl:max-w-[1180px]">
        <div className="service-how-shell rounded-[1.75rem] sm:rounded-[2rem]">
          <div className="grid items-start gap-10 p-6 sm:p-8 md:gap-12 md:p-10 lg:grid-cols-[minmax(0,42%)_minmax(0,58%)] lg:gap-x-12 lg:p-12 xl:gap-x-16">
            <header className="service-how-intro lg:sticky lg:top-24 lg:z-[2] lg:self-start xl:top-28">
              <p className="service-landing-kicker mb-3">How it works</p>
              <h2 className="service-landing-section-title text-[1.75rem] font-bold leading-[1.14] tracking-tight sm:text-4xl lg:text-[2.35rem]">
                {title}
              </h2>
              <p className="service-landing-section-body mt-4 text-base leading-relaxed sm:mt-5 sm:text-lg">
                {subtitle}
              </p>

              <div className="service-how-progress-rail mt-8 hidden lg:block">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <span className="service-how-progress-label font-mono text-[11px] font-semibold uppercase tracking-[0.2em]">
                    Phase {String(activeIndex + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
                  </span>
                  <span className="service-how-progress-step text-sm font-semibold">{steps[activeIndex]?.title}</span>
                </div>
                <div className="service-how-progress-track h-1.5 overflow-hidden rounded-full">
                  <div
                    className="service-how-progress-fill h-full rounded-full transition-[width] duration-150 ease-out"
                    style={{ width: `${Math.max(8, headerProgress)}%` }}
                  />
                </div>
              </div>

            </header>

            <div
              ref={timelineRef}
              className="service-how-timeline service-how-timeline-center relative min-h-[28rem] lg:min-h-[36rem] lg:pb-8"
            >
              {track ? (
                <>
                  <div
                    className="service-how-timeline-track absolute w-[2px] -translate-x-1/2 rounded-full"
                    style={{ left: track.lineX, top: track.top, height: track.height }}
                    aria-hidden
                  />
                  <motion.div
                    className="service-how-timeline-fill absolute w-[2px] -translate-x-1/2 rounded-full"
                    style={{
                      left: track.lineX,
                      top: track.top,
                      height: Math.max(0, fillHeight),
                    }}
                    transition={{ duration: 0.12, ease: "easeOut" }}
                    aria-hidden
                  />
                </>
              ) : null}

              <ol className="relative space-y-0">
                {steps.map((step, index) => {
                  const reached = index <= activeIndex;
                  const isActive = index === activeIndex;
                  const isLast = index === count - 1;
                  const meta = STEP_META[index] ?? STEP_META[0];
                  const Icon = meta.Icon;
                  const contentRight = index % 2 === 1;

                  return (
                    <li
                      key={step.title}
                      className={cn("relative", isLast ? "pb-2 sm:pb-3 lg:pb-16" : "pb-5 sm:pb-6 lg:pb-8")}
                    >
                      <div className="service-how-timeline-node-anchor pointer-events-none absolute left-1/2 top-0 z-[3] -translate-x-1/2 -translate-y-1/2">
                        <span
                          ref={(el) => {
                            nodeRefs.current[index] = el;
                          }}
                          className={cn(
                            "service-how-timeline-node pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold tabular-nums sm:h-11 sm:w-11",
                            reached ? "service-how-timeline-node-active" : "service-how-timeline-node-idle",
                          )}
                        >
                          {index + 1}
                        </span>
                      </div>

                      <article
                        className={cn(
                          "service-how-step-card relative rounded-2xl px-5 pb-5 pt-10 sm:px-6 sm:pb-6 sm:pt-11",
                          "lg:max-w-[calc(50%-2rem)]",
                          contentRight ? "lg:ml-auto lg:pl-8" : "lg:mr-auto lg:pr-8",
                          reached && "service-how-step-card-reached",
                          isActive && "service-how-step-card-active",
                        )}
                      >
                        <div className="min-w-0">
                          <div className="mb-2 flex flex-wrap items-center gap-2">
                            <span className="service-how-step-tag inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
                              <Icon className="h-3 w-3 shrink-0 opacity-80" strokeWidth={2} />
                              {meta.tag}
                            </span>
                          </div>
                          <h3 className="service-how-timeline-step-title text-lg font-bold tracking-tight sm:text-xl">
                            {step.title}
                          </h3>
                          <p
                            className={cn(
                              "service-how-timeline-step-body mt-2 text-sm leading-relaxed sm:text-[15px] sm:leading-[1.65]",
                              !reached && "opacity-70",
                            )}
                          >
                            {step.description}
                          </p>
                        </div>
                      </article>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import type { RefObject } from "react";
import { motion } from "framer-motion";
import {
  CRM_CMS_LOGO_LABELS,
  CRM_CMS_MARQUEE_ORDER,
  CrmCmsLogo,
  type CrmCmsLogoKey,
} from "@/lib/crm-cms-stack-logos";
import { cn } from "@/lib/utils";

export function ServiceCrmCmsMarquee({
  title,
  logoOrder = CRM_CMS_MARQUEE_ORDER,
  variant = "stack",
  className,
  syncedScroll = false,
  marqueeTrackRef,
}: {
  title: string;
  logoOrder?: CrmCmsLogoKey[];
  /** `stack` — centered trust line + full-bleed logo row (below hero slider). */
  variant?: "stack" | "split";
  className?: string;
  /** When true, motion is driven by the hero showcase band (same px/s as slide carousel). */
  syncedScroll?: boolean;
  marqueeTrackRef?: RefObject<HTMLDivElement | null>;
}) {
  const row = [...logoOrder, ...logoOrder];

  if (variant === "split") {
    return (
      <section
        className={cn(
          "service-crm-cms-marquee relative overflow-hidden border-b border-gray-200/70 py-14 md:py-16 dark:border-white/[0.06]",
          className,
        )}
      >
        <div className="pointer-events-none absolute -left-20 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-brand-400/10 blur-3xl" aria-hidden />
        <div className="ambient-grain pointer-events-none absolute inset-0 opacity-[0.04]" aria-hidden />

        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,280px)_1fr] lg:items-center lg:gap-12">
          <div className="lg:border-l-2 lg:border-brand-500/40 lg:pl-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-400">Integrations</p>
            <p className="mt-2 text-2xl font-bold leading-tight text-gray-900 dark:text-white">Your CRM & CMS stack</p>
            <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-white/65">{title}</p>
          </div>

          <div className="marquee-container relative overflow-hidden rounded-2xl border border-gray-200/80 bg-white/50 py-6 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.03]">
            <MarqueeFadeEdges />
            <MarqueeTrack row={row} syncedScroll={syncedScroll} trackRef={marqueeTrackRef} />
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className={cn("service-crm-cms-marquee-stack relative pb-12 pt-4 md:pb-16 md:pt-6", className)}>
      <p className="service-crm-trust-line mx-auto mb-8 max-w-3xl px-4 text-center text-base leading-relaxed sm:text-[17px]">
        {title}
      </p>
      <div className={cn("marquee-container relative overflow-hidden", syncedScroll && "marquee-sync-container")}>
        <MarqueeFadeEdges />
        <MarqueeTrack row={row} compact syncedScroll={syncedScroll} trackRef={marqueeTrackRef} />
      </div>
    </div>
  );
}

function MarqueeFadeEdges() {
  return (
    <>
      <div
        className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-20 bg-gradient-to-r from-[var(--service-showcase-bg)] to-transparent sm:w-28"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-20 bg-gradient-to-l from-[var(--service-showcase-bg)] to-transparent sm:w-28"
        aria-hidden
      />
    </>
  );
}

function MarqueeTrack({
  row,
  compact,
  syncedScroll,
  trackRef,
}: {
  row: CrmCmsLogoKey[];
  compact?: boolean;
  syncedScroll?: boolean;
  trackRef?: RefObject<HTMLDivElement | null>;
}) {
  return (
    <div
      ref={trackRef}
      className={cn(
        "marquee-sync-track flex items-center will-change-transform",
        !syncedScroll && "animate-marquee",
        compact ? "gap-12 py-2 md:gap-16" : "gap-14 py-6 md:gap-16",
      )}
      style={{ width: "max-content" }}
    >
      {row.map((key, i) => (
        <motion.div
          key={`${key}-${i}`}
          whileHover={syncedScroll ? undefined : { scale: 1.03, y: -1 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
          className="flex h-9 shrink-0 items-center text-brand-800 opacity-[0.72] grayscale transition-[opacity,filter] hover:opacity-100 hover:grayscale-0 dark:text-brand-100 dark:opacity-[0.65]"
          title={CRM_CMS_LOGO_LABELS[key]}
        >
          <CrmCmsLogo id={key} className="h-7 w-auto min-w-[88px] max-w-[180px] md:h-8" />
          <span className="sr-only">{CRM_CMS_LOGO_LABELS[key]}</span>
        </motion.div>
      ))}
    </div>
  );
}

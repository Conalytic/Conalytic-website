"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Calendar, Sparkles, TrendingUp } from "lucide-react";
import { AmbientDotCanvas } from "@/components/visual/BrandAmbient";
import { SAAS_EASE, fadeUpChild, staggerContainer, viewportOnce } from "@/lib/motion";

const SPARK_POINTS = [12, 18, 16, 22, 20, 28, 34, 38, 42, 48, 52, 58];

function sparkPath(values: number[], w: number, h: number): string {
  const max = Math.max(...values, 1);
  const pad = 4;
  return values
    .map((v, i) => {
      const x = pad + (i / (values.length - 1)) * (w - pad * 2);
      const y = h - pad - (v / max) * (h - pad * 2);
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
}

function CtaMetricBento({ reduceMotion }: { reduceMotion: boolean | null }) {
  const path = sparkPath(SPARK_POINTS, 120, 44);

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className="service-final-cta-bento grid gap-3 sm:grid-cols-2 lg:grid-cols-1 lg:gap-3.5"
    >
      <motion.div
        variants={fadeUpChild}
        className="service-final-cta-glass service-final-cta-glass-feature sm:col-span-2 lg:col-span-1"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="service-final-cta-glass-label">Non-brand clicks</p>
            <p className="service-final-cta-glass-value mt-1 tabular-nums">
              +32<span className="text-[0.55em] font-semibold opacity-80">%</span>
            </p>
            <p className="service-final-cta-glass-meta mt-1">QoQ · GSC verified</p>
          </div>
          <span className="service-final-cta-chip">
            <TrendingUp className="h-3.5 w-3.5" aria-hidden />
            Live
          </span>
        </div>
        <svg viewBox="0 0 120 44" className="service-final-cta-spark mt-4 h-11 w-full" aria-hidden>
          <defs>
            <linearGradient id="cta-spark-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.35" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={`${path} L108 40 L12 40 Z`} fill="url(#cta-spark-fill)" className="text-emerald-400/80" />
          <motion.path
            d={path}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="text-emerald-300"
            initial={reduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 1.1, ease: SAAS_EASE }}
          />
        </svg>
      </motion.div>

      <motion.div variants={fadeUpChild} className="service-final-cta-glass">
        <p className="service-final-cta-glass-label">Index coverage</p>
        <div className="mt-3 flex items-end justify-between gap-2">
          <p className="service-final-cta-glass-value-sm tabular-nums">94%</p>
          <div className="service-final-cta-ring" aria-hidden>
            <svg viewBox="0 0 36 36" className="h-9 w-9 -rotate-90">
              <circle cx="18" cy="18" r="15" fill="none" stroke="currentColor" strokeWidth="3" className="opacity-20" />
              <motion.circle
                cx="18"
                cy="18"
                r="15"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                className="text-emerald-400"
                strokeDasharray={94.2}
                initial={reduceMotion ? { strokeDashoffset: 5.6 } : { strokeDashoffset: 94.2 }}
                whileInView={{ strokeDashoffset: 5.6 }}
                viewport={viewportOnce}
                transition={{ duration: 1, ease: SAAS_EASE }}
              />
            </svg>
          </div>
        </div>
        <p className="service-final-cta-glass-meta mt-2">Money pages · last crawl</p>
      </motion.div>

      <motion.div variants={fadeUpChild} className="service-final-cta-glass">
        <div className="flex items-center gap-2">
          <span className="service-final-cta-avatar-stack" aria-hidden>
            <span />
            <span />
            <span />
          </span>
          <p className="service-final-cta-glass-label">Program sync</p>
        </div>
        <p className="service-final-cta-glass-headline mt-2 text-sm font-semibold leading-snug">
          Roadmap, owners &amp; GA4 events aligned
        </p>
        <p className="service-final-cta-glass-meta mt-2">Updated this week</p>
      </motion.div>
    </motion.div>
  );
}

export function ServiceFinalCtaCard({
  eyebrow,
  title,
  description,
  ctaLabel,
  ctaHref,
  secondaryLabel,
  secondaryHref,
}: {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="service-final-cta-wrap service-landing-section service-section-full-bleed px-4 pb-20 pt-8 md:pb-28 md:pt-12">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.7, ease: SAAS_EASE }}
        className="service-final-cta-orbit relative mx-auto max-w-6xl"
      >
        <div className="service-final-cta-border-glow pointer-events-none absolute -inset-px rounded-[1.85rem] sm:rounded-[2.15rem]" aria-hidden />

        <div className="service-final-cta-panel relative overflow-hidden rounded-[1.75rem] sm:rounded-[2rem]">
          <div className="service-final-cta-aurora pointer-events-none absolute inset-0" aria-hidden />
          <div className="service-final-cta-gridlines pointer-events-none absolute inset-0 opacity-[0.45]" aria-hidden />
          {!reduceMotion ? (
            <AmbientDotCanvas className="service-final-cta-dots-motion pointer-events-none absolute inset-0 opacity-40 mix-blend-screen" />
          ) : (
            <div className="service-final-cta-dotfield pointer-events-none absolute inset-0" aria-hidden />
          )}

          <div className="relative z-10 grid gap-10 p-6 sm:p-8 md:p-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-12 xl:gap-16 xl:p-12">
            <div className="text-left">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="service-final-cta-live-pill inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em]">
                  <span className="service-final-cta-live-dot" aria-hidden />
                  {eyebrow}
                </span>
                <span className="service-final-cta-slot-pill hidden items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium sm:inline-flex">
                  <Calendar className="h-3.5 w-3.5 opacity-70" aria-hidden />
                  Strategy calls open
                </span>
              </div>

              <h2 className="service-final-cta-title service-type-section mt-5 leading-[1.08] tracking-tight">
                <span className="service-final-cta-title-shine block">{title}</span>
              </h2>

              <p className="service-final-cta-desc mt-4 max-w-xl text-base leading-relaxed sm:text-[1.05rem]">{description}</p>

              <ul className="mt-6 flex flex-wrap gap-2" aria-label="Outcomes">
                {["Indexation → pipeline", "GSC + GA4 native", "Ship weekly"].map((item) => (
                  <li key={item} className="service-final-cta-outcome-pill text-xs font-medium">
                    <Sparkles className="h-3 w-3 opacity-70" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <Link href={ctaHref} className="service-final-cta-button group inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-base font-bold">
                  {ctaLabel}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
                </Link>
                {secondaryHref && secondaryLabel ? (
                  <Link
                    href={secondaryHref}
                    className="service-final-cta-secondary group inline-flex items-center justify-center gap-1.5 rounded-full px-6 py-3.5 text-base font-semibold"
                  >
                    {secondaryLabel}
                    <ArrowUpRight className="h-4 w-4 opacity-70 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                  </Link>
                ) : null}
              </div>
            </div>

            <div className="relative lg:justify-self-end lg:pl-2">
              <div className="service-final-cta-bento-glow pointer-events-none absolute -inset-6 rounded-3xl" aria-hidden />
              <CtaMetricBento reduceMotion={reduceMotion} />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

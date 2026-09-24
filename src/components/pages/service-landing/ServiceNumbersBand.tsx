"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import type { ServiceLandingContent } from "@/lib/service-landing-types";
import { fadeUpChild, staggerContainer, viewportOnce } from "@/lib/motion";

function parseStatValue(raw: string): { end: number; suffix: string; decimal: boolean } | null {
  const m = raw.trim().match(/^([\d,.]+)(.*)$/);
  if (!m) return null;
  const num = parseFloat(m[1].replace(/,/g, ""));
  if (Number.isNaN(num)) return null;
  return { end: num, suffix: m[2] || "", decimal: m[1].includes(".") };
}

function formatStatAmount(parsed: { end: number; suffix: string; decimal: boolean }, amount: number) {
  const numStr = parsed.decimal ? amount.toFixed(1) : Math.floor(amount).toLocaleString();
  return `${numStr}${parsed.suffix}`;
}

function CountUpValue({ value, run }: { value: string; run: boolean }) {
  const reduceMotion = useReducedMotion();
  const parsed = parseStatValue(value);
  const [text, setText] = useState(() => (parsed ? formatStatAmount(parsed, 0) : value));

  useEffect(() => {
    const p = parseStatValue(value);
    if (!p) {
      setText(value);
      return;
    }
    if (reduceMotion || !run) {
      setText(formatStatAmount(p, p.end));
      return;
    }

    setText(formatStatAmount(p, 0));
    let raf = 0;
    const duration = 2000;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setText(formatStatAmount(p, eased * p.end));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, value, reduceMotion]);

  return <span>{text}</span>;
}

export function ServiceNumbersBand({
  title,
  stats,
}: {
  title: string;
  stats: ServiceLandingContent["stats"];
}) {
  const stripRef = useRef<HTMLDivElement>(null);
  const [runCountUp, setRunCountUp] = useState(false);

  const inView = useInView(stripRef, {
    once: true,
    amount: 0.4,
    margin: "0px 0px -8% 0px",
  });

  useEffect(() => {
    if (inView) setRunCountUp(true);
  }, [inView]);

  /** Fallback if useInView misses (e.g. restored scroll position before layout). */
  useEffect(() => {
    const el = stripRef.current;
    if (!el || runCountUp) return;

    const check = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 0;
      if (rect.top < vh * 0.92 && rect.bottom > vh * 0.08) setRunCountUp(true);
    };

    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [runCountUp]);

  const items = stats.slice(0, 3);

  return (
    <section className="service-numbers-band service-landing-section relative overflow-hidden py-14 md:py-16">
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-[1180px]">
        <div className="mb-7 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="service-numbers-eyebrow mb-2 text-[11px] font-semibold uppercase tracking-[0.22em]">
              Proof in the data
            </p>
            <h2 className="service-numbers-band-title text-xl font-bold tracking-tight sm:text-2xl md:text-[1.65rem]">
              {title}
            </h2>
          </div>
          <p className="service-numbers-meta font-mono text-[11px] uppercase tracking-wider">Live program metrics</p>
        </div>

        <motion.div
          ref={stripRef}
          className="service-numbers-strip"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <div className="service-numbers-strip-grid">
            {items.map((stat, index) => (
              <motion.div key={stat.label} variants={fadeUpChild} className="service-numbers-cell group">
                <div className="service-numbers-cell-accent" aria-hidden />
                <div className="relative flex flex-col gap-2.5 sm:gap-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-[11px] font-medium tracking-[0.18em] text-brand-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-success)]" aria-hidden />
                  </div>
                  <p className="service-numbers-value text-[2.35rem] font-bold leading-none tabular-nums tracking-tight sm:text-[2.65rem] lg:text-[2.75rem]">
                    <CountUpValue value={stat.value} run={runCountUp} />
                  </p>
                  <p className="service-numbers-label max-w-[15rem] text-[13px] leading-snug sm:text-sm">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

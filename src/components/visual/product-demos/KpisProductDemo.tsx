"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { DemoFrame, DemoHeader } from "@/components/visual/product-demos/DemoFrame";
import { MARKETING_STACK_LOGOS } from "@/lib/marketing-stack-logos";
import { cn } from "@/lib/utils";

const KPIS = [
  { label: "Sessions", value: "24.5k", delta: "+12%", status: "On track", tone: "emerald" as const, spark: [42, 48, 52, 58, 64, 72] },
  { label: "Conversions", value: "2,549", delta: "+23%", status: "On track", tone: "emerald" as const, spark: [30, 38, 45, 55, 68, 80] },
  { label: "GSC Clicks", value: "18.2k", delta: "-4%", status: "At risk", tone: "amber" as const, spark: [70, 65, 58, 52, 48, 44] },
  { label: "Ads ROAS", value: "4.32×", delta: "+18%", status: "On track", tone: "emerald" as const, spark: [35, 42, 50, 55, 62, 70] },
];

const STATUS_CLASS = {
  emerald: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  amber: "border-amber-500/30 bg-amber-500/10 text-amber-300",
  red: "border-red-500/30 bg-red-500/10 text-red-300",
};

const PLATFORMS = [
  { src: MARKETING_STACK_LOGOS.googleAnalytics4, label: "GA4" },
  { src: MARKETING_STACK_LOGOS.googleSearchConsole, label: "GSC" },
  { src: MARKETING_STACK_LOGOS.googleAds, label: "Ads" },
];

function Sparkline({ points, animate, compact }: { points: number[]; animate: boolean; compact?: boolean }) {
  const max = Math.max(...points);
  return (
    <div className={cn("mt-auto flex items-end gap-px", compact ? "h-4" : "h-6")}>
      {points.map((p, i) => (
        <motion.div
          key={i}
          className="flex-1 rounded-sm bg-brand-500"
          initial={{ height: 0, opacity: 0.3 }}
          animate={{ height: animate ? `${(p / max) * 100}%` : 0, opacity: 0.4 + i * 0.08 }}
          transition={{ duration: 0.4, delay: i * 0.06 }}
        />
      ))}
    </div>
  );
}

function KpisCore({ compact }: { compact?: boolean }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={cn(compact ? "flex h-full flex-col" : undefined)}>
      {!compact ? <DemoHeader title="KPIs Tracker" badge="Live" /> : null}
      <div
        className={cn(
          "grid w-full",
          compact
            ? "h-full flex-1 grid-cols-2 content-center items-stretch gap-2 px-2.5 py-2"
            : "grid-cols-2 gap-2.5 p-4 sm:p-5",
        )}
      >
        {KPIS.slice(0, compact ? 2 : 4).map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }}
            className={cn(
              "flex flex-col rounded-xl border border-white/[0.08] bg-white/[0.03]",
              compact ? "justify-between p-2" : "p-2.5 sm:p-3",
            )}
          >
            <div className="mb-1 flex items-center justify-between gap-1">
              <span className={cn("font-medium text-white/45", compact ? "text-[8px]" : "text-[9px]")}>
                {kpi.label}
              </span>
              {!compact ? (
                <span className={cn("rounded-full border px-1.5 py-0.5 text-[7px] font-bold", STATUS_CLASS[kpi.tone])}>
                  {kpi.status}
                </span>
              ) : null}
            </div>
            <p className={cn("font-bold text-white", compact ? "text-xs" : "text-sm sm:text-base")}>{kpi.value}</p>
            <p className={cn("font-semibold text-brand-300", compact ? "mb-1 text-[8px]" : "mb-1.5 text-[9px]")}>
              {kpi.delta}
            </p>
            <Sparkline points={kpi.spark} animate={ready} compact={compact} />
          </motion.div>
        ))}
      </div>
      {!compact ? (
        <div className="border-t border-white/[0.06] px-4 pb-4 pt-3 sm:px-5">
          <p className="mb-2 text-[9px] font-bold uppercase tracking-wider text-white/35">6-month trend</p>
          <div className="flex items-end gap-1 h-12">
            {[32, 38, 42, 48, 55, 62, 70, 78, 85, 92].map((h, i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-t bg-brand-500"
                initial={{ height: 0 }}
                animate={{ height: ready ? `${h}%` : 0 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.05 }}
                style={{ opacity: 0.35 + i * 0.06 }}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function KpisProductDemo({ compact = false, embedded = false }: { compact?: boolean; embedded?: boolean }) {
  if (compact) {
    return (
      <DemoFrame float={false} glow={!embedded} embedded={embedded} className="h-full w-full">
        <KpisCore compact />
      </DemoFrame>
    );
  }

  return (
    <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center gap-6 px-4 lg:flex-row lg:items-center lg:justify-center">
      <div className="w-full max-w-lg flex-1">
        <DemoFrame>
          <KpisCore />
        </DemoFrame>
      </div>
      <div className="flex gap-3 lg:flex-col">
        {PLATFORMS.map((p, i) => (
          <motion.div
            key={p.label}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#1a1b1e] px-3 py-2 shadow-lg"
          >
            <Image src={p.src} alt="" width={20} height={20} className="h-5 w-5 object-contain" />
            <span className="text-[10px] font-semibold text-white/50">{p.label}</span>
            <span className="ml-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

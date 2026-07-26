"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { DemoFrame, DemoHeader } from "@/components/visual/product-demos/DemoFrame";
import {
  ANALYTICS_DEMO_BODY_CLASS,
  ANALYTICS_DEMO_CHART_WRAP_CLASS,
  ANALYTICS_DEMO_KEY_FINDING_CLASS,
  ANALYTICS_DEMO_KEY_FINDING_LABEL_CLASS,
  analyticsDemoBarStyle,
} from "@/components/visual/product-demos/analytics-demo";
import { conalyticLogoAlt } from "@/lib/image-alt";
import { cn } from "@/lib/utils";

const QUESTION = "Which campaigns drove conversions this week?";
const BARS = [
  { label: "Summer", h: 72 },
  { label: "Brand", h: 48 },
  { label: "Launch", h: 86 },
  { label: "Retarget", h: 58 },
  { label: "Always", h: 64 },
];

function ChatCore({ compact }: { compact?: boolean }) {
  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState<"typing" | "chart" | "done">("typing");
  const [bars, setBars] = useState(0);
  const chartMax = compact ? 48 : 64;

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      i++;
      setTyped(QUESTION.slice(0, i));
      if (i >= QUESTION.length) {
        clearInterval(t);
        setTimeout(() => {
          setPhase("chart");
          BARS.forEach((_, idx) => setTimeout(() => setBars((b) => Math.max(b, idx + 1)), idx * 90));
          setTimeout(() => setPhase("done"), BARS.length * 90 + 350);
        }, 300);
      }
    }, 32);
    return () => clearInterval(t);
  }, []);

  return (
    <div className={cn(compact && "flex h-full flex-col")}>
      {!compact ? <DemoHeader title="Conalytic" badge="4 sources live" /> : null}
      <div
        className={cn(
          "flex flex-1 flex-col justify-center",
          compact ? "gap-2 p-2.5" : ANALYTICS_DEMO_BODY_CLASS,
        )}
      >
        <div className="rounded-xl border border-gray-200/80 dark:border-white/[0.06] bg-gray-50/90 dark:bg-white/[0.05] px-3 py-2.5 text-xs text-gray-700 dark:text-white/80 sm:text-sm">
          {typed}
          {phase === "typing" && typed.length < QUESTION.length ? (
            <span className="ml-0.5 inline-block h-3.5 w-0.5 animate-pulse bg-brand-500 align-middle dark:bg-brand-400" />
          ) : null}
        </div>
        {phase !== "typing" ? (
          <div className="space-y-2.5">
            <div className="flex items-center gap-2">
              <div className="brand-ink-badge flex h-6 w-6 items-center justify-center rounded-full text-[8px] font-bold">
                CA
              </div>
              <span className="text-[10px] font-semibold text-gray-600 dark:text-white/60">Answered in 2.8s</span>
            </div>
            <div className={ANALYTICS_DEMO_CHART_WRAP_CLASS}>
              <p className="mb-2 text-[9px] font-bold uppercase tracking-wider text-gray-400 dark:text-white/35">
                Conversions by campaign
              </p>
              <div className="flex items-end gap-1.5" style={{ height: chartMax }}>
                {BARS.map((bar, i) => (
                  <div key={bar.label} className="flex flex-1 flex-col items-center justify-end gap-0.5">
                    <div
                      className="w-full rounded-t transition-all duration-500"
                      style={{
                        ...analyticsDemoBarStyle(
                          i < bars ? Math.round((bar.h / 100) * chartMax) : 0,
                          i,
                        ),
                      }}
                    />
                    <span className="text-[7px] text-gray-400 dark:text-white/30">{bar.label}</span>
                  </div>
                ))}
              </div>
            </div>
            {phase === "done" && !compact ? (
              <div className={ANALYTICS_DEMO_KEY_FINDING_CLASS}>
                <span className={ANALYTICS_DEMO_KEY_FINDING_LABEL_CLASS}>↑ Key finding</span>
                <span className="text-[10px] leading-relaxed text-gray-600 dark:text-white/60">
                  Product Launch leads with 2,549 conversions — 23% above last week.
                </span>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function ChatProductDemo({ compact = false, embedded = false }: { compact?: boolean; embedded?: boolean }) {
  if (compact) {
    return (
      <DemoFrame float={false} glow={!embedded} embedded={embedded} className="h-full w-full">
        <ChatCore compact />
      </DemoFrame>
    );
  }

  return (
    <div className="relative mx-auto w-full max-w-lg">
      <DemoFrame>
        <div className="flex items-center gap-2 border-b border-gray-200/80 dark:border-white/[0.08] px-4 py-3">
          <Image src="/logo-icon.png" alt={conalyticLogoAlt("icon")} width={22} height={22} className="rounded-md" />
          <span className="text-xs font-bold text-brand-600 dark:text-brand-300">AI Analyst</span>
        </div>
        <ChatCore />
      </DemoFrame>
    </div>
  );
}

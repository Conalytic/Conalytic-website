"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { DemoFrame, DemoHeader } from "@/components/visual/product-demos/DemoFrame";
import { MARKETING_STACK_LOGOS } from "@/lib/marketing-stack-logos";
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
const ORBITS = [
  { src: MARKETING_STACK_LOGOS.googleAnalytics4, label: "GA4", x: "-18%", y: "8%" },
  { src: MARKETING_STACK_LOGOS.metaAds, label: "Meta", x: "-14%", y: "72%" },
  { src: MARKETING_STACK_LOGOS.googleAds, label: "Ads", x: "88%", y: "6%" },
  { src: MARKETING_STACK_LOGOS.googleSearchConsole, label: "GSC", x: "90%", y: "70%" },
];

function OrbitIcon({ src, label, x, y, delay }: { src: string; label: string; x: string; y: string; delay: number }) {
  return (
    <motion.div
      className="absolute z-10 flex flex-col items-center gap-1"
      style={{ left: x, top: y }}
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 4 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#1a1b1e] shadow-lg shadow-brand-500/10 sm:h-12 sm:w-12">
        <Image src={src} alt="" width={24} height={24} className="h-5 w-5 object-contain sm:h-6 sm:w-6" />
      </div>
      <span className="text-[8px] font-semibold text-white/40">{label}</span>
    </motion.div>
  );
}

function ChatCore({ compact }: { compact?: boolean }) {
  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState<"typing" | "chart" | "done">("typing");
  const [bars, setBars] = useState(0);

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
          compact ? "gap-2 p-2.5" : "space-y-3 p-4 sm:p-5",
        )}
      >
        <div className="rounded-xl bg-white/[0.05] px-3 py-2.5 text-xs text-white/80 sm:text-sm">
          {typed}
          {phase === "typing" && typed.length < QUESTION.length ? (
            <span className="ml-0.5 inline-block h-3.5 w-0.5 animate-pulse bg-brand-500 align-middle" />
          ) : null}
        </div>
        {phase !== "typing" ? (
          <div className="space-y-2.5">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-600 text-[8px] font-bold text-brand-500">
                CA
              </div>
              <span className="text-[10px] font-semibold text-white/60">Answered in 2.8s</span>
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-3">
              <p className="mb-2 text-[9px] font-bold uppercase tracking-wider text-white/35">
                Conversions by campaign
              </p>
              <div className="flex items-end gap-1.5" style={{ height: compact ? 48 : 64 }}>
                {BARS.map((bar, i) => (
                  <div key={bar.label} className="flex flex-1 flex-col items-center justify-end gap-0.5">
                    <div
                      className="w-full rounded-t bg-brand-500 transition-all duration-500"
                      style={{
                        height: i < bars ? `${(bar.h / 100) * (compact ? 48 : 64)}px` : 0,
                        opacity: 0.5 + i * 0.1,
                      }}
                    />
                    <span className="text-[7px] text-white/30">{bar.label}</span>
                  </div>
                ))}
              </div>
            </div>
            {phase === "done" && !compact ? (
              <div className="rounded-xl border border-brand-500/20 bg-brand-500/10 px-3 py-2">
                <p className="text-[10px] font-bold text-brand-300">Key finding</p>
                <p className="mt-0.5 text-[10px] leading-relaxed text-white/55">
                  Product Launch leads with 2,549 conversions — 23% above last week.
                </p>
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
    <div className="relative mx-auto w-full max-w-3xl px-4">
      {/* Connection beams */}
      <svg className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-40" aria-hidden>
        <motion.line x1="12%" y1="20%" x2="38%" y2="42%" stroke="#c9ff33" strokeWidth="1" strokeDasharray="4 6"
          animate={{ strokeDashoffset: [0, -20] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
        <motion.line x1="12%" y1="78%" x2="38%" y2="58%" stroke="#c9ff33" strokeWidth="1" strokeDasharray="4 6"
          animate={{ strokeDashoffset: [0, -20] }} transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }} />
        <motion.line x1="88%" y1="18%" x2="62%" y2="42%" stroke="#c9ff33" strokeWidth="1" strokeDasharray="4 6"
          animate={{ strokeDashoffset: [0, -20] }} transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }} />
        <motion.line x1="88%" y1="80%" x2="62%" y2="58%" stroke="#c9ff33" strokeWidth="1" strokeDasharray="4 6"
          animate={{ strokeDashoffset: [0, -20] }} transition={{ duration: 2.6, repeat: Infinity, ease: "linear" }} />
      </svg>

      {ORBITS.map((o, i) => (
        <OrbitIcon key={o.label} {...o} delay={i * 0.4} />
      ))}

      <div className="relative z-20 mx-auto max-w-md pt-8 sm:max-w-lg sm:pt-10">
        <DemoFrame>
          <div className="flex items-center gap-2 border-b border-white/[0.08] px-4 py-3">
            <Image src="/logo-icon.png" alt={conalyticLogoAlt("icon")} width={22} height={22} className="rounded-md" />
            <span className="text-xs font-bold text-brand-300">AI Analyst</span>
          </div>
          <ChatCore />
        </DemoFrame>
      </div>
    </div>
  );
}

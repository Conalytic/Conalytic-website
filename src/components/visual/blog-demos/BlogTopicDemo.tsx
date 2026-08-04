"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Check, FileText, Globe, Monitor, Sparkles } from "lucide-react";
import { analyticsDemoBarFill } from "@/components/visual/product-demos/analytics-demo";
import type { BlogDemoVariant } from "@/lib/blog-demo-variants";
import { cn } from "@/lib/utils";

function DemoShell({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="flex h-full flex-col justify-center p-2.5 sm:p-3">
      <p className="mb-2 text-center text-[8px] font-bold uppercase tracking-widest text-brand-400/80">{label}</p>
      {children}
    </div>
  );
}

/** Brief 1 — GSC stable, GA4 sessions falling */
function Ga4TrafficDropDemo() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setStep((s) => (s < 8 ? s + 1 : s)), 400);
    return () => clearInterval(t);
  }, []);
  const gsc = [62, 64, 63, 65, 64, 63, 64, 65, 64];
  const ga4 = [62, 60, 55, 48, 42, 38, 35, 32, 30];
  return (
    <DemoShell label="GSC vs GA4">
      <div className="space-y-3">
        {[
          { name: "GSC Clicks", data: gsc, color: "bg-brand-400" },
          { name: "GA4 Sessions", data: ga4, color: "bg-red-400" },
        ].map((line) => (
          <div key={line.name}>
            <div className="mb-1 flex justify-between text-[8px] text-white/50">
              <span>{line.name}</span>
              <span className={line.name.includes("GA4") ? "text-red-400" : "text-brand-300"}>
                {line.data[Math.min(step, line.data.length - 1)]}%
              </span>
            </div>
            <div className="flex h-8 items-end gap-0.5">
              {line.data.map((h, i) => (
                <motion.div
                  key={i}
                  className={cn("flex-1 rounded-t", line.color, i <= step ? "opacity-100" : "opacity-20")}
                  initial={{ height: 0 }}
                  animate={{ height: i <= step ? `${h}%` : "20%" }}
                  transition={{ duration: 0.35 }}
                />
              ))}
            </div>
          </div>
        ))}
        {step >= 6 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-2 py-1.5 text-[8px] leading-relaxed text-amber-200"
          >
            Stable clicks + falling sessions = measurement issue
          </motion.p>
        ) : null}
      </div>
    </DemoShell>
  );
}

/** Brief 2 — typing GA4 questions */
function AskGa4Demo() {
  const questions = [
    "Which channel lost conversions?",
    "What changed on mobile last week?",
    "Top landing pages by revenue?",
  ];
  const [qIdx, setQIdx] = useState(0);
  const [typed, setTyped] = useState("");
  useEffect(() => {
    const q = questions[qIdx];
    let i = 0;
    const type = setInterval(() => {
      i++;
      setTyped(q.slice(0, i));
      if (i >= q.length) {
        clearInterval(type);
        setTimeout(() => {
          setQIdx((x) => (x + 1) % questions.length);
          setTyped("");
        }, 1800);
      }
    }, 40);
    return () => clearInterval(type);
  }, [qIdx]);
  return (
    <DemoShell label="Natural language analytics">
      <div className="rounded-xl border border-white/10 bg-white/[0.04] p-2.5">
        <div className="mb-2 text-[8px] text-white/40">Ask GA4</div>
        <div className="min-h-[28px] text-[10px] text-white/85">
          {typed}
          <span className="ml-0.5 inline-block h-3 w-0.5 animate-pulse bg-brand-400" />
        </div>
        <motion.div
          key={qIdx}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 rounded-lg bg-brand-500/10 px-2 py-1.5 text-[8px] text-brand-200"
        >
          <Check className="mb-0.5 inline h-2.5 w-2.5 text-brand-300" /> Scoped answer with chart
        </motion.div>
      </div>
    </DemoShell>
  );
}

/** Brief 3 — AI channel slice growing */
function AiTrafficGa4Demo() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setPct((p) => (p < 4.2 ? p + 0.3 : 4.2)), 200);
    return () => clearInterval(t);
  }, []);
  const segments = [
    { label: "Organic", w: 52 },
    { label: "Paid", w: 28 },
    { label: "Direct", w: 16 },
    { label: "AI", w: pct },
  ];
  return (
    <DemoShell label="AI assistant channel">
      <div className="flex h-6 overflow-hidden rounded-full">
        {segments.map((s, i) => (
          <motion.div
            key={s.label}
            className="h-full"
            style={{
              width: `${s.w}%`,
              ...analyticsDemoBarFill(i, 0.15, 0.5),
            }}
            animate={{ width: `${s.w}%` }}
          />
        ))}
      </div>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {segments.map((s, i) => (
          <span key={s.label} className="text-[7px] text-white/45">
            <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full" style={analyticsDemoBarFill(i, 0.3, 0.6)} />
            {s.label} {s.label === "AI" ? `${pct.toFixed(1)}%` : ""}
          </span>
        ))}
      </div>
      <p className="mt-2 text-[7px] text-white/35">Report share of sessions, not volume alone</p>
    </DemoShell>
  );
}

/** Brief 4 — Ads vs GA4 mismatch */
function AdsGa4DiscrepancyDemo() {
  const [pulse, setPulse] = useState(false);
  useEffect(() => {
    const t = setInterval(() => setPulse((p) => !p), 1200);
    return () => clearInterval(t);
  }, []);
  return (
    <DemoShell label="Conversion mismatch">
      <div className="grid grid-cols-2 gap-2">
        {[
          { label: "Google Ads", value: "847", sub: "Last-click" },
          { label: "GA4", value: "612", sub: "Data-driven" },
        ].map((box) => (
          <div key={box.label} className="rounded-xl border border-white/10 bg-white/[0.04] p-2 text-center">
            <p className="text-[7px] text-white/40">{box.label}</p>
            <motion.p
              animate={{ scale: pulse ? 1.05 : 1 }}
              className="text-lg font-bold text-white"
            >
              {box.value}
            </motion.p>
            <p className="text-[7px] text-white/35">{box.sub}</p>
          </div>
        ))}
      </div>
      <motion.div
        animate={{ opacity: pulse ? 1 : 0.6 }}
        className="mt-2 flex items-center justify-center gap-1 text-[8px] text-amber-300"
      >
        <AlertTriangle className="h-3 w-3" />
        28% gap — check attribution window
      </motion.div>
    </DemoShell>
  );
}

/** Brief 5 — slide deck stack */
function ReportStructureDemo() {
  const slides = ["Executive Summary", "KPI Snapshot", "Cross-Source Findings", "Action Plan"];
  return (
    <DemoShell label="Report structure">
      <div className="relative mx-auto h-28 w-full max-w-[200px]">
        {slides.map((title, i) => (
          <motion.div
            key={title}
            className="absolute left-1/2 top-1/2 w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-lg border border-white/10 bg-[#1a1b1e] p-2 shadow-lg"
            style={{ zIndex: slides.length - i }}
            animate={{ y: [-20 + i * 6, -22 + i * 6, -20 + i * 6], rotate: -4 + i * 2 }}
            transition={{ duration: 4, repeat: Infinity, delay: i * 0.2 }}
          >
            <FileText className="mb-1 h-2.5 w-2.5 text-brand-400" />
            <p className="text-[7px] font-semibold text-white/70">{title}</p>
          </motion.div>
        ))}
      </div>
    </DemoShell>
  );
}

/** Brief 6 — HTML vs PDF vs dashboard */
function HtmlPdfDashboardDemo() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % 3), 2200);
    return () => clearInterval(t);
  }, []);
  const formats = [
    { icon: Globe, label: "HTML", desc: "Share link" },
    { icon: FileText, label: "PDF", desc: "Archive" },
    { icon: Monitor, label: "Live", desc: "Real-time" },
  ];
  return (
    <DemoShell label="Client deliverable formats">
      <div className="grid grid-cols-3 gap-1.5">
        {formats.map((f, i) => (
          <motion.div
            key={f.label}
            animate={{
              scale: active === i ? 1.05 : 1,
              borderColor: active === i ? "rgba(148,163,184,0.5)" : "rgba(255,255,255,0.1)",
            }}
            className="rounded-lg border bg-white/[0.04] p-2 text-center"
          >
            <f.icon className="mx-auto mb-1 h-4 w-4 text-brand-400" />
            <p className="text-[8px] font-bold text-white/80">{f.label}</p>
            <p className="text-[6px] text-white/35">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </DemoShell>
  );
}

/** Brief 7 — three sources converging */
function CrossChannelDemo() {
  const [merged, setMerged] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMerged(true), 800);
    const loop = setInterval(() => setMerged((m) => !m), 3000);
    return () => {
      clearTimeout(t);
      clearInterval(loop);
    };
  }, []);
  return (
    <DemoShell label="Cross-channel view">
      <div className="relative flex h-24 items-center justify-center">
        {["GSC", "GA4", "Ads"].map((src, i) => (
          <motion.div
            key={src}
            className="absolute rounded-full border border-brand-500/30 bg-brand-500/10 px-2 py-1 text-[8px] font-bold text-brand-200"
            animate={
              merged
                ? { x: 0, y: 0, opacity: 0 }
                : { x: Math.cos((i * 2 * Math.PI) / 3) * 36, y: Math.sin((i * 2 * Math.PI) / 3) * 28, opacity: 1 }
            }
            transition={{ duration: 0.6 }}
          >
            {src}
          </motion.div>
        ))}
        <motion.div
          animate={{ scale: merged ? 1 : 0.5, opacity: merged ? 1 : 0 }}
          className="rounded-xl border border-brand-400/40 bg-brand-500/15 px-3 py-2 text-[8px] font-bold text-brand-100"
        >
          One story
        </motion.div>
      </div>
    </DemoShell>
  );
}

/** Brief 8 — AI vs human verification */
function AiReportsDemo() {
  const [phase, setPhase] = useState<"ai" | "human">("ai");
  useEffect(() => {
    const t = setInterval(() => setPhase((p) => (p === "ai" ? "human" : "ai")), 2500);
    return () => clearInterval(t);
  }, []);
  return (
    <DemoShell label="AI report governance">
      <motion.div
        key={phase}
        initial={{ opacity: 0, x: 8 }}
        animate={{ opacity: 1, x: 0 }}
        className="rounded-xl border border-white/10 bg-white/[0.04] p-2.5"
      >
        {phase === "ai" ? (
          <>
            <div className="mb-1 flex items-center gap-1 text-[8px] text-violet-300">
              <Sparkles className="h-3 w-3" /> AI draft
            </div>
            <p className="text-[8px] leading-relaxed text-white/60">
              Paid search CPC rose 14% while organic clicks on brand terms fell 8%...
            </p>
          </>
        ) : (
          <>
            <div className="mb-1 flex items-center gap-1 text-[8px] text-brand-300">
              <Check className="h-3 w-3" /> Human verified
            </div>
            <div className="space-y-1">
              {["Numbers match source", "Causation checked", "Budget realistic"].map((c) => (
                <p key={c} className="flex items-center gap-1 text-[7px] text-white/50">
                  <Check className="h-2 w-2 text-brand-400" /> {c}
                </p>
              ))}
            </div>
          </>
        )}
      </motion.div>
    </DemoShell>
  );
}

/** Brief 9 — target with comparison window */
function KpiTargetsDemo() {
  const [fill, setFill] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setFill((f) => (f < 72 ? f + 4 : 72)), 150);
    return () => clearInterval(t);
  }, []);
  return (
    <DemoShell label="KPI target setting">
      <div className="text-center">
        <p className="text-[8px] text-white/40">Sessions vs prior year</p>
        <p className="text-xl font-bold text-white">+10%</p>
        <p className="mb-2 text-[7px] text-white/35">Target: 24,500 · Baseline: YoY same month</p>
        <div className="mx-auto h-2 w-full overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full bg-brand-400"
            animate={{ width: `${fill}%` }}
          />
        </div>
        <p className="mt-1 text-[8px] text-brand-300">72% to target — On track</p>
      </div>
    </DemoShell>
  );
}

/** Brief 10 — deterministic status pills */
function KpiStatusDemo() {
  const statuses = [
    { label: "On track", tone: "brand" },
    { label: "At risk", tone: "amber" },
    { label: "Off track", tone: "red" },
    { label: "No data", tone: "gray" },
  ];
  const [flash, setFlash] = useState(-1);
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      setFlash(i % statuses.length);
      i++;
    }, 900);
    return () => clearInterval(t);
  }, []);
  const toneClass: Record<string, string> = {
    brand: "border-brand-400/40 bg-brand-400/15 text-brand-300",
    amber: "border-amber-500/40 bg-amber-500/15 text-amber-300",
    red: "border-red-500/40 bg-red-500/15 text-red-300",
    gray: "border-white/20 bg-white/5 text-white/50",
  };
  return (
    <DemoShell label="Rules-based status">
      <div className="grid grid-cols-2 gap-1.5">
        {statuses.map((s, i) => (
          <motion.div
            key={s.label}
            animate={{ scale: flash === i ? 1.08 : 1 }}
            className={cn("rounded-lg border px-2 py-1.5 text-center text-[8px] font-bold", toneClass[s.tone])}
          >
            {s.label}
          </motion.div>
        ))}
      </div>
      <p className="mt-2 text-center text-[7px] text-white/35">Same inputs → same label every time</p>
    </DemoShell>
  );
}

const DEMOS: Record<BlogDemoVariant, React.FC> = {
  "ga4-traffic-drop": Ga4TrafficDropDemo,
  "ask-ga4": AskGa4Demo,
  "ai-traffic-ga4": AiTrafficGa4Demo,
  "ads-ga4-discrepancy": AdsGa4DiscrepancyDemo,
  "report-structure": ReportStructureDemo,
  "html-pdf-dashboard": HtmlPdfDashboardDemo,
  "cross-channel": CrossChannelDemo,
  "ai-reports": AiReportsDemo,
  "kpi-targets": KpiTargetsDemo,
  "kpi-status": KpiStatusDemo,
};

export function BlogTopicDemo({ variant, compact = true }: { variant: BlogDemoVariant; compact?: boolean }) {
  const Demo = DEMOS[variant];
  return (
    <div className={cn("h-full w-full", compact && "min-h-[140px]")} role="img" aria-label={`${variant} illustration`}>
      <Demo />
    </div>
  );
}

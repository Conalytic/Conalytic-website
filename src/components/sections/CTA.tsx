"use client";

/** Footer-adjacent CTA with line-chart demo + key finding; primary button respects external vs internal hrefs. */
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { handleSamePageHashClick } from "@/lib/hash-nav";
import { isExternalNavigationHref } from "@/lib/utils";
import {
  SAAS_EASE,
  staggerContainer,
  fadeUpChild,
  viewportOnce,
} from "@/lib/motion";

const MONTHS = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];

type CtaQuery = {
  q: string;
  chartTitle: string;
  legendCurrent: string;
  legendPrior: string;
  current: number[];
  prior: number[];
  insight: string;
};

const QUERIES: CtaQuery[] = [
  {
    q: "Which campaign drove the most conversions last week?",
    chartTitle: "Conversions by month — YoY",
    legendCurrent: "Apr 2025 – Mar 2026",
    legendPrior: "Apr 2024 – Mar 2025",
    current: [8, 9, 10, 11, 12, 18, 28, 38, 44, 52, 58, 64],
    prior: [12, 12, 13, 12, 13, 14, 14, 15, 14, 15, 16, 15],
    insight: "Summer Sale is leading at 3.2× ROAS with +18% CTR — shift 10–15% budget from underperforming search terms into that ad set while creative is fresh.",
  },
  {
    q: "Why did my bounce rate spike on Tuesday?",
    chartTitle: "Bounce rate — daily trend",
    legendCurrent: "This week",
    legendPrior: "Prior week",
    current: [42, 41, 68, 44, 43, 40, 39],
    prior: [44, 43, 45, 44, 46, 45, 44],
    insight: "Tuesday spike aligns with /landing LCP +2.4s on mobile — roll back the hero image change or compress assets; expect bounce to normalize within 48h after fix.",
  },
  {
    q: "Compare GA4 vs Meta ROAS for Q1",
    chartTitle: "Blended ROAS — GA4 vs Meta",
    legendCurrent: "GA4 attributed",
    legendPrior: "Meta Ads",
    current: [2.1, 2.3, 2.8, 3.2, 3.6, 4.0, 4.1, 4.2, 4.0, 4.1, 4.2, 4.1],
    prior: [1.8, 1.9, 2.0, 2.2, 2.4, 2.6, 2.7, 2.8, 2.8, 2.9, 2.8, 2.8],
    insight: "GA4 is outperforming Meta by ~46% on attributed ROAS in Q1 — use Meta for reach, but attribute pipeline value with GA4 for budget decisions.",
  },
  {
    q: "Which landing page has the highest exit rate?",
    chartTitle: "Exit rate by page — top segment",
    legendCurrent: "/pricing",
    legendPrior: "Site avg",
    current: [52, 54, 58, 62, 65, 68, 66, 67, 68, 69, 68, 68],
    prior: [38, 39, 38, 40, 39, 41, 40, 39, 40, 41, 40, 40],
    insight: "/pricing shows 68% exit with ~12s sessions — add social proof above the fold and shorten the form; A/B test one primary CTA to reduce exits.",
  },
  {
    q: "What is our MRR growth rate this quarter?",
    chartTitle: "MRR — quarter trend",
    legendCurrent: "FY segment",
    legendPrior: "Prior period",
    current: [118, 122, 128, 134, 142, 152, 158, 164, 170, 172, 174, 176],
    prior: [108, 110, 112, 114, 116, 118, 120, 122, 124, 126, 128, 130],
    insight: "MRR up 24% QoQ ($142K → $176K) — expansion in enterprise accounts drove most of the lift; prioritize upsell plays on accounts already over $5k MRR.",
  },
];

const CHART_W = 300;
const CHART_H = 112;
const PAD = { l: 34, r: 8, t: 10, b: 22 };

function buildLinePath(values: number[], maxV: number): string {
  const iw = CHART_W - PAD.l - PAD.r;
  const ih = CHART_H - PAD.t - PAD.b;
  const n = values.length;
  if (n < 2) return "";
  const scale = maxV > 0 ? maxV : 1;
  return values
    .map((v, i) => {
      const x = PAD.l + (i / (n - 1)) * iw;
      const y = PAD.t + ih - (v / scale) * ih;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
}

function CtaLineChart({
  query,
  phase,
  chartAnim,
}: {
  query: CtaQuery;
  phase: "typing" | "answer" | "pause";
  chartAnim: boolean;
}) {
  const maxV = Math.max(...query.current, ...query.prior, 1);
  const dCurrent = buildLinePath(query.current, maxV);
  const dPrior = buildLinePath(query.prior, maxV);
  const monthLabels = query.current.length === 7 ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] : MONTHS;
  const n = query.current.length;

  const prep = phase === "answer" && !chartAnim;
  const anim = phase === "answer" && chartAnim;
  const hold = phase === "pause";

  return (
    <div className="rounded-xl border border-gray-200/90 dark:border-white/10 bg-gray-50/80 dark:bg-white/[0.04] p-3 sm:p-3.5">
      <p className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-white/35 font-semibold mb-2">
        {query.chartTitle}
      </p>
      <svg
        viewBox={`0 0 ${CHART_W} ${CHART_H}`}
        className="w-full h-auto block text-gray-300 dark:text-white/15"
        aria-hidden
      >
        {/* horizontal grid */}
        {[0, 0.25, 0.5, 0.75, 1].map((t) => {
          const y = PAD.t + (CHART_H - PAD.t - PAD.b) * (1 - t);
          return <line key={t} x1={PAD.l} y1={y} x2={CHART_W - PAD.r} y2={y} stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />;
        })}
        <path
          d={dPrior}
          fill="none"
          stroke="#94a3b8"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={anim ? "cta-line-anim" : ""}
          style={
            prep
              ? { opacity: 0.85, strokeDasharray: 480, strokeDashoffset: 480 }
              : hold || anim
                ? { opacity: 0.85 }
                : undefined
          }
        />
        <path
          d={dCurrent}
          fill="none"
          stroke="#6B5FF8"
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={anim ? "cta-line-anim cta-line-anim-delay" : ""}
          style={prep ? { strokeDasharray: 480, strokeDashoffset: 480 } : undefined}
        />
      </svg>
      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 justify-center sm:justify-start">
        <span className="inline-flex items-center gap-1.5 text-[10px] text-gray-500 dark:text-white/50">
          <span className="w-2 h-2 rounded-full bg-brand-600 shrink-0" />
          {query.legendCurrent}
        </span>
        <span className="inline-flex items-center gap-1.5 text-[10px] text-gray-500 dark:text-white/50">
          <span className="w-2 h-2 rounded-full bg-gray-400 shrink-0" />
          {query.legendPrior}
        </span>
      </div>
      <div className="flex mt-1.5">
        {monthLabels.slice(0, n).map((m) => (
          <span key={m} className="flex-1 text-center text-[8px] text-gray-400 dark:text-white/28 leading-none">
            {m}
          </span>
        ))}
      </div>
    </div>
  );
}

const STATS = [
  { value: "2,000+", label: "Teams" },
  { value: "10M+",   label: "Queries" },
  { value: "94%",    label: "Faster" },
  { value: "4.9★",   label: "Rating" },
];

interface CTAProps {
  title?: string;
  subtitle?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

export function CTA({
  title:    _title,
  subtitle: _subtitle,
  primaryCta   = { label: "Get started", href: "#pricing" },
  secondaryCta = { label: "Book a demo",    href: "/contact" },
}: CTAProps) {
  const primaryExternal = isExternalNavigationHref(primaryCta.href);
  const secondaryExternal = isExternalNavigationHref(secondaryCta.href);
  const [qIdx, setQIdx]     = useState(0);
  const [typed, setTyped]   = useState("");
  const [phase, setPhase]   = useState<"typing"|"answer"|"pause">("typing");
  const timerRef            = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [chartAnim, setChartAnim] = useState(false);

  useEffect(() => {
    if (phase === "answer") {
      setChartAnim(false);
      const id = requestAnimationFrame(() => {
        setChartAnim(true);
      });
      return () => cancelAnimationFrame(id);
    }
    if (phase === "typing") {
      setChartAnim(false);
    }
  }, [phase, qIdx]);

  useEffect(() => {
    const current = QUERIES[qIdx];
    if (phase === "typing") {
      if (typed.length < current.q.length) {
        timerRef.current = setTimeout(() => setTyped(current.q.slice(0, typed.length + 1)), 38);
      } else {
        timerRef.current = setTimeout(() => setPhase("answer"), 500);
      }
    } else if (phase === "answer") {
      timerRef.current = setTimeout(() => setPhase("pause"), 5200);
    } else {
      timerRef.current = setTimeout(() => {
        setTyped("");
        setPhase("typing");
        setQIdx(i => (i + 1) % QUERIES.length);
      }, 1200);
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [phase, typed, qIdx]);

  const active = QUERIES[qIdx];

  return (
    <section className="py-8 md:py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="relative rounded-3xl border border-black/6 dark:border-white/8 shadow-2xl shadow-black/8 dark:shadow-black/50"
          initial={{ opacity: 0, y: 32, scale: 0.985 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7, ease: SAAS_EASE }}
        >

          <div className="absolute inset-0 z-0 rounded-3xl overflow-hidden pointer-events-none">
            <div className="absolute inset-0 dark:hidden">
              <Image src="/hero-bg.png" alt="" fill className="object-cover object-center opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-purple-50/40 to-pink-50/40" />
            </div>

            <div className="absolute inset-0 hidden dark:block"
              style={{ background:"linear-gradient(135deg,#0E0B1E 0%,#0C0C12 45%,#0B0E1E 100%)" }}/>
            <div className="absolute inset-0 hidden dark:block pointer-events-none"
              style={{ background:"radial-gradient(ellipse 65% 55% at 50% 100%, rgba(107,95,248,0.14) 0%, transparent 65%)" }}/>

            <div className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:"linear-gradient(rgba(107,95,248,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(107,95,248,0.05) 1px,transparent 1px)",
                backgroundSize:"48px 48px",
              }}/>

            <div className="absolute inset-0 overflow-hidden">
              {[...Array(6)].map((_, i) => (
                <div key={i}
                  className="absolute w-px bg-gradient-to-b from-transparent via-brand-400/30 to-transparent"
                  style={{
                    left: `${12 + i * 15}%`,
                    height: "40%",
                    top: "-40%",
                    animation: `ctaStream ${3 + i * 0.7}s linear infinite`,
                    animationDelay: `${i * 0.55}s`,
                  }}
                />
              ))}
            </div>
          </div>

          <div className="relative z-10 px-6 sm:px-12 pt-12 pb-14 text-center">

            <div className="flex justify-center mb-8">
              <div className="relative inline-flex items-center gap-3 bg-white/80 dark:bg-white/[0.06] border border-black/6 dark:border-white/10 backdrop-blur-md rounded-2xl px-5 py-3 shadow-lg shadow-black/5 dark:shadow-black/30">
                <div className="absolute inset-0 rounded-2xl border border-brand-400/30 dark:border-brand-500/25 animate-ping opacity-0"
                  style={{ animationDuration:"2.5s" }}/>
                <Image src="/logo-icon.png" alt="Conalytic" width={28} height={28} className="shrink-0"/>
                <div className="text-left">
                  <p className="text-xs font-black text-gray-900 dark:text-white tracking-tight leading-none">Conalytic</p>
                  <p className="text-[9px] text-gray-400 dark:text-white/40 font-medium mt-0.5">AI Analytics</p>
                </div>
                <span className="flex items-center gap-1 ml-1 pl-3 border-l border-gray-200 dark:border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"/>
                  <span className="text-[9px] font-semibold text-emerald-600 dark:text-emerald-400">Live</span>
                </span>
              </div>
            </div>

            <div className="max-w-2xl w-full mx-auto mb-10">
              <div
                className="bg-white/85 dark:bg-[#13131E]/95 backdrop-blur-md border border-gray-200/80 dark:border-white/8 rounded-2xl overflow-hidden shadow-lg shadow-black/5 dark:shadow-black/40 text-left w-full max-w-2xl"
              >
                <div className="flex flex-nowrap items-center gap-2 h-10 px-3 sm:px-4 bg-gray-50/80 dark:bg-[#0C0C12]/80 border-b border-gray-200/60 dark:border-white/6 overflow-x-auto">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400/80 shrink-0"/>
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80 shrink-0"/>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80 shrink-0"/>
                  <span className="ml-1 sm:ml-2 text-[10px] font-mono text-gray-400 dark:text-white/30 whitespace-nowrap shrink-0">
                    conalytic — ask anything
                  </span>
                </div>
                <div className="px-4 sm:px-5 py-4 min-h-[19rem] sm:min-h-[18rem] flex flex-col">
                  <div className="flex items-start gap-2.5 mb-3 min-h-[3.25rem]">
                    <span className="text-brand-500 dark:text-brand-400 font-mono text-[13px] sm:text-sm mt-0.5 shrink-0 leading-5">›</span>
                    <p className="text-[13px] sm:text-sm font-mono text-gray-700 dark:text-white/80 leading-relaxed [overflow-wrap:anywhere]">
                      {typed}
                      {phase === "typing" && <span className="inline-block w-0.5 h-4 bg-brand-500 align-middle ml-0.5 animate-pulse"/>}
                    </p>
                  </div>
                  <div
                    className={`flex items-start gap-2.5 flex-1 ${phase === "typing" ? "invisible" : "visible"}`}
                    aria-hidden={phase === "typing"}
                  >
                    <span className="text-emerald-500 font-mono text-[13px] sm:text-sm mt-1 shrink-0 leading-5">✓</span>
                    <div className="flex-1 min-w-0 space-y-2.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-semibold text-gray-800 dark:text-white/80">Conalytic</span>
                        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 px-2 py-0.5 rounded-full">
                          Answered in 3.2s
                        </span>
                      </div>
                      <CtaLineChart query={active} phase={phase} chartAnim={chartAnim} />
                      <div className="bg-brand-50 dark:bg-brand-600/10 border border-brand-100 dark:border-brand-500/20 rounded-xl px-3 py-2.5">
                        <p className="text-brand-600 dark:text-brand-300 font-bold text-[11px] mb-1">↑ Key finding</p>
                        <p className="text-[11px] sm:text-xs text-gray-600 dark:text-white/60 leading-relaxed">
                          {active.insight}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <motion.h2
              className="text-3xl sm:text-5xl font-black text-gray-900 dark:text-white mb-4 leading-tight tracking-tight"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.55, delay: 0.05, ease: SAAS_EASE }}
            >
              Turn data into decisions.<br/>
              <span style={{ background:"linear-gradient(135deg,#6B5FF8,#a78bfa,#60a5fa)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
                In seconds, not days.
              </span>
            </motion.h2>
            <motion.p
              className="text-gray-500 dark:text-white/68 text-base mb-10 max-w-lg mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.5, delay: 0.12, ease: SAAS_EASE }}
            >
              Join thousands of teams who replaced their entire dashboard stack with a single conversation.
            </motion.p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
              <a
                href={primaryCta.href}
                {...(primaryExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                onClick={(e) => {
                  if (!primaryExternal) handleSamePageHashClick(e, primaryCta.href);
                }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-xl shadow-brand-600/30 hover:shadow-brand-600/50 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                aria-label={primaryExternal ? `${primaryCta.label} (opens in new tab)` : primaryCta.label}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                </svg>
                {primaryCta.label}
              </a>
              <a
                href={secondaryCta.href}
                {...(secondaryExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                onClick={(e) => {
                  if (!secondaryExternal) handleSamePageHashClick(e, secondaryCta.href);
                }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-semibold text-gray-700 dark:text-white/80 border-2 border-gray-200 dark:border-white/12 bg-white/70 dark:bg-white/[0.04] hover:bg-white dark:hover:bg-white/[0.08] backdrop-blur-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                aria-label={secondaryExternal ? `${secondaryCta.label} (opens in new tab)` : secondaryCta.label}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
                </svg>
                {secondaryCta.label}
              </a>
            </div>

            <motion.div
              className="flex flex-wrap items-center justify-center gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
            >
              {STATS.map((s) => (
                <motion.div key={s.label} variants={fadeUpChild} className="text-center">
                  <p className="text-xl font-black text-gray-900 dark:text-white tabular-nums">{s.value}</p>
                  <p className="text-[11px] text-gray-400 dark:text-white/55 font-medium uppercase tracking-wider mt-0.5">{s.label}</p>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes ctaStream {
          0%   { transform: translateY(0);    opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateY(350%); opacity: 0; }
        }
        .cta-line-anim {
          stroke-dasharray: 480;
          stroke-dashoffset: 480;
          animation: ctaDrawLine 1.05s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .cta-line-anim-delay {
          animation-delay: 0.2s;
        }
        @keyframes ctaDrawLine {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </section>
  );
}

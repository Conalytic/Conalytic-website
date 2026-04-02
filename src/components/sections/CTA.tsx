"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const QUERIES = [
  { q: "Which campaign drove the most conversions last week?", a: "Summer Sale — 3.2× ROAS · +18% CTR" },
  { q: "Why did my bounce rate spike on Tuesday?", a: "Mobile load time increased by 2.4s on /landing" },
  { q: "Compare GA4 vs Meta ROAS for Q1", a: "GA4: 4.1× · Meta: 2.8× · GA4 outperforming by 46%" },
  { q: "Which landing page has the highest exit rate?", a: "/pricing page · 68% exit rate · avg 12s session" },
  { q: "What is our MRR growth rate this quarter?", a: "MRR up 24% QoQ · $142K → $176K" },
];

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
  // title / subtitle kept for back-compat with other pages (not rendered in home variant)
  title:    _title,
  subtitle: _subtitle,
  primaryCta   = { label: "Start for free", href: "https://app.conalytic.com/signup" },
  secondaryCta = { label: "Book a demo",    href: "https://app.conalytic.com/demo" },
}: CTAProps) {
  const [qIdx, setQIdx]     = useState(0);
  const [typed, setTyped]   = useState("");
  const [phase, setPhase]   = useState<"typing"|"answer"|"pause">("typing");
  const timerRef            = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Typewriter cycle */
  useEffect(() => {
    const current = QUERIES[qIdx];
    if (phase === "typing") {
      if (typed.length < current.q.length) {
        timerRef.current = setTimeout(() => setTyped(current.q.slice(0, typed.length + 1)), 38);
      } else {
        timerRef.current = setTimeout(() => setPhase("answer"), 500);
      }
    } else if (phase === "answer") {
      timerRef.current = setTimeout(() => setPhase("pause"), 2400);
    } else {
      timerRef.current = setTimeout(() => {
        setTyped("");
        setPhase("typing");
        setQIdx(i => (i + 1) % QUERIES.length);
      }, 1200);
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [phase, typed, qIdx]);

  return (
    <section className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="relative rounded-3xl border border-black/6 dark:border-white/8 shadow-2xl shadow-black/8 dark:shadow-black/50">

          {/* ── Clipped background layers only ── */}
          <div className="absolute inset-0 z-0 rounded-3xl overflow-hidden pointer-events-none">
            {/* ── Light mode background ── */}
            <div className="absolute inset-0 dark:hidden">
              <Image src="/hero-bg.png" alt="" fill className="object-cover object-center opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-purple-50/40 to-pink-50/40" />
            </div>

            {/* ── Dark mode background ── */}
            <div className="absolute inset-0 hidden dark:block"
              style={{ background:"linear-gradient(135deg,#0E0B1E 0%,#0C0C12 45%,#0B0E1E 100%)" }}/>
            <div className="absolute inset-0 hidden dark:block pointer-events-none"
              style={{ background:"radial-gradient(ellipse 65% 55% at 50% 100%, rgba(107,95,248,0.14) 0%, transparent 65%)" }}/>

            {/* ── Grid overlay ── */}
            <div className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:"linear-gradient(rgba(107,95,248,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(107,95,248,0.05) 1px,transparent 1px)",
                backgroundSize:"48px 48px",
              }}/>

            {/* ── Floating data-stream particles (CSS only) ── */}
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

          {/* ── Content ── */}
          <div className="relative z-10 px-6 sm:px-12 pt-12 pb-14 text-center">

            {/* Logo chip at top center */}
            <div className="flex justify-center mb-8">
              <div className="relative inline-flex items-center gap-3 bg-white/80 dark:bg-white/[0.06] border border-black/6 dark:border-white/10 backdrop-blur-md rounded-2xl px-5 py-3 shadow-lg shadow-black/5 dark:shadow-black/30">
                {/* Pulse ring */}
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

            {/* Typewriter terminal — stable box on mobile: fixed chrome height, reserved answer space (invisible while typing). */}
            <div className="max-w-2xl w-full mx-auto mb-10">
              <div
                className="bg-white/85 dark:bg-[#13131E]/95 backdrop-blur-md border border-gray-200/80 dark:border-white/8 rounded-2xl overflow-hidden shadow-lg shadow-black/5 dark:shadow-black/40 text-left w-full max-w-2xl"
              >
                {/* Terminal bar — never wraps on narrow viewports */}
                <div className="flex flex-nowrap items-center gap-2 h-10 px-3 sm:px-4 bg-gray-50/80 dark:bg-[#0C0C12]/80 border-b border-gray-200/60 dark:border-white/6 overflow-x-auto">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400/80 shrink-0"/>
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80 shrink-0"/>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80 shrink-0"/>
                  <span className="ml-1 sm:ml-2 text-[10px] font-mono text-gray-400 dark:text-white/30 whitespace-nowrap shrink-0">
                    conalytic — ask anything
                  </span>
                </div>
                {/* Body: stable min-height + answer row always in layout (invisible while typing) */}
                <div className="px-4 sm:px-5 py-4 min-h-[11.5rem] sm:min-h-[10rem] flex flex-col">
                  <div className="flex items-start gap-2.5 mb-3 min-h-[3.25rem]">
                    <span className="text-brand-500 dark:text-brand-400 font-mono text-[13px] sm:text-sm mt-0.5 shrink-0 leading-5">›</span>
                    <p className="text-[13px] sm:text-sm font-mono text-gray-700 dark:text-white/80 leading-relaxed [overflow-wrap:anywhere]">
                      {typed}
                      {phase === "typing" && <span className="inline-block w-0.5 h-4 bg-brand-500 align-middle ml-0.5 animate-pulse"/>}
                    </p>
                  </div>
                  <div
                    className={`flex items-start gap-2.5 flex-1 min-h-[4.5rem] ${phase === "typing" ? "invisible" : "visible"}`}
                    aria-hidden={phase === "typing"}
                  >
                    <span className="text-emerald-500 font-mono text-[13px] sm:text-sm mt-0.5 shrink-0 leading-5">✓</span>
                    <p className="text-[13px] sm:text-sm font-mono text-emerald-600 dark:text-emerald-400 leading-relaxed [overflow-wrap:anywhere]">
                      {QUERIES[qIdx].a}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-5xl font-black text-gray-900 dark:text-white mb-4 leading-tight tracking-tight">
              Turn data into decisions.<br/>
              <span style={{ background:"linear-gradient(135deg,#6B5FF8,#a78bfa,#60a5fa)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
                In seconds, not days.
              </span>
            </h2>
            <p className="text-gray-500 dark:text-white/68 text-base mb-10 max-w-lg mx-auto leading-relaxed">
              Join thousands of teams who replaced their entire dashboard stack with a single conversation.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
              <a href={primaryCta.href} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-xl shadow-brand-600/30 hover:shadow-brand-600/50 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                </svg>
                {primaryCta.label}
              </a>
              <a href={secondaryCta.href} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-semibold text-gray-700 dark:text-white/80 border-2 border-gray-200 dark:border-white/12 bg-white/70 dark:bg-white/[0.04] hover:bg-white dark:hover:bg-white/[0.08] backdrop-blur-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
                </svg>
                {secondaryCta.label}
              </a>
            </div>

            {/* Social proof stats */}
            <div className="flex flex-wrap items-center justify-center gap-8">
              {STATS.map(s => (
                <div key={s.label} className="text-center">
                  <p className="text-xl font-black text-gray-900 dark:text-white tabular-nums">{s.value}</p>
                  <p className="text-[11px] text-gray-400 dark:text-white/55 font-medium uppercase tracking-wider mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* Keyframe for the streaming particles */}
      <style>{`
        @keyframes ctaStream {
          0%   { transform: translateY(0);    opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateY(350%); opacity: 0; }
        }
      `}</style>
    </section>
  );
}

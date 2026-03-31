"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Accordion } from "@/components/ui/Accordion";
import { CTA } from "@/components/sections/CTA";
import { Transformation } from "@/components/home/sections/Transformation";
import { HowItWorks } from "@/components/home/sections/HowItWorks";
import { StatsSection } from "@/components/home/sections/StatsSection";
import { Pricing } from "@/components/home/sections/Pricing";

/* ─── constants ─────────────────────────────────────── */
const EASE = [0.22, 1, 0.36, 1] as const;

/* Simple Icons CDN helper — returns colored SVG logo URL */
const siUrl = (slug: string, hex: string) =>
  `https://cdn.simpleicons.org/${slug}/${hex}`;
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } } };

/* ══════════════════════════════════════════════════════
   Q&A DEMO CARD  — typewriter → chart → key finding
══════════════════════════════════════════════════════ */
const QA_QUESTION = "What is our revenue trend by segment this year?";
const QA_BARS = [
  { label: "Aug", h: 38, val: "$42k", opacity: 0.45 },
  { label: "Sep", h: 52, val: "$58k", opacity: 0.55 },
  { label: "Oct", h: 44, val: "$49k", opacity: 0.65 },
  { label: "Nov", h: 68, val: "$76k", opacity: 0.78 },
  { label: "Dec", h: 80, val: "$89k", opacity: 0.90 },
  { label: "Jan", h: 96, val: "$107k", opacity: 1.00 },
];
const QA_BAR_MAX_PX = 72; // height of tallest bar in px

function QADemoCard() {
  const [typed, setTyped]           = useState("");
  const [showResponse, setShowResponse] = useState(false);
  const [shownBars, setShownBars]   = useState(0);
  const [showInsight, setShowInsight] = useState(false);

  useEffect(() => {
    const startDelay = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        i++;
        setTyped(QA_QUESTION.slice(0, i));
        if (i >= QA_QUESTION.length) {
          clearInterval(interval);
          setTimeout(() => {
            setShowResponse(true);
            QA_BARS.forEach((_, idx) =>
              setTimeout(() => setShownBars(prev => Math.max(prev, idx + 1)), idx * 110)
            );
            setTimeout(() => setShowInsight(true), QA_BARS.length * 110 + 300);
          }, 400);
        }
      }, 38);
      return () => clearInterval(interval);
    }, 700);
    return () => clearTimeout(startDelay);
  }, []);

  return (
    <div className="w-full bg-white dark:bg-navy-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-white/10 shadow-[0_24px_72px_rgba(107,95,248,0.14)]">

      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100 dark:border-white/8">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-brand-600/10 dark:bg-brand-400/20 flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B5FF8" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
          </div>
          <span className="text-sm font-semibold text-gray-800 dark:text-white">Conalytic</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"/>
          <span className="text-[11px] text-gray-400 dark:text-white/40 font-medium">Connected to 4 sources</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 sm:p-6">

        {/* User question bubble */}
        <div className="flex items-start gap-3 mb-5">
          <div className="w-7 h-7 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
            <span className="text-[10px] font-bold text-gray-500 dark:text-white/50">U</span>
          </div>
          <div className="flex-1 bg-gray-50 dark:bg-white/5 rounded-xl px-4 py-3 text-sm text-gray-800 dark:text-white/80 leading-relaxed min-h-[44px]">
            {typed}
            <span className={`inline-block w-0.5 h-[14px] bg-brand-600 ml-0.5 align-middle transition-opacity ${typed.length < QA_QUESTION.length ? "animate-pulse" : "opacity-0"}`}/>
          </div>
        </div>

        {/* Response area */}
        <div className={`transition-all duration-500 ${showResponse ? "opacity-100" : "opacity-0"}`}>

          {/* Response header */}
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-600 to-violet-500 flex items-center justify-center shrink-0">
              <span className="text-[9px] font-bold text-white">CA</span>
            </div>
            <span className="text-xs font-semibold text-gray-700 dark:text-white/70">Conalytic</span>
            <span className="ml-auto text-[11px] text-emerald-600 dark:text-emerald-400 font-medium bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 px-2.5 py-0.5 rounded-full whitespace-nowrap">
              Answered in 3.2s
            </span>
          </div>

          {/* Chart */}
          <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-4 mb-3">
            <p className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-white/30 font-medium mb-3">
              Monthly revenue by segment — last 6 months
            </p>
            {/* Bar chart — explicit px heights so bars are always visible */}
            <div className="flex items-end gap-1.5 sm:gap-2" style={{ height: QA_BAR_MAX_PX + 20 }}>
              {QA_BARS.map((bar, i) => {
                const barPx = Math.round((bar.h / 100) * QA_BAR_MAX_PX);
                const shown = i < shownBars;
                return (
                  <div key={bar.label} className="flex-1 flex flex-col items-center justify-end gap-1 group relative">
                    {/* Hover tooltip */}
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-[10px] font-semibold px-2 py-0.5 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none z-10">
                      {bar.val}
                    </div>
                    {/* Value label above bar */}
                    <span className={`text-[9px] font-bold text-gray-500 dark:text-white/50 whitespace-nowrap transition-opacity duration-300 ${shown ? "opacity-100" : "opacity-0"}`}>
                      {bar.val}
                    </span>
                    {/* The bar itself — explicit px height, not % */}
                    <div
                      className="w-full rounded-t-[4px] cursor-pointer transition-all duration-[450ms] ease-out hover:brightness-110 hover:scale-x-105"
                      style={{
                        height: shown ? `${barPx}px` : "0px",
                        background: `rgba(107,95,248,${bar.opacity})`,
                        transitionProperty: "height, filter, transform",
                      }}
                    />
                  </div>
                );
              })}
            </div>
            <div className="flex mt-2">
              {QA_BARS.map(bar => (
                <span key={bar.label} className="flex-1 text-center text-[9px] text-gray-400 dark:text-white/25">{bar.label}</span>
              ))}
            </div>
          </div>

          {/* Key finding */}
          <div className={`flex items-start gap-3 bg-brand-50 dark:bg-brand-600/10 border border-brand-100 dark:border-brand-500/20 rounded-xl px-4 py-3 transition-all duration-500 ${showInsight ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
            <span className="text-brand-600 dark:text-brand-300 font-bold text-xs shrink-0 mt-0.5 whitespace-nowrap">↑ Key finding</span>
            <p className="text-[12px] text-gray-600 dark:text-white/60 leading-relaxed">
              Enterprise segment grew 154% over 6 months, now representing 63% of total revenue. SMB revenue flat — consider upsell campaign targeting accounts &gt;$5k MRR.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── removed: DashboardMockup replaced by QADemoCard ── */
function _DashboardMockup_DELETED() {
  return (
    <div className="w-full bg-white dark:bg-navy-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-white/8 shadow-[0_24px_72px_rgba(107,95,248,0.14)]">
      {/* On mobile the sidebar is hidden; height is shorter */}
      <div className="flex h-[300px] sm:h-[400px] lg:h-[490px]">

        {/* Sidebar — hidden on mobile, visible sm+ */}
        <aside className="hidden sm:flex w-36 lg:w-48 shrink-0 border-r border-gray-100 dark:border-white/8 bg-white dark:bg-navy-800 flex-col py-3">
          <div className="flex items-center gap-2 px-4 mb-4">
            <Image src="/logo-icon.png" alt="Conalytic" width={22} height={22} className="shrink-0" />
            <span className="text-[11px] font-extrabold text-gray-900 dark:text-white">Conalytic</span>
          </div>

          {/* Active item */}
          <div className="mx-3 mb-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-brand-600/10 dark:bg-brand-600/20 rounded-lg">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="text-brand-600 dark:text-brand-300 shrink-0">
                <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
                <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
              </svg>
              <span className="text-[11px] font-semibold text-brand-600 dark:text-brand-300">Overview</span>
            </div>
          </div>

          <p className="text-[8px] uppercase tracking-widest font-semibold text-gray-300 dark:text-white/25 px-4 mb-1">Analytics</p>
          {["Conversations","Reports","Data Sources"].map(n => (
            <div key={n} className="flex items-center gap-2 px-4 py-1.5 cursor-pointer group">
              <div className="w-3 h-3 rounded-sm bg-gray-100 dark:bg-white/10 group-hover:bg-gray-200 dark:group-hover:bg-white/20 shrink-0 transition-colors"/>
              <span className="text-[10px] text-gray-400 dark:text-white/35 group-hover:text-gray-600 dark:group-hover:text-white/55 transition-colors">{n}</span>
            </div>
          ))}

          <p className="text-[8px] uppercase tracking-widest font-semibold text-gray-300 dark:text-white/25 px-4 mt-3 mb-1">Account</p>
          {[["Integrations",null],["Team",null],["Messages","3"],["Settings",null]].map(([n,b]) => (
            <div key={n as string} className="flex items-center gap-2 px-4 py-1.5 cursor-pointer group">
              <div className="w-3 h-3 rounded-sm bg-gray-100 dark:bg-white/10 shrink-0"/>
              <span className="text-[10px] text-gray-400 dark:text-white/35 flex-1">{n}</span>
              {b && <span className="w-4 h-4 rounded-full bg-red-400 text-white text-[7px] flex items-center justify-center font-bold">{b}</span>}
            </div>
          ))}
        </aside>

        {/* Main */}
        <main className="flex-1 overflow-hidden bg-[#F8FAFC] dark:bg-navy-900/40 flex flex-col">

          {/* Top bar */}
          <div className="flex items-center justify-between px-3 sm:px-5 py-2 sm:py-2.5 bg-white dark:bg-navy-800 border-b border-gray-100 dark:border-white/8">
            {/* Breadcrumb — hide on mobile to save space */}
            <div className="hidden sm:flex items-center gap-1 text-[9px] text-gray-400 dark:text-white/30">
              <span>Menu</span><span className="mx-0.5">/</span><span>Analytics</span><span className="mx-0.5">/</span>
              <span className="text-gray-600 dark:text-white/60 font-medium">Overview</span>
            </div>
            {/* Mobile: show page title instead */}
            <span className="sm:hidden text-[10px] font-semibold text-gray-700 dark:text-white/70">Overview</span>
            <div className="flex items-center gap-2">
              {/* Search pill — hide on mobile */}
              <div className="hidden sm:flex items-center gap-1.5 bg-gray-100 dark:bg-white/8 rounded-lg px-2.5 py-1">
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                <span className="text-[9px] text-gray-400 dark:text-white/30">Search</span>
                <span className="text-[8px] text-gray-300 dark:text-white/20 border border-gray-200 dark:border-white/10 rounded px-0.5">⌘K</span>
              </div>
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-brand-600 to-violet-500 flex items-center justify-center text-white text-[8px] font-bold shrink-0">M</div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden p-2 sm:p-4 flex gap-2 sm:gap-3.5">

            {/* Left — always visible */}
            <div className="flex-1 flex flex-col gap-2 sm:gap-3 min-w-0">
              <p className="text-[13px] font-bold text-gray-800 dark:text-white">Overview</p>

              {/* Line chart card */}
              <div className="bg-white dark:bg-white/8 rounded-xl border border-gray-100 dark:border-white/8 p-3 shadow-sm">
                <p className="text-[9px] uppercase tracking-wide text-gray-400 dark:text-white/35 mb-1">Daily Queries</p>
                <div className="flex gap-4 mb-2">
                  <div><span className="text-xs font-bold text-brand-600 dark:text-brand-300">▲ 10,234</span><span className="text-[8px] text-gray-400 dark:text-white/30 ml-1">Total</span></div>
                  <div><span className="text-xs font-bold text-gray-700 dark:text-white/70">▲ 1,890</span><span className="text-[8px] text-gray-400 dark:text-white/30 ml-1">Today</span></div>
                </div>
                <svg width="100%" height="78" viewBox="0 0 400 90" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="lg1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6B5FF8" stopOpacity="0.22"/><stop offset="100%" stopColor="#6B5FF8" stopOpacity="0.01"/>
                    </linearGradient>
                  </defs>
                  <path d="M 0 72 C 40 68, 70 56, 110 46 S 175 38, 215 42 S 275 30, 315 26 S 365 30, 400 18 L 400 90 L 0 90 Z" fill="url(#lg1)"/>
                  <path d="M 0 72 C 40 68, 70 56, 110 46 S 175 38, 215 42 S 275 30, 315 26 S 365 30, 400 18" stroke="#6B5FF8" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
                  <path d="M 0 52 C 40 50, 70 44, 110 40 S 175 36, 215 38 S 275 28, 315 23 S 365 27, 400 14" stroke="#d1d5db" strokeWidth="1.5" fill="none" strokeDasharray="6 3" strokeLinecap="round"/>
                </svg>
                <div className="flex justify-between mt-1">
                  {["19 Mar","24 Mar","29 Mar","04 Apr","08 Apr","14 Apr","19 Apr","25 Apr"].map(d=>(
                    <span key={d} className="text-[7px] text-gray-300 dark:text-white/20">{d}</span>
                  ))}
                </div>
              </div>

              {/* Bar chart card */}
              <div className="bg-white dark:bg-white/8 rounded-xl border border-gray-100 dark:border-white/8 p-3 shadow-sm flex-1">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[9px] uppercase tracking-wide text-gray-400 dark:text-white/35">Query Volume</p>
                  <div className="flex gap-2">
                    {["$4,509","$3,200","$165"].map(v=>(
                      <span key={v} className="text-[8px] text-gray-400 dark:text-white/30">● {v}</span>
                    ))}
                  </div>
                </div>
                <div className="flex items-end gap-1 sm:gap-1.5" style={{ height: 52 }}>
                  {([42,62,52,72,48,58,68,38] as number[]).map((h,i)=>(
                    <div key={i} className="flex-1 rounded-t-[3px]" style={{ height:`${h}%`, backgroundColor:["#6B5FF8","#6B5FF8","#f59e0b","#6B5FF8","#ef4444","#f59e0b","#6B5FF8","#6B5FF8"][i], opacity:0.85 }}/>
                  ))}
                </div>
                <div className="flex justify-between mt-1">
                  {["19 Mar","24 Mar","29 Mar","04 Apr","08 Apr","14 Apr","19 Apr","25 Apr"].map(d=>(
                    <span key={d} className="text-[7px] text-gray-300 dark:text-white/20">{d}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — hidden on mobile */}
            <div className="hidden sm:flex w-36 lg:w-44 shrink-0 flex-col gap-2 sm:gap-3">

              {/* Donut performance card */}
              <div className="bg-white dark:bg-white/8 rounded-xl border border-gray-100 dark:border-white/8 p-3 shadow-sm">
                <p className="text-[10px] font-semibold text-gray-700 dark:text-white/70 mb-2">Performance</p>
                <div className="flex gap-0.5 mb-3">
                  {["Daily","Weekly","Monthly"].map((t,i)=>(
                    <button key={t} className={`text-[9px] px-2 py-0.5 rounded-md ${i===0?"bg-brand-600 text-white":"text-gray-400 dark:text-white/30 hover:bg-gray-100 dark:hover:bg-white/5"} transition-colors`}>{t}</button>
                  ))}
                </div>
                <div className="flex justify-center">
                  <div className="relative">
                    <svg width="80" height="80" viewBox="0 0 80 80">
                      <defs>
                        <linearGradient id="dg1" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor="#6B5FF8"/><stop offset="100%" stopColor="#f59e0b"/>
                        </linearGradient>
                      </defs>
                      <circle cx="40" cy="40" r={30} stroke="#e5e7eb" strokeWidth="8" fill="none" className="dark:stroke-white/10"/>
                      <circle cx="40" cy="40" r={30} stroke="url(#dg1)" strokeWidth="8" fill="none"
                        strokeLinecap="round" strokeDasharray="14.14 188.5" transform="rotate(-90 40 40)"/>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-sm font-bold text-gray-800 dark:text-white leading-none">7.5%</span>
                      <span className="text-[8px] text-gray-400 dark:text-white/30">Growth</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2 pt-2 border-t border-gray-100 dark:border-white/8">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-600"/>
                  <span className="text-[8px] text-gray-400 dark:text-white/35 flex-1">Current Ratio</span>
                  <span className="text-[10px] font-semibold text-gray-700 dark:text-white/70">2.54</span>
                </div>
              </div>

              {/* Watchlist */}
              <div className="bg-white dark:bg-white/8 rounded-xl border border-gray-100 dark:border-white/8 p-3 shadow-sm flex-1">
                <p className="text-[10px] font-semibold text-gray-700 dark:text-white/70 mb-2.5">Watchlist</p>
                <div className="grid grid-cols-3 gap-0.5 mb-2">
                  {["Account","This month","YTD"].map(h=>(
                    <span key={h} className="text-[7px] text-gray-400 dark:text-white/25 font-medium">{h}</span>
                  ))}
                </div>
                {[["GA4","2,500","10,453"],["Ads","0.00","53.60"],["Meta","7,654","29,250"],["GSC","2,500","10,453"]].map(([n,m,y])=>(
                  <div key={n} className="grid grid-cols-3 gap-0.5 py-1 border-t border-gray-50 dark:border-white/5">
                    <span className="text-[8px] text-gray-600 dark:text-white/50">{n}</span>
                    <span className="text-[8px] text-gray-500 dark:text-white/40">{m}</span>
                    <span className="text-[8px] text-gray-500 dark:text-white/40">{y}</span>
                  </div>
                ))}
                <button className="mt-2 text-[8px] text-brand-600 dark:text-brand-300 font-medium">View more →</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   1. HERO
══════════════════════════════════════════════════════ */
function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-32 pb-24 px-4 flex flex-col items-center">
      {/* Background: pastel in light mode, deep navy with subtle glow in dark */}
      <div className="absolute inset-0 pointer-events-none">
        {/* hero-bg.png at full strength in light mode, barely visible in dark */}
        <Image src="/hero-bg.png" alt="" fill className="object-cover opacity-65 dark:opacity-[0.08]" priority/>
        {/* Dark mode: solid navy base + subtle brand radial glow */}
        <div className="hidden dark:block absolute inset-0 bg-navy-900"/>
        <div className="hidden dark:block absolute inset-0"
          style={{ background:"radial-gradient(ellipse 80% 55% at 50% -10%, rgba(107,95,248,0.22) 0%, transparent 70%)" }}/>
      </div>
      <div className="absolute inset-0 grid-overlay opacity-[0.08] dark:opacity-[0.05] pointer-events-none"/>

      <div className="relative z-10 max-w-3xl mx-auto text-center w-full">

        {/* H1 */}
        <motion.h1 initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.75, delay:0.1, ease:EASE }}
          className="text-5xl sm:text-6xl lg:text-[68px] font-bold text-gray-900 dark:text-white leading-[1.07] tracking-tight mb-5"
        >
          Unlocking Growth With<br/>
          <span style={{ background:"linear-gradient(135deg,#6B5FF8 0%,#a78bfa 55%,#ec4899 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
            Next-Gen Analytics
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.75, delay:0.2, ease:EASE }}
          className="text-lg text-gray-500 dark:text-white/55 max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Ask questions in plain English and get instant insights from GA4, Google Ads, Meta and Search Console — no SQL required.
        </motion.p>

        {/* CTAs */}
        <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.75, delay:0.3, ease:EASE }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
        >
          <a href="https://app.conalytic.com" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-base font-semibold text-white bg-gray-900 dark:bg-white dark:text-gray-900 shadow-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
          >Get started</a>
          <a href="https://app.conalytic.com/demo" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-base font-semibold text-gray-700 dark:text-white border-2 border-gray-300 dark:border-white/25 hover:border-gray-400 dark:hover:border-white/40 bg-white/60 dark:bg-transparent hover:bg-white dark:hover:bg-white/5 backdrop-blur-sm transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
          >Book a demo</a>
        </motion.div>

        {/* Q&A Demo — scales + blurs in, then gently floats */}
        <motion.div
          initial={{ opacity:0, scale:0.88, y:60, filter:"blur(10px)" }}
          animate={{ opacity:1, scale:1, y:0, filter:"blur(0px)" }}
          transition={{ duration:1.1, delay:0.5, ease:EASE }}
          className="w-full max-w-2xl mx-auto"
        >
          <motion.div animate={{ y:[0,-6,0] }} transition={{ duration:8, repeat:Infinity, ease:"easeInOut" }}>
            <QADemoCard />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   2. TRUSTED BY
══════════════════════════════════════════════════════ */
/* Trusted-by logos — real SVGs via Simple Icons */
const LOGOS = [
  { name:"Shopify",  src: siUrl("shopify","96BF48")  },
  { name:"Notion",   src: siUrl("notion","000000")   },
  { name:"Stripe",   src: siUrl("stripe","635BFF")   },
  { name:"Figma",    src: siUrl("figma","F24E1E")    },
  { name:"Linear",   src: siUrl("linear","5E6AD2")   },
  { name:"Vercel",   src: siUrl("vercel","000000")   },
  { name:"Framer",   src: siUrl("framer","0055FF")   },
  { name:"Webflow",  src: siUrl("webflow","146EF5")  },
];

function TrustedBySection() {
  return (
    <section className="py-10 bg-white dark:bg-[#0C0C12] border-y border-gray-100 dark:border-white/[0.05] overflow-hidden">
      <p className="text-center text-xs font-semibold tracking-widest text-gray-400 dark:text-white/25 uppercase mb-8">
        Helping to grow the next generation of companies
      </p>
      <div className="marquee-container relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white dark:from-navy-900 to-transparent z-10 pointer-events-none"/>
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white dark:from-navy-900 to-transparent z-10 pointer-events-none"/>
        <div className="flex animate-marquee" style={{ width:"max-content" }}>
          {[...LOGOS,...LOGOS].map((logo,i)=>(
            <div key={i} className="flex items-center gap-2 mx-10 opacity-40 hover:opacity-70 transition-opacity grayscale hover:grayscale-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logo.src} alt={logo.name} width={22} height={22} loading="lazy"/>
              <span className="text-sm font-semibold text-gray-600 dark:text-white/50 whitespace-nowrap">{logo.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   3. SERVICES BENTO GRID
══════════════════════════════════════════════════════ */
function ServicesSection() {
  return (
    <section className="py-24 px-4 bg-white dark:bg-navy-900">
      <div className="max-w-5xl mx-auto">
        <motion.h2 initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, margin:"-80px" }}
          transition={{ duration:0.7, ease:EASE }}
          className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12"
        >
          Discover our range of tailored<br/>analytics services
        </motion.h2>

        <motion.div className="grid grid-cols-6 gap-4" initial="hidden" whileInView="show" viewport={{ once:true }} variants={stagger}>

          {/* Card 1 — soft peach, col-span-3 */}
          <motion.div variants={fadeUp}
            className="col-span-6 sm:col-span-3 rounded-2xl p-6 overflow-hidden relative min-h-[300px] flex flex-col border border-orange-100/80 dark:border-orange-500/10"
            style={{ background:"linear-gradient(145deg,#fffaf5 0%,#fff3e8 45%,#ffe8d6 100%)" }}
          >
            {/* dark mode bg */}
            <div className="absolute inset-0 rounded-2xl hidden dark:block pointer-events-none" style={{ background:"linear-gradient(145deg,#18130F 0%,#1F1812 100%)" }}/>
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-40 pointer-events-none"
              style={{ background:"radial-gradient(circle,#fb923c33 0%,transparent 70%)", transform:"translate(30%,-30%)" }}/>
            <div className="relative z-10 w-9 h-9 rounded-xl flex items-center justify-center mb-3 bg-white dark:bg-white/8 shadow-sm border border-orange-100 dark:border-orange-500/15">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
                <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
              </svg>
            </div>
            <h3 className="relative z-10 text-base font-bold text-gray-900 dark:text-white mb-1.5">Ask in Plain English</h3>
            <p className="relative z-10 text-sm text-gray-500 dark:text-white/50 mb-5 leading-relaxed">Discover insights through natural conversations — no SQL or analysts required.</p>

            {/* Mini chat mockup */}
            <div className="relative z-10 mt-auto bg-white dark:bg-[#1C1C24] rounded-2xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.07)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)] border border-gray-100 dark:border-white/[0.07]">
              <div className="flex items-center gap-1.5 mb-3">
                <Image src="/logo-icon.png" alt="" width={14} height={14}/>
                <span className="text-[9px] font-semibold text-gray-500 dark:text-white/40 uppercase tracking-wide">Conalytic AI</span>
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400"/>
              </div>
              <div className="space-y-2">
                <div className="flex gap-2 items-end">
                  <div className="w-6 h-6 rounded-full bg-gray-100 dark:bg-white/8 shrink-0 flex items-center justify-center text-[8px] text-gray-500 dark:text-white/50 font-bold">U</div>
                  <div className="bg-gray-100 dark:bg-white/8 rounded-2xl rounded-bl-sm px-3 py-1.5 text-[10px] text-gray-700 dark:text-white/70 max-w-[80%]">What&apos;s our best campaign this week?</div>
                </div>
                <div className="flex gap-2 items-end flex-row-reverse">
                  <div className="w-6 h-6 rounded-full bg-brand-600 shrink-0 flex items-center justify-center text-[7px] text-white font-black">AI</div>
                  <div className="rounded-2xl rounded-br-sm px-3 py-1.5 text-[10px] max-w-[80%]" style={{ background:"linear-gradient(135deg,#6B5FF8,#a78bfa)", color:"white" }}>
                    Summer Sale — 3.2× ROAS ↑ +18% CTR
                  </div>
                </div>
                <div className="flex gap-2 items-end">
                  <div className="w-6 h-6 rounded-full bg-gray-100 dark:bg-white/8 shrink-0 flex items-center justify-center text-[8px] text-gray-500 dark:text-white/50 font-bold">U</div>
                  <div className="bg-gray-100 dark:bg-white/8 rounded-2xl rounded-bl-sm px-3 py-1.5 text-[10px] text-gray-700 dark:text-white/70">How can we improve ROAS?</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2 — soft lime/green, col-span-3 */}
          <motion.div variants={fadeUp}
            className="col-span-6 sm:col-span-3 rounded-2xl p-6 overflow-hidden relative min-h-[300px] flex flex-col border border-green-100/80 dark:border-emerald-500/10"
            style={{ background:"linear-gradient(145deg,#f5fff8 0%,#e8faf0 45%,#d4f5e2 100%)" }}
          >
            {/* dark mode bg */}
            <div className="absolute inset-0 rounded-2xl hidden dark:block pointer-events-none" style={{ background:"linear-gradient(145deg,#0E1A12 0%,#131F16 100%)" }}/>
            <div className="absolute bottom-0 left-0 w-36 h-36 rounded-full opacity-30 pointer-events-none"
              style={{ background:"radial-gradient(circle,#34d39933 0%,transparent 70%)", transform:"translate(-30%,30%)" }}/>
            <div className="relative z-10 w-9 h-9 rounded-xl flex items-center justify-center mb-3 bg-white dark:bg-white/8 shadow-sm border border-green-100 dark:border-emerald-500/15">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2">
                <path d="M9 17H7A5 5 0 0 1 7 7h2"/><path d="M15 7h2a5 5 0 1 1 0 10h-2"/><line x1="8" y1="12" x2="16" y2="12"/>
              </svg>
            </div>
            <h3 className="relative z-10 text-base font-bold text-gray-900 dark:text-white mb-1.5">Automated Reporting</h3>
            <p className="relative z-10 text-sm text-gray-500 dark:text-white/50 mb-5 leading-relaxed">Branded, client-ready reports generated and delivered on your schedule automatically.</p>

            {/* Mini report card */}
            <div className="relative z-10 mt-auto bg-white dark:bg-[#1C1C24] rounded-2xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.07)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)] border border-gray-100 dark:border-white/[0.07]">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-[8px] text-gray-400 dark:text-white/35 uppercase tracking-wider font-semibold">Total Insights</p>
                  <p className="text-lg font-black text-gray-900 dark:text-white leading-tight">23,540 <span className="text-[10px] font-normal text-gray-400 dark:text-white/35">queries</span></p>
                </div>
                <div className="flex items-center gap-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-500/20 px-2 py-0.5 rounded-full">
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  <span className="text-[9px] font-bold">+32%</span>
                </div>
              </div>
              <div className="flex items-end gap-1 h-10">
                {[40,55,45,70,60,75,65,80,55,90].map((h,i)=>(
                  <div key={i} className="flex-1 rounded-sm"
                    style={{ height:`${h}%`, background: i===9 ? "#16a34a" : i%2===0 ? "#bbf7d0" : "#d1fae5", opacity: 0.85 }}/>
                ))}
              </div>
              <div className="flex gap-1.5 mt-2.5">
                <div className="flex-1 py-1 rounded-lg bg-emerald-500 text-white text-[9px] font-semibold text-center">Export</div>
                <div className="flex-1 py-1 rounded-lg border border-gray-200 dark:border-white/10 text-gray-600 dark:text-white/50 text-[9px] font-semibold text-center">Schedule</div>
              </div>
            </div>
          </motion.div>

          {/* Card 3 — Reliability stat */}
          <motion.div variants={fadeUp}
            className="col-span-6 sm:col-span-2 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between min-h-[180px]"
            style={{ background:"linear-gradient(145deg,rgba(255,255,255,0.75) 0%,rgba(240,238,255,0.6) 100%)" }}
          >
            <div className="absolute inset-0 rounded-2xl hidden dark:block pointer-events-none" style={{ background:"linear-gradient(145deg,#151520 0%,#1A1A28 100%)" }}/>
            <div className="absolute inset-0 rounded-2xl border border-brand-100/80 dark:border-brand-500/15 pointer-events-none"/>
            <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full pointer-events-none"
              style={{ background:"radial-gradient(circle,rgba(107,95,248,0.18) 0%,transparent 70%)" }}/>

            <div className="relative z-10">
              {/* Live uptime badge */}
              <div className="inline-flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 rounded-full px-2.5 py-1 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"/>
                <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">Live</span>
              </div>
              <p className="text-4xl font-black mb-1"
                style={{ background:"linear-gradient(135deg,#6B5FF8,#a78bfa)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
                100%
              </p>
              <p className="text-sm font-bold text-gray-800 dark:text-white mb-1">Reliability</p>
              <p className="text-xs text-gray-400 dark:text-white/40 leading-relaxed">Enterprise-grade uptime for all analytics pipelines.</p>
            </div>

            {/* Mini uptime bars */}
            <div className="relative z-10 flex items-end gap-0.5 mt-4">
              {[100,100,100,98,100,100,100,100,100,100,100,100,100,100,100,97,100,100,100,100].map((v,i)=>(
                <div key={i} className="flex-1 rounded-full transition-all"
                  style={{ height:`${8 + (v/100)*8}px`, background: v < 100 ? "#fbbf24" : "#6B5FF8", opacity: 0.6 + i*0.02 }}/>
              ))}
            </div>
          </motion.div>

          {/* Card 4 — Queries stat */}
          <motion.div variants={fadeUp}
            className="col-span-6 sm:col-span-2 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between min-h-[180px]"
            style={{ background:"linear-gradient(145deg,rgba(255,255,255,0.75) 0%,rgba(236,253,245,0.6) 100%)" }}
          >
            <div className="absolute inset-0 rounded-2xl hidden dark:block pointer-events-none" style={{ background:"linear-gradient(145deg,#111A14 0%,#161F18 100%)" }}/>
            <div className="absolute inset-0 rounded-2xl border border-emerald-100/80 dark:border-emerald-500/15 pointer-events-none"/>
            <div className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full pointer-events-none"
              style={{ background:"radial-gradient(circle,rgba(16,185,129,0.15) 0%,transparent 70%)" }}/>

            <div className="relative z-10">
              {/* Trend chip */}
              <div className="inline-flex items-center gap-1 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 rounded-full px-2.5 py-1 mb-4">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5"><path d="M18 15l-6-6-6 6"/></svg>
                <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">+24% this week</span>
              </div>
              <p className="text-4xl font-black mb-1"
                style={{ background:"linear-gradient(135deg,#059669,#34d399)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
                10K+
              </p>
              <p className="text-sm font-bold text-gray-800 dark:text-white mb-1">Queries daily</p>
              <p className="text-xs text-gray-400 dark:text-white/40 leading-relaxed">Real-time answers across 500+ connected teams.</p>
            </div>

            {/* Mini sparkline */}
            <div className="relative z-10 mt-4">
              <svg width="100%" height="28" viewBox="0 0 100 28" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="sg1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.3"/>
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.02"/>
                  </linearGradient>
                </defs>
                <path d="M0 22 C15 20,25 18,35 14 S55 8,65 10 S80 6,100 2 L100 28 L0 28 Z" fill="url(#sg1)"/>
                <path d="M0 22 C15 20,25 18,35 14 S55 8,65 10 S80 6,100 2" stroke="#10b981" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
              </svg>
            </div>
          </motion.div>

          {/* Card 5 — Features CTA — rich glass gradient */}
          <motion.div variants={fadeUp}
            className="col-span-6 sm:col-span-2 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden min-h-[180px] group cursor-pointer"
          >
            {/* Layered gradient background */}
            <div className="absolute inset-0 rounded-2xl"
              style={{ background:"linear-gradient(145deg,#6B5FF8 0%,#7c3aed 50%,#a78bfa 100%)" }}/>
            {/* Mesh highlight */}
            <div className="absolute inset-0 rounded-2xl opacity-30 pointer-events-none"
              style={{ backgroundImage:"radial-gradient(circle at 15% 85%,rgba(236,72,153,0.6) 0%,transparent 50%),radial-gradient(circle at 85% 10%,rgba(255,255,255,0.3) 0%,transparent 50%)" }}/>
            {/* Glass sheen on hover */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{ background:"linear-gradient(135deg,rgba(255,255,255,0.12) 0%,transparent 60%)" }}/>
            {/* Grid overlay */}
            <div className="absolute inset-0 rounded-2xl opacity-[0.07] pointer-events-none"
              style={{ backgroundImage:"linear-gradient(white 1px,transparent 1px),linear-gradient(90deg,white 1px,transparent 1px)", backgroundSize:"24px 24px" }}/>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-2.5 py-1 mb-4">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M5 3l14 9-14 9V3z"/></svg>
                <span className="text-[10px] font-bold text-white/90 uppercase tracking-wider">Explore</span>
              </div>
              <p className="text-xl font-bold text-white leading-snug mb-1">
                Visit our<br/>features page
              </p>
              <p className="text-xs text-white/55 leading-relaxed">Discover everything Conalytic can do for your team.</p>
            </div>

            <Link href="/features"
              className="relative z-10 mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white group-hover:gap-3 transition-all duration-200"
            >
              See all features
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   4. CAPABILITIES (SPLIT LAYOUT)
══════════════════════════════════════════════════════ */
function CapabilitiesSection() {
  return (
    <section className="py-24 px-4 bg-[#F6F7FE] dark:bg-[#0E0E14]">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Left */}
        <motion.div initial={{ opacity:0, x:-30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.7, ease:EASE }}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 dark:bg-orange-500/15 border border-orange-200 dark:border-orange-500/20 text-orange-600 dark:text-orange-300 text-[11px] font-bold uppercase tracking-wider mb-6">
            🔥 Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
            Supercharge Your Analytics<br/>
            <span className="font-black">Team&apos;s Capabilities.</span>
          </h2>
          <p className="text-gray-500 dark:text-white/50 mb-8 leading-relaxed">
            Empower your team with the tools and insights needed to drive smarter decisions and improve marketing performance.
          </p>
          <div className="space-y-6">
            {[
              { icon:"📊", title:"Enhanced Data Analytics", desc:"Use AI-powered insights to improve campaign performance through live marketing analytics and trend detection." },
              { icon:"⚙️", title:"Smart Report Automation", desc:"Streamline workflows with automation for reporting and delivery, reducing manual tasks and increasing efficiency." },
            ].map(f=>(
              <div key={f.title} className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-600/20 flex items-center justify-center text-xl shrink-0">{f.icon}</div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">{f.title}</p>
                  <p className="text-sm text-gray-500 dark:text-white/45 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right */}
        <motion.div initial={{ opacity:0, x:30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.7, delay:0.1, ease:EASE }}
          className="relative"
        >
          {/* Main visual card */}
          <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 dark:from-navy-700 dark:to-navy-600 rounded-2xl overflow-hidden" style={{ height:300 }}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-600 to-violet-500 mx-auto mb-4 flex items-center justify-center">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                </div>
                <p className="text-sm font-medium text-gray-600 dark:text-white/60">Ask anything about your data</p>
              </div>
            </div>
          </div>

          {/* Floating stat card */}
          <motion.div
            animate={{ y:[0,-6,0] }} transition={{ duration:5, repeat:Infinity, ease:"easeInOut" }}
            className="absolute -bottom-5 -left-5 bg-white dark:bg-navy-700 rounded-2xl p-4 shadow-xl border border-gray-100 dark:border-white/10"
          >
            <p className="text-[9px] text-gray-400 dark:text-white/40 mb-1">Queries today</p>
            <p className="text-xl font-black text-gray-900 dark:text-white">$4,230.00</p>
            <p className="text-[10px] text-emerald-500 font-medium mt-0.5">22 conversations ↑32%</p>
          </motion.div>

          {/* Second floating card */}
          <motion.div
            animate={{ y:[0,-4,0] }} transition={{ duration:7, repeat:Infinity, ease:"easeInOut", delay:1 }}
            className="absolute -top-4 -right-4 bg-white dark:bg-navy-700 rounded-xl p-3 shadow-lg border border-gray-100 dark:border-white/10 flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-lg bg-brand-600/10 flex items-center justify-center text-brand-600 text-sm">📈</div>
            <div>
              <p className="text-[10px] font-semibold text-gray-800 dark:text-white">Analytics</p>
              <p className="text-[9px] text-gray-400 dark:text-white/35">$4,220.00</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   5. INTEGRATIONS HUB  — grid-intersection style
══════════════════════════════════════════════════════ */

/* Hub-and-spoke integrations */
const HUB_INTEGRATIONS = [
  {
    id:"ga4", name:"Google Analytics 4", desc:"Website traffic, user behavior, and conversion data",
    connected:true, meta:"32 accounts · 97 properties",
    logo: siUrl("googleanalytics","E37400"), bg:"#FFF8F0", iconBg:"#FF9800",
    cx:100, cy:60,
  },
  {
    id:"gsc", name:"Google Search Console", desc:"Search performance, keywords, and indexing data",
    connected:true, meta:"42 sites",
    logo: siUrl("googlesearchconsole","458CF5"), bg:"#EEF4FF", iconBg:"#4285F4",
    cx:100, cy:240,
  },
  {
    id:"gads", name:"Google Ads", desc:"Ad campaigns, spend, conversions, and ROI",
    connected:true, meta:"18 accounts",
    logo: siUrl("googleads","4285F4"), bg:"#EEF4FF", iconBg:"#4285F4",
    cx:460, cy:60,
  },
  {
    id:"meta", name:"Meta Ads", desc:"Facebook & Instagram ad performance",
    connected:false, meta:null,
    logo: siUrl("meta","0866FF"), bg:"#EEF6FF", iconBg:"#0866FF",
    cx:460, cy:150,
  },
  {
    id:"li", name:"LinkedIn Ads", desc:"LinkedIn campaign analytics and engagement",
    connected:false, meta:null,
    logo: siUrl("linkedin","0A66C2"), bg:"#E8F0FE", iconBg:"#0A66C2",
    cx:460, cy:240,
  },
];
// center node
const HUB_CX = 280, HUB_CY = 150;

function IntegrationsHub() {
  return (
    <section className="py-24 px-4 bg-white dark:bg-[#0E0E14]">
      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7, ease:EASE }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Seamless integration with<br/>
            <span className="font-black">your marketing stack</span>
          </h2>
          <p className="text-gray-500 dark:text-white/50 text-sm">Connect all your data sources — no engineering required.</p>
        </motion.div>

        {/* Hub diagram + integration list side-by-side */}
        <div className="flex flex-col lg:flex-row items-center gap-12">

          {/* ── Hub diagram ── */}
          <motion.div
            initial={{ opacity:0, scale:0.92 }} whileInView={{ opacity:1, scale:1 }}
            viewport={{ once:true }} transition={{ duration:0.8, ease:EASE }}
            className="w-full lg:w-[560px] shrink-0"
          >
            <div className="relative rounded-3xl border border-gray-200 dark:border-white/[0.07] overflow-hidden"
              style={{ background:"#f5f6fa", height:300 }}
            >
              {/* Dark bg */}
              <div className="absolute inset-0 hidden dark:block rounded-3xl" style={{ background:"#13131A" }}/>

              {/* Subtle dot grid */}
              <div className="absolute inset-0 pointer-events-none opacity-50"
                style={{ backgroundImage:"radial-gradient(circle,rgba(0,0,0,0.12) 1px,transparent 1px)", backgroundSize:"28px 28px" }}/>
              <div className="absolute inset-0 hidden dark:block pointer-events-none opacity-30"
                style={{ backgroundImage:"radial-gradient(circle,rgba(255,255,255,0.15) 1px,transparent 1px)", backgroundSize:"28px 28px" }}/>

              {/* SVG layer — lines */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 560 300" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#6B5FF8" stopOpacity="0.5"/>
                    <stop offset="100%" stopColor="#6B5FF8" stopOpacity="0.08"/>
                  </linearGradient>
                  <linearGradient id="lineGradR" x1="1" y1="0" x2="0" y2="0">
                    <stop offset="0%" stopColor="#6B5FF8" stopOpacity="0.5"/>
                    <stop offset="100%" stopColor="#6B5FF8" stopOpacity="0.08"/>
                  </linearGradient>
                </defs>
                {HUB_INTEGRATIONS.map((item) => {
                  const isRight = item.cx > HUB_CX;
                  // Gradient strokes don't work with strokeDasharray in browsers.
                  // Use gradient only for solid connected lines; plain color for dashed.
                  return (
                    <line key={item.id}
                      x1={item.cx} y1={item.cy} x2={HUB_CX} y2={HUB_CY}
                      stroke={item.connected ? (isRight ? "url(#lineGradR)" : "url(#lineGrad)") : "rgba(107,95,248,0.25)"}
                      strokeWidth={item.connected ? "1.5" : "1.2"}
                      strokeDasharray={item.connected ? undefined : "6 5"}
                    />
                  );
                })}

                {/* Travelling dot — only on connected lines */}
                {HUB_INTEGRATIONS.filter(i => i.connected).map((item, idx) => (
                  <circle key={item.id} r="3" fill="#6B5FF8">
                    <animateMotion
                      dur={`${2.2 + idx * 0.5}s`}
                      repeatCount="indefinite"
                      path={`M ${item.cx} ${item.cy} L ${HUB_CX} ${HUB_CY}`}
                    />
                  </circle>
                ))}
              </svg>

              {/* Center Conalytic node */}
              <div className="absolute" style={{ left:HUB_CX, top:HUB_CY, transform:"translate(-50%,-50%)" }}>
                <motion.div animate={{ scale:[1,1.06,1] }} transition={{ duration:3.5, repeat:Infinity, ease:"easeInOut" }}>
                  <div className="w-[64px] h-[64px] bg-white dark:bg-navy-800 rounded-2xl shadow-xl shadow-black/15 flex items-center justify-center border border-gray-100 dark:border-white/15">
                    <Image src="/logo-icon.png" alt="Conalytic" width={36} height={36}/>
                  </div>
                </motion.div>
              </div>

              {/* Integration nodes */}
              {HUB_INTEGRATIONS.map((item, i) => (
                <motion.div key={item.id}
                  className="absolute group"
                  style={{ left:item.cx, top:item.cy, transform:"translate(-50%,-50%)" }}
                  initial={{ opacity:0, scale:0.5 }}
                  whileInView={{ opacity:1, scale:1 }}
                  viewport={{ once:true }}
                  transition={{ duration:0.4, delay:0.1 + i*0.1, ease:EASE }}
                >
                  <motion.div
                    animate={{ y:[0,-4,0] }}
                    transition={{ duration:3 + i*0.6, repeat:Infinity, ease:"easeInOut", delay:i*0.4 }}
                  >
                    {/* Logo tile */}
                    <div className="relative w-[52px] h-[52px] rounded-2xl flex items-center justify-center shadow-md shadow-black/10 border border-white/80 bg-white">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.logo} alt={item.name} width={26} height={26} loading="lazy"/>
                      {/* status dot */}
                      <span className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${item.connected ? "bg-emerald-500" : "bg-gray-300"}`}/>
                    </div>
                    {/* Hover tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-gray-900/90 text-white text-[9px] font-medium px-2 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                      {item.name}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── Integration list ── */}
          <div className="flex-1 w-full space-y-3">
            {HUB_INTEGRATIONS.map((item, i) => (
              <motion.div key={item.id}
                initial={{ opacity:0, x:20 }} whileInView={{ opacity:1, x:0 }}
                viewport={{ once:true }} transition={{ duration:0.5, delay:i*0.08, ease:EASE }}
                className={`flex items-start gap-4 p-4 rounded-2xl border transition-all duration-200 cursor-default group hover:shadow-sm dark:border-white/[0.07] dark:hover:border-white/[0.12] ${item.connected ? "dark:bg-[#16161D]" : "dark:bg-[#131318]"}`}
                style={{ background: item.connected ? "rgba(255,255,255,0.9)" : "rgba(249,250,251,0.9)", borderColor: item.connected ? "rgba(229,231,235,1)" : "rgba(229,231,235,0.6)" }}
              >
                {/* Icon */}
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-white shadow-sm border border-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.logo} alt={item.name} width={22} height={22}/>
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{item.name}</p>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${item.connected ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-gray-100 text-gray-400 border border-gray-200"}`}>
                      {item.connected ? "Connected" : "Not connected"}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 dark:text-white/40 truncate">{item.desc}</p>
                </div>

                {/* Arrow on hover */}
                <svg className="w-4 h-4 text-gray-300 group-hover:text-brand-400 transition-colors shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24">
                  <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.div>
            ))}

            <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ duration:0.6, delay:0.5 }}>
              <Link href="/integrations"
                className="inline-flex items-center gap-1.5 text-sm text-brand-600 dark:text-brand-400 hover:text-brand-700 font-semibold transition-colors mt-1"
              >
                View all integrations
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   6. TESTIMONIALS CAROUSEL
══════════════════════════════════════════════════════ */
const TESTIMONIALS = [
  { quote:"Conalytic replaced our entire dashboard stack. One conversation gives insights that used to take hours across 4 different platforms. Absolutely game-changing for our team.", name:"Maria Rodriguez", title:"Marketing Manager", photo:"https://i.pravatar.cc/300?img=47", rating:5 },
  { quote:"Client retention improved 40% after implementing Conalytic's automated reporting. The AI insights add incredible value to every single client deliverable we produce.", name:"Jennifer Walsh", title:"Marketing Operations Lead", photo:"https://i.pravatar.cc/300?img=44", rating:5 },
  { quote:"We onboarded our entire marketing team in 30 minutes. No training needed — they just ask questions and get instant, accurate answers about our campaign performance.", name:"Alex Kumar", title:"Growth Marketing Director", photo:"https://i.pravatar.cc/300?img=12", rating:5 },
  { quote:"Client calls are so much smoother now. Instead of 'let me get back to you,' I can answer any performance question in real-time with confidence.", name:"Rachel Park", title:"Agency Account Manager", photo:"https://i.pravatar.cc/300?img=32", rating:5 },
];

function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const t = TESTIMONIALS[current];
  const prev = ()=>setCurrent(c=>(c-1+TESTIMONIALS.length)%TESTIMONIALS.length);
  const next = ()=>setCurrent(c=>(c+1)%TESTIMONIALS.length);

  return (
    <section className="py-24 px-4 bg-[#F6F7FE] dark:bg-[#0E0E14]">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7, ease:EASE }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            What our customers say<br/><span className="font-black">about us</span>
          </h2>
          <p className="text-gray-500 dark:text-white/50 max-w-md mx-auto text-sm">
            Improve marketing performance with AI-powered insights, helping teams make smarter decisions faster.
          </p>
        </motion.div>

        <div className="relative flex items-center gap-4">

          {/* Prev button */}
          <button onClick={prev} className="w-10 h-10 shrink-0 rounded-full border border-gray-200 dark:border-white/15 bg-white dark:bg-white/5 flex items-center justify-center text-gray-500 dark:text-white/50 hover:border-brand-500/50 hover:text-brand-600 dark:hover:text-brand-300 transition-all">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>

          {/* Card */}
          <AnimatePresence mode="wait">
            <motion.div key={current}
              initial={{ opacity:0, x:40 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-40 }}
              transition={{ duration:0.4, ease:EASE }}
              className="flex-1 rounded-2xl overflow-hidden bg-white dark:bg-[#16161D] border border-gray-100 dark:border-white/[0.07] flex flex-col sm:flex-row shadow-md shadow-black/5 dark:shadow-black/50"
            >
              {/* Avatar panel */}
              <div className="sm:w-48 shrink-0 relative overflow-hidden bg-gray-50 dark:bg-[#1A1A22] flex flex-col items-center justify-center p-6 gap-3 border-b sm:border-b-0 sm:border-r border-gray-100 dark:border-white/[0.07]">
                <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-brand-100 dark:ring-brand-500/20 shadow-md">
                  <Image src={t.photo} alt={t.name} width={80} height={80} className="object-cover w-full h-full"/>
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{t.name}</p>
                  <p className="text-xs text-gray-400 dark:text-white/40 mt-0.5">{t.title}</p>
                </div>
                {/* Stars */}
                <div className="flex gap-0.5">
                  {Array.from({ length:t.rating }).map((_,i)=>(
                    <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
              </div>

              {/* Quote panel */}
              <div className="flex-1 p-8 flex flex-col justify-between">
                {/* Opening quote mark */}
                <svg className="w-8 h-8 text-brand-200 dark:text-brand-800 mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
                <p className="text-gray-700 dark:text-white/80 text-base sm:text-lg leading-relaxed flex-1">
                  {t.quote}
                </p>
                {/* Dots */}
                <div className="flex gap-1.5 mt-6">
                  {TESTIMONIALS.map((_,i)=>(
                    <button key={i} onClick={()=>setCurrent(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${i===current ? "bg-brand-500 w-5" : "bg-gray-200 dark:bg-white/15 w-1.5 hover:bg-gray-300"}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Next button */}
          <button onClick={next} className="w-10 h-10 shrink-0 rounded-full bg-brand-600 flex items-center justify-center text-white hover:bg-brand-700 transition-all shadow-lg shadow-brand-500/30 hover:scale-105">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   7. FAQ
══════════════════════════════════════════════════════ */
const FAQS = [
  { question:"How quickly can we see results?", answer:"Connect your data sources in under 5 minutes. Start getting insights immediately through our conversational interface — no onboarding or training required." },
  { question:"What makes your AI insights different?", answer:"Our AI doesn't just show data – it explains trends, identifies opportunities, and provides specific recommendations for optimization. Think of it as a senior analyst available 24/7." },
  { question:"Can we customize reports for clients?", answer:"Absolutely. Full white-label capabilities with custom branding, logos, and color schemes for professional client deliverables. Your brand, powered by Conalytic." },
  { question:"Do you integrate with our existing tools?", answer:"We connect with GA4, Google Search Console, Google Ads, and Meta Ads today, with more integrations launching every quarter." },
  { question:"Is my data secure?", answer:"Yes. We are SOC 2 compliant, use end-to-end encryption in transit and at rest, and never share or sell your data." },
];

function FAQSection() {
  return (
    <section className="py-24 px-4 bg-white dark:bg-[#0E0E14]">
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7, ease:EASE }} className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">Frequently asked questions</h2>
          <p className="text-gray-500 dark:text-white/50">Everything you need to know about Conalytic.</p>
        </motion.div>
        <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7, delay:0.15, ease:EASE }}>
          <Accordion items={FAQS}/>
        </motion.div>
        <p className="text-center text-gray-400 dark:text-white/40 text-sm mt-8">
          Still have questions?{" "}
          <Link href="/contact" className="text-brand-600 dark:text-brand-300 hover:underline font-semibold">Talk to our team</Link>
        </p>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   ROOT EXPORT
══════════════════════════════════════════════════════ */
export function HomeClient() {
  return (
    <>
      <HeroSection/>
      <TrustedBySection/>
      <Transformation/>
      <HowItWorks/>
      <ServicesSection/>
      <StatsSection/>
      <IntegrationsHub/>
      <TestimonialsSection/>
      <Pricing/>
      <FAQSection/>
      <CTA/>
    </>
  );
}

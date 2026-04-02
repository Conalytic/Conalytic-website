"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MessageSquare, Globe, Sparkles, CheckCircle2, ArrowRight, Users, Bell } from "lucide-react";
import { CTA } from "@/components/sections/CTA";
import { Pricing } from "@/components/home/sections/Pricing";
import { MARKETING_STACK_LOGOS } from "@/lib/marketing-stack-logos";

const EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

const GRAD: React.CSSProperties = {
  background: "linear-gradient(135deg,#6B5FF8 0%,#a78bfa 55%,#ec4899 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

/* ── Data ─────────────────────────────────────────── */
const keyFeatures = [
  {
    icon: MessageSquare,
    title: "Natural Language Queries",
    description: "Ask complex analytics questions in plain English and get instant visualizations with AI-generated insights.",
    color: "from-brand-500/20 to-violet-500/10",
    iconColor: "text-brand-400",
    border: "border-brand-500/20",
  },
  {
    icon: Globe,
    title: "Multi-Channel Integration",
    description: "Connect GA4, Google Ads, Meta Ads, and Search Console data into one unified BigQuery warehouse.",
    color: "from-blue-500/20 to-cyan-500/10",
    iconColor: "text-blue-400",
    border: "border-blue-500/20",
  },
  {
    icon: Sparkles,
    title: "Automated Insights",
    description: "Receive AI-powered recommendations, trend analysis, and actionable next steps with every query response.",
    color: "from-emerald-500/20 to-teal-500/10",
    iconColor: "text-emerald-400",
    border: "border-emerald-500/20",
  },
];


const collaborationFeatures = [
  { icon: Users,        title: "Team Sharing",     description: "Share conversational analytics sessions with team members instantly" },
  { icon: MessageSquare, title: "Shared Histories", description: "Collaborative insight generation with shared chat histories" },
  { icon: Bell,         title: "Real-Time Alerts", description: "Real-time notifications when new insights are discovered" },
];

const performanceBullets = [
  'Ask questions like "Which campaigns drove the most conversions this month?"',
  "Get automated insights about CTR, ROAS, and conversion rate trends",
  "Receive proactive recommendations for campaign optimization",
];

/* ── Feature card inner visuals ──────────────────── */

/* Card 1 — Natural Language: animated query input + response */
function NLQVisual() {
  const query = "Which campaigns had the best ROI last quarter?";
  return (
    <div className="w-full rounded-xl bg-gray-50 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.07] overflow-hidden">
      {/* Input bar */}
      <div className="flex items-center gap-2.5 px-4 py-3 border-b border-gray-200 dark:border-white/[0.06]">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-brand-500 shrink-0">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <span className="text-xs text-gray-600 dark:text-white/70 font-mono flex-1 truncate">{query}</span>
        <span className="inline-block w-0.5 h-3.5 bg-brand-500 animate-pulse shrink-0"/>
      </div>
      {/* Response */}
      <div className="p-4">
        <div className="flex items-start gap-2.5 mb-3">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-brand-600 to-violet-500 flex items-center justify-center shrink-0">
            <span className="text-[7px] font-bold text-white">CA</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-[10px] font-semibold text-gray-700 dark:text-white/70">Conalytic</span>
              <span className="text-[9px] bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-500/20 px-1.5 py-0.5 rounded-full font-medium">Answered in 1.8s</span>
            </div>
            {/* Mini bar chart — explicit px heights */}
            {(() => {
              const NLQ_MAX = 36;
              const nlqBars = [45,72,38,88,62,95];
              return (
                <div className="flex items-end gap-1 mb-2" style={{ height: NLQ_MAX }}>
                  {nlqBars.map((pct, i) => (
                    <div key={i} className="flex-1 rounded-t-[2px]"
                      style={{ height: `${Math.round((pct/100)*NLQ_MAX)}px`, background:`rgba(107,95,248,${0.4+i*0.1})` }}/>
                  ))}
                </div>
              );
            })()}
            <p className="text-[10px] text-gray-400 dark:text-white/40 flex gap-1 justify-between">
              {["Aug","Sep","Oct","Nov","Dec","Jan"].map(l=><span key={l}>{l}</span>)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-brand-50 dark:bg-brand-500/10 border border-brand-100 dark:border-brand-500/20 rounded-lg px-3 py-2">
          <span className="text-brand-600 dark:text-brand-300 text-[10px] font-bold shrink-0">↑ Key finding</span>
          <span className="text-[10px] text-gray-600 dark:text-white/60 leading-relaxed">Organic search led at 5.8× ROI in Q4</span>
        </div>
      </div>
    </div>
  );
}

/* Card 2 — Multi-Channel: logo hub grid */
function MultiChannelVisual() {
  const L = MARKETING_STACK_LOGOS;
  const channels = [
    { name: "GA4",  bg: "bg-orange-50 dark:bg-orange-500/10", src: L.googleAnalytics4 },
    { name: "Ads",  bg: "bg-blue-50 dark:bg-blue-500/10",     src: L.googleAds },
    { name: "Meta", bg: "bg-indigo-50 dark:bg-indigo-500/10", src: L.metaAds },
    { name: "GSC",  bg: "bg-sky-50 dark:bg-sky-500/10",       src: L.googleSearchConsole },
  ];
  return (
    <div className="flex flex-col items-center gap-3 py-2">
      {/* Top row */}
      <div className="flex items-center gap-3">
        {channels.slice(0,2).map(c=>(
          <div key={c.name} className={`w-11 h-11 rounded-xl ${c.bg} border border-white/80 dark:border-white/10 flex items-center justify-center shadow-sm`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={c.src} alt={c.name} width={22} height={22} className="object-contain max-h-[22px] max-w-[22px]" onError={e=>{(e.target as HTMLImageElement).style.display="none"}}/>
          </div>
        ))}
      </div>
      {/* Arrow lines */}
      <svg width="80" height="28" viewBox="0 0 80 28" className="opacity-50">
        <line x1="20" y1="0" x2="40" y2="28" stroke="#6B5FF8" strokeWidth="1.5" strokeDasharray="3 2"/>
        <line x1="60" y1="0" x2="40" y2="28" stroke="#6B5FF8" strokeWidth="1.5" strokeDasharray="3 2"/>
      </svg>
      {/* Center hub */}
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-600 to-violet-500 flex items-center justify-center shadow-lg shadow-brand-500/30">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-icon.png" alt="Conalytic" width={32} height={32}/>
      </div>
      <svg width="80" height="28" viewBox="0 0 80 28" className="opacity-50 rotate-180">
        <line x1="20" y1="0" x2="40" y2="28" stroke="#6B5FF8" strokeWidth="1.5" strokeDasharray="3 2"/>
        <line x1="60" y1="0" x2="40" y2="28" stroke="#6B5FF8" strokeWidth="1.5" strokeDasharray="3 2"/>
      </svg>
      {/* Bottom row */}
      <div className="flex items-center gap-3">
        {channels.slice(2).map(c=>(
          <div key={c.name} className={`w-11 h-11 rounded-xl ${c.bg} border border-white/80 dark:border-white/10 flex items-center justify-center shadow-sm`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={c.src} alt={c.name} width={22} height={22} className="object-contain max-h-[22px] max-w-[22px]" onError={e=>{(e.target as HTMLImageElement).style.display="none"}}/>
          </div>
        ))}
      </div>
      {/* Status */}
      <div className="flex items-center gap-1.5 mt-1">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"/>
        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">All sources connected</span>
      </div>
    </div>
  );
}

/* Card 3 — Automated Insights: trend + recommendation chips */
function AutoInsightsVisual() {
  return (
    <div className="w-full space-y-2.5">
      {/* Sparkline header */}
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] font-semibold text-gray-600 dark:text-white/60">AI Insight Score</span>
        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">+24% this week</span>
      </div>
      <svg width="100%" height="36" viewBox="0 0 160 36" preserveAspectRatio="none">
        <defs>
          <linearGradient id="insightGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6B5FF8" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="#6B5FF8" stopOpacity="0.02"/>
          </linearGradient>
        </defs>
        <path d="M0 30 C20 28,35 25,55 18 S90 10,110 12 S140 5,160 2 L160 36 L0 36 Z" fill="url(#insightGrad)"/>
        <path d="M0 30 C20 28,35 25,55 18 S90 10,110 12 S140 5,160 2" stroke="#6B5FF8" strokeWidth="2" fill="none" strokeLinecap="round"/>
      </svg>
      {/* Insight chips */}
      {[
        { icon:"📈", text:"ROAS up 18% vs last month", color:"bg-brand-50 dark:bg-brand-500/10 border-brand-100 dark:border-brand-500/20 text-brand-600 dark:text-brand-300" },
        { icon:"⚠️", text:"CTR drop detected in Paid Search", color:"bg-amber-50 dark:bg-amber-500/10 border-amber-100 dark:border-amber-500/20 text-amber-700 dark:text-amber-300" },
        { icon:"🎯", text:"Increase budget on Organic by 15%", color:"bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-300" },
      ].map((chip,i) => (
        <div key={i} className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-[11px] font-medium ${chip.color}`}>
          <span>{chip.icon}</span>
          <span>{chip.text}</span>
        </div>
      ))}
    </div>
  );
}

/* ── Mini chat visual ─────────────────────────────── */
function ChatVisual() {
  const messages = [
    { user: true,  text: "Which campaigns had the best ROI last quarter?" },
    { user: false, text: "Organic search led at 5.8× ROI — here's the breakdown..." },
    { user: true,  text: "Break that down by region for me." },
    { user: false, text: "North America led with 6.2× ROI, followed by Europe at 4.9×." },
  ];
  return (
    <div className="w-full bg-white dark:bg-[#13131E] rounded-2xl border border-gray-100 dark:border-white/[0.08] shadow-xl shadow-black/5 dark:shadow-black/40 overflow-hidden">
      {/* Window bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 dark:bg-[#0C0C12]/80 border-b border-gray-100 dark:border-white/[0.06]">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400"/>
        <span className="w-2.5 h-2.5 rounded-full bg-amber-400"/>
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"/>
        <span className="ml-3 text-[11px] font-mono text-gray-400 dark:text-white/30">Conalytic — Conversational Analytics</span>
        <span className="ml-auto flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"/>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">Live</span>
        </span>
      </div>
      <div className="p-4 space-y-3">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.user ? "justify-end" : "justify-start"}`}>
            {!m.user && (
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-brand-600 to-violet-500 flex items-center justify-center mr-2 shrink-0 mt-0.5">
                <span className="text-[7px] font-bold text-white">CA</span>
              </div>
            )}
            <div className={`max-w-[80%] px-3 py-2 rounded-xl text-xs leading-relaxed ${
              m.user
                ? "bg-brand-600 text-white rounded-br-sm"
                : "bg-gray-100 dark:bg-white/[0.06] text-gray-700 dark:text-white/80 rounded-bl-sm"
            }`}>
              {m.text}
            </div>
            {m.user && (
              <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-white/10 flex items-center justify-center ml-2 shrink-0 mt-0.5">
                <span className="text-[8px] font-bold text-gray-500 dark:text-white/50">U</span>
              </div>
            )}
          </div>
        ))}
        {/* Typing indicator */}
        <div className="flex justify-start">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-brand-600 to-violet-500 flex items-center justify-center mr-2 shrink-0">
            <span className="text-[7px] font-bold text-white">CA</span>
          </div>
          <div className="px-4 py-2.5 rounded-xl rounded-bl-sm bg-gray-100 dark:bg-white/[0.06] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-white/40 animate-bounce" style={{ animationDelay:"0ms" }}/>
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-white/40 animate-bounce" style={{ animationDelay:"150ms" }}/>
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-white/40 animate-bounce" style={{ animationDelay:"300ms" }}/>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Mini analytics visual ────────────────────────── */
const BAR_MAX_PX = 52;
const BAR_DATA = [
  { pct: 65, label: "Mon" },
  { pct: 80, label: "Tue" },
  { pct: 45, label: "Wed" },
  { pct: 90, label: "Thu" },
  { pct: 72, label: "Fri" },
  { pct: 95, label: "Sat" },
  { pct: 88, label: "Sun" },
];

function AnalyticsVisual() {
  const metrics = [
    { label: "Campaign ROI",  value: "4.8×",  change: "+18%" },
    { label: "Conversions",   value: "2,841", change: "+31%" },
    { label: "Avg. ROAS",     value: "3.2×",  change: "+12%" },
  ];

  return (
    <div className="w-full bg-white dark:bg-[#13131E] rounded-2xl border border-gray-100 dark:border-white/[0.08] shadow-xl shadow-black/5 dark:shadow-black/40 overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-white/[0.06]">
        <span className="text-xs font-semibold text-gray-700 dark:text-white/80">Performance Overview</span>
        <span className="text-[10px] text-gray-400 dark:text-white/40 bg-gray-100 dark:bg-white/[0.06] px-2 py-0.5 rounded-full">Last 7 days</span>
      </div>
      <div className="p-4 space-y-4">
        {/* Metric chips */}
        <div className="grid grid-cols-3 gap-2">
          {metrics.map(m => (
            <div key={m.label} className="bg-gray-50 dark:bg-white/[0.04] rounded-xl p-2.5 border border-gray-100 dark:border-white/[0.05]">
              <p className="text-[10px] text-gray-400 dark:text-white/50 mb-1 truncate">{m.label}</p>
              <p className="text-sm font-black text-gray-900 dark:text-white">{m.value}</p>
              <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">{m.change}</p>
            </div>
          ))}
        </div>

        {/* Bar chart — explicit px heights (same pattern as home page) */}
        <div className="bg-gray-50 dark:bg-white/[0.04] rounded-xl p-3">
          <p className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-white/40 font-medium mb-3">
            Daily Conversions
          </p>
          {/* Outer div height = BAR_MAX_PX + label row space */}
          <div className="flex items-end gap-1.5" style={{ height: BAR_MAX_PX + 4 }}>
            {BAR_DATA.map((bar, i) => {
              const barPx = Math.round((bar.pct / 100) * BAR_MAX_PX);
              return (
                <div key={bar.label} className="flex-1 flex flex-col items-center justify-end">
                  <div
                    className="w-full rounded-t-[3px]"
                    style={{
                      height: `${barPx}px`,
                      background: `rgba(107,95,248,${0.38 + i * 0.09})`,
                    }}
                  />
                </div>
              );
            })}
          </div>
          {/* Labels */}
          <div className="flex mt-2">
            {BAR_DATA.map(bar => (
              <span key={bar.label} className="flex-1 text-center text-[8px] text-gray-400 dark:text-white/30">
                {bar.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   PAGE CLIENT
══════════════════════════════════════════════════════ */
export interface ConversationalAnalyticsContentPreset {
  heroBadge?: string;
  heroTitleLine1?: string;
  heroTitleLine2?: string;
  heroSubtitle?: string;
  heroSecondarySubtitle?: string;
  coreCapabilitiesTitle?: string;
  coreCapabilitiesSubtitle?: string;
  ctaTitle?: string;
  ctaSubtitle?: string;
}

export function ConversationalAnalyticsClient({ content }: { content?: ConversationalAnalyticsContentPreset }) {
  const heroBadge = content?.heroBadge ?? "AI-Powered Analytics";
  const heroTitleLine1 = content?.heroTitleLine1 ?? "Conversational Analytics &";
  const heroTitleLine2 = content?.heroTitleLine2 ?? "Marketing Intelligence Platform";
  const heroSubtitle =
    content?.heroSubtitle ??
    "Transform how your team analyzes marketing data with AI-powered conversations. Conalytic lets you ask questions in plain English and get instant insights from GA4, Google Ads, Meta, and Search Console.";
  const heroSecondarySubtitle =
    content?.heroSecondarySubtitle ??
    "This isn't just a static dashboard — it's your intelligent analytics partner that turns complex data queries into simple conversations, helping you make data-driven decisions faster than ever before.";
  const coreCapabilitiesSubtitle = content?.coreCapabilitiesSubtitle ?? "Core Capabilities";
  const coreCapabilitiesTitle = content?.coreCapabilitiesTitle ?? "Everything you need to understand your marketing data";

  return (
    <>
      {/* ── 1. HERO ──────────────────────────────────── */}
      <section className="relative overflow-hidden pt-32 pb-24 px-4 hero-gradient">
        <div className="absolute inset-0 grid-overlay opacity-[0.08] dark:opacity-[0.05] pointer-events-none"/>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full blur-3xl bg-brand-600/12 dark:bg-brand-600/18 pointer-events-none"/>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:0.6, ease:EASE }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-300 border border-brand-100 dark:border-brand-500/20 mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse"/>
            {heroBadge}
          </motion.div>

          <motion.h1
            initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:0.75, delay:0.1, ease:EASE }}
            className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight tracking-tight"
          >
            {heroTitleLine1} <span style={GRAD}>{heroTitleLine2}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:0.75, delay:0.2, ease:EASE }}
            className="text-lg text-gray-500 dark:text-white/70 mb-4 max-w-3xl mx-auto leading-relaxed"
          >
            {heroSubtitle}
          </motion.p>

          <motion.p
            initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:0.75, delay:0.25, ease:EASE }}
            className="text-gray-400 dark:text-white/55 text-base mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            {heroSecondarySubtitle}
          </motion.p>

          <motion.div
            initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:0.75, delay:0.3, ease:EASE }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a href="https://app.conalytic.com/signup" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold text-white bg-brand-600 hover:bg-brand-700 shadow-xl shadow-brand-600/25 transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
            >
              Get Started
              <ArrowRight className="w-4 h-4"/>
            </a>
            <a href="https://app.conalytic.com/demo" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold text-gray-700 dark:text-white/85 border-2 border-gray-300 dark:border-white/20 bg-white/60 dark:bg-white/[0.04] hover:bg-white dark:hover:bg-white/[0.08] hover:border-brand-400 dark:hover:border-brand-400/50 backdrop-blur-sm transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
            >
              Book a Demo
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── 2. KEY FEATURES — bento cards with live mockups ── */}
      <section className="py-24 px-4 bg-[#F6F7FE] dark:bg-[#0E0E14]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:0.7, ease:EASE }}
            className="text-center mb-12"
          >
            <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-300 border border-brand-100 dark:border-brand-500/20 mb-4">
              {coreCapabilitiesSubtitle}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
              {coreCapabilitiesTitle}
            </h2>
          </motion.div>

          {/* Bento grid: Card 1 wide (2/3), Card 2 narrow (1/3) on top; Card 3 full-width below */}
          <motion.div
            variants={stagger} initial="hidden" whileInView="show"
            viewport={{ once:true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
          >

            {/* Card 1 — Natural Language Queries — spans 2 cols */}
            <motion.div variants={fadeUp}
              className="md:col-span-2 relative rounded-2xl p-7 overflow-hidden group
                bg-white dark:bg-[#14141B]
                border border-gray-100 dark:border-white/[0.07]
                shadow-sm hover:shadow-xl dark:hover:shadow-black/50
                hover:-translate-y-0.5 transition-all duration-300"
            >
              {/* Top-left glow */}
              <div className="absolute -top-10 -left-10 w-48 h-48 rounded-full bg-brand-400/10 dark:bg-brand-500/15 blur-3xl pointer-events-none"/>
              {/* Grid texture */}
              <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06] pointer-events-none"
                style={{ backgroundImage:"linear-gradient(#6B5FF8 1px,transparent 1px),linear-gradient(90deg,#6B5FF8 1px,transparent 1px)", backgroundSize:"32px 32px" }}/>

              <div className="relative z-10">
                {/* Eyebrow */}
                <div className="inline-flex items-center gap-1.5 bg-brand-50 dark:bg-brand-500/10 border border-brand-100 dark:border-brand-500/20 text-brand-600 dark:text-brand-300 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-4">
                  <MessageSquare className="w-3 h-3"/>
                  Natural Language
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1.5">Natural Language Queries</h3>
                <p className="text-sm text-gray-500 dark:text-white/60 mb-6 max-w-sm leading-relaxed">
                  Ask complex analytics questions in plain English and get instant visualizations with AI-generated insights.
                </p>
                {/* Live visual */}
                <NLQVisual/>
              </div>
            </motion.div>

            {/* Card 2 — Multi-Channel — 1 col */}
            <motion.div variants={fadeUp}
              className="relative rounded-2xl p-7 overflow-hidden group
                bg-gradient-to-br from-white to-blue-50/60 dark:from-[#14141B] dark:to-[#111520]
                border border-gray-100 dark:border-white/[0.07]
                shadow-sm hover:shadow-xl dark:hover:shadow-black/50
                hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-blue-400/10 blur-3xl pointer-events-none"/>

              <div className="relative z-10">
                <div className="inline-flex items-center gap-1.5 bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 text-blue-600 dark:text-blue-300 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-4">
                  <Globe className="w-3 h-3"/>
                  Multi-Channel
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1.5">Multi-Channel Integration</h3>
                <p className="text-sm text-gray-500 dark:text-white/60 mb-6 leading-relaxed">
                  Connect GA4, Google Ads, Meta Ads, and Search Console into one unified warehouse.
                </p>
                <MultiChannelVisual/>
              </div>
            </motion.div>

            {/* Card 3 — Automated Insights — full width */}
            <motion.div variants={fadeUp}
              className="md:col-span-3 relative rounded-2xl p-7 overflow-hidden group
                bg-gradient-to-br from-white to-emerald-50/40 dark:from-[#14141B] dark:to-[#111A14]
                border border-gray-100 dark:border-white/[0.07]
                shadow-sm hover:shadow-xl dark:hover:shadow-black/50
                hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="absolute -bottom-10 -right-10 w-56 h-56 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none"/>
              <div className="absolute inset-0 opacity-[0.025] dark:opacity-[0.05] pointer-events-none"
                style={{ backgroundImage:"linear-gradient(#10b981 1px,transparent 1px),linear-gradient(90deg,#10b981 1px,transparent 1px)", backgroundSize:"32px 32px" }}/>

              <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                {/* Left: text */}
                <div>
                  <div className="inline-flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-4">
                    <Sparkles className="w-3 h-3"/>
                    Automated Insights
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1.5">Automated Insights</h3>
                  <p className="text-sm text-gray-500 dark:text-white/60 leading-relaxed">
                    Receive AI-powered recommendations, trend analysis, and actionable next steps with every query response.
                  </p>
                  {/* Capability tags */}
                  <div className="flex flex-wrap gap-2 mt-5">
                    {["Trend Detection","Anomaly Alerts","Budget Recs","ROAS Forecasting"].map(tag=>(
                      <span key={tag} className="text-[11px] font-medium px-3 py-1.5 rounded-full bg-gray-100 dark:bg-white/[0.06] text-gray-600 dark:text-white/60 border border-gray-200 dark:border-white/[0.08]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                {/* Right: insight visual */}
                <AutoInsightsVisual/>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* ── 3. VALUE PROPOSITION ─────────────────────── */}
      <section className="relative py-16 px-4 overflow-hidden bg-white dark:bg-[#0C0C12]">
        {/* Accent glow */}
        <div className="absolute inset-0 pointer-events-none hidden dark:block"
          style={{ background:"radial-gradient(ellipse 60% 50% at 50% 100%, rgba(107,95,248,0.09) 0%, transparent 70%)" }}/>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:0.7, ease:EASE }}
          >
            <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-300 border border-orange-100 dark:border-orange-500/20 mb-4">
              Why Conalytic
            </span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-5 leading-tight">
              Want to save more on your analytics budget?
            </h2>
            <p className="text-gray-500 dark:text-white/65 leading-relaxed mb-4 max-w-2xl mx-auto">
              Save time and money with Conalytic&apos;s intelligent conversational analytics platform.
              Replace expensive BI tools and complex dashboards with our intuitive chat interface.
            </p>
            <p className="text-gray-400 dark:text-white/50 text-sm mb-6 max-w-2xl mx-auto leading-relaxed">
              Get insights in seconds instead of hours. Transform your analytics workflow with natural
              language processing that understands marketing context.
            </p>
            <p className="text-brand-600 dark:text-brand-400 font-semibold text-sm">
              More than 100 integrated data points from major advertising platforms including Google
              Ads, Meta Ads, GA4, Search Console, and more.
            </p>
          </motion.div>

          {/* Quick stats row */}
          <motion.div
            initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:0.7, delay:0.15, ease:EASE }}
            className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {[
              { val:"100+", label:"Data integrations" },
              { val:"<3s",  label:"Response time" },
              { val:"94%",  label:"Faster than BI tools" },
              { val:"4.9★", label:"Customer rating" },
            ].map(s => (
              <div key={s.label} className="bg-[#F6F7FE] dark:bg-white/[0.04] rounded-2xl p-5 border border-gray-100 dark:border-white/[0.06]">
                <p className="text-3xl font-black text-gray-900 dark:text-white mb-1" style={GRAD}>{s.val}</p>
                <p className="text-xs text-gray-400 dark:text-white/55 font-medium">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 4. PRICING — reuse exact home page component ── */}
      <Pricing />

      {/* ── 5. COLLABORATION ─────────────────────────── */}
      <section className="relative py-24 px-4 overflow-hidden bg-white dark:bg-[#0C0C12]">
        <div className="absolute inset-0 pointer-events-none hidden dark:block"
          style={{ background:"radial-gradient(ellipse 55% 50% at -5% 50%, rgba(107,95,248,0.10) 0%, transparent 65%)" }}/>

        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: text + features */}
            <motion.div
              initial={{ opacity:0, x:-30 }} whileInView={{ opacity:1, x:0 }}
              viewport={{ once:true }} transition={{ duration:0.7, ease:EASE }}
            >
              <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-300 border border-brand-100 dark:border-brand-500/20 mb-4">
                Collaboration
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                Collaborate Seamlessly,<br/>Anytime, Anywhere
              </h2>
              <p className="text-gray-500 dark:text-white/65 leading-relaxed mb-8">
                Whether you&apos;re analyzing campaign performance, sharing insights with
                stakeholders, or discussing optimization strategies, everything happens in real-time
                with AI assistance.
              </p>
              <ul className="space-y-5">
                {collaborationFeatures.map((feat) => (
                  <li key={feat.title} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-600/20 border border-brand-100 dark:border-brand-500/20 flex items-center justify-center shrink-0">
                      <feat.icon className="w-5 h-5 text-brand-600 dark:text-brand-300"/>
                    </div>
                    <div>
                      <p className="text-gray-900 dark:text-white font-semibold mb-1">{feat.title}</p>
                      <p className="text-gray-500 dark:text-white/60 text-sm leading-relaxed">{feat.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <a href="https://app.conalytic.com/signup" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-8 px-8 py-3.5 rounded-xl text-base font-semibold text-white bg-brand-600 hover:bg-brand-700 shadow-lg shadow-brand-600/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                Get Started
                <ArrowRight className="w-4 h-4"/>
              </a>
            </motion.div>

            {/* Right: chat visual */}
            <motion.div
              initial={{ opacity:0, x:30 }} whileInView={{ opacity:1, x:0 }}
              viewport={{ once:true }} transition={{ duration:0.7, delay:0.1, ease:EASE }}
            >
              <ChatVisual/>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 6. PERFORMANCE MONITORING ────────────────── */}
      <section className="relative py-24 px-4 overflow-hidden bg-[#F6F7FE] dark:bg-[#0E0E14]">
        <div className="absolute inset-0 pointer-events-none hidden dark:block"
          style={{ background:"radial-gradient(ellipse 55% 50% at 105% 50%, rgba(107,95,248,0.10) 0%, transparent 65%)" }}/>

        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: analytics visual */}
            <motion.div
              initial={{ opacity:0, x:-30 }} whileInView={{ opacity:1, x:0 }}
              viewport={{ once:true }} transition={{ duration:0.7, ease:EASE }}
            >
              <AnalyticsVisual/>
            </motion.div>

            {/* Right: text + bullets */}
            <motion.div
              initial={{ opacity:0, x:30 }} whileInView={{ opacity:1, x:0 }}
              viewport={{ once:true }} transition={{ duration:0.7, delay:0.1, ease:EASE }}
            >
              <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-500/20 mb-4">
                Performance
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                Stay on Top of Your<br/>Marketing Performance
              </h2>
              <p className="text-gray-500 dark:text-white/65 leading-relaxed mb-8">
                Monitor campaign ROI, conversion tracking, and performance optimization with
                Conalytic&apos;s intelligent conversational analytics.
              </p>
              <ul className="space-y-4 mb-8">
                {performanceBullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-500/15 border border-emerald-200 dark:border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400"/>
                    </div>
                    <span className="text-gray-600 dark:text-white/70 text-sm leading-relaxed">{bullet}</span>
                  </li>
                ))}
              </ul>
              <a href="https://app.conalytic.com/signup" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold text-white bg-brand-600 hover:bg-brand-700 shadow-lg shadow-brand-600/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                Get Started
                <ArrowRight className="w-4 h-4"/>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      <CTA
        title={content?.ctaTitle}
        subtitle={content?.ctaSubtitle}
      />
    </>
  );
}

"use client";

import { motion } from "framer-motion";
import { MessageSquare, Sparkles, BarChart3, Zap, Calendar, ShieldCheck, ArrowRight, CheckCircle2, Lock, Shield } from "lucide-react";
import { CTA } from "@/components/sections/CTA";
import { MARKETING_STACK_LOGOS } from "@/lib/marketing-stack-logos";

const EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const GRAD: React.CSSProperties = { background:"linear-gradient(135deg,#6B5FF8 0%,#a78bfa 55%,#ec4899 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" };

/* ═══════════════════════════════════════════════
   BENTO CARD MINI-VISUALS
═══════════════════════════════════════════════ */

/** 1 · Conversational Analytics — mini chat Q&A */
function ConversationalVisual() {
  return (
    <div className="w-full h-full flex flex-col gap-2 p-1">
      {/* User query */}
      <div className="flex justify-end">
        <div className="flex items-end gap-1.5 max-w-[85%]">
          <div className="bg-brand-600 text-white text-[10px] leading-relaxed px-3 py-2 rounded-2xl rounded-br-sm">
            Which campaigns had the best ROI?
          </div>
          <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-white/10 flex items-center justify-center shrink-0 mb-0.5">
            <span className="text-[7px] font-black text-gray-500 dark:text-white/50">U</span>
          </div>
        </div>
      </div>
      {/* AI response */}
      <div className="flex items-end gap-1.5">
        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-brand-600 to-violet-500 flex items-center justify-center shrink-0 mb-0.5">
          <span className="text-[6px] font-black text-white">CA</span>
        </div>
        <div className="bg-gray-100 dark:bg-white/[0.07] text-gray-700 dark:text-white/80 text-[10px] leading-relaxed px-3 py-2 rounded-2xl rounded-bl-sm max-w-[85%]">
          Brand Search led at <span className="font-bold text-brand-600 dark:text-brand-300">4.8× ROAS</span>, Retargeting at <span className="font-bold text-emerald-600 dark:text-emerald-400">3.9×</span>.
        </div>
      </div>
      {/* Mini bar chart response */}
      <div className="mt-1 bg-gray-50 dark:bg-white/[0.04] rounded-xl p-2.5 border border-gray-100 dark:border-white/[0.05]">
        <div className="flex items-end gap-1.5 h-8">
          {[{h:80,l:"Brand"},{h:55,l:"Retarg."},{h:40,l:"Display"},{h:65,l:"Video"}].map((b,i)=>(
            <div key={b.l} className="flex-1 flex flex-col items-center justify-end gap-0.5">
              <div className="w-full rounded-t-[2px]" style={{height:`${Math.round(b.h*0.01*28)}px`,background:`rgba(107,95,248,${0.45+i*0.1})`}}/>
              <span className="text-[7px] text-gray-400 dark:text-white/30 truncate w-full text-center">{b.l}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Typing indicator */}
      <div className="flex items-center gap-1.5">
        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-brand-600 to-violet-500 flex items-center justify-center shrink-0">
          <span className="text-[6px] font-black text-white">CA</span>
        </div>
        <div className="bg-gray-100 dark:bg-white/[0.07] px-3 py-2 rounded-2xl rounded-bl-sm flex gap-1 items-center">
          <span className="w-1 h-1 rounded-full bg-gray-400 dark:bg-white/40 animate-bounce" style={{animationDelay:"0ms"}}/>
          <span className="w-1 h-1 rounded-full bg-gray-400 dark:bg-white/40 animate-bounce" style={{animationDelay:"120ms"}}/>
          <span className="w-1 h-1 rounded-full bg-gray-400 dark:bg-white/40 animate-bounce" style={{animationDelay:"240ms"}}/>
        </div>
      </div>
    </div>
  );
}

/** 2 · AI-Powered Insights — floating insight chips + sparkline */
const SPARK = [22,30,25,38,28,44,34,50,42,58];
function AIInsightsVisual() {
  const max = Math.max(...SPARK);
  const pts = SPARK.map((v,i)=>`${(i/(SPARK.length-1))*100},${100-(v/max)*80}`).join(" ");
  return (
    <div className="w-full h-full flex flex-col gap-2 p-1">
      {/* Sparkline chart */}
      <div className="bg-gray-50 dark:bg-white/[0.04] rounded-xl p-3 border border-gray-100 dark:border-white/[0.05]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[9px] uppercase tracking-wider text-gray-400 dark:text-white/35 font-semibold">Performance Trend</span>
          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">↑ 32%</span>
        </div>
        <svg viewBox="0 0 100 60" className="w-full h-10" preserveAspectRatio="none">
          <defs>
            <linearGradient id="sg1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6B5FF8" stopOpacity="0.18"/>
              <stop offset="100%" stopColor="#6B5FF8" stopOpacity="0"/>
            </linearGradient>
          </defs>
          <polygon points={`0,100 ${pts} 100,100`} fill="url(#sg1)"/>
          <polyline points={pts} fill="none" stroke="#6B5FF8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      {/* Insight chips */}
      {[
        { color:"bg-brand-50 dark:bg-brand-500/10 border-brand-100 dark:border-brand-500/20 text-brand-700 dark:text-brand-300", icon:"↑", text:"ROAS up 18% · increase budget" },
        { color:"bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-300", icon:"✓", text:"CTR outperforming benchmark" },
        { color:"bg-amber-50 dark:bg-amber-500/10 border-amber-100 dark:border-amber-500/20 text-amber-700 dark:text-amber-300", icon:"!", text:"CPC spike on Brand Search" },
      ].map((chip,i)=>(
        <div key={i} className={`flex items-center gap-2 px-2.5 py-2 rounded-xl border text-[10px] font-semibold ${chip.color}`}>
          <span className="shrink-0">{chip.icon}</span>
          <span className="leading-tight">{chip.text}</span>
        </div>
      ))}
    </div>
  );
}

/** 3 · Custom Report Builder — mini drag-and-drop canvas */
function ReportBuilderVisual() {
  const blocks = [
    { w:"w-full", h:"h-5",   bg:"bg-brand-100 dark:bg-brand-500/15", text:"Executive Summary" },
    { w:"w-2/3",  h:"h-10",  bg:"bg-blue-50 dark:bg-blue-500/10",    text:"Revenue Chart" },
    { w:"w-1/3",  h:"h-10",  bg:"bg-emerald-50 dark:bg-emerald-500/10", text:"ROAS" },
    { w:"w-full", h:"h-4",   bg:"bg-violet-50 dark:bg-violet-500/10", text:"AI Commentary" },
  ];
  return (
    <div className="w-full h-full flex flex-col gap-1.5 p-1">
      {/* Toolbar */}
      <div className="flex items-center gap-1.5 px-2 py-1.5 bg-gray-50 dark:bg-white/[0.04] rounded-lg border border-gray-100 dark:border-white/[0.05] mb-1">
        {["Text","Chart","KPI","AI"].map(t=>(
          <span key={t} className="text-[9px] font-semibold text-gray-500 dark:text-white/40 px-1.5 py-0.5 rounded bg-white dark:bg-white/[0.05] border border-gray-200 dark:border-white/[0.07] cursor-default">
            {t}
          </span>
        ))}
        <span className="ml-auto text-[9px] text-brand-600 dark:text-brand-400 font-bold">+ Add block</span>
      </div>
      {/* Canvas blocks */}
      <div className="flex flex-col gap-1.5 flex-1">
        {blocks.map((b,i)=>(
          <div key={i} className="flex gap-1.5">
            <div className={`${b.w} ${b.h} ${b.bg} rounded-lg border border-gray-200 dark:border-white/[0.06] flex items-center justify-between px-2 cursor-grab group`}>
              <span className="text-[8px] font-semibold text-gray-500 dark:text-white/45">{b.text}</span>
              <span className="text-[8px] text-gray-300 dark:text-white/20 opacity-0 group-hover:opacity-100 transition-opacity">⠿</span>
            </div>
            {b.w==="w-2/3" && (
              <div className="w-1/3 h-10 bg-emerald-50 dark:bg-emerald-500/10 rounded-lg border border-gray-200 dark:border-white/[0.06] flex items-center justify-center">
                <span className="text-[8px] font-black text-emerald-600 dark:text-emerald-400">4.2×</span>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Export bar */}
      <div className="flex items-center gap-1.5 mt-1">
        <div className="flex-1 h-6 bg-brand-600 rounded-lg flex items-center justify-center">
          <span className="text-[9px] font-bold text-white">Export PDF</span>
        </div>
        <div className="h-6 px-2 bg-gray-100 dark:bg-white/[0.06] rounded-lg flex items-center">
          <span className="text-[9px] font-semibold text-gray-500 dark:text-white/45">Share</span>
        </div>
      </div>
    </div>
  );
}

/** 4 · Real-Time Data Sync — sources → BigQuery */
function DataSyncVisual() {
  const L = MARKETING_STACK_LOGOS;
  const sources = [
    { name: "GA4",  label: "GA4",  src: L.googleAnalytics4 },
    { name: "Ads",  label: "Ads",  src: L.googleAds },
    { name: "Meta", label: "Meta", src: L.metaAds },
    { name: "GSC",  label: "GSC",  src: L.googleSearchConsole },
  ];
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-1">
      {/* Sources row */}
      <div className="flex items-center gap-2 w-full justify-center">
        {sources.map(s=>(
          <div key={s.name} className="flex flex-col items-center gap-1">
            <div className="w-8 h-8 rounded-xl border border-gray-100 dark:border-white/[0.08] bg-white dark:bg-white/[0.06] flex items-center justify-center shadow-sm p-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.src} alt="" width={18} height={18} className="object-contain max-w-[18px] max-h-[18px]" />
            </div>
            <span className="text-[7px] text-gray-400 dark:text-white/30">{s.label}</span>
          </div>
        ))}
      </div>
      {/* Animated arrows */}
      <div className="w-full flex justify-center gap-2">
        {sources.map((_,i)=>(
          <div key={i} className="flex flex-col items-center gap-0.5">
            <div className="w-px h-4 bg-gradient-to-b from-gray-300 dark:from-white/20 to-emerald-400 dark:to-emerald-500"/>
            <span className="w-1 h-1 rounded-full bg-emerald-400 animate-bounce" style={{animationDelay:`${i*100}ms`}}/>
          </div>
        ))}
      </div>
      {/* BigQuery hub */}
      <div className="w-full bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-500/10 dark:to-teal-500/10 rounded-2xl border border-emerald-200 dark:border-emerald-500/20 p-3 flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center shrink-0">
          <Zap className="w-4 h-4 text-white"/>
        </div>
        <div>
          <p className="text-[10px] font-black text-gray-900 dark:text-white">BigQuery</p>
          <p className="text-[9px] text-gray-500 dark:text-white/50">Unified warehouse · syncing now</p>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"/>
          <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-semibold">Live</span>
        </div>
      </div>
      {/* Last sync */}
      <div className="flex items-center justify-between w-full px-1">
        <span className="text-[9px] text-gray-400 dark:text-white/35">Last sync: 2 min ago</span>
        <span className="text-[9px] font-semibold text-emerald-600 dark:text-emerald-400">2.5M rows ↑</span>
      </div>
    </div>
  );
}

/** 5 · Automated Reporting — mini calendar + schedule */
function AutoReportingVisual() {
  const days = ["M","T","W","T","F","S","S"];
  const sent = [1, 4, 8, 11, 15, 18, 22, 25, 29];
  const today = 16;
  const nums = Array.from({length:30},(_,i)=>i+1);
  return (
    <div className="w-full h-full flex flex-col gap-2 p-1">
      {/* Month header */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-black text-gray-700 dark:text-white/80">July 2025</span>
        <span className="text-[9px] text-pink-600 dark:text-pink-400 font-semibold bg-pink-50 dark:bg-pink-500/10 border border-pink-100 dark:border-pink-500/20 px-2 py-0.5 rounded-full">Auto-schedule on</span>
      </div>
      {/* Day headers */}
      <div className="grid grid-cols-7 gap-0.5">
        {days.map((d, i) => (
          <span key={`cal-h-${i}`} className="text-[7px] text-center text-gray-400 dark:text-white/30 font-semibold">{d}</span>
        ))}
      </div>
      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-0.5">
        {nums.map(n=>{
          const isSent = sent.includes(n);
          const isToday = n===today;
          return (
            <div key={n} className={`aspect-square rounded flex items-center justify-center text-[7px] font-semibold relative
              ${isToday ? "bg-pink-600 text-white rounded-lg" :
                isSent ? "bg-pink-50 dark:bg-pink-500/10 text-pink-600 dark:text-pink-400" :
                "text-gray-400 dark:text-white/25"}`}>
              {n}
              {isSent && !isToday && <span className="absolute -top-0.5 -right-0.5 w-1 h-1 rounded-full bg-pink-500"/>}
            </div>
          );
        })}
      </div>
      {/* Next scheduled */}
      <div className="flex items-center gap-2 bg-pink-50 dark:bg-pink-500/10 border border-pink-100 dark:border-pink-500/20 rounded-xl px-2.5 py-2 mt-auto">
        <Calendar className="w-3.5 h-3.5 text-pink-500 shrink-0"/>
        <div>
          <p className="text-[9px] font-bold text-gray-700 dark:text-white/75">Next report: Jul 18</p>
          <p className="text-[8px] text-gray-400 dark:text-white/40">Monthly Performance · Auto-send</p>
        </div>
        <CheckCircle2 className="w-3.5 h-3.5 text-pink-500 ml-auto shrink-0"/>
      </div>
    </div>
  );
}

/** 6 · Enterprise Security — SOC2 + encryption indicators */
function SecurityVisual() {
  const checks = [
    { label:"SOC 2 Type II",     status:"certified",  icon:"🛡️" },
    { label:"AES-256 Encryption", status:"active",     icon:"🔒" },
    { label:"GDPR Compliant",    status:"certified",  icon:"✓" },
    { label:"SSO / MFA",         status:"active",     icon:"👤" },
  ];
  return (
    <div className="w-full h-full flex flex-col gap-2 p-1">
      {/* Shield badge */}
      <div className="flex items-center gap-2 bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 rounded-xl px-3 py-2.5">
        <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center shrink-0">
          <Shield className="w-4 h-4 text-white"/>
        </div>
        <div>
          <p className="text-[10px] font-black text-gray-900 dark:text-white">Enterprise-grade</p>
          <p className="text-[9px] text-gray-500 dark:text-white/50">All systems protected</p>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"/>
          <span className="text-[9px] text-indigo-600 dark:text-indigo-400 font-semibold">Secure</span>
        </div>
      </div>
      {/* Check list */}
      <div className="flex flex-col gap-1.5 flex-1">
        {checks.map((c,i)=>(
          <div key={i} className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl bg-gray-50 dark:bg-white/[0.04] border border-gray-100 dark:border-white/[0.05]">
            <span className="text-base leading-none">{c.icon}</span>
            <span className="text-[10px] font-semibold text-gray-700 dark:text-white/75 flex-1">{c.label}</span>
            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${c.status==="certified" ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-500/20" : "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-500/20"}`}>
              {c.status}
            </span>
          </div>
        ))}
      </div>
      {/* Role access */}
      <div className="flex items-center gap-1.5 px-2 py-1.5 bg-gray-50 dark:bg-white/[0.04] rounded-xl border border-gray-100 dark:border-white/[0.05]">
        <Lock className="w-3 h-3 text-gray-400 dark:text-white/30 shrink-0"/>
        <span className="text-[9px] text-gray-400 dark:text-white/40 font-medium">Role-based access · Audit logs · 99.9% uptime</span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   BENTO CARD DATA
═══════════════════════════════════════════════ */
const BENTO_CARDS = [
  { title:"Conversational Analytics",  desc:"Ask questions in plain English and get instant insights from your GA4, Google Ads, and Meta data.",                              icon:MessageSquare, glow:"from-brand-400/10 to-violet-400/5",   border:"border-brand-400/20 dark:border-brand-500/20",   bg:"bg-white dark:bg-[#14141B]", Visual:ConversationalVisual },
  { title:"AI-Powered Insights",        desc:"Automatically generate trend analysis, recommendations, and actionable insights from your marketing data.",                    icon:Sparkles,      glow:"from-amber-400/10 to-orange-400/5",   border:"border-amber-400/20 dark:border-amber-500/20",   bg:"bg-white dark:bg-[#14141B]", Visual:AIInsightsVisual    },
  { title:"Custom Report Builder",      desc:"Design professional, branded reports with drag-and-drop simplicity and white-label capabilities.",                             icon:BarChart3,     glow:"from-blue-400/10 to-cyan-400/5",      border:"border-blue-400/20 dark:border-blue-500/20",     bg:"bg-white dark:bg-[#14141B]", Visual:ReportBuilderVisual },
  { title:"Real-Time Data Sync",        desc:"Connect all your marketing platforms to BigQuery for unified, always-current analytics.",                                      icon:Zap,           glow:"from-emerald-400/10 to-teal-400/5",   border:"border-emerald-400/20 dark:border-emerald-500/20",bg:"bg-white dark:bg-[#14141B]",Visual:DataSyncVisual     },
  { title:"Automated Reporting",        desc:"Schedule and deliver branded reports automatically with AI commentary and recommendations.",                                   icon:Calendar,      glow:"from-pink-400/10 to-rose-400/5",      border:"border-pink-400/20 dark:border-pink-500/20",     bg:"bg-white dark:bg-[#14141B]", Visual:AutoReportingVisual },
  { title:"Enterprise Security",        desc:"SOC 2 compliant with encrypted data storage and enterprise-grade access controls.",                                           icon:ShieldCheck,   glow:"from-indigo-400/10 to-purple-400/5",  border:"border-indigo-400/20 dark:border-indigo-500/20", bg:"bg-white dark:bg-[#14141B]", Visual:SecurityVisual      },
];

/* ── Deep-dive section visuals ────────────────────── */
function ChatMockup() {
  const msgs = [
    { user:true,  text:"How did Google Ads perform last month?" },
    { user:false, text:"CPC dropped 22% · CTR up 18% · ROAS: 4.2× — your best month yet." },
    { user:true,  text:"Which campaigns drove the most conversions?" },
    { user:false, text:"Brand Search led at 38%, followed by Retargeting at 27%." },
  ];
  return (
    <div className="w-full bg-white dark:bg-[#13131E] rounded-2xl border border-gray-100 dark:border-white/[0.08] shadow-xl overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 dark:bg-[#0C0C12]/80 border-b border-gray-100 dark:border-white/[0.06]">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400"/><span className="w-2.5 h-2.5 rounded-full bg-amber-400"/><span className="w-2.5 h-2.5 rounded-full bg-emerald-400"/>
        <span className="ml-3 text-[11px] font-mono text-gray-400 dark:text-white/30">Conalytic Chat</span>
        <span className="ml-auto flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"/><span className="text-[10px] text-emerald-500 font-medium">Live</span></span>
      </div>
      <div className="p-4 space-y-3">
        {msgs.map((m,i)=>(
          <div key={i} className={`flex ${m.user?"justify-end":"justify-start"}`}>
            {!m.user&&<div className="w-6 h-6 rounded-full bg-gradient-to-br from-brand-600 to-violet-500 flex items-center justify-center mr-2 shrink-0 mt-0.5"><span className="text-[7px] font-bold text-white">CA</span></div>}
            <div className={`max-w-[80%] px-3 py-2 rounded-xl text-xs leading-relaxed ${m.user?"bg-brand-600 text-white rounded-br-sm":"bg-gray-100 dark:bg-white/[0.06] text-gray-700 dark:text-white/80 rounded-bl-sm"}`}>{m.text}</div>
            {m.user&&<div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-white/10 flex items-center justify-center ml-2 shrink-0 mt-0.5"><span className="text-[8px] font-bold text-gray-500 dark:text-white/50">U</span></div>}
          </div>
        ))}
        <div className="flex justify-start"><div className="w-6 h-6 rounded-full bg-gradient-to-br from-brand-600 to-violet-500 flex items-center justify-center mr-2 shrink-0"><span className="text-[7px] font-bold text-white">CA</span></div><div className="px-4 py-2.5 rounded-xl rounded-bl-sm bg-gray-100 dark:bg-white/[0.06] flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-white/40 animate-bounce" style={{animationDelay:"0ms"}}/><span className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-white/40 animate-bounce" style={{animationDelay:"150ms"}}/><span className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-white/40 animate-bounce" style={{animationDelay:"300ms"}}/></div></div>
      </div>
    </div>
  );
}

const PERF_MAX = 48;
const PERF_BARS = [{pct:55,lbl:"GA4"},{pct:80,lbl:"Ads"},{pct:45,lbl:"Meta"},{pct:68,lbl:"GSC"},{pct:92,lbl:"BQ"}];
function PerfMockup() {
  return (
    <div className="w-full bg-white dark:bg-[#13131E] rounded-2xl border border-gray-100 dark:border-white/[0.08] shadow-xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-white/[0.06]">
        <span className="text-xs font-semibold text-gray-700 dark:text-white/80">Campaign Performance</span>
        <span className="text-[10px] bg-gray-100 dark:bg-white/[0.06] text-gray-400 dark:text-white/40 px-2 py-0.5 rounded-full">This month</span>
      </div>
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-3 gap-2">
          {[{l:"Total ROAS",v:"4.2×",c:"text-brand-600 dark:text-brand-300"},{l:"CTR",v:"3.8%",c:"text-emerald-600 dark:text-emerald-400"},{l:"Conversions",v:"1,284",c:"text-blue-600 dark:text-blue-400"}].map(m=>(
            <div key={m.l} className="bg-gray-50 dark:bg-white/[0.04] rounded-xl p-2.5 border border-gray-100 dark:border-white/[0.05]">
              <p className="text-[9px] text-gray-400 dark:text-white/40 mb-1">{m.l}</p>
              <p className={`text-sm font-black ${m.c}`}>{m.v}</p>
            </div>
          ))}
        </div>
        <div className="bg-gray-50 dark:bg-white/[0.04] rounded-xl p-3">
          <p className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-white/30 font-medium mb-3">ROAS by Channel</p>
          <div className="flex items-end gap-2" style={{height:PERF_MAX+4}}>
            {PERF_BARS.map((b,i)=>(
              <div key={b.lbl} className="flex-1 flex flex-col items-center justify-end gap-1">
                <span className="text-[8px] text-gray-500 dark:text-white/40 font-semibold">{(b.pct/20).toFixed(1)}×</span>
                <div className="w-full rounded-t-[3px]" style={{height:`${Math.round((b.pct/100)*PERF_MAX)}px`,background:`rgba(107,95,248,${0.4+i*0.12})`}}/>
              </div>
            ))}
          </div>
          <div className="flex mt-1.5">{PERF_BARS.map(b=><span key={b.lbl} className="flex-1 text-center text-[8px] text-gray-400 dark:text-white/25">{b.lbl}</span>)}</div>
        </div>
      </div>
    </div>
  );
}

function ReportMockup() {
  return (
    <div className="w-full bg-white dark:bg-[#13131E] rounded-2xl border border-gray-100 dark:border-white/[0.08] shadow-xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-[#0C0C12]/80 border-b border-gray-100 dark:border-white/[0.06]">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-brand-600 flex items-center justify-center"><BarChart3 className="w-3 h-3 text-white"/></div>
          <span className="text-xs font-semibold text-gray-700 dark:text-white/80">Monthly Marketing Report</span>
        </div>
        <span className="text-[10px] bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 px-2 py-0.5 rounded-full font-medium">Auto-generated</span>
      </div>
      <div className="p-4 space-y-3">
        {[
          {label:"Executive Summary",  ai:true,  preview:"GA4 sessions up 34% · ROAS improved to 4.2× across all channels this month."},
          {label:"Google Ads Analysis", ai:true,  preview:"Facebook Ads drove 40% more leads at 25% lower cost vs. last quarter."},
          {label:"Recommendations",    ai:true,  preview:"Increase Organic Search budget by 20% — highest ROI channel at 5.8×."},
        ].map(s=>(
          <div key={s.label} className="bg-gray-50 dark:bg-white/[0.04] rounded-xl p-3 border border-gray-100 dark:border-white/[0.05]">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-semibold text-gray-700 dark:text-white/70">{s.label}</span>
              {s.ai&&<span className="text-[9px] bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-300 border border-brand-100 dark:border-brand-500/20 px-1.5 py-0.5 rounded-full font-medium">AI</span>}
            </div>
            <p className="text-[10px] text-gray-500 dark:text-white/55 leading-relaxed">{s.preview}</p>
          </div>
        ))}
        <button className="w-full text-center text-[11px] font-semibold text-brand-600 dark:text-brand-400 py-2 border border-dashed border-brand-200 dark:border-brand-500/30 rounded-xl hover:bg-brand-50 dark:hover:bg-brand-500/5 transition-colors">
          + Export PDF / Share Link
        </button>
      </div>
    </div>
  );
}

const deepDives = [
  { badge:"Chat Interface",      badgeColor:"bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-300 border-brand-100 dark:border-brand-500/20",   title:"Chat With Your Data, Anytime, Anywhere",         desc:"Whether you're analyzing campaigns, tracking conversions, or exploring trends, everything happens through natural conversation with AI.", bullets:['Ask "How did Google Ads perform last month?" and get instant answers',"Automatic visualizations created from your queries in seconds","Context-aware conversations that remember your previous questions"], cta:{label:"Book a demo",href:"https://app.conalytic.com/demo"}, Visual:ChatMockup,  sectionBg:"bg-white dark:bg-[#0C0C12]",         glow:"radial-gradient(ellipse 55% 50% at -5% 50%, rgba(107,95,248,0.09) 0%, transparent 65%)" },
  { badge:"Performance Tracking", badgeColor:"bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-100 dark:border-emerald-500/20", title:"Track Performance That Actually Matters",  desc:"Monitor campaign ROI, conversion trends, and team productivity with AI-generated insights that guide your next move.",                    bullets:["See campaign performance metrics that impact your bottom line","Track conversion rates, CTR, ROAS across all marketing channels","Get AI recommendations for optimization opportunities"],          cta:{label:"Try It Today",href:"https://app.conalytic.com/signup"}, Visual:PerfMockup,  sectionBg:"bg-[#F6F7FE] dark:bg-[#0E0E14]", glow:"radial-gradient(ellipse 55% 50% at 105% 50%, rgba(16,185,129,0.08) 0%, transparent 65%)" },
  { badge:"Report Builder",       badgeColor:"bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-100 dark:border-blue-500/20",             title:"Build Reports That Wow Clients",          desc:"Create stunning, branded reports with AI insights embedded directly into every page — no more manual commentary needed.",                  bullets:["Drag-and-drop report builder with custom branding options","AI automatically generates insights and recommendations for each section","Schedule weekly, monthly, or quarterly reports for automatic delivery"],cta:{label:"Try It Free Today",href:"https://app.conalytic.com/signup"}, Visual:ReportMockup,sectionBg:"bg-white dark:bg-[#0C0C12]",         glow:"radial-gradient(ellipse 55% 50% at -5% 50%, rgba(107,95,248,0.09) 0%, transparent 65%)" },
];

export interface FeaturesContentPreset {
  heroBadge?: string;
  heroTitleLine1?: string;
  heroTitleLine2?: string;
  heroSubtitle?: string;
  heroPrimaryCtaLabel?: string;
  includedTitle?: string;
  includedSubtitle?: string;
  ctaTitle?: string;
  ctaSubtitle?: string;
}

export function FeaturesClient({ content }: { content?: FeaturesContentPreset }) {
  const heroBadge = content?.heroBadge ?? "Platform Features";
  const heroTitleLine1 = content?.heroTitleLine1 ?? "Features That Make Analytics";
  const heroTitleLine2 = content?.heroTitleLine2 ?? "Fun, Easy & Productive!";
  const heroSubtitle =
    content?.heroSubtitle ??
    "From connecting data to real-time conversations and report building, Conalytic has everything your team needs to thrive.";
  const heroPrimaryCtaLabel = content?.heroPrimaryCtaLabel ?? "Try It Free Today";
  const includedTitle = content?.includedTitle ?? "One platform, every capability you need";
  const includedSubtitle = content?.includedSubtitle ?? "Everything included";

  return (
    <>
      {/* ── HERO ──────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-32 pb-24 px-4 hero-gradient">
        <div className="absolute inset-0 grid-overlay opacity-[0.08] dark:opacity-[0.05] pointer-events-none"/>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-3xl bg-brand-600/12 dark:bg-brand-600/18 pointer-events-none"/>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6,ease:EASE}}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-300 border border-brand-100 dark:border-brand-500/20 mb-6">
            <Sparkles className="w-3 h-3"/> {heroBadge}
          </motion.div>
          <motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.75,delay:0.1,ease:EASE}}
            className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight tracking-tight">
            {heroTitleLine1} <span style={GRAD}>{heroTitleLine2}</span>
          </motion.h1>
          <motion.p initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.75,delay:0.2,ease:EASE}}
            className="text-xl text-gray-500 dark:text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">
            {heroSubtitle}
          </motion.p>
          <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.75,delay:0.3,ease:EASE}}>
            <a href="https://app.conalytic.com/signup" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold text-white bg-brand-600 hover:bg-brand-700 shadow-xl shadow-brand-600/25 transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]">
              {heroPrimaryCtaLabel} <ArrowRight className="w-4 h-4"/>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURES BENTO GRID ───────────────────────── */}
      <section className="py-24 px-4 bg-[#F6F7FE] dark:bg-[#0E0E14]">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7,ease:EASE}} className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-300 border border-brand-100 dark:border-brand-500/20 mb-4">{includedSubtitle}</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight">{includedTitle}</h2>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{once:true}} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BENTO_CARDS.map(card=>(
              <motion.div key={card.title} variants={fadeUp}
                className={`relative flex flex-col rounded-2xl overflow-hidden ${card.bg} border border-gray-100 dark:border-white/[0.07] shadow-sm hover:shadow-xl dark:hover:shadow-black/50 hover:-translate-y-1 transition-all duration-300 group`}>
                {/* Gradient glow corner */}
                <div className={`absolute -top-10 -right-10 w-36 h-36 rounded-full bg-gradient-to-br ${card.glow} blur-2xl opacity-80 pointer-events-none`}/>
                {/* Visual area */}
                <div className="relative z-10 p-4 min-h-[200px] flex flex-col border-b border-gray-100 dark:border-white/[0.06]">
                  <card.Visual/>
                </div>
                {/* Text area */}
                <div className="relative z-10 p-5">
                  <div className={`inline-flex items-center gap-1.5 mb-3 px-2.5 py-1 rounded-lg border ${card.border} bg-gradient-to-br ${card.glow}`}>
                    <card.icon className="w-3.5 h-3.5 text-gray-600 dark:text-white/60"/>
                  </div>
                  <h3 className="text-gray-900 dark:text-white font-bold text-base mb-1.5 leading-snug">{card.title}</h3>
                  <p className="text-gray-500 dark:text-white/60 text-xs leading-relaxed">{card.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── DEEP DIVE SECTIONS ────────────────────────── */}
      {deepDives.map((s,idx)=>(
        <section key={s.title} className={`relative py-24 px-4 overflow-hidden ${s.sectionBg}`}>
          <div className="absolute inset-0 pointer-events-none hidden dark:block" style={{background:s.glow}}/>
          <div className="relative z-10 max-w-5xl mx-auto">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${idx%2===1?"":"lg:grid-flow-dense"}`}>
              {/* Text side */}
              <motion.div initial={{opacity:0,x:idx%2===1?30:-30}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.7,ease:EASE}}
                className={idx%2===1?"lg:col-start-2":""}>
                <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest border mb-4 ${s.badgeColor}`}>{s.badge}</span>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">{s.title}</h2>
                <p className="text-gray-500 dark:text-white/65 leading-relaxed mb-8">{s.desc}</p>
                <ul className="space-y-4 mb-8">
                  {s.bullets.map((b,i)=>(
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-brand-100 dark:bg-brand-500/15 border border-brand-200 dark:border-brand-500/20 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3 h-3 text-brand-600 dark:text-brand-400"/>
                      </div>
                      <span className="text-gray-600 dark:text-white/70 text-sm leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>
                <a href={s.cta.href} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold text-white bg-brand-600 hover:bg-brand-700 shadow-lg shadow-brand-600/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
                  {s.cta.label} <ArrowRight className="w-4 h-4"/>
                </a>
              </motion.div>
              {/* Visual side */}
              <motion.div initial={{opacity:0,x:idx%2===1?-30:30}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.7,delay:0.1,ease:EASE}}
                className={idx%2===1?"lg:col-start-1 lg:row-start-1":""}>
                <s.Visual/>
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      <CTA
        title={content?.ctaTitle}
        subtitle={content?.ctaSubtitle}
      />
    </>
  );
}

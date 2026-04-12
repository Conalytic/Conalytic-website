"use client";

/** Report Builder product page (marketing). */
import { motion } from "framer-motion";
import { LayoutTemplate, Sparkles, Calendar, ArrowRight, CheckCircle2, Palette, Link2, BarChart3 } from "lucide-react";
import { CTA } from "@/components/sections/CTA";
import { Pricing } from "@/components/home/sections/Pricing";

const EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const GRAD: React.CSSProperties = { background:"linear-gradient(135deg,#6B5FF8 0%,#a78bfa 55%,#ec4899 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" };

/* ── Mini visuals for key feature cards ─────────── */
function DragDropVisual() {
  const blocks = [
    {label:"Executive Summary", w:"col-span-2", h:"h-7", bg:"bg-brand-100 dark:bg-brand-500/15"},
    {label:"Revenue Chart",     w:"col-span-1", h:"h-12", bg:"bg-blue-50 dark:bg-blue-500/10"},
    {label:"ROAS KPI",          w:"col-span-1", h:"h-12", bg:"bg-emerald-50 dark:bg-emerald-500/10"},
    {label:"AI Insights",       w:"col-span-2", h:"h-6",  bg:"bg-violet-50 dark:bg-violet-500/10"},
  ];
  return (
    <div className="w-full p-3 space-y-2">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[9px] font-bold text-gray-500 dark:text-white/40 uppercase tracking-wider">Report Canvas</span>
        <span className="text-[9px] text-brand-600 dark:text-brand-400 font-semibold border border-brand-200 dark:border-brand-500/30 px-1.5 py-0.5 rounded-md">+ Add block</span>
      </div>
      <div className="grid grid-cols-2 gap-1.5">
        {blocks.map((b,i)=>(
          <div key={i} className={`${b.w} ${b.h} ${b.bg} rounded-lg border border-gray-200 dark:border-white/[0.07] flex items-center justify-between px-2.5 cursor-grab active:cursor-grabbing group`}>
            <span className="text-[8px] font-semibold text-gray-500 dark:text-white/50">{b.label}</span>
            <span className="text-gray-300 dark:text-white/15 text-sm leading-none opacity-0 group-hover:opacity-100 transition-opacity">⠿</span>
          </div>
        ))}
      </div>
      <div className="flex gap-1.5 mt-1.5">
        <div className="flex-1 h-7 bg-brand-600 rounded-lg flex items-center justify-center">
          <span className="text-[9px] font-bold text-white">Export PDF</span>
        </div>
        <div className="px-3 h-7 bg-gray-100 dark:bg-white/[0.06] rounded-lg flex items-center">
          <span className="text-[9px] font-semibold text-gray-500 dark:text-white/40">Share link</span>
        </div>
      </div>
    </div>
  );
}

const RB_SPARK = [28,35,30,42,38,52,44,58,48,64];
function AIInsightVisual() {
  const max = Math.max(...RB_SPARK);
  const pts = RB_SPARK.map((v,i)=>`${(i/(RB_SPARK.length-1))*100},${100-(v/max)*82}`).join(" ");
  return (
    <div className="w-full p-3 space-y-2">
      <div className="bg-gray-50 dark:bg-white/[0.04] rounded-xl p-2.5 border border-gray-100 dark:border-white/[0.05]">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[9px] font-bold text-gray-500 dark:text-white/45 uppercase tracking-wider">Trend</span>
          <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400">↑ 38%</span>
        </div>
        <svg viewBox="0 0 100 50" className="w-full h-8" preserveAspectRatio="none">
          <defs><linearGradient id="rbg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#6B5FF8" stopOpacity="0.2"/><stop offset="100%" stopColor="#6B5FF8" stopOpacity="0"/></linearGradient></defs>
          <polygon points={`0,100 ${pts} 100,100`} fill="url(#rbg)"/>
          <polyline points={pts} fill="none" stroke="#6B5FF8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      {[
        {c:"bg-brand-50 dark:bg-brand-500/10 text-brand-700 dark:text-brand-300 border-brand-100 dark:border-brand-500/20", i:"✦", t:"GA4 sessions up 34% this month"},
        {c:"bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-100 dark:border-amber-500/20",  i:"!", t:"Meta CPC spiked — review bids"},
        {c:"bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-100 dark:border-emerald-500/20", i:"↑", t:"ROAS 4.2× · increase budget"},
      ].map((chip,i)=>(
        <div key={i} className={`flex items-start gap-2 px-2.5 py-2 rounded-xl border text-[9px] font-semibold ${chip.c}`}>
          <span className="shrink-0 mt-px">{chip.i}</span><span>{chip.t}</span>
        </div>
      ))}
    </div>
  );
}

function ScheduleVisual() {
  const upcoming = [
    {label:"Monthly Report",    date:"Jul 1",  status:"sent",    color:"text-emerald-600 dark:text-emerald-400"},
    {label:"Weekly Summary",    date:"Jul 7",  status:"sent",    color:"text-emerald-600 dark:text-emerald-400"},
    {label:"Campaign Analysis", date:"Jul 14", status:"pending", color:"text-amber-600 dark:text-amber-400"},
    {label:"Quarterly Review",  date:"Jul 28", status:"pending", color:"text-gray-400 dark:text-white/35"},
  ];
  return (
    <div className="w-full p-3 space-y-2">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[9px] font-bold text-gray-500 dark:text-white/40 uppercase tracking-wider">Scheduled Reports</span>
        <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-semibold">Auto-send on</span>
      </div>
      {upcoming.map((r,i)=>(
        <div key={i} className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl bg-gray-50 dark:bg-white/[0.04] border border-gray-100 dark:border-white/[0.05]">
          <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${r.status==="sent" ? "bg-emerald-100 dark:bg-emerald-500/15" : "bg-gray-100 dark:bg-white/[0.06]"}`}>
            {r.status==="sent" ? <CheckCircle2 className="w-3 h-3 text-emerald-500"/> : <Calendar className="w-3 h-3 text-gray-400 dark:text-white/30"/>}
          </div>
          <span className="flex-1 text-[10px] font-semibold text-gray-700 dark:text-white/70">{r.label}</span>
          <span className={`text-[9px] font-bold ${r.color}`}>{r.date}</span>
        </div>
      ))}
    </div>
  );
}

const keyFeatures = [
  { icon:LayoutTemplate, title:"Drag-and-Drop Studio",  description:"Build professional reports with intuitive visual editor, custom branding, and white-label capabilities for client delivery.", glow:"from-brand-400/10 to-violet-400/5",   border:"border-brand-400/20 dark:border-brand-500/20",   Visual:DragDropVisual  },
  { icon:Sparkles,        title:"AI-Generated Insights", description:"Automatically generate contextual commentary, trend analysis, and actionable recommendations for every report section.",     glow:"from-amber-400/10 to-orange-400/5",   border:"border-amber-400/20 dark:border-amber-500/20",   Visual:AIInsightVisual },
  { icon:Calendar,        title:"Automated Scheduling",  description:"Set up weekly, monthly, or quarterly report delivery with fresh data and updated insights automatically generated.",         glow:"from-emerald-400/10 to-teal-400/5",   border:"border-emerald-400/20 dark:border-emerald-500/20",Visual:ScheduleVisual  },
];

const agencyBenefits = [
  { icon:Palette,  title:"Custom Branding",    description:"Upload your logo, set brand colors, and customize fonts across all reports." },
  { icon:Link2,    title:"Shareable Links",    description:"Responsive reports that look professional on desktop, tablet, and mobile."   },
  { icon:Calendar, title:"Automated Delivery", description:"Shareable links with your domain for seamless client experience."            },
];

/* ── Report builder preview mockup ──────────────────── */
const RB_MAX = 44;
const RB_BARS = [{pct:60,lbl:"Jan"},{pct:75,lbl:"Feb"},{pct:50,lbl:"Mar"},{pct:88,lbl:"Apr"},{pct:72,lbl:"May"},{pct:95,lbl:"Jun"}];

function ReportPreview() {
  return (
    <div className="w-full bg-white dark:bg-[#13131E] rounded-2xl border border-gray-100 dark:border-white/[0.08] shadow-xl overflow-hidden">
      {/* Report header */}
      <div className="px-5 py-4 bg-gradient-to-r from-brand-600 to-violet-600">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-white/20 flex items-center justify-center"><BarChart3 className="w-3 h-3 text-white"/></div>
            <span className="text-xs font-bold text-white">Monthly Performance Report</span>
          </div>
          <span className="text-[9px] bg-white/20 text-white px-2 py-0.5 rounded-full">June 2025</span>
        </div>
        <p className="text-[9px] text-white/70">Prepared by Conalytic · Auto-generated</p>
      </div>
      <div className="p-4 space-y-3">
        {/* KPIs */}
        <div className="grid grid-cols-3 gap-2">
          {[{l:"Sessions",v:"124k",t:"+22%"},{l:"ROAS",v:"4.8×",t:"+18%"},{l:"Revenue",v:"$82k",t:"+34%"}].map(k=>(
            <div key={k.l} className="bg-gray-50 dark:bg-white/[0.04] rounded-xl p-2.5 border border-gray-100 dark:border-white/[0.05] text-center">
              <p className="text-[9px] text-gray-400 dark:text-white/40 mb-0.5">{k.l}</p>
              <p className="text-sm font-black text-gray-900 dark:text-white">{k.v}</p>
              <p className="text-[9px] text-emerald-600 dark:text-emerald-400 font-semibold">{k.t}</p>
            </div>
          ))}
        </div>
        {/* Chart */}
        <div className="bg-gray-50 dark:bg-white/[0.04] rounded-xl p-3">
          <p className="text-[9px] uppercase tracking-wider text-gray-400 dark:text-white/30 font-medium mb-2">Monthly Revenue Trend</p>
          <div className="flex items-end gap-1.5" style={{height:RB_MAX+4}}>
            {RB_BARS.map((b,i)=>(
              <div key={b.lbl} className="flex-1 flex flex-col items-center justify-end">
                <div className="w-full rounded-t-[3px]" style={{height:`${Math.round((b.pct/100)*RB_MAX)}px`,background:`rgba(107,95,248,${0.35+i*0.11})`}}/>
              </div>
            ))}
          </div>
          <div className="flex mt-1.5">{RB_BARS.map(b=><span key={b.lbl} className="flex-1 text-center text-[8px] text-gray-400 dark:text-white/25">{b.lbl}</span>)}</div>
        </div>
        {/* AI insight */}
        <div className="flex items-start gap-2 bg-brand-50 dark:bg-brand-500/10 border border-brand-100 dark:border-brand-500/20 rounded-xl px-3 py-2.5">
          <Sparkles className="w-3 h-3 text-brand-600 dark:text-brand-400 mt-0.5 shrink-0"/>
          <p className="text-[10px] text-gray-600 dark:text-white/65 leading-relaxed">Facebook Ads drove 40% more leads at 25% lower cost — consider shifting 15% of Google budget to Meta.</p>
        </div>
      </div>
    </div>
  );
}

/* ── White-label preview ─────────────────────────────── */
function WhiteLabelPreview() {
  const brandColors = ["#6B5FF8","#10b981","#f59e0b","#ec4899","#0ea5e9"];
  return (
    <div className="w-full bg-white dark:bg-[#13131E] rounded-2xl border border-gray-100 dark:border-white/[0.08] shadow-xl overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 dark:bg-[#0C0C12]/80 border-b border-gray-100 dark:border-white/[0.06]">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400"/><span className="w-2.5 h-2.5 rounded-full bg-amber-400"/><span className="w-2.5 h-2.5 rounded-full bg-emerald-400"/>
        <span className="ml-3 text-[11px] font-mono text-gray-400 dark:text-white/30">Brand Customization Studio</span>
      </div>
      <div className="p-4 space-y-3">
        {/* Logo upload */}
        <div className="border-2 border-dashed border-gray-200 dark:border-white/10 rounded-xl p-4 text-center hover:border-brand-400 dark:hover:border-brand-400/50 transition-colors cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-500/10 border border-brand-100 dark:border-brand-500/20 flex items-center justify-center mx-auto mb-2">
            <Palette className="w-5 h-5 text-brand-600 dark:text-brand-400"/>
          </div>
          <p className="text-[11px] font-semibold text-gray-700 dark:text-white/70">Upload your logo</p>
          <p className="text-[10px] text-gray-400 dark:text-white/35 mt-0.5">PNG, SVG up to 2MB</p>
        </div>
        {/* Brand colors */}
        <div>
          <p className="text-[10px] font-semibold text-gray-600 dark:text-white/60 mb-2">Brand colours</p>
          <div className="flex items-center gap-2">
            {brandColors.map(c=>(
              <div key={c} className="w-8 h-8 rounded-lg border-2 border-white dark:border-white/10 shadow-sm cursor-pointer hover:scale-110 transition-transform" style={{backgroundColor:c}}/>
            ))}
            <div className="w-8 h-8 rounded-lg border-2 border-dashed border-gray-300 dark:border-white/15 flex items-center justify-center text-gray-400 dark:text-white/30 text-lg cursor-pointer hover:border-brand-400 transition-colors">+</div>
          </div>
        </div>
        {/* Preview tag */}
        <div className="flex items-center justify-between bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 rounded-xl px-3 py-2.5">
          <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400">White-label enabled</span>
          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"/><span className="text-[10px] text-emerald-600 dark:text-emerald-400">Conalytic branding hidden</span></span>
        </div>
      </div>
    </div>
  );
}

export interface ReportBuilderContentPreset {
  heroBadge?: string;
  heroTitleLine1?: string;
  heroTitleLine2?: string;
  heroSubtitle?: string;
  heroSecondarySubtitle?: string;
  coreFeaturesTitle?: string;
  coreFeaturesSubtitle?: string;
  valueTitle?: string;
  valueSubtitle?: string;
  ctaTitle?: string;
  ctaSubtitle?: string;
}

/** Shown in the amber hero pill while the product is pre-launch. */
const HERO_COMING_SOON_LABEL = "Coming soon";

export function ReportBuilderClient({ content }: { content?: ReportBuilderContentPreset }) {
  const heroTitleLine1 = content?.heroTitleLine1 ?? "Professional Report Builder &";
  const heroTitleLine2 = content?.heroTitleLine2 ?? "Automated Analytics Reporting";
  const heroSubtitle =
    content?.heroSubtitle ??
    "Transform your marketing reports from static data dumps into intelligent, branded presentations that clients actually read.";
  const heroSecondarySubtitle =
    content?.heroSecondarySubtitle ??
    "Perfect for agencies delivering client reports and marketing teams presenting to executives. Create stunning, white-label reports in minutes instead of hours.";
  const coreFeaturesSubtitle = content?.coreFeaturesSubtitle ?? "Core Features";
  const coreFeaturesTitle = content?.coreFeaturesTitle ?? "Reporting that practically writes itself";
  const valueTitle = content?.valueTitle ?? "Want to save 20+ hours weekly on report creation?";
  const valueSubtitle =
    content?.valueSubtitle ??
    "Eliminate manual reporting with intelligent report automation. Replace time-consuming copy-paste workflows with AI-powered report generation.";

  return (
    <>
      {/* ── HERO ────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-32 pb-24 px-4 hero-gradient">
        <div className="absolute inset-0 grid-overlay opacity-[0.08] dark:opacity-[0.05] pointer-events-none"/>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full blur-3xl bg-blue-600/10 dark:bg-blue-600/15 pointer-events-none"/>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full blur-3xl bg-brand-600/12 dark:bg-brand-600/18 pointer-events-none"/>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6,ease:EASE}}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold bg-amber-50 dark:bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-500/25 mb-6">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" aria-hidden/> {HERO_COMING_SOON_LABEL}
          </motion.div>
          <motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.75,delay:0.1,ease:EASE}}
            className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight tracking-tight">
            {heroTitleLine1} <span style={GRAD}>{heroTitleLine2}</span>
          </motion.h1>
          <motion.p initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.75,delay:0.2,ease:EASE}}
            className="text-lg text-gray-500 dark:text-white/70 mb-4 max-w-3xl mx-auto leading-relaxed">
            {heroSubtitle}
          </motion.p>
          <motion.p initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.75,delay:0.25,ease:EASE}}
            className="text-gray-400 dark:text-white/55 text-base mb-10 max-w-2xl mx-auto leading-relaxed">
            {heroSecondarySubtitle}
          </motion.p>
          <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.75,delay:0.3,ease:EASE}} className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold text-white bg-brand-600 hover:bg-brand-700 shadow-xl shadow-brand-600/25 transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]">
              Get Early Access <ArrowRight className="w-4 h-4"/>
            </a>
            <a href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold text-gray-700 dark:text-white/85 border-2 border-gray-300 dark:border-white/20 bg-white/60 dark:bg-white/[0.04] hover:bg-white dark:hover:bg-white/[0.08] hover:border-brand-400 dark:hover:border-brand-400/50 backdrop-blur-sm transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]">
              Book a Demo
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── KEY FEATURES ────────────────────────────── */}
      <section className="py-24 px-4 bg-[#F6F7FE] dark:bg-[#0E0E14]">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7,ease:EASE}} className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-300 border border-brand-100 dark:border-brand-500/20 mb-4">{coreFeaturesSubtitle}</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight">{coreFeaturesTitle}</h2>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{once:true}} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {keyFeatures.map(f=>(
              <motion.div key={f.title} variants={fadeUp}
                className={`relative flex flex-col rounded-2xl overflow-hidden bg-white dark:bg-[#14141B] border border-gray-100 dark:border-white/[0.07] shadow-sm hover:shadow-xl dark:hover:shadow-black/50 hover:-translate-y-1 transition-all duration-300 group`}>
                <div className={`absolute -top-10 -right-10 w-36 h-36 rounded-full bg-gradient-to-br ${f.glow} blur-2xl opacity-80 pointer-events-none`}/>
                {/* Visual */}
                <div className="relative z-10 border-b border-gray-100 dark:border-white/[0.06] min-h-[190px] flex flex-col">
                  <f.Visual/>
                </div>
                {/* Text */}
                <div className="relative z-10 p-5">
                  <div className={`inline-flex items-center gap-1.5 mb-3 px-2.5 py-1 rounded-lg border ${f.border} bg-gradient-to-br ${f.glow}`}>
                    <f.icon className="w-3.5 h-3.5 text-gray-600 dark:text-white/60"/>
                  </div>
                  <h3 className="text-gray-900 dark:text-white font-bold text-base mb-1.5 leading-snug">{f.title}</h3>
                  <p className="text-gray-500 dark:text-white/60 text-xs leading-relaxed">{f.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── VALUE PROPOSITION ───────────────────────── */}
      <section className="relative py-16 px-4 overflow-hidden bg-white dark:bg-[#0C0C12]">
        <div className="absolute inset-0 pointer-events-none hidden dark:block" style={{background:"radial-gradient(ellipse 60% 50% at 50% 100%, rgba(107,95,248,0.09) 0%, transparent 70%)"}}/>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7,ease:EASE}}>
            <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-300 border border-orange-100 dark:border-orange-500/20 mb-4">Why Conalytic Reports</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-5 leading-tight">{valueTitle}</h2>
            <p className="text-gray-500 dark:text-white/65 leading-relaxed mb-4 max-w-2xl mx-auto">{valueSubtitle}</p>
            <p className="text-gray-400 dark:text-white/50 text-sm mb-6 max-w-2xl mx-auto leading-relaxed">Generate client reports in 5 minutes instead of 5 hours. Transform your agency workflow with automated insights that add value to every deliverable.</p>
            <p className="text-brand-600 dark:text-brand-400 font-semibold text-sm">More than 50 professional templates with full white-label customization for Google Ads, Meta Ads, GA4, Search Console, and cross-channel performance analysis.</p>
          </motion.div>
          <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7,delay:0.15,ease:EASE}}
            className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[{val:"5 min",label:"Report creation time"},{val:"50+",label:"Pro templates"},{val:"20h+",label:"Saved per week"},{val:"100%",label:"White-label ready"}].map(s=>(
              <div key={s.label} className="bg-[#F6F7FE] dark:bg-white/[0.04] rounded-2xl p-5 border border-gray-100 dark:border-white/[0.06]">
                <p className="text-3xl font-black mb-1" style={GRAD}>{s.val}</p>
                <p className="text-xs text-gray-400 dark:text-white/55 font-medium">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PRICING ─────────────────────────────────── */}
      <Pricing/>

      {/* ── BUILD REPORTS SECTION ───────────────────── */}
      <section className="relative py-24 px-4 overflow-hidden bg-[#F6F7FE] dark:bg-[#0E0E14]">
        <div className="absolute inset-0 pointer-events-none hidden dark:block" style={{background:"radial-gradient(ellipse 55% 50% at 105% 50%, rgba(107,95,248,0.09) 0%, transparent 65%)"}}/>
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div initial={{opacity:0,x:-30}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.7,ease:EASE}}>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-100 dark:border-amber-500/20 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" aria-hidden/> Coming soon
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">Build Reports That Impress Clients</h2>
              <p className="text-gray-500 dark:text-white/65 leading-relaxed mb-8">Whether you're creating monthly performance reviews, campaign analysis, or executive summaries, every report includes AI-generated insights that explain what the data means and what to do next.</p>
              <ul className="space-y-4 mb-8">
                {["Drag widgets, charts, and KPI cards onto your branded canvas instantly",'AI automatically writes insights like "Facebook Ads drove 40% more leads at 25% lower cost"',"Schedule automatic delivery with fresh data and updated commentary"].map((b,i)=>(
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-brand-100 dark:bg-brand-500/15 border border-brand-200 dark:border-brand-500/20 flex items-center justify-center shrink-0 mt-0.5"><CheckCircle2 className="w-3 h-3 text-brand-600 dark:text-brand-400"/></div>
                    <span className="text-gray-600 dark:text-white/70 text-sm leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
              <a href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold text-white bg-brand-600 hover:bg-brand-700 shadow-lg shadow-brand-600/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
                Get Early Access <ArrowRight className="w-4 h-4"/>
              </a>
            </motion.div>
            <motion.div initial={{opacity:0,x:30}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.7,delay:0.1,ease:EASE}}>
              <ReportPreview/>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── WHITE-LABEL ─────────────────────────────── */}
      <section className="relative py-24 px-4 overflow-hidden bg-white dark:bg-[#0C0C12]">
        <div className="absolute inset-0 pointer-events-none hidden dark:block" style={{background:"radial-gradient(ellipse 55% 50% at -5% 50%, rgba(107,95,248,0.09) 0%, transparent 65%)"}}/>
        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7,ease:EASE}} className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-500/20 mb-4">White-Label</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">Perfect White-Label Solution for Agencies</h2>
            <p className="text-gray-500 dark:text-white/65 max-w-2xl mx-auto leading-relaxed">Remove all Conalytic branding and replace with your agency&apos;s logo, colors, and custom styling. Clients see only your brand on every report.</p>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{once:true}} className="space-y-5">
              {agencyBenefits.map(b=>(
                <motion.div key={b.title} variants={fadeUp} className="flex items-start gap-4 p-5 rounded-2xl bg-[#F6F7FE] dark:bg-white/[0.04] border border-gray-100 dark:border-white/[0.07]">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-600/20 border border-brand-100 dark:border-brand-500/20 flex items-center justify-center shrink-0">
                    <b.icon className="w-5 h-5 text-brand-600 dark:text-brand-300"/>
                  </div>
                  <div>
                    <p className="text-gray-900 dark:text-white font-semibold mb-1">{b.title}</p>
                    <p className="text-gray-500 dark:text-white/60 text-sm leading-relaxed">{b.description}</p>
                  </div>
                </motion.div>
              ))}
              <div className="pt-2">
                <a href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold text-white bg-brand-600 hover:bg-brand-700 shadow-lg shadow-brand-600/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
                  Get Early Access <ArrowRight className="w-4 h-4"/>
                </a>
              </div>
            </motion.div>
            <motion.div initial={{opacity:0,x:30}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.7,delay:0.1,ease:EASE}}>
              <WhiteLabelPreview/>
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

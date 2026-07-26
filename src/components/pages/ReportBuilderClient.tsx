"use client";

/** Report Builder product page (marketing). */
import { motion } from "framer-motion";
import { LayoutTemplate, Sparkles, Calendar, ArrowRight, CheckCircle2, Palette, Link2, BarChart3 } from "lucide-react";
import { CTA } from "@/components/sections/CTA";
import { Pricing } from "@/components/home/sections/Pricing";
import { ProductSuiteLinks } from "@/components/products/ProductSuiteLinks";
import { MarketingFaqSection } from "@/components/sections/MarketingFaqSection";
import { CHAT_APP_SIGNUP_URL } from "@/lib/app-urls";
import { REPORT_BUILDER_FAQ } from "@/lib/marketing-faqs";
import { SITE_ROUTES } from "@/lib/site-links";
import { getProduct } from "@/lib/products";
import { PRODUCT_PAGE_CONTENT } from "@/lib/product-page-content";
import {
  ProductCapabilitiesGrid,
  ProductDeepDive,
  ProductHeroVisual,
  ProductHowItWorks,
  ProductStatsStrip,
  ReportDeckTimeline,
} from "@/components/products/ProductPageSections";

const EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const GRAD: React.CSSProperties = { background:"linear-gradient(135deg,#c9ff33 0%,#b8eb2e 50%,#0f0f0f 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" };

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
          <defs><linearGradient id="rbg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#c9ff33" stopOpacity="0.2"/><stop offset="100%" stopColor="#c9ff33" stopOpacity="0"/></linearGradient></defs>
          <polygon points={`0,100 ${pts} 100,100`} fill="url(#rbg)"/>
          <polyline points={pts} fill="none" stroke="#c9ff33" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
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
  {
    icon: LayoutTemplate,
    title: "HTML presentation decks",
    description:
      "Generate multi-slide HTML reports with cover, executive summary, platform sections, cross-source findings, methodology, and action plan.",
    glow: "from-brand-400/10 to-violet-400/5",
    border: "border-brand-400/20 dark:border-brand-500/20",
    Visual: DragDropVisual,
  },
  {
    icon: Sparkles,
    title: "Optional AI insights",
    description:
      "Toggle AI narratives with GPT-5.4, Claude Opus 4.8, or Gemini 3.1 Pro for personalized slide copy, findings, and recommendations.",
    glow: "from-amber-400/10 to-orange-400/5",
    border: "border-amber-400/20 dark:border-amber-500/20",
    Visual: AIInsightVisual,
  },
  {
    icon: Calendar,
    title: "Date ranges & comparisons",
    description:
      "Last 7/28/30/90 days, last month, or custom up to 366 days. Compare previous period, same year, or previous year.",
    glow: "from-emerald-400/10 to-teal-400/5",
    border: "border-emerald-400/20 dark:border-emerald-500/20",
    Visual: ScheduleVisual,
  },
];

/* ── Report builder preview mockup ──────────────────── */
const RB_MAX = 44;
const RB_BARS = [{pct:60,lbl:"Jan"},{pct:75,lbl:"Feb"},{pct:50,lbl:"Mar"},{pct:88,lbl:"Apr"},{pct:72,lbl:"May"},{pct:95,lbl:"Jun"}];

function ReportPreview() {
  return (
    <div className="w-full bg-white dark:bg-[#13131E] rounded-2xl border border-gray-100 dark:border-white/[0.08] shadow-xl overflow-hidden">
      {/* Report header */}
      <div className="px-5 py-4 bg-gradient-to-r from-brand-600 to-brand-700">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-white/20 flex items-center justify-center"><BarChart3 className="w-3 h-3 text-brand-500"/></div>
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
                <div className="w-full rounded-t-[3px]" style={{height:`${Math.round((b.pct/100)*RB_MAX)}px`,background:`rgba(201,255,51,${0.35+i*0.11})`}}/>
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

/** Shown in the hero pill — product is live in the Conalytic app. */
const HERO_LIVE_LABEL = "Available in Conalytic";

export function ReportBuilderClient({ content }: { content?: ReportBuilderContentPreset }) {
  const reportProduct = getProduct("report-builder");
  const pageContent = PRODUCT_PAGE_CONTENT["report-builder"];
  const heroTitleLine1 = content?.heroTitleLine1 ?? reportProduct.heroTitleLine1;
  const heroTitleLine2 = content?.heroTitleLine2 ?? reportProduct.heroTitleLine2;
  const heroSubtitle = content?.heroSubtitle ?? reportProduct.description;
  const heroSecondarySubtitle =
    content?.heroSecondarySubtitle ??
    "Choose GA4, Search Console, Google Ads, and GTM sources, set date ranges and comparisons, toggle AI insights, and generate presentation-style reports with executive summary, platform sections, and an action plan.";
  const coreFeaturesSubtitle = content?.coreFeaturesSubtitle ?? "Core Features";
  const coreFeaturesTitle = content?.coreFeaturesTitle ?? "Reporting that practically writes itself";
  const valueTitle = content?.valueTitle ?? "Want to save 20+ hours weekly on report creation?";
  const valueSubtitle =
    content?.valueSubtitle ??
    "Eliminate manual reporting with intelligent report automation. Replace time-consuming copy-paste workflows with AI-powered report generation.";

  return (
    <>
      {/* ── HERO ────────────────────────────────────── */}
      <section className="relative overflow-hidden px-4 pt-24 pb-16 hero-gradient sm:pt-28 sm:pb-20 md:pt-32 md:pb-24">
        <div className="absolute inset-0 grid-overlay opacity-[0.08] dark:opacity-[0.05] pointer-events-none"/>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full blur-3xl bg-blue-600/10 dark:bg-blue-600/15 pointer-events-none"/>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full blur-3xl bg-brand-600/12 dark:bg-brand-600/18 pointer-events-none"/>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6,ease:EASE}}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold bg-brand-50 dark:bg-brand-500/15 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-500/25 mb-6">
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" aria-hidden/> {HERO_LIVE_LABEL}
          </motion.div>
          <motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.75,delay:0.1,ease:EASE}}
            className="marketing-hero-title text-gray-900 dark:text-white mb-6">
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
            <a href={CHAT_APP_SIGNUP_URL}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold text-brand-500 bg-brand-600 hover:bg-brand-500 hover:text-brand-600 shadow-xl shadow-brand-600/25 transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]">
              Generate your first report <ArrowRight className="w-4 h-4"/>
            </a>
            <a href={SITE_ROUTES.contact}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold text-gray-700 dark:text-white/85 border-2 border-gray-300 dark:border-white/20 bg-white/60 dark:bg-white/[0.04] hover:bg-white dark:hover:bg-white/[0.08] hover:border-brand-400 dark:hover:border-brand-400/50 backdrop-blur-sm transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]">
              Book a Demo
            </a>
          </motion.div>
        </div>

        <ProductHeroVisual variant="reports" />
      </section>

      <ProductStatsStrip stats={pageContent.stats} />

      <ProductHowItWorks steps={pageContent.howItWorks} />

      {/* ── KEY FEATURES ────────────────────────────── */}
      <section className="py-24 px-4 bg-[#f0f1f5] dark:bg-[#0E0E14]">
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

      <ProductCapabilitiesGrid
        title={pageContent.capabilityTitle}
        subtitle={pageContent.capabilitySubtitle}
        capabilities={pageContent.capabilities}
      />

      <ProductDeepDive
        title={pageContent.deepDiveTitle}
        subtitle={pageContent.deepDiveSubtitle}
        bullets={pageContent.deepDiveBullets}
        visual={<ReportDeckTimeline />}
      />

      {/* ── VALUE PROPOSITION ───────────────────────── */}
      <section className="relative py-16 px-4 overflow-hidden bg-white dark:bg-[#0C0C12]">
        <div className="absolute inset-0 pointer-events-none hidden dark:block" style={{background:"radial-gradient(ellipse 60% 50% at 50% 100%, rgba(201,255,51,0.09) 0%, transparent 70%)"}}/>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7,ease:EASE}}>
            <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-300 border border-orange-100 dark:border-orange-500/20 mb-4">Why Conalytic Reports</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-5 leading-tight">{valueTitle}</h2>
            <p className="text-gray-500 dark:text-white/65 leading-relaxed mb-4 max-w-2xl mx-auto">{valueSubtitle}</p>
            <p className="text-gray-400 dark:text-white/50 text-sm mb-6 max-w-2xl mx-auto leading-relaxed">
              Generate client-ready HTML decks from GA4, Search Console, Google Ads, and GTM in minutes — not hours of copy-paste into slides.
            </p>
            <p className="text-brand-600 dark:text-brand-400 font-semibold text-sm">
              View in-app or download HTML. Regenerate with frozen settings when your connected data refreshes.
            </p>
          </motion.div>
          <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7,delay:0.15,ease:EASE}}
            className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[{val:"12+",label:"Slide types per deck"},{val:"366",label:"Max day range"},{val:"4",label:"Active platforms"},{val:"HTML",label:"Output format"}].map(s=>(
              <div key={s.label} className="bg-[#f0f1f5] dark:bg-white/[0.04] rounded-2xl p-5 border border-gray-100 dark:border-white/[0.06]">
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
      <section className="relative py-24 px-4 overflow-hidden bg-[#f0f1f5] dark:bg-[#0E0E14]">
        <div className="absolute inset-0 pointer-events-none hidden dark:block" style={{background:"radial-gradient(ellipse 55% 50% at 105% 50%, rgba(201,255,51,0.09) 0%, transparent 65%)"}}/>
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div initial={{opacity:0,x:-30}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.7,ease:EASE}}>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-300 border border-brand-100 dark:border-brand-500/20 mb-4">
                Report Builder
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">Build Reports That Impress Clients</h2>
              <p className="text-gray-500 dark:text-white/65 leading-relaxed mb-8">Whether you&apos;re creating monthly performance reviews, campaign analysis, or executive summaries, every report includes AI-generated insights that explain what the data means and what to do next.</p>
              <ul className="space-y-4 mb-8">
                {["Generate HTML decks from GA4, GSC, Google Ads, and GTM in minutes",'Optional AI slide narratives explain trends like "Facebook Ads drove 40% more leads at 25% lower cost"',"Download HTML or regenerate when your connected data refreshes"].map((b,i)=>(
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-brand-100 dark:bg-brand-500/15 border border-brand-200 dark:border-brand-500/20 flex items-center justify-center shrink-0 mt-0.5"><CheckCircle2 className="w-3 h-3 text-brand-600 dark:text-brand-400"/></div>
                    <span className="text-gray-600 dark:text-white/70 text-sm leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
              <a href={CHAT_APP_SIGNUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold text-brand-500 bg-brand-600 hover:bg-brand-500 hover:text-brand-600 shadow-lg shadow-brand-600/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
                Start building reports <ArrowRight className="w-4 h-4"/>
              </a>
            </motion.div>
            <motion.div initial={{opacity:0,x:30}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.7,delay:0.1,ease:EASE}}>
              <ReportPreview/>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CLIENT DELIVERY ─────────────────────────── */}
      <section className="relative py-24 px-4 overflow-hidden bg-white dark:bg-[#0C0C12]">
        <div className="absolute inset-0 pointer-events-none hidden dark:block" style={{background:"radial-gradient(ellipse 55% 50% at -5% 50%, rgba(201,255,51,0.09) 0%, transparent 65%)"}}/>
        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7,ease:EASE}} className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-500/20 mb-4">Client delivery</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">Professional HTML decks for agency clients</h2>
            <p className="text-gray-500 dark:text-white/65 max-w-2xl mx-auto leading-relaxed">Set client name and report title on the cover slide. Download HTML for email delivery or walk through the in-app viewer on client calls.</p>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{once:true}} className="space-y-5">
              {[
                { icon: Palette, title: "Branded cover slides", description: "Client name and report title surface on every deck cover and card." },
                { icon: Link2, title: "Downloadable HTML", description: "Open in any browser — no PowerPoint license required for stakeholders." },
                { icon: Calendar, title: "Regenerate on refresh", description: "Frozen settings keep slide structure consistent when you regenerate after data updates." },
              ].map(b=>(
                <motion.div key={b.title} variants={fadeUp} className="flex items-start gap-4 p-5 rounded-2xl bg-[#f0f1f5] dark:bg-white/[0.04] border border-gray-100 dark:border-white/[0.07]">
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
                <a href={CHAT_APP_SIGNUP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold text-brand-500 bg-brand-600 hover:bg-brand-500 hover:text-brand-600 shadow-lg shadow-brand-600/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
                  Get started with Reports <ArrowRight className="w-4 h-4"/>
                </a>
              </div>
            </motion.div>
            <motion.div initial={{opacity:0,x:30}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.7,delay:0.1,ease:EASE}}>
              <ReportPreview/>
            </motion.div>
          </div>
        </div>
      </section>

      <ProductSuiteLinks current="report-builder" />

      <MarketingFaqSection
        items={REPORT_BUILDER_FAQ}
        title="Report Builder FAQ"
        subtitle="Answers about HTML marketing reports, GA4 and Google Ads deck automation, AI insights, and client delivery."
      />

      <CTA
        title={content?.ctaTitle}
        subtitle={content?.ctaSubtitle}
        primaryCta={{ label: "Get started", href: CHAT_APP_SIGNUP_URL }}
        secondaryCta={{ label: "Book a demo", href: SITE_ROUTES.contact }}
      />
    </>
  );
}

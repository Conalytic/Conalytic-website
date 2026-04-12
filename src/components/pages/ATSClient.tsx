"use client";

/** Applicant Tracking System product page (marketing). */
import { motion } from "framer-motion";
import { Users, Search, BarChart3, FileText, CheckCircle2, ArrowRight, Bell, Star } from "lucide-react";
import { CTA } from "@/components/sections/CTA";
import { Pricing } from "@/components/home/sections/Pricing";

const EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const GRAD: React.CSSProperties = { background:"linear-gradient(135deg,#6B5FF8 0%,#a78bfa 55%,#10b981 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" };

/* ── Mini visuals for ATS feature cards ─────────── */
function CandidateSearchVisual() {
  const candidates = [
    {name:"Sarah Chen",   role:"Sr. AI Engineer",  score:94, match:"bg-brand-600"},
    {name:"Alex Kumar",   role:"ML Engineer",       score:88, match:"bg-emerald-500"},
    {name:"Maya Patel",   role:"NLP Researcher",    score:82, match:"bg-blue-500"},
  ];
  return (
    <div className="w-full p-3 space-y-2">
      <div className="flex items-center gap-2 bg-gray-50 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.08] rounded-xl px-3 py-2 mb-2">
        <Search className="w-3.5 h-3.5 text-gray-400 dark:text-white/30 shrink-0"/>
        <span className="text-[10px] text-gray-500 dark:text-white/45 flex-1">Search candidates…</span>
        <span className="text-[9px] bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-100 dark:border-brand-500/20 px-1.5 py-0.5 rounded-md font-semibold">AI</span>
      </div>
      {candidates.map((c,i)=>(
        <div key={i} className="flex items-center gap-2.5 px-2.5 py-2 bg-gray-50 dark:bg-white/[0.04] rounded-xl border border-gray-100 dark:border-white/[0.05]">
          <div className={`w-7 h-7 rounded-full ${c.match} flex items-center justify-center shrink-0`}>
            <span className="text-[8px] font-black text-white">{c.name.split(" ").map(n=>n[0]).join("")}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-bold text-gray-800 dark:text-white/80 truncate">{c.name}</p>
            <p className="text-[8px] text-gray-400 dark:text-white/35 truncate">{c.role}</p>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[10px] font-black text-brand-600 dark:text-brand-300">{c.score}%</span>
            <Star className="w-2.5 h-2.5 text-amber-400 fill-amber-400"/>
          </div>
        </div>
      ))}
    </div>
  );
}

function CollabHiringVisual() {
  const team = [
    {init:"AJ", name:"Alex",  vote:"✓", color:"bg-brand-600",  voteBg:"bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"},
    {init:"SC", name:"Sarah", vote:"✓", color:"bg-emerald-600", voteBg:"bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"},
    {init:"MW", name:"Marcus",vote:"?", color:"bg-violet-600",  voteBg:"bg-gray-100 dark:bg-white/[0.06] text-gray-400 dark:text-white/35"},
  ];
  return (
    <div className="w-full p-3 space-y-2">
      <div className="bg-gray-50 dark:bg-white/[0.04] rounded-xl p-2.5 border border-gray-100 dark:border-white/[0.05] mb-1">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-brand-600 to-violet-600 flex items-center justify-center">
            <span className="text-[7px] font-black text-white">JD</span>
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-800 dark:text-white/80">James Doe</p>
            <p className="text-[8px] text-gray-400 dark:text-white/35">Sr. AI Engineer · Round 2</p>
          </div>
          <span className="ml-auto text-[9px] bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-500/20 px-1.5 py-0.5 rounded-full font-semibold">In Review</span>
        </div>
      </div>
      <p className="text-[8px] font-bold uppercase tracking-wider text-gray-400 dark:text-white/30 px-1">Team Votes</p>
      {team.map((m,i)=>(
        <div key={i} className="flex items-center gap-2.5 px-2.5 py-2 bg-gray-50 dark:bg-white/[0.04] rounded-xl border border-gray-100 dark:border-white/[0.05]">
          <div className={`w-6 h-6 rounded-full ${m.color} flex items-center justify-center shrink-0`}>
            <span className="text-[7px] font-black text-white">{m.init}</span>
          </div>
          <span className="flex-1 text-[10px] font-semibold text-gray-700 dark:text-white/70">{m.name}</span>
          <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${m.voteBg}`}>{m.vote}</span>
        </div>
      ))}
    </div>
  );
}

const ATS_PIPE_MAX = 40;
function HiringAnalyticsVisual() {
  const stages = [{l:"Applied",pct:100},{l:"Screened",pct:62},{l:"Interview",pct:38},{l:"Offer",pct:18}];
  return (
    <div className="w-full p-3 space-y-2">
      <div className="grid grid-cols-2 gap-1.5 mb-1">
        {[{l:"Time-to-hire",v:"12d",c:"text-brand-600 dark:text-brand-300"},{l:"Offer rate",v:"22%",c:"text-emerald-600 dark:text-emerald-400"}].map(m=>(
          <div key={m.l} className="bg-gray-50 dark:bg-white/[0.04] rounded-xl p-2 border border-gray-100 dark:border-white/[0.05] text-center">
            <p className="text-[8px] text-gray-400 dark:text-white/35">{m.l}</p>
            <p className={`text-sm font-black ${m.c}`}>{m.v}</p>
          </div>
        ))}
      </div>
      <p className="text-[8px] font-bold uppercase tracking-wider text-gray-400 dark:text-white/30 px-1">Pipeline Funnel</p>
      {stages.map((s,i)=>(
        <div key={i} className="space-y-0.5">
          <div className="flex items-center justify-between px-1">
            <span className="text-[9px] text-gray-600 dark:text-white/60 font-medium">{s.l}</span>
            <span className="text-[9px] font-bold text-gray-700 dark:text-white/70">{Math.round(s.pct*0.48)}  </span>
          </div>
          <div className="w-full bg-gray-100 dark:bg-white/[0.05] rounded-full h-1.5">
            <div className="h-1.5 rounded-full" style={{width:`${s.pct}%`,background:`rgba(107,95,248,${0.3+i*0.15})`}}/>
          </div>
        </div>
      ))}
    </div>
  );
}

function ResumeParsingVisual() {
  const fields = [
    {label:"Name",       value:"Sarah Chen",          done:true},
    {label:"Experience", value:"5 yrs · ML Engineer",  done:true},
    {label:"Skills",     value:"Python, NLP, TF, BQ",  done:true},
    {label:"Education",  value:"M.Sc. CS · Stanford",  done:true},
  ];
  return (
    <div className="w-full p-3 space-y-2">
      <div className="flex items-center gap-2 bg-amber-50 dark:bg-amber-500/10 border border-amber-100 dark:border-amber-500/20 rounded-xl px-2.5 py-2 mb-1">
        <FileText className="w-4 h-4 text-amber-500 shrink-0"/>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-bold text-gray-700 dark:text-white/75 truncate">sarah_chen_resume.pdf</p>
          <p className="text-[8px] text-gray-400 dark:text-white/35">Parsing with AI…</p>
        </div>
        <span className="w-3 h-3 rounded-full border-2 border-amber-400 border-t-transparent animate-spin shrink-0"/>
      </div>
      {fields.map((f,i)=>(
        <div key={i} className="flex items-center gap-2 px-2.5 py-1.5 bg-gray-50 dark:bg-white/[0.04] rounded-xl border border-gray-100 dark:border-white/[0.05]">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0"/>
          <span className="text-[9px] text-gray-400 dark:text-white/35 w-16 shrink-0">{f.label}</span>
          <span className="text-[9px] font-semibold text-gray-700 dark:text-white/70 truncate">{f.value}</span>
        </div>
      ))}
    </div>
  );
}

function WorkflowVisual() {
  const steps = [
    {label:"Application",  status:"done",    emoji:"📋"},
    {label:"Email sent",   status:"done",    emoji:"📧"},
    {label:"Interview",    status:"active",  emoji:"🎙️"},
    {label:"Decision",     status:"pending", emoji:"⏳"},
  ];
  return (
    <div className="w-full p-3 space-y-2">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[9px] font-bold text-gray-500 dark:text-white/40 uppercase tracking-wider">Candidate Workflow</span>
        <span className="text-[9px] text-pink-600 dark:text-pink-400 font-semibold flex items-center gap-1"><Bell className="w-2.5 h-2.5"/>Auto</span>
      </div>
      <div className="relative pl-5">
        <div className="absolute left-2 top-0 bottom-0 w-px bg-gradient-to-b from-brand-400/40 via-pink-400/30 to-transparent"/>
        <div className="space-y-2">
          {steps.map((s,i)=>(
            <div key={i} className="relative flex items-center gap-2.5">
              <div className={`absolute -left-3 w-2 h-2 rounded-full border-2 ${
                s.status==="done"    ? "bg-emerald-500 border-emerald-500" :
                s.status==="active" ? "bg-brand-600 border-brand-400 animate-pulse" :
                "bg-gray-200 dark:bg-white/10 border-gray-300 dark:border-white/15"
              }`}/>
              <span className="text-sm leading-none">{s.emoji}</span>
              <span className={`text-[10px] font-semibold ${
                s.status==="done" ? "text-emerald-600 dark:text-emerald-400" :
                s.status==="active" ? "text-brand-600 dark:text-brand-300" :
                "text-gray-400 dark:text-white/30"
              }`}>{s.label}</span>
              {s.status==="active" && <span className="text-[8px] bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-300 border border-brand-100 dark:border-brand-500/20 px-1.5 py-0.5 rounded-full font-bold ml-auto">Now</span>}
              {s.status==="done"   && <CheckCircle2 className="w-3 h-3 text-emerald-500 ml-auto shrink-0"/>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function OfferMgmtVisual() {
  return (
    <div className="w-full p-3 space-y-2">
      <div className="bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 rounded-xl p-2.5 mb-1">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded bg-indigo-600 flex items-center justify-center">
            <FileText className="w-3.5 h-3.5 text-white"/>
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-800 dark:text-white/80">Offer Letter · Sarah Chen</p>
            <p className="text-[8px] text-gray-400 dark:text-white/35">Sr. AI Engineer · $140k/yr</p>
          </div>
        </div>
        {["Salary: $140,000/yr","Start date: Aug 1","Equity: 0.12%"].map((l,i)=>(
          <div key={i} className="flex items-center gap-1.5 mb-0.5">
            <span className="w-1 h-1 rounded-full bg-indigo-400 shrink-0"/>
            <span className="text-[8px] text-gray-500 dark:text-white/50">{l}</span>
          </div>
        ))}
      </div>
      <div className="bg-gray-50 dark:bg-white/[0.04] border border-gray-100 dark:border-white/[0.05] rounded-xl px-3 py-2 flex items-center gap-2">
        <div className="w-16 h-6 bg-brand-50 dark:bg-brand-500/10 border border-brand-200 dark:border-brand-500/20 rounded flex items-center justify-center">
          <span className="text-[8px] text-brand-600 dark:text-brand-400 font-bold italic">Sarah C.</span>
        </div>
        <span className="text-[9px] text-gray-400 dark:text-white/40 flex-1">e-Signature</span>
        <span className="text-[9px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 border border-amber-100 dark:border-amber-500/20 px-2 py-0.5 rounded-full">Pending</span>
      </div>
      <div className="flex items-center justify-between px-1">
        <span className="text-[9px] text-gray-400 dark:text-white/35">Sent via secure link</span>
        <span className="text-[9px] font-semibold text-indigo-600 dark:text-indigo-400">Track opens →</span>
      </div>
    </div>
  );
}

const features = [
  { icon:Search,      title:"Smart Candidate Search",  description:"AI-powered search and filtering to find the perfect candidates from your talent pool instantly.",               glow:"from-brand-400/10 to-violet-400/5",   border:"border-brand-400/20 dark:border-brand-500/20",   Visual:CandidateSearchVisual },
  { icon:Users,       title:"Collaborative Hiring",     description:"Bring your whole team into the hiring process with shared notes, scorecards, and real-time collaboration.",    glow:"from-emerald-400/10 to-teal-400/5",   border:"border-emerald-400/20 dark:border-emerald-500/20",Visual:CollabHiringVisual   },
  { icon:BarChart3,   title:"Hiring Analytics",         description:"Track time-to-hire, source quality, pipeline conversion, and team performance with rich dashboards.",          glow:"from-blue-400/10 to-cyan-400/5",      border:"border-blue-400/20 dark:border-blue-500/20",     Visual:HiringAnalyticsVisual},
  { icon:FileText,    title:"Resume Parsing",           description:"Automatically extract and structure candidate information from resumes in any format.",                        glow:"from-amber-400/10 to-orange-400/5",   border:"border-amber-400/20 dark:border-amber-500/20",   Visual:ResumeParsingVisual  },
  { icon:Bell,        title:"Automated Workflows",      description:"Set up automated emails, interview reminders, and status updates to keep candidates engaged.",                 glow:"from-pink-400/10 to-rose-400/5",      border:"border-pink-400/20 dark:border-pink-500/20",     Visual:WorkflowVisual       },
  { icon:CheckCircle2,title:"Offer Management",         description:"Generate, send, and track offer letters digitally with e-signature support built in.",                         glow:"from-indigo-400/10 to-purple-400/5",  border:"border-indigo-400/20 dark:border-indigo-500/20", Visual:OfferMgmtVisual      },
];

const pipeline = [
  { step:"01", label:"Source",    description:"Post to job boards & collect applications",        color:"from-brand-600 to-violet-600" },
  { step:"02", label:"Screen",    description:"AI-assisted resume screening & scoring",            color:"from-violet-600 to-purple-600" },
  { step:"03", label:"Interview", description:"Schedule and conduct structured interviews",        color:"from-purple-600 to-indigo-600" },
  { step:"04", label:"Evaluate",  description:"Team scorecards and collaborative decisions",       color:"from-indigo-600 to-blue-600" },
  { step:"05", label:"Offer",     description:"Send offers and collect e-signatures",              color:"from-blue-600 to-cyan-600" },
  { step:"06", label:"Onboard",   description:"Seamless transition from hire to team member",     color:"from-cyan-600 to-emerald-600" },
];

export interface ATSContentPreset {
  heroBadge?: string;
  heroTitleLine1?: string;
  heroTitleLine2?: string;
  heroSubtitle?: string;
  heroPrimaryCtaLabel?: string;
  heroSecondaryCtaLabel?: string;
  featuresTitle?: string;
  featuresSubtitle?: string;
  ctaTitle?: string;
  ctaSubtitle?: string;
}

/** Shown in the amber hero pill while the product is pre-launch. */
const HERO_COMING_SOON_LABEL = "Coming soon";

export function ATSClient({ content }: { content?: ATSContentPreset }) {
  const heroTitleLine1 = content?.heroTitleLine1 ?? "Applicant Tracking System for";
  const heroTitleLine2 = content?.heroTitleLine2 ?? "Modern Teams";
  const heroSubtitle =
    content?.heroSubtitle ??
    "Streamline your entire recruitment process with AI-powered tools that help you source, screen, and hire the best talent faster. Built natively inside Conalytic so your hiring data lives alongside your marketing intelligence.";
  const heroPrimaryCtaLabel = content?.heroPrimaryCtaLabel ?? "Get Early Access";
  const heroSecondaryCtaLabel = content?.heroSecondaryCtaLabel ?? "Book a Demo";
  const featuresTitle = content?.featuresTitle ?? "Everything You Need to Hire Smarter";
  const featuresSubtitle =
    content?.featuresSubtitle ??
    "From first application to signed offer, Conalytic ATS handles every step of your recruitment workflow.";

  return (
    <>
      {/* ── HERO ────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-32 pb-24 px-4 hero-gradient">
        <div className="absolute inset-0 grid-overlay opacity-[0.08] dark:opacity-[0.05] pointer-events-none"/>
        <div className="absolute top-0 right-1/4 w-[600px] h-[500px] rounded-full blur-3xl bg-emerald-600/8 dark:bg-emerald-600/12 pointer-events-none"/>
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full blur-3xl bg-brand-600/10 dark:bg-brand-600/15 pointer-events-none"/>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6,ease:EASE}}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold bg-amber-50 dark:bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-500/25 mb-8">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" aria-hidden/> {HERO_COMING_SOON_LABEL}
          </motion.div>
          <motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.75,delay:0.1,ease:EASE}}
            className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight tracking-tight">
            {heroTitleLine1} <span style={GRAD}>{heroTitleLine2}</span>
          </motion.h1>
          <motion.p initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.75,delay:0.2,ease:EASE}}
            className="text-lg text-gray-500 dark:text-white/70 mb-6 max-w-3xl mx-auto leading-relaxed">
            {heroSubtitle}
          </motion.p>
          <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.75,delay:0.3,ease:EASE}} className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold text-white bg-brand-600 hover:bg-brand-700 shadow-xl shadow-brand-600/25 transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]">
              {heroPrimaryCtaLabel} <ArrowRight className="w-4 h-4"/>
            </a>
            <a href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold text-gray-700 dark:text-white/85 border-2 border-gray-300 dark:border-white/20 bg-white/60 dark:bg-white/[0.04] hover:bg-white dark:hover:bg-white/[0.08] hover:border-brand-400 dark:hover:border-brand-400/50 backdrop-blur-sm transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]">
              {heroSecondaryCtaLabel}
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURES ────────────────────────────────── */}
      <section className="py-24 px-4 bg-[#F6F7FE] dark:bg-[#0E0E14]">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7,ease:EASE}} className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-300 border border-brand-100 dark:border-brand-500/20 mb-4">ATS Capabilities</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">{featuresTitle}</h2>
            <p className="text-gray-500 dark:text-white/65 max-w-2xl mx-auto">{featuresSubtitle}</p>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{once:true}} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(f=>(
              <motion.div key={f.title} variants={fadeUp}
                className="relative flex flex-col rounded-2xl overflow-hidden bg-white dark:bg-[#14141B] border border-gray-100 dark:border-white/[0.07] shadow-sm hover:shadow-xl dark:hover:shadow-black/50 hover:-translate-y-1 transition-all duration-300 group">
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

      {/* ── PIPELINE ────────────────────────────────── */}
      <section className="relative py-24 px-4 overflow-hidden bg-white dark:bg-[#0C0C12]">
        <div className="absolute inset-0 pointer-events-none hidden dark:block" style={{background:"radial-gradient(ellipse 70% 60% at 50% 100%, rgba(107,95,248,0.08) 0%, transparent 70%)"}}/>
        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7,ease:EASE}} className="text-center mb-16">
            <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-300 border border-violet-100 dark:border-violet-500/20 mb-4">Hiring Pipeline</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">Your Complete Hiring Pipeline</h2>
            <p className="text-gray-500 dark:text-white/65">Every stage tracked, every candidate accounted for</p>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{once:true}} className="relative">
            {/* Connecting line */}
            <div className="hidden lg:block absolute top-6 left-[calc(8.33%+24px)] right-[calc(8.33%+24px)] h-0.5 bg-gradient-to-r from-brand-400/30 via-emerald-400/30 to-emerald-400/30"/>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {pipeline.map((stage,i)=>(
                <motion.div key={stage.step} variants={fadeUp} className="relative text-center group">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${stage.color} flex items-center justify-center text-white font-black text-sm mx-auto mb-3 shadow-lg shadow-brand-500/20 group-hover:scale-110 transition-transform duration-200 relative z-10`}>
                    {stage.step}
                  </div>
                  <h3 className="text-gray-900 dark:text-white font-semibold text-sm mb-1">{stage.label}</h3>
                  <p className="text-gray-400 dark:text-white/45 text-xs leading-snug">{stage.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS ───────────────────────────────────── */}
      <section className="py-24 px-4 bg-[#F6F7FE] dark:bg-[#0E0E14]">
        <div className="max-w-5xl mx-auto">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{once:true}} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { value:"60%",  label:"Reduction in time-to-hire",   desc:"Teams using Conalytic ATS fill roles 60% faster on average",           color:"text-brand-600 dark:text-brand-300" },
              { value:"3×",   label:"More quality candidates",      desc:"AI-powered screening surfaces the best talent from any pipeline",       color:"text-emerald-600 dark:text-emerald-400" },
              { value:"100%", label:"Candidate visibility",          desc:"Every team member stays in sync with a single source of truth",         color:"text-violet-600 dark:text-violet-400" },
            ].map(s=>(
              <motion.div key={s.label} variants={fadeUp}
                className="text-center p-8 rounded-2xl bg-white dark:bg-[#14141B] border border-gray-100 dark:border-white/[0.07] shadow-sm">
                <p className={`text-5xl font-black mb-2 ${s.color}`}>{s.value}</p>
                <p className="text-gray-900 dark:text-white font-semibold mb-2">{s.label}</p>
                <p className="text-gray-400 dark:text-white/55 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Pricing />

      <CTA
        title={content?.ctaTitle ?? "Be First to Access Conalytic ATS"}
        subtitle={content?.ctaSubtitle ?? "Join the waitlist and get early access when we launch"}
        primaryCta={{label:"Get Early Access", href:"/contact"}}
        secondaryCta={{label:"Learn More", href:"/features"}}
      />
    </>
  );
}

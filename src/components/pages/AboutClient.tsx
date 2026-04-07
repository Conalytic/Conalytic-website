"use client";

/** About page: mission, values, timeline-style story, CTA. */
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Database, Users, Zap, Target, Globe, Award, ArrowRight } from "lucide-react";
import { CTA } from "@/components/sections/CTA";
import { Pricing } from "@/components/home/sections/Pricing";

const EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = { hidden:{ opacity:0, y:28 }, show:{ opacity:1, y:0, transition:{ duration:0.65, ease:EASE } } };
const stagger = { hidden:{}, show:{ transition:{ staggerChildren:0.1 } } };
const GRAD: React.CSSProperties = { background:"linear-gradient(135deg,#6B5FF8 0%,#a78bfa 55%,#ec4899 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" };

const stats = [
  { value:"2.5M+",  label:"Data Points Analyzed", icon:Database, end:2.5,  suffix:"M+", isFloat:true  },
  { value:"2,000+", label:"Active Teams",          icon:Users,    end:2000, suffix:"+",  isFloat:false },
  { value:"99.9%",  label:"Platform Uptime",       icon:Zap,      end:99.9, suffix:"%",  isFloat:true  },
];

const milestones = [
  { year:"2022", title:"Founded",          desc:"Started with a simple idea — analytics should feel effortless.",              icon:Target },
  { year:"2023", title:"First 500 Teams",  desc:"Reached 500 active teams using Conalytic to make data-driven decisions.",     icon:Users  },
  { year:"2024", title:"10M+ Queries",     desc:"Crossed 10 million AI analytics queries answered across all customers.",      icon:Globe  },
  { year:"2025", title:"Industry Leader",  desc:"Recognized as a leading conversational analytics platform for marketers.",    icon:Award  },
];

export interface AboutContentPreset {
  heroBadge?: string;
  heroTitleLine1?: string;
  heroTitleLine2?: string;
  heroSubtitle?: string;
  storyBadge?: string;
  storyTitle?: string;
  ctaTitle?: string;
  ctaSubtitle?: string;
}

function CountUp({ end, suffix, isFloat }: { end: number; suffix: string; isFloat: boolean }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      obs.disconnect();
      const start = performance.now();
      const dur = 1600;
      const frame = (now: number) => {
        const t = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        setValue(isFloat ? Math.round(eased * end * 10) / 10 : Math.round(eased * end));
        if (t < 1) requestAnimationFrame(frame);
      };
      requestAnimationFrame(frame);
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end, isFloat]);
  return <span ref={ref}>{isFloat ? (value % 1 === 0 ? value + ".0" : value) : value.toLocaleString()}{suffix}</span>;
}

export function AboutClient({ content }: { content?: AboutContentPreset }) {
  const heroBadge = content?.heroBadge ?? "Our Story";
  const heroTitleLine1 = content?.heroTitleLine1 ?? "Reimagining How";
  const heroTitleLine2 = content?.heroTitleLine2 ?? "Analytics Work Together";
  const heroSubtitle =
    content?.heroSubtitle ??
    "At Conalytic, we're passionate about building tools that empower teams to analyze, create, and succeed—together.";
  const storyBadge = content?.storyBadge ?? "How It All Started";
  const storyTitle = content?.storyTitle ?? "Built by marketers, for marketers";
  return (
    <>
      {/* ── HERO ────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-32 pb-24 px-4 hero-gradient">
        <div className="absolute inset-0 grid-overlay opacity-[0.08] dark:opacity-[0.05] pointer-events-none"/>
        <div className="absolute top-0 left-1/4 w-[500px] h-[400px] rounded-full blur-3xl bg-brand-600/12 dark:bg-brand-600/18 pointer-events-none"/>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6,ease:EASE}}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-300 border border-brand-100 dark:border-brand-500/20 mb-6">
            <Globe className="w-3 h-3"/> {heroBadge}
          </motion.div>
          <motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.75,delay:0.1,ease:EASE}}
            className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight tracking-tight">
            {heroTitleLine1} <span style={GRAD}>{heroTitleLine2}</span>
          </motion.h1>
          <motion.p initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.75,delay:0.2,ease:EASE}}
            className="text-xl text-gray-500 dark:text-white/70 max-w-2xl mx-auto leading-relaxed">
            {heroSubtitle}
          </motion.p>
        </div>
      </section>

      {/* ── STATS ───────────────────────────────────── */}
      <section className="py-16 px-4 bg-[#F6F7FE] dark:bg-[#0E0E14]">
        <div className="max-w-4xl mx-auto">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{once:true}} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {stats.map(s=>(
              <motion.div key={s.label} variants={fadeUp}
                className="flex items-center gap-4 p-6 rounded-2xl bg-white dark:bg-[#14141B] border border-gray-100 dark:border-white/[0.07] shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-brand-50 dark:bg-brand-600/20 border border-brand-100 dark:border-brand-500/20 flex items-center justify-center shrink-0">
                  <s.icon className="w-6 h-6 text-brand-600 dark:text-brand-300"/>
                </div>
                <div>
                  <div className="text-3xl font-black" style={GRAD}><CountUp end={s.end} suffix={s.suffix} isFloat={s.isFloat}/></div>
                  <div className="text-gray-500 dark:text-white/55 text-sm">{s.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── OUR STORY ───────────────────────────────── */}
      <section className="relative py-24 px-4 overflow-hidden bg-white dark:bg-[#0C0C12]">
        <div className="absolute inset-0 pointer-events-none hidden dark:block" style={{background:"radial-gradient(ellipse 55% 50% at 105% 50%, rgba(107,95,248,0.08) 0%, transparent 65%)"}}/>
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{opacity:0,x:-30}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.7,ease:EASE}}>
              <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-300 border border-brand-100 dark:border-brand-500/20 mb-4">{storyBadge}</span>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">{storyTitle}</h2>
              <p className="text-gray-500 dark:text-white/65 leading-relaxed mb-4">
                Conalytic was founded with a simple idea: analytics should feel effortless. Frustrated with clunky tools that slowed down collaboration, our founders set out to create a solution that prioritizes simplicity, innovation, and inclusivity.
              </p>
              <p className="text-gray-500 dark:text-white/65 leading-relaxed mb-8">
                Today, Conalytic is trusted by teams around the world to do just that. From marketing agencies serving Fortune 500 clients to in-house teams at fast-growing startups, our platform turns complex data into clear conversations.
              </p>
              <a href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 shadow-lg shadow-brand-600/20 transition-all duration-200 hover:scale-[1.02]">
                Get in touch <ArrowRight className="w-4 h-4"/>
              </a>
            </motion.div>
            {/* Timeline — rail centered on icon column (w-10), one row per milestone */}
            <motion.div initial={{opacity:0,x:30}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.7,delay:0.1,ease:EASE}} className="relative">
              <div
                className="pointer-events-none absolute left-5 top-5 bottom-5 w-0.5 -translate-x-1/2 rounded-full bg-gradient-to-b from-brand-400/40 via-violet-400/30 to-transparent"
                aria-hidden
              />
              <div className="flex flex-col gap-5">
                {milestones.map((m) => (
                  <div key={m.year} className="flex gap-4 items-start">
                    <div className="relative z-10 flex w-10 shrink-0 justify-center pt-1">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-600 to-violet-600 shadow-md shadow-brand-500/20 ring-4 ring-white dark:ring-[#0C0C12]">
                        <m.icon className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    <div className="min-w-0 flex-1 rounded-2xl border border-gray-100 bg-[#F6F7FE] p-4 dark:border-white/[0.07] dark:bg-white/[0.04]">
                      <div className="mb-1 flex flex-wrap items-center gap-2">
                        <span className="text-xs font-black text-brand-600 dark:text-brand-300">{m.year}</span>
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">{m.title}</span>
                      </div>
                      <p className="text-sm leading-relaxed text-gray-500 dark:text-white/60">{m.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Pricing />

      <CTA
        title={content?.ctaTitle}
        subtitle={content?.ctaSubtitle}
      />
    </>
  );
}

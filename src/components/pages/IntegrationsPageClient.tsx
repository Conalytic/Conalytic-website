"use client";

/** Integrations page: same seven connectors as the home hero / marketing stack (`marketing-stack-logos`). */
import { motion } from "framer-motion";
import { useState } from "react";
import { ExternalLink, Zap } from "lucide-react";
import { CTA } from "@/components/sections/CTA";
import { Pricing } from "@/components/home/sections/Pricing";
import Image from "next/image";
import { MARKETING_STACK_LOGO_BY_INTEGRATION_NAME } from "@/lib/marketing-stack-logos";

const EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = { hidden:{ opacity:0, y:24 }, show:{ opacity:1, y:0, transition:{ duration:0.55, ease:EASE } } };
const stagger = { hidden:{}, show:{ transition:{ staggerChildren:0.05 } } };
const GRAD: React.CSSProperties = { background:"linear-gradient(135deg,#6B5FF8 0%,#a78bfa 55%,#ec4899 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" };

/** Same set as the home hero marketing stack — no search/filters. */
const integrations = [
  {
    name: "Meta Ads",
    category: "Advertising",
    desc: "Analyze Facebook and Instagram ad performance, audience insights, and conversion data.",
    siSlug: "meta",
    color: "#0082FB",
    logoSrc: MARKETING_STACK_LOGO_BY_INTEGRATION_NAME["Meta Ads"],
  },
  {
    name: "LinkedIn Ads",
    category: "Advertising",
    desc: "Measure LinkedIn campaign performance, lead gen forms, and B2B funnel metrics.",
    siSlug: "linkedin",
    color: "#0A66C2",
    logoSrc: MARKETING_STACK_LOGO_BY_INTEGRATION_NAME["LinkedIn Ads"],
  },
  {
    name: "Microsoft Clarity",
    category: "Analytics",
    desc: "Session recordings, heatmaps, and behavioral insights to see how visitors use your site.",
    siSlug: "microsoft",
    color: "#00A4EF",
    logoSrc: MARKETING_STACK_LOGO_BY_INTEGRATION_NAME["Microsoft Clarity"],
  },
  {
    name: "Bing Webmaster",
    category: "SEO",
    desc: "Monitor Bing search performance, indexing, and queries alongside your other search channels.",
    siSlug: "bing",
    color: "#008373",
    logoSrc: MARKETING_STACK_LOGO_BY_INTEGRATION_NAME["Bing Webmaster"],
  },
  {
    name: "Google Analytics 4",
    category: "Analytics",
    desc: "Track website traffic, user behavior, and conversion events with deep GA4 integration.",
    siSlug: "googleanalytics",
    color: "#E37400",
    logoSrc: MARKETING_STACK_LOGO_BY_INTEGRATION_NAME["Google Analytics 4"],
  },
  {
    name: "Google Search Console",
    category: "SEO",
    desc: "Track organic search performance, keyword rankings, and click-through rates.",
    siSlug: "googlesearchconsole",
    color: "#458CF5",
    logoSrc: MARKETING_STACK_LOGO_BY_INTEGRATION_NAME["Google Search Console"],
  },
  {
    name: "Google Ads",
    category: "Advertising",
    desc: "Monitor campaign performance, ad spend, ROAS, and CTR across your Google Ads accounts.",
    siSlug: "googleads",
    color: "#4285F4",
    logoSrc: MARKETING_STACK_LOGO_BY_INTEGRATION_NAME["Google Ads"],
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  Analytics: "bg-brand-50 dark:bg-brand-500/10 text-brand-700 dark:text-brand-300 border-brand-100 dark:border-brand-500/20",
  Advertising: "bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-100 dark:border-blue-500/20",
  SEO: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-100 dark:border-emerald-500/20",
};

function IntegrationLogo({
  logoSrc,
  slug,
  name,
  color,
}: {
  logoSrc?: string;
  slug: string;
  name: string;
  color: string;
}) {
  const [localFailed, setLocalFailed] = useState(false);
  const [siFailed, setSiFailed] = useState(false);

  if (logoSrc && !localFailed) {
    return (
      <Image
        src={logoSrc}
        alt={name}
        width={36}
        height={36}
        className="w-9 h-9 object-contain"
        onError={() => setLocalFailed(true)}
        unoptimized
      />
    );
  }
  if (!siFailed) {
    return (
      <Image
        src={`https://cdn.simpleicons.org/${slug}/${color.replace("#", "")}`}
        alt={name}
        width={36}
        height={36}
        className="w-9 h-9 object-contain"
        onError={() => setSiFailed(true)}
        unoptimized
      />
    );
  }
  return (
    <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-xs" style={{ backgroundColor: color }}>
      {name.substring(0, 2).toUpperCase()}
    </div>
  );
}

export interface IntegrationsContentPreset {
  heroBadge?: string;
  heroTitleLine1?: string;
  heroTitleLine2?: string;
  heroSubtitle?: string;
  ctaTitle?: string;
  ctaSubtitle?: string;
}

export function IntegrationsPageClient({ content }: { content?: IntegrationsContentPreset }) {
  const heroBadge = content?.heroBadge ?? "Integrations";
  const heroTitleLine1 = content?.heroTitleLine1 ?? "Work Better Together with";
  const heroTitleLine2 = content?.heroTitleLine2 ?? "Seamless Integrations";
  const heroSubtitle =
    content?.heroSubtitle ??
    "Connect Conalytic to the tools your team already loves and streamline your workflow in one place.";

  return (
    <>
      {/* ── HERO ────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-32 pb-24 px-4 hero-gradient">
        <div className="absolute inset-0 grid-overlay opacity-[0.08] dark:opacity-[0.05] pointer-events-none"/>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-3xl bg-brand-600/12 dark:bg-brand-600/18 pointer-events-none"/>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6,ease:EASE}}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-300 border border-brand-100 dark:border-brand-500/20 mb-6">
            <Zap className="w-3 h-3"/> {heroBadge}
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

      {/* ── GRID (marketing stack only) ─────────────── */}
      <section className="py-16 px-4 bg-[#F6F7FE] dark:bg-[#0E0E14]">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-sm text-gray-400 dark:text-white/40 mb-8">
            {integrations.length} data sources connected in Conalytic
          </p>

          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{once:true}} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {integrations.map(itg=>(
              <motion.div key={itg.name} variants={fadeUp}
                className="relative rounded-2xl border border-gray-100 bg-white p-5 transition-all duration-200 group hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lg dark:border-white/[0.07] dark:bg-[#14141B] dark:hover:border-brand-500/40 dark:hover:shadow-black/40">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-white/[0.06] border border-gray-100 dark:border-white/[0.08] flex items-center justify-center p-1.5 shrink-0">
                    <IntegrationLogo logoSrc={itg.logoSrc} slug={itg.siSlug} name={itg.name} color={itg.color}/>
                  </div>
                  <h3 className="text-gray-900 dark:text-white font-semibold text-sm leading-tight">{itg.name}</h3>
                </div>
                <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full border mb-2.5 ${CATEGORY_COLORS[itg.category] || "bg-gray-100 dark:bg-white/[0.07] text-gray-500 dark:text-white/50 border-gray-200 dark:border-white/[0.1]"}`}>
                  {itg.category}
                </span>
                <p className="text-gray-400 dark:text-white/55 text-xs leading-relaxed">{itg.desc}</p>
                <div className="mt-3 flex items-center gap-1 text-brand-600 dark:text-brand-400 text-xs font-semibold opacity-0 transition-opacity group-hover:opacity-100">
                  <span>View docs</span>
                  <ExternalLink className="w-3 h-3"/>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Pricing />

      <CTA
        title={content?.ctaTitle ?? "Why Choose Conalytic?"}
        subtitle={content?.ctaSubtitle ?? "Built for teams who want to work smarter, faster, and happier with their marketing data"}
      />
    </>
  );
}

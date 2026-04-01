"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ExternalLink, Search, Zap } from "lucide-react";
import { CTA } from "@/components/sections/CTA";
import Image from "next/image";

const EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = { hidden:{ opacity:0, y:24 }, show:{ opacity:1, y:0, transition:{ duration:0.55, ease:EASE } } };
const stagger = { hidden:{}, show:{ transition:{ staggerChildren:0.05 } } };
const GRAD: React.CSSProperties = { background:"linear-gradient(135deg,#6B5FF8 0%,#a78bfa 55%,#ec4899 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" };

function siUrl(hex: string) {
  return `https://cdn.simpleicons.org/${hex}`;
}

const integrations = [
  { name:"Google Analytics 4",    category:"Analytics",          desc:"Track website traffic, user behavior, and conversion events with deep GA4 integration.",              status:"available",   siSlug:"googleanalytics",  color:"#E37400" },
  { name:"Google Ads",            category:"Advertising",        desc:"Monitor campaign performance, ad spend, ROAS, and CTR across all Google Ads campaigns.",               status:"available",   siSlug:"googleads",        color:"#4285F4" },
  { name:"Meta Ads",              category:"Advertising",        desc:"Analyze Facebook and Instagram ad performance, audience insights, and conversion data.",                status:"available",   siSlug:"meta",             color:"#0082FB" },
  { name:"Google Search Console", category:"SEO",                desc:"Track organic search performance, keyword rankings, and click-through rates.",                          status:"available",   siSlug:"googlesearchconsole", color:"#458CF5" },
  { name:"Slack",                 category:"Collaboration",      desc:"Keep your team in the loop with real-time updates and notifications directly in Slack.",                status:"available",   siSlug:"slack",            color:"#4A154B" },
  { name:"Zoom",                  category:"Communication",      desc:"Schedule and join video meetings without leaving your analytics workflow.",                              status:"available",   siSlug:"zoom",             color:"#2D8CFF" },
  { name:"Trello",                category:"Project Management", desc:"Organize your projects and track progress with Trello's visual collaboration tool.",                    status:"available",   siSlug:"trello",           color:"#0052CC" },
  { name:"Asana",                 category:"Project Management", desc:"Empower your team with Asana's work tracking software connected to your analytics.",                    status:"available",   siSlug:"asana",            color:"#F06A6A" },
  { name:"Google Docs",           category:"Productivity",       desc:"Collaborate on documents in real-time with Google Docs integration.",                                   status:"available",   siSlug:"googledocs",       color:"#4285F4" },
  { name:"Notion",                category:"Productivity",       desc:"Capture ideas, share feedback, and stay organized with Notion.",                                        status:"available",   siSlug:"notion",           color:"#000000" },
  { name:"Microsoft Teams",       category:"Collaboration",      desc:"Connect your team with Microsoft Teams, a chat-based workspace.",                                       status:"available",   siSlug:"microsoftteams",   color:"#6264A7" },
  { name:"Dropbox",               category:"Storage",            desc:"Access and share files stored in Dropbox directly from your projects.",                                  status:"available",   siSlug:"dropbox",          color:"#0061FF" },
  { name:"HubSpot",               category:"CRM",                desc:"Track your team's sales tasks and customer interactions by connecting HubSpot.",                        status:"available",   siSlug:"hubspot",          color:"#FF7A59" },
  { name:"GitHub",                category:"Development",        desc:"Bridge the gap between development and management by syncing GitHub.",                                   status:"available",   siSlug:"github",           color:"#181717" },
  { name:"Calendly",              category:"Scheduling",         desc:"Streamline scheduling by connecting Calendly to manage meetings effortlessly.",                         status:"available",   siSlug:"calendly",         color:"#006BFF" },
  { name:"Zapier",                category:"Automation",         desc:"Automate workflows by connecting Conalytic with over 2,000 apps using Zapier.",                         status:"available",   siSlug:"zapier",           color:"#FF4A00" },
  { name:"LinkedIn Ads",          category:"Advertising",        desc:"Analyze LinkedIn advertising performance and B2B lead generation metrics.",                              status:"coming-soon", siSlug:"linkedin",         color:"#0A66C2" },
  { name:"TikTok Ads",            category:"Advertising",        desc:"Track TikTok advertising campaigns and social commerce performance.",                                    status:"coming-soon", siSlug:"tiktok",           color:"#000000" },
];

const CATEGORY_COLORS: Record<string, string> = {
  "Analytics":          "bg-brand-50 dark:bg-brand-500/10 text-brand-700 dark:text-brand-300 border-brand-100 dark:border-brand-500/20",
  "Advertising":        "bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-100 dark:border-blue-500/20",
  "SEO":                "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-100 dark:border-emerald-500/20",
  "Collaboration":      "bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-100 dark:border-amber-500/20",
  "Communication":      "bg-pink-50 dark:bg-pink-500/10 text-pink-700 dark:text-pink-300 border-pink-100 dark:border-pink-500/20",
  "Project Management": "bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-300 border-violet-100 dark:border-violet-500/20",
  "Productivity":       "bg-cyan-50 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border-cyan-100 dark:border-cyan-500/20",
  "Storage":            "bg-orange-50 dark:bg-orange-500/10 text-orange-700 dark:text-orange-300 border-orange-100 dark:border-orange-500/20",
  "CRM":                "bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-300 border-red-100 dark:border-red-500/20",
  "Development":        "bg-gray-100 dark:bg-white/[0.07] text-gray-700 dark:text-white/60 border-gray-200 dark:border-white/[0.1]",
  "Scheduling":         "bg-lime-50 dark:bg-lime-500/10 text-lime-700 dark:text-lime-300 border-lime-100 dark:border-lime-500/20",
  "Automation":         "bg-fuchsia-50 dark:bg-fuchsia-500/10 text-fuchsia-700 dark:text-fuchsia-300 border-fuchsia-100 dark:border-fuchsia-500/20",
};

const ALL_CATS = ["All", ...Array.from(new Set(integrations.map(i=>i.category)))];

function IntegrationLogo({ slug, name, color }: { slug: string; name: string; color: string }) {
  const [err, setErr] = useState(false);
  if (err) {
    return (
      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-xs" style={{backgroundColor:color}}>
        {name.substring(0,2).toUpperCase()}
      </div>
    );
  }
  return (
    <Image
      src={`https://cdn.simpleicons.org/${slug}/${color.replace("#","")}`}
      alt={name} width={36} height={36}
      className="w-9 h-9 object-contain"
      onError={()=>setErr(true)}
      unoptimized
    />
  );
}

export function IntegrationsPageClient() {
  const [search, setSearch]   = useState("");
  const [active, setActive]   = useState("All");

  const filtered = integrations.filter(i=>{
    const matchCat  = active === "All" || i.category === active;
    const matchSrch = i.name.toLowerCase().includes(search.toLowerCase()) || i.category.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSrch;
  });

  return (
    <>
      {/* ── HERO ────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-32 pb-24 px-4 hero-gradient">
        <div className="absolute inset-0 grid-overlay opacity-[0.08] dark:opacity-[0.05] pointer-events-none"/>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-3xl bg-brand-600/12 dark:bg-brand-600/18 pointer-events-none"/>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6,ease:EASE}}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-300 border border-brand-100 dark:border-brand-500/20 mb-6">
            <Zap className="w-3 h-3"/> Integrations
          </motion.div>
          <motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.75,delay:0.1,ease:EASE}}
            className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight tracking-tight">
            Work Better Together with{" "}
            <span style={GRAD}>Seamless Integrations</span>
          </motion.h1>
          <motion.p initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.75,delay:0.2,ease:EASE}}
            className="text-xl text-gray-500 dark:text-white/70 max-w-2xl mx-auto leading-relaxed">
            Connect Conalytic to the tools your team already loves and streamline your workflow in one place.
          </motion.p>
        </div>
      </section>

      {/* ── FILTERS + GRID ──────────────────────────── */}
      <section className="py-16 px-4 bg-[#F6F7FE] dark:bg-[#0E0E14]">
        <div className="max-w-6xl mx-auto">
          {/* Search + category filter */}
          <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6,ease:EASE}} className="mb-8 space-y-4">
            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-white/30 pointer-events-none"/>
              <input
                type="text" value={search} onChange={e=>setSearch(e.target.value)}
                placeholder="Search integrations…"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white dark:bg-[#14141B] border border-gray-200 dark:border-white/[0.08] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/30 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 text-sm transition-all"
              />
            </div>
            {/* Category pills */}
            <div className="flex flex-wrap justify-center gap-2">
              {ALL_CATS.map(cat=>(
                <button key={cat} onClick={()=>setActive(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-150 ${active===cat ? "bg-brand-600 text-white border-brand-600 shadow-md shadow-brand-600/25" : "bg-white dark:bg-[#14141B] text-gray-600 dark:text-white/60 border-gray-200 dark:border-white/[0.08] hover:border-brand-400 dark:hover:border-brand-500/40"}`}>
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Count */}
          <p className="text-center text-sm text-gray-400 dark:text-white/40 mb-6">{filtered.length} integration{filtered.length!==1?"s":""}</p>

          {/* Grid */}
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{once:true}} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map(itg=>(
              <motion.div key={itg.name} variants={fadeUp}
                className={`relative rounded-2xl p-5 border group transition-all duration-200 hover:-translate-y-0.5 ${
                  itg.status==="coming-soon"
                    ? "bg-gray-50 dark:bg-[#14141B]/50 border-gray-100 dark:border-white/[0.04] opacity-65"
                    : "bg-white dark:bg-[#14141B] border-gray-100 dark:border-white/[0.07] hover:border-brand-300 dark:hover:border-brand-500/40 hover:shadow-lg dark:hover:shadow-black/40"
                }`}>
                {itg.status==="coming-soon" && (
                  <span className="absolute top-3 right-3 text-[9px] font-semibold text-gray-400 dark:text-white/35 border border-gray-200 dark:border-white/[0.08] rounded-full px-2 py-0.5">Coming soon</span>
                )}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-white/[0.06] border border-gray-100 dark:border-white/[0.08] flex items-center justify-center p-1.5 shrink-0">
                    <IntegrationLogo slug={itg.siSlug} name={itg.name} color={itg.color}/>
                  </div>
                  <h3 className="text-gray-900 dark:text-white font-semibold text-sm leading-tight">{itg.name}</h3>
                </div>
                <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full border mb-2.5 ${CATEGORY_COLORS[itg.category] || "bg-gray-100 dark:bg-white/[0.07] text-gray-500 dark:text-white/50 border-gray-200 dark:border-white/[0.1]"}`}>
                  {itg.category}
                </span>
                <p className="text-gray-400 dark:text-white/55 text-xs leading-relaxed">{itg.desc}</p>
                {itg.status==="available" && (
                  <div className="mt-3 flex items-center gap-1 text-brand-600 dark:text-brand-400 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>View docs</span><ExternalLink className="w-3 h-3"/>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <CTA
        title="Why Choose Conalytic?"
        subtitle="Built for teams who want to work smarter, faster, and happier with their marketing data"
      />
    </>
  );
}

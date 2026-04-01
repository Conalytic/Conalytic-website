"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Clock, BookOpen } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = { hidden:{ opacity:0, y:24 }, show:{ opacity:1, y:0, transition:{ duration:0.55, ease:EASE } } };
const stagger = { hidden:{}, show:{ transition:{ staggerChildren:0.08 } } };
const GRAD: React.CSSProperties = { background:"linear-gradient(135deg,#6B5FF8 0%,#a78bfa 55%,#ec4899 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" };

const blogPosts = [
  { slug:"how-to-build-a-thriving-remote-team-culture",   title:"How to Build a Thriving Remote Team Culture",                    excerpt:"Explore new approaches for optimizing productivity while working remotely. Building a strong culture in a remote work environment may seem challenging, but it's far from impossible.", category:"Collaboration",     date:"Sep 2, 2025",  readTime:"5 min read", featured:true  },
  { slug:"ai-powered-analytics-future-of-marketing",       title:"AI-Powered Analytics: The Future of Marketing Intelligence",      excerpt:"Discover the latest tools and practices shaping the way Gen-Z teams work with data and make decisions faster than ever before.",                                                    category:"Analytics",         date:"Jul 28, 2025", readTime:"7 min read", featured:false },
  { slug:"maximizing-roas-with-conversational-ai",         title:"Maximizing ROAS with Conversational AI Analytics",               excerpt:"Learn how marketing teams are using natural language queries to uncover hidden optimization opportunities in their Google Ads campaigns.",                                  category:"Google Ads",        date:"Jul 28, 2025", readTime:"6 min read", featured:false },
  { slug:"automated-client-reporting-agencies",            title:"Automated Client Reporting: A Game Changer for Agencies",        excerpt:"Explore new approaches for optimizing productivity while working remotely with AI-generated insights and automated delivery.",                                              category:"Reporting",         date:"Jul 28, 2025", readTime:"8 min read", featured:false },
  { slug:"ga4-insights-without-sql",                       title:"Getting Deep GA4 Insights Without Writing a Single Line of SQL", excerpt:"How to Build a Thriving Remote Team Culture with conversational analytics that transforms complex queries into simple conversations.",                                      category:"GA4",               date:"Jul 28, 2025", readTime:"4 min read", featured:false },
  { slug:"bigquery-unified-marketing-data",                title:"Why BigQuery is the Foundation of Modern Marketing Analytics",   excerpt:"Explore new approaches for optimizing productivity while working remotely with BigQuery as your central data warehouse.",                                                   category:"Data Engineering",  date:"Jul 28, 2025", readTime:"9 min read", featured:false },
];

const CATEGORY_COLORS: Record<string, string> = {
  "Collaboration":    "bg-brand-50 dark:bg-brand-500/10 text-brand-700 dark:text-brand-300 border border-brand-100 dark:border-brand-500/20",
  "Analytics":        "bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-500/20",
  "Google Ads":       "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-500/20",
  "Reporting":        "bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-100 dark:border-amber-500/20",
  "GA4":              "bg-pink-50 dark:bg-pink-500/10 text-pink-700 dark:text-pink-300 border border-pink-100 dark:border-pink-500/20",
  "Data Engineering": "bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-300 border border-violet-100 dark:border-violet-500/20",
};

const GRADIENTS = [
  "from-brand-500/20 to-violet-500/10",
  "from-blue-500/20 to-cyan-500/10",
  "from-emerald-500/20 to-teal-500/10",
  "from-amber-500/20 to-orange-500/10",
  "from-pink-500/20 to-rose-500/10",
  "from-violet-500/20 to-purple-500/10",
];

export function BlogsClient() {
  const featured = blogPosts.find(p=>p.featured)!;
  const rest      = blogPosts.filter(p=>!p.featured);

  return (
    <>
      {/* ── HERO ────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-32 pb-24 px-4 hero-gradient">
        <div className="absolute inset-0 grid-overlay opacity-[0.08] dark:opacity-[0.05] pointer-events-none"/>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-3xl bg-brand-600/12 dark:bg-brand-600/18 pointer-events-none"/>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6,ease:EASE}}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-300 border border-brand-100 dark:border-brand-500/20 mb-6">
            <BookOpen className="w-3 h-3"/> Blog
          </motion.div>
          <motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.75,delay:0.1,ease:EASE}}
            className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight tracking-tight">
            Insights &amp; Tips to{" "}
            <span style={GRAD}>Supercharge Your Analytics</span>
          </motion.h1>
          <motion.p initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.75,delay:0.2,ease:EASE}}
            className="text-xl text-gray-500 dark:text-white/70 max-w-2xl mx-auto leading-relaxed">
            Explore the latest trends in marketing analytics, productivity hacks, and updates from Conalytic.
          </motion.p>
        </div>
      </section>

      <section className="py-16 px-4 bg-[#F6F7FE] dark:bg-[#0E0E14]">
        <div className="max-w-5xl mx-auto">
          {/* Featured post */}
          <motion.div initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7,ease:EASE}} className="mb-10">
            <Link href={`/blogs/${featured.slug}`}
              className="group block rounded-2xl overflow-hidden bg-white dark:bg-[#14141B] border border-gray-100 dark:border-white/[0.07] shadow-sm hover:shadow-xl dark:hover:shadow-black/40 hover:border-brand-300 dark:hover:border-brand-500/40 transition-all duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Thumbnail */}
                <div className={`aspect-[16/9] lg:aspect-auto min-h-[200px] bg-gradient-to-br ${GRADIENTS[0]} flex items-center justify-center`}>
                  <div className="text-center p-8">
                    <div className="w-16 h-16 rounded-2xl bg-brand-600/20 border border-brand-400/30 flex items-center justify-center mx-auto mb-3">
                      <BookOpen className="w-8 h-8 text-brand-500 dark:text-brand-300"/>
                    </div>
                    <p className="text-gray-400 dark:text-white/25 text-xs font-medium">Featured article</p>
                  </div>
                </div>
                {/* Content */}
                <div className="p-8 lg:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${CATEGORY_COLORS[featured.category]||"bg-gray-100 dark:bg-white/[0.07] text-gray-500 dark:text-white/50"}`}>{featured.category}</span>
                    <span className="text-[11px] font-bold text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-500/30 px-2 py-0.5 rounded-full">Featured</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-brand-600 dark:group-hover:text-brand-300 transition-colors leading-tight">{featured.title}</h2>
                  <p className="text-gray-500 dark:text-white/65 leading-relaxed mb-6 text-sm">{featured.excerpt}</p>
                  <div className="flex items-center gap-4 text-gray-400 dark:text-white/40 text-xs">
                    <span>{featured.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3"/>{featured.readTime}</span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Blog grid */}
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{once:true}} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((post,i)=>(
              <motion.div key={post.slug} variants={fadeUp}>
                <Link href={`/blogs/${post.slug}`}
                  className="group flex flex-col h-full rounded-2xl overflow-hidden bg-white dark:bg-[#14141B] border border-gray-100 dark:border-white/[0.07] shadow-sm hover:shadow-lg dark:hover:shadow-black/40 hover:border-brand-300 dark:hover:border-brand-500/40 hover:-translate-y-0.5 transition-all duration-300">
                  {/* Thumbnail */}
                  <div className={`aspect-[16/9] bg-gradient-to-br ${GRADIENTS[(i+1)%GRADIENTS.length]} flex items-center justify-center`}>
                    <div className="w-10 h-10 rounded-xl bg-white/20 dark:bg-white/10 backdrop-blur-sm flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-gray-700 dark:text-white/70"/>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${CATEGORY_COLORS[post.category]||"bg-gray-100 dark:bg-white/[0.07] text-gray-500 dark:text-white/50"}`}>{post.category}</span>
                      <span className="text-gray-400 dark:text-white/30 text-xs">{post.date}</span>
                    </div>
                    <h3 className="text-gray-900 dark:text-white font-semibold mb-3 group-hover:text-brand-600 dark:group-hover:text-brand-300 transition-colors leading-snug flex-1 text-sm">{post.title}</h3>
                    <p className="text-gray-400 dark:text-white/55 text-xs leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-white/[0.06]">
                      <span className="flex items-center gap-1 text-gray-400 dark:text-white/30 text-xs"><Clock className="w-3 h-3"/>{post.readTime}</span>
                      <span className="flex items-center gap-1 text-brand-600 dark:text-brand-400 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">Read more<ArrowRight className="w-3 h-3"/></span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}

"use client";

/** Blog index grid; post cards link to canonical `/{slug}` URLs. */
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, BookOpen } from "lucide-react";
import { STATIC_BLOG_POSTS } from "@/content/blog-posts";
import { blogCoverAlt } from "@/lib/image-alt";

const EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = { hidden:{ opacity:0, y:24 }, show:{ opacity:1, y:0, transition:{ duration:0.55, ease:EASE } } };
const stagger = { hidden:{}, show:{ transition:{ staggerChildren:0.08 } } };
const GRAD: React.CSSProperties = { background:"linear-gradient(135deg,#6B5FF8 0%,#a78bfa 55%,#ec4899 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" };

const CATEGORY_COLORS: Record<string, string> = {
  "Conversational Analytics": "bg-brand-50 dark:bg-brand-500/10 text-brand-700 dark:text-brand-300 border border-brand-100 dark:border-brand-500/20",
  "KPIs Tracker":             "bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-500/20",
  "Report Builder":           "bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-100 dark:border-amber-500/20",
};

export interface BlogsContentPreset {
  heroBadge?: string;
  heroTitleLine1?: string;
  heroTitleLine2?: string;
  heroSubtitle?: string;
}

export function BlogsClient({ content }: { content?: BlogsContentPreset }) {
  const heroBadge = content?.heroBadge ?? "Blog";
  const heroTitleLine1 = content?.heroTitleLine1 ?? "Insights & Tips to";
  const heroTitleLine2 = content?.heroTitleLine2 ?? "Supercharge Your Analytics";
  const heroSubtitle =
    content?.heroSubtitle ??
    "In-depth guides to Conalytic Chats, KPIs Tracker, and Report Builder—built from the same product experience as Conalytic-Chat.";

  const featured = STATIC_BLOG_POSTS.find((p) => p.featured) ?? STATIC_BLOG_POSTS[0];
  const rest = STATIC_BLOG_POSTS.filter((p) => p.slug !== featured.slug);

  return (
    <>
      {/* ── HERO ────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-32 pb-24 px-4 hero-gradient">
        <div className="absolute inset-0 grid-overlay opacity-[0.08] dark:opacity-[0.05] pointer-events-none"/>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-3xl bg-brand-600/12 dark:bg-brand-600/18 pointer-events-none"/>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6,ease:EASE}}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-300 border border-brand-100 dark:border-brand-500/20 mb-6">
            <BookOpen className="w-3 h-3"/> {heroBadge}
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

      <section className="py-16 px-4 bg-[#F6F7FE] dark:bg-[#0E0E14]">
        <div className="max-w-5xl mx-auto">
          {/* Featured post */}
          <motion.div initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7,ease:EASE}} className="mb-10">
            <Link href={`/${featured.slug}`}
              className="group block rounded-2xl overflow-hidden bg-white dark:bg-[#14141B] border border-gray-100 dark:border-white/[0.07] shadow-sm hover:shadow-xl dark:hover:shadow-black/40 hover:border-brand-300 dark:hover:border-brand-500/40 transition-all duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative aspect-[16/9] lg:aspect-auto min-h-[200px] bg-gray-100 dark:bg-white/[0.04]">
                  {featured.coverImage ? (
                    <Image
                      src={featured.coverImage}
                      alt={blogCoverAlt(featured.title)}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      priority
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <BookOpen className="w-8 h-8 text-brand-500 dark:text-brand-300"/>
                    </div>
                  )}
                </div>
                <div className="p-8 lg:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${CATEGORY_COLORS[featured.category]||"bg-gray-100 dark:bg-white/[0.07] text-gray-500 dark:text-white/50"}`}>{featured.category}</span>
                    <span className="text-[11px] font-bold text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-500/30 px-2 py-0.5 rounded-full">Featured</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-brand-600 dark:group-hover:text-brand-300 transition-colors leading-tight">{featured.title}</h2>
                  <p className="text-gray-500 dark:text-white/65 leading-relaxed mb-6 text-sm">{featured.excerpt}</p>
                  <div className="flex items-center gap-4 text-gray-400 dark:text-white/40 text-xs">
                    <span>{featured.dateLabel}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3"/>{featured.readTime}</span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Blog grid */}
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{once:true}} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((post)=>(
              <motion.div key={post.slug} variants={fadeUp}>
                <Link href={`/${post.slug}`}
                  className="group flex flex-col h-full rounded-2xl overflow-hidden bg-white dark:bg-[#14141B] border border-gray-100 dark:border-white/[0.07] shadow-sm hover:shadow-lg dark:hover:shadow-black/40 hover:border-brand-300 dark:hover:border-brand-500/40 hover:-translate-y-0.5 transition-all duration-300">
                  <div className="relative aspect-[16/9] bg-gray-100 dark:bg-white/[0.04]">
                    {post.coverImage ? (
                      <Image
                        src={post.coverImage}
                        alt={blogCoverAlt(post.title)}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <BookOpen className="w-5 h-5 text-gray-700 dark:text-white/70"/>
                      </div>
                    )}
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${CATEGORY_COLORS[post.category]||"bg-gray-100 dark:bg-white/[0.07] text-gray-500 dark:text-white/50"}`}>{post.category}</span>
                      <span className="text-gray-400 dark:text-white/30 text-xs">{post.dateLabel}</span>
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

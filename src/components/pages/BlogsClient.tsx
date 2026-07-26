"use client";

/** Blog index — magazine layout with featured hero + product filters. */
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { BrandAmbient } from "@/components/visual/BrandAmbient";
import { BlogCardVisual, BlogFeaturedVisual } from "@/components/visual/product-demos/ProductVisual";
import { BRAND_HERO_GRADIENT_TEXT } from "@/lib/brand";
import { categoryToProductVisual } from "@/lib/product-visual";
import { STATIC_BLOG_POSTS } from "@/content/blog-posts";

const EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

const CATEGORY_STYLES: Record<string, string> = {
  "Conversational Analytics":
    "bg-brand-50 text-brand-700 border-brand-100 dark:bg-brand-500/10 dark:text-brand-300 dark:border-brand-500/20",
  "KPIs Tracker":
    "bg-emerald-50 text-emerald-800 border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/20",
  "Report Builder":
    "bg-amber-50 text-amber-800 border-amber-100 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/20",
};

export interface BlogsContentPreset {
  heroBadge?: string;
  heroTitleLine1?: string;
  heroTitleLine2?: string;
  heroSubtitle?: string;
}

export function BlogsClient({ content }: { content?: BlogsContentPreset }) {
  const heroBadge = content?.heroBadge ?? "Blog";
  const heroTitleLine1 = content?.heroTitleLine1 ?? "Guides for";
  const heroTitleLine2 = content?.heroTitleLine2 ?? "Chat, KPIs & Reports";
  const heroSubtitle =
    content?.heroSubtitle ??
    "Deep product guides from the Conalytic team — same workflows as Conalytic-Chat, written for marketing leaders and agencies.";

  const featured = STATIC_BLOG_POSTS.find((p) => p.featured) ?? STATIC_BLOG_POSTS[0];
  const rest = STATIC_BLOG_POSTS.filter((p) => p.slug !== featured.slug);

  return (
    <>
      <section className="relative overflow-hidden border-b border-gray-200/80 pt-32 pb-20 px-4 dark:border-white/[0.06] sm:pb-24">
        <BrandAmbient variant="hero" />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white/80 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-brand-700 backdrop-blur-sm dark:border-brand-500/20 dark:bg-white/[0.06] dark:text-brand-300"
          >
            <BookOpen className="h-3 w-3" />
            {heroBadge}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease: EASE }}
            className="mb-6 text-5xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white sm:text-6xl"
          >
            {heroTitleLine1}{" "}
            <span style={BRAND_HERO_GRADIENT_TEXT}>{heroTitleLine2}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.2, ease: EASE }}
            className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-white/65 sm:text-xl"
          >
            {heroSubtitle}
          </motion.p>
        </div>
      </section>

      <section className="bg-[#f0f1f5] px-4 py-16 dark:bg-[#0f0f0f] sm:py-20">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="mb-14"
          >
            <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-gray-500 dark:text-white/40">
              Featured guide
            </p>
            <Link
              href={`/${featured.slug}`}
              className="group grid overflow-hidden rounded-3xl border border-gray-200/80 bg-white shadow-sm transition-all duration-300 hover:border-brand-400 hover:shadow-xl dark:border-white/[0.07] dark:bg-[#14141B] dark:hover:border-brand-500/40 lg:grid-cols-2"
            >
              <BlogFeaturedVisual variant={categoryToProductVisual(featured.category)} />
              <div className="flex flex-col justify-center p-8 lg:p-12">
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${CATEGORY_STYLES[featured.category] ?? ""}`}
                  >
                    {featured.category}
                  </span>
                  <span className="rounded-full border border-brand-200 bg-brand-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand-700 dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-300">
                    Featured
                  </span>
                </div>
                <h2 className="mb-4 text-2xl font-bold leading-tight text-white transition-colors group-hover:text-brand-300 sm:text-3xl">
                  {featured.title}
                </h2>
                <p className="mb-6 flex-1 text-sm leading-relaxed text-gray-600 dark:text-white/60 sm:text-base">
                  {featured.excerpt}
                </p>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-white/40">
                    <span>{featured.dateLabel}</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {featured.readTime}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 dark:text-brand-300">
                    Read guide <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid gap-6 md:grid-cols-2"
          >
            {rest.map((post) => (
              <motion.div key={post.slug} variants={fadeUp}>
                <Link
                  href={`/${post.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200/80 bg-white transition-all hover:-translate-y-0.5 hover:border-brand-400 hover:shadow-lg dark:border-white/[0.07] dark:bg-[#14141B] dark:hover:border-brand-500/40"
                >
                  <BlogCardVisual variant={categoryToProductVisual(post.category)} />
                  <div className="flex flex-1 flex-col p-6">
                    <span
                      className={`mb-3 inline-flex w-fit rounded-full border px-2.5 py-1 text-[10px] font-semibold ${CATEGORY_STYLES[post.category] ?? ""}`}
                    >
                      {post.category}
                    </span>
                    <h3 className="mb-3 flex-1 text-lg font-bold leading-snug text-white transition-colors group-hover:text-brand-300">
                      {post.title}
                    </h3>
                    <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-gray-500 dark:text-white/55">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between border-t border-gray-100 pt-4 text-xs text-gray-400 dark:border-white/[0.06] dark:text-white/35">
                      <span>{post.dateLabel}</span>
                      <span className="inline-flex items-center gap-1 font-semibold text-brand-300 opacity-0 transition-opacity group-hover:opacity-100">
                        Read <ArrowRight className="h-3 w-3" />
                      </span>
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

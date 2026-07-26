"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar, Clock } from "lucide-react";
import { BlogPostMarkdown } from "@/components/blog/BlogPostMarkdown";
import { BlogArticleCta } from "@/components/blog/BlogArticleCta";
import { BlogReadingProgress } from "@/components/blog/BlogReadingProgress";
import { BlogTableOfContents } from "@/components/blog/BlogTableOfContents";
import { BrandAmbient } from "@/components/visual/BrandAmbient";
import { BlogArticleHeroVisual } from "@/components/visual/product-demos/ProductVisual";
import { categoryToProductVisual } from "@/lib/product-visual";
import type { StaticBlogPost } from "@/content/blog-posts";

const CATEGORY_STYLES: Record<string, string> = {
  "Conversational Analytics":
    "bg-brand-50 text-brand-700 border-brand-100 dark:bg-brand-500/10 dark:text-brand-300 dark:border-brand-500/20",
  "KPIs Tracker":
    "bg-emerald-50 text-emerald-800 border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/20",
  "Report Builder":
    "bg-amber-50 text-amber-800 border-amber-100 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/20",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export function BlogArticleLayout({
  post,
  headings,
  related,
}: {
  post: StaticBlogPost;
  headings: Array<{ id: string; text: string }>;
  related: StaticBlogPost[];
}) {
  const categoryClass =
    CATEGORY_STYLES[post.category] ??
    "bg-gray-100 text-gray-700 border-gray-200 dark:bg-white/[0.06] dark:text-white/60 dark:border-white/[0.08]";
  const visualVariant = categoryToProductVisual(post.category);

  return (
    <article className="bg-[#f0f1f5] dark:bg-transparent">
      <BlogReadingProgress />

      <header className="relative overflow-hidden border-b border-gray-200/80 dark:border-white/[0.06]">
        <BrandAmbient variant="hero" />
        <div className="relative z-10 mx-auto max-w-6xl px-4 pb-12 pt-28 sm:px-6 sm:pb-16 sm:pt-32">
          <Link
            href="/blogs"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-white/50 transition-colors hover:text-brand-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-white/45">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="transition-colors hover:text-brand-300">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/blogs" className="transition-colors hover:text-brand-300">
                  Blog
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-white/70">{post.category}</li>
            </ol>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[1fr_min(420px,38%)] lg:items-end">
            <div>
              <span
                className={`mb-5 inline-flex rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-widest ${categoryClass}`}
              >
                {post.category}
              </span>
              <h1 className="mb-6 max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-[3.25rem]">
                {post.title}
              </h1>
              <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-white/45">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 shrink-0" />
                  {formatDate(post.datePublished)}
                </span>
                {post.readTime ? (
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-4 w-4 shrink-0" />
                    {post.readTime}
                  </span>
                ) : null}
              </div>
              {post.excerpt ? (
                <p className="max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-white/70">{post.excerpt}</p>
              ) : null}
            </div>

            <BlogArticleHeroVisual variant={visualVariant} />
          </div>
        </div>
      </header>

      <div className="px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_240px] xl:grid-cols-[minmax(0,1fr)_260px]">
          <div className="min-w-0">
            <div className="rounded-2xl border border-gray-200/80 bg-white px-6 py-10 shadow-sm dark:border-white/[0.07] dark:bg-[#14141B] sm:px-10 sm:py-12 lg:px-14 lg:py-14">
              <BlogPostMarkdown markdown={post.bodyMarkdown} headingIds={headings.map((h) => h.id)} />
              <BlogArticleCta category={post.category} />
            </div>

            {related.length > 0 ? (
              <section className="mt-12">
                <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Continue reading</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {related.map((r) => (
                    <Link
                      key={r.slug}
                      href={`/${r.slug}`}
                      className="group flex flex-col rounded-2xl border border-gray-200/80 bg-white p-5 transition-all hover:border-brand-400 hover:shadow-md dark:border-white/[0.08] dark:bg-[#14141B] dark:hover:border-brand-500/40"
                    >
                      <span className="mb-2 text-[10px] font-bold uppercase tracking-widest text-brand-600 dark:text-brand-300">
                        {r.category}
                      </span>
                      <h3 className="mb-3 flex-1 text-base font-bold leading-snug text-white group-hover:text-brand-300">
                        {r.title}
                      </h3>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-gray-500 dark:text-white/45">
                        Read article <ArrowRight className="h-3 w-3" />
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            ) : null}
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <BlogTableOfContents headings={headings} />
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}

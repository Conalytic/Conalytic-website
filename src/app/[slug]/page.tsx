/**
 * Public blog article at `/{slug}` — static markdown content; canonical + BlogPosting JSON-LD.
 */
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { BlogPostMarkdown } from "@/components/blog/BlogPostMarkdown";
import { JsonLd } from "@/components/seo/JsonLd";
import { getBlogPostBySlug } from "@/content/blog-posts";
import { blogPostingSchema } from "@/lib/structured-data";
import { mergeSocialPreviewImage } from "@/lib/site-layout";
import { SITE_ORIGIN } from "@/lib/seo-config";

interface Props {
  params: Promise<{ slug: string }>;
}

function formatDateLabel(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) {
    return {};
  }
  const canonical = `${SITE_ORIGIN}/${post.slug}`;
  const base: Metadata = {
    title: `${post.title} – Conalytic Blog`,
    description: post.description || post.excerpt,
    alternates: { canonical },
  };
  const absoluteCover = post.coverImage?.startsWith("http")
    ? post.coverImage
    : post.coverImage
      ? `${SITE_ORIGIN}${post.coverImage}`
      : null;
  return mergeSocialPreviewImage(base, absoluteCover);
}

export default async function PublicBlogPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) {
    notFound();
  }

  const canonicalUrl = `${SITE_ORIGIN}/${post.slug}`;
  const coverSrc = post.coverImage?.startsWith("/") ? post.coverImage : undefined;
  const ogForLd = coverSrc
    ? coverSrc.startsWith("http")
      ? coverSrc
      : `${SITE_ORIGIN}${coverSrc}`
    : undefined;

  return (
    <article className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <JsonLd
        id={`ld-blog-${post.slug}`}
        data={blogPostingSchema({
          url: canonicalUrl,
          headline: post.title,
          description: post.description || post.excerpt,
          datePublished: post.datePublished,
          imageUrl: ogForLd,
        })}
      />
      <Link
        href="/blogs"
        className="mb-10 inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Blog
      </Link>

      <span className="mb-6 inline-block rounded-full bg-[#6B5FF8]/15 px-3 py-1 text-xs font-medium text-[#a78bfa]">
        {post.category}
      </span>

      {coverSrc ? (
        <div className="relative mb-10 aspect-[1200/630] w-full overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04]">
          <Image
            src={coverSrc}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 48rem, 100vw"
            priority
          />
        </div>
      ) : null}

      <h1 className="mb-6 text-4xl font-bold leading-tight text-white sm:text-5xl">{post.title}</h1>

      <div className="mb-12 flex items-center gap-5 border-b border-white/[0.07] pb-8 text-sm text-white/30">
        <span className="flex items-center gap-1.5">
          <Calendar className="h-4 w-4" />
          {formatDateLabel(post.datePublished)}
        </span>
        {post.readTime ? (
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            {post.readTime}
          </span>
        ) : null}
      </div>

      {post.excerpt ? <p className="mb-8 text-lg leading-relaxed text-white/70">{post.excerpt}</p> : null}

      <BlogPostMarkdown markdown={post.bodyMarkdown} />
    </article>
  );
}

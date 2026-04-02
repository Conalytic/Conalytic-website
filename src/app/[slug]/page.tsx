import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { StoryblokRichText } from "@storyblok/react/rsc";
import { getBlogStoryByPublicSlug } from "@/lib/storyblok";

interface Props {
  params: Promise<{ slug: string }>;
}

function formatDate(value: string | undefined) {
  if (!value) {
    return "";
  }

  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const story = await getBlogStoryByPublicSlug(slug);

  if (!story) {
    return {};
  }

  const content = story.content as Record<string, unknown>;
  const title = (content.seo_title as string) || (content.title as string) || story.name;
  const description =
    (content.seo_description as string) ||
    (content.excerpt as string) ||
    (content.description as string) ||
    "";

  return {
    title: `${title} – Conalytic Blog`,
    description,
  };
}

export default async function PublicBlogPage({ params }: Props) {
  const { slug } = await params;
  const story = await getBlogStoryByPublicSlug(slug);

  if (!story) {
    notFound();
  }

  const content = story.content as Record<string, unknown>;
  const title = (content.title as string) || story.name;
  const category = (content.category as string) || "Article";
  const readTime = (content.read_time as string) || (content.readTime as string) || "";
  const excerpt = (content.excerpt as string) || "";
  const richText = content.body_rich_text || content.content;

  return (
    <article className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <Link href="/blogs" className="mb-10 inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white">
        <ArrowLeft className="h-4 w-4" />
        Back to Blog
      </Link>

      <span className="mb-6 inline-block rounded-full bg-[#6B5FF8]/15 px-3 py-1 text-xs font-medium text-[#a78bfa]">{category}</span>

      <h1 className="mb-6 text-4xl font-bold leading-tight text-white sm:text-5xl">{title}</h1>

      <div className="mb-12 flex items-center gap-5 border-b border-white/[0.07] pb-8 text-sm text-white/30">
        <span className="flex items-center gap-1.5">
          <Calendar className="h-4 w-4" />
          {formatDate(story.first_published_at)}
        </span>
        {readTime && (
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            {readTime}
          </span>
        )}
      </div>

      {excerpt && <p className="mb-8 text-lg leading-relaxed text-white/70">{excerpt}</p>}

      {richText ? (
        <div className="prose prose-invert prose-lg max-w-none">
          <StoryblokRichText doc={richText as never} />
        </div>
      ) : (
        <p className="text-white/70">No content added yet.</p>
      )}
    </article>
  );
}


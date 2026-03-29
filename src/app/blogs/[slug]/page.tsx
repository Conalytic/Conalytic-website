import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { CTA } from "@/components/sections/CTA";
import { getStoryBySlug } from "@/lib/storyblok";

interface Props {
  params: Promise<{ slug: string }>;
}

// Static blog posts data — replace with Storyblok content once stories are created
const staticPosts: Record<string, {
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string[];
}> = {
  "how-to-build-a-thriving-remote-team-culture": {
    title: "How to Build a Thriving Remote Team Culture",
    category: "Collaboration",
    date: "Jul 28, 2025",
    readTime: "5 min read",
    excerpt: "Explore new approaches for optimizing productivity while working remotely.",
    content: [
      "Building a strong culture in a remote work environment may seem challenging, but it's far from impossible. With intentional strategies and the right tools, you can create a workplace where your team feels connected, valued, and motivated—even from miles apart.",
      "Remote work offers employees greater flexibility in managing their work-life balance. It reduces commute time and allows for a more comfortable and personalized work environment. However, it also brings unique challenges around communication, collaboration, and maintaining team cohesion.",
      "The key to a thriving remote culture lies in three areas: clear communication, strong tooling, and deliberate relationship building. When teams have the right analytics tools to stay aligned on performance metrics and goals, they can focus their energy on collaboration rather than data-wrangling.",
      "Platforms like Conalytic play a crucial role here — when everyone on the team can ask questions about campaign performance in plain English and get instant answers, there's less friction and more alignment. Data becomes a shared language rather than a siloed resource.",
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  // Try Storyblok first
  const story = await getStoryBySlug(`blogs/${slug}`);
  if (story) {
    const content = story.content as Record<string, string>;
    return {
      title: `${content.title || story.name} – Conalytic Blog`,
      description: content.excerpt || content.description || "",
    };
  }

  // Fall back to static
  const post = staticPosts[slug];
  if (post) {
    return {
      title: `${post.title} – Conalytic Blog`,
      description: post.excerpt,
    };
  }

  return { title: "Blog Post – Conalytic" };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  // Try Storyblok first
  const story = await getStoryBySlug(`blogs/${slug}`);

  if (story) {
    const content = story.content as Record<string, string>;
    return (
      <>
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
          <span className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-[#6B5FF8]/15 text-[#a78bfa] mb-6">
            {content.category || "Article"}
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
            {content.title || story.name}
          </h1>
          <div className="flex items-center gap-5 text-white/30 text-sm mb-12 pb-8 border-b border-white/[0.07]">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {story.first_published_at
                ? new Date(story.first_published_at).toLocaleDateString("en-US", {
                    month: "short", day: "numeric", year: "numeric",
                  })
                : ""}
            </span>
            {content.read_time && (
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {content.read_time}
              </span>
            )}
          </div>
          <div className="prose prose-invert prose-lg max-w-none text-white/70">
            <p>{content.excerpt}</p>
          </div>
        </article>
        <CTA />
      </>
    );
  }

  // Fall back to static content
  const post = staticPosts[slug];

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Post not found</h1>
        <p className="text-white/50 mb-8">This blog post doesn&apos;t exist or has been moved.</p>
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-[#a78bfa] hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <>
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Back link */}
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-10 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Blog
        </Link>

        {/* Category */}
        <span className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-[#6B5FF8]/15 text-[#a78bfa] mb-6">
          {post.category}
        </span>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
          {post.title}
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-5 text-white/30 text-sm mb-12 pb-8 border-b border-white/[0.07]">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {post.date}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            {post.readTime}
          </span>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {post.content.map((paragraph, i) => (
            <p key={i} className="text-white/65 leading-relaxed text-lg">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-16 p-8 rounded-2xl bg-[#6B5FF8]/10 border border-[#6B5FF8]/20">
          <h3 className="text-white font-semibold text-lg mb-2">Weekly newsletter</h3>
          <p className="text-white/50 text-sm mb-5">
            No spam. Just the latest releases and tips, interesting articles, and exclusive
            interviews in your inbox every week.
          </p>
          <div className="flex gap-3">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-2.5 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#6B5FF8]/50 transition-all"
            />
            <button className="bg-[#6B5FF8] text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-[#5a43f0] transition-colors">
              Subscribe
            </button>
          </div>
        </div>

        {/* Back */}
        <div className="mt-12 pt-8 border-t border-white/[0.07]">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to all posts
          </Link>
        </div>
      </article>

      <CTA />
    </>
  );
}

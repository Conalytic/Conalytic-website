import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog – Conalytic",
  description:
    "Insights, tips, and stories to supercharge your analytics. Explore the latest trends in marketing analytics, productivity hacks, and updates from Conalytic.",
};

const blogPosts = [
  {
    slug: "how-to-build-a-thriving-remote-team-culture",
    title: "How to Build a Thriving Remote Team Culture",
    excerpt:
      "Explore new approaches for optimizing productivity while working remotely. Building a strong culture in a remote work environment may seem challenging, but it's far from impossible.",
    category: "Collaboration",
    date: "Sep 2, 2025",
    readTime: "5 min read",
    featured: true,
  },
  {
    slug: "ai-powered-analytics-future-of-marketing",
    title: "AI-Powered Analytics: The Future of Marketing Intelligence",
    excerpt:
      "Discover the latest tools and practices shaping the way Gen-Z teams work with data and make decisions faster than ever before.",
    category: "Analytics",
    date: "Jul 28, 2025",
    readTime: "7 min read",
    featured: false,
  },
  {
    slug: "maximizing-roas-with-conversational-ai",
    title: "Maximizing ROAS with Conversational AI Analytics",
    excerpt:
      "Learn how marketing teams are using natural language queries to uncover hidden optimization opportunities in their Google Ads campaigns.",
    category: "Google Ads",
    date: "Jul 28, 2025",
    readTime: "6 min read",
    featured: false,
  },
  {
    slug: "automated-client-reporting-agencies",
    title: "Automated Client Reporting: A Game Changer for Agencies",
    excerpt:
      "Explore new approaches for optimizing productivity while working remotely with AI-generated insights and automated delivery.",
    category: "Reporting",
    date: "Jul 28, 2025",
    readTime: "8 min read",
    featured: false,
  },
  {
    slug: "ga4-insights-without-sql",
    title: "Getting Deep GA4 Insights Without Writing a Single Line of SQL",
    excerpt:
      "How to Build a Thriving Remote Team Culture with conversational analytics that transforms complex queries into simple conversations.",
    category: "GA4",
    date: "Jul 28, 2025",
    readTime: "4 min read",
    featured: false,
  },
  {
    slug: "bigquery-unified-marketing-data",
    title: "Why BigQuery is the Foundation of Modern Marketing Analytics",
    excerpt:
      "Explore new approaches for optimizing productivity while working remotely with BigQuery as your central data warehouse.",
    category: "Data Engineering",
    date: "Jul 28, 2025",
    readTime: "9 min read",
    featured: false,
  },
];

const categoryColors: Record<string, string> = {
  Collaboration: "bg-[#6B5FF8]/15 text-[#a78bfa]",
  Analytics: "bg-[#0ea5e9]/15 text-[#60a5fa]",
  "Google Ads": "bg-[#10b981]/15 text-[#34d399]",
  Reporting: "bg-[#f59e0b]/15 text-[#fbbf24]",
  GA4: "bg-[#ec4899]/15 text-[#f472b6]",
  "Data Engineering": "bg-[#8b5cf6]/15 text-[#c4b5fd]",
};

export default function BlogsPage() {
  const featured = blogPosts.find((p) => p.featured);
  const rest = blogPosts.filter((p) => !p.featured);

  return (
    <>
      {/* Hero */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 hero-gradient overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#6B5FF8]/15 rounded-full blur-3xl" />

        <div className="relative max-w-3xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight">
            Insights, Tips, and Stories to{" "}
            <span className="gradient-text">Supercharge Your Analytics</span>
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Explore the latest trends in marketing analytics, productivity hacks, and updates from
            Conalytic.
          </p>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Featured post */}
          {featured && (
            <Link
              href={`/blogs/${featured.slug}`}
              className="block group mb-12 rounded-2xl overflow-hidden border border-white/[0.07] bg-white/[0.02] hover:border-[#6B5FF8]/30 hover:bg-white/[0.04] transition-all"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Thumbnail */}
                <div className="aspect-[16/9] lg:aspect-auto bg-gradient-to-br from-[#6B5FF8]/30 to-[#0ea5e9]/20 flex items-center justify-center min-h-[240px]">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-2xl bg-[#6B5FF8]/30 border border-[#6B5FF8]/40 flex items-center justify-center mx-auto mb-2">
                      <ArrowRight className="w-8 h-8 text-[#a78bfa]" />
                    </div>
                    <p className="text-white/20 text-xs">Featured article</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                        categoryColors[featured.category] || "bg-white/10 text-white/50"
                      }`}
                    >
                      {featured.category}
                    </span>
                    <Badge variant="outline">Featured</Badge>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 group-hover:text-[#a78bfa] transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-white/50 leading-relaxed mb-6">{featured.excerpt}</p>
                  <div className="flex items-center gap-4 text-white/30 text-xs">
                    <span>{featured.date}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {featured.readTime}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* Blog grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blogs/${post.slug}`}
                className="group flex flex-col rounded-2xl overflow-hidden border border-white/[0.07] bg-white/[0.02] hover:border-[#6B5FF8]/30 hover:bg-white/[0.04] transition-all hover:-translate-y-1"
              >
                {/* Thumbnail */}
                <div className="aspect-[16/9] bg-gradient-to-br from-[#6B5FF8]/20 to-[#0E1526] flex items-center justify-center">
                  <div className="w-10 h-10 rounded-xl bg-[#6B5FF8]/20 border border-[#6B5FF8]/30 flex items-center justify-center">
                    <ArrowRight className="w-5 h-5 text-[#a78bfa]" />
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                        categoryColors[post.category] || "bg-white/10 text-white/50"
                      }`}
                    >
                      {post.category}
                    </span>
                    <span className="text-white/25 text-xs">{post.date}</span>
                  </div>

                  <h3 className="text-white font-semibold mb-3 group-hover:text-[#a78bfa] transition-colors leading-snug flex-1">
                    {post.title}
                  </h3>

                  <p className="text-white/40 text-sm leading-relaxed mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-white/25 text-xs">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                    <span className="text-[#a78bfa] text-xs font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      Read more <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

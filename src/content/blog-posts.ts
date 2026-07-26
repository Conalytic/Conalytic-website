/**
 * Static blog posts (canonical URLs: `/{slug}`). Keep in sync with `BlogsClient`.
 */
import { conversationalAnalyticsBody } from "@/content/blog-bodies/conversational-analytics";
import { kpisTrackerBody } from "@/content/blog-bodies/kpis-tracker";
import { reportBuilderBody } from "@/content/blog-bodies/report-builder";

export interface StaticBlogPost {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  dateLabel: string;
  datePublished: string;
  excerpt: string;
  description: string;
  coverImage?: string;
  featured?: boolean;
  bodyMarkdown: string;
}

export const STATIC_BLOG_POSTS: StaticBlogPost[] = [
  {
    slug: "conversational-analytics-marketing-chat-guide",
    title: "Conversational Analytics: Ask Questions of Your Marketing Data in Plain English",
    category: "Conversational Analytics",
    readTime: "12 min read",
    dateLabel: "Jul 26, 2026",
    datePublished: "2026-07-26T12:00:00.000Z",
    excerpt:
      "Connect GA4, Search Console, Google Ads, GTM, and Meta Ads once—then ask scoped questions in natural language. Conalytic Chats streams answers with inline charts, tables, and KPI rows from live APIs.",
    description:
      "Complete guide to Conalytic Conversational Analytics (Chats): integrations, scoped conversations, AI models, conalytic-viz, and how marketing teams replace dashboard hopping with plain-English Q&A.",
    coverImage: "/blog/conversational-analytics-cover.png",
    featured: true,
    bodyMarkdown: conversationalAnalyticsBody,
  },
  {
    slug: "kpis-tracker-marketing-goals-guide",
    title: "KPIs Tracker: Monitor GA4, Search Console, and Google Ads Goals in One Dashboard",
    category: "KPIs Tracker",
    readTime: "11 min read",
    dateLabel: "Jul 26, 2026",
    datePublished: "2026-07-26T10:00:00.000Z",
    excerpt:
      "Define increase or decrease targets across GA4, GSC, and Google Ads—then see On track, At risk, Off track, or No data labels with six months of history and optional GSC keyword ranking goals.",
    description:
      "How Conalytic KPIs Tracker works: wizard setup, rules-based scoring, monthly vs YTD views, keyword tracking, and agency playbooks for goal monitoring without spreadsheets.",
    coverImage: "/blog/kpis-tracker-cover.png",
    bodyMarkdown: kpisTrackerBody,
  },
  {
    slug: "report-builder-html-marketing-reports-guide",
    title: "Report Builder: Generate Premium HTML Marketing Presentation Decks",
    category: "Report Builder",
    readTime: "11 min read",
    dateLabel: "Jul 26, 2026",
    datePublished: "2026-07-26T08:00:00.000Z",
    excerpt:
      "Connect GA4, GSC, Google Ads, and GTM—pick date ranges and platform focus areas, optionally enable AI insights, and ship multi-slide HTML decks clients can view in-browser or download.",
    description:
      "Guide to Conalytic Report Builder: slide structure, platform focus options, AI narratives, date comparisons, token economics, and agency QA before sending client reports.",
    coverImage: "/blog/report-builder-cover.png",
    bodyMarkdown: reportBuilderBody,
  },
];

export function getBlogPostBySlug(slug: string): StaticBlogPost | undefined {
  const normalized = slug.replace(/^\/+|\/+$/g, "");
  return STATIC_BLOG_POSTS.find((p) => p.slug === normalized);
}

export function getAllBlogSlugs(): string[] {
  return STATIC_BLOG_POSTS.map((p) => p.slug);
}

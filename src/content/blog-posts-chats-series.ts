/**
 * Conversational Analytics editorial series (Oct 2026). Merged into STATIC_BLOG_POSTS.
 */
import { chatsKpisReportBuilderWorkflowBody } from "@/content/blog-bodies/chats-kpis-report-builder-workflow";
import { clientSafeAnalyticsScopedChatsBody } from "@/content/blog-bodies/client-safe-analytics-scoped-chats";
import { ga4GscAdsWhichToolBody } from "@/content/blog-bodies/ga4-search-console-google-ads-which-tool";
import { googleAdsPerformanceQuestionsBody } from "@/content/blog-bodies/google-ads-performance-questions-marketers";
import { googleAnalytics4QuestionsMarketersBody } from "@/content/blog-bodies/google-analytics-4-questions-marketers";
import { gtmSanityChecksMarketersBody } from "@/content/blog-bodies/gtm-sanity-checks-marketers-trust-ga4";
import { investigateTrafficDrop30MinBody } from "@/content/blog-bodies/investigate-traffic-conversion-drop-30-minutes";
import { marketingAiContextFilesBody } from "@/content/blog-bodies/marketing-ai-context-files-accuracy";
import { searchConsoleQuestionsMarketersBody } from "@/content/blog-bodies/search-console-questions-marketers";
import { weeklyMarketingStandupQuestionsBody } from "@/content/blog-bodies/weekly-marketing-standup-analytics-questions";
import type { StaticBlogPost } from "@/lib/blog-types";

export const CHATS_SERIES_BLOG_POSTS: StaticBlogPost[] = [
  {
    slug: "chats-kpis-report-builder-workflow",
    title: "Chats, KPIs Tracker, and Report Builder: One Marketing Analytics Workflow",
    category: "Conversational Analytics",
    cluster: "chat",
    readTime: "10 min read",
    dateLabel: "Oct 9, 2026",
    datePublished: "2026-10-09T10:00:00.000Z",
    excerpt:
      "Investigate in Conversational Analytics, monitor exceptions in KPIs Tracker, and ship client decks from Report Builder—without rebuilding the same math three times.",
    description:
      "End-to-end Conalytic workflow: use Chats for ad-hoc GA4, GSC, and Ads questions, promote metrics to KPIs Tracker, then assemble HTML reports with shared definitions.",
    primaryKeyword: "marketing analytics workflow",
    keywords: [
      "marketing analytics workflow",
      "conversational analytics",
      "kpi tracker",
      "report builder",
      "agency reporting workflow",
    ],
    demoVariant: "report-structure",
    bodyMarkdown: chatsKpisReportBuilderWorkflowBody,
  },
  {
    slug: "ga4-search-console-google-ads-which-tool",
    title: "GA4 vs Search Console vs Google Ads: Which Tool Answers Which Question?",
    category: "Conversational Analytics",
    cluster: "chat",
    readTime: "10 min read",
    dateLabel: "Oct 8, 2026",
    datePublished: "2026-10-08T10:00:00.000Z",
    excerpt:
      "Each platform counts differently. This source map shows when to trust GA4 sessions, GSC clicks, or Ads conversions—and how to ask cross-source questions without mixing definitions.",
    description:
      "Informational guide to GA4, Google Search Console, and Google Ads: what each measures, common mismatches, and plain-English prompts for conversational analytics.",
    primaryKeyword: "ga4 vs search console",
    keywords: [
      "ga4 vs search console",
      "google ads vs ga4",
      "cross channel analytics",
      "marketing data sources",
      "search console vs ga4 clicks",
    ],
    demoVariant: "cross-channel",
    bodyMarkdown: ga4GscAdsWhichToolBody,
  },
  {
    slug: "weekly-marketing-standup-analytics-questions",
    title: "Weekly Marketing Standup: Analytics Questions That Actually Save Time",
    category: "Conversational Analytics",
    cluster: "chat",
    readTime: "10 min read",
    dateLabel: "Oct 7, 2026",
    datePublished: "2026-10-07T10:00:00.000Z",
    excerpt:
      "Standups fail when prompts are vague. Use this question bank for GA4, GSC, and Ads—plus examples of answers you can act on in under fifteen minutes.",
    description:
      "Weekly marketing standup analytics prompts for conversational analytics: scoped questions, good vs weak phrasing, and how agencies run exception-based reviews.",
    primaryKeyword: "marketing standup questions",
    keywords: [
      "marketing standup questions",
      "weekly marketing metrics",
      "ga4 standup",
      "marketing analytics questions",
      "natural language analytics",
    ],
    demoVariant: "ask-ga4",
    bodyMarkdown: weeklyMarketingStandupQuestionsBody,
  },
  {
    slug: "investigate-traffic-conversion-drop-30-minutes",
    title: "How to Investigate a Traffic or Conversion Drop in 30 Minutes",
    category: "Conversational Analytics",
    cluster: "chat",
    readTime: "10 min read",
    dateLabel: "Oct 6, 2026",
    datePublished: "2026-10-06T10:00:00.000Z",
    excerpt:
      "A timed playbook across GA4, Search Console, and Google Ads so you separate measurement noise from real demand loss before you rewrite campaigns or content.",
    description:
      "30-minute traffic and conversion drop investigation: gates for GSC vs GA4, Ads efficiency, landing pages, and tagging—built for conversational analytics workflows.",
    primaryKeyword: "traffic drop investigation",
    keywords: [
      "traffic drop investigation",
      "conversion drop analysis",
      "ga4 traffic drop",
      "organic traffic decline",
      "marketing incident response",
    ],
    demoVariant: "ga4-traffic-drop",
    bodyMarkdown: investigateTrafficDrop30MinBody,
  },
  {
    slug: "gtm-sanity-checks-marketers-trust-ga4",
    title: "GTM Sanity Checks Marketers Should Run Before They Trust GA4",
    category: "Conversational Analytics",
    cluster: "chat",
    readTime: "9 min read",
    dateLabel: "Oct 5, 2026",
    datePublished: "2026-10-05T10:00:00.000Z",
    excerpt:
      "Broken tags quietly distort every dashboard. Run these Google Tag Manager checks on key events, triggers, and consent mode before you defend numbers in a client call.",
    description:
      "Google Tag Manager sanity checks for marketers: conversion events, duplicate tags, consent mode, and GA4 linkage—plus questions to ask in conversational analytics.",
    primaryKeyword: "gtm sanity check",
    keywords: [
      "gtm sanity check",
      "google tag manager audit",
      "ga4 tagging",
      "conversion tracking setup",
      "marketing measurement quality",
    ],
    demoVariant: "ask-ga4",
    bodyMarkdown: gtmSanityChecksMarketersBody,
  },
  {
    slug: "search-console-questions-marketers",
    title: "10 Search Console Questions Marketers Can Ask in Plain English",
    category: "Conversational Analytics",
    cluster: "chat",
    readTime: "10 min read",
    dateLabel: "Oct 4, 2026",
    datePublished: "2026-10-04T10:00:00.000Z",
    excerpt:
      "CTR, indexing, and query trends do not belong in spreadsheet exports. These GSC prompts help you spot winners, leaks, and technical surprises fast.",
    description:
      "Plain-English Google Search Console questions for SEO and content teams: clicks, impressions, queries, pages, and indexing—with conversational analytics examples.",
    primaryKeyword: "search console questions",
    keywords: [
      "search console questions",
      "gsc reporting",
      "google search console tips",
      "seo analytics questions",
      "natural language gsc",
    ],
    demoVariant: "cross-channel",
    bodyMarkdown: searchConsoleQuestionsMarketersBody,
  },
  {
    slug: "google-ads-performance-questions-marketers",
    title: "8 Google Ads Performance Questions for Your Next Review",
    category: "Conversational Analytics",
    cluster: "chat",
    readTime: "9 min read",
    dateLabel: "Oct 3, 2026",
    datePublished: "2026-10-03T10:00:00.000Z",
    excerpt:
      "Budget reviews go sideways when everyone stares at different conversion columns. Use these scoped Ads prompts aligned with GA4 where it matters.",
    description:
      "Google Ads performance review questions: spend efficiency, search terms, conversion actions, and GA4 alignment—formatted for conversational analytics chats.",
    primaryKeyword: "google ads performance questions",
    keywords: [
      "google ads performance questions",
      "google ads review",
      "ppc analytics",
      "google ads ga4",
      "paid search reporting",
    ],
    demoVariant: "ads-ga4-discrepancy",
    bodyMarkdown: googleAdsPerformanceQuestionsBody,
  },
  {
    slug: "client-safe-analytics-scoped-chats",
    title: "Client-Safe Analytics: Scoped Chats for Agencies",
    category: "Conversational Analytics",
    cluster: "chat",
    readTime: "10 min read",
    dateLabel: "Oct 2, 2026",
    datePublished: "2026-10-02T10:00:00.000Z",
    excerpt:
      "One wrong property in a shared thread creates a compliance story you do not want. Learn how scoped chats, roles, and export habits keep client data where it belongs.",
    description:
      "Agency guide to client-safe conversational analytics: property scoping, access boundaries, QA before exports, and governance habits for multi-client teams.",
    primaryKeyword: "client safe analytics",
    keywords: [
      "client safe analytics",
      "agency analytics governance",
      "scoped analytics chat",
      "multi client reporting",
      "marketing data privacy",
    ],
    demoVariant: "ai-reports",
    bodyMarkdown: clientSafeAnalyticsScopedChatsBody,
  },
  {
    slug: "marketing-ai-context-files-accuracy",
    title: "Context Files and Metric Definitions for Reliable Marketing AI",
    category: "Conversational Analytics",
    cluster: "chat",
    readTime: "9 min read",
    dateLabel: "Oct 1, 2026",
    datePublished: "2026-10-01T10:00:00.000Z",
    excerpt:
      "Models guess event names unless you teach them your dictionary. Context files turn vague AI answers into numbers leadership already recognizes.",
    description:
      "How marketing teams use context files and metric definitions with conversational analytics: naming conventions, KPI alignment, and fewer wrong GA4 event labels.",
    primaryKeyword: "marketing ai context",
    keywords: [
      "marketing ai context",
      "metric definitions",
      "ga4 event naming",
      "conversational analytics accuracy",
      "marketing data dictionary",
    ],
    demoVariant: "ai-reports",
    bodyMarkdown: marketingAiContextFilesBody,
  },
  {
    slug: "google-analytics-4-questions-marketers",
    title: "Google Analytics 4 Questions Marketers Should Ask (When GA4 Is the Source of Truth)",
    category: "Conversational Analytics",
    cluster: "chat",
    readTime: "10 min read",
    dateLabel: "Sep 30, 2026",
    datePublished: "2026-09-30T10:00:00.000Z",
    excerpt:
      "Sometimes GA4 is the right lens—funnels, audiences, on-site behavior. These prompts keep you out of export hell while still catching tracking drift early.",
    description:
      "GA4-only analytics questions for marketers: when to rely on Google Analytics 4 alone, funnel and landing page prompts, and conversational analytics best practices.",
    primaryKeyword: "google analytics 4 questions",
    keywords: [
      "google analytics 4 questions",
      "ga4 questions",
      "ga4 for marketers",
      "chat with ga4",
      "ga4 reporting tips",
    ],
    demoVariant: "ask-ga4",
    bodyMarkdown: googleAnalytics4QuestionsMarketersBody,
  },
];

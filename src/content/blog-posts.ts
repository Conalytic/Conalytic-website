/**
 * Static blog posts (canonical URLs: `/resources/blogs/{slug}`). Keep in sync with `BlogsClient`.
 */
import { getAllBlogSlugs } from "@/content/blog-slugs";
import { aiMarketingReportsBody } from "@/content/blog-bodies/ai-marketing-reports";
import { aiTrafficGa4Body } from "@/content/blog-bodies/ai-traffic-ga4";
import { conversationalAnalyticsBody } from "@/content/blog-bodies/conversational-analytics";
import { crossChannelReportingBody } from "@/content/blog-bodies/cross-channel-reporting";
import { ga4TrafficDropBody } from "@/content/blog-bodies/ga4-traffic-drop";
import { googleAdsGa4DiscrepancyBody } from "@/content/blog-bodies/google-ads-ga4-discrepancy";
import { htmlPdfDashboardBody } from "@/content/blog-bodies/html-pdf-dashboard";
import { kpiStatusTrackingBody } from "@/content/blog-bodies/kpi-status-tracking";
import { kpisTrackerBody } from "@/content/blog-bodies/kpis-tracker";
import { marketingKpiTargetsBody } from "@/content/blog-bodies/marketing-kpi-targets";
import { marketingReportStructureBody } from "@/content/blog-bodies/marketing-report-structure";
import { reportBuilderBody } from "@/content/blog-bodies/report-builder";
import { whatToAskGa4Body } from "@/content/blog-bodies/what-to-ask-ga4";
import type { BlogCluster, BlogDemoVariant } from "@/lib/blog-demo-variants";

export const POSTS_PER_PAGE = 9;

export interface StaticBlogPost {
  slug: string;
  title: string;
  category: string;
  cluster: BlogCluster;
  readTime: string;
  dateLabel: string;
  datePublished: string;
  excerpt: string;
  description: string;
  primaryKeyword: string;
  keywords: string[];
  demoVariant?: BlogDemoVariant;
  featured?: boolean;
  bodyMarkdown: string;
}

export const STATIC_BLOG_POSTS: StaticBlogPost[] = [
  {
    slug: "ga4-traffic-drop-search-console",
    title: "Why GA4 Traffic Dropped but Search Console Didn't",
    category: "Conversational Analytics",
    cluster: "chat",
    readTime: "9 min read",
    dateLabel: "Aug 2, 2026",
    datePublished: "2026-08-02T10:00:00.000Z",
    excerpt:
      "Stable GSC clicks plus falling GA4 sessions usually means a measurement problem—not an SEO crisis. Use this four-gate elimination framework before you rewrite meta titles.",
    description:
      "Diagnose a GA4 traffic drop when Search Console clicks look fine. Compare GSC vs GA4 counting, run a four-gate elimination sequence, and separate measurement issues from real organic declines.",
    primaryKeyword: "ga4 traffic drop",
    keywords: [
      "ga4 traffic drop",
      "organic traffic drop",
      "search console vs ga4",
      "ga4 data discrepancy",
      "traffic drop analysis",
    ],
    demoVariant: "ga4-traffic-drop",
    featured: true,
    bodyMarkdown: ga4TrafficDropBody,
  },
  {
    slug: "google-ads-ga4-conversion-discrepancy",
    title: "Why Google Ads and GA4 Disagree on Conversions",
    category: "Conversational Analytics",
    cluster: "chat",
    readTime: "9 min read",
    dateLabel: "Aug 1, 2026",
    datePublished: "2026-08-01T10:00:00.000Z",
    excerpt:
      "Ads and GA4 conversion totals rarely match—and a gap under 15–20% is often normal. This decision tree tells you which number belongs in the client deck.",
    description:
      "Fix Google Ads and GA4 conversion mismatches with an elimination sequence: attribution models, conversion windows, click vs session counting, and when to stop chasing noise.",
    primaryKeyword: "google ads ga4 discrepancy",
    keywords: [
      "google ads ga4 discrepancy",
      "conversion tracking mismatch",
      "google ads conversions",
      "ga4 conversion data",
      "attribution discrepancy",
    ],
    demoVariant: "ads-ga4-discrepancy",
    bodyMarkdown: googleAdsGa4DiscrepancyBody,
  },
  {
    slug: "what-to-ask-ga4-data",
    title: "What to Actually Ask Your GA4 Data",
    category: "Conversational Analytics",
    cluster: "chat",
    readTime: "10 min read",
    dateLabel: "Jul 31, 2026",
    datePublished: "2026-07-31T10:00:00.000Z",
    excerpt:
      "Generic GA4 questions waste time. Organize by situation—standups, client calls, budget defence, incidents—and know what a good answer contains versus a bad one.",
    description:
      "Practical GA4 questions for natural language analytics: weekly standup prompts, client-call queries, budget defence, and incident investigations—with good vs bad answer examples.",
    primaryKeyword: "chat with ga4",
    keywords: [
      "chat with ga4",
      "ga4 questions",
      "natural language analytics",
      "ask ga4",
      "ga4 ai assistant",
    ],
    demoVariant: "ask-ga4",
    bodyMarkdown: whatToAskGa4Body,
  },
  {
    slug: "tracking-ai-assistant-traffic-ga4",
    title: "Tracking AI Assistant Traffic in GA4",
    category: "Conversational Analytics",
    cluster: "chat",
    readTime: "9 min read",
    dateLabel: "Jul 30, 2026",
    datePublished: "2026-07-30T10:00:00.000Z",
    excerpt:
      "The AI assistant channel is not retroactive, native apps strip referrers, and consent mode distorts small volumes. Report share of sessions—not absolute counts alone.",
    description:
      "Measure AI assistant and ChatGPT referral traffic in GA4 with integrity: retroactivity limits, Direct misclassification, consent-mode effects, and how to report low-volume AI sessions.",
    primaryKeyword: "ai traffic ga4",
    keywords: [
      "ai traffic ga4",
      "chatgpt referral traffic",
      "ai assistant channel",
      "ai referral tracking",
      "llm traffic",
    ],
    demoVariant: "ai-traffic-ga4",
    bodyMarkdown: aiTrafficGa4Body,
  },
  {
    slug: "html-vs-pdf-live-dashboard-reports",
    title: "HTML vs PDF vs Live Dashboard for Client Deliverables",
    category: "Report Builder",
    cluster: "reports",
    readTime: "9 min read",
    dateLabel: "Jul 29, 2026",
    datePublished: "2026-07-29T10:00:00.000Z",
    excerpt:
      "PDF archives, live dashboards refresh, and HTML reports balance fidelity with frictionless sharing. An honest comparison for agency client deliverables.",
    description:
      "Compare HTML marketing reports, PDF exports, and live dashboards for client deliverables—archival needs, mobile access, printing, offline viewing, and white-label options.",
    primaryKeyword: "html marketing report",
    keywords: [
      "html marketing report",
      "client report format",
      "marketing report export",
      "shareable marketing report",
      "pdf marketing report",
    ],
    demoVariant: "html-pdf-dashboard",
    bodyMarkdown: htmlPdfDashboardBody,
  },
  {
    slug: "should-ai-write-client-reports",
    title: "Should AI Write Your Client Reports?",
    category: "Report Builder",
    cluster: "reports",
    readTime: "9 min read",
    dateLabel: "Jul 28, 2026",
    datePublished: "2026-07-28T10:00:00.000Z",
    excerpt:
      "AI is good at explaining a finding and bad at determining one. Detection should be deterministic; narration can be generative. Here is what humans must verify before send.",
    description:
      "A sceptical guide to AI marketing reports: where AI narratives fail, hallucinated causation risks, and a human verification checklist before client decks go out.",
    primaryKeyword: "ai marketing reports",
    keywords: [
      "ai marketing reports",
      "ai report generator",
      "automated report insights",
      "ai analytics insights",
      "ai report writing",
    ],
    demoVariant: "ai-reports",
    bodyMarkdown: aiMarketingReportsBody,
  },
  {
    slug: "client-marketing-report-structure",
    title: "The Structure of a Client Report That Gets Read",
    category: "Report Builder",
    cluster: "reports",
    readTime: "10 min read",
    dateLabel: "Jul 27, 2026",
    datePublished: "2026-07-27T10:00:00.000Z",
    excerpt:
      "Most agency reports are ordered by data source. Order by decision instead—executive summary, health check, KPI snapshot, cross-source findings, methodology, action plan.",
    description:
      "A 12-slide marketing report structure agencies actually read: decision-first ordering, methodology slide rationale, and monthly report sections that survive client scrutiny.",
    primaryKeyword: "marketing report structure",
    keywords: [
      "marketing report structure",
      "monthly marketing report",
      "agency report format",
      "marketing report sections",
      "client reporting template",
    ],
    demoVariant: "report-structure",
    bodyMarkdown: marketingReportStructureBody,
  },
  {
    slug: "cross-channel-reporting-gsc-ga4-ads",
    title: "Reading GSC, GA4 and Google Ads Together",
    category: "Report Builder",
    cluster: "reports",
    readTime: "10 min read",
    dateLabel: "Jul 26, 2026",
    datePublished: "2026-07-26T14:00:00.000Z",
    excerpt:
      "Single-source reports produce single-source conclusions. Named cross-channel patterns—brand paid cannibalisation, CTR erosion, conversion divergence—tell one story across platforms.",
    description:
      "Cross-channel reporting methodology for GSC, GA4, and Google Ads: named patterns, rule-based detectors, and why unified marketing data beats siloed platform exports.",
    primaryKeyword: "cross channel reporting",
    keywords: [
      "cross channel reporting",
      "multi channel marketing report",
      "unified marketing data",
      "cross platform analytics",
      "marketing data integration",
    ],
    demoVariant: "cross-channel",
    bodyMarkdown: crossChannelReportingBody,
  },
  {
    slug: "marketing-kpi-targets-goal-setting",
    title: "Setting KPI Targets Clients Won't Dispute",
    category: "KPIs Tracker",
    cluster: "kpis",
    readTime: "10 min read",
    dateLabel: "Jul 25, 2026",
    datePublished: "2026-07-25T10:00:00.000Z",
    excerpt:
      "A 10% increase target means nothing without direction, threshold, and comparison window defined together. Cover seasonality, decrease targets, and contract language.",
    description:
      "Set marketing KPI targets clients accept: direction-aware goals, YoY vs MoM comparison windows, decrease targets for CPC and CPL, and SOW language that avoids over-promising.",
    primaryKeyword: "marketing kpi targets",
    keywords: [
      "marketing kpi targets",
      "seo goal setting",
      "kpi target setting",
      "setting marketing goals",
      "marketing goal tracking",
    ],
    demoVariant: "kpi-targets",
    bodyMarkdown: marketingKpiTargetsBody,
  },
  {
    slug: "rules-based-vs-ai-kpi-status",
    title: "Rules-Based vs AI-Scored KPI Status",
    category: "KPIs Tracker",
    cluster: "kpis",
    readTime: "10 min read",
    dateLabel: "Jul 24, 2026",
    datePublished: "2026-07-24T10:00:00.000Z",
    excerpt:
      "If the same inputs produce a different status label on a different day, the label is useless in a client meeting. Reproducibility is the whole point of a status pill.",
    description:
      "Rules-based KPI status tracking vs AI scoring: on track, at risk, off track, and no data as honest states—with threshold design and where AI helps narration only.",
    primaryKeyword: "kpi status tracking",
    keywords: [
      "kpi status tracking",
      "marketing kpi monitoring",
      "goal tracking dashboard",
      "kpi scoring",
      "kpi tracking software",
    ],
    demoVariant: "kpi-status",
    bodyMarkdown: kpiStatusTrackingBody,
  },
  {
    slug: "conversational-analytics-marketing-chat-guide",
    title: "Conversational Analytics: Ask Questions of Your Marketing Data in Plain English",
    category: "Conversational Analytics",
    cluster: "chat",
    readTime: "12 min read",
    dateLabel: "Jul 20, 2026",
    datePublished: "2026-07-20T12:00:00.000Z",
    excerpt:
      "Connect GA4, Search Console, Google Ads, GTM, and Meta Ads once—then ask scoped questions in natural language. Conalytic Chats streams answers with inline charts, tables, and KPI rows from live APIs.",
    description:
      "Complete guide to Conalytic Conversational Analytics: what it is, how to use it, platform integrations, benefits for marketing teams, and best practices for plain-English data Q&A.",
    primaryKeyword: "conversational analytics",
    keywords: [
      "conversational analytics",
      "marketing data chat",
      "GA4 chat",
      "natural language analytics",
      "marketing analytics platform",
    ],
    bodyMarkdown: conversationalAnalyticsBody,
  },
  {
    slug: "report-builder-html-marketing-reports-guide",
    title: "Report Builder: Generate Premium HTML Marketing Presentation Decks",
    category: "Report Builder",
    cluster: "reports",
    readTime: "11 min read",
    dateLabel: "Jul 18, 2026",
    datePublished: "2026-07-18T08:00:00.000Z",
    excerpt:
      "Connect GA4, GSC, Google Ads, and GTM—pick date ranges and platform focus areas, optionally enable AI insights, and ship multi-slide HTML decks clients can view in-browser or download.",
    description:
      "Guide to Conalytic Report Builder: slide structure, platform focus options, AI narratives, date comparisons, and agency tips for client-ready HTML decks.",
    primaryKeyword: "html marketing report",
    keywords: [
      "html marketing report",
      "report builder",
      "marketing presentation deck",
      "automated client reporting",
      "GA4 report template",
    ],
    bodyMarkdown: reportBuilderBody,
  },
  {
    slug: "kpis-tracker-marketing-goals-guide",
    title: "KPIs Tracker: Monitor GA4, Search Console, and Google Ads Goals in One Dashboard",
    category: "KPIs Tracker",
    cluster: "kpis",
    readTime: "11 min read",
    dateLabel: "Jul 16, 2026",
    datePublished: "2026-07-16T10:00:00.000Z",
    excerpt:
      "Define increase or decrease targets across GA4, GSC, and Google Ads—then see On track, At risk, Off track, or No data labels with six months of history and optional GSC keyword ranking goals.",
    description:
      "How Conalytic KPIs Tracker works: wizard setup, rules-based scoring, monthly vs YTD views, keyword tracking, and agency playbooks for goal monitoring without spreadsheets.",
    primaryKeyword: "marketing goal tracking",
    keywords: [
      "marketing goal tracking",
      "kpi tracker",
      "GA4 goals",
      "Google Ads KPI monitoring",
      "agency goal dashboard",
    ],
    bodyMarkdown: kpisTrackerBody,
  },
];

export function getBlogPostsNewestFirst(): StaticBlogPost[] {
  return [...STATIC_BLOG_POSTS].sort(
    (a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime(),
  );
}

export function getBlogPostBySlug(slug: string): StaticBlogPost | undefined {
  const normalized = slug.replace(/^\/+|\/+$/g, "");
  return STATIC_BLOG_POSTS.find((p) => p.slug === normalized);
}

export function getRelatedBlogPosts(slug: string, limit = 2): StaticBlogPost[] {
  const current = getBlogPostBySlug(slug);
  if (!current) return STATIC_BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, limit);

  const sameCluster = STATIC_BLOG_POSTS.filter((p) => p.slug !== slug && p.cluster === current.cluster);
  const others = STATIC_BLOG_POSTS.filter((p) => p.slug !== slug && p.cluster !== current.cluster);
  return [...sameCluster, ...others].slice(0, limit);
}

export { getAllBlogSlugs } from "@/content/blog-slugs";

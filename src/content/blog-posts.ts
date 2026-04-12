/**
 * Static blog posts (canonical URLs: `/{slug}`). Keep in sync with slugs linked from `BlogsClient`.
 */
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
  bodyMarkdown: string;
}

const remoteCulture = `Remote work is here to stay — and the teams that thrive invest deliberately in culture, not just tools.

## Start with clarity

Define how you communicate, how decisions get made, and what “good” looks like when you cannot bump into each other in the hallway. Write it down, revisit it quarterly, and tie it to outcomes your team already cares about.

## Rituals that scale

Short stand-ups, weekly demos, and async written updates reduce thrash. Pair them with intentional social touchpoints so people still feel like a team, not a list of avatars.

## Measure what matters

Use lightweight surveys and retention signals alongside productivity metrics. When people feel trusted and aligned, velocity and quality tend to follow.`;

const aiAnalytics = `Marketing data is too fragmented to manage with static dashboards alone. Teams want answers in context — and they want them now.

## From dashboards to dialogue

Conversational analytics lets stakeholders ask follow-up questions without filing tickets or learning SQL. That shortens the loop from question to action, especially during live campaigns.

## Guardrails still matter

AI is most useful when it is grounded in trusted sources: your warehouse, your ad platforms, and clear definitions of KPIs. Invest in data quality and governance alongside the interface.

## What to try first

Pick one high-frequency workflow — weekly performance reviews or budget pacing — and prototype questions your team already asks in Slack. If the answers are repeatable and trusted, expand from there.`;

const roas = `Return on ad spend is a lagging indicator; the levers that move it are audience, creative, bidding, and data freshness.

## Ask better questions

Instead of exporting another pivot table, try natural-language queries that compare segments, time periods, and channels in one thread. Patterns surface faster when you are not fighting the tool.

## Align on definitions

ROAS means different things to different teams. Lock revenue attribution, click vs. view windows, and currency handling before you optimize — otherwise you are tuning noise.

## Test with discipline

Use conversational insights to generate hypotheses, then validate with controlled experiments. AI accelerates exploration; structured tests prove what actually worked.`;

const reporting = `Agencies live in slides and spreadsheets. Automating reporting is not about removing the strategist — it is about removing copy-paste.

## Standardize the narrative

Build a template for “what changed, why it matters, what we recommend.” Automation fills numbers and charts; humans still interpret and prioritize.

## Schedule for the client’s rhythm

Weekly tactical digests and monthly executive summaries serve different audiences. Match depth and cadence to how decisions are made on the client side.

## Quality checks

Automated drafts should always pass a human review for tone, context, and outliers. The goal is faster drafts, not unreviewed sends.`;

const ga4Sql = `GA4’s exploration tools are powerful, but many marketers still export to Sheets because the UI does not match how they think.

## Bridge the vocabulary gap

Translate business questions (“Which landing pages underperform for paid social?”) into the dimensions and metrics GA4 already tracks. A conversational layer can do that mapping for you.

## Sampling and thresholds

Know when GA4 is approximating. For high-stakes decisions, validate against BigQuery exports or your warehouse pipeline.

## Grow skills gradually

You do not need to become a data engineer overnight. Start with saved questions that work, then expand as confidence builds.`;

const bigquery = `BigQuery is not just storage — it is the place where marketing, product, and finance can agree on one set of numbers.

## Model once, reuse everywhere

Define customers, sessions, and conversions in SQL (or dbt) and expose curated views to BI tools and AI interfaces alike. Duplicated logic across tools is where drift begins.

## Cost and performance

Partition tables, cluster on common join keys, and monitor slot usage. A well-modeled warehouse is cheaper to query and safer to automate.

## Connect the last mile

The best model in BigQuery still needs a friendly path to questions. Pair warehouse discipline with tools that let non-SQL roles explore safely.`;

export const STATIC_BLOG_POSTS: StaticBlogPost[] = [
  {
    slug: "how-to-build-a-thriving-remote-team-culture",
    title: "How to Build a Thriving Remote Team Culture",
    category: "Collaboration",
    readTime: "5 min read",
    dateLabel: "Sep 2, 2025",
    datePublished: "2025-09-02T12:00:00.000Z",
    excerpt:
      "Explore new approaches for optimizing productivity while working remotely. Building a strong culture in a remote work environment may seem challenging, but it's far from impossible.",
    description:
      "Practical ideas for clarity, rituals, and measurement when building remote team culture.",
    bodyMarkdown: remoteCulture,
  },
  {
    slug: "ai-powered-analytics-future-of-marketing",
    title: "AI-Powered Analytics: The Future of Marketing Intelligence",
    category: "Analytics",
    readTime: "7 min read",
    dateLabel: "Jul 28, 2025",
    datePublished: "2025-07-28T12:00:00.000Z",
    excerpt:
      "Discover the latest tools and practices shaping the way Gen-Z teams work with data and make decisions faster than ever before.",
    description:
      "How conversational analytics and governance work together for marketing teams.",
    bodyMarkdown: aiAnalytics,
  },
  {
    slug: "maximizing-roas-with-conversational-ai",
    title: "Maximizing ROAS with Conversational AI Analytics",
    category: "Google Ads",
    readTime: "6 min read",
    dateLabel: "Jul 28, 2025",
    datePublished: "2025-07-28T12:00:00.000Z",
    excerpt:
      "Learn how marketing teams are using natural language queries to uncover hidden optimization opportunities in their Google Ads campaigns.",
    description:
      "Improve ROAS with better questions, shared definitions, and disciplined testing.",
    bodyMarkdown: roas,
  },
  {
    slug: "automated-client-reporting-agencies",
    title: "Automated Client Reporting: A Game Changer for Agencies",
    category: "Reporting",
    readTime: "8 min read",
    dateLabel: "Jul 28, 2025",
    datePublished: "2025-07-28T12:00:00.000Z",
    excerpt:
      "Explore new approaches for optimizing productivity while working remotely with AI-generated insights and automated delivery.",
    description:
      "Templates, scheduling, and review practices for automated agency reporting.",
    bodyMarkdown: reporting,
  },
  {
    slug: "ga4-insights-without-sql",
    title: "Getting Deep GA4 Insights Without Writing a Single Line of SQL",
    category: "GA4",
    readTime: "4 min read",
    dateLabel: "Jul 28, 2025",
    datePublished: "2025-07-28T12:00:00.000Z",
    excerpt:
      "How to Build a Thriving Remote Team Culture with conversational analytics that transforms complex queries into simple conversations.",
    description:
      "Access GA4 insights without SQL: vocabulary, sampling awareness, and skill growth.",
    bodyMarkdown: ga4Sql,
  },
  {
    slug: "bigquery-unified-marketing-data",
    title: "Why BigQuery is the Foundation of Modern Marketing Analytics",
    category: "Data Engineering",
    readTime: "9 min read",
    dateLabel: "Jul 28, 2025",
    datePublished: "2025-07-28T12:00:00.000Z",
    excerpt:
      "Explore new approaches for optimizing productivity while working remotely with BigQuery as your central data warehouse.",
    description:
      "Modeling, cost control, and connecting BigQuery to everyday marketing questions.",
    bodyMarkdown: bigquery,
  },
];

export function getBlogPostBySlug(slug: string): StaticBlogPost | undefined {
  const normalized = slug.replace(/^\/+|\/+$/g, "");
  return STATIC_BLOG_POSTS.find((p) => p.slug === normalized);
}

export function getAllBlogSlugs(): string[] {
  return STATIC_BLOG_POSTS.map((p) => p.slug);
}

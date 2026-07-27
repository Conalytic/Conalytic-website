/**
 * FAQ copy for marketing pages — visible accordions + FAQPage JSON-LD.
 * Aligned with Conalytic-Chat (Chats, KPIs, Reports).
 */
import type { ProductId } from "@/lib/products";

export type MarketingFaqItem = { question: string; answer: string };

export const CONVERSATIONAL_ANALYTICS_FAQ: MarketingFaqItem[] = [
  {
    question: "What is Conversational Analytics in Conalytic?",
    answer:
      "Conversational Analytics (Chats) lets marketing teams ask questions in plain English and get answers from live GA4, Google Search Console, Google Ads, Google Tag Manager, and Meta Ads data. Each chat is scoped to the OAuth connection and property or account you choose, with inline charts, tables, and KPI rows—no SQL or dashboard building required.",
  },
  {
    question: "Which integrations work with Conalytic Chats?",
    answer:
      "Live conversational analytics supports Google Analytics 4, Google Search Console, Google Ads, and Google Tag Manager. Meta Ads (Facebook & Instagram) and LinkedIn Ads are coming soon. General marketing chat works without a linked data source. KPI Tracker and Report Builder use overlapping but different integration sets.",
  },
  {
    question: "What AI models does Conalytic Conversational Analytics use?",
    answer:
      "You can choose GPT-5.4, Claude Opus 4.8, or Gemini 3.1 Pro per conversation. Conalytic retrieves live marketing metrics via platform APIs and streams natural-language answers with conalytic-viz charts and tables embedded in the thread.",
  },
  {
    question: "How does billing work for Conalytic chat?",
    answer:
      "Conalytic Pro is free to start. Conversational Analytics uses usage-based pricing for AI-powered chat. KPIs Tracker goal monitoring is included without per-query AI charges. See pricing in the app after signup.",
  },
  {
    question: "Can I upload context files to a Conalytic chat?",
    answer:
      "Yes. Each chat supports an optional context file—for example brand definitions, conversion rules, or internal KPI notes—that applies only to that conversation while you ask GA4, Google Ads, Search Console, GTM, or Meta questions.",
  },
  {
    question: "How is Conversational Analytics different from Looker or GA4 dashboards?",
    answer:
      "Instead of building reports or writing SQL, you ask follow-up questions in natural language. Conalytic calls live APIs for the scoped property or account, explains metrics in context, and renders visualizations inline so marketers get answers in seconds—not after hours of dashboard drilling.",
  },
];

export const KPIS_TRACKER_FAQ: MarketingFaqItem[] = [
  {
    question: "What is Conalytic KPIs Tracker?",
    answer:
      "KPIs Tracker is Conalytic's marketing goal monitoring tool for Google Analytics 4, Google Search Console, and Google Ads. Create KPI projects, set increase or decrease targets with percentage thresholds, and see On track, At risk, Off track, or No data status—with six months of historical snapshots.",
  },
  {
    question: "Which metrics can I track in Conalytic KPI projects?",
    answer:
      "GA4: sessions, conversions, users, bounce rate. Search Console: organic clicks, impressions, CTR, keyword rankings. Google Ads: ad spend, paid clicks, CPC, ads conversions. Evaluation is rules-based and deterministic—not AI-generated scores.",
  },
  {
    question: "Does KPIs Tracker support keyword ranking goals?",
    answer:
      "Yes. When Google Search Console is connected, you can track up to 300 keywords per project and set goals such as all keywords in the top 10. Paste keywords from a spreadsheet and monitor ranking achievement alongside traffic and ads KPIs.",
  },
  {
    question: "What is the difference between monthly and year-to-date KPI views?",
    answer:
      "Monthly projects compare month-on-month performance against your targets. Year-to-date projects compare the current period to the same period last year. Both views update on a schedule, with history panels showing achieved, partial, missed, or no-data months.",
  },
  {
    question: "Is KPIs Tracker included in Conalytic Pro?",
    answer:
      "Yes. Connect GA4, GSC, and Google Ads via OAuth and start tracking marketing KPI goals from one dashboard. Goal evaluation uses live platform data with rules-based scoring—not AI-generated status labels.",
  },
  {
    question: "How often does Conalytic refresh KPI data?",
    answer:
      "New projects backfill six months of history on creation. Scheduled evaluation runs on the first of each month so your marketing KPI dashboard stays current without manual exports from GA4, Search Console, or Google Ads.",
  },
];

export const REPORT_BUILDER_FAQ: MarketingFaqItem[] = [
  {
    question: "What is Conalytic Report Builder?",
    answer:
      "Report Builder (Reports in the app) generates premium HTML presentation decks from connected GA4, Google Search Console, Google Ads, and Google Tag Manager data. Output includes executive summary slides, per-platform sections, cross-source findings, methodology notes, a prioritized action plan, and optional AI-written narratives.",
  },
  {
    question: "What date ranges and comparisons does Report Builder support?",
    answer:
      "Choose presets such as last 7, 28, 30, or 90 days, last month, or a custom range up to 366 days. Compare against the previous period, previous period same year, previous year, or no comparison—ideal for client reporting and agency marketing decks.",
  },
  {
    question: "Which platforms are active in Conalytic HTML reports?",
    answer:
      "GA4, Google Search Console, Google Ads, and Google Tag Manager are fully supported with per-platform focus options—traffic, queries, campaigns, GTM audits, and more. Meta and LinkedIn appear in the UI but are not active report sources yet.",
  },
  {
    question: "Can I turn off AI insights in marketing reports?",
    answer:
      "Yes. Toggle AI insights off for a data-only deck, or enable them to personalize slide copy, findings, and recommendations using GPT-5.4, Claude Opus 4.8, or Gemini 3.1 Pro.",
  },
  {
    question: "How do I share Conalytic reports with clients?",
    answer:
      "View the HTML presentation deck inside Conalytic or download the HTML file for email and stakeholder delivery. Regenerate with the same settings when your connected GA4, GSC, Google Ads, or GTM data refreshes.",
  },
  {
    question: "What slides are included in a Conalytic marketing report deck?",
    answer:
      "Typical decks include cover, table of contents, executive summary, health check, KPI snapshot, platform-specific charts and tables, cross-source findings, recommendations, prioritized action plan, methodology, and thank-you slides—built for agency client reporting and in-house marketing reviews.",
  },
];

export const FEATURES_PAGE_FAQ: MarketingFaqItem[] = [
  {
    question: "What features are included in the Conalytic marketing analytics platform?",
    answer:
      "Conalytic bundles Conversational Analytics (natural-language chat over live data), KPIs Tracker (GA4, GSC, and Google Ads goal monitoring), and Report Builder (multi-platform HTML presentation decks). All three share OAuth connections for Google Analytics 4, Search Console, Google Ads, Google Tag Manager, Meta Ads, and LinkedIn Ads.",
  },
  {
    question: "Do I need SQL to use Conalytic features?",
    answer:
      "No. Conversational Analytics answers marketing questions in plain English. KPIs Tracker uses rules-based goal scoring without LLM calls. Report Builder assembles client-ready HTML decks from connected APIs—you focus on insights, not query languages or slide formatting.",
  },
  {
    question: "Which Conalytic features use AI?",
    answer:
      "Conversational Analytics uses AI to answer questions about your connected marketing data. Report Builder can optionally add AI-written slide narratives. KPIs Tracker uses rules-based scoring without AI for goal status labels.",
  },
  {
    question: "Can agencies use Conalytic for client reporting?",
    answer:
      "Yes. Report Builder produces downloadable HTML marketing presentations with executive summaries and action plans. Conversational Analytics helps account teams investigate GA4, Google Ads, and Meta performance in chat. KPIs Tracker gives clients transparent on-track vs at-risk goal status.",
  },
  {
    question: "How do Conalytic OAuth integrations work?",
    answer:
      "Connect read-only OAuth on the Connections page for GA4, Search Console, Google Ads, GTM, Meta, and LinkedIn. Each product scopes data to the properties, sites, accounts, or containers you authorize—your team stays in control of marketing data access.",
  },
  {
    question: "Is there a free way to try Conalytic features?",
    answer:
      "Sign up free at chat.conalytic.com/signup and explore Conversational Analytics, KPIs Tracker, and Report Builder with your connected marketing accounts.",
  },
];

export const INTEGRATIONS_PAGE_FAQ: MarketingFaqItem[] = [
  {
    question: "Which marketing platforms does Conalytic integrate with?",
    answer:
      "Conalytic connects via OAuth to Google Analytics 4, Google Search Console, Google Ads, Google Tag Manager, Meta Ads, and LinkedIn Ads. Conversational Analytics queries live data on GA4, GSC, Google Ads, GTM, and Meta; KPIs Tracker uses GA4, GSC, and Google Ads; Report Builder uses GA4, GSC, Google Ads, and GTM.",
  },
  {
    question: "Are Conalytic integrations read-only?",
    answer:
      "Yes. Connections use read-only OAuth scopes where applicable so Conalytic can analyze your marketing data without modifying campaigns, tags, or analytics configuration. You authorize only the accounts your team needs for chat, KPI tracking, and HTML reports.",
  },
  {
    question: "Does Conalytic support Meta Ads conversational analytics?",
    answer:
      "Yes. Meta Ads is supported in Conversational Analytics for account, campaign, ad set, and ad insights. Report Builder lists Meta as a future source; KPI Tracker focuses on GA4, Search Console, and Google Ads goal metrics.",
  },
  {
    question: "Can I connect Google Tag Manager to Conalytic?",
    answer:
      "Yes. GTM connects for Conversational Analytics container audits (tags, triggers, variables, consent, security) and for Report Builder decks with GTM overview, security, and consent focus options.",
  },
  {
    question: "How do I connect GA4 and Google Ads to Conalytic?",
    answer:
      "Open Connections in the Conalytic app, choose Google Analytics 4 or Google Ads, complete OAuth, and select the property or account. Use the same connections across Chats, KPI projects, and HTML marketing reports.",
  },
];

export function getProductFaq(productId: ProductId): MarketingFaqItem[] {
  switch (productId) {
    case "conversational-analytics":
      return CONVERSATIONAL_ANALYTICS_FAQ;
    case "kpis-tracker":
      return KPIS_TRACKER_FAQ;
    case "report-builder":
      return REPORT_BUILDER_FAQ;
  }
}

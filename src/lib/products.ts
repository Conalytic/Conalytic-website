/**
 * Canonical marketing definitions for Conalytic's three in-app products.
 * Source of truth aligned with Conalytic-Chat (Chats, KPIs, Reports).
 */
import { CHAT_APP_SIGNUP_URL } from "@/lib/app-urls";

export type ProductId = "conversational-analytics" | "kpis-tracker" | "report-builder";

export type ProductDefinition = {
  id: ProductId;
  name: string;
  shortName: string;
  appNavLabel: string;
  path: `/products/${string}`;
  tagline: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  integrations: string[];
  features: string[];
  workflow: string[];
  billingNote?: string;
  signupUrl: string;
  /** SEO h1 line 1 (before gradient span) */
  heroTitleLine1: string;
  /** SEO h1 gradient emphasis */
  heroTitleLine2: string;
};

export const CONALYTIC_PRODUCTS: Record<ProductId, ProductDefinition> = {
  "conversational-analytics": {
    id: "conversational-analytics",
    name: "Conversational Analytics",
    shortName: "Chats",
    appNavLabel: "Chats",
    path: "/products/conversational-analytics",
    tagline: "Marketing data chatbot — ask GA4, Google Ads, GSC, GTM & Meta in plain English.",
    description:
      "Conalytic Conversational Analytics turns natural language into live marketing insights. Connect Google Analytics 4, Google Search Console, Google Ads, Google Tag Manager, or Meta Ads via OAuth, scope each chat to a property or account, and get AI answers with inline charts, tables, and KPI rows—no SQL, no dashboard drilling, no Looker required.",
    metaTitle: "Conversational Analytics — GA4 & Google Ads AI Chat",
    metaDescription:
      "Conalytic Conversational Analytics delivers natural-language marketing insights, inline visualizations, and GPT-5.4 / Claude / Gemini models. Free to start on Conalytic Pro.",
    keywords: [
      "conversational analytics",
      "natural language analytics",
      "GA4 chat",
      "Google Analytics 4 AI",
      "Google Ads AI analysis",
      "marketing data chatbot",
      "no SQL analytics",
      "Meta Ads analytics chat",
      "Google Tag Manager audit",
      "Search Console chat",
      "marketing intelligence AI",
      "conversational BI",
    ],
    integrations: [
      "Google Analytics 4",
      "Google Search Console",
      "Google Ads",
      "Google Tag Manager",
      "Meta Ads",
      "LinkedIn Ads (connect)",
    ],
    features: [
      "Plain-English marketing questions over live GA4, GSC, Google Ads, GTM, and Meta data",
      "Scoped chats: one OAuth connection and property, site, account, or container per thread",
      "GPT-5.4, Claude Opus 4.8, or Gemini 3.1 Pro model selection",
      "Inline charts, tables, and KPI rows via conalytic-viz in every answer",
      "Optional per-chat context file uploads for brand rules and KPI definitions",
      "Composer Improve and Make longer; pinned chat history and general marketing chat",
      "GTM container audits: tags, triggers, variables, consent, and security checks",
    ],
    workflow: [
      "Connect GA4, Search Console, Google Ads, GTM, or Meta on the Connections page",
      "Start a new chat — choose platform, sign-in, and property or account",
      "Ask marketing analytics questions; Conalytic streams live API answers with viz",
      "Attach context files, refine prompts, and follow up in the same conversation",
    ],
    billingNote: "Free to start. Usage-based pricing for AI-powered chat on Pro plans.",
    signupUrl: CHAT_APP_SIGNUP_URL,
    heroTitleLine1: "Conversational Analytics for",
    heroTitleLine2: "GA4, Google Ads & Meta",
  },
  "kpis-tracker": {
    id: "kpis-tracker",
    name: "KPIs Tracker",
    shortName: "KPI Tracker",
    appNavLabel: "KPIs",
    path: "/products/kpis-tracker",
    tagline: "Marketing KPI dashboard — track GA4, Search Console & Google Ads goals.",
    description:
      "Conalytic KPIs Tracker is a marketing goal tracking dashboard for Google Analytics 4, Google Search Console, and Google Ads. Create KPI projects, set increase or decrease targets with percentage thresholds, monitor On track, At risk, Off track, and No data labels, review six months of history, and track up to 300 GSC keyword rankings—rules-based scoring without AI guesswork.",
    metaTitle: "KPI Tracker — GA4, Search Console & Google Ads Goals",
    metaDescription:
      "Marketing KPI tracker for GA4, Google Search Console, and Google Ads. Set goal targets, see on-track vs at-risk status, keyword ranking goals, monthly and YTD views, and six months of KPI history on Conalytic.",
    keywords: [
      "KPI tracker",
      "marketing goal tracking",
      "GA4 KPI dashboard",
      "Google Analytics 4 goals",
      "Search Console KPI monitoring",
      "Google Ads KPI dashboard",
      "marketing performance goals",
      "keyword ranking tracker",
      "SEO KPI dashboard",
      "paid media KPI tracking",
      "marketing OKR tracker",
    ],
    integrations: ["Google Analytics 4", "Google Search Console", "Google Ads"],
    features: [
      "Multi-platform KPI projects with monthly or year-to-date (YTD) views",
      "GA4 metrics: sessions, conversions, users, bounce rate goal tracking",
      "GSC metrics: clicks, impressions, CTR, and up to 300 keyword ranking goals",
      "Google Ads metrics: spend, clicks, CPC, and conversion KPI monitoring",
      "Status labels: On track, At risk, Off track, No data — rules-based, not AI",
      "Six-month historical backfill and scheduled monthly evaluation",
      "Suggested goals and project settings wizard for fast setup",
    ],
    workflow: [
      "Create a KPI project and choose monthly or yearly tracking period",
      "Connect GA4, GSC, and/or Google Ads entities per project",
      "Set goal direction, target %, and enable metrics or keyword rankings",
      "Open the dashboard for status pills, sparklines, and history snapshots",
    ],
    signupUrl: CHAT_APP_SIGNUP_URL,
    heroTitleLine1: "Marketing KPI Tracker for",
    heroTitleLine2: "GA4, GSC & Google Ads",
  },
  "report-builder": {
    id: "report-builder",
    name: "Report Builder",
    shortName: "Reports",
    appNavLabel: "Reports",
    path: "/products/report-builder",
    tagline: "AI marketing report builder — HTML client decks from live data.",
    description:
      "Conalytic Report Builder generates premium HTML presentation decks from Google Analytics 4, Google Search Console, Google Ads, and Google Tag Manager. Pick date ranges and period comparisons, choose per-platform focus (traffic, queries, campaigns, GTM audits), toggle optional AI slide narratives, and deliver executive summaries, cross-source findings, methodology slides, and prioritized action plans—view in-app or download HTML for agency client reporting.",
    metaTitle: "AI Marketing Report Builder — HTML Presentation Decks",
    metaDescription:
      "Automated marketing report builder for GA4, GSC, Google Ads, and GTM. Generate HTML client presentation decks with executive summary, platform sections, AI insights, comparisons, and downloadable HTML on Conalytic.",
    keywords: [
      "marketing report builder",
      "GA4 report automation",
      "client reporting deck",
      "HTML marketing presentation",
      "AI marketing reports",
      "agency reporting tool",
      "Google Ads report automation",
      "Search Console reporting",
      "automated client reports",
      "marketing deck generator",
      "GTM audit report",
    ],
    integrations: [
      "Google Analytics 4",
      "Google Search Console",
      "Google Ads",
      "Google Tag Manager",
    ],
    features: [
      "Multi-platform HTML presentation decks — view in-app or download",
      "GA4 focus: traffic, channels, pages, conversions, devices",
      "GSC focus: queries, pages, page+query, device performance",
      "Google Ads focus: trend, campaigns, devices",
      "GTM focus: full audit, overview, security, consent slides",
      "Date presets, custom ranges up to 366 days, and period comparisons",
      "Optional AI insights (GPT-5.4, Claude, Gemini) for slide copy and recommendations",
      "Regenerate reports with frozen settings when data refreshes",
    ],
    workflow: [
      "Open Reports — set title, client name, date range, and comparison period",
      "Configure GA4, GSC, Google Ads, and/or GTM sources with per-platform focus",
      "Toggle AI insights and generate the HTML marketing presentation deck",
      "View, download HTML, or regenerate for updated GA4, GSC, Ads, or GTM data",
    ],
    billingNote: "Optional AI insights available on Pro plans.",
    signupUrl: CHAT_APP_SIGNUP_URL,
    heroTitleLine1: "AI Marketing Report Builder for",
    heroTitleLine2: "GA4, GSC, Ads & GTM",
  },
};

export const PRODUCT_LIST = Object.values(CONALYTIC_PRODUCTS);

export function getProduct(id: ProductId): ProductDefinition {
  return CONALYTIC_PRODUCTS[id];
}

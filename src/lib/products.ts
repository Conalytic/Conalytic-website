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
};

export const CONALYTIC_PRODUCTS: Record<ProductId, ProductDefinition> = {
  "conversational-analytics": {
    id: "conversational-analytics",
    name: "Conversational Analytics",
    shortName: "Chats",
    appNavLabel: "Chats",
    path: "/products/conversational-analytics",
    tagline: "Ask your marketing data questions in plain English.",
    description:
      "Connect GA4, Google Search Console, Google Ads, Google Tag Manager, or Meta Ads and chat with your live data. Each conversation is scoped to the accounts you authorize, with inline charts, tables, and AI answers—no SQL or dashboard drilling.",
    metaTitle: "Conversational Analytics for Marketing Teams",
    metaDescription:
      "Chat with GA4, Search Console, Google Ads, GTM, and Meta Ads data in plain English. Scoped OAuth connections, inline visualizations, and token-based Pro usage on Conalytic.",
    keywords: [
      "conversational analytics",
      "natural language analytics",
      "GA4 chat",
      "Google Ads AI analysis",
      "marketing data chatbot",
      "no SQL analytics",
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
      "Plain-English questions over live connected marketing data",
      "Per-chat scope: one platform connection and property/account",
      "Agentic API tools with inline charts and tables (conalytic-viz)",
      "Optional per-chat context file uploads",
      "Model selection and prompt refinement in the composer",
      "Pinned chat history and general marketing chat without a data source",
    ],
    workflow: [
      "Connect accounts via OAuth on the Connections page",
      "Start a new chat and choose a platform, connection, and entity",
      "Ask questions; Conalytic retrieves live metrics and streams answers",
      "Review visualizations and follow up in the same thread",
    ],
    billingNote: "Pro plans meter chat usage by tokens (prompt + completion) with signup credit and PayPal top-ups.",
    signupUrl: CHAT_APP_SIGNUP_URL,
  },
  "kpis-tracker": {
    id: "kpis-tracker",
    name: "KPIs Tracker",
    shortName: "KPI Tracker",
    appNavLabel: "KPIs",
    path: "/products/kpis-tracker",
    tagline: "Track marketing goals with on-track, at-risk, and off-track status.",
    description:
      "Create KPI projects across GA4, Google Search Console, and Google Ads. Set direction and target percentages, monitor month or year-to-date performance, review six months of history, and optionally track GSC keyword rankings.",
    metaTitle: "KPI Tracker for GA4, Search Console & Google Ads",
    metaDescription:
      "Set marketing KPI goals, see on-track vs at-risk status, and review six months of GA4, Search Console, and Google Ads history. Rules-based scoring—no LLM required.",
    keywords: [
      "KPI tracker",
      "marketing goal tracking",
      "GA4 KPI dashboard",
      "Search Console goals",
      "Google Ads KPI monitoring",
      "marketing performance goals",
    ],
    integrations: ["Google Analytics 4", "Google Search Console", "Google Ads"],
    features: [
      "Multi-platform KPI projects with monthly or year-to-date views",
      "Goal targets with increase/decrease direction and % thresholds",
      "Status labels: On track, At risk, Off track, No data",
      "Six-month historical snapshots and month-on-month achievement",
      "GSC keyword ranking tracking when Search Console is connected",
      "Deterministic rules-based evaluation (not AI-generated scores)",
    ],
    workflow: [
      "Create a new KPI project and name your reporting period",
      "Connect GA4, GSC, and/or Google Ads sources per project",
      "Select metrics and set goal targets",
      "Open the dashboard to monitor status and history",
    ],
    signupUrl: CHAT_APP_SIGNUP_URL,
  },
  "report-builder": {
    id: "report-builder",
    name: "Report Builder",
    shortName: "Reports",
    appNavLabel: "Reports",
    path: "/products/report-builder",
    tagline: "Premium HTML presentation decks from connected marketing data.",
    description:
      "Generate stakeholder-ready HTML reports from GA4, Search Console, Google Ads, and Google Tag Manager. Choose date ranges and comparisons, optional AI slide narratives, cross-source findings, methodology notes, and a prioritized action plan.",
    metaTitle: "AI Marketing Report Builder — HTML Decks",
    metaDescription:
      "Build multi-platform marketing report decks from GA4, GSC, Google Ads, and GTM. Executive summary, platform sections, cross-source insights, optional AI copy, and downloadable HTML.",
    keywords: [
      "marketing report builder",
      "GA4 report automation",
      "client reporting deck",
      "HTML marketing presentation",
      "AI marketing reports",
      "agency reporting tool",
    ],
    integrations: [
      "Google Analytics 4",
      "Google Search Console",
      "Google Ads",
      "Google Tag Manager",
    ],
    features: [
      "Multi-platform HTML presentation decks (view in-app or download)",
      "Per-platform focus options (traffic, campaigns, queries, GTM audits, etc.)",
      "Date presets, custom ranges, and period-over-period comparisons",
      "Rule-based cross-source detectors plus optional AI insights toggle",
      "Executive summary, methodology, and prioritized action plan slides",
      "Regenerate reports with frozen settings",
    ],
    workflow: [
      "Open Reports and start a new report with title and client name",
      "Pick date range, comparison period, and connected data sources",
      "Toggle AI insights and generate the deck",
      "View, download HTML, or regenerate when data refreshes",
    ],
    billingNote: "Report generation uses token-metered AI when insights are enabled (Pro).",
    signupUrl: CHAT_APP_SIGNUP_URL,
  },
};

export const PRODUCT_LIST = Object.values(CONALYTIC_PRODUCTS);

export function getProduct(id: ProductId): ProductDefinition {
  return CONALYTIC_PRODUCTS[id];
}

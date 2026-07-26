/**
 * Rich product-page section copy — aligned with Conalytic-Chat (Chats, KPIs, Reports).
 */
import type { ProductId } from "@/lib/products";

export type ProductStep = {
  step: string;
  title: string;
  description: string;
};

export type ProductStat = { value: string; label: string };

export type ProductCapability = {
  title: string;
  description: string;
  tag?: string;
};

export type ProductPageContent = {
  heroImage: string;
  heroImageAlt: string;
  howItWorks: ProductStep[];
  stats: ProductStat[];
  capabilities: ProductCapability[];
  capabilityTitle: string;
  capabilitySubtitle: string;
  deepDiveTitle: string;
  deepDiveSubtitle: string;
  deepDiveBullets: string[];
};

export const PRODUCT_PAGE_CONTENT: Record<ProductId, ProductPageContent> = {
  "conversational-analytics": {
    heroImage: "/products/conversational-analytics-hero.png",
    heroImageAlt:
      "Conversational Analytics interface showing natural language questions over GA4, Google Ads, and Meta data with inline charts",
    howItWorks: [
      {
        step: "01",
        title: "Connect OAuth sources",
        description:
          "Link GA4, Search Console, Google Ads, GTM, Meta, or LinkedIn on Connections — read-only OAuth, you stay in control.",
      },
      {
        step: "02",
        title: "Scope each chat",
        description:
          "Pick platform, connection, and property, site, account, or container. Every thread stays scoped to one entity.",
      },
      {
        step: "03",
        title: "Ask in plain English",
        description:
          "Stream live answers from platform APIs. Choose GPT-5.4, Claude Opus 4.8, or Gemini 3.1 Pro per conversation.",
      },
      {
        step: "04",
        title: "Get inline viz",
        description:
          "Charts, tables, and KPI rows render via conalytic-viz — no SQL, no Looker workbook, no export to Sheets.",
      },
    ],
    stats: [
      { value: "5", label: "Live data platforms" },
      { value: "3", label: "AI models" },
      { value: "<3s", label: "Typical response" },
      { value: "0", label: "SQL required" },
    ],
    capabilityTitle: "Built for marketing teams who hate dashboards",
    capabilitySubtitle:
      "Every capability maps to real Conalytic Chats behavior — scoped OAuth, live API calls, and agentic tool use.",
    capabilities: [
      {
        tag: "GTM",
        title: "Full container audits",
        description:
          "Audit tags, triggers, variables, consent mode, and security posture in a single conversational thread.",
      },
      {
        tag: "Context",
        title: "Per-chat context files",
        description:
          "Upload brand rules, conversion definitions, or KPI notes that apply only to the current conversation.",
      },
      {
        tag: "Composer",
        title: "Improve & Make longer",
        description:
          "Refine prompts before sending. Composer actions are token-metered separately from standard chat messages.",
      },
      {
        tag: "History",
        title: "Pinned chat history",
        description:
          "Return to scoped threads anytime. General marketing chat works without a linked data source.",
      },
      {
        tag: "Meta",
        title: "Meta Ads insights",
        description:
          "Account, campaign, ad set, and ad-level performance — daily or aggregated — in natural language.",
      },
      {
        tag: "Viz",
        title: "conalytic-viz layer",
        description:
          "Inline bar charts, tables, and KPI rows embedded in every data-backed answer stream.",
      },
    ],
    deepDiveTitle: "From question to chart in one thread",
    deepDiveSubtitle:
      "Stop opening three tabs for GA4, Search Console, and Google Ads. Conalytic Chats calls live APIs and explains results in context.",
    deepDiveBullets: [
      "Scoped conversations prevent data bleeding across clients or brands",
      "GTM security and consent checks without exporting container JSON",
      "Follow-up questions refine the same thread — no re-scoping",
      "Token-based Pro billing with signup credit and PayPal top-ups",
    ],
  },
  "kpis-tracker": {
    heroImage: "/products/kpis-tracker-hero.png",
    heroImageAlt:
      "KPIs Tracker dashboard showing On track, At risk, and Off track status pills for GA4, GSC, and Google Ads goals",
    howItWorks: [
      {
        step: "01",
        title: "Create a KPI project",
        description:
          "Name your project and choose Monthly or Yearly tracking. One entity per platform — GA4 property, GSC site, Ads account.",
      },
      {
        step: "02",
        title: "Connect data sources",
        description:
          "OAuth link GA4, Search Console, and/or Google Ads. The wizard suggests recommended goals per platform.",
      },
      {
        step: "03",
        title: "Set goal thresholds",
        description:
          "Pick metrics, set increase or decrease direction, and target %. Enable up to 300 GSC keyword ranking goals.",
      },
      {
        step: "04",
        title: "Monitor status pills",
        description:
          "See On track, At risk, Off track, or No data — rules-based scoring, not AI. Six months of history on day one.",
      },
    ],
    stats: [
      { value: "6mo", label: "History backfill" },
      { value: "300", label: "GSC keywords" },
      { value: "4", label: "Status labels" },
      { value: "0", label: "LLM tokens used" },
    ],
    capabilityTitle: "Rules-based goal monitoring — no AI guesswork",
    capabilitySubtitle:
      "KPIs Tracker uses deterministic scoring. The same inputs always produce the same status label.",
    capabilities: [
      {
        tag: "GA4",
        title: "Sessions & conversions",
        description: "Track sessions, conversions, users, and bounce rate with MoM or YTD comparison windows.",
      },
      {
        tag: "GSC",
        title: "Organic performance",
        description: "Monitor clicks, impressions, CTR, and keyword ranking goals across up to 300 queries.",
      },
      {
        tag: "Ads",
        title: "Paid media KPIs",
        description: "Ad spend, paid clicks, CPC, and ads conversions — scoped to the account you authorize.",
      },
      {
        tag: "MoM",
        title: "Monthly projects",
        description: "Month-on-month views for standups and client WBRs with monthly snapshot history.",
      },
      {
        tag: "YTD",
        title: "Year-to-date projects",
        description: "Compare current year-to-date against the same period last year for board reviews.",
      },
      {
        tag: "Schedule",
        title: "Monthly evaluation",
        description: "Scheduled evaluation on the 1st of each month keeps dashboards current without manual exports.",
      },
    ],
    deepDiveTitle: "One dashboard for every client or brand",
    deepDiveSubtitle:
      "Agencies run one KPI project per client. In-house teams split by channel owner or executive rollup.",
    deepDiveBullets: [
      "On track / At risk / Off track / No data — fixed semantics across all projects",
      "Sparklines and % change on every goal card with summary counts at the top",
      "Refresh (superadmin) forces a re-pull when you need live numbers mid-month",
      "Not token-metered — KPI evaluation uses API calls, not LLM credits",
    ],
  },
  "report-builder": {
    heroImage: "/products/report-builder-hero.png",
    heroImageAlt:
      "Report Builder HTML presentation deck with executive summary, GA4 charts, and Google Ads campaign slides",
    howItWorks: [
      {
        step: "01",
        title: "Configure the report",
        description:
          "Set title, client name, date range (7–366 days), comparison period, and optional scoped notes for AI emphasis.",
      },
      {
        step: "02",
        title: "Pick platform focus",
        description:
          "GA4 traffic/channels/pages, GSC queries/pages, Ads campaigns/devices, or GTM audit/security/consent lenses.",
      },
      {
        step: "03",
        title: "Generate HTML deck",
        description:
          "Rule-based cross-source detectors plus optional AI insights (GPT-5.4, Claude, Gemini) for narratives.",
      },
      {
        step: "04",
        title: "View or download",
        description:
          "Open the in-app HTML viewer or download for clients. Regenerate with frozen settings when data refreshes.",
      },
    ],
    stats: [
      { value: "12+", label: "Deck slide types" },
      { value: "366", label: "Max day range" },
      { value: "4", label: "Active platforms" },
      { value: "HTML", label: "Output format" },
    ],
    capabilityTitle: "Premium HTML decks — not another PDF export",
    capabilitySubtitle:
      "Structured narrative flow from cover to action plan, built from live GA4, GSC, Google Ads, and GTM data.",
    capabilities: [
      {
        tag: "Cover",
        title: "Branded cover slide",
        description: "Client name, report title, and date range label on a professional opening slide.",
      },
      {
        tag: "Exec",
        title: "Executive summary",
        description: "Leadership skimmers get the headline story before platform deep dives.",
      },
      {
        tag: "Cross",
        title: "Cross-source findings",
        description: "Rule-based detectors connect organic, paid, and site behavior without LLM cost.",
      },
      {
        tag: "Method",
        title: "Methodology slide",
        description: "Documents reporting window, properties in scope, and organic gap notes for client trust.",
      },
      {
        tag: "AI",
        title: "Optional AI narratives",
        description: "Toggle AI insights for personalized slide copy, findings, and recommendations.",
      },
      {
        tag: "Plan",
        title: "Prioritized action plan",
        description: "Closing slides with next steps stakeholders can act on this week.",
      },
    ],
    deepDiveTitle: "Agency-ready client deliverables in minutes",
    deepDiveSubtitle:
      "Replace copy-paste from GA4, GSC, and Ads into slides. Report Builder assembles the deck structure for you.",
    deepDiveBullets: [
      "Date presets: last 7/28/30 days, last month, last 90 days, or custom up to 366 days",
      "Comparisons: previous period, previous period same year, previous year, or none",
      "Regenerate keeps slide structure consistent month over month",
      "AI-enabled reports consume tokens under the Report ledger in Billing and Usage",
    ],
  },
};

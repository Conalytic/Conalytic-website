/**
 * Default home FAQ — visible on the page and mirrored in FAQPage JSON-LD.
 * Keyword-rich copy aligned with Conalytic-Chat products.
 */
export const DEFAULT_HOME_FAQ = [
  {
    question: "What is Conalytic marketing analytics software?",
    answer:
      "Conalytic is an AI-powered marketing analytics platform with three tools: Conversational Analytics (natural-language chat over GA4, Google Ads, Search Console, GTM, and Meta), KPIs Tracker (goal monitoring for GA4, GSC, and Google Ads), and Report Builder (automated HTML client presentation decks). Sign up free at chat.conalytic.com.",
  },
  {
    question: "What products does Conalytic include?",
    answer:
      "Conalytic includes Conversational Analytics (Chats) for plain-English marketing data questions; KPIs Tracker for on-track, at-risk, and off-track goal status across GA4, Search Console, and Google Ads; and Report Builder (Reports) for multi-platform HTML marketing reports with optional AI insights, executive summaries, and action plans.",
  },
  {
    question: "Which marketing platforms does Conalytic connect to?",
    answer:
      "OAuth integrations include Google Analytics 4, Google Search Console, Google Ads, and Google Tag Manager today. Meta Ads (Facebook & Instagram) and LinkedIn Ads are coming soon. Conversational Analytics supports live queries on GA4, GSC, Google Ads, and GTM; KPI Tracker uses GA4, GSC, and Google Ads; Report Builder generates decks from GA4, GSC, Google Ads, and GTM data.",
  },
  {
    question: "How is Conversational Analytics different from a BI dashboard?",
    answer:
      "Conversational Analytics replaces SQL and dashboard building with natural-language chat. Ask follow-up questions about GA4 traffic, Google Ads ROAS, Search Console queries, GTM container health, or Meta campaign performance—Conalytic retrieves live metrics and renders inline charts and tables in the conversation.",
  },
  {
    question: "How does the Conalytic KPI Tracker work?",
    answer:
      "Create a KPI project, connect GA4, Search Console, and/or Google Ads, set increase or decrease targets per metric, and monitor On track, At risk, Off track, or No data labels with six months of history. Track up to 300 GSC keyword rankings. Scoring is rules-based—not AI-generated.",
  },
  {
    question: "What does Conalytic Report Builder produce?",
    answer:
      "Report Builder generates stakeholder-ready HTML presentation decks from connected marketing data—executive summary, platform sections for GA4, GSC, Google Ads, and GTM, cross-source findings, methodology, prioritized action plan, and optional AI-written slide narratives. Download HTML for agency client reporting.",
  },
  {
    question: "How does Conalytic Pro pricing work?",
    answer:
      "Conalytic Pro is free to start. Conversational Analytics and AI-powered report insights use usage-based pricing. KPIs Tracker goal monitoring is included for connected accounts. See current plans in the app after signup.",
  },
  {
    question: "Is my marketing data secure with Conalytic?",
    answer:
      "Conalytic uses read-only OAuth where applicable, encrypts data in transit, and does not sell your data. Google API Limited Use requirements are documented in our Privacy Policy at conalytic.com/privacy-and-policy.",
  },
] as const;

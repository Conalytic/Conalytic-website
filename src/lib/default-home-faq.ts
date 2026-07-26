/**
 * Default home FAQ — visible on the page and mirrored in FAQPage JSON-LD.
 * Written for search snippets and generative answers (products, integrations, trust).
 */
export const DEFAULT_HOME_FAQ = [
  {
    question: "What products does Conalytic include?",
    answer:
      "Conalytic has three built-in tools: Conversational Analytics (Chats) for plain-English questions over live marketing data; KPIs Tracker for goal-based monitoring across GA4, Search Console, and Google Ads; and Report Builder for multi-platform HTML presentation decks with optional AI insights.",
  },
  {
    question: "Which marketing platforms does Conalytic connect to?",
    answer:
      "Conalytic connects via OAuth to Google Analytics 4, Google Search Console, Google Ads, Google Tag Manager, Meta Ads, and LinkedIn Ads. Conversational Analytics supports live queries on GA4, GSC, Google Ads, GTM, and Meta; KPI Tracker uses GA4, GSC, and Google Ads; Report Builder uses GA4, GSC, Google Ads, and GTM.",
  },
  {
    question: "How is Conversational Analytics different from a BI dashboard?",
    answer:
      "Instead of building reports or writing SQL, you ask questions in natural language. Each chat is scoped to the accounts you connect, and Conalytic retrieves live metrics, returns explanations, and can render inline charts and tables in the conversation.",
  },
  {
    question: "How does KPIs Tracker work?",
    answer:
      "You create a KPI project, connect GA4, Search Console, and/or Google Ads, set target goals per metric, and monitor on-track, at-risk, or off-track status with six months of history. Evaluation is rules-based—not AI-generated scores.",
  },
  {
    question: "What does Report Builder produce?",
    answer:
      "Report Builder generates stakeholder-ready HTML presentation decks from your connected data, including executive summary slides, per-platform sections, cross-source findings, methodology notes, an action plan, and optional AI-written slide narratives.",
  },
  {
    question: "Is my marketing data secure with Conalytic?",
    answer:
      "Conalytic uses OAuth with read-only scopes where applicable, encrypts data in transit, and does not sell your data. Privacy and security details are in our Privacy Policy at conalytic.com/privacy-and-policy.",
  },
] as const;

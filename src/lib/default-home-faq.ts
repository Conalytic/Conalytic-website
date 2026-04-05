/** Default home FAQ — shared by UI (HomeClient) and FAQPage JSON-LD for crawlers. */
export const DEFAULT_HOME_FAQ = [
  {
    question: "How quickly can we see results?",
    answer:
      "Connect your data sources in under 5 minutes. Start getting insights immediately through our conversational interface — no onboarding or training required.",
  },
  {
    question: "What makes your AI insights different?",
    answer:
      "Our AI doesn't just show data – it explains trends, identifies opportunities, and provides specific recommendations for optimization. Think of it as a senior analyst available 24/7.",
  },
  {
    question: "Can we customize reports for clients?",
    answer:
      "Absolutely. Full white-label capabilities with custom branding, logos, and color schemes for professional client deliverables. Your brand, powered by Conalytic.",
  },
  {
    question: "Do you integrate with our existing tools?",
    answer:
      "We connect with GA4, Google Search Console, Google Ads, and Meta Ads today, with more integrations launching every quarter.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. We are SOC 2 compliant, use end-to-end encryption in transit and at rest, and never share or sell your data.",
  },
] as const;

/**
 * Default home FAQ — visible on the page and mirrored in FAQPage JSON-LD.
 * Written for clarity in search snippets and generative answers (who, what, integrations, trust).
 */
export const DEFAULT_HOME_FAQ = [
  {
    question: "How quickly can we see results with Conalytic?",
    answer:
      "Most teams connect GA4, Google Ads, Meta Ads, or Search Console in a few minutes. You can ask your first questions in plain English right away—no SQL, no lengthy onboarding.",
  },
  {
    question: "What makes Conalytic different from dashboards or BI tools?",
    answer:
      "Conalytic is conversational analytics: you ask in natural language and get explanations, trends, and next-step ideas—not just charts. It is built for marketers who want answers fast, not another dashboard to maintain.",
  },
  {
    question: "Can we white-label or customize reports for clients?",
    answer:
      "Yes. Conalytic supports professional, branded reporting workflows so agencies and teams can deliver client-ready outputs with your logos and visual identity.",
  },
  {
    question: "Which marketing platforms does Conalytic connect to?",
    answer:
      "Conalytic integrates with Google Analytics 4 (GA4), Google Search Console, Google Ads, and Meta (Facebook/Instagram) Ads. The product roadmap adds more connectors over time.",
  },
  {
    question: "Is my marketing data secure with Conalytic?",
    answer:
      "Conalytic is built for business use: data is encrypted in transit and at rest, access is controlled, and we do not sell your data. Details on compliance and policies are available in our security and legal documentation.",
  },
] as const;

/**
 * Agency & implementation services — nav labels, URLs, and page content.
 */
export type ServiceDefinition = {
  slug: string;
  /** Nav + H1 */
  title: string;
  /** Dropdown one-liner */
  navDescription: string;
  metaDescription: string;
  heroSubtitle: string;
  highlights: string[];
  deliverables: string[];
};

export const SERVICES_BASE_PATH = "/services";

export function servicePath(slug: string): string {
  return `${SERVICES_BASE_PATH}/${slug}`;
}

export const SERVICE_CATALOG: ServiceDefinition[] = [
  {
    slug: "seo-organic-growth",
    title: "SEO & Organic Growth",
    navDescription: "Technical SEO, content strategy, and sustainable search visibility",
    metaDescription:
      "SEO and organic growth services for B2B and SaaS: technical SEO, Google Search Console indexation, content clusters, Core Web Vitals, GA4 reporting, and AI search (GEO) optimization.",
    heroSubtitle:
      "Technical SEO, content strategy, and Search Console–aligned measurement — built to grow qualified organic pipeline.",
    highlights: [
      "Site architecture, crawlability, and indexation aligned with your CMS",
      "Keyword research and content briefs for high-intent B2B topics",
      "On-page optimization, internal linking, and schema where it matters",
    ],
    deliverables: [
      "SEO roadmap and quarterly priorities",
      "Technical audit and fix backlog",
      "Content cluster plan and optimization sprints",
      "Monthly performance reporting in Conalytic or your stack",
    ],
  },
  {
    slug: "paid-media-performance",
    title: "Paid Media & Performance Marketing",
    navDescription: "Google Ads, Meta, LinkedIn — strategy, creative, and ROAS-focused ops",
    metaDescription:
      "Paid media services: account structure, conversion tracking, creative testing, and budget optimization across Google Ads, Meta, and LinkedIn.",
    heroSubtitle:
      "Scale paid channels with clean tracking, structured tests, and reporting your leadership can trust.",
    highlights: [
      "Account audits and restructures for Search, PMax, and social",
      "GA4 + ad platform conversion alignment",
      "Creative and landing-page iteration loops",
    ],
    deliverables: [
      "Media plan and channel mix recommendations",
      "Campaign build or takeover with SLAs",
      "Weekly pacing and performance snapshots",
      "Quarterly strategic reviews",
    ],
  },
  {
    slug: "email-lifecycle-marketing",
    title: "Email & Lifecycle Marketing",
    navDescription: "Lifecycle flows, newsletters, and CRM automation that converts",
    metaDescription:
      "Email and lifecycle marketing: welcome flows, nurture sequences, product-led onboarding, and CRM automation for B2B SaaS and services.",
    heroSubtitle:
      "Turn signups and leads into revenue with segmented journeys, clear copy, and measurable lift.",
    highlights: [
      "Lifecycle mapping from lead → activation → expansion",
      "Template design, copy, and A/B testing",
      "Integration with HubSpot, Customer.io, Mailchimp, and similar tools",
    ],
    deliverables: [
      "Lifecycle audit and opportunity map",
      "Flow build (welcome, nurture, re-engagement)",
      "Deliverability and list-hygiene checklist",
      "Performance dashboards",
    ],
  },
  {
    slug: "generative-engine-optimization",
    title: "Generative Engine Optimization (GEO)",
    navDescription: "Visibility in AI Overviews, ChatGPT, Perplexity, and answer engines",
    metaDescription:
      "GEO services: citability, structured content, llms.txt, brand signals, and monitoring so your brand shows up in AI search and assistants.",
    heroSubtitle:
      "Be the source AI systems cite — with clear entities, authoritative pages, and crawl-friendly markup.",
    highlights: [
      "AI visibility audit (crawl, schema, passage-level citability)",
      "Content and FAQ patterns tuned for answer engines",
      "Brand mention and citation monitoring setup",
    ],
    deliverables: [
      "GEO scorecard and prioritized fixes",
      "Page templates for high-citation topics",
      "llms.txt and discovery header recommendations",
      "Monthly AI SERP / mention reporting",
    ],
  },
  {
    slug: "agentic-web",
    title: "Agentic Web Experiences",
    navDescription: "AI agents, copilots, and task UIs embedded in your product or site",
    metaDescription:
      "Design and build agentic web experiences: in-app copilots, guided workflows, and safe tool use for marketing and operations teams.",
    heroSubtitle:
      "Ship agent interfaces that feel native — grounded in your data, brand, and guardrails.",
    highlights: [
      "UX for chat, tools, and human-in-the-loop approvals",
      "Integration with Conalytic chat or your LLM stack",
      "Security, rate limits, and audit logging patterns",
    ],
    deliverables: [
      "Agent UX prototype and technical spec",
      "Production UI integrated with your APIs",
      "Evaluation harness for quality and safety",
      "Runbooks for ops and support",
    ],
  },
  {
    slug: "ai-workflow-automation",
    title: "AI Workflow Automation",
    navDescription: "Automate reporting, enrichment, and ops with LLMs and integrations",
    metaDescription:
      "AI workflow automation: reporting pipelines, lead enrichment, content ops, and Zapier/Make/custom integrations for marketing teams.",
    heroSubtitle:
      "Replace repetitive marketing ops with reliable automations — monitored, versioned, and easy to extend.",
    highlights: [
      "Workflow design from spreadsheet to production",
      "LLM steps with validation and fallbacks",
      "Connections to CRM, ads, analytics, and Slack",
    ],
    deliverables: [
      "Automation blueprint and ROI estimate",
      "Implemented workflows with alerting",
      "Documentation and handoff training",
      "Optional ongoing tuning retainer",
    ],
  },
  {
    slug: "mcp-server-development",
    title: "MCP Server Development",
    navDescription: "Model Context Protocol servers for tools, data, and internal systems",
    metaDescription:
      "Custom MCP server development: secure connectors for analytics, CRM, ads APIs, and internal tools for Claude, Cursor, and enterprise agents.",
    heroSubtitle:
      "Expose your marketing data and actions to AI clients through well-scoped MCP tools.",
    highlights: [
      "Tool design, auth, and least-privilege access",
      "Deployment on Vercel, Cloudflare, or your VPC",
      "Testing with Cursor, Claude Desktop, and custom agents",
    ],
    deliverables: [
      "MCP server spec and OpenAPI alignment",
      "Production-ready server + hosting guidance",
      "Client configuration docs for your team",
      "Security review checklist",
    ],
  },
  {
    slug: "web-application-development",
    title: "Custom Web Application Development",
    navDescription: "Full-stack SaaS and internal apps — Next.js, APIs, and scalable hosting",
    metaDescription:
      "Custom web application development: Next.js SaaS, dashboards, auth, billing, and Vercel-ready architecture for B2B products.",
    heroSubtitle:
      "From MVP to production — modern React, type-safe APIs, and observability built in.",
    highlights: [
      "Next.js App Router, SSR/SSG for SEO where needed",
      "Auth, roles, and multi-tenant patterns",
      "Analytics, error monitoring, and CI/CD on Vercel",
    ],
    deliverables: [
      "Discovery and technical architecture",
      "Iterative builds with demo milestones",
      "Production launch and runbooks",
      "Optional post-launch support",
    ],
  },
  {
    slug: "marketing-website-development",
    title: "Website Development",
    navDescription: "Next.js marketing sites — fast, indexable, conversion-ready",
    metaDescription:
      "Website development: crawlable Next.js sites, CMS integration, Core Web Vitals, and SEO-ready launches for B2B brands.",
    heroSubtitle:
      "Launch sites that rank — server-rendered content, clean IA, and measurable conversion paths.",
    highlights: [
      "Design systems aligned with Conalytic-quality UX",
      "Technical SEO, sitemap, schema, and GSC setup",
      "CMS hooks for your team to edit copy safely",
    ],
    deliverables: [
      "Information architecture and wireframes",
      "Responsive build + accessibility pass",
      "Launch checklist (DNS, redirects, analytics)",
      "Handoff documentation",
    ],
  },
  {
    slug: "product-ui-ux-design",
    title: "UI/UX & Product Design",
    navDescription: "Websites, SaaS, dashboards, design systems, and marketing creative",
    metaDescription:
      "UI/UX and product design for marketing sites, web apps, and software: research, wireframes, high-fidelity UI, design systems, and dev-ready handoff for B2B teams.",
    heroSubtitle:
      "From first wireframe to polished UI — cohesive experiences for your site, product, and brand touchpoints.",
    highlights: [
      "Discovery workshops and user flows for web and software",
      "Figma design systems, components, and responsive layouts",
      "Marketing pages, app shells, dashboards, and email templates",
    ],
    deliverables: [
      "UX audit or greenfield IA and wireframes",
      "High-fidelity UI and interactive prototypes",
      "Design system tokens and component library",
      "Developer handoff specs and asset export",
    ],
  },
  {
    slug: "marketing-analytics-measurement",
    title: "Marketing Analytics & Measurement",
    navDescription: "GA4, GTM, BigQuery, and attribution you can defend in board meetings",
    metaDescription:
      "Marketing analytics implementation: GA4, Google Tag Manager, conversion events, BigQuery exports, and KPI frameworks using Conalytic.",
    heroSubtitle:
      "Fix the data layer first — then dashboards and chat analytics your team will actually use.",
    highlights: [
      "GA4 + GTM audit and event taxonomy",
      "Ads ↔ analytics conversion reconciliation",
      "KPI definitions wired into Conalytic KPI Tracker",
    ],
    deliverables: [
      "Measurement plan and event dictionary",
      "Tag implementation and QA",
      "Executive KPI dashboard or Conalytic workspace",
      "Training session for marketing and ops",
    ],
  },
  {
    slug: "conversion-rate-optimization",
    title: "Conversion Rate Optimization (CRO)",
    navDescription: "Landing page tests, UX fixes, and experiment programs that lift pipeline",
    metaDescription:
      "CRO services: landing page audits, A/B tests, form and checkout optimization, and experiment roadmaps for B2B SaaS sites.",
    heroSubtitle:
      "Turn existing traffic into more demos and signups with structured tests and clear hypotheses.",
    highlights: [
      "Funnel analysis with GA4 and session insights",
      "Hypothesis backlog prioritized by impact",
      "Design and copy variants for key pages",
    ],
    deliverables: [
      "CRO audit and quick-win fixes",
      "Test plan and implementation",
      "Results readouts with next steps",
      "Optional monthly experiment cadence",
    ],
  },
];

export function getServiceBySlug(slug: string): ServiceDefinition | undefined {
  return SERVICE_CATALOG.find((s) => s.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return SERVICE_CATALOG.map((s) => s.slug);
}

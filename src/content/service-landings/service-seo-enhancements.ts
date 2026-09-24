/**
 * SEO-focused copy overrides for service landings (merged onto parsed-services.json).
 * Primary keyword in: title tag, H1, hero paragraph 1, and at least one section H2.
 */

export type ServiceSeoEnhancement = {
  meta: {
    pageTitle: string;
    description: string;
    keywords: string[];
  };
  hero: {
    eyebrow: string;
    line1: string;
    line2: string;
    paragraph1: string;
    paragraph2: string;
  };
  whatWeDo: { title: string };
  benefits: { headline: string; introBody: string };
  howItWorks: { title: string; subtitle: string };
  process: { title: string; subtitle: string };
  stats: { title: string; values: string[] };
  faq: { title: string; subtitle: string };
  finalCta: { title: string; description: string };
};

export const SERVICE_SEO_ENHANCEMENTS: Record<string, ServiceSeoEnhancement> = {
  "seo-organic-growth": {
    meta: {
      pageTitle: "B2B SEO Services & Technical SEO Agency | Conalytic",
      description:
        "B2B SEO services: technical SEO audits, Search Console indexation, content clusters, Core Web Vitals, and GA4 reporting for SaaS pipeline growth.",
      keywords: [
        "B2B SEO services",
        "technical SEO services",
        "SaaS SEO agency",
        "Google Search Console indexing",
        "content cluster strategy",
        "Core Web Vitals SEO",
        "GEO SEO",
        "Next.js SEO",
      ],
    },
    hero: {
      eyebrow: "B2B SEO & organic growth agency",
      line1: "B2B SEO services & technical SEO",
      line2: "built for SaaS pipeline growth",
      paragraph1:
        "Conalytic delivers B2B SEO services end to end: technical SEO audits, Google Search Console indexation fixes, pillar–cluster content, and GA4 conversion tracking in one roadmap your developers and marketers can ship.",
      paragraph2:
        "We target high-intent keywords, fix crawl and indexation issues on modern stacks, and optimize for Google AI Overviews so organic search stays a measurable pipeline channel—not vanity traffic.",
    },
    whatWeDo: {
      title: "Technical SEO, content, and analytics services for B2B and SaaS brands",
    },
    benefits: {
      headline:
        "Organic search that compounds—technical SEO, content clusters, and GA4 proof of pipeline impact",
      introBody:
        "As a B2B-focused SEO agency, we tie every deliverable to Search Console coverage, ranking movement, or organic conversions so leadership sees qualified pipeline, not inflated sessions.",
    },
    howItWorks: {
      title: "How our B2B SEO program runs from audit to ROI",
      subtitle:
        "Discover, plan, ship, and prove—one SEO roadmap shared by engineering, content, and leadership.",
    },
    process: {
      title: "How we deliver SEO results that show up in GA4 and CRM pipeline",
      subtitle:
        "Technical SEO, topical authority, and reporting connected so every sprint moves indexation, rankings, or conversions.",
    },
    stats: {
      title: "SEO outcomes we measure and report",
      values: ["850+", "48%", "120+"],
    },
    faq: {
      title: "B2B SEO services FAQ",
      subtitle: "Timelines, technical SEO scope, Next.js sites, and how we partner with your team.",
    },
    finalCta: {
      title: "Start a B2B SEO program you can measure in GA4",
      description:
        "Get a technical SEO audit, indexation plan, and content cluster roadmap with owners, dates, and pipeline KPIs your leadership can trust.",
    },
  },

  "paid-media-performance": {
    meta: {
      pageTitle: "PPC Management & Performance Marketing Agency | Conalytic",
      description:
        "PPC management for Google Ads, Meta, and LinkedIn. Performance Max guardrails, conversion tracking, creative testing, and ROAS verified in GA4 for B2B and SaaS.",
      keywords: [
        "performance marketing agency",
        "PPC management services",
        "Google Ads management",
        "LinkedIn Ads B2B",
        "Performance Max management",
        "ROAS optimization",
        "paid social agency",
        "incrementality testing",
      ],
    },
    hero: {
      eyebrow: "Performance marketing & PPC agency",
      line1: "PPC management & performance marketing",
      line2: "with GA4-verified ROAS for B2B",
      paragraph1:
        "Conalytic is a performance marketing agency managing Google Ads, Meta Ads, and LinkedIn Ads for B2B, SaaS, and ecommerce—PPC strategy, ad creative, conversion tracking, and budget allocation in one team.",
      paragraph2:
        "We add guardrails to Performance Max and Advantage+, align offline conversions with GA4 and your CRM, and report ROAS and pipeline metrics finance can audit—not platform-inflated numbers.",
    },
    whatWeDo: {
      title: "PPC management and paid social services for B2B, SaaS, and ecommerce",
    },
    benefits: {
      headline:
        "Performance marketing that stays profitable—better data, stronger creative, ROAS you can prove",
      introBody:
        "Every Google Ads and Meta Ads decision ties to conversion data you can validate in GA4 and HubSpot or Salesforce, so you scale spend with confidence.",
    },
    howItWorks: {
      title: "How our PPC management program works",
      subtitle: "Audit, build, optimize, and prove—every ad dollar tied to CPA, ROAS, or pipeline.",
    },
    process: {
      title: "How we deliver paid media results that show up in revenue",
      subtitle: "Search, paid social, creative testing, and measurement on one accountable plan.",
    },
    stats: {
      title: "Paid media outcomes we report on",
      values: ["4.2M+", "34%", "4.1x"],
    },
    faq: {
      title: "PPC management & performance marketing FAQ",
      subtitle: "Budgets, Performance Max, AI Max, tracking, and account ownership.",
    },
    finalCta: {
      title: "Scale PPC with ROAS you can prove in GA4",
      description:
        "Book a paid media audit covering Google Ads, Meta, LinkedIn, tracking gaps, and the fastest path to profitable growth.",
    },
  },

  "email-lifecycle-marketing": {
    meta: {
      pageTitle: "Email Marketing & Lifecycle Automation Agency | Conalytic",
      description:
        "Email marketing agency for lifecycle automation: onboarding, nurture, retention, SPF/DKIM/DMARC deliverability, and HubSpot, Klaviyo, and Salesforce workflows for B2B SaaS.",
      keywords: [
        "email marketing agency",
        "lifecycle marketing services",
        "marketing automation agency",
        "HubSpot email marketing",
        "Klaviyo agency",
        "email deliverability",
        "B2B email nurture",
        "onboarding email sequence",
      ],
    },
    hero: {
      eyebrow: "Email marketing & lifecycle agency",
      line1: "Email marketing & lifecycle automation",
      line2: "that converts in the AI-sorted inbox",
      paragraph1:
        "Conalytic is an email marketing agency building onboarding flows, nurture sequences, newsletters, and CRM automation that move subscribers to revenue—for B2B, SaaS, and ecommerce brands.",
      paragraph2:
        "We design for Gmail’s AI inbox and strict deliverability: authenticated sending, list hygiene, and behavior-based triggers so lifecycle email stays visible and measurable in GA4.",
    },
    whatWeDo: {
      title: "Lifecycle email marketing and marketing automation for every funnel stage",
    },
    benefits: {
      headline:
        "Lifecycle marketing that lifts activation and retention—deliverability, automation, and revenue reporting",
      introBody:
        "From welcome series to re-engagement, every flow maps to lifecycle stages and KPIs in your ESP and CRM so marketing and success teams share one view of email performance.",
    },
    howItWorks: {
      title: "How our lifecycle email marketing program works",
      subtitle: "Map journeys, build flows, test creative, and report revenue impact monthly.",
    },
    process: {
      title: "How we deliver email marketing results you can tie to revenue",
      subtitle: "Strategy, copy, automation build, and deliverability—connected end to end.",
    },
    stats: {
      title: "Email & lifecycle outcomes we track",
      values: ["180+", "22%", "98%"],
    },
    faq: {
      title: "Email marketing & lifecycle automation FAQ",
      subtitle: "Deliverability, ESPs, AI inbox changes, and how we work with your team.",
    },
    finalCta: {
      title: "Launch lifecycle email that survives the AI inbox",
      description:
        "Get a lifecycle audit, deliverability check, and automation roadmap aligned to activation and expansion KPIs.",
    },
  },

  "generative-engine-optimization": {
    meta: {
      pageTitle: "Generative Engine Optimization (GEO) Agency | Conalytic",
      description:
        "GEO agency for AI search visibility: citability, schema, llms.txt, brand monitoring, and content tuned for Google AI Overviews, ChatGPT, and Perplexity.",
      keywords: [
        "generative engine optimization",
        "GEO agency",
        "AI search optimization",
        "Google AI Overviews SEO",
        "ChatGPT brand visibility",
        "Perplexity SEO",
        "llms.txt",
        "AI citation strategy",
      ],
    },
    hero: {
      eyebrow: "Generative engine optimization (GEO) services",
      line1: "Generative engine optimization (GEO)",
      line2: "for AI Overviews, ChatGPT & Perplexity",
      paragraph1:
        "Conalytic provides generative engine optimization (GEO) so your brand is cited in Google AI Overviews, ChatGPT, Perplexity, and Gemini—not only ranked in classic blue links.",
      paragraph2:
        "We improve entity clarity, passage-level citability, structured data, and AI crawler policy so answer engines can find, trust, and reference your content.",
    },
    whatWeDo: {
      title: "GEO services for AI search visibility and brand citations",
    },
    benefits: {
      headline:
        "GEO that earns citations—entity clarity, citability, and monitoring across AI answer engines",
      introBody:
        "GEO sits alongside SEO: we prioritize pages and passages AI systems can quote, track mentions and referrals, and report AI visibility alongside Search Console and GA4.",
    },
    howItWorks: {
      title: "How our GEO program improves AI search visibility",
      subtitle: "Audit AI visibility, fix citability gaps, publish answer-ready content, measure citations.",
    },
    process: {
      title: "How we deliver GEO results across AI search platforms",
      subtitle: "Research, content patterns, technical signals, and ongoing AI SERP monitoring.",
    },
    stats: {
      title: "GEO & AI visibility outcomes we report",
      values: ["250+", "38%", "55%"],
    },
    faq: {
      title: "Generative engine optimization (GEO) FAQ",
      subtitle: "GEO vs SEO, AI Overviews, tracking AI referrals, and implementation scope.",
    },
    finalCta: {
      title: "Become a source AI search engines cite",
      description:
        "Get a GEO scorecard, prioritized fixes, and content templates built for AI Overviews and answer engines.",
    },
  },

  "agentic-web": {
    meta: {
      pageTitle: "Agentic Web & AI Copilot Development | Conalytic",
      description:
        "Agentic web development: in-app AI copilots, task UIs, RAG assistants, guardrails, and tool use for B2B SaaS—grounded in your data and brand.",
      keywords: [
        "agentic web",
        "AI copilot development",
        "in-app AI assistant",
        "RAG chatbot development",
        "AI agent UI",
        "Conversational UI SaaS",
        "human in the loop AI",
      ],
    },
    hero: {
      eyebrow: "Agentic web & AI copilot development",
      line1: "Agentic web experiences & AI copilots",
      line2: "built into your product or marketing site",
      paragraph1:
        "Conalytic designs and builds agentic web experiences—copilots, guided workflows, and task UIs embedded in your SaaS or site—with secure tool use and audit-friendly guardrails.",
      paragraph2:
        "We integrate with your APIs, Conalytic chat, or your LLM stack so users get grounded answers, approvals, and actions without leaving your product.",
    },
    whatWeDo: {
      title: "Agentic web development services for copilots and AI-native UX",
    },
    benefits: {
      headline:
        "Agentic interfaces users trust—scoped data, clear guardrails, and UX that feels native to your product",
      introBody:
        "We ship production agent UI with rate limits, logging, and human-in-the-loop patterns so support and security teams stay comfortable as you roll out AI features.",
    },
    howItWorks: {
      title: "How we deliver agentic web and copilot experiences",
      subtitle: "Discover use cases, prototype UX, integrate tools, evaluate quality, launch with runbooks.",
    },
    process: {
      title: "How we ship AI copilots that work in real workflows",
      subtitle: "UX, engineering, safety review, and ops handoff in one delivery model.",
    },
    stats: {
      title: "Agentic web delivery outcomes we commit to",
      values: ["45+", "40%", "6 weeks"],
    },
    faq: {
      title: "Agentic web & AI copilot FAQ",
      subtitle: "Security, integrations, models, and timeline for production copilots.",
    },
    finalCta: {
      title: "Add an AI copilot your users will actually use",
      description:
        "Scope an agentic web prototype with technical spec, guardrails, and a path to production on your stack.",
    },
  },

  "ai-workflow-automation": {
    meta: {
      pageTitle: "AI Workflow Automation Agency | n8n & Zapier | Conalytic",
      description:
        "AI workflow automation for marketing and ops: reporting pipelines, lead enrichment, content ops, and monitored n8n, Zapier, or custom LLM workflows for B2B teams.",
      keywords: [
        "AI workflow automation",
        "marketing automation agency",
        "n8n automation",
        "Zapier expert",
        "LLM automation",
        "reporting automation",
        "lead enrichment automation",
      ],
    },
    hero: {
      eyebrow: "AI workflow automation services",
      line1: "AI workflow automation",
      line2: "for marketing, sales, and ops you can audit",
      paragraph1:
        "Conalytic builds AI workflow automation that replaces repetitive marketing ops—reporting, enrichment, routing, and content steps—with monitored flows using n8n, Zapier, Make, or custom code.",
      paragraph2:
        "LLM steps include validation and fallbacks; alerts and versioning keep automations reliable as your stack and policies evolve.",
    },
    whatWeDo: {
      title: "AI workflow automation services across CRM, ads, analytics, and Slack",
    },
    benefits: {
      headline:
        "Automations that save hours—documented, alertable, and easy for your team to extend",
      introBody:
        "We design workflows from spreadsheet chaos to production with ROI estimates, owner handoff, and optional retainer tuning so automations keep working after launch.",
    },
    howItWorks: {
      title: "How our AI workflow automation engagements run",
      subtitle: "Blueprint, build, test with real data, deploy with monitoring and documentation.",
    },
    process: {
      title: "How we deliver workflow automation that sticks",
      subtitle: "Discovery, integration mapping, LLM validation, and ops-ready runbooks.",
    },
    stats: {
      title: "Automation outcomes we target",
      values: ["320+", "1,200+", "99%"],
    },
    faq: {
      title: "AI workflow automation FAQ",
      subtitle: "Tools, security, LLM costs, and who maintains flows after launch.",
    },
    finalCta: {
      title: "Automate the marketing ops work slowing your team down",
      description:
        "Get an automation blueprint with ROI estimate and a prioritized backlog of flows to ship first.",
    },
  },

  "mcp-server-development": {
    meta: {
      pageTitle: "MCP Server Development Services | Conalytic",
      description:
        "Custom MCP server development: secure Model Context Protocol connectors for analytics, CRM, ads APIs, and internal tools—for Claude, Cursor, and enterprise agents.",
      keywords: [
        "MCP server development",
        "Model Context Protocol",
        "Claude MCP integration",
        "Cursor MCP server",
        "AI tool connectors",
        "OAuth MCP",
        "enterprise AI agents",
      ],
    },
    hero: {
      eyebrow: "MCP server development services",
      line1: "MCP server development",
      line2: "connect your data to Claude, Cursor & agents",
      paragraph1:
        "Conalytic builds custom Model Context Protocol (MCP) servers so AI clients safely call your marketing data, CRM, ads APIs, and internal tools—with least-privilege auth and clear tool scopes.",
      paragraph2:
        "We deploy on Vercel, Cloudflare, or your VPC, document client setup, and test with Claude Desktop, Cursor, and your internal agents.",
    },
    whatWeDo: {
      title: "Model Context Protocol development for production AI tool access",
    },
    benefits: {
      headline:
        "MCP servers your security team can approve—scoped tools, OAuth, and audit-friendly logging",
      introBody:
        "Tool design aligns with OpenAPI where possible; we deliver specs, hosting guidance, and checklists so dev and ops teams can maintain connectors long term.",
    },
    howItWorks: {
      title: "How our MCP server development process works",
      subtitle: "Spec tools, implement auth, deploy, test clients, hand off runbooks.",
    },
    process: {
      title: "How we ship MCP servers ready for real agent workloads",
      subtitle: "Discovery, API mapping, secure implementation, and client configuration docs.",
    },
    stats: {
      title: "MCP delivery standards we follow",
      values: ["28+", "140+"],
    },
    faq: {
      title: "MCP server development FAQ",
      subtitle: "Auth models, hosting, supported clients, and maintenance.",
    },
    finalCta: {
      title: "Expose your stack to AI clients through MCP",
      description:
        "Scope an MCP server with tool list, auth approach, and deployment plan for your first agent use case.",
    },
  },

  "web-application-development": {
    meta: {
      pageTitle: "Custom Web Application & SaaS Development | Conalytic",
      description:
        "Custom web application development with Next.js, TypeScript, auth, billing, and Vercel-ready architecture—MVPs, dashboards, and B2B SaaS products.",
      keywords: [
        "custom web application development",
        "SaaS development company",
        "Next.js development agency",
        "full stack SaaS",
        "B2B SaaS MVP",
        "TypeScript web app",
      ],
    },
    hero: {
      eyebrow: "Custom web application development",
      line1: "Custom web application development",
      line2: "Next.js SaaS & APIs built to scale",
      paragraph1:
        "Conalytic provides custom web application development for B2B SaaS, internal tools, and dashboards—Next.js App Router, type-safe APIs, auth, billing, and observability from MVP through production.",
      paragraph2:
        "SSR and SEO patterns are built in where marketing pages matter; multi-tenant and role-based access are planned before feature velocity creates debt.",
    },
    whatWeDo: {
      title: "Full-stack web application development services for B2B products",
    },
    benefits: {
      headline:
        "Ship SaaS faster with architecture you won’t regret—typed APIs, CI/CD, and Vercel-ready ops",
      introBody:
        "Iterative milestones, demo-ready releases, and runbooks at launch mean your team can operate and extend the product without vendor lock-in.",
    },
    howItWorks: {
      title: "How our custom web app development engagements run",
      subtitle: "Discovery, architecture, iterative builds, production launch, optional support.",
    },
    process: {
      title: "How we deliver web applications ready for real users and SEO",
      subtitle: "Product discovery, engineering sprints, QA, and launch checklists.",
    },
    stats: {
      title: "Web app delivery outcomes we plan for",
      values: ["65+", "10 weeks", "99.9%"],
    },
    faq: {
      title: "Custom web application development FAQ",
      subtitle: "Stack, timeline, ownership, hosting, and post-launch support.",
    },
    finalCta: {
      title: "Build your next B2B web app on a modern stack",
      description:
        "Start with discovery and technical architecture—a clear MVP scope, milestones, and launch plan.",
    },
  },

  "marketing-website-development": {
    meta: {
      pageTitle: "Next.js Website Development Agency | B2B & SaaS | Conalytic",
      description:
        "Next.js website development for B2B and SaaS: crawlable marketing sites, headless CMS, Core Web Vitals, schema, and migration-safe launches with GA4 and GSC setup.",
      keywords: [
        "Next.js website development",
        "B2B website development",
        "marketing website agency",
        "headless CMS website",
        "Core Web Vitals website",
        "SEO website launch",
        "Webflow to Next.js migration",
      ],
    },
    hero: {
      eyebrow: "Next.js website development agency",
      line1: "Next.js website development",
      line2: "fast, SEO-ready B2B marketing sites",
      paragraph1:
        "Conalytic specializes in Next.js website development for B2B and SaaS—server-rendered pages, clean information architecture, Core Web Vitals, and conversion paths your growth team can measure in GA4.",
      paragraph2:
        "We integrate headless CMS workflows, technical SEO, sitemaps, schema, and Search Console setup so launches index quickly and stay editable without breaking performance.",
    },
    whatWeDo: {
      title: "Website development services for SEO, speed, and conversion",
    },
    benefits: {
      headline:
        "Marketing websites that rank and convert—SSR content, CWV, and analytics wired at launch",
      introBody:
        "Design systems, accessibility passes, and redirect/analytics checklists reduce launch risk when you replatform from WordPress, Webflow, or legacy stacks.",
    },
    howItWorks: {
      title: "How our Next.js website development projects run",
      subtitle: "IA, design, build, SEO QA, launch, and handoff documentation.",
    },
    process: {
      title: "How we launch websites that perform in search and sales",
      subtitle: "Wireframes, responsive build, technical SEO, and measurable conversion paths.",
    },
    stats: {
      title: "Website launch outcomes we checklist",
      values: ["95+", "94", "96%"],
    },
    faq: {
      title: "Next.js website development FAQ",
      subtitle: "CMS choice, migrations, SEO, timelines, and post-launch edits.",
    },
    finalCta: {
      title: "Launch a Next.js marketing site built to rank",
      description:
        "Get IA, performance, and SEO scope for a site your team can update and your buyers can find.",
    },
  },

  "product-ui-ux-design": {
    meta: {
      pageTitle: "UI/UX Design Agency for SaaS & B2B | Conalytic",
      description:
        "UI/UX design agency for SaaS, marketing sites, and dashboards—research, wireframes, design systems, high-fidelity UI, and dev-ready Figma handoff for B2B teams.",
      keywords: [
        "UI UX design agency",
        "SaaS UI design",
        "product design services",
        "dashboard UX design",
        "design system Figma",
        "B2B website design",
        "conversion focused design",
      ],
    },
    hero: {
      eyebrow: "UI/UX & product design agency",
      line1: "UI/UX & product design",
      line2: "for SaaS, sites, and dashboards that convert",
      paragraph1:
        "Conalytic is a UI/UX design agency for B2B SaaS, marketing websites, and analytics dashboards—from discovery and user flows to Figma design systems and developer handoff.",
      paragraph2:
        "We align UX with SEO and CRO: clear hierarchy, accessible components, and landing patterns that support both usability and measurable conversion lifts.",
    },
    whatWeDo: {
      title: "UI/UX design services for web apps, marketing sites, and product teams",
    },
    benefits: {
      headline:
        "Design that ships—research-backed UX, cohesive UI, and specs developers can build from",
      introBody:
        "Workshops, prototypes, and component libraries reduce rework between design and engineering while keeping brand and accessibility consistent across touchpoints.",
    },
    howItWorks: {
      title: "How our UI/UX design engagements work",
      subtitle: "Discover, wireframe, design UI, prototype, hand off to development.",
    },
    process: {
      title: "How we deliver product and marketing design that performs",
      subtitle: "Audits or greenfield IA, visual design, systems, and export-ready assets.",
    },
    stats: {
      title: "Design delivery outcomes we plan with you",
      values: ["110+", "28%", "240+"],
    },
    faq: {
      title: "UI/UX & product design FAQ",
      subtitle: "Scope, Figma deliverables, dev collaboration, and brand alignment.",
    },
    finalCta: {
      title: "Upgrade UX and UI without slowing engineering",
      description:
        "Start with a UX audit or greenfield flows—then high-fidelity UI your team can implement confidently.",
    },
  },

  "marketing-analytics-measurement": {
    meta: {
      pageTitle: "Marketing Analytics & GA4 Consulting | Conalytic",
      description:
        "Marketing analytics consulting: GA4, Google Tag Manager, event taxonomy, BigQuery, Consent Mode v2, ads↔analytics reconciliation, and KPI frameworks for B2B leadership.",
      keywords: [
        "marketing analytics consulting",
        "GA4 implementation",
        "Google Tag Manager agency",
        "conversion tracking audit",
        "marketing measurement plan",
        "BigQuery GA4 export",
        "Consent Mode v2",
        "attribution consulting",
      ],
    },
    hero: {
      eyebrow: "Marketing analytics & measurement consulting",
      line1: "Marketing analytics & GA4 consulting",
      line2: "measurement leadership can defend",
      paragraph1:
        "Conalytic provides marketing analytics consulting—GA4, Google Tag Manager, event dictionaries, BigQuery exports, and KPI definitions wired into dashboards and Conalytic KPI Tracker.",
      paragraph2:
        "We reconcile Google Ads and Meta with GA4, implement Consent Mode v2, and document methodology so board-ready metrics match what practitioners see in the UI.",
    },
    whatWeDo: {
      title: "GA4, GTM, and marketing measurement services for B2B teams",
    },
    benefits: {
      headline:
        "Fix the data layer first—then dashboards, chat analytics, and reports your team will trust",
      introBody:
        "Tag QA, server-side options, and executive KPI views are delivered with training so marketing, ops, and finance share one definition of conversion and pipeline.",
    },
    howItWorks: {
      title: "How our marketing analytics implementation process works",
      subtitle: "Audit, measurement plan, implement tags, QA, dashboard, train your team.",
    },
    process: {
      title: "How we deliver analytics setups that survive audits and board reviews",
      subtitle: "Taxonomy, implementation, validation, and ongoing governance recommendations.",
    },
    stats: {
      title: "Measurement outcomes we document",
      values: ["200+", "35%", "400+"],
    },
    faq: {
      title: "Marketing analytics & GA4 consulting FAQ",
      subtitle: "Scope, tools, timelines, and how we work with in-house analysts.",
    },
    finalCta: {
      title: "Get marketing measurement you can defend in the boardroom",
      description:
        "Book a GA4 and GTM audit with a prioritized event plan and executive KPI recommendations.",
    },
  },

  "conversion-rate-optimization": {
    meta: {
      pageTitle: "CRO Agency | Conversion Rate Optimization Services | Conalytic",
      description:
        "CRO agency for B2B and SaaS: landing page optimization, A/B testing, form UX, funnel analysis with GA4, and experimentation programs that lift demos and signups.",
      keywords: [
        "conversion rate optimization agency",
        "CRO services",
        "landing page optimization",
        "A/B testing agency",
        "B2B CRO",
        "SaaS conversion optimization",
        "funnel optimization",
        "UX conversion audit",
      ],
    },
    hero: {
      eyebrow: "Conversion rate optimization (CRO) agency",
      line1: "Conversion rate optimization (CRO)",
      line2: "more pipeline from traffic you already have",
      paragraph1:
        "Conalytic is a conversion rate optimization agency for B2B and SaaS—funnel analysis in GA4, hypothesis backlogs, landing page tests, and form UX fixes that lift demo requests and signups.",
      paragraph2:
        "We prioritize experiments by impact and confidence, design variants with clear success metrics, and read out results with next steps—not one-off button color tests.",
    },
    whatWeDo: {
      title: "CRO services: audits, A/B tests, and landing page optimization for B2B",
    },
    benefits: {
      headline:
        "Structured experimentation that compounds—research, tests, and learnings your team can reuse",
      introBody:
        "Quick wins ship alongside a test roadmap so product, marketing, and design align on what to try next based on data, not opinions.",
    },
    howItWorks: {
      title: "How our conversion rate optimization program runs",
      subtitle: "Audit funnel, prioritize hypotheses, test, analyze, iterate monthly.",
    },
    process: {
      title: "How we deliver CRO wins you can see in GA4 and CRM",
      subtitle: "Research, variant design, implementation support, and results readouts.",
    },
    stats: {
      title: "CRO experiment outcomes we report",
      values: ["350+", "18%", "62%"],
    },
    faq: {
      title: "Conversion rate optimization (CRO) FAQ",
      subtitle: "Test tools, traffic requirements, B2B funnels, and engagement models.",
    },
    finalCta: {
      title: "Turn more visitors into qualified pipeline with CRO",
      description:
        "Start with a CRO audit and prioritized test plan for your highest-traffic money pages.",
    },
  },
};

export function getServiceSeoEnhancement(slug: string): ServiceSeoEnhancement | undefined {
  return SERVICE_SEO_ENHANCEMENTS[slug];
}

/** Local, palette-aligned art for the SEO & organic growth landing (Next.js Image–optimized paths). */
const BASE = "/images/services/seo-organic-growth";
const WHAT_WE_DO = `${BASE}/what-we-do`;

export const SEO_ORGANIC_GROWTH_IMAGES = {
  benefits: {
    src: `${BASE}/benefits-organic-analytics.png`,
    alt: "Abstract slate and emerald analytics visual for organic growth",
  },
  heroSlides: {
    auditBackdrop: `${BASE}/hero-slide-audit.png`,
    indexShield: `${BASE}/hero-slide-gsc-workspace.png`,
    rankDashboard: `${BASE}/hero-slide-search-growth.png`,
    crawlFlow: `${BASE}/hero-slide-crawl.png`,
    contentCluster: `${BASE}/hero-slide-cluster.png`,
  },
  processStories: {
    "seo-audit": {
      src: `${BASE}/story-technical-seo-audit.png`,
      alt: "Abstract technical SEO crawl and audit visual",
    },
    "content-cluster": {
      src: `${BASE}/story-content-cluster.png`,
      alt: "Abstract content cluster and topic map visual",
    },
    indexation: {
      src: `${BASE}/story-indexation-performance.png`,
      alt: "Abstract Core Web Vitals and indexation performance visual",
    },
    "analytics-report": {
      src: `${BASE}/story-analytics-reporting.png`,
      alt: "Abstract SEO and GA4 reporting dashboard visual",
    },
  },
  whatWeDo: {
    keyword: { src: `${WHAT_WE_DO}/what-we-do-keyword.png`, alt: "Keyword research and SERP analysis visual" },
    content: { src: `${WHAT_WE_DO}/what-we-do-content.png`, alt: "Content strategy and editorial planning visual" },
    onpage: { src: `${WHAT_WE_DO}/what-we-do-onpage.png`, alt: "On-page SEO optimization visual" },
    technical: { src: `${WHAT_WE_DO}/what-we-do-technical.png`, alt: "Technical SEO and site audits visual" },
    indexation: { src: `${WHAT_WE_DO}/what-we-do-indexation.png`, alt: "Indexation and crawl optimization visual" },
    gmb: { src: `${WHAT_WE_DO}/what-we-do-gmb.png`, alt: "Google Business Profile optimization visual" },
    local: { src: `${WHAT_WE_DO}/what-we-do-local.png`, alt: "Local SEO and location pages visual" },
    links: { src: `${WHAT_WE_DO}/what-we-do-links.png`, alt: "Link building and digital PR visual" },
    schema: { src: `${WHAT_WE_DO}/what-we-do-schema.png`, alt: "Schema and structured data visual" },
    cwv: { src: `${WHAT_WE_DO}/what-we-do-cwv.png`, alt: "Core Web Vitals and page experience visual" },
    international: {
      src: `${WHAT_WE_DO}/what-we-do-international.png`,
      alt: "International SEO and hreflang visual",
    },
    geo: { src: `${WHAT_WE_DO}/what-we-do-geo.png`, alt: "GEO and AI search optimization visual" },
    reporting: { src: `${WHAT_WE_DO}/what-we-do-reporting.png`, alt: "Search Console and GA4 reporting visual" },
    competitor: {
      src: `${WHAT_WE_DO}/what-we-do-competitor.png`,
      alt: "Competitor and share-of-voice tracking visual",
    },
  },
} as const;

export type SeoOrganicGrowthProcessVisual = keyof typeof SEO_ORGANIC_GROWTH_IMAGES.processStories;

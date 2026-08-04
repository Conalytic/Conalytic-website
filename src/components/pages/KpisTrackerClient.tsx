"use client";
import { BRAND_HERO_GRADIENT_CLASS } from "@/lib/brand";

/** KPIs Tracker product page (marketing). */
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Gauge,
  LineChart,
  Target,
} from "lucide-react";
import { CTA } from "@/components/sections/CTA";
import { Pricing } from "@/components/home/sections/Pricing";
import { ProductSuiteLinks } from "@/components/products/ProductSuiteLinks";
import { MarketingFaqSection } from "@/components/sections/MarketingFaqSection";
import { CHAT_APP_SIGNUP_URL } from "@/lib/app-urls";
import { KPIS_TRACKER_FAQ } from "@/lib/marketing-faqs";
import { SITE_ROUTES } from "@/lib/site-links";
import { getProduct } from "@/lib/products";
import { PRODUCT_PAGE_CONTENT } from "@/lib/product-page-content";
import {
  DEMO_POSITIVE_TEXT_CLASS,
  DEMO_SUCCESS_PILL_CLASS,
  DEMO_LIVE_DOT_CLASS,
  ANALYTICS_DEMO_ANSWERED_BADGE_CLASS,
} from "@/components/visual/product-demos/analytics-demo";
import {
  KpiStatusLegend,
  ProductCapabilitiesGrid,
  ProductDeepDive,
  ProductHeroVisual,
  ProductHowItWorks,
  ProductStatsStrip,
} from "@/components/products/ProductPageSections";

const EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

function KpiDashboardVisual() {
  const kpis = [
    { label: "Sessions", value: "124.8K", status: "On track", tone: "brand" },
    { label: "Conversions", value: "3,412", status: "At risk", tone: "amber" },
    { label: "ROAS", value: "4.2×", status: "On track", tone: "brand" },
    { label: "CTR", value: "3.8%", status: "Off track", tone: "red" },
  ] as const;

  const toneClass = {
    brand: DEMO_SUCCESS_PILL_CLASS,
    amber: "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300",
    red: "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-300",
  };

  return (
    <div className="w-full p-3 space-y-2">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[9px] font-bold text-gray-500 dark:text-white/40 uppercase tracking-wider">
          KPI dashboard
        </span>
        <span className="text-[9px] text-brand-600 dark:text-brand-400 font-semibold">
          Monthly view
        </span>
      </div>
      <div className="grid grid-cols-2 gap-1.5">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className="rounded-xl border border-gray-100 dark:border-white/[0.07] bg-white dark:bg-brand-800 p-2.5"
          >
            <p className="text-[8px] font-semibold text-gray-400 dark:text-white/40 uppercase tracking-wide">
              {kpi.label}
            </p>
            <p className="text-sm font-black text-gray-900 dark:text-white mt-0.5">{kpi.value}</p>
            <span
              className={`inline-flex mt-1.5 rounded-full px-1.5 py-0.5 text-[8px] font-bold ${toneClass[kpi.tone]}`}
            >
              {kpi.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function GoalsVisual() {
  const goals = [
    { platform: "GA4", metric: "Sessions", target: "120K" },
    { platform: "GSC", metric: "Clicks", target: "45K" },
    { platform: "Ads", metric: "ROAS", target: "4.0×" },
  ];

  return (
    <div className="w-full p-3 space-y-2">
      {goals.map((goal) => (
        <div
          key={goal.metric}
          className="flex items-center gap-2.5 rounded-xl border border-gray-100 dark:border-white/[0.07] bg-gray-50 dark:bg-white/[0.04] px-2.5 py-2"
        >
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-100 dark:bg-brand-500/15 text-[8px] font-black text-brand-700 dark:text-brand-300">
            {goal.platform}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold text-gray-700 dark:text-white/75">{goal.metric}</p>
            <p className="text-[9px] text-gray-400 dark:text-white/40">Target: {goal.target}</p>
          </div>
          <CheckCircle2 className={`h-3.5 w-3.5 shrink-0 ${DEMO_POSITIVE_TEXT_CLASS}`} />
        </div>
      ))}
    </div>
  );
}

function HistoryVisual() {
  const points = [32, 38, 35, 44, 41, 52, 48, 58];
  const max = Math.max(...points);
  const pts = points.map((v, i) => `${(i / (points.length - 1)) * 100},${100 - (v / max) * 82}`).join(" ");

  return (
    <div className="w-full p-3 space-y-2">
      <div className="rounded-xl border border-gray-100 dark:border-white/[0.07] bg-gray-50 dark:bg-white/[0.04] p-2.5">
        <div className="mb-1.5 flex items-center justify-between">
          <span className="text-[9px] font-bold text-gray-500 dark:text-white/45 uppercase tracking-wider">
            6-month trend
          </span>
          <span className={`text-[10px] font-black ${DEMO_POSITIVE_TEXT_CLASS}`}>↑ 18%</span>
        </div>
        <svg viewBox="0 0 100 50" className="h-10 w-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="kpiTrend" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--brand-accent)" stopOpacity="0.2" />
              <stop offset="100%" stopColor="var(--brand-accent)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon points={`0,100 ${pts} 100,100`} fill="url(#kpiTrend)" />
          <polyline
            points={pts}
            fill="none"
            stroke="var(--brand-accent)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <p className="text-[9px] leading-relaxed text-gray-500 dark:text-white/50">
        Compare current period performance against goals and prior months in one view.
      </p>
    </div>
  );
}

const keyFeatures = [
  {
    icon: Gauge,
    title: "Unified KPI projects",
    description:
      "Create projects for each client or brand, connect GA4, Search Console, and Google Ads, and track the metrics that matter in one dashboard.",
    glow: "from-brand-400/10 to-violet-400/5",
    border: "border-brand-400/20 dark:border-brand-500/20",
    Visual: KpiDashboardVisual,
  },
  {
    icon: Target,
    title: "Goal-based tracking",
    description:
      "Set targets by platform and metric, then see on-track, at-risk, and off-track status at a glance.",
    glow: "from-brand-400/10 to-brand-300/5",
    border: "border-brand-400/20 dark:border-brand-500/20",
    Visual: GoalsVisual,
  },
  {
    icon: LineChart,
    title: "Historical performance",
    description:
      "Review the last six months of KPI history so you can spot trends early and act before goals slip.",
    glow: "from-blue-400/10 to-cyan-400/5",
    border: "border-blue-400/20 dark:border-blue-500/20",
    Visual: HistoryVisual,
  },
];

const benefits = [
  {
    icon: BarChart3,
    title: "Marketing-native metrics",
    description: "Track sessions, clicks, conversions, ROAS, and more from the platforms you already use.",
  },
  {
    icon: Target,
    title: "Clear accountability",
    description: "Give teams and clients a shared view of what is on track and what needs attention.",
  },
  {
    icon: Gauge,
    title: "Fast setup",
    description: "Connect OAuth accounts, pick metrics, set goals, and start monitoring in minutes.",
  },
];

export function KpisTrackerClient() {
  const kpiProduct = getProduct("kpis-tracker");
  const pageContent = PRODUCT_PAGE_CONTENT["kpis-tracker"];

  return (
    <>
      <section className="relative overflow-hidden px-4 pt-16 pb-8 hero-gradient sm:pt-20 sm:pb-10 md:pt-24 md:pb-12">
        <div className="absolute inset-0 grid-overlay opacity-[0.08] dark:opacity-[0.05] pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full blur-3xl bg-brand-600/10 dark:bg-brand-500/15 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold border mb-6 ${DEMO_SUCCESS_PILL_CLASS}`}
          >
            <span className={`w-2 h-2 rounded-full animate-pulse ${DEMO_LIVE_DOT_CLASS}`} aria-hidden />
            KPIs Tracker · {kpiProduct.appNavLabel}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease: EASE }}
            className="marketing-hero-title text-gray-900 dark:text-white mb-6"
          >
            {kpiProduct.heroTitleLine1}{" "}
            <span className={BRAND_HERO_GRADIENT_CLASS}>{kpiProduct.heroTitleLine2}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.2, ease: EASE }}
            className="text-lg text-gray-500 dark:text-white/70 mb-4 max-w-3xl mx-auto leading-relaxed"
          >
            {kpiProduct.description}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.3, ease: EASE }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href={CHAT_APP_SIGNUP_URL}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold btn-brand-primary shadow-xl shadow-brand-600/25 transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
            >
              Start tracking KPIs <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={SITE_ROUTES.contact}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold text-gray-700 dark:text-white/85 border-2 border-gray-300 dark:border-white/20 bg-white/60 dark:bg-white/[0.04] hover:bg-white dark:hover:bg-white/[0.08] hover:border-brand-400 dark:hover:border-brand-400/50 backdrop-blur-sm transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
            >
              Book a Demo
            </a>
          </motion.div>
        </div>

        <ProductHeroVisual variant="kpis" />
      </section>

      <ProductStatsStrip stats={pageContent.stats} />

      <ProductHowItWorks steps={pageContent.howItWorks} />

      <section className="py-8 md:py-12 px-4 bg-[#f0f1f5] dark:bg-brand-900">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="text-center mb-8"
          >
            <span className="brand-eyebrow inline-block mb-4">
              Core features
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
              Know which KPIs need attention
            </h2>
          </motion.div>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {keyFeatures.map((feature) => (
              <motion.div
                key={feature.title}
                variants={fadeUp}
                className="relative flex flex-col rounded-2xl overflow-hidden bg-white dark:bg-brand-800 border border-gray-100 dark:border-white/[0.07] shadow-sm hover:shadow-xl dark:hover:shadow-black/50 hover:-translate-y-1 transition-all duration-300"
              >
                <div
                  className={`absolute -top-10 -right-10 w-36 h-36 rounded-full bg-gradient-to-br ${feature.glow} blur-2xl opacity-80 pointer-events-none`}
                />
                <div className="relative z-10 border-b border-gray-100 dark:border-white/[0.06] min-h-[190px] flex flex-col">
                  <feature.Visual />
                </div>
                <div className="relative z-10 p-5">
                  <div
                    className={`inline-flex items-center gap-1.5 mb-3 px-2.5 py-1 rounded-lg border ${feature.border} bg-gradient-to-br ${feature.glow}`}
                  >
                    <feature.icon className="w-3.5 h-3.5 text-gray-600 dark:text-white/60" />
                  </div>
                  <h3 className="text-gray-900 dark:text-white font-bold text-base mb-1.5 leading-snug">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500 dark:text-white/60 text-xs leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <ProductCapabilitiesGrid
        title={pageContent.capabilityTitle}
        subtitle={pageContent.capabilitySubtitle}
        capabilities={pageContent.capabilities}
      />

      <ProductDeepDive
        title={pageContent.deepDiveTitle}
        subtitle={pageContent.deepDiveSubtitle}
        bullets={pageContent.deepDiveBullets}
        visual={<KpiStatusLegend />}
        reverse
      />

      <section className="py-8 md:py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-2xl border border-gray-100 dark:border-white/[0.07] bg-white dark:bg-brand-800 p-6 shadow-sm"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-300">
                  <benefit.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{benefit.title}</h3>
                <p className="text-sm leading-relaxed text-gray-500 dark:text-white/60">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Pricing />

      <ProductSuiteLinks current="kpis-tracker" />

      <MarketingFaqSection
        items={KPIS_TRACKER_FAQ}
        title="KPI Tracker FAQ"
        subtitle="Answers about GA4, Search Console, and Google Ads goal tracking, keyword rankings, and KPI dashboards."
      />

      <CTA
        title="Start tracking the KPIs that matter"
        subtitle="Connect your marketing accounts, set goals, and monitor performance from one dashboard."
        primaryCta={{ label: "Get Started", href: CHAT_APP_SIGNUP_URL }}
        secondaryCta={{ label: "Book a Demo", href: SITE_ROUTES.contact }}
      />
    </>
  );
}

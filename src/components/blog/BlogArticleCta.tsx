import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BRAND_PRIMARY_BUTTON_CLASS, BRAND_SECONDARY_BUTTON_CLASS } from "@/lib/brand";
import { CHAT_APP_SIGNUP_URL } from "@/lib/app-urls";
import { SITE_ROUTES } from "@/lib/site-links";

type CtaConfig = { title: string; description: string; href: string; label: string; secondaryHref?: string; secondaryLabel?: string };

const SLUG_CTA: Record<string, CtaConfig> = {
  "ga4-traffic-drop-search-console": {
    title: "Segment your traffic drop in one scoped chat",
    description:
      "Split GA4 by channel, device, browser, country, and landing page—six manual explorations or one natural-language question in Conalytic.",
    href: CHAT_APP_SIGNUP_URL,
    label: "Diagnose with Chats",
    secondaryHref: SITE_ROUTES.products.conversationalAnalytics,
    secondaryLabel: "See Conversational Analytics",
  },
  "google-ads-ga4-conversion-discrepancy": {
    title: "Hold Ads and GA4 in one view",
    description:
      "Cross-source answers require both platforms in scope. Ask which campaigns drive the gap and what to document on your methodology slide.",
    href: CHAT_APP_SIGNUP_URL,
    label: "Compare sources free",
    secondaryHref: SITE_ROUTES.products.reportBuilder,
    secondaryLabel: "Report Builder",
  },
  "what-to-ask-ga4-data": {
    title: "Ask your first GA4 question in plain English",
    description:
      "Connect GA4, scope a chat to one property, and run the standup and client-call questions from this guide against live data.",
    href: CHAT_APP_SIGNUP_URL,
    label: "Start chatting",
  },
  "tracking-ai-assistant-traffic-ga4": {
    title: "Query AI traffic by channel, device, and landing page",
    description:
      "Multi-dimension GA4 questions are tedious in Explorations and fast in marketing data chat. Test share-of-session reporting on your property.",
    href: CHAT_APP_SIGNUP_URL,
    label: "Try Chats free",
  },
  "html-vs-pdf-live-dashboard-reports": {
    title: "Ship your first HTML client report",
    description:
      "Generate a shareable in-browser deck from GA4, GSC, and Google Ads—no download required for clients, full fidelity for stakeholders.",
    href: CHAT_APP_SIGNUP_URL,
    label: "Build HTML report",
    secondaryHref: SITE_ROUTES.products.reportBuilder,
    secondaryLabel: "How Report Builder works",
  },
  "should-ai-write-client-reports": {
    title: "Deterministic findings, generative narration",
    description:
      "Conalytic Report Builder uses rule-based cross-source detectors for findings and optional AI for commentary—run the human checklist, then generate.",
    href: CHAT_APP_SIGNUP_URL,
    label: "Generate a report",
  },
  "client-marketing-report-structure": {
    title: "Use the 12-slide structure in Report Builder",
    description:
      "Executive summary, health check, KPI snapshot, platform sections, cross-source findings, methodology, and action plan—automated from connected data.",
    href: CHAT_APP_SIGNUP_URL,
    label: "Create client deck",
  },
  "cross-channel-reporting-gsc-ga4-ads": {
    title: "See cross-source patterns in your reports",
    description:
      "Rule-based detectors surface brand paid cannibalisation, CTR erosion, and Ads/GA4 conversion divergence—deterministic, not LLM-guessed.",
    href: CHAT_APP_SIGNUP_URL,
    label: "Try Report Builder",
  },
  "marketing-kpi-targets-goal-setting": {
    title: "Set direction-aware targets in KPIs Tracker",
    description:
      "Define increase and decrease goals with comparison windows, seasonality context, and status labels clients can trust in every meeting.",
    href: CHAT_APP_SIGNUP_URL,
    label: "Open KPIs Tracker",
    secondaryHref: SITE_ROUTES.products.kpisTracker,
    secondaryLabel: "Product overview",
  },
  "rules-based-vs-ai-kpi-status": {
    title: "Reproducible KPI status on every refresh",
    description:
      "On track, at risk, off track, and no data—rules-based scoring that returns the same label for the same inputs. AI explains; rules decide.",
    href: CHAT_APP_SIGNUP_URL,
    label: "Track KPIs free",
  },
};

const PRODUCT_CTA: Record<string, CtaConfig> = {
  "Conversational Analytics": {
    title: "Try Conversational Analytics free",
    description: "Connect GA4, Search Console, Google Ads, GTM, or Meta and ask your first question in plain English.",
    href: CHAT_APP_SIGNUP_URL,
    label: "Start chatting",
  },
  "KPIs Tracker": {
    title: "Start tracking your marketing KPIs",
    description: "Create a KPI project, set goals across GA4, GSC, and Google Ads, and see on-track status in one dashboard.",
    href: CHAT_APP_SIGNUP_URL,
    label: "Open KPIs Tracker",
  },
  "Report Builder": {
    title: "Generate your first HTML report",
    description: "Connect your data sources, pick a date range, and ship a client-ready presentation deck in minutes.",
    href: CHAT_APP_SIGNUP_URL,
    label: "Build a report",
  },
};

export function BlogArticleCta({ category, slug }: { category: string; slug?: string }) {
  const defaultCta: CtaConfig = {
    title: "Explore Conalytic",
    description: "Chat with your marketing data, track KPI goals, and generate HTML client reports — all in one platform.",
    href: CHAT_APP_SIGNUP_URL,
    label: "Get started free",
  };

  const cta =
    (slug ? SLUG_CTA[slug] : undefined) ?? PRODUCT_CTA[category] ?? defaultCta;

  return (
    <aside className="mt-14 rounded-2xl border border-brand-200/80 bg-gradient-to-br from-brand-50 via-white to-brand-50/40 p-8 dark:border-brand-500/25 dark:from-brand-500/10 dark:via-[#14141B] dark:to-brand-500/5">
      <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-brand-600 dark:text-brand-300">
        Next step
      </p>
      <h2 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">{cta.title}</h2>
      <p className="mb-6 max-w-xl text-base leading-relaxed text-gray-600 dark:text-white/65">{cta.description}</p>
      <div className="flex flex-wrap gap-3">
        <a href={cta.href} target="_blank" rel="noopener noreferrer" className={BRAND_PRIMARY_BUTTON_CLASS}>
          {cta.label}
          <ArrowRight className="h-4 w-4" />
        </a>
        {cta.secondaryHref ? (
          <Link href={cta.secondaryHref} className={BRAND_SECONDARY_BUTTON_CLASS}>
            {cta.secondaryLabel ?? "Learn more"}
          </Link>
        ) : (
          <Link href={SITE_ROUTES.blogs} className={BRAND_SECONDARY_BUTTON_CLASS}>
            More articles
          </Link>
        )}
      </div>
    </aside>
  );
}

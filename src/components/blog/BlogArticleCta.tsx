import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BRAND_PRIMARY_BUTTON_CLASS, BRAND_SECONDARY_BUTTON_CLASS } from "@/lib/brand";
import { CHAT_APP_SIGNUP_URL } from "@/lib/app-urls";
import { SITE_ROUTES } from "@/lib/site-links";

const PRODUCT_CTA: Record<string, { title: string; description: string; href: string; label: string }> = {
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

export function BlogArticleCta({ category }: { category: string }) {
  const cta = PRODUCT_CTA[category] ?? {
    title: "Explore Conalytic",
    description: "Chat with your marketing data, track KPI goals, and generate HTML client reports — all in one platform.",
    href: CHAT_APP_SIGNUP_URL,
    label: "Get started free",
  };

  return (
    <aside className="mt-14 rounded-2xl border border-brand-200/80 bg-gradient-to-br from-brand-50 via-white to-brand-50/40 p-8 dark:border-brand-500/25 dark:from-brand-500/10 dark:via-[#14141B] dark:to-brand-500/5">
      <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-brand-600 dark:text-brand-300">
        Next step
      </p>
      <h2 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">{cta.title}</h2>
      <p className="mb-6 max-w-xl text-base leading-relaxed text-gray-600 dark:text-white/65">
        {cta.description}
      </p>
      <div className="flex flex-wrap gap-3">
        <a
          href={cta.href}
          target="_blank"
          rel="noopener noreferrer"
          className={BRAND_PRIMARY_BUTTON_CLASS}
        >
          {cta.label}
          <ArrowRight className="h-4 w-4" />
        </a>
        <Link href={SITE_ROUTES.blogs} className={BRAND_SECONDARY_BUTTON_CLASS}>
          More articles
        </Link>
      </div>
    </aside>
  );
}

"use client";

/** Home pricing tiers; enterprise path points to `/contact`; monthly framing per product copy. */
import Link from "next/link";
import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const PLANS = [
  {
    id: "plus",
    name: "Conalytic Plus",
    badge: null,
    monthlyPrice: 20,
    description: "Perfect for individuals and small teams starting with AI-powered analytics.",
    features: [
      "Up to 3 users",
      "Connect 2 data sources",
      "500 queries / month",
      "GA4 & Google Ads",
      "Email support",
      "7-day data history",
    ],
    cta: "Get started",
    ctaHref: "https://app.conalytic.com/signup",
    featured: false,
    isEnterprise: false,
  },
  {
    id: "pro",
    name: "Conalytic Pro",
    badge: "Most Popular",
    monthlyPrice: 50,
    description: "For growing teams that need unlimited analytics and deeper integrations.",
    features: [
      "Up to 15 users",
      "Connect unlimited sources",
      "Unlimited queries",
      "All integrations + BigQuery",
      "Priority support + Slack",
      "12-month data history",
      "Custom dashboards",
      "Advanced AI models",
    ],
    cta: "Get started",
    ctaHref: "https://app.conalytic.com/signup",
    featured: true,
    isEnterprise: false,
  },
  {
    id: "enterprise",
    name: "Conalytic Enterprise",
    badge: null,
    monthlyPrice: null,
    description: "Custom solutions for large organizations with complex data infrastructure needs.",
    features: [
      "Unlimited users",
      "Dedicated infrastructure",
      "Custom integrations",
      "White-label options",
      "SLA guarantee",
      "Dedicated account manager",
      "SSO / SAML",
      "On-premise deployment",
    ],
    cta: "Raise a Quote",
    ctaHref: "/contact",
    featured: false,
    isEnterprise: true,
  },
];

export interface PricingContent {
  eyebrow?: string;
  title?: string;
}

export function Pricing({ content }: { content?: PricingContent }) {
  return (
    <section
      id="pricing"
      className="scroll-mt-28 py-12 md:py-24 px-4 bg-white dark:bg-[#0C0C12]"
    >
      <div className="max-w-5xl mx-auto">

        <motion.div
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="text-center mb-12"
        >
          <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-300 border border-brand-100 dark:border-brand-500/20 mb-4">
            {content?.eyebrow || "Pricing"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            {content?.title || "Simple, transparent pricing"}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 items-stretch">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.08 }}
              transition={{ duration: 0.65, delay: i * 0.1, ease: EASE }}
              className={`relative rounded-2xl p-7 flex flex-col ${
                plan.featured
                  ? "bg-white dark:bg-[#16161D] border-2 border-brand-500 dark:border-brand-500/50 shadow-xl shadow-brand-500/10 dark:shadow-brand-500/15"
                  : plan.isEnterprise
                  ? "bg-[#F8F7FF] dark:bg-[#13131E] border border-brand-100 dark:border-brand-500/15"
                  : "bg-white dark:bg-[#14141B] border border-gray-100 dark:border-white/[0.07] shadow-sm"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-bold bg-brand-600 text-white uppercase tracking-widest whitespace-nowrap shadow-md shadow-brand-600/25">
                  {plan.badge}
                </div>
              )}

              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-white/40 mb-3">
                {plan.name}
              </p>

              <div className="flex items-end gap-1 mb-1 min-h-[56px]">
                {plan.isEnterprise ? (
                  <div className="flex flex-col justify-center">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white leading-tight">Custom</span>
                    <span className="text-xs text-gray-400 dark:text-white/40 mt-1">tailored to your needs</span>
                  </div>
                ) : (
                  <>
                    <span className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
                      ${plan.monthlyPrice}
                    </span>
                    <span className="text-sm text-gray-400 dark:text-white/40 mb-2">/mo</span>
                  </>
                )}
              </div>

              <p className="text-sm text-gray-500 dark:text-white/65 mb-6 leading-relaxed">
                {plan.description}
              </p>

              <div className="flex flex-col gap-3 mb-8">
                {plan.features.map(f => (
                  <div key={f} className="flex items-center gap-2.5">
                    <svg
                      className={plan.featured ? "text-brand-500" : plan.isEnterprise ? "text-brand-400" : "text-brand-600 dark:text-brand-400"}
                      width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="text-sm text-gray-600 dark:text-white/72">{f}</span>
                  </div>
                ))}
              </div>

              {plan.ctaHref.startsWith("http") ? (
                <a
                  href={plan.ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${plan.cta} — ${plan.name} (opens in new tab)`}
                  className={`mt-auto block text-center py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
                    plan.featured
                      ? "bg-brand-600 text-white hover:bg-brand-700 shadow-lg shadow-brand-600/20"
                      : plan.isEnterprise
                      ? "bg-transparent text-brand-600 dark:text-brand-300 border-2 border-brand-500/40 dark:border-brand-500/30 hover:bg-brand-50 dark:hover:bg-brand-500/10"
                      : "bg-gray-900 dark:bg-brand-600 text-white dark:text-white hover:bg-gray-800 dark:hover:bg-brand-700 border border-gray-800 dark:border-transparent shadow-md dark:shadow-brand-600/20"
                  }`}
                >
                  {plan.cta}
                </a>
              ) : (
                <Link
                  href={plan.ctaHref}
                  aria-label={`${plan.cta} — ${plan.name}`}
                  className={`mt-auto block text-center py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
                    plan.featured
                      ? "bg-brand-600 text-white hover:bg-brand-700 shadow-lg shadow-brand-600/20"
                      : plan.isEnterprise
                      ? "bg-transparent text-brand-600 dark:text-brand-300 border-2 border-brand-500/40 dark:border-brand-500/30 hover:bg-brand-50 dark:hover:bg-brand-500/10"
                      : "bg-gray-900 dark:bg-brand-600 text-white dark:text-white hover:bg-gray-800 dark:hover:bg-brand-700 border border-gray-800 dark:border-transparent shadow-md dark:shadow-brand-600/20"
                  }`}
                >
                  {plan.cta}
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

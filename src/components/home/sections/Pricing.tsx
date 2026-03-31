"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const PLANS = [
  {
    name: "Starter",
    monthlyPrice: 49,
    annualPrice: 39,
    description: "Perfect for small teams getting started with conversational analytics.",
    features: [
      "Up to 5 users",
      "Connect 3 data sources",
      "1,000 queries / month",
      "GA4, Google Ads, Meta",
      "Email support",
      "7-day data history",
    ],
    cta: "Start free trial",
    featured: false,
  },
  {
    name: "Pro",
    monthlyPrice: 149,
    annualPrice: 119,
    description: "For growing teams that need unlimited access and deeper integrations.",
    features: [
      "Unlimited users",
      "Connect unlimited sources",
      "Unlimited queries",
      "All integrations + BigQuery",
      "Priority support + Slack",
      "12-month data history",
      "Custom dashboards",
      "SSO / SAML",
    ],
    cta: "Start free trial",
    featured: true,
  },
];

export function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section className="py-24 px-4 bg-white dark:bg-[#0C0C12]">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE }}
          className="text-center mb-12"
        >
          <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-300 border border-brand-100 dark:border-brand-500/20 mb-4">
            Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8">
            Simple, transparent pricing
          </h2>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 bg-gray-50 dark:bg-[#18181F] border border-gray-100 dark:border-white/[0.07] rounded-full px-5 py-2.5">
            <span className={`text-sm font-medium transition-colors ${!annual ? "text-gray-900 dark:text-white" : "text-gray-400 dark:text-white/35"}`}>
              Monthly
            </span>

            {/* Toggle pill */}
            <button
              onClick={() => setAnnual(a => !a)}
              role="switch"
              aria-checked={annual}
              className={`relative w-11 h-6 rounded-full transition-colors duration-300 focus:outline-none ${annual ? "bg-brand-600" : "bg-gray-200 dark:bg-white/15"}`}
            >
              <span
                className="absolute top-[3px] left-[3px] w-[18px] h-[18px] rounded-full bg-white shadow transition-transform duration-300"
                style={{ transform: annual ? "translateX(20px)" : "translateX(0)" }}
              />
            </button>

            <span className={`text-sm font-medium transition-colors ${annual ? "text-gray-900 dark:text-white" : "text-gray-400 dark:text-white/35"}`}>
              Annual
              <span className="ml-1.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-1.5 py-0.5 rounded-full border border-emerald-100 dark:border-emerald-500/20">
                Save 20%
              </span>
            </span>
          </div>
        </motion.div>

        {/* Plan cards */}
        <div className="grid md:grid-cols-2 gap-6 items-start">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.65, delay: i * 0.1, ease: EASE }}
              className={`relative rounded-2xl p-7 ${
                plan.featured
                  ? "bg-white dark:bg-[#16161D] border-2 border-brand-500 dark:border-brand-500/50 shadow-xl shadow-brand-500/10 dark:shadow-brand-500/15"
                  : "bg-white dark:bg-[#14141B] border border-gray-100 dark:border-white/[0.07] shadow-sm"
              }`}
            >
              {/* Most popular badge */}
              {plan.featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-bold bg-brand-600 text-white uppercase tracking-widest whitespace-nowrap shadow-md shadow-brand-600/25">
                  Most popular
                </div>
              )}

              {/* Plan name */}
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-white/40 mb-3">
                {plan.name}
              </p>

              {/* Price */}
              <div className="flex items-end gap-1 mb-1">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={annual ? "annual" : "monthly"}
                    initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white"
                  >
                    ${annual ? plan.annualPrice : plan.monthlyPrice}
                  </motion.span>
                </AnimatePresence>
                <span className="text-sm text-gray-400 dark:text-white/40 mb-2">/mo</span>
              </div>

              {annual && (
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mb-3">
                  Billed annually · Save ${(plan.monthlyPrice - plan.annualPrice) * 12}/yr
                </p>
              )}

              <p className="text-sm text-gray-500 dark:text-white/50 mb-7 leading-relaxed">
                {plan.description}
              </p>

              {/* CTA */}
              <a
                href="https://app.conalytic.com/signup"
                target="_blank"
                rel="noopener noreferrer"
                className={`block text-center py-3.5 rounded-xl text-sm font-semibold mb-7 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
                  plan.featured
                    ? "bg-brand-600 text-white hover:bg-brand-700 shadow-lg shadow-brand-600/20"
                    : "bg-gray-900 dark:bg-brand-600/15 text-white dark:text-brand-300 hover:bg-gray-800 dark:hover:bg-brand-600/25 border border-gray-800 dark:border-brand-500/25"
                }`}
              >
                {plan.cta}
              </a>

              {/* Features */}
              <div className="flex flex-col gap-3">
                {plan.features.map(f => (
                  <div key={f} className="flex items-center gap-2.5">
                    <svg
                      className={plan.featured ? "text-brand-500" : "text-brand-600 dark:text-brand-400"}
                      width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="text-sm text-gray-600 dark:text-white/60">{f}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <p className="text-center text-sm text-gray-400 dark:text-white/30 mt-8">
          All plans include a 14-day free trial. No credit card required.
        </p>
      </div>
    </section>
  );
}

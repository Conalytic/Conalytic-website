"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Check,
  Coins,
  MessageSquare,
  Sparkles,
  Zap,
} from "lucide-react";
import { BRAND_HERO_GRADIENT_CLASS } from "@/lib/brand";
import { DEMO_POSITIVE_TEXT_CLASS } from "@/components/visual/product-demos/analytics-demo";
import { CTA } from "@/components/sections/CTA";
import { MarketingFaqSection } from "@/components/sections/MarketingFaqSection";
import { CHAT_APP_SIGNUP_URL } from "@/lib/app-urls";
import { SITE_ROUTES } from "@/lib/site-links";
import {
  FREE_SIGNUP_TOKENS_LABEL,
  PRICING_PLANS,
  TOKEN_HOW_IT_WORKS,
} from "@/lib/pricing-data";
import { PRICING_PAGE_FAQ } from "@/lib/marketing-faqs";

const EASE = [0.22, 1, 0.36, 1] as const;

function PlanCta({
  href,
  label,
  featured,
  isEnterprise,
}: {
  href: string;
  label: string;
  featured: boolean;
  isEnterprise: boolean;
}) {
  const className = featured
    ? "btn-brand-primary shadow-lg shadow-brand-600/25"
    : isEnterprise
      ? "border-2 border-brand-600/25 text-brand-700 dark:border-brand-500/30 dark:text-brand-300 hover:bg-brand-50 dark:hover:bg-brand-500/10"
      : "btn-brand-primary shadow-md";

  if (href.startsWith("http")) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-auto block text-center py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] ${className}`}
      >
        {label}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={`mt-auto block text-center py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] ${className}`}
    >
      {label}
    </Link>
  );
}

export function PricingClient() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden px-4 pt-16 pb-8 hero-gradient sm:pt-20 sm:pb-10 md:pt-24 md:pb-12">
        <div className="absolute inset-0 grid-overlay opacity-[0.08] dark:opacity-[0.05] pointer-events-none" />
        <div
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[420px] rounded-full blur-3xl bg-brand-600/12 dark:bg-brand-600/18"
          aria-hidden
        />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="brand-eyebrow inline-flex items-center gap-2 mb-6"
          >
            <Coins className="w-3.5 h-3.5" aria-hidden />
            Pricing
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.08, ease: EASE }}
            className="marketing-hero-title text-gray-900 dark:text-white mb-6"
          >
            Start free.{" "}
            <span className={BRAND_HERO_GRADIENT_CLASS}>Scale with tokens.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.16, ease: EASE }}
            className="text-lg sm:text-xl text-gray-500 dark:text-white/70 max-w-2xl mx-auto leading-relaxed"
          >
            Every account starts with{" "}
            <strong className="font-semibold text-gray-800 dark:text-white/90">
              {FREE_SIGNUP_TOKENS_LABEL} tokens
            </strong>
            . Use them for AI chat and insights. Top up in the app whenever you need more — no
            subscription required.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.24, ease: EASE }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <a
              href={CHAT_APP_SIGNUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-brand-primary inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold shadow-xl shadow-brand-600/25"
            >
              Get started free
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
            <a
              href="#how-tokens-work"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white/80 px-6 py-3.5 text-sm font-semibold text-gray-800 backdrop-blur dark:border-white/[0.12] dark:bg-brand-800/80 dark:text-white"
            >
              How tokens work
            </a>
          </motion.div>
        </div>
      </section>

      {/* Plans */}
      <section className="py-8 md:py-12 px-4 bg-white dark:bg-brand-900">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 items-stretch">
            {PRICING_PLANS.map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: i * 0.08, ease: EASE }}
                className={`relative flex flex-col rounded-2xl p-8 ${
                  plan.featured
                    ? "border-2 border-brand-500 dark:border-brand-500/50 bg-white dark:bg-brand-800 shadow-xl shadow-brand-500/10"
                    : "border border-gray-100 dark:border-white/[0.08] bg-[#f8f7ff] dark:bg-brand-900"
                }`}
              >
                {plan.badge ? (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-bold demo-user-bubble uppercase tracking-widest shadow-md">
                    {plan.badge}
                  </div>
                ) : null}
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-white/40 mb-2">
                  {plan.name}
                </p>
                <p className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {plan.priceLabel}
                </p>
                <p className="mt-1 text-sm font-medium text-brand-600 dark:text-brand-400">
                  {plan.priceSubtext}
                </p>
                <p className="mt-4 text-sm text-gray-500 dark:text-white/65 leading-relaxed">
                  {plan.description}
                </p>
                <ul className="mt-6 flex flex-col gap-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-white/72">
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-brand-500"
                        strokeWidth={2.5}
                        aria-hidden
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <PlanCta
                  href={plan.ctaHref}
                  label={plan.cta}
                  featured={plan.featured}
                  isEnterprise={plan.isEnterprise}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How tokens work */}
      <section
        id="how-tokens-work"
        className="scroll-mt-28 py-8 md:py-12 px-4 bg-[#f0f1f5] dark:bg-brand-900"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              How tokens work
            </h2>
            <p className="mt-3 text-gray-500 dark:text-white/60 max-w-2xl mx-auto">
              Tokens are credits for AI-powered features. Sign up free, use your balance, and top up
              when you&apos;re ready for more.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 mb-8">
            {TOKEN_HOW_IT_WORKS.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
                className="rounded-2xl border border-gray-100 bg-white p-6 dark:border-white/[0.08] dark:bg-brand-800"
              >
                <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
                  Step {item.step}
                </span>
                <h3 className="mt-2 text-lg font-bold text-gray-900 dark:text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-white/60 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Token balance card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="relative overflow-hidden rounded-2xl border border-brand-200/80 bg-white p-8 dark:border-brand-500/20 dark:bg-brand-800 shadow-lg"
          >
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand-500/10 blur-3xl"
              aria-hidden
            />
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div>
                <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400 mb-2">
                  <Sparkles className="h-5 w-5" aria-hidden />
                  <span className="text-sm font-semibold uppercase tracking-wide">Free signup bonus</span>
                </div>
                <p className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white tabular-nums">
                  {FREE_SIGNUP_TOKENS_LABEL}
                </p>
                <p className="mt-2 text-sm text-gray-500 dark:text-white/55">
                  tokens included when you create your account — enough to explore chat, reports, and
                  integrations.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:min-w-[220px]">
                <div className="flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3 dark:bg-white/[0.04]">
                  <MessageSquare className="h-5 w-5 text-brand-500" aria-hidden />
                  <span className="text-sm text-gray-700 dark:text-white/75">AI chat queries</span>
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3 dark:bg-white/[0.04]">
                  <BarChart3 className="h-5 w-5 text-brand-500" aria-hidden />
                  <span className="text-sm text-gray-700 dark:text-white/75">Report AI insights</span>
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-brand-50 px-4 py-3 dark:bg-brand-500/10">
                  <Zap className={`h-5 w-5 ${DEMO_POSITIVE_TEXT_CLASS}`} aria-hidden />
                  <span className="text-sm text-gray-700 dark:text-white/75">KPI Tracker — no token cost</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <MarketingFaqSection items={PRICING_PAGE_FAQ} id="pricing-faq" />

      <CTA
        title="Ready to start for free?"
        subtitle={`Join Conalytic with ${FREE_SIGNUP_TOKENS_LABEL} signup tokens. Connect your marketing data and ask your first question in minutes.`}
        primaryCta={{ label: "Get started free", href: CHAT_APP_SIGNUP_URL }}
        secondaryCta={{ label: "Talk to sales", href: SITE_ROUTES.contact }}
      />
    </>
  );
}

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { CTA } from "@/components/sections/CTA";
import { BRAND_HERO_GRADIENT_CLASS } from "@/lib/brand";
import { SERVICES_BASE_PATH, type ServiceDefinition } from "@/lib/services-catalog";
import { SITE_ROUTES } from "@/lib/site-links";

const EASE = [0.22, 1, 0.36, 1] as const;

type ServicePageClientProps = {
  service: ServiceDefinition;
};

export function ServicePageClient({ service }: ServicePageClientProps) {
  return (
    <>
      <section className="marketing-hero-section-pt relative overflow-hidden px-4 hero-gradient md:pb-14">
        <div className="absolute inset-0 grid-overlay pointer-events-none opacity-[0.08] dark:opacity-[0.05]" />
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <motion.p
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE }}
            className="brand-eyebrow mb-5 inline-flex"
          >
            Conalytic Services
          </motion.p>
          <motion.h1
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.05, ease: EASE }}
            className="marketing-hero-title mb-6 text-gray-900 dark:text-white"
          >
            <span className={BRAND_HERO_GRADIENT_CLASS}>{service.title}</span>
          </motion.h1>
          <motion.p
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.12, ease: EASE }}
            className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-500 dark:text-white/70"
          >
            {service.heroSubtitle}
          </motion.p>
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <Link href={SITE_ROUTES.contact} className="btn-brand-primary inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold">
              Book a consultation
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href={SERVICES_BASE_PATH}
              className="rounded-xl border border-gray-200 bg-white/70 px-6 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-white dark:border-white/15 dark:bg-white/5 dark:text-white/80 dark:hover:bg-white/10"
            >
              All services
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="bg-white px-4 py-12 dark:bg-brand-900 md:py-16">
        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">What we focus on</h2>
            <ul className="space-y-3">
              {service.highlights.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-gray-600 dark:text-white/72">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-500" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="glass-card rounded-2xl p-6 md:p-8">
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Typical deliverables</h2>
            <ul className="space-y-2.5 text-sm text-gray-600 dark:text-white/72">
              {service.deliverables.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-brand-500" aria-hidden>
                    •
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CTA
        title="Let's scope your project"
        subtitle="Tell us about your goals — we'll recommend a roadmap and how Conalytic software fits in."
        primaryCta={{ label: "Contact us", href: SITE_ROUTES.contact }}
        secondaryCta={{ label: "Explore the platform", href: SITE_ROUTES.features }}
      />
    </>
  );
}

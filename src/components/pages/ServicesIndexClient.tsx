"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { BRAND_HERO_GRADIENT_CLASS } from "@/lib/brand";
import { SERVICE_CATALOG, servicePath } from "@/lib/services-catalog";
import { SITE_ROUTES } from "@/lib/site-links";

const EASE = [0.22, 1, 0.36, 1] as const;

export function ServicesIndexClient() {
  return (
    <>
      <section className="marketing-hero-section-pt relative overflow-hidden px-4 hero-gradient">
        <div className="absolute inset-0 grid-overlay pointer-events-none opacity-[0.08] dark:opacity-[0.05]" />
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <motion.h1
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE }}
            className="marketing-hero-title mb-5 text-gray-900 dark:text-white"
          >
            <span className={BRAND_HERO_GRADIENT_CLASS}>Services</span> for modern marketing teams
          </motion.h1>
          <motion.p
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease: EASE }}
            className="text-lg text-gray-500 dark:text-white/70"
          >
            Strategy, implementation, and AI-ready engineering — from SEO and paid media to MCP servers and marketing sites.
          </motion.p>
        </div>
      </section>

      <section className="bg-white px-4 py-12 dark:bg-brand-900 md:py-16">
        <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2">
          {SERVICE_CATALOG.map((service) => (
            <Link
              key={service.slug}
              href={servicePath(service.slug)}
              className="glass-card group flex flex-col gap-2 rounded-2xl p-6 transition-all hover:border-brand-500/30 hover:shadow-lg"
            >
              <span className="text-lg font-semibold text-gray-900 group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-300">
                {service.title}
              </span>
              <span className="text-sm leading-relaxed text-gray-500 dark:text-white/60">{service.navDescription}</span>
              <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-brand-600 dark:text-brand-400">
                Learn more
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </span>
            </Link>
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-xl text-center text-sm text-gray-500 dark:text-white/55">
          Not sure where to start?{" "}
          <Link href={SITE_ROUTES.contact} className="font-semibold text-brand-600 hover:underline dark:text-brand-400">
            Book a demo
          </Link>{" "}
          and we&apos;ll map services to your stack.
        </p>
      </section>
    </>
  );
}

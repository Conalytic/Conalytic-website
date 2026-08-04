"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MessageSquare, LineChart, FileText } from "lucide-react";
import { SITE_ROUTES } from "@/lib/site-links";

const EASE = [0.22, 1, 0.36, 1] as const;

const PRODUCTS = [
  {
    title: "Conversational Analytics",
    desc: "Scoped chats across GA4, GSC, Google Ads, GTM, and Meta with inline charts and live API data.",
    href: SITE_ROUTES.products.conversationalAnalytics,
    icon: MessageSquare,
    stat: "Plain English",
    statSub: "No SQL required",
  },
  {
    title: "KPIs Tracker",
    desc: "Set increase/decrease goals and see On track, At risk, or Off track with six months of history.",
    href: SITE_ROUTES.products.kpisTracker,
    icon: LineChart,
    stat: "3 platforms",
    statSub: "One dashboard",
  },
  {
    title: "Report Builder",
    desc: "Multi-slide HTML decks with executive summary, platform sections, and optional AI narratives.",
    href: SITE_ROUTES.products.reportBuilder,
    icon: FileText,
    stat: "Client-ready",
    statSub: "HTML exports",
  },
];

export function HomeProducts({ content }: { content?: { servicesTitleLine1?: string; servicesTitleLine2?: string } }) {
  return (
    <section className="border-y border-gray-200/80 bg-white py-8 dark:border-white/[0.06] dark:bg-brand-900 sm:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-8 max-w-2xl"
        >
          <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-brand-600 dark:text-brand-300">
            Platform
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            {content?.servicesTitleLine1 || "Three products."}{" "}
            <span className="text-gray-500 dark:text-white/50">
              {content?.servicesTitleLine2 || "One marketing workflow."}
            </span>
          </h2>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-3">
          {PRODUCTS.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: EASE }}
              >
                <Link
                  href={p.href}
                  className="group flex h-full flex-col rounded-2xl border border-gray-200/80 bg-[#f0f1f5] p-6 transition-all hover:border-brand-400 hover:shadow-lg dark:border-white/[0.08] dark:bg-brand-800 dark:hover:border-brand-500/40 hover-lift"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl demo-user-bubble">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">{p.title}</h3>
                  <p className="mb-6 flex-1 text-sm leading-relaxed text-gray-600 dark:text-white/60">{p.desc}</p>
                  <div className="mb-5 rounded-xl border border-gray-200/80 bg-white px-4 py-3 dark:border-white/[0.08] dark:bg-white/[0.03]">
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{p.stat}</p>
                    <p className="text-xs text-gray-500 dark:text-white/45">{p.statSub}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 dark:text-brand-300">
                    Explore
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

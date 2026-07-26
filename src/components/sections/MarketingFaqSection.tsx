"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Accordion } from "@/components/ui/Accordion";
import type { MarketingFaqItem } from "@/lib/marketing-faqs";
import { SITE_ROUTES } from "@/lib/site-links";

const EASE = [0.22, 1, 0.36, 1] as const;

type MarketingFaqSectionProps = {
  items: MarketingFaqItem[];
  title?: string;
  subtitle?: string;
  id?: string;
};

/** Visible FAQ accordion — pair with FaqStructuredData for matching JSON-LD. */
export function MarketingFaqSection({
  items,
  title = "Frequently asked questions",
  subtitle = "Answers about Conalytic features, integrations, and pricing.",
  id = "faq",
}: MarketingFaqSectionProps) {
  if (!items.length) return null;

  return (
    <section id={id} className="py-12 md:py-24 px-4 bg-white dark:bg-[#0E0E14]">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: EASE }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">{title}</h2>
          <p className="text-gray-500 dark:text-white/65">{subtitle}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
        >
          <Accordion items={items} />
        </motion.div>
        <p className="text-center text-sm text-gray-500 dark:text-white/55 mt-8">
          Still have questions?{" "}
          <Link
            href={SITE_ROUTES.contact}
            className="text-brand-600 dark:text-brand-400 hover:underline font-semibold"
          >
            Talk to our team
          </Link>
        </p>
      </div>
    </section>
  );
}

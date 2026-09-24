"use client";

import Link from "next/link";
import type { MarketingFaqItem } from "@/lib/marketing-faqs";
import { SITE_ROUTES } from "@/lib/site-links";

export function ServiceFaqBand({
  title,
  subtitle,
  items,
}: {
  title: string;
  subtitle: string;
  items: MarketingFaqItem[];
}) {
  if (!items.length) return null;

  return (
    <section id="faq" className="service-faq-band service-landing-section relative overflow-hidden py-16 md:py-20">
      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6">
        <header className="text-center">
          <p className="service-landing-kicker mb-3">FAQ</p>
          <h2 className="service-landing-section-title font-bold tracking-tight">
            {title}
          </h2>
          <p className="service-landing-section-body mx-auto mt-4 max-w-xl text-base leading-relaxed">{subtitle}</p>
        </header>

        <div className="mt-10 space-y-0">
          {items.map((item, index) => (
            <details key={item.question} open={index === 0} className="service-faq-item group">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-5 text-left [&::-webkit-details-marker]:hidden">
                <span className="service-faq-question text-base font-semibold leading-snug sm:text-lg">
                  {item.question}
                </span>
                <span className="service-faq-icon mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full" aria-hidden>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M6 1v10M1 6h10"
                      className="origin-center transition-transform duration-200 group-open:scale-y-0"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                    <path d="M1 6h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </span>
              </summary>
              <p className="service-faq-answer pb-5 pr-12 text-sm leading-relaxed sm:text-[15px]">{item.answer}</p>
            </details>
          ))}
        </div>

        <p className="service-landing-section-body mt-8 text-center text-sm">
          Still have questions?{" "}
          <Link href={SITE_ROUTES.contact} className="service-faq-link font-semibold">
            Talk to our team
          </Link>
        </p>
      </div>
    </section>
  );
}

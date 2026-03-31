"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const QUESTIONS = [
  "Which campaign drove the most conversions last week?",
  "Why did my bounce rate spike on Tuesday?",
  "Compare GA4 vs Meta ROAS for Q1",
  "Which landing page has the highest exit rate?",
  "What is our MRR growth rate this quarter?",
  "Which customers are at highest churn risk?",
];

interface CTAProps {
  title?: string;
  subtitle?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

export function CTA({
  title = "Ready to Transform Your Analytics?",
  subtitle = "Join 2,000+ teams already using Conalytic to turn data into decisions",
  primaryCta = { label: "Get started", href: "https://app.conalytic.com/signup" },
  secondaryCta = { label: "Book a demo", href: "https://app.conalytic.com/demo" },
}: CTAProps) {
  const [qIdx, setQIdx] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setQIdx(i => (i + 1) % QUESTIONS.length);
        setFade(true);
      }, 300);
    }, 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden border border-black/6 dark:border-white/10 shadow-lg shadow-black/5">

          {/* Backgrounds */}
          <div className="absolute inset-0 dark:hidden">
            <Image src="/hero-bg.png" alt="" fill className="object-cover object-center opacity-75" />
            <div className="absolute inset-0 bg-white/30" />
          </div>
          <div className="absolute inset-0 hidden dark:block"
            style={{ background:"linear-gradient(135deg,#0D0B1C 0%,#0C0C12 50%,#0B0D1C 100%)" }}/>
          {/* Dark accent glow */}
          <div className="absolute inset-0 hidden dark:block pointer-events-none"
            style={{ background:"radial-gradient(ellipse 60% 50% at 50% 100%, rgba(107,95,248,0.12) 0%, transparent 70%)" }}/>

          {/* Subtle grid overlay */}
          <div className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: "linear-gradient(#6B5FF8 1px,transparent 1px),linear-gradient(90deg,#6B5FF8 1px,transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          {/* Content */}
          <div className="relative px-8 py-16 text-center">

            {/* Rotating question ticker */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-2.5 bg-white/70 dark:bg-white/5 border border-black/6 dark:border-white/10 backdrop-blur-sm rounded-full px-4 py-2 max-w-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-600 dark:bg-brand-400 animate-pulse shrink-0" />
                <span
                  className="text-xs font-mono text-gray-600 dark:text-white/55 truncate transition-opacity duration-300"
                  style={{ opacity: fade ? 1 : 0 }}
                >
                  &ldquo;{QUESTIONS[qIdx]}&rdquo;
                </span>
              </div>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
              {title}
            </h2>
            <p className="text-gray-500 dark:text-white/60 text-base mb-10 max-w-xl mx-auto leading-relaxed">
              {subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href={primaryCta.href} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-base font-semibold text-white bg-gray-900 dark:bg-brand-600 dark:hover:bg-brand-700 shadow-lg dark:shadow-brand-600/25 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                {primaryCta.label}
              </a>
              <a href={secondaryCta.href} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-base font-semibold text-gray-700 dark:text-white/80 border-2 border-gray-300 dark:border-white/15 bg-white/60 dark:bg-white/[0.04] hover:bg-white dark:hover:bg-white/[0.08] backdrop-blur-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                {secondaryCta.label}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

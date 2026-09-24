"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Check, ShieldCheck, LineChart } from "lucide-react";
import type { ServiceLandingContent } from "@/lib/service-landing-types";
import { cn } from "@/lib/utils";

type Stack = NonNullable<ServiceLandingContent["uspStack"]>;
type Panel = Stack["panels"][number];

/**
 * Rillion stack: first card pins; the next card is normal flow and scrolls up over it.
 * The pinned card narrows slightly as it is covered. No extra viewport track — the
 * section is only as tall as the cards, so nothing empty sits below them.
 */
export function ServiceUspScrollStack({ stack }: { stack: Stack }) {
  const reduceMotion = useReducedMotion();
  const firstRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const [first, second, ...rest] = stack.panels;

  return (
    <section className="service-usp-stack-wrap service-landing-section">
      <div className="service-usp-stack mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-[1180px]">
        {first ? (
          <PinnedUspCard
            panel={first}
            pin={!reduceMotion}
            selfRef={firstRef}
            coverRef={coverRef}
          />
        ) : null}

        {second ? (
          <div ref={coverRef} className="service-usp-stack-cover">
            <UspPanelCard panel={second} />
          </div>
        ) : null}

        {rest.map((panel) => (
          <div key={panel.title} className="service-usp-stack-cover mt-6">
            <UspPanelCard panel={panel} />
          </div>
        ))}
      </div>
    </section>
  );
}

function PinnedUspCard({
  panel,
  pin,
  selfRef,
  coverRef,
}: {
  panel: Panel;
  pin: boolean;
  selfRef: React.RefObject<HTMLDivElement | null>;
  coverRef: React.RefObject<HTMLDivElement | null>;
}) {
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, () => {
    const self = selfRef.current;
    const cover = coverRef.current;
    if (!self || !cover) return 1;
    const a = self.getBoundingClientRect();
    const b = cover.getBoundingClientRect();
    const overlap = a.bottom - b.top;
    if (overlap <= 0) return 1;
    const t = Math.min(1, overlap / Math.max(1, a.height * 0.9));
    return 1 - t * 0.08;
  });

  return (
    <div ref={selfRef} className={cn("service-usp-stack-pin", pin && "service-usp-stack-pin-active")}>
      <motion.div className="service-usp-stack-card" style={{ scale }}>
        <UspPanelCard panel={panel} />
      </motion.div>
    </div>
  );
}

function UspPanelCard({ panel }: { panel: Panel }) {
  const visualLeft = panel.imagePosition === "left";
  const isDark = panel.theme === "dark";

  return (
    <article
      className={cn(
        "service-usp-panel-card grid w-full grid-cols-1 items-center gap-8 overflow-hidden rounded-[1.5rem] p-6 sm:gap-10 sm:rounded-[2rem] sm:p-10 md:gap-12 lg:grid-cols-2 lg:gap-14 lg:p-12",
        isDark ? "service-usp-panel-dark" : "service-usp-panel-light",
      )}
    >
      {visualLeft ? (
        <>
          <UspVisual variant={panel.visual} theme={panel.theme} />
          <UspCopy panel={panel} />
        </>
      ) : (
        <>
          <UspCopy panel={panel} className="lg:order-1" />
          <UspVisual variant={panel.visual} theme={panel.theme} className="lg:order-2" />
        </>
      )}
    </article>
  );
}

function UspCopy({ panel, className }: { panel: Panel; className?: string }) {
  const isDark = panel.theme === "dark";
  return (
    <div className={cn(className)}>
      <p className="service-usp-eyebrow mb-4 text-sm font-semibold">{panel.eyebrow}</p>
      <h2 className="service-usp-title service-landing-section-title service-type-display">
        {panel.title}
      </h2>
      <p className="service-usp-body service-type-body-lg mt-5 max-w-xl">
        {panel.description}
      </p>
      <Link
        href={panel.ctaHref}
        className={cn(
          "service-usp-cta mt-8 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-base font-bold transition-transform hover:scale-[1.02]",
          isDark ? "bg-white text-brand-900 hover:bg-brand-100" : "bg-brand-900 text-white hover:bg-brand-800",
        )}
      >
        {panel.ctaLabel}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

function UspVisual({
  variant,
  theme,
  className,
}: {
  variant: Panel["visual"];
  theme: "dark" | "light";
  className?: string;
}) {
  if (variant === "compliance") return <ComplianceVisual theme={theme} className={className} />;
  return <TrackingVisual theme={theme} className={className} />;
}

function ComplianceVisual({
  theme,
  className,
}: {
  theme: "dark" | "light";
  className?: string;
}) {
  const rows = [
    { label: "GDPR & privacy policy", status: "Aligned" },
    { label: "EU cookie & consent", status: "Configured" },
    { label: "Data processing (DPA)", status: "Documented" },
    { label: "llms.txt & AI crawlers", status: "Published" },
  ];

  return (
    <div className={cn("relative w-full", className)}>
      <div
        className={cn(
          "w-full overflow-hidden rounded-2xl border shadow-2xl lg:min-h-[280px]",
          theme === "dark" ? "border-white/10 bg-white/5" : "border-brand-300/60 bg-white",
        )}
      >
        <div
          className={cn(
            "flex items-center gap-2 border-b px-4 py-2.5",
            theme === "dark" ? "border-white/10 bg-black/25" : "border-brand-200 bg-brand-50",
          )}
        >
          <span className="h-2 w-2 rounded-full bg-brand-400" />
          <span className="h-2 w-2 rounded-full bg-brand-500" />
          <span className="h-2 w-2 rounded-full bg-[var(--brand-success)]" />
          <span className={cn("ml-2 text-[10px] font-mono", theme === "dark" ? "text-white/70" : "text-brand-700")}>
            Compliance workspace
          </span>
        </div>
        <div className="grid gap-3 p-4 sm:p-5">
          {rows.map((row) => (
            <div
              key={row.label}
              className={cn(
                "flex items-center justify-between rounded-xl px-3 py-2.5",
                theme === "dark" ? "bg-white/90" : "bg-brand-50 border border-brand-200/80",
              )}
            >
              <span className={cn("text-xs font-medium", theme === "dark" ? "text-brand-900" : "text-brand-800")}>
                {row.label}
              </span>
              <span className="flex items-center gap-1 text-[11px] font-bold text-brand-success">
                <Check className="h-3.5 w-3.5" />
                {row.status}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute -bottom-4 -left-2 flex items-center gap-2 rounded-full bg-brand-900 px-4 py-2 text-xs font-semibold text-white shadow-lg sm:-left-4 dark:bg-brand-ink dark:text-brand-accent-on-ink">
        <ShieldCheck className="h-4 w-4 text-brand-success" />
        GDPR · EU · UK ready
      </div>
    </div>
  );
}

function TrackingVisual({
  theme,
  className,
}: {
  theme: "dark" | "light";
  className?: string;
}) {
  const steps = [
    { label: "GA4 property mapped", tone: "bg-brand-200 text-brand-900 border-brand-300/50" },
    { label: "Search Console linked", tone: "bg-white text-brand-900 border-brand-200" },
    { label: "Consent Mode v2", tone: "bg-brand-100 text-brand-900 border-brand-200" },
    { label: "Conversions verified", tone: "bg-brand-900 text-brand-50 border-brand-800" },
  ];
  const isDark = theme === "dark";

  return (
    <div className={cn("relative min-h-[280px] w-full", className)}>
      <div
        className={cn(
          "absolute inset-0 rounded-2xl",
          isDark ? "bg-brand-800/40" : "bg-gradient-to-br from-brand-100 via-brand-50 to-brand-200/80",
        )}
      />
      <div className="relative flex h-full flex-col justify-center gap-3 p-4 sm:p-6">
        {steps.map((step, i) => (
          <div
            key={step.label}
            className={cn(
              "ml-auto flex w-[min(100%,300px)] items-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold shadow-md",
              step.tone,
              i === 0 && "mr-6",
              i === 1 && "mr-2",
              i === 2 && "mr-10",
            )}
          >
            <Check className="h-4 w-4 shrink-0 opacity-80" />
            {step.label}
          </div>
        ))}
        <div
          className={cn(
            "mt-4 flex items-center gap-3 rounded-xl border p-4 shadow-lg",
            isDark ? "border-white/10 bg-brand-900/80" : "border-brand-300/80 bg-white",
          )}
        >
          <LineChart className={cn("h-8 w-8", isDark ? "text-brand-300" : "text-brand-700")} />
          <div>
            <p className={cn("text-xs font-bold", isDark ? "text-white" : "text-brand-900")}>
              Tracking QA sent to your team
            </p>
            <p className={cn("text-[10px]", isDark ? "text-white/55" : "text-brand-600")}>GA4 · GSC · Ads · CRM events</p>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, type MutableRefObject, type RefObject } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, FileSearch, Link2, ShieldCheck, Sparkles } from "lucide-react";
import type { ServiceLandingContent } from "@/lib/service-landing-types";
import { SEO_ORGANIC_GROWTH_IMAGES } from "@/content/service-landings/seo-organic-growth-assets";
import { SAAS_EASE } from "@/lib/motion";
import { SERVICE_SHOWCASE_SCROLL_PX_PER_SEC } from "@/lib/service-showcase-scroll";
import { ServiceCrmCmsMarquee } from "@/components/pages/service-landing/ServiceCrmCmsMarquee";
import { cn } from "@/lib/utils";

type HeroCarouselImages = NonNullable<ServiceLandingContent["heroCarouselImages"]>;

type HeroProps = Pick<
  ServiceLandingContent,
  | "eyebrow"
  | "heroTitle"
  | "heroTitleHighlight"
  | "heroDescription"
  | "heroDescriptionSecondary"
  | "heroCtaLabel"
  | "heroCtaHref"
  | "heroSecondaryCtaLabel"
  | "heroSecondaryCtaHref"
  | "heroTrustBadges"
  | "heroCarouselImages"
> & {
  crmMarqueeTitle?: string;
};

function defaultHeroCarouselImages(): HeroCarouselImages {
  return SEO_ORGANIC_GROWTH_IMAGES.heroSlides;
}

function buildHeroSlides(images: HeroCarouselImages) {
  return [
    { id: "audit", node: <SlideAuditStack backdrop={images.auditBackdrop ?? images.indexShield} /> },
    { id: "shield", node: <SlideIndexShield photo={images.indexShield} /> },
    { id: "dashboard", node: <SlideRankDashboard photo={images.rankDashboard} /> },
    { id: "flow", node: <SlideCrawlFlow photo={images.crawlFlow} /> },
    { id: "cluster", node: <SlideContentCluster photo={images.contentCluster} /> },
  ] as const;
}

export function ServiceLandingHero(props: HeroProps) {
  const {
    eyebrow,
    heroTitle,
    heroTitleHighlight,
    heroDescription,
    heroDescriptionSecondary,
    heroCtaLabel,
    heroCtaHref,
    heroSecondaryCtaLabel,
    heroSecondaryCtaHref,
    heroTrustBadges,
    heroCarouselImages,
    crmMarqueeTitle,
  } = props;

  const carouselImages = heroCarouselImages ?? defaultHeroCarouselImages();

  return (
    <section
      className="service-landing-hero relative overflow-hidden pb-0 pt-[calc(var(--marketing-header-offset)+2rem+env(safe-area-inset-top,0px))] sm:pt-[calc(var(--marketing-header-offset)+2.25rem+env(safe-area-inset-top,0px))] md:pt-[calc(var(--marketing-header-offset)+2.5rem+env(safe-area-inset-top,0px))]"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,46%)_minmax(0,54%)] lg:items-start lg:gap-x-10 xl:gap-x-16">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: SAAS_EASE }}
          >
            {eyebrow ? (
              <p className="service-landing-kicker mb-4">{eyebrow}</p>
            ) : null}
            <h1 className="marketing-hero-title text-[2.35rem] font-semibold leading-[1.06] tracking-tight text-brand-900 dark:text-brand-50 sm:text-[2.65rem] lg:text-[3rem] xl:text-[3.35rem]">
              <span className="block">{heroTitle}</span>
              <span className="service-landing-hero-highlight mt-1 block">{heroTitleHighlight}</span>
            </h1>
          </motion.div>

          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease: SAAS_EASE }}
            className="flex w-full max-w-xl flex-col items-start lg:justify-self-end lg:pt-0.5"
          >
            <p className="text-base leading-relaxed text-brand-700 dark:text-brand-200/90 sm:text-[1.05rem]">{heroDescription}</p>
            {heroDescriptionSecondary ? (
              <p className="mt-4 text-base leading-relaxed text-brand-600 dark:text-brand-300/85 sm:text-[1.05rem]">{heroDescriptionSecondary}</p>
            ) : null}

            <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href={heroCtaHref}
                className="service-landing-hero-cta-primary btn-brand-primary inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-base font-bold"
              >
                {heroCtaLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
              {heroSecondaryCtaHref && heroSecondaryCtaLabel ? (
                <Link
                  href={heroSecondaryCtaHref}
                  className="service-landing-hero-cta-ghost inline-flex items-center justify-center rounded-full px-7 py-3.5 text-base font-semibold"
                >
                  {heroSecondaryCtaLabel}
                </Link>
              ) : null}
            </div>

            {heroTrustBadges?.length ? (
              <div className="mt-8 flex w-full flex-wrap items-center gap-2">
                {heroTrustBadges.map((b) => (
                  <TrustBadge key={b.title} {...b} />
                ))}
              </div>
            ) : null}
          </motion.div>
        </div>
      </div>

      <ServiceHeroShowcaseBand images={carouselImages} crmMarqueeTitle={crmMarqueeTitle} />
    </section>
  );
}

function TrustBadge({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
  accent?: "slate" | "rose" | "amber" | "emerald";
}) {
  return (
    <div className="service-landing-proof-chip inline-flex items-center gap-2 rounded-full px-3 py-1.5">
      {subtitle ? <span className="text-[12px] font-semibold tracking-tight">{subtitle}</span> : null}
      <span className="text-[12px] font-medium">{title}</span>
    </div>
  );
}

type DragState = { active: boolean; startX: number; scrollLeft: number };

function ServiceHeroShowcaseBand({
  images,
  crmMarqueeTitle,
}: {
  images: HeroCarouselImages;
  crmMarqueeTitle?: string;
}) {
  const reduceMotion = useReducedMotion();
  const heroTrackRef = useRef<HTMLDivElement>(null);
  const marqueeTrackRef = useRef<HTMLDivElement>(null);
  const marqueeOffsetRef = useRef(0);
  const dragRef = useRef<DragState>({ active: false, startX: 0, scrollLeft: 0 });

  useEffect(() => {
    if (reduceMotion) return;

    let raf = 0;
    let last = performance.now();

    const step = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const delta = SERVICE_SHOWCASE_SCROLL_PX_PER_SEC * dt;

      if (!dragRef.current.active) {
        const hero = heroTrackRef.current;
        if (hero) {
          hero.scrollLeft += delta;
          const half = hero.scrollWidth / 2;
          if (half > 0 && hero.scrollLeft >= half) hero.scrollLeft -= half;
        }
      }

      const marquee = marqueeTrackRef.current;
      if (marquee) {
        const half = marquee.scrollWidth / 2;
        if (half > 0) {
          marqueeOffsetRef.current -= delta;
          if (-marqueeOffsetRef.current >= half) marqueeOffsetRef.current += half;
          marquee.style.transform = `translate3d(${marqueeOffsetRef.current}px,0,0)`;
        }
      }

      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [reduceMotion]);

  return (
    <div className="service-hero-showcase-band relative z-10 overflow-hidden">
      <ServiceHeroSlider images={images} trackRef={heroTrackRef} dragRef={dragRef} />
      {crmMarqueeTitle ? (
        <ServiceCrmCmsMarquee
          title={crmMarqueeTitle}
          variant="stack"
          syncedScroll
          marqueeTrackRef={marqueeTrackRef}
        />
      ) : null}
    </div>
  );
}

function ServiceHeroSlider({
  images,
  trackRef,
  dragRef,
}: {
  images: HeroCarouselImages;
  trackRef: RefObject<HTMLDivElement | null>;
  dragRef: MutableRefObject<DragState>;
}) {
  const slides = useMemo(() => buildHeroSlides(images), [images]);
  const loopSlides = useMemo(() => [...slides, ...slides], [slides]);

  return (
    <div className="relative w-full">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[var(--service-showcase-bg)] to-transparent sm:w-28"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[var(--service-showcase-bg)] to-transparent sm:w-28"
        aria-hidden
      />
      <div
        ref={trackRef}
        className="service-hero-slider flex gap-5 overflow-x-auto pb-8 pt-1 sm:gap-6 md:pb-10"
        style={{
          paddingLeft: "max(1rem, calc((100vw - min(100vw, 80rem)) / 2 + 1rem))",
          paddingRight: "max(1rem, calc((100vw - min(100vw, 80rem)) / 2 + 1rem))",
        }}
        onPointerDown={(e) => {
          const el = trackRef.current;
          if (!el) return;
          dragRef.current = { active: true, startX: e.clientX, scrollLeft: el.scrollLeft };
          el.setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          if (!dragRef.current.active) return;
          const el = trackRef.current;
          if (!el) return;
          el.scrollLeft = dragRef.current.scrollLeft - (e.clientX - dragRef.current.startX);
        }}
        onPointerUp={(e) => {
          dragRef.current.active = false;
          trackRef.current?.releasePointerCapture(e.pointerId);
        }}
        onPointerCancel={() => {
          dragRef.current.active = false;
        }}
      >
        {loopSlides.map((slide, i) => (
          <div
            key={`${slide.id}-${i}`}
            className="service-hero-slide-card relative h-[min(58vw,340px)] w-[min(82vw,400px)] shrink-0 overflow-hidden rounded-[1.85rem] sm:h-[320px] sm:w-[380px] md:h-[340px] md:w-[400px]"
          >
            {slide.node}
          </div>
        ))}
      </div>
    </div>
  );
}

function SlidePhotoBackdrop({
  src,
  overlay = "from-brand-900/50 via-brand-800/25 to-brand-900/15",
  priority = false,
}: {
  src: string;
  overlay?: string;
  priority?: boolean;
}) {
  return (
    <>
      <Image
        src={src}
        alt=""
        fill
        className="object-cover object-center"
        sizes="(max-width: 768px) 82vw, 400px"
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        aria-hidden
      />
      <div className={cn("absolute inset-0 bg-gradient-to-br", overlay)} aria-hidden />
      <div className="absolute inset-0 opacity-[0.35] mix-blend-soft-light bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.2),transparent_65%)]" aria-hidden />
    </>
  );
}

function SlideAuditStack({ backdrop }: { backdrop: string }) {
  return (
    <div className="relative flex h-full items-end justify-center gap-3 overflow-hidden p-6">
      <SlidePhotoBackdrop
        src={backdrop}
        overlay="from-brand-50/88 via-brand-100/72 to-brand-200/55"
        priority
      />
      <div className="relative z-10 flex h-full w-full items-end justify-center gap-3">
      <div className="absolute left-6 top-6 flex h-11 w-11 items-center justify-center rounded-full bg-brand-900/90 text-white shadow-lg">
        <FileSearch className="h-5 w-5" />
      </div>
      <div className="w-[42%] -rotate-6 rounded-xl bg-white p-4 shadow-xl">
        <p className="text-[10px] font-bold uppercase tracking-wide text-gray-400">Sitemap</p>
        <div className="mt-2 space-y-1.5">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-1.5 rounded bg-gray-200" style={{ width: `${90 - n * 12}%` }} />
          ))}
        </div>
      </div>
      <div className="w-[42%] rotate-3 rounded-xl bg-white p-4 shadow-xl">
        <p className="text-[10px] font-bold uppercase tracking-wide text-gray-400">robots.txt</p>
        <p className="mt-2 font-mono text-[9px] leading-relaxed text-brand-success">Allow: /</p>
        <p className="font-mono text-[9px] text-gray-500">Sitemap: …/sitemap.xml</p>
      </div>
      <span className="absolute bottom-5 right-5 z-10 rounded-full bg-brand-900 px-3 py-1.5 text-[11px] font-bold text-white shadow-md">
        + NEW audit
      </span>
      </div>
    </div>
  );
}

function SlideIndexShield({ photo }: { photo: string }) {
  return (
    <div className="relative h-full overflow-hidden bg-brand-900">
      <SlidePhotoBackdrop src={photo} overlay="from-brand-900/70 via-brand-800/50 to-brand-900/65" />
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md">
          <ShieldCheck className="h-12 w-12 text-brand-success" strokeWidth={1.5} />
        </div>
      </div>
      <div className="absolute bottom-5 left-5 z-10 flex flex-wrap gap-2">
        <StatusPill label="URL inspection passed" tone="success" />
        <StatusPill label="Indexable" tone="ink" />
      </div>
    </div>
  );
}

function StatusPill({ label, tone = "neutral" }: { label: string; tone?: "success" | "neutral" | "ink" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold shadow-md backdrop-blur-sm",
        tone === "success" && "bg-brand-success-soft text-brand-800",
        tone === "ink" && "bg-brand-900 text-brand-50",
        tone === "neutral" && "border border-white/70 bg-white/95 text-brand-800",
      )}
    >
      {tone === "success" ? <Check className="h-3 w-3 text-brand-success" /> : null}
      {label}
    </span>
  );
}

function SlideRankDashboard({ photo }: { photo: string }) {
  const rows = [
    { kw: "b2b seo agency", pos: 4, ch: "+6" },
    { kw: "technical seo audit", pos: 7, ch: "+3" },
    { kw: "organic growth strategy", pos: 2, ch: "+1" },
    { kw: "google search console setup", pos: 11, ch: "+9" },
  ];
  return (
    <div className="relative flex h-full flex-col overflow-hidden p-4">
      <SlidePhotoBackdrop src={photo} overlay="from-brand-50/92 via-brand-50/88 to-brand-100/85" />
      <div className="relative z-10 flex h-full flex-col">
      <div className="mb-3 flex items-center gap-2 border-b border-gray-200 pb-2">
        <span className="h-2 w-2 rounded-full bg-brand-400" />
        <span className="h-2 w-2 rounded-full bg-brand-500" />
        <span className="h-2 w-2 rounded-full bg-[var(--brand-success)]" />
        <span className="ml-2 text-[10px] font-mono text-gray-400">Organic workspace</span>
      </div>
      <div className="flex-1 overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="grid grid-cols-[1fr_48px_40px] gap-2 border-b border-gray-100 bg-gray-50 px-3 py-2 text-[9px] font-bold uppercase text-gray-400">
          <span>Query</span>
          <span>Pos</span>
          <span>Δ</span>
        </div>
        {rows.map((r) => (
          <div key={r.kw} className="grid grid-cols-[1fr_48px_40px] gap-2 border-b border-gray-50 px-3 py-2.5 text-[11px]">
            <span className="truncate text-gray-700">{r.kw}</span>
            <span className="font-bold text-gray-900">#{r.pos}</span>
            <span className="font-bold text-brand-success">{r.ch}</span>
          </div>
        ))}
      </div>
      <div className="absolute right-4 top-4 z-10 flex flex-col items-end gap-2 sm:right-5 sm:top-5">
        <StatusPill label="Live GSC sync" tone="success" />
        <StatusPill label="Position ↑ 6" tone="neutral" />
      </div>
      </div>
    </div>
  );
}

function SlideCrawlFlow({ photo }: { photo: string }) {
  return (
    <div className="relative h-full overflow-hidden p-6">
      <SlidePhotoBackdrop src={photo} overlay="from-brand-100/88 via-brand-200/80 to-brand-300/72" />
      <div className="relative z-10 h-full">
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
        <FlowChip icon="🕷️" label="Crawl" />
        <div className="h-8 w-px bg-brand-900/20" />
        <span className="rounded-full bg-brand-900 px-4 py-2 text-xs font-bold text-white shadow-lg">
          <Check className="mr-1 inline h-3.5 w-3.5 text-brand-success" />
          Indexed
        </span>
        <div className="h-8 w-px bg-brand-900/20" />
        <FlowChip icon="📈" label="Rank" />
      </div>
      <span className="absolute bottom-5 right-5 z-10 max-w-[140px] rounded-full bg-brand-900/95 px-3 py-2 text-[10px] font-semibold leading-snug text-white">
        SSR HTML Google can render
      </span>
      </div>
    </div>
  );
}

function FlowChip({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-white/60 bg-white/90 px-4 py-2.5 shadow-md">
      <span>{icon}</span>
      <span className="text-sm font-semibold text-gray-800">{label}</span>
    </div>
  );
}

function SlideContentCluster({ photo }: { photo: string }) {
  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden p-6">
      <SlidePhotoBackdrop src={photo} overlay="from-brand-900/82 via-brand-800/75 to-brand-900/88" />
      <div className="relative z-10 flex h-full w-full items-center justify-center">
      <div className="grid w-full max-w-[280px] grid-cols-2 gap-2">
        <div className="col-span-2 rounded-xl bg-white/95 px-3 py-3 text-center text-xs font-bold text-brand-900 shadow-lg">Pillar: Organic growth</div>
        {["Technical SEO", "Content briefs", "Internal links", "Schema"].map((t) => (
          <div key={t} className="rounded-lg border border-white/20 bg-white/10 px-2 py-2.5 text-center text-[10px] font-medium text-white/90 backdrop-blur-sm">
            {t}
          </div>
        ))}
      </div>
      <span className="absolute left-5 top-5 flex items-center gap-1 rounded-full bg-brand-ink px-3 py-1.5 text-[11px] font-bold text-brand-accent-on-ink shadow">
        <Link2 className="h-3.5 w-3.5" />
        Cluster linked
      </span>
      <Sparkles className="absolute bottom-6 left-8 h-8 w-8 text-white/20" />
      </div>
    </div>
  );
}

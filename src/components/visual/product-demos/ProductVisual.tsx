"use client";

import { ChatProductDemo } from "@/components/visual/product-demos/ChatProductDemo";
import { KpisProductDemo } from "@/components/visual/product-demos/KpisProductDemo";
import { ReportProductDemo } from "@/components/visual/product-demos/ReportProductDemo";
import { BlogTopicDemo } from "@/components/visual/blog-demos/BlogTopicDemo";
import type { BlogDemoVariant } from "@/lib/blog-demo-variants";
import type { ProductVisualVariant } from "@/lib/product-visual";
import { cn } from "@/lib/utils";

export type BlogVisualProps = {
  variant?: ProductVisualVariant;
  demoVariant?: BlogDemoVariant;
};

export function ProductVisual({
  variant,
  compact = false,
  embedded = false,
  className,
}: {
  variant: ProductVisualVariant;
  compact?: boolean;
  embedded?: boolean;
  className?: string;
}) {
  const Demo =
    variant === "kpis" ? KpisProductDemo : variant === "reports" ? ReportProductDemo : ChatProductDemo;

  return (
    <div className={cn("h-full w-full", className)} role="img" aria-label={`${variant} product preview`}>
      <Demo compact={compact} embedded={embedded} />
    </div>
  );
}

function BlogVisualInner({ variant, demoVariant, compact, embedded }: BlogVisualProps & { compact?: boolean; embedded?: boolean }) {
  if (demoVariant) {
    return <BlogTopicDemo variant={demoVariant} compact={compact} />;
  }
  return <ProductVisual variant={variant ?? "chat"} compact={compact} embedded={embedded} />;
}

/** Blog listing card visual — fixed 16:9, centered, no overlap with category badge. */
export function BlogCardVisual({ variant, demoVariant }: BlogVisualProps) {
  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#0a0a0a]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(201,255,51,0.08),transparent_70%)]" />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="h-full w-full max-w-[340px]">
          <BlogVisualInner variant={variant} demoVariant={demoVariant} compact embedded />
        </div>
      </div>
    </div>
  );
}

/** Blog article header visual — centered in sidebar column. */
export function BlogArticleHeroVisual({ variant, demoVariant }: BlogVisualProps) {
  return (
    <div className="relative aspect-[5/4] w-full overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0a0a0a] shadow-xl shadow-black/40 sm:aspect-[4/3] lg:aspect-auto lg:min-h-[280px]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(201,255,51,0.1),transparent_70%)]" />
      <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-5">
        <div className="h-full w-full max-w-[300px] sm:max-w-[320px]">
          <BlogVisualInner variant={variant} demoVariant={demoVariant} compact embedded />
        </div>
      </div>
    </div>
  );
}

/** Featured blog hero visual — larger centered preview. */
export function BlogFeaturedVisual({ variant, demoVariant }: BlogVisualProps) {
  return (
    <div className="relative min-h-[220px] w-full overflow-hidden bg-[#0a0a0a] lg:min-h-[320px]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(201,255,51,0.1),transparent_70%)]" />
      <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-8">
        <div className="h-full w-full max-w-md lg:max-w-lg">
          <BlogVisualInner variant={variant} demoVariant={demoVariant} compact embedded />
        </div>
      </div>
    </div>
  );
}

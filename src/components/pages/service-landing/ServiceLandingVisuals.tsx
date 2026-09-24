import { cn } from "@/lib/utils";

type VisualKind = "seo-audit" | "content-cluster" | "indexation" | "analytics-report";

export function ServiceLandingVisual({ kind, className }: { kind: VisualKind; className?: string }) {
  return (
    <div
      className={cn(
        "glass-card glow-purple overflow-hidden rounded-2xl shadow-xl shadow-brand-900/10 dark:shadow-black/40",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-brand-200/80 bg-brand-100/80 px-4 py-2.5 dark:border-white/10 dark:bg-brand-800/80">
        <span className="h-2.5 w-2.5 rounded-full bg-brand-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-brand-500" />
        <span className="h-2.5 w-2.5 rounded-full bg-[var(--brand-success)]" />
        <span className="ml-2 truncate text-xs text-brand-600 dark:text-brand-300">conalytic.com / SEO workspace</span>
      </div>
      <div className="p-4 sm:p-5">{renderInner(kind)}</div>
    </div>
  );
}

function renderInner(kind: VisualKind) {
  switch (kind) {
    case "seo-audit":
      return (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-brand-700 dark:text-brand-200">
            <span>Technical audit</span>
            <span className="rounded-full bg-brand-success-soft px-2 py-0.5 text-brand-success">Live</span>
          </div>
          {[
            { label: "Indexable URLs", value: "98%", tone: "good" },
            { label: "Crawl errors", value: "3", tone: "warn" },
            { label: "Core Web Vitals", value: "Pass", tone: "good" },
          ].map((row) => (
            <div key={row.label} className="flex items-center justify-between rounded-lg bg-white/90 px-3 py-2 dark:bg-brand-900/60">
              <span className="text-sm text-brand-700 dark:text-white/75">{row.label}</span>
              <span
                className={cn(
                  "text-sm font-semibold",
                  row.tone === "good" ? "text-brand-success" : "text-brand-600 dark:text-brand-300",
                )}
              >
                {row.value}
              </span>
            </div>
          ))}
          <div className="h-24 rounded-lg bg-brand-200/50 dark:bg-brand-700/40 p-2">
            <div className="flex h-full items-end gap-1">
              {[40, 55, 48, 72, 65, 88, 92].map((h, i) => (
                <div key={i} className="flex-1 rounded-t bg-brand-500/70 dark:bg-brand-400/80" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
        </div>
      );
    case "content-cluster":
      return (
        <div className="grid grid-cols-2 gap-2">
          <div className="col-span-2 rounded-xl bg-brand-600 px-3 py-4 text-center text-sm font-semibold text-white">Pillar: Marketing analytics</div>
          {["GA4 setup", "KPI goals", "Report templates", "AI search"].map((t) => (
            <div key={t} className="rounded-lg border border-brand-200/80 bg-white px-2 py-3 text-center text-xs font-medium text-brand-700 dark:border-white/10 dark:bg-brand-900/50 dark:text-white/80">
              {t}
            </div>
          ))}
        </div>
      );
    case "indexation":
      return (
        <div className="space-y-2 font-mono text-[11px] sm:text-xs">
          <p className="text-brand-success">✓ GET /pricing → 200 index,follow</p>
          <p className="text-brand-success">✓ canonical → https://conalytic.com/pricing</p>
          <p className="text-brand-600 dark:text-brand-300">→ rendered HTML: 142KB (SSR)</p>
          <p className="text-brand-600 dark:text-brand-400">! 2 URLs in “Crawled – not indexed” queue</p>
          <div className="mt-3 rounded-lg bg-brand-900 px-3 py-2 text-brand-100 dark:bg-black/40">
            <span className="text-brand-300">opacity:0</span> instances in HTML: <span className="text-brand-success">0</span>
          </div>
        </div>
      );
    case "analytics-report":
      return (
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-2">
            {[
              { k: "Clicks", v: "+34%" },
              { k: "Impr.", v: "+28%" },
              { k: "Conv.", v: "+19%" },
            ].map((m) => (
              <div key={m.k} className="rounded-lg bg-white px-2 py-2 text-center dark:bg-brand-900/60">
                <div className="text-[10px] uppercase tracking-wide text-brand-500">{m.k}</div>
                <div className="text-sm font-bold text-brand-800 dark:text-white">{m.v}</div>
              </div>
            ))}
          </div>
          <div className="rounded-lg border border-dashed border-brand-300/80 px-3 py-4 text-center text-xs text-brand-600 dark:border-white/15 dark:text-white/60">
            Conalytic KPI Tracker · Organic pipeline goal
          </div>
        </div>
      );
    default:
      return null;
  }
}

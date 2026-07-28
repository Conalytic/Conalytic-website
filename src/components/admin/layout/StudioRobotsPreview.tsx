"use client";

import { Monitor, Smartphone } from "lucide-react";
import { StudioIconButton } from "@/components/admin/ui/StudioIconButton";

type Props = {
  body: string;
  previewMode: "draft" | "staging";
  displayUrl: string;
  narrow: boolean;
  onToggleNarrow: () => void;
};

export function StudioRobotsPreview({
  body,
  previewMode,
  displayUrl,
  narrow,
  onToggleNarrow,
}: Props) {
  return (
    <div className="studio-main">
      <div className="studio-browser-bar">
        <div className="studio-browser-dots" aria-hidden>
          <span /><span /><span />
        </div>
        <div className="studio-browser-url" title={displayUrl}>
          <span
            className={
              previewMode === "staging"
                ? "mr-1.5 rounded bg-[var(--studio-badge-draft-bg)] px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[var(--studio-badge-draft-fg)]"
                : "mr-1.5 rounded bg-[var(--studio-border)] px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[var(--studio-muted)]"
            }
          >
            {previewMode === "staging" ? "Staging" : "Draft"}
          </span>
          {displayUrl}
        </div>
        <div className="studio-browser-actions">
          <StudioIconButton
            label={narrow ? "Desktop width" : "Mobile width"}
            onClick={onToggleNarrow}
          >
            {narrow ? <Monitor className="h-3.5 w-3.5" /> : <Smartphone className="h-3.5 w-3.5" />}
          </StudioIconButton>
        </div>
      </div>
      <div
        className={`studio-preview-frame flex-1 overflow-auto p-4 sm:p-6 ${
          narrow ? "studio-preview-frame--narrow" : "studio-preview-frame--desktop"
        }`}
      >
        <div className={`mx-auto ${narrow ? "max-w-sm" : "max-w-3xl"}`}>
          <p className="mb-3 text-xs text-[var(--studio-muted)]">
            Live preview of production <code className="rounded bg-[var(--studio-border)] px-1 py-0.5 text-[11px]">/robots.txt</code>.
            Staging deploys always serve <code className="text-[11px]">Disallow: /</code> regardless of this file.
          </p>
          <pre
            className="overflow-auto rounded-lg border border-[var(--studio-border)] bg-[var(--studio-surface)] p-4 font-mono text-xs leading-relaxed whitespace-pre-wrap text-[var(--studio-fg)] shadow-sm"
          >
            {body || "(empty)"}
          </pre>
        </div>
      </div>
    </div>
  );
}

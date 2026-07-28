"use client";

import { useEffect, useRef, useState } from "react";
import { Monitor, RefreshCw, Smartphone } from "lucide-react";
import { StudioIconButton } from "@/components/admin/ui/StudioIconButton";

const DESKTOP_PREVIEW_WIDTH = 1280;
const MOBILE_PREVIEW_WIDTH = 390;

type Props = {
  pageLabel: string;
  pagePath: string;
  previewSrc: string;
  displayUrl: string;
  previewMode: "staging" | "local";
  stagingPending?: boolean;
  narrow: boolean;
  onRefresh: () => void;
  onToggleNarrow: () => void;
};

export function StudioPreview({
  pageLabel,
  pagePath,
  previewSrc,
  displayUrl,
  previewMode,
  stagingPending,
  narrow,
  onRefresh,
  onToggleNarrow,
}: Props) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [frameSize, setFrameSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    function updateSize() {
      setFrameSize({ width: frame!.clientWidth, height: frame!.clientHeight });
    }

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  const desktopScale =
    !narrow && frameSize.width > 0 ? Math.min(1, frameSize.width / DESKTOP_PREVIEW_WIDTH) : 1;

  const mobileScale =
    narrow && frameSize.width > 0 ? Math.min(1, frameSize.width / MOBILE_PREVIEW_WIDTH) : 1;

  const iframeHeight =
    narrow || desktopScale <= 0
      ? Math.max(frameSize.height / (narrow ? mobileScale : 1), 480)
      : Math.max(frameSize.height / desktopScale, 480);

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
                ? "mr-1.5 rounded bg-[var(--studio-badge-success-bg)] px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[var(--studio-badge-success-fg)]"
                : "mr-1.5 rounded bg-[var(--studio-border)] px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[var(--studio-muted)]"
            }
          >
            {previewMode === "staging" ? "Staging" : "Local"}
          </span>
          {displayUrl}
        </div>
        <div className="studio-browser-actions">
          <StudioIconButton label="Refresh preview" onClick={onRefresh}>
            <RefreshCw className="h-3.5 w-3.5" />
          </StudioIconButton>
          <StudioIconButton
            label={narrow ? "Desktop width" : "Mobile width"}
            onClick={onToggleNarrow}
          >
            {narrow ? <Monitor className="h-3.5 w-3.5" /> : <Smartphone className="h-3.5 w-3.5" />}
          </StudioIconButton>
        </div>
      </div>
      {previewMode === "local" ? (
        <p
          className="border-b border-[var(--studio-border)] bg-[var(--studio-bg)] px-3 py-2 text-center text-[11px] text-[var(--studio-muted)]"
          role="status"
        >
          Set <strong>Staging preview URL</strong> in Settings to load your Vercel staging site here.
        </p>
      ) : null}
      {stagingPending ? (
        <p
          className="border-b border-[var(--studio-badge-draft-bg)] bg-[var(--studio-badge-draft-bg)] px-3 py-2 text-center text-[11px] text-[var(--studio-badge-draft-fg)]"
          role="status"
        >
          You have unsaved or unpublished drafts — push to staging to update this preview after Vercel deploys.
        </p>
      ) : null}
      <div
        ref={frameRef}
        className={`studio-preview-frame flex-1 ${narrow ? "studio-preview-frame--narrow" : "studio-preview-frame--desktop"}`}
      >
        {narrow ? (
          <div
            className="studio-preview-viewport studio-preview-viewport--mobile"
            style={{
              width: MOBILE_PREVIEW_WIDTH * mobileScale,
              maxWidth: "100%",
            }}
          >
            <div
              className="studio-preview-scaler"
              style={{
                width: MOBILE_PREVIEW_WIDTH,
                height: iframeHeight,
                transform: `scale(${mobileScale})`,
                transformOrigin: "top center",
              }}
            >
              <iframe
                key={previewSrc}
                title={`Preview: ${pageLabel}`}
                src={previewSrc}
                style={{ width: MOBILE_PREVIEW_WIDTH, height: iframeHeight }}
              />
            </div>
          </div>
        ) : (
          <div
            className="studio-preview-viewport studio-preview-viewport--desktop"
            style={{
              width: DESKTOP_PREVIEW_WIDTH * desktopScale,
              height: frameSize.height || "100%",
            }}
          >
            <div
              className="studio-preview-scaler"
              style={{
                width: DESKTOP_PREVIEW_WIDTH,
                height: iframeHeight,
                transform: `scale(${desktopScale})`,
              }}
            >
              <iframe
                key={previewSrc}
                title={`Preview: ${pageLabel}`}
                src={previewSrc}
                style={{ width: DESKTOP_PREVIEW_WIDTH, height: iframeHeight }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

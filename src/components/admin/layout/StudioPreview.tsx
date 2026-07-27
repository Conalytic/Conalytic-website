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
  narrow: boolean;
  onRefresh: () => void;
  onToggleNarrow: () => void;
};

export function StudioPreview({
  pageLabel,
  pagePath,
  previewSrc,
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
        <div className="studio-browser-url" title={pagePath}>
          conalytic.com{pagePath === "/" ? "" : pagePath}
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

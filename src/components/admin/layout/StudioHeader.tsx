"use client";

import { Menu, PanelRight } from "lucide-react";
import { StudioBadge } from "@/components/admin/ui/StudioBadge";
import { StudioButton } from "@/components/admin/ui/StudioButton";
import { StudioIconButton } from "@/components/admin/ui/StudioIconButton";

type Props = {
  pageLabel: string;
  status: string;
  pageDirty: boolean;
  stagingDraftCount: number;
  publishing?: boolean;
  onSave: () => void;
  onDiscard: () => void;
  onPublish: () => void;
  onToggleNav?: () => void;
  onToggleInspector?: () => void;
};

export function StudioHeader({
  pageLabel,
  status,
  pageDirty,
  stagingDraftCount,
  publishing,
  onSave,
  onDiscard,
  onPublish,
  onToggleNav,
  onToggleInspector,
}: Props) {
  return (
    <header className="studio-header">
      <div className="flex min-w-0 flex-1 items-center gap-1.5 sm:gap-2">
        {onToggleNav ? (
          <StudioIconButton label="Open navigation" variant="chrome" onClick={onToggleNav} className="lg:hidden">
            <Menu className="h-4 w-4" />
          </StudioIconButton>
        ) : null}
        <div className="flex min-w-0 items-center gap-1.5 sm:gap-2">
          <p className="truncate text-xs font-bold text-[var(--studio-chrome-fg)]">{pageLabel}</p>
          {pageDirty ? (
            <StudioBadge tone="draft">Draft</StudioBadge>
          ) : (
            <StudioBadge tone="success">Staging</StudioBadge>
          )}
        </div>
        <p
          className="hidden min-w-0 truncate text-[11px] text-[var(--studio-chrome-muted)] md:inline xl:max-w-[12rem]"
          role="status"
          aria-live="polite"
        >
          {status}
        </p>
      </div>
      <div className="studio-header__actions">
        {onToggleInspector ? (
          <StudioIconButton label="Open editor" variant="chrome" onClick={onToggleInspector} className="lg:hidden">
            <PanelRight className="h-4 w-4" />
          </StudioIconButton>
        ) : null}
        <StudioButton variant="chrome" size="sm" onClick={onDiscard} className="studio-header__discard">
          Discard
        </StudioButton>
        <StudioButton variant="chrome-secondary" size="sm" onClick={onSave}>
          Save draft
        </StudioButton>
        <StudioButton
          variant="primary"
          size="sm"
          disabled={stagingDraftCount === 0 || publishing}
          onClick={onPublish}
        >
          <span className="studio-header__push-short">Push</span>
          <span className="studio-header__push-full">Push to staging</span>
        </StudioButton>
      </div>
    </header>
  );
}

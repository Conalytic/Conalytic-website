"use client";

import { StudioButton } from "@/components/admin/ui/StudioButton";
import { StudioTabs } from "@/components/admin/ui/StudioTabs";

export type InspectorTab = "ai" | "seo";

type Props = {
  tabs: InspectorTab[];
  activeTab: InspectorTab;
  onTabChange: (tab: InspectorTab) => void;
  onSave: () => void;
  saving?: boolean;
  children: React.ReactNode;
};

const tabLabels: Record<InspectorTab, string> = {
  ai: "AI assistant",
  seo: "SEO",
};

export function StudioInspector({
  tabs,
  activeTab,
  onTabChange,
  onSave,
  saving,
  children,
}: Props) {
  const aiMode = activeTab === "ai";

  return (
    <aside className="studio-inspector">
      <div className="shrink-0 border-b border-[var(--studio-border)] p-2">
        <StudioTabs
          tabs={tabs.map((id) => ({ id, label: tabLabels[id] }))}
          active={activeTab}
          onChange={onTabChange}
        />
      </div>
      <div
        className={
          aiMode
            ? "studio-inspector__body"
            : "studio-inspector__body studio-inspector__body--scroll"
        }
      >
        {children}
      </div>
      <div className="studio-inspector-footer">
        <StudioButton variant="primary" className="w-full" disabled={saving} onClick={onSave}>
          {saving ? "Saving…" : "Save draft"}
        </StudioButton>
      </div>
    </aside>
  );
}

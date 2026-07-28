"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { CmsRegistryEntry, CmsSeoFields } from "@/lib/cms/types";
import { resolveEffectiveSeo } from "@/lib/cms/seo-defaults";
import { deepMerge } from "@/lib/cms/deep-merge";
import { normalizePageOverlay } from "@/lib/cms/normalize-overlay";
import { AdminAppShell, StudioShellLayout } from "@/components/admin/layout/AdminAppShell";
import { StudioHeader } from "@/components/admin/layout/StudioHeader";
import { StudioSidebar } from "@/components/admin/layout/StudioSidebar";
import { StudioPreview } from "@/components/admin/layout/StudioPreview";
import { StudioInspector } from "@/components/admin/layout/StudioInspector";
import { StudioDialog } from "@/components/admin/ui/StudioDialog";
import { useStudioToast } from "@/components/admin/ui/StudioToast";
import { AdminSeoForm } from "@/components/admin/forms/AdminSeoForm";
import { AdminAiPanel } from "@/components/admin/forms/AdminAiPanel";
import type { InspectorTab } from "@/components/admin/layout/StudioInspector";

type DraftResponse = {
  entry: CmsRegistryEntry;
  draft: { data: Record<string, unknown> } | null;
  published: Record<string, unknown> | null;
};

export function StudioPage() {
  const { toast } = useStudioToast();
  const searchParams = useSearchParams();
  const searchRef = useRef<HTMLInputElement>(null);
  const [registry, setRegistry] = useState<CmsRegistryEntry[]>([]);
  const [dirtyIds, setDirtyIds] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState(() => searchParams.get("page") || "home");
  const [filter, setFilter] = useState("");
  const [tab, setTab] = useState<InspectorTab>("ai");
  const [data, setData] = useState<Record<string, unknown>>({});
  const [status, setStatus] = useState("Loading…");
  const [previewKey, setPreviewKey] = useState(0);
  const [narrowPreview, setNarrowPreview] = useState(false);
  const [publishOpen, setPublishOpen] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [navOpen, setNavOpen] = useState(false);
  const [inspectorOpen, setInspectorOpen] = useState(false);

  const selected = useMemo(() => registry.find((e) => e.id === selectedId), [registry, selectedId]);

  const loadRegistry = useCallback(async () => {
    const res = await fetch("/api/admin/drafts");
    const json = (await res.json()) as { registry: CmsRegistryEntry[]; dirtyIds: string[] };
    setRegistry(json.registry);
    setDirtyIds(json.dirtyIds);
    setLoading(false);
  }, []);

  const loadDraft = useCallback(async (id: string) => {
    const res = await fetch(`/api/admin/drafts/${encodeURIComponent(id)}`);
    if (!res.ok) {
      setStatus("Could not load this page.");
      return;
    }
    const json = (await res.json()) as DraftResponse;
    const merged = normalizePageOverlay(
      id,
      deepMerge(
        (json.published ?? {}) as Record<string, unknown>,
        (json.draft?.data ?? {}) as Record<string, unknown>,
      ),
    );
    const effectiveSeo = resolveEffectiveSeo(id, merged.seo as CmsSeoFields | undefined);
    setData({ ...merged, seo: effectiveSeo });
    setStatus(json.draft ? "You have unsaved edits" : "All changes saved");
    setPreviewKey((k) => k + 1);
  }, []);

  useEffect(() => {
    void loadRegistry();
  }, [loadRegistry]);

  useEffect(() => {
    if (selectedId) void loadDraft(selectedId);
  }, [selectedId, loadDraft]);

  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 1024) {
        setNavOpen(false);
        setInspectorOpen(false);
      }
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const saveDraft = useCallback(async () => {
    if (!selectedId) return;
    setSaving(true);
    setStatus("Saving…");
    const res = await fetch(`/api/admin/drafts/${encodeURIComponent(selectedId)}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data }),
    });
    setSaving(false);
    if (!res.ok) {
      setStatus("Save failed");
      toast("Could not save draft", "error");
      return;
    }
    await loadRegistry();
    setStatus("All changes saved");
    toast("Draft saved", "success");
    setPreviewKey((k) => k + 1);
  }, [selectedId, data, loadRegistry, toast]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        void saveDraft();
      }
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [saveDraft]);

  async function discardDraft() {
    if (!selectedId) return;
    if (!window.confirm("Discard unsaved edits for this item?")) return;
    const res = await fetch(`/api/admin/drafts/${encodeURIComponent(selectedId)}`, { method: "DELETE" });
    if (!res.ok) {
      toast("Could not discard draft", "error");
      return;
    }
    await loadRegistry();
    await loadDraft(selectedId);
    setStatus("All changes saved");
    toast("Draft discarded", "info");
  }

  async function pushToStaging() {
    setPublishing(true);
    const res = await fetch("/api/admin/publish", { method: "POST" });
    const json = (await res.json()) as { error?: string; commitUrl?: string };
    setPublishing(false);
    setPublishOpen(false);
    if (!res.ok) {
      setStatus(json.error || "Publish failed");
      toast(json.error || "Publish failed", "error");
      return;
    }
    await loadRegistry();
    setStatus("Pushed to staging");
    toast("Pushed to staging successfully", "success");
    if (json.commitUrl) window.open(json.commitUrl, "_blank");
  }

  useEffect(() => {
    if (tab === "seo" && !selected?.hasSeo) setTab("ai");
  }, [tab, selected?.hasSeo]);

  const seo = (data.seo as CmsSeoFields | undefined) ?? {};

  const previewSrc = selected?.type === "chrome"
    ? `/admin/preview/frame?chrome=${selected.id === "chrome-header" ? "header" : "footer"}&k=${previewKey}`
    : `/admin/preview/frame?registryId=${encodeURIComponent(selectedId)}&k=${previewKey}`;

  const tabs: InspectorTab[] = selected?.hasSeo ? ["ai", "seo"] : ["ai"];

  const dirtyLabels = dirtyIds
    .map((id) => registry.find((e) => e.id === id)?.label)
    .filter(Boolean);

  const sidebarNav = (
    <StudioSidebar
      registry={registry}
      selectedId={selectedId}
      dirtyIds={dirtyIds}
      filter={filter}
      searchInputRef={searchRef}
      loading={loading}
      showBrand={false}
      onFilterChange={setFilter}
      onSelect={(id) => {
        setSelectedId(id);
        setTab("ai");
        setNavOpen(false);
      }}
    />
  );

  const sidebarDrawer = (
    <StudioSidebar
      registry={registry}
      selectedId={selectedId}
      dirtyIds={dirtyIds}
      filter={filter}
      searchInputRef={searchRef}
      loading={loading}
      onFilterChange={setFilter}
      onSelect={(id) => {
        setSelectedId(id);
        setTab("ai");
        setNavOpen(false);
      }}
      onToggleNav={() => setNavOpen(false)}
    />
  );

  return (
    <AdminAppShell
      showNav={navOpen}
      onCloseNav={() => setNavOpen(false)}
      showInspector={inspectorOpen}
      onCloseInspector={() => setInspectorOpen(false)}
      sidebar={sidebarDrawer}
    >
      <StudioShellLayout
        navOpen={navOpen}
        inspectorOpen={inspectorOpen}
        sidebar={sidebarNav}
        header={
          <StudioHeader
            pageLabel={selected?.label ?? "Studio"}
            status={status}
            pageDirty={dirtyIds.includes(selectedId)}
            stagingDraftCount={dirtyIds.length}
            publishing={publishing}
            onSave={() => void saveDraft()}
            onDiscard={() => void discardDraft()}
            onPublish={() => setPublishOpen(true)}
            onToggleNav={() => setNavOpen(true)}
            onToggleInspector={() => setInspectorOpen((open) => !open)}
          />
        }
        main={
          <StudioPreview
            pageLabel={selected?.label ?? "Page"}
            pagePath={selected?.path ?? "/"}
            previewSrc={previewSrc}
            narrow={narrowPreview}
            onRefresh={() => setPreviewKey((k) => k + 1)}
            onToggleNarrow={() => setNarrowPreview((n) => !n)}
          />
        }
        inspector={
          <StudioInspector
            tabs={tabs}
            activeTab={tab}
            onTabChange={setTab}
            onSave={() => void saveDraft()}
            saving={saving}
          >
            {loading ? (
              <div className="space-y-3 p-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-10 animate-pulse rounded-lg bg-[var(--studio-border)]" />
                ))}
              </div>
            ) : null}
            {!loading && tab === "seo" && selected?.hasSeo ? (
              <div className="p-4">
                <AdminSeoForm
                  value={seo}
                  pageKind={selected?.type === "blog" ? "blog" : "page"}
                  onChange={(next) => setData({ ...data, seo: next })}
                />
              </div>
            ) : null}
            {!loading && tab === "ai" ? (
              <AdminAiPanel
                key={selectedId}
                registryId={selectedId}
                pageLabel={selected?.label}
                onApplied={() => {
                  setPreviewKey((k) => k + 1);
                  void loadDraft(selectedId);
                  void loadRegistry();
                  toast("AI updated your draft", "success");
                }}
              />
            ) : null}
          </StudioInspector>
        }
      />

      <StudioDialog
        open={publishOpen}
        title="Push to staging?"
        description={
          <>
            <p>This commits your saved drafts to the <strong>staging</strong> branch. Production (main) stays unchanged.</p>
            {dirtyLabels.length > 0 ? (
              <ul className="mt-3 list-inside list-disc text-sm">
                {dirtyLabels.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            ) : null}
          </>
        }
        confirmLabel="Push to staging"
        loading={publishing}
        onConfirm={() => void pushToStaging()}
        onClose={() => setPublishOpen(false)}
      />
    </AdminAppShell>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import type { CmsRegistryEntry } from "@/lib/cms/types";
import { AdminAppShell, StudioShellLayout } from "@/components/admin/layout/AdminAppShell";
import { StudioSidebar } from "@/components/admin/layout/StudioSidebar";
import { SettingsView } from "@/components/admin/settings/SettingsView";
import { StudioIconButton } from "@/components/admin/ui/StudioIconButton";

export function SettingsPageShell() {
  const router = useRouter();
  const [registry, setRegistry] = useState<CmsRegistryEntry[]>([]);
  const [dirtyIds, setDirtyIds] = useState<string[]>([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    void fetch("/api/admin/drafts")
      .then((r) => r.json())
      .then((json: { registry: CmsRegistryEntry[]; dirtyIds: string[] }) => {
        setRegistry(json.registry);
        setDirtyIds(json.dirtyIds);
        setLoading(false);
      });
  }, []);

  const sidebarNav = (
    <StudioSidebar
      registry={registry}
      selectedId=""
      dirtyIds={dirtyIds}
      filter={filter}
      showBrand={false}
      onFilterChange={setFilter}
      onSelect={(id) => router.push(`/admin/studio?page=${encodeURIComponent(id)}`)}
      loading={loading}
    />
  );

  const sidebarDrawer = (
    <StudioSidebar
      registry={registry}
      selectedId=""
      dirtyIds={dirtyIds}
      filter={filter}
      onFilterChange={setFilter}
      onSelect={(id) => router.push(`/admin/studio?page=${encodeURIComponent(id)}`)}
      onToggleNav={() => setNavOpen(false)}
      loading={loading}
    />
  );

  return (
    <AdminAppShell showNav={navOpen} onCloseNav={() => setNavOpen(false)} sidebar={sidebarDrawer}>
      <StudioShellLayout
        mode="settings"
        navOpen={navOpen}
        sidebar={sidebarNav}
        header={
          <header className="studio-header">
            <div className="flex min-w-0 items-center gap-2">
              <StudioIconButton
                label="Open navigation"
                variant="chrome"
                onClick={() => setNavOpen(true)}
                className="lg:hidden"
              >
                <Menu className="h-4 w-4" />
              </StudioIconButton>
              <div>
                <p className="text-xs font-bold text-[var(--studio-chrome-fg)]">Settings</p>
                <p className="text-[11px] text-[var(--studio-chrome-muted)]">API keys &amp; publish</p>
              </div>
            </div>
          </header>
        }
        main={<SettingsView />}
      />
    </AdminAppShell>
  );
}

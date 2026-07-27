"use client";

import type { CmsRegistryEntry } from "@/lib/cms/types";
import Link from "next/link";
import Image from "next/image";
import { clsx } from "clsx";
import { LogOut, Settings } from "lucide-react";
import { StudioBadge } from "@/components/admin/ui/StudioBadge";
import { ThemeToggle } from "@/components/admin/ui/ThemeToggle";
import { StudioIconButton } from "@/components/admin/ui/StudioIconButton";

export function StudioSidebarBrand() {
  return (
    <>
      <Image src="/logo-icon.png" alt="" width={22} height={22} className="shrink-0 rounded-md" />
      <div className="min-w-0">
        <p className="truncate text-xs font-bold leading-tight text-[var(--studio-chrome-fg)]">Conalytic</p>
        <p className="truncate text-[0.5625rem] font-semibold uppercase leading-tight tracking-widest text-[var(--studio-chrome-muted)]">
          Studio
        </p>
      </div>
    </>
  );
}

type Props = {
  registry: CmsRegistryEntry[];
  selectedId: string;
  dirtyIds: string[];
  filter: string;
  searchInputRef?: React.RefObject<HTMLInputElement | null>;
  onFilterChange: (v: string) => void;
  onSelect: (id: string) => void;
  onToggleNav?: () => void;
  loading?: boolean;
  showBrand?: boolean;
};

export function StudioSidebar({
  registry,
  selectedId,
  dirtyIds,
  filter,
  searchInputRef,
  onFilterChange,
  onSelect,
  onToggleNav,
  loading,
  showBrand = true,
}: Props) {
  const q = filter.trim().toLowerCase();
  const chrome = registry.filter((e) => e.type === "chrome" && (!q || e.label.toLowerCase().includes(q)));
  const pages = registry.filter((e) => e.type !== "chrome" && e.type !== "blog" && (!q || e.label.toLowerCase().includes(q) || e.path.includes(q)));
  const blogs = registry.filter((e) => e.type === "blog" && (!q || e.label.toLowerCase().includes(q) || e.path.includes(q)));

  function NavItem({ entry }: { entry: CmsRegistryEntry }) {
    const selected = entry.id === selectedId;
    const dirty = dirtyIds.includes(entry.id);
    return (
      <button
        type="button"
        onClick={() => onSelect(entry.id)}
        aria-current={selected ? "page" : undefined}
        className={clsx("studio-nav-item", selected && "studio-nav-item--active")}
      >
        <span className="truncate">{entry.label}</span>
        {dirty ? <StudioBadge tone="draft">Draft</StudioBadge> : null}
      </button>
    );
  }

  function SectionLabel({ children }: { children: React.ReactNode }) {
    return (
      <p className="studio-nav-section__label">{children}</p>
    );
  }

  function NavSection({
    label,
    children,
    show = true,
  }: {
    label: string;
    children: React.ReactNode;
    show?: boolean;
  }) {
    if (!show) return null;
    return (
      <section className="studio-nav-section">
        <SectionLabel>{label}</SectionLabel>
        <div className="studio-nav-section__items">{children}</div>
      </section>
    );
  }

  return (
    <>
      {showBrand ? (
        <div className="studio-sidebar__brand">
          {onToggleNav ? (
            <StudioIconButton label="Close navigation" onClick={onToggleNav} variant="chrome" className="lg:hidden">
              <span className="text-base">×</span>
            </StudioIconButton>
          ) : null}
          <StudioSidebarBrand />
        </div>
      ) : null}

      <div className="border-b border-[var(--studio-chrome-border)] p-2">
        <input
          ref={searchInputRef}
          type="search"
          placeholder="Search pages…  /"
          value={filter}
          onChange={(e) => onFilterChange(e.target.value)}
          className="w-full h-7 rounded-md border border-[var(--studio-chrome-border)] bg-[var(--studio-chrome-elevated)] px-2.5 text-xs text-[var(--studio-chrome-fg)] placeholder:text-[var(--studio-chrome-muted)] shadow-sm"
        />
      </div>

      <nav aria-label="Site content" className="studio-scroll min-h-0 flex-1 p-1.5">
        {loading ? (
          <div className="space-y-1 p-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-7 animate-pulse rounded-md bg-[var(--studio-chrome-hover)]" />
            ))}
          </div>
        ) : (
          <>
            <NavSection label="Site chrome" show={chrome.length > 0}>
              {chrome.map((e) => (
                <NavItem key={e.id} entry={e} />
              ))}
            </NavSection>

            <NavSection label="Pages" show={pages.length > 0}>
              {pages.map((e) => (
                <NavItem key={e.id} entry={e} />
              ))}
            </NavSection>

            <NavSection label="Blog posts" show={blogs.length > 0}>
              {blogs.map((e) => (
                <NavItem key={e.id} entry={e} />
              ))}
            </NavSection>
          </>
        )}
      </nav>

      <div className="flex items-center justify-between gap-1.5 border-t border-[var(--studio-chrome-border)] p-2">
        <div className="flex gap-0.5">
          <Link
            href="/admin/settings"
            className="inline-flex h-7 w-7 items-center justify-center rounded-md text-[var(--studio-chrome-muted)] transition-colors hover:bg-[var(--studio-chrome-hover)] hover:text-[var(--studio-chrome-fg)]"
            aria-label="Settings"
            title="Settings"
          >
            <Settings className="h-3.5 w-3.5" />
          </Link>
          <ThemeToggle />
        </div>
        <StudioIconButton
          label="Sign out"
          variant="chrome"
          onClick={async () => {
            await fetch("/api/admin/auth/logout", { method: "POST" });
            window.location.href = "/admin/login";
          }}
        >
          <LogOut className="h-3.5 w-3.5" />
        </StudioIconButton>
      </div>
    </>
  );
}

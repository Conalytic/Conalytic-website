"use client";

import { clsx } from "clsx";
import { StudioSidebarBrand } from "@/components/admin/layout/StudioSidebar";

type Props = {
  children: React.ReactNode;
  showNav?: boolean;
  onCloseNav?: () => void;
  showInspector?: boolean;
  onCloseInspector?: () => void;
  sidebar: React.ReactNode;
  className?: string;
};

export function AdminAppShell({
  children,
  showNav,
  onCloseNav,
  showInspector,
  onCloseInspector,
  sidebar,
  className,
}: Props) {
  return (
    <div className={clsx("flex min-h-0 flex-1 flex-col overflow-hidden", className)}>
      {children}
      {showNav && onCloseNav ? (
        <>
          <div className="studio-drawer-backdrop lg:hidden" onClick={onCloseNav} aria-hidden />
          <div className="studio-drawer studio-drawer--left lg:hidden studio-sidebar">{sidebar}</div>
        </>
      ) : null}
      {showInspector && onCloseInspector ? (
        <div className="studio-drawer-backdrop lg:hidden" onClick={onCloseInspector} aria-hidden />
      ) : null}
    </div>
  );
}

export function StudioShellLayout({
  sidebar,
  header,
  main,
  inspector,
  navOpen,
  inspectorOpen,
  mode = "workspace",
}: {
  sidebar: React.ReactNode;
  header: React.ReactNode;
  main: React.ReactNode;
  inspector?: React.ReactNode;
  navOpen?: boolean;
  inspectorOpen?: boolean;
  mode?: "workspace" | "settings";
}) {
  return (
    <div
      className={clsx(
        "studio-shell",
        navOpen && "studio-shell--nav-open",
        inspectorOpen && "studio-shell--inspector-open",
      )}
    >
      <div className="studio-shell__brand hidden lg:flex">
        <StudioSidebarBrand />
      </div>
      <div className="studio-shell__header">{header}</div>
      <aside className="studio-sidebar hidden lg:flex">{sidebar}</aside>
      <div className="studio-shell__main">
        <div
          className={clsx(
            "studio-grid",
            mode === "workspace" ? "studio-grid--workspace" : "studio-grid--settings",
          )}
        >
          {main}
          {inspector}
        </div>
      </div>
    </div>
  );
}

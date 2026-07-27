"use client";

import { clsx } from "clsx";

type Tab<T extends string> = { id: T; label: string };

type Props<T extends string> = {
  tabs: Tab<T>[];
  active: T;
  onChange: (id: T) => void;
  className?: string;
};

export function StudioTabs<T extends string>({ tabs, active, onChange, className }: Props<T>) {
  return (
    <div
      role="tablist"
      className={clsx(
        "flex gap-0.5 rounded-lg bg-[var(--studio-bg)] p-0.5",
        className,
      )}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={active === tab.id}
          onClick={() => onChange(tab.id)}
          className={clsx(
            "min-h-[28px] flex-1 rounded-md px-2 text-[11px] font-semibold transition-colors",
            active === tab.id
              ? "bg-[var(--studio-surface)] text-[var(--studio-fg)] shadow-sm"
              : "text-[var(--studio-muted)] hover:text-[var(--studio-fg)]",
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

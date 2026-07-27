"use client";

import { StudioCard } from "@/components/admin/ui/StudioCard";
import { StudioInput } from "@/components/admin/ui/StudioInput";
import { StudioTextarea } from "@/components/admin/ui/StudioTextarea";

type Props = {
  data: Record<string, unknown>;
  onChange: (next: Record<string, unknown>) => void;
  prefix?: string;
  entryLabel?: string;
  entryType?: "page" | "chrome" | "blog";
};

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function hasEditableFields(data: Record<string, unknown>): boolean {
  return Object.entries(data).some(([key, val]) => {
    if (key === "seo") return false;
    if (typeof val === "string" || typeof val === "number" || typeof val === "boolean") return true;
    if (isPlainObject(val)) return hasEditableFields(val);
    return false;
  });
}

function humanizeKey(key: string): string {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/_/g, " ")
    .replace(/^./, (c) => c.toUpperCase())
    .trim();
}

export function AdminContentForm({ data, onChange, prefix = "", entryLabel, entryType }: Props) {
  if (!hasEditableFields(data)) {
    return (
      <StudioCard>
        <p className="font-semibold text-[var(--studio-fg)]">
          {entryLabel ? `Editing: ${entryLabel}` : "No text fields yet"}
        </p>
        <p className="mt-2 text-sm text-[var(--studio-muted)]">
          {entryType === "chrome"
            ? "Try AI assist to update navigation labels and links."
            : "Use AI assist to generate copy for this page."}
        </p>
      </StudioCard>
    );
  }

  return (
    <div className="space-y-4">
      {entryLabel ? (
        <p className="text-sm text-[var(--studio-muted)]">
          Editing <strong className="text-[var(--studio-fg)]">{entryLabel}</strong>
        </p>
      ) : null}
      {Object.entries(data)
        .filter(([key]) => key !== "seo")
        .map(([key, val]) => {
          const id = `${prefix}${key}`;
          if (typeof val === "string") {
            const isLong =
              val.length > 120 ||
              key.toLowerCase().includes("markdown") ||
              key.toLowerCase().includes("body");
            return isLong ? (
              <StudioTextarea
                key={id}
                label={humanizeKey(key)}
                id={id}
                rows={6}
                value={val}
                onChange={(e) => onChange({ ...data, [key]: e.target.value })}
              />
            ) : (
              <StudioInput
                key={id}
                label={humanizeKey(key)}
                id={id}
                value={val}
                onChange={(e) => onChange({ ...data, [key]: e.target.value })}
              />
            );
          }
          if (isPlainObject(val)) {
            return (
              <StudioCard key={id} title={humanizeKey(key)}>
                <AdminContentForm data={val} prefix={`${id}-`} onChange={(nested) => onChange({ ...data, [key]: nested })} />
              </StudioCard>
            );
          }
          return null;
        })}
    </div>
  );
}

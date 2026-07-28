"use client";

import { StudioCard } from "@/components/admin/ui/StudioCard";
import { StudioTextarea } from "@/components/admin/ui/StudioTextarea";

type Props = {
  body: string;
  onChange: (body: string) => void;
};

export function AdminRobotsForm({ body, onChange }: Props) {
  return (
    <div className="space-y-4 p-4">
      <StudioCard>
        <p className="text-sm text-[var(--studio-muted)]">
          Edit the production <strong className="text-[var(--studio-fg)]">robots.txt</strong> served at{" "}
          <code className="text-xs">/robots.txt</code>. Push to staging to preview on the staging site, then promote
          to main for production.
        </p>
        <p className="mt-2 text-xs text-[var(--studio-muted)]">
          Staging always serves <code className="text-[11px]">Disallow: /</code> regardless of this file.
        </p>
      </StudioCard>
      <StudioTextarea
        label="robots.txt body"
        id="robots-body"
        rows={22}
        value={body}
        onChange={(e) => onChange(e.target.value)}
        className="font-mono text-xs leading-relaxed"
      />
    </div>
  );
}

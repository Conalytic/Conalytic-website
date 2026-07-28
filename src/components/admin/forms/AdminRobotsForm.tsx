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
          Edit the <strong className="text-[var(--studio-fg)]">robots.txt</strong> served on production after you promote staging to main.
          The Studio preview loads your <strong className="text-[var(--studio-fg)]">staging site</strong> — staging always serves{" "}
          <code className="text-[11px]">Disallow: /</code> for robots regardless of this file.
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

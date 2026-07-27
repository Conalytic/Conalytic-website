"use client";

import type { CmsSeoFields } from "@/lib/cms/types";
import { liveSearchTitle } from "@/lib/cms/live-meta-preview";
import { formatKeywordsInput, parseKeywordsInput } from "@/lib/cms/seo-keywords";
import { StudioInput } from "@/components/admin/ui/StudioInput";
import { StudioTextarea } from "@/components/admin/ui/StudioTextarea";

type Props = {
  value: CmsSeoFields;
  onChange: (next: CmsSeoFields) => void;
  /** Regular marketing page vs blog post — affects live title suffix. */
  pageKind?: "page" | "blog";
};

function counterClass(len: number, soft: number, hard: number) {
  if (len > hard) return "text-[var(--studio-danger)]";
  if (len > soft) return "text-[var(--studio-counter-warn)]";
  return "text-[var(--studio-muted)]";
}

function CharCount({ len, soft, hard }: { len: number; soft: number; hard: number }) {
  return (
    <p className={`mt-1.5 text-right text-[11px] leading-none ${counterClass(len, soft, hard)}`}>
      {len} characters
    </p>
  );
}

function SeoToggle({
  title,
  defaultOpen,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  return (
    <details
      className="rounded-lg border border-[var(--studio-border)] bg-[var(--studio-elevated)] p-3"
      open={defaultOpen}
    >
      <summary className="cursor-pointer text-xs font-semibold text-[var(--studio-fg)]">{title}</summary>
      <div className="mt-3 space-y-3">{children}</div>
    </details>
  );
}

export function AdminSeoForm({ value, onChange, pageKind = "page" }: Props) {
  const liveTitle = liveSearchTitle(value.title, pageKind);
  const liveDescription = value.description?.trim() ?? "";
  const liveOgDescription = value.ogDescription?.trim() || liveDescription;

  const titleLen = liveTitle.length;
  const descLen = liveDescription.length;
  const ogDescLen = liveOgDescription.length;
  const keywordCount = value.keywords?.length ?? 0;

  return (
    <div className="space-y-3 pb-2">
      <SeoToggle title="Live preview (Google)" defaultOpen>
        <p className="text-base leading-snug text-[var(--studio-google-link)]">{liveTitle || "—"}</p>
        <p className={`text-[11px] ${counterClass(titleLen, 55, 70)}`}>
          {titleLen ? `${titleLen} characters` : "No title"}
        </p>
        <p className="text-sm leading-relaxed text-[var(--studio-muted)]">{liveDescription || "—"}</p>
        <p className={`text-[11px] ${counterClass(descLen, 150, 170)}`}>
          {descLen ? `${descLen} characters` : "No description"}
        </p>
      </SeoToggle>

      <SeoToggle title="Meta title (base)">
        <StudioInput
          hideLabel
          label="Meta title (base)"
          hint="Base page title for search results."
          value={value.title ?? ""}
          onChange={(e) => onChange({ ...value, title: e.target.value })}
        />
        <CharCount len={value.title?.length ?? 0} soft={45} hard={60} />
      </SeoToggle>

      <SeoToggle title="Meta description">
        <StudioTextarea
          hideLabel
          label="Meta description"
          hint="Shown in search results as-is. Aim for about 160 characters."
          rows={3}
          value={value.description ?? ""}
          onChange={(e) => onChange({ ...value, description: e.target.value })}
        />
        <CharCount len={descLen} soft={150} hard={170} />
      </SeoToggle>

      <SeoToggle title="Keywords">
        <StudioTextarea
          hideLabel
          label="Keywords"
          hint="Comma-separated keywords for this page. Used in page metadata."
          rows={3}
          value={formatKeywordsInput(value.keywords)}
          onChange={(e) => onChange({ ...value, keywords: parseKeywordsInput(e.target.value) })}
        />
        <p className="text-right text-[11px] leading-none text-[var(--studio-muted)]">
          {keywordCount ? `${keywordCount} value${keywordCount === 1 ? "" : "s"}` : "No keywords"}
        </p>
      </SeoToggle>

      <SeoToggle title="OG title (base)">
        <StudioInput
          hideLabel
          label="OG title (base)"
          hint="Optional override. Leave empty to use the meta title."
          value={value.ogTitle ?? ""}
          onChange={(e) => onChange({ ...value, ogTitle: e.target.value })}
        />
        <CharCount len={value.ogTitle?.length ?? 0} soft={45} hard={60} />
      </SeoToggle>

      <SeoToggle title="OG description">
        <StudioTextarea
          hideLabel
          label="OG description"
          hint="Description for social previews."
          rows={3}
          value={value.ogDescription ?? ""}
          onChange={(e) => onChange({ ...value, ogDescription: e.target.value })}
        />
        <CharCount len={ogDescLen} soft={150} hard={170} />
      </SeoToggle>

      <SeoToggle title="Canonical URL">
        <StudioInput
          hideLabel
          label="Canonical URL"
          hint="Preferred URL for this page in search results."
          value={value.canonical ?? ""}
          onChange={(e) => onChange({ ...value, canonical: e.target.value })}
        />
      </SeoToggle>

      <SeoToggle title="Social image (optional)">
        <StudioInput
          label="OG image URL"
          value={value.ogImage ?? ""}
          onChange={(e) => onChange({ ...value, ogImage: e.target.value })}
        />
        <StudioInput
          label="OG image alt text"
          value={value.ogImageAlt ?? ""}
          onChange={(e) => onChange({ ...value, ogImageAlt: e.target.value })}
        />
      </SeoToggle>
    </div>
  );
}

import { clsx } from "clsx";

type Tone = "draft" | "success" | "muted" | "warning";

const tones: Record<Tone, string> = {
  draft: "bg-[var(--studio-badge-draft-bg)] text-[var(--studio-badge-draft-fg)]",
  success: "bg-[var(--studio-badge-success-bg)] text-[var(--studio-badge-success-fg)]",
  muted: "bg-[var(--studio-bg)] text-[var(--studio-muted)]",
  warning: "bg-[var(--studio-badge-warning-bg)] text-[var(--studio-badge-warning-fg)]",
};

export function StudioBadge({
  children,
  tone = "muted",
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[0.625rem] font-bold uppercase tracking-wide",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

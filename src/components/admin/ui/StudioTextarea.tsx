import { clsx } from "clsx";
import type { TextareaHTMLAttributes } from "react";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  hint?: string;
  hideLabel?: boolean;
};

export function StudioTextarea({ label, hint, hideLabel, id, className, ...props }: Props) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="space-y-1">
      {hideLabel ? (
        <label htmlFor={inputId} className="sr-only">
          {label}
        </label>
      ) : (
        <label htmlFor={inputId} className="block text-xs font-semibold text-[var(--studio-fg)]">
          {label}
        </label>
      )}
      {hint ? <p className="text-[11px] text-[var(--studio-muted)]">{hint}</p> : null}
      <textarea
        id={inputId}
        className={clsx(
          "w-full rounded-md border border-[var(--studio-border)] bg-[var(--studio-surface)] px-2.5 py-1.5 text-xs text-[var(--studio-fg)]",
          className,
        )}
        {...props}
      />
    </div>
  );
}

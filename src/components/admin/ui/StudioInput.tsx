import { clsx } from "clsx";
import type { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
  error?: string;
  hideLabel?: boolean;
};

export function StudioInput({ label, hint, error, hideLabel, id, className, ...props }: Props) {
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
      {hint ? (
        <p id={`${inputId}-hint`} className="text-xs text-[var(--studio-muted)]">
          {hint}
        </p>
      ) : null}
      <input
        id={inputId}
        aria-describedby={hint ? `${inputId}-hint` : undefined}
        aria-invalid={error ? true : undefined}
        className={clsx(
          "w-full min-h-[32px] rounded-md border border-[var(--studio-border)] bg-[var(--studio-surface)] px-2.5 py-1.5 text-xs text-[var(--studio-fg)] placeholder:text-[var(--studio-muted)]",
          error && "border-[var(--studio-danger)]",
          className,
        )}
        {...props}
      />
      {error ? (
        <p role="alert" className="text-xs text-[var(--studio-danger)]">
          {error}
        </p>
      ) : null}
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { StudioButton } from "@/components/admin/ui/StudioButton";

type Props = {
  open: boolean;
  title: string;
  description: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  loading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
  children?: React.ReactNode;
};

export function StudioDialog({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  loading,
  onConfirm,
  onClose,
  children,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    ref.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[400] flex items-center justify-center bg-black/50 p-4"
      role="presentation"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="studio-dialog-title"
        tabIndex={-1}
        className="w-full max-w-md rounded-2xl border border-[var(--studio-border)] bg-[var(--studio-surface)] p-6 shadow-2xl"
      >
        <h2 id="studio-dialog-title" className="text-lg font-bold text-[var(--studio-fg)]">
          {title}
        </h2>
        <div className="mt-2 text-sm leading-relaxed text-[var(--studio-muted)]">{description}</div>
        {children}
        <div className="mt-6 flex justify-end gap-2">
          <StudioButton variant="ghost" onClick={onClose}>
            {cancelLabel}
          </StudioButton>
          <StudioButton variant="primary" disabled={loading} onClick={onConfirm}>
            {loading ? "Working…" : confirmLabel}
          </StudioButton>
        </div>
      </div>
    </div>
  );
}

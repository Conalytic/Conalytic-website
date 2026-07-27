"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { clsx } from "clsx";

type Toast = { id: number; message: string; tone?: "success" | "error" | "info" };

type ToastContextValue = {
  toast: (message: string, tone?: Toast["tone"]) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function StudioToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Toast[]>([]);

  const toast = useCallback((message: string, tone: Toast["tone"] = "info") => {
    const id = Date.now();
    setItems((prev) => [...prev, { id, message, tone }]);
    setTimeout(() => setItems((prev) => prev.filter((t) => t.id !== id)), 4000);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div
        aria-live="polite"
        className="pointer-events-none fixed bottom-6 right-6 z-[500] flex flex-col gap-2"
      >
        {items.map((t) => (
          <div
            key={t.id}
            className={clsx(
              "rounded-xl px-4 py-3 text-sm font-medium shadow-lg",
              t.tone === "success" && "bg-emerald-600 text-white",
              t.tone === "error" && "bg-[var(--studio-danger)] text-white",
              t.tone === "info" && "bg-[var(--studio-ink)] text-white",
            )}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useStudioToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useStudioToast must be used within StudioToastProvider");
  return ctx;
}

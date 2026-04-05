"use client";

/**
 * Footer newsletter form — POSTs to `/api/newsletter` (Resend segment/audience or notify email).
 * Renders as one column: label, headline, body, then form (for placement beside logo in footer).
 */
import { useState } from "react";
import { cn } from "@/lib/utils";
import { EXTERNAL_PRIVACY_POLICY_URL } from "@/lib/legal-external-urls";

/** Mobile: min 48px + padding + 16px text (iOS respects this better than h-11 alone). Desktop: h-11. */
const inputClasses =
  "appearance-none box-border min-h-12 w-full min-w-0 flex-1 rounded-lg border border-gray-200 bg-white px-4 py-3.5 text-base leading-normal text-gray-900 shadow-sm " +
  "placeholder:text-gray-400 " +
  "focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 " +
  "disabled:cursor-not-allowed disabled:opacity-60 " +
  "dark:border-white/[0.12] dark:bg-white/[0.06] dark:text-white dark:placeholder:text-white/35 " +
  "dark:focus:border-brand-400 dark:focus:ring-brand-400/25 " +
  "sm:h-11 sm:min-h-0 sm:py-0 sm:text-sm";

const buttonClasses =
  "box-border inline-flex min-h-12 w-full shrink-0 items-center justify-center rounded-lg bg-brand-600 px-5 py-3 text-base font-semibold text-white shadow-sm " +
  "transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-70 " +
  "sm:h-11 sm:min-h-11 sm:w-auto sm:min-w-[10.5rem] sm:py-0 sm:text-sm";

export function NewsletterSignup({ className }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage(null);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        ok?: boolean;
        already?: boolean;
      };
      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || "Something went wrong.");
        return;
      }
      setStatus("success");
      if (data.already) {
        setMessage("You’re already on the list — thanks for your interest.");
      } else {
        setMessage("Thanks — you’re on the list.");
        setEmail("");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <section aria-labelledby="footer-newsletter-heading" className={cn("min-w-0", className)}>
      <div className="w-full max-w-lg space-y-5">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-gray-500 dark:text-white/45">
            Newsletter
          </p>
          <h2
            id="footer-newsletter-heading"
            className="mt-2 text-base font-semibold leading-snug tracking-tight text-gray-900 dark:text-white sm:text-[17px]"
          >
            Subscribe for updates
          </h2>
          <p className="mt-1.5 text-sm leading-relaxed text-gray-500 dark:text-white/55">
            Product news, analytics tips, and launch notes. Unsubscribe anytime.
          </p>
        </div>

        <div>
          <form
            onSubmit={onSubmit}
            className="flex w-full flex-col gap-2.5 sm:flex-row sm:items-stretch sm:gap-2"
          >
            <label htmlFor="footer-newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="footer-newsletter-email"
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status !== "idle") {
                  setStatus("idle");
                  setMessage(null);
                }
              }}
              placeholder="Enter your email"
              disabled={status === "loading"}
              className={inputClasses}
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className={buttonClasses}
            >
              {status === "loading" ? "Subscribing…" : "Subscribe"}
            </button>
          </form>

          <p className="mt-2.5 text-left text-[11px] leading-relaxed text-gray-400 dark:text-white/35">
            By subscribing you agree to our{" "}
            <a
              href={EXTERNAL_PRIVACY_POLICY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-gray-300 underline-offset-2 hover:text-brand-600 dark:decoration-white/20 dark:hover:text-brand-400"
            >
              Privacy Policy
            </a>
            .
          </p>

          {message ? (
            <p
              className={cn(
                "mt-2 text-left text-xs font-medium",
                status === "success" ? "text-emerald-700 dark:text-emerald-400" : "text-red-600 dark:text-red-400"
              )}
              role="status"
            >
              {message}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}

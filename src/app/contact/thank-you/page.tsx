import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Calendar, Home } from "lucide-react";
import { SITE_ORIGIN } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: "Thank you – Conalytic",
  description: "Thanks for reaching out. Complete your booking in Google Calendar if you have not already.",
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE_ORIGIN}/contact/thank-you` },
};

export default function ContactThankYouPage() {
  return (
    <div className="min-h-[70vh] bg-[#F6F7FE] dark:bg-[#0E0E14] px-4 py-28">
      <div className="mx-auto max-w-lg text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 dark:bg-emerald-500/15 border border-emerald-200 dark:border-emerald-500/25">
          <CheckCircle2 className="h-9 w-9 text-emerald-600 dark:text-emerald-400" aria-hidden />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          Thank you
        </h1>
        <p className="mt-4 text-base leading-relaxed text-gray-600 dark:text-white/65">
          A <strong className="text-gray-800 dark:text-white/85">Google Calendar</strong> tab should have
          opened so you can choose a time. Finish booking there; when you close or leave that tab,
          you&apos;ll still have this thank-you page open here.
        </p>
        <p className="mt-3 text-sm text-gray-500 dark:text-white/45">
          (Google&apos;s booking page can&apos;t redirect back to our website after you click
          &quot;Close&quot; — that only works with schedulers that support a custom return URL, e.g. some
          Calendly plans.)
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-800 shadow-sm transition hover:border-brand-300 hover:bg-brand-50/50 dark:border-white/[0.12] dark:bg-[#14141B] dark:text-white dark:hover:border-brand-500/40"
          >
            <Home className="h-4 w-4" aria-hidden />
            Back to home
          </Link>
          <a
            href={process.env.NEXT_PUBLIC_SCHEDULE_CALL_URL || "/contact"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition hover:bg-brand-700"
          >
            <Calendar className="h-4 w-4" aria-hidden />
            Open calendar again
          </a>
        </div>
        <p className="mt-8 text-xs text-gray-400 dark:text-white/35">
          Didn&apos;t see the calendar tab? Check whether your browser blocked the pop-up, then use{" "}
          <Link href="/contact" className="font-semibold text-brand-600 dark:text-brand-400 hover:underline">
            Contact
          </Link>{" "}
          to try again.
        </p>
      </div>
    </div>
  );
}

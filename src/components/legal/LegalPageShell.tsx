import type { ReactNode } from "react";
import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/utils";

const C = BRAND.colors;

/** Section anchor — ids must match `LegalNavItem.id` in the page. */
export function LegalSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-32 scroll-pb-8 lg:scroll-mt-28"
    >
      <div className="flex gap-0 sm:gap-5">
        <div
          className="hidden w-1 shrink-0 rounded-full sm:block"
          style={{
            background: `linear-gradient(180deg, ${C.electricBlue}, ${C.blueLight}, ${C.dancingPurple})`,
          }}
          aria-hidden
        />
        <div className="min-w-0 flex-1 space-y-4 border-l-2 border-transparent pl-0 sm:border-none sm:pl-0">
          <h2 className="font-heading text-xl font-bold leading-tight tracking-tight text-[#17191C] sm:text-[1.35rem] lg:text-2xl">
            <span
              className="bg-gradient-to-r from-[#17191C] via-[#532775] to-[#5E56E7] bg-clip-text text-transparent"
            >
              {title}
            </span>
          </h2>
          <div className="space-y-3 font-[family-name:var(--font-body)] text-[0.9375rem] leading-[1.75] text-[#1D2939]/90">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

export function LegalH3({ children }: { children: ReactNode }) {
  return (
    <h3 className="pt-2 font-heading text-base font-bold text-[#532775]">
      {children}
    </h3>
  );
}

export function LegalProseList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="list-none space-y-3">
      {items.map((item, i) => (
        <li
          key={i}
          className="relative pl-5 text-[0.9375rem] leading-relaxed text-[#1D2939]/90"
        >
          <span
            className="absolute left-0 top-[0.55em] size-1.5 rounded-full"
            style={{ background: C.electricBlue }}
            aria-hidden
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

/** Numbered list for sequential obligations or steps. */
export function LegalOrderedList({ items }: { items: ReactNode[] }) {
  return (
    <ol className="list-decimal space-y-3 pl-5 marker:font-semibold marker:text-[#5E56E7]">
      {items.map((item, i) => (
        <li key={i} className="pl-1 text-[0.9375rem] leading-relaxed text-[#1D2939]/90">
          {item}
        </li>
      ))}
    </ol>
  );
}

export function LegalCallout({
  variant = "note",
  title,
  children,
}: {
  variant?: "note" | "important" | "legal";
  title: string;
  children: ReactNode;
}) {
  const border =
    variant === "important"
      ? C.roseRed
      : variant === "legal"
        ? C.dancingPurple
        : C.electricBlue;
  const bg =
    variant === "important"
      ? `${C.roseRed}0d`
      : variant === "legal"
        ? `${C.dancingPurple}0c`
        : `${C.electricBlue}0f`;

  return (
    <aside
      className={cn(
        "rounded-2xl border-l-[3px] px-4 py-4 sm:px-5",
      )}
      style={{
        borderLeftColor: border,
        background: `linear-gradient(90deg, ${bg}, transparent)`,
      }}
    >
      <p className="font-heading text-sm font-bold text-[#17191C]">{title}</p>
      <div className="mt-2 text-[0.8125rem] leading-relaxed text-[#1D2939]/80">
        {children}
      </div>
    </aside>
  );
}

const legalLinkClassName =
  "font-semibold text-[#5E56E7] underline decoration-[#5E56E7]/35 underline-offset-2 transition-colors hover:text-[#532775] hover:decoration-[#532775]/50";

export function LegalLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  const external =
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:");

  if (external) {
    return (
      <a
        href={href}
        className={legalLinkClassName}
        {...(href.startsWith("http")
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={legalLinkClassName}>
      {children}
    </Link>
  );
}

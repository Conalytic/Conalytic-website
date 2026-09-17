import { cn } from "@/lib/utils";

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

/** Native details/summary FAQ — full answers in HTML for View Source and crawlers. */
export function Accordion({ items, className }: AccordionProps) {
  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item, i) => (
        <details
          key={i}
          open
          className={cn(
            "glass-card overflow-hidden rounded-2xl transition-all duration-300",
            "open:border-brand-500/40 open:glow-purple",
          )}
        >
          <summary className="flex w-full cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-left [&::-webkit-details-marker]:hidden">
            <span className="text-base font-medium text-gray-900/90 dark:text-white/90">{item.question}</span>
            <span
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-black/10 bg-black/5 text-gray-600 dark:border-white/10 dark:bg-white/5 dark:text-white/70"
              aria-hidden
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </span>
          </summary>
          <p className="px-6 pb-5 text-sm leading-relaxed text-navy-900/60 dark:text-white/72">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}

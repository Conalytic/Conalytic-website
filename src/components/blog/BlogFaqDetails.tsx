import ReactMarkdown from "react-markdown";
import Link from "next/link";
import type { BlogFaqItem } from "@/lib/parse-blog-faq";

const answerComponents = {
  p: ({ children }: { children?: React.ReactNode }) => (
    <p className="text-sm leading-relaxed text-navy-900/60 dark:text-white/72">{children}</p>
  ),
  strong: ({ children }: { children?: React.ReactNode }) => (
    <strong className="font-semibold text-gray-900 dark:text-white">{children}</strong>
  ),
  em: ({ children }: { children?: React.ReactNode }) => (
    <em className="italic text-gray-700 dark:text-white/80">{children}</em>
  ),
  a: ({ href, children }: { href?: string; children?: React.ReactNode }) => {
    const className =
      "font-medium text-brand-600 underline decoration-brand-300/50 underline-offset-2 transition-colors hover:text-brand-700 dark:text-brand-300 dark:decoration-brand-500/40 dark:hover:text-brand-500";
    if (href?.startsWith("http")) {
      return (
        <a href={href} className={className} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    }
    return (
      <Link href={href ?? "#"} className={className}>
        {children}
      </Link>
    );
  },
};

/** Server-rendered FAQ — full Q&A visible in View Source (native details/summary). */
export function BlogFaqDetails({ items }: { items: BlogFaqItem[] }) {
  if (!items.length) return null;

  return (
    <div className="my-6 space-y-3">
      {items.map((item, index) => (
        <details
          key={item.question}
          open={index === 0}
          className="overflow-hidden rounded-2xl border border-gray-200/80 bg-gray-50/50 dark:border-white/[0.08] dark:bg-white/[0.03] [&_summary]:cursor-pointer"
        >
          <summary className="px-5 py-4 text-base font-medium text-gray-900 dark:text-white/90 sm:px-6 sm:py-5">
            {item.question}
          </summary>
          <div className="border-t border-gray-200/80 px-5 pb-5 pt-3 dark:border-white/[0.06] sm:px-6 sm:pb-5">
            <ReactMarkdown components={answerComponents}>{item.answer}</ReactMarkdown>
          </div>
        </details>
      ))}
    </div>
  );
}

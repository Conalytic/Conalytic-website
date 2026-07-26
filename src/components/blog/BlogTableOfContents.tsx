"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { handleSamePageHashClick } from "@/lib/hash-nav";

export function BlogTableOfContents({ headings }: { headings: Array<{ id: string; text: string }> }) {
  const [activeId, setActiveId] = useState(headings[0]?.id ?? "");

  useEffect(() => {
    if (!headings.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target.id) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );
    for (const { id } of headings) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [headings]);

  if (!headings.length) return null;

  return (
    <nav aria-label="Table of contents" className="rounded-2xl border border-gray-200/80 bg-white p-5 dark:border-white/[0.08] dark:bg-[#14141B]">
      <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-gray-500 dark:text-white/45">
        On this page
      </p>
      <ul className="space-y-1">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              onClick={(e) => {
                handleSamePageHashClick(e, `#${h.id}`);
                setActiveId(h.id);
              }}
              className={cn(
                "block rounded-lg py-1.5 pl-3 text-sm leading-snug transition-colors border-l-2",
                activeId === h.id
                  ? "border-brand-500 text-gray-900 font-semibold dark:text-white"
                  : "border-transparent text-gray-500 hover:text-gray-800 dark:text-white/50 dark:hover:text-white/80",
              )}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

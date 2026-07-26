"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";
import Link from "next/link";
import { useMemo, useRef } from "react";

const createComponents = (headingIds: string[], h2IndexRef: { current: number }): Components => ({
  h2: ({ children, ...props }) => {
    const id = headingIds[h2IndexRef.current++] ?? undefined;
    return (
      <h2
        id={id}
        className="mt-14 mb-4 scroll-mt-28 border-b border-gray-100 pb-3 text-2xl font-bold tracking-tight text-gray-900 dark:border-white/[0.08] dark:text-white sm:text-3xl"
        {...props}
      >
        {children}
      </h2>
    );
  },
  h3: ({ children, ...props }) => (
    <h3
      className="mt-10 mb-3 scroll-mt-28 text-xl font-bold text-gray-900 dark:text-white sm:text-2xl"
      {...props}
    >
      {children}
    </h3>
  ),
  p: ({ children, ...props }) => (
    <p className="mb-5 text-[1.0625rem] leading-[1.8] text-gray-600 dark:text-white/72" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }) => (
    <ul className="mb-6 list-none space-y-2.5 pl-0 [&>li]:relative [&>li]:pl-6 [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:top-[0.65em] [&>li]:before:h-1.5 [&>li]:before:w-1.5 [&>li]:before:rounded-full [&>li]:before:bg-brand-500 [&>li]:before:content-['']" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="mb-6 list-decimal space-y-2.5 pl-6 text-[1.0625rem] leading-[1.75] text-gray-600 dark:text-white/72" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="text-[1.0625rem] leading-[1.75] text-gray-600 dark:text-white/72" {...props}>
      {children}
    </li>
  ),
  strong: ({ children, ...props }) => (
    <strong className="font-semibold text-gray-900 dark:text-white" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }) => (
    <em className="italic text-gray-700 dark:text-white/80" {...props}>
      {children}
    </em>
  ),
  a: ({ href, children, ...props }) => {
    const isExternal = href?.startsWith("http");
    const className =
      "font-medium text-brand-300 underline decoration-brand-500/40 underline-offset-2 transition-colors hover:text-brand-500";
    if (isExternal) {
      return (
        <a href={href} className={className} target="_blank" rel="noopener noreferrer" {...props}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href ?? "#"} className={className} {...props}>
        {children}
      </Link>
    );
  },
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="my-8 rounded-2xl border border-brand-100 bg-brand-50/60 px-5 py-4 text-base not-italic text-gray-700 dark:border-brand-500/20 dark:bg-brand-500/10 dark:text-white/75"
      {...props}
    >
      {children}
    </blockquote>
  ),
  code: ({ className, children, ...props }) => {
    const isBlock = className?.includes("language-");
    if (isBlock) {
      return (
        <code className={`${className} block text-sm`} {...props}>
          {children}
        </code>
      );
    }
    return (
      <code
        className="rounded-md bg-gray-100 px-1.5 py-0.5 text-[0.9em] font-mono text-brand-700 dark:bg-white/[0.08] dark:text-brand-300"
        {...props}
      >
        {children}
      </code>
    );
  },
  pre: ({ children, ...props }) => (
    <pre
      className="my-8 overflow-x-auto rounded-2xl border border-gray-200 bg-gray-950 p-5 text-sm text-gray-100 dark:border-white/[0.08]"
      {...props}
    >
      {children}
    </pre>
  ),
  table: ({ children, ...props }) => (
    <div className="my-8 overflow-x-auto rounded-2xl border border-gray-200 dark:border-white/[0.08]">
      <table className="min-w-full divide-y divide-gray-200 text-sm dark:divide-white/[0.08]" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }) => (
    <thead className="bg-gray-50 dark:bg-white/[0.04]" {...props}>
      {children}
    </thead>
  ),
  th: ({ children, ...props }) => (
    <th
      className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-white/80"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td className="px-4 py-3 text-sm text-gray-600 dark:text-white/70" {...props}>
      {children}
    </td>
  ),
  tr: ({ children, ...props }) => (
    <tr className="border-b border-gray-100 last:border-0 dark:border-white/[0.06]" {...props}>
      {children}
    </tr>
  ),
  hr: () => <hr className="my-12 border-gray-200 dark:border-white/[0.08]" />,
});

export function BlogPostMarkdown({
  markdown,
  headingIds = [],
}: {
  markdown: string;
  headingIds?: string[];
}) {
  const h2IndexRef = useRef(0);
  h2IndexRef.current = 0;
  const components = useMemo(
    () => createComponents(headingIds, h2IndexRef),
    [headingIds],
  );

  return (
    <div className="blog-article-prose">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {markdown.trim()}
      </ReactMarkdown>
    </div>
  );
}

"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function BlogPostMarkdown({ markdown }: { markdown: string }) {
  return (
    <div className="prose prose-invert prose-lg max-w-none prose-headings:scroll-mt-24 prose-a:text-brand-400 prose-a:no-underline hover:prose-a:underline">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
    </div>
  );
}

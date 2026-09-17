import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { BlogFaqDetails } from "@/components/blog/BlogFaqDetails";
import { createBlogMarkdownComponents } from "@/lib/blog-markdown-components";
import { splitBlogMarkdownWithFaq } from "@/lib/parse-blog-faq";

const faqHeadingClassName =
  "mt-12 mb-4 scroll-mt-24 border-b border-gray-100 pb-3 text-xl font-bold tracking-tight text-gray-900 dark:border-white/[0.08] dark:text-white sm:mt-14 sm:scroll-mt-28 sm:text-2xl md:text-3xl";

/** Server-rendered blog body — full article text appears in View Source. */
export function BlogPostMarkdown({
  markdown,
  headingIds = [],
}: {
  markdown: string;
  headingIds?: string[];
}) {
  const { before, faqs, after, hasFaq } = splitBlogMarkdownWithFaq(markdown);
  const faqH2Index = (before.match(/^## /gm) || []).length;
  const faqHeadingId = hasFaq ? headingIds[faqH2Index] : undefined;

  const beforeCounter = { value: 0 };
  const afterCounter = { value: 0 };
  const beforeComponents = createBlogMarkdownComponents(headingIds, beforeCounter, 0);
  const afterComponents = createBlogMarkdownComponents(headingIds, afterCounter, faqH2Index + 1);

  return (
    <div className="blog-article-prose">
      {before ? (
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={beforeComponents}>
          {before.trim()}
        </ReactMarkdown>
      ) : null}

      {hasFaq ? (
        <>
          <h2 id={faqHeadingId} className={faqHeadingClassName}>
            Frequently asked questions
          </h2>
          <BlogFaqDetails items={faqs} />
        </>
      ) : null}

      {after ? (
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={afterComponents}>
          {after.trim()}
        </ReactMarkdown>
      ) : null}
    </div>
  );
}

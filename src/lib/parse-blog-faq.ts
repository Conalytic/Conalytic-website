export interface BlogFaqItem {
  question: string;
  answer: string;
}

const FAQ_SECTION_HEADING = /^## Frequently asked questions\s*$/m;

/** Split blog markdown into body, FAQ items, and trailing sections. */
export function splitBlogMarkdownWithFaq(markdown: string): {
  before: string;
  faqs: BlogFaqItem[];
  after: string;
  hasFaq: boolean;
} {
  const match = markdown.match(FAQ_SECTION_HEADING);
  if (!match || match.index === undefined) {
    return { before: markdown, faqs: [], after: "", hasFaq: false };
  }

  const before = markdown.slice(0, match.index).trimEnd();
  const afterHeading = markdown.slice(match.index + match[0].length);
  const nextH2 = afterHeading.search(/^## /m);

  const faqBlock = (nextH2 === -1 ? afterHeading : afterHeading.slice(0, nextH2)).trim();
  const after = nextH2 === -1 ? "" : afterHeading.slice(nextH2).trimStart();

  return {
    before,
    faqs: parseBlogFaqItems(faqBlock),
    after,
    hasFaq: true,
  };
}

function parseBlogFaqItems(block: string): BlogFaqItem[] {
  const items: BlogFaqItem[] = [];
  let question: string | null = null;
  let answerLines: string[] = [];

  const flush = () => {
    if (!question) return;
    items.push({ question, answer: answerLines.join("\n").trim() });
    question = null;
    answerLines = [];
  };

  for (const line of block.split("\n")) {
    const questionMatch = line.match(/^\*\*(.+)\*\*$/);
    if (questionMatch) {
      flush();
      question = questionMatch[1].trim();
      continue;
    }
    if (question && line.trim()) {
      answerLines.push(line);
    }
  }

  flush();
  return items;
}

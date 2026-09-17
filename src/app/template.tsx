/** Route template — no opacity wrapper (SEO: content must be visible in SSR HTML). */
export default function Template({ children }: { children: React.ReactNode }) {
  return children;
}

/** Preview iframe must scroll like a normal page — not inside the fixed admin shell. */
export default function PreviewFrameLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-[var(--bg)]">{children}</div>;
}

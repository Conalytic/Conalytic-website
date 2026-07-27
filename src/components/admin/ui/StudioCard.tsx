export function StudioCard({
  title,
  children,
  className = "",
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border border-[var(--studio-border)] bg-[var(--studio-surface)] p-4 shadow-sm ${className}`}
    >
      {title ? <h3 className="mb-3 text-xs font-bold text-[var(--studio-fg)]">{title}</h3> : null}
      {children}
    </div>
  );
}

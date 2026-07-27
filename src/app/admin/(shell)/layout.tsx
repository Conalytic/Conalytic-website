export default function AdminShellLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-root">
      <div className="studio-app-box">{children}</div>
    </div>
  );
}

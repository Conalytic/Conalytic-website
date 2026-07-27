import { Suspense } from "react";
import { LoginScreen } from "@/components/admin/login/LoginScreen";

export default function AdminLoginRoute() {
  return (
    <div className="studio-scroll h-full">
      <Suspense fallback={<div className="p-8 text-center text-[var(--studio-muted)]">Loading…</div>}>
        <LoginScreen />
      </Suspense>
    </div>
  );
}

"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { StudioButton } from "@/components/admin/ui/StudioButton";
import { StudioCard } from "@/components/admin/ui/StudioCard";
import { StudioInput } from "@/components/admin/ui/StudioInput";

export function LoginScreen() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/admin/studio";
  const configError = searchParams.get("error");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (!res.ok) {
      setError("Incorrect password. Please try again.");
      return;
    }
    router.push(next);
    router.refresh();
  }

  return (
    <div className="studio-login-bg studio-scroll flex min-h-dvh items-center justify-center p-4 sm:p-6">
      <StudioCard className="w-full max-w-md !p-8 shadow-xl">
        <div className="mb-8 flex flex-col items-center text-center">
          <Image src="/logo-icon.png" alt="" width={48} height={48} className="rounded-xl" />
          <h1 className="mt-4 text-2xl font-bold text-[var(--studio-fg)]">Conalytic Studio</h1>
          <p className="mt-1 text-sm text-[var(--studio-muted)]">Sign in to edit content, SEO, and site chrome</p>
        </div>
        <form onSubmit={onSubmit} className="space-y-4" aria-describedby={error ? "login-error" : undefined}>
          {configError === "not_configured" ? (
            <p className="rounded-lg border border-[var(--studio-danger)] bg-[rgba(240,68,56,0.08)] px-3 py-2 text-xs text-[var(--studio-danger)]">
              Admin login is not configured on this deployment. Set ADMIN_PASSWORD and ADMIN_SESSION_SECRET (32+
              characters) in Vercel environment variables.
            </p>
          ) : null}
          <StudioInput
            label="Password"
            id="admin-password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={error || undefined}
          />
          <StudioButton type="submit" variant="primary" className="w-full" disabled={loading}>
            {loading ? "Signing in…" : "Sign in"}
          </StudioButton>
        </form>
      </StudioCard>
    </div>
  );
}

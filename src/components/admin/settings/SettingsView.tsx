"use client";

import { useEffect, useState, type FormEvent } from "react";
import { StudioBadge } from "@/components/admin/ui/StudioBadge";
import { StudioButton } from "@/components/admin/ui/StudioButton";
import { StudioCard } from "@/components/admin/ui/StudioCard";
import { StudioInput } from "@/components/admin/ui/StudioInput";
import { useStudioToast } from "@/components/admin/ui/StudioToast";

type Settings = {
  openaiConfigured: boolean;
  anthropicConfigured: boolean;
  githubConfigured: boolean;
  openaiModel: string;
  anthropicModel: string;
  githubRepo: string;
  stagingBranch: string;
  stagingPreviewUrl: string;
  vercelDeployHookConfigured?: boolean;
  storageMode?: string;
  canSaveSettings?: boolean;
  storageMessage?: string;
};

export function SettingsView() {
  const { toast } = useStudioToast();
  const [settings, setSettings] = useState<Settings | null>(null);
  const [openaiKey, setOpenaiKey] = useState("");
  const [anthropicKey, setAnthropicKey] = useState("");
  const [githubToken, setGithubToken] = useState("");
  const [vercelDeployHook, setVercelDeployHook] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    void fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((json: Settings) => setSettings(json));
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!settings) return;
    setSaving(true);
    const body: Record<string, string> = {
      openaiModel: settings.openaiModel,
      anthropicModel: settings.anthropicModel,
      githubRepo: settings.githubRepo,
      stagingBranch: settings.stagingBranch,
      stagingPreviewUrl: settings.stagingPreviewUrl,
    };
    if (openaiKey) body.openaiApiKey = openaiKey;
    if (anthropicKey) body.anthropicApiKey = anthropicKey;
    if (githubToken) body.githubToken = githubToken;
    if (vercelDeployHook) body.vercelStagingDeployHook = vercelDeployHook;
    const res = await fetch("/api/admin/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const json = (await res.json()) as { error?: string };
    setSaving(false);
    if (res.ok) {
      toast("Settings saved", "success");
      const refreshed = await fetch("/api/admin/settings").then((r) => r.json());
      setSettings(refreshed as Settings);
    } else {
      toast(json.error || "Save failed", "error");
    }
    setOpenaiKey("");
    setAnthropicKey("");
    setGithubToken("");
    setVercelDeployHook("");
  }

  if (!settings) {
    return (
      <div className="studio-settings-main">
        <div className="studio-settings-inner space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 animate-pulse rounded-xl bg-[var(--studio-border)]" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="studio-settings-main">
      <div className="studio-settings-inner">
        <h1 className="text-2xl font-bold text-[var(--studio-fg)]">API keys &amp; publish</h1>
        <p className="mt-1 text-sm text-[var(--studio-muted)]">
          Keys are encrypted and never shown again after saving.
        </p>
        {settings.canSaveSettings === false && settings.storageMessage ? (
          <p className="mt-3 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-[var(--studio-fg)]">
            {settings.storageMessage}
          </p>
        ) : null}

        <form onSubmit={onSubmit} className="mt-8 space-y-6 pb-12">
          <StudioCard title="OpenAI">
            {settings.openaiConfigured ? <StudioBadge tone="success">Configured</StudioBadge> : <StudioBadge>Not set</StudioBadge>}
            <div className="mt-4 space-y-4">
              <StudioInput
                label="API key"
                type="password"
                autoComplete="off"
                placeholder="sk-…"
                value={openaiKey}
                onChange={(e) => setOpenaiKey(e.target.value)}
              />
              <StudioInput
                label="Default model"
                value={settings.openaiModel}
                onChange={(e) => setSettings({ ...settings, openaiModel: e.target.value })}
              />
            </div>
          </StudioCard>

          <StudioCard title="Anthropic">
            {settings.anthropicConfigured ? <StudioBadge tone="success">Configured</StudioBadge> : <StudioBadge>Not set</StudioBadge>}
            <div className="mt-4 space-y-4">
              <StudioInput
                label="API key"
                type="password"
                autoComplete="off"
                value={anthropicKey}
                onChange={(e) => setAnthropicKey(e.target.value)}
              />
              <StudioInput
                label="Default model"
                value={settings.anthropicModel}
                onChange={(e) => setSettings({ ...settings, anthropicModel: e.target.value })}
              />
            </div>
          </StudioCard>

          <StudioCard title="GitHub (publish to staging)">
            {settings.githubConfigured ? <StudioBadge tone="success">Configured</StudioBadge> : <StudioBadge>Not set</StudioBadge>}
            <div className="mt-4 space-y-4">
              <StudioInput
                label="Personal access token"
                type="password"
                autoComplete="off"
                value={githubToken}
                onChange={(e) => setGithubToken(e.target.value)}
              />
              <StudioInput
                label="Repository (owner/name)"
                value={settings.githubRepo}
                onChange={(e) => setSettings({ ...settings, githubRepo: e.target.value })}
              />
              <StudioInput
                label="Staging branch"
                value={settings.stagingBranch}
                onChange={(e) => setSettings({ ...settings, stagingBranch: e.target.value })}
                hint="CMS publishes here only. main/master are blocked — production stays on main."
              />
              <StudioInput
                label="Staging preview URL (Vercel)"
                value={settings.stagingPreviewUrl}
                onChange={(e) => setSettings({ ...settings, stagingPreviewUrl: e.target.value })}
                hint="Use the Vercel Preview URL for the staging branch (Deployments → staging → Visit). Avoid SSO-protected domains unless you set STAGING_PREVIEW_BYPASS_TOKEN on production."
              />
              <StudioInput
                label="Vercel staging deploy hook"
                type="password"
                autoComplete="off"
                value={vercelDeployHook}
                onChange={(e) => setVercelDeployHook(e.target.value)}
                hint={
                  settings.vercelDeployHookConfigured
                    ? "Optional — remove from Settings if you see duplicate Vercel builds (git push already deploys staging)."
                    : "Usually not needed when Vercel is connected to GitHub. Only use if staging branch auto-deploy is disabled."
                }
              />
            </div>
          </StudioCard>

          <StudioButton type="submit" variant="primary" disabled={saving || settings.canSaveSettings === false}>
            {saving ? "Saving…" : "Save settings"}
          </StudioButton>
        </form>
      </div>
    </div>
  );
}

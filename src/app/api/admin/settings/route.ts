import { NextResponse } from "next/server";
import { requireAdminSessionOrRespond } from "@/lib/admin/auth";
import {
  getAdminSettings,
  getCmsStorageStatus,
  saveAdminSettings,
  type AdminSettings,
} from "@/lib/cms/draft-store";
import { assertPublishBranchAllowed } from "@/lib/cms/publish-config";
import { resolveStagingPreviewBase } from "@/lib/cms/staging-preview-url";

export async function GET() {
  const auth = await requireAdminSessionOrRespond();
  if (auth instanceof NextResponse) return auth;

  const settings = await getAdminSettings();
  const storage = getCmsStorageStatus();
  return NextResponse.json({
    openaiConfigured: Boolean(settings.openaiApiKey || process.env.OPENAI_API_KEY),
    anthropicConfigured: Boolean(settings.anthropicApiKey || process.env.ANTHROPIC_API_KEY),
    githubConfigured: Boolean(settings.githubToken || process.env.GITHUB_TOKEN),
    openaiModel: settings.openaiModel ?? "gpt-4.1",
    anthropicModel: settings.anthropicModel ?? "claude-sonnet-4-20250514",
    githubRepo: settings.githubRepo ?? "Conalytic/Conalytic-website",
    stagingBranch: settings.stagingBranch ?? "staging",
    stagingPreviewUrl: resolveStagingPreviewBase(settings) ?? "",
    vercelDeployHookConfigured: Boolean(
      settings.vercelStagingDeployHook?.trim() ||
        process.env.VERCEL_STAGING_DEPLOY_HOOK_URL?.trim() ||
        process.env.VERCEL_DEPLOY_HOOK_URL?.trim(),
    ),
    storageMode: storage.mode,
    canSaveSettings: storage.canSaveSettings,
    storageMessage: storage.message,
  });
}

export async function PATCH(request: Request) {
  const auth = await requireAdminSessionOrRespond();
  if (auth instanceof NextResponse) return auth;

  const storage = getCmsStorageStatus();
  if (!storage.canSaveSettings) {
    return NextResponse.json(
      { error: storage.message ?? "Settings cannot be saved on this host." },
      { status: 503 },
    );
  }

  try {
    const body = (await request.json()) as Partial<AdminSettings>;
    const current = await getAdminSettings();
    const next: AdminSettings = {
      ...current,
      ...body,
    };

    if (next.stagingBranch) {
      try {
        assertPublishBranchAllowed(next.stagingBranch);
      } catch (e) {
        const message = e instanceof Error ? e.message : "Invalid staging branch";
        return NextResponse.json({ error: message }, { status: 400 });
      }
    }

    await saveAdminSettings(next);
    return NextResponse.json({ ok: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Save failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

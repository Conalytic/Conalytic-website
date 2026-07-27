import { NextResponse } from "next/server";
import { requireAdminSessionOrRespond } from "@/lib/admin/auth";
import { getAdminSettings, saveAdminSettings, type AdminSettings } from "@/lib/cms/draft-store";
import { assertPublishBranchAllowed } from "@/lib/cms/publish-config";

export async function GET() {
  const auth = await requireAdminSessionOrRespond();
  if (auth instanceof NextResponse) return auth;

  const settings = await getAdminSettings();
  return NextResponse.json({
    openaiConfigured: Boolean(settings.openaiApiKey || process.env.OPENAI_API_KEY),
    anthropicConfigured: Boolean(settings.anthropicApiKey || process.env.ANTHROPIC_API_KEY),
    githubConfigured: Boolean(settings.githubToken || process.env.GITHUB_TOKEN),
    openaiModel: settings.openaiModel ?? "gpt-4.1-mini",
    anthropicModel: settings.anthropicModel ?? "claude-sonnet-4-20250514",
    githubRepo: settings.githubRepo ?? "Conalytic/Conalytic-website",
    stagingBranch: settings.stagingBranch ?? "staging",
  });
}

export async function PATCH(request: Request) {
  const auth = await requireAdminSessionOrRespond();
  if (auth instanceof NextResponse) return auth;

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
}

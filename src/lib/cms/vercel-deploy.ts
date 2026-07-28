import type { AdminSettings } from "@/lib/cms/draft-store";

export function resolveVercelStagingDeployHook(settings?: AdminSettings): string | null {
  const url =
    settings?.vercelStagingDeployHook?.trim() ||
    process.env.VERCEL_STAGING_DEPLOY_HOOK_URL?.trim() ||
    process.env.VERCEL_DEPLOY_HOOK_URL?.trim();
  return url || null;
}

/** POST to a Vercel deploy hook to build the staging deployment (non-blocking). */
export async function triggerVercelStagingDeploy(settings?: AdminSettings): Promise<{
  triggered: boolean;
  message: string;
}> {
  const hookUrl = resolveVercelStagingDeployHook(settings);
  if (!hookUrl) {
    return {
      triggered: false,
      message:
        "GitHub updated. If Vercel is connected to the staging branch, a build should start automatically.",
    };
  }

  try {
    const res = await fetch(hookUrl, {
      method: "POST",
      signal: AbortSignal.timeout(15_000),
    });
    if (!res.ok) {
      return {
        triggered: false,
        message: `GitHub updated but Vercel deploy hook failed (${res.status}). Check the hook URL in Settings.`,
      };
    }
    return {
      triggered: true,
      message: "GitHub updated and Vercel staging build triggered.",
    };
  } catch (error) {
    const detail = error instanceof Error ? error.message : "request failed";
    return {
      triggered: false,
      message: `GitHub updated but Vercel deploy hook failed (${detail}).`,
    };
  }
}

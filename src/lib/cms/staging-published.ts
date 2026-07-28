import { Octokit } from "octokit";
import { getAdminSettings } from "@/lib/cms/draft-store";
import { fetchGithubJsonFile, resolveGithubRepo } from "@/lib/cms/github-cms";
import { readCmsJson } from "@/lib/cms/read-cms-file";
import { resolveStagingBranch } from "@/lib/cms/publish-config";

/** Published CMS JSON from GitHub staging branch, or local file fallback. */
export async function getStagingPublishedCmsJson(
  contentFile: string,
): Promise<Record<string, unknown> | null> {
  const settings = await getAdminSettings();
  const token = settings.githubToken?.trim() || process.env.GITHUB_TOKEN?.trim();
  const repoParts = resolveGithubRepo(settings);

  if (token && repoParts) {
    try {
      const branch = resolveStagingBranch(settings.stagingBranch);
      const octokit = new Octokit({ auth: token, request: { timeout: 20_000 } });
      const fromGithub = await fetchGithubJsonFile(
        octokit,
        repoParts.owner,
        repoParts.repo,
        branch,
        `content/cms/${contentFile}`,
      );
      if (fromGithub) return fromGithub;
    } catch {
      /* fall back to local */
    }
  }

  return readCmsJson<Record<string, unknown>>(contentFile);
}

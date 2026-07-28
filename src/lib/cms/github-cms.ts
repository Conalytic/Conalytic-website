import type { Octokit } from "octokit";

export async function fetchGithubJsonFile(
  octokit: Octokit,
  owner: string,
  repo: string,
  branch: string,
  repoPath: string,
): Promise<Record<string, unknown> | null> {
  try {
    const { data } = await octokit.rest.repos.getContent({
      owner,
      repo,
      path: repoPath,
      ref: branch,
    });
    if (Array.isArray(data) || data.type !== "file") return null;
    const file = data;
    if (!file.content) return null;
    const raw =
      file.encoding === "base64"
        ? Buffer.from(file.content, "base64").toString("utf8")
        : file.content;
    return JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return null;
  }
}

export function resolveGithubRepo(settings: {
  githubRepo?: string;
}): { owner: string; repo: string } | null {
  const repoFull = settings.githubRepo?.trim() || process.env.GITHUB_REPO?.trim() || "Conalytic/Conalytic-website";
  const [owner, repo] = repoFull.split("/");
  if (!owner || !repo) return null;
  return { owner, repo };
}

import { Octokit } from "octokit";
import { NextResponse } from "next/server";
import { adminSessionId, requireAdminSessionOrRespond } from "@/lib/admin/auth";
import {
  clearAllDrafts,
  getAdminSettings,
  getDraft,
  listDraftRegistryIds,
} from "@/lib/cms/draft-store";
import { triggerVercelStagingDeploy } from "@/lib/cms/vercel-deploy";
import { CMS_REGISTRY, getRegistryEntryById } from "@/lib/cms/page-registry";
import {
  cmsPublishCommitIdentity,
  resolveStagingBranch,
} from "@/lib/cms/publish-config";
import { deepMerge } from "@/lib/cms/deep-merge";
import { fetchGithubJsonFile, resolveGithubRepo } from "@/lib/cms/github-cms";

export const maxDuration = 60;

function publishErrorMessage(error: unknown): string {
  if (error && typeof error === "object") {
    const err = error as { message?: string; status?: number };
    if (err.status === 401 || err.status === 403) {
      return "GitHub rejected the token (401/403). In Settings, add a PAT with Contents: Read and write on this repo.";
    }
    if (err.status === 404) {
      return "GitHub repo or staging branch not found. Check repository name and that the staging branch exists.";
    }
    if (err.message) return err.message;
  }
  if (error instanceof Error) return error.message;
  return "Publish failed";
}

export async function POST() {
  try {
    const auth = await requireAdminSessionOrRespond();
    if (auth instanceof NextResponse) return auth;

    const sessionId = adminSessionId(auth);
    const dirtyIds = await listDraftRegistryIds(sessionId);

    if (dirtyIds.length === 0) {
      return NextResponse.json({ error: "No drafts to publish" }, { status: 400 });
    }

    const settings = await getAdminSettings();
    const token = settings.githubToken?.trim() || process.env.GITHUB_TOKEN?.trim();
    if (!token) {
      return NextResponse.json(
        { error: "GitHub token not configured. Add a PAT in Admin → Settings." },
        { status: 400 },
      );
    }

    const repoFull = settings.githubRepo || process.env.GITHUB_REPO || "Conalytic/Conalytic-website";
    const repoParts = resolveGithubRepo(settings);
    if (!repoParts) {
      return NextResponse.json({ error: "Invalid repository setting (use owner/name)." }, { status: 400 });
    }
    const { owner, repo } = repoParts;

    let branch: string;
    try {
      branch = resolveStagingBranch(settings.stagingBranch);
    } catch (e) {
      const message = e instanceof Error ? e.message : "Invalid staging branch";
      return NextResponse.json({ error: message }, { status: 400 });
    }

    const octokit = new Octokit({ auth: token, request: { timeout: 45_000 } });

    let baseSha: string;
    let baseTreeSha: string;
    try {
      const ref = await octokit.rest.git.getRef({ owner, repo, ref: `heads/${branch}` });
      baseSha = ref.data.object.sha;
      const baseCommit = await octokit.rest.git.getCommit({ owner, repo, commit_sha: baseSha });
      baseTreeSha = baseCommit.data.tree.sha;
    } catch {
      const mainRef = await octokit.rest.git.getRef({ owner, repo, ref: "heads/main" });
      await octokit.rest.git.createRef({
        owner,
        repo,
        ref: `refs/heads/${branch}`,
        sha: mainRef.data.object.sha,
      });
      baseSha = mainRef.data.object.sha;
      const baseCommit = await octokit.rest.git.getCommit({ owner, repo, commit_sha: baseSha });
      baseTreeSha = baseCommit.data.tree.sha;
    }

    const treeItems: { path: string; mode: "100644"; type: "blob"; content: string }[] = [];

    for (const registryId of dirtyIds) {
      const entry = getRegistryEntryById(registryId);
      if (!entry) continue;
      const draft = await getDraft(sessionId, registryId);
      if (!draft) continue;

      const filePath = `content/cms/${entry.contentFile}`;
      const existing =
        (await fetchGithubJsonFile(octokit, owner, repo, branch, filePath)) ?? {};

      if (entry.type === "robots") {
        const draftBody =
          typeof (draft.data as { body?: string }).body === "string"
            ? (draft.data as { body?: string }).body!.trim()
            : "";
        if (!draftBody) {
          return NextResponse.json(
            {
              error:
                "Robots.txt draft is empty. Click Save draft with your robots content before pushing to staging.",
            },
            { status: 400 },
          );
        }
      }

      const merged = deepMerge(existing, draft.data as Record<string, unknown>);
      treeItems.push({
        path: filePath,
        mode: "100644",
        type: "blob",
        content: `${JSON.stringify(merged, null, 2)}\n`,
      });
    }

    if (treeItems.length === 0) {
      return NextResponse.json({ error: "Nothing to commit" }, { status: 400 });
    }

    const labels = dirtyIds
      .map((id) => CMS_REGISTRY.find((e) => e.id === id)?.label)
      .filter(Boolean)
      .join(", ");

    const { data: tree } = await octokit.rest.git.createTree({
      owner,
      repo,
      base_tree: baseTreeSha,
      tree: treeItems,
    });

    const { data: commit } = await octokit.rest.git.createCommit({
      owner,
      repo,
      message: `cms: update ${labels} [admin]`,
      tree: tree.sha,
      parents: [baseSha],
      ...cmsPublishCommitIdentity(),
    });

    await octokit.rest.git.updateRef({
      owner,
      repo,
      ref: `heads/${branch}`,
      sha: commit.sha,
    });

    try {
      await clearAllDrafts(sessionId, dirtyIds);
    } catch (clearError) {
      console.error("Publish succeeded but draft cleanup failed:", clearError);
    }

    const deploy = await triggerVercelStagingDeploy(settings);

    return NextResponse.json({
      ok: true,
      commitUrl: `https://github.com/${owner}/${repo}/commit/${commit.sha}`,
      branch,
      files: treeItems.map((t) => t.path),
      deployTriggered: deploy.triggered,
      deployMessage: deploy.message,
    });
  } catch (error) {
    console.error("CMS publish failed:", error);
    return NextResponse.json({ error: publishErrorMessage(error) }, { status: 500 });
  }
}

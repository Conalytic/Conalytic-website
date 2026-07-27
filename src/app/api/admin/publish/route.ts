import { Octokit } from "octokit";
import { NextResponse } from "next/server";
import { adminSessionId, requireAdminSessionOrRespond } from "@/lib/admin/auth";
import {
  clearAllDrafts,
  getAdminSettings,
  getDraft,
  listDraftRegistryIds,
} from "@/lib/cms/draft-store";
import { CMS_REGISTRY, getRegistryEntryById } from "@/lib/cms/page-registry";
import {
  cmsPublishCommitIdentity,
  resolveStagingBranch,
} from "@/lib/cms/publish-config";
import { readFile } from "fs/promises";
import { cmsFilePath } from "@/lib/cms/read-cms-file";

export async function POST() {
  const auth = await requireAdminSessionOrRespond();
  if (auth instanceof NextResponse) return auth;

  const sessionId = adminSessionId(auth);
  const dirtyIds = await listDraftRegistryIds(sessionId);

  if (dirtyIds.length === 0) {
    return NextResponse.json({ error: "No drafts to publish" }, { status: 400 });
  }

  const settings = await getAdminSettings();
  const token = settings.githubToken || process.env.GITHUB_TOKEN;
  if (!token) {
    return NextResponse.json({ error: "GitHub token not configured" }, { status: 400 });
  }

  const repoFull = settings.githubRepo || process.env.GITHUB_REPO || "Conalytic/Conalytic-website";
  const [owner, repo] = repoFull.split("/");

  let branch: string;
  try {
    branch = resolveStagingBranch(settings.stagingBranch);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Invalid staging branch";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  const octokit = new Octokit({ auth: token });

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
    let existing: Record<string, unknown> = {};
    try {
      const raw = await readFile(cmsFilePath(entry.contentFile), "utf8");
      existing = JSON.parse(raw) as Record<string, unknown>;
    } catch {
      /* new file */
    }

    const merged = { ...existing, ...draft.data };
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

  await clearAllDrafts(sessionId, dirtyIds);

  return NextResponse.json({
    ok: true,
    commitUrl: `https://github.com/${owner}/${repo}/commit/${commit.sha}`,
    branch,
  });
}

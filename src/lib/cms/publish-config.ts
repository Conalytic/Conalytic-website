/** Branches the CMS must never write to — production stays on main. */
export const PROTECTED_PUBLISH_BRANCHES = new Set(["main", "master"]);

export const CMS_PUBLISH_AUTHOR = {
  name: process.env.GITHUB_COMMIT_AUTHOR_NAME || "Conalytic Admin",
  email: process.env.GITHUB_COMMIT_AUTHOR_EMAIL || "admin@conalytic.com",
};

export const DEFAULT_STAGING_BRANCH =
  process.env.GITHUB_STAGING_BRANCH?.trim() || "staging";

export function resolveStagingBranch(custom?: string): string {
  const branch = (custom?.trim() || DEFAULT_STAGING_BRANCH).replace(/^refs\/heads\//, "");
  assertPublishBranchAllowed(branch);
  return branch;
}

export function assertPublishBranchAllowed(branch: string): void {
  const normalized = branch.trim().toLowerCase();
  if (!normalized) {
    throw new Error("Staging branch name is required.");
  }
  if (PROTECTED_PUBLISH_BRANCHES.has(normalized)) {
    throw new Error(
      `Publishing to "${branch}" is blocked. Admin only updates the staging branch; main stays live.`,
    );
  }
}

export function cmsPublishCommitIdentity() {
  const date = new Date().toISOString();
  return {
    author: { ...CMS_PUBLISH_AUTHOR, date },
    committer: { ...CMS_PUBLISH_AUTHOR, date },
  };
}

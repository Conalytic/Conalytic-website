# CMS staging deployment

The Admin Studio **Push to staging** button commits changed `content/cms/*.json` files to the `staging` branch via the GitHub API.

## One-time setup

1. **GitHub** — Create a `staging` branch from `main`:
   ```bash
   chmod +x scripts/create-staging-branch.sh
   ./scripts/create-staging-branch.sh
   ```
   Uses author **Conalytic Admin <admin@conalytic.com>** for any local git metadata. The publish API also attributes CMS commits to that identity.
2. **GitHub PAT** — Fine-grained token with **Contents: Read and write** on this repo. Save it in **Admin → Settings** or set `GITHUB_TOKEN`.
3. **Vercel** — Keep **Production Branch** as `main`. Enable preview deployments for `staging`, or add a separate project pointed at `staging`.
4. **Staging env** — Set `NEXT_PUBLIC_SITE_URL` to your staging URL, `ALLOW_SEARCH_INDEXING=false`, and the same admin env vars as production.

## Publish safety

- **Push to staging** in Admin Studio writes **only** to the configured staging branch (default `staging`).
- **`main` and `master` are blocked** in code — the admin panel cannot update production directly.
- Merge `staging` → `main` manually (or via PR) when content is approved for live.

## Environment variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `ADMIN_PASSWORD` | Yes | Shared admin login password |
| `ADMIN_SESSION_SECRET` | Yes | 32+ character secret for iron-session |
| `ADMIN_ENCRYPTION_KEY` | Recommended | Encrypts API keys in settings (falls back to session secret) |
| `UPSTASH_REDIS_REST_URL` | Optional | Draft storage (uses `.cms-drafts/` locally if unset) |
| `UPSTASH_REDIS_REST_TOKEN` | Optional | Draft storage |
| `GITHUB_REPO` | Optional | Default `Conalytic/Conalytic-website` |
| `GITHUB_STAGING_BRANCH` | Optional | Default `staging` |
| `GITHUB_COMMIT_AUTHOR_NAME` | Optional | Default `Conalytic Admin` |
| `GITHUB_COMMIT_AUTHOR_EMAIL` | Optional | Default `admin@conalytic.com` |

## Developer workflow

- Edit React components and routes in `src/` via Cursor as usual.
- When default copy changes, run `npm run export-cms` to refresh JSON baselines.
- Analysts edit overlays in `/admin/studio` and push to `staging` for review before merging to `main`.

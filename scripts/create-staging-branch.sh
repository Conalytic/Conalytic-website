#!/usr/bin/env bash
# Create (or verify) the GitHub staging branch from main.
# CMS admin publishes only to this branch — main stays production.
set -euo pipefail

REPO="${GITHUB_REPO:-Conalytic/Conalytic-website}"
BRANCH="${GITHUB_STAGING_BRANCH:-staging}"
AUTHOR_NAME="${GIT_AUTHOR_NAME:-Conalytic Admin}"
AUTHOR_EMAIL="${GIT_AUTHOR_EMAIL:-admin@conalytic.com}"

export GIT_AUTHOR_NAME="$AUTHOR_NAME"
export GIT_COMMITTER_NAME="$AUTHOR_NAME"
export GIT_AUTHOR_EMAIL="$AUTHOR_EMAIL"
export GIT_COMMITTER_EMAIL="$AUTHOR_EMAIL"

echo "Repository: $REPO"
echo "Staging branch: $BRANCH"
echo "Author: $AUTHOR_NAME <$AUTHOR_EMAIL>"

git fetch origin main

if git ls-remote --exit-code --heads origin "$BRANCH" >/dev/null 2>&1; then
  echo "Branch origin/$BRANCH already exists."
  exit 0
fi

echo "Creating origin/$BRANCH from origin/main…"
git push origin "origin/main:refs/heads/$BRANCH"
echo "Done: https://github.com/$REPO/tree/$BRANCH"

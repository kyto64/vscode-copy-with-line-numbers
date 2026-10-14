---
root: false
targets:
  - '*'
description: "Git worktree workflow"
globs:
  - '**/*'
cursor:
  alwaysApply: true
---
# Git worktree workflow

## Rules (NEVER / ALWAYS)

When starting ticket work:

- **NEVER** run `git checkout -b`, `git switch -c`, or equivalent on the **main repository working tree**.
- **ALWAYS** create a worktree with `git worktree add -b <branch> <worktrees-dir>/<dir> origin/master`.
- **ALWAYS** `cd` into that worktree before Edit / Write / Bash for implementation.

## Resolve main repository root

Do **not** use `git rev-parse --show-toplevel` alone (inside an existing worktree it returns the worktree path).

Use the main repo root:

```bash
COMMON=$(git rev-parse --git-common-dir)
MAIN_ROOT=$(cd "$COMMON/.." && pwd)
REPO=$(basename "$MAIN_ROOT")
WORKTREES_ROOT="$(dirname "$MAIN_ROOT")/${REPO}-worktrees"
```

Worktrees live at: `${WORKTREES_ROOT}/<dir>/`

## Preflight (before first edit)

```bash
git rev-parse --git-common-dir
pwd
git worktree list
```

- If `pwd` is under `${WORKTREES_ROOT}/` → OK, continue.
- If `pwd` is the main repo root and you are starting ticket implementation → **STOP**, create worktree first.

## Create worktree

```bash
ISSUE=42
BRANCH="feature/${ISSUE}"
DIR=$(echo "$BRANCH" | tr '/' '-')
mkdir -p "$WORKTREES_ROOT"
git fetch origin
git worktree add -b "$BRANCH" "${WORKTREES_ROOT}/${DIR}" origin/master
cd "${WORKTREES_ROOT}/${DIR}"
```

Reuse an existing worktree/branch if one already exists for the same issue.

## After merge

Remove the worktree when the branch is merged and no longer needed:

```bash
git worktree remove "${WORKTREES_ROOT}/${DIR}"
git branch -d "$BRANCH"
```

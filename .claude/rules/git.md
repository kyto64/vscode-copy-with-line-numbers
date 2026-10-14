---
paths:
  - '**/*'
---
# Git conventions

## Branch naming

- `feature/<issue-number>` — features and enhancements (e.g. `feature/42`)
- `fix/<issue-number>` — bug fixes
- `chore/<issue-number>` — tooling, docs-only, dependency chores
- `cursor/<description>` — **allowed exception** for Cursor Cloud Agent automation (e.g. `cursor/adopt-aidd-template-3092`); not a substitute for human ticket worktrees

Create implementation branches with **git worktree** only (see `git-worktree.md`). Do not `git checkout -b` on the main working tree for ticket work. Cloud Agent branches under `cursor/` are exempt from the `feature/<issue>` pattern only.

Base branch for PRs: **`master`**.

## Commit messages

Conventional Commits:

```
<type>(#<issue>): <description>
```

Types: `feat`, `fix`, `refactor`, `test`, `docs`, `style`, `chore`.

Example: `feat(#42): add user list API`

Write commit messages in Japanese when the team uses Japanese PRs.

## Staging

Do not use `git add -A`. Stage files explicitly:

```bash
git diff --name-only
git add path/to/file1 path/to/file2
```

## Pull requests

- Title: `feat(#42): short summary`
- Base: `master`
- Body: follow [`.github/pull_request_template.md`](../../.github/pull_request_template.md)
- Include `Fixes #<issue>` in the body so GitHub closes the issue on merge to `master`

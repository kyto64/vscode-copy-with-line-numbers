---
paths:
  - '**/*'
---
# GitHub CLI — PR and Issues

Use **`gh`** from the repository root (or `--repo OWNER/REPO`).

## Version

Recommended: **gh v2.82.1+** (`gh --version`).

## Read PR / Issue

```bash
gh pr list
gh pr view <n>
gh pr diff <n>
gh pr checks <n>
gh issue view <n>
gh issue view <n> --comments
```

## Update title/body (REST PATCH)

`gh pr edit` / `gh issue edit` may fail on older GraphQL project APIs. Prefer REST:

```bash
REPO=$(gh repo view --json nameWithOwner -q .nameWithOwner)
gh api -X PATCH "/repos/${REPO}/pulls/<n>" -f title='...' -f body='...'
gh api -X PATCH "/repos/${REPO}/issues/<n>" -f title='...' -f body='...'
```

## Labels

```bash
gh label create in-progress --color FFAA00 --description "Work in progress" 2>/dev/null || true
gh issue edit <n> --add-label in-progress
```

If label creation fails (permissions), stop and ask the user.

## Create PR

```bash
gh pr create --base master --title "feat(#42): summary" --body "$(cat <<'EOF'
Fixes #42

## Summary
...
EOF
)"
```

# Ticket-driven development setup

Setup guide for Claude Code, Cursor, and Codex CLI.

## Prerequisites

| Tool | Required |
|------|----------|
| Git | Yes |
| GitHub CLI (`gh`) v2.82.1+ | Yes |
| rulesync 8.17.0 | Yes (`npm install -g rulesync@8.17.0`) |
| Node.js 24+ | Yes (matches CI; for rulesync locally) |

## 1. Repository

This repo adopted [aidd-template-lean](https://github.com/kyto64/aidd-template-lean) for AI settings and `docs/` SSOT. Clone:

`git clone https://github.com/kyto64/vscode-line-ref-copy.git`

## 2. Configure GitHub labels

Template copy does **not** include labels. Create at least:

```bash
gh label create in-progress --color FFAA00 --description "Work in progress"
gh label create blocked --color CC0000 --description "Blocked"  # optional
```

## 3. Enable GitHub Actions

New repositories may have Actions disabled. Enable in repository Settings → Actions.

## 4. Personal MCP (optional)

Project MCP SSOT is `.rulesync/mcp.json` (empty). Claude/Codex MCP outputs are **not** generated in this repo (Cursor-only `rulesync.jsonc`). Personal MCP servers stay in user settings.

## 5. rulesync

Edit `.rulesync/` only, then:

```bash
npm run rules:generate
git add .rulesync/ rulesync.jsonc AGENTS.md .cursor/ .agents/
git commit -m "chore: update AI tool SSOT"
```

CI runs `rulesync generate` and diffs **`AGENTS.md`**, **`.cursor/`**, and **`.agents/`** on every PR (see [rulesync.md](./rulesync.md)).

## 6. Verify skills

| Skill | Usage |
|-------|--------|
| `/start-ticket 1` | Start issue #1 |
| `/address-pr-feedback 1` | Address PR #1 reviews |
| `/close-ticket 1` | Post-merge docs for issue #1 |
| `/spec-lookup` | Query docs |

Skills live in `.rulesync/skills/`; regenerate rules with `npm run rules:generate` after SSOT edits.

## 7. Worktree rule

Implementation branches must use git worktree (see `.rulesync/rules/git-worktree.md`). Do not branch on the default-branch working tree (`master`).

**Exception:** Cursor Cloud Agent branches named `cursor/<description>` are allowed without the `feature/<issue>` pattern (see `.rulesync/rules/git.md`).

## 8. Language

See [language-policy.md](./language-policy.md): `docs/` and README in English; Issues and PRs in Japanese.

## PR and issue linking

- PR body must include `Fixes #<issue>` to auto-close on merge to **`master`**.
- `/close-ticket` updates docs after merge; it does not replace the merge keyword.

# rulesync operations

[rulesync](https://github.com/dyoshikawa/rulesync) manages AI tool settings from `.rulesync/`.

## SSOT layout

```
.rulesync/
├── rules/           # Project rules (incl. CLAUDE.md root)
├── skills/          # Agent skills
├── mcp.json         # Project MCP (empty in lean template)
└── permissions.json # Claude Code permissions (generated section)
rulesync.jsonc       # Generator config
```

## Generated outputs (local only; not in git)

These paths are listed in `.gitignore`. Regenerate after clone or when SSOT changes:

| Output | Tool |
|--------|------|
| `CLAUDE.md`, `.claude/rules/`, `.claude/skills/` | Claude Code |
| `AGENTS.md`, `.codex/memories/` | Codex CLI |
| `.cursor/rules/` | Cursor |
| `.agents/skills/` | Codex / agents |
| `.mcp.json` | Claude Code / Cursor |

## Workflow

1. Edit `.rulesync/rules/` or `.rulesync/skills/` (and `rulesync.jsonc` if needed).
2. Run `npm run rules:generate` (or `npx rulesync@8.17.0 generate`).
3. Commit **only** `.rulesync/` and `rulesync.jsonc` (not generated outputs).

## After clone

```bash
npm ci
npm run rules:generate
```

There is no `postinstall` hook for rulesync; generation is an explicit step so `npm ci` stays fast and deterministic.

## CI

`.github/workflows/check_rulesync.yaml` runs on **every** PR to `master`: `rulesync generate` then `rulesync generate --check` (pinned to 8.17.0). This validates SSOT without requiring generated files in the repository.

## Cloud agents and Cursor (risk)

**Cursor Cloud Agents** typically load committed `AGENTS.md` and `.cursor/rules/` at session start. Those paths are **not in git** after this policy; a cloud run on a fresh clone will **not** automatically see project rules, skills, or git/worktree conventions until something runs `npm run rules:generate` **before** the agent starts (e.g. a documented Cloud Agent environment install step). Running generate mid-session does not reload rules for that run.

Mitigations (choose explicitly; not implemented in this PR):

- Add a Cloud Agent environment install command that runs `npm ci && npm run rules:generate` (may commit `.cursor/environment.json` under `.cursor/`, which remains committable because only `.cursor/rules/` is gitignored).
- Rely on user/team global Cursor rules instead of repo-generated rules.
- Re-commit a minimal `AGENTS.md` (conflicts with gitignore policy; not recommended here).

**Codex CLI** and **Claude Code** likewise need local generate for `AGENTS.md` / `CLAUDE.md` and tool-specific dirs.

## Version pin

Keep local rulesync aligned with CI:

```bash
npm run rules:generate   # uses rulesync@8.17.0 via npx
```

Or install globally:

```bash
npm install -g rulesync@8.17.0
rulesync --version
```

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

## Generated outputs

| Output | In git | Tool |
|--------|--------|------|
| `AGENTS.md`, `.cursor/rules/` (and other `.cursor/` rulesync files) | **Yes** | Cursor / Cursor Cloud Agents |
| `CLAUDE.md`, `.claude/` | No (`.gitignore`) | Claude Code |
| `.codex/memories/` | No | Codex CLI |
| `.agents/skills/` | No | Codex / agents |
| `.mcp.json` | No | Claude Code / Cursor (local) |

`.cursor/plans/` stays gitignored (local Cursor plans).

## Workflow

1. Edit `.rulesync/rules/` or `.rulesync/skills/` (and `rulesync.jsonc` if needed).
2. Run `npm run rules:generate` (or `npx rulesync@8.17.0 generate`).
3. Commit `.rulesync/`, `rulesync.jsonc`, **`AGENTS.md`**, and **`.cursor/`** when Cursor-facing outputs change.
4. Do not commit or hand-edit other generated paths (Claude/Codex); regenerate locally if you use those tools.

## After clone

```bash
npm ci
```

Cursor contributors already have **`AGENTS.md`** and **`.cursor/`** from git. Run `npm run rules:generate` only after changing `.rulesync/` (or to refresh local Claude/Codex files).

There is no `postinstall` hook for rulesync.

## CI

`.github/workflows/check_rulesync.yaml` runs on **every** PR to `master`:

1. `rulesync generate` (pinned to 8.17.0)
2. `git diff --exit-code -- AGENTS.md .cursor/` — committed Cursor outputs must match SSOT

## Cloud agents

**Cursor Cloud Agents** read repository **`AGENTS.md`** and **`.cursor/rules/`** from the checkout. Those paths are **committed** in this repo so cloud runs get project rules without an extra generate step.

Claude Code and Codex still require local `npm run rules:generate` for their gitignored outputs.

## Version pin

```bash
npm run rules:generate   # uses rulesync@8.17.0 via npx
```

Or install globally:

```bash
npm install -g rulesync@8.17.0
rulesync --version
```

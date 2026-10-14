# rulesync operations

[rulesync](https://github.com/dyoshikawa/rulesync) manages AI tool settings from `.rulesync/`.

## Deviation from aidd-template-lean

[aidd-template-lean](https://github.com/kyto64/aidd-template-lean) enables multiple rulesync targets (Claude Code, Codex, Cursor, etc.). **This repository configures only Cursor-facing targets** in `rulesync.jsonc`:

| Target | Features | Committed outputs |
|--------|----------|-------------------|
| `cursor` | `rules` | `.cursor/rules/*.mdc` |
| `agentsmd` | `rules` | `AGENTS.md` (root) |

`agentsmd` may also create **`.agents/memories/`** on disk; that directory is **not** committed (listed in `.gitignore`). Claude/Codex files are **not** generated unless you change `rulesync.jsonc`.

## SSOT layout

```
.rulesync/
├── rules/           # Project rules (incl. CLAUDE.md root)
├── skills/          # Agent skills (SSOT; not exported to other tools in this repo)
├── mcp.json         # Project MCP (empty in lean template)
└── permissions.json # Claude Code permissions section (unused while claudecode target is off)
rulesync.jsonc       # Generator config (Cursor + agentsmd only)
```

## Workflow

1. Edit `.rulesync/rules/` or `.rulesync/skills/` (and `rulesync.jsonc` if needed).
2. Run `npm run rules:generate`.
3. Commit `.rulesync/`, `rulesync.jsonc`, **`AGENTS.md`**, and **`.cursor/`** when outputs change.

## After clone

```bash
npm ci
```

`AGENTS.md` and `.cursor/` are already in git for Cursor / Cloud Agents. Regenerate only after SSOT edits.

## CI

`.github/workflows/check_rulesync.yaml` on every PR:

1. `rulesync generate` (8.17.0)
2. `git diff --exit-code -- AGENTS.md .cursor/`

## Cloud agents

**Cursor Cloud Agents** read **`AGENTS.md`** and **`.cursor/rules/`** from the repository; both are committed.

## Version pin

```bash
npm run rules:generate   # npx rulesync@8.17.0
```

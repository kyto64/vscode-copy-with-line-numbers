# rulesync operations

[rulesync](https://github.com/dyoshikawa/rulesync) manages AI tool settings from `.rulesync/`.

## Deviation from aidd-template-lean

[aidd-template-lean](https://github.com/kyto64/aidd-template-lean) generates multiple rulesync targets (`cursor`, `claudecode`, `codexcli`, `agentsskills`). **This repository is Devin-only** and configures just two targets in `rulesync.jsonc`:

| Target | Features | Committed outputs |
|--------|----------|-------------------|
| `agentsmd` | `rules` | `AGENTS.md` (root, single self-contained file) |
| `agentsskills` | `skills` | `.agents/skills/*/SKILL.md` |

Other differences from the template:

- **All rules are `root: true`**, so every rule is inlined into `AGENTS.md` (no TOON index, no `.agents/memories/`). `AGENTS.md` must stay **under 16 KiB**; setup and quality gates are kept near the top.
- No `cursor:` frontmatter in `.rulesync/rules/*.md`; no `.cursor/`, `CLAUDE.md`, `.claude/`, or `.codex/` outputs.
- `.rulesync/mcp.json` and `.rulesync/permissions.json` are **kept but unused** (no target consumes `mcp` or `permissions`).

## SSOT layout

```
.rulesync/
├── rules/           # Project rules (all root: true; incl. CLAUDE.md overview)
├── skills/          # Agent skills → .agents/skills/
├── mcp.json         # Project MCP (empty; unused)
└── permissions.json # Permissions (unused)
rulesync.jsonc       # Generator config (agentsmd + agentsskills only)
```

## Workflow

1. Edit `.rulesync/rules/` or `.rulesync/skills/` (and `rulesync.jsonc` if needed).
2. Run `npm run rules:generate`.
3. Commit `.rulesync/`, `rulesync.jsonc`, **`AGENTS.md`**, and **`.agents/skills/`** when outputs change.

## After clone

```bash
npm ci
```

`AGENTS.md` and `.agents/skills/` are already in git for Devin. Regenerate only after SSOT edits.

## CI

`.github/workflows/check_rulesync.yaml` on every PR:

1. `rulesync generate` (33.0.0)
2. `git add --intent-to-add -- AGENTS.md .agents/` (so new generated files are diffed)
3. `git diff --exit-code -- AGENTS.md .agents/`

## Devin

Devin reads the root **`AGENTS.md`** and **`.agents/skills/`** from the repository; both are committed. The Devin environment (Node 24, xvfb, VS Code test libraries, `npm ci`, lint/build/test commands) is defined in [`.devin/blueprint.yaml`](../../.devin/blueprint.yaml).

## Version pin

```bash
npm run rules:generate   # npx rulesync@33.0.0
```

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
2. `git status --porcelain --untracked-files=all -- AGENTS.md .agents/`
3. Fail if that output is non-empty (catches modified, deleted, and new/stale untracked outputs)

Local equivalent after `npm run rules:generate`:

```bash
test -z "$(git status --porcelain --untracked-files=all -- AGENTS.md .agents/)"
```

## Devin

Devin reads the root **`AGENTS.md`** and **`.agents/skills/`** from the repository; both are committed. The Devin environment (Node 24, xvfb, VS Code test libraries, `npm ci`, lint/build/test commands) is defined in [`.devin/blueprint.yaml`](../../.devin/blueprint.yaml).

After a change to `.devin/blueprint.yaml` is merged to `master`, run a **manual Sync** of this repository's blueprint in the Devin UI (environment settings) so the next snapshot build picks it up; merging alone does not apply it.

## Version pin

```bash
npm run rules:generate   # npx rulesync@33.0.0
```

The version is pinned exactly (no range) in `package.json` and `check_rulesync.yaml`; keep both in sync. 33.0.0 is kept even though it is very recent: rulesync ships a new major almost daily (28.0.0–33.0.0 were all released 2026-10-08 to 2026-10-12), so no older major has meaningfully more soak time, and 33.0.0 was verified to produce the committed outputs. The exact pin plus the CI drift check keeps generation reproducible; bump deliberately and regenerate in the same PR.

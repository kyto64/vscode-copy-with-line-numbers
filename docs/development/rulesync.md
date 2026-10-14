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

## Generated outputs (do not edit directly)

| Output | Tool |
|--------|------|
| `CLAUDE.md`, `.claude/rules/`, `.claude/skills/` | Claude Code |
| `AGENTS.md`, `.codex/memories/` | Codex CLI |
| `.cursor/rules/` | Cursor |
| `.agents/skills/` | Codex / agents |
| `.mcp.json` | Claude Code / Cursor |

## Workflow

1. Edit `.rulesync/rules/` or `.rulesync/skills/`
2. Run `rulesync generate`
3. Commit SSOT **and** generated files together

## CI

`.github/workflows/check_rulesync.yaml` runs `rulesync generate --check` (pinned to 8.17.0).

## Version pin

Keep local rulesync aligned with CI:

```bash
npm install -g rulesync@8.17.0
rulesync --version
```

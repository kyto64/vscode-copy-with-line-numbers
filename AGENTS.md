Please also reference the following rules as needed. The list below is provided in TOON format, and `@` stands for the project root directory.

rules[5]:
  - path: @.codex/memories/code-style.md
    description: Coding conventions
    applyTo[1]: **/*
  - path: @.codex/memories/git-worktree.md
    description: Git worktree workflow
    applyTo[1]: **/*
  - path: @.codex/memories/git.md
    description: Git conventions
    applyTo[1]: **/*
  - path: @.codex/memories/github-cli-pr.md
    description: GitHub CLI — PR and Issues
    applyTo[1]: **/*
  - path: @.codex/memories/ticket-driven-workflow.md
    description: Ticket-driven workflow
    applyTo[1]: **/*

<!--
  SSOT: Edit .rulesync/rules/ and run `rulesync generate`.
  Generated: CLAUDE.md, AGENTS.md, .claude/, .cursor/rules/, .codex/memories/, .agents/skills/, .mcp.json
-->
# Project overview

**Copy With Line Numbers** — VS Code extension that copies the current selection to the clipboard with line numbers (and optional file path). Fork maintained at [kyto64/vscode-copy-with-line-numbers](https://github.com/kyto64/vscode-copy-with-line-numbers); upstream by [yassh](https://github.com/yassh/vscode-copy-with-line-numbers).

## Tech stack

- Runtime: VS Code Extension API (`vscode` module)
- Language: TypeScript (compile to `out/`)
- Clipboard: `vscode.env.clipboard.writeText` (no native `copy-paste` module at runtime)
- Quality: ESLint 10 + TypeScript 5; CI in `.github/workflows/ci.yml` (compile, lint, `xvfb-run` tests); supply-chain: SHA-pinned Actions, Dependabot, OpenSSF Scorecard (see `docs/operations/security.md`)
- Issue tracking: GitHub Issues + `gh`
- AI settings: rulesync (`.rulesync/` → `rulesync generate`)

## Documentation (SSOT)

Markdown under `docs/` is the Single Source of Truth for specifications. When docs and code disagree, code wins unless you explicitly update docs in the same PR.

- [docs/_inventory.md](./docs/_inventory.md) — inventory and SSOT boundaries
- [docs/product/index.md](./docs/product/index.md) — product
- [docs/architecture/index.md](./docs/architecture/index.md) — architecture
- [docs/operations/index.md](./docs/operations/index.md) — operations
- [docs/development/index.md](./docs/development/index.md) — development

User-facing install/usage summary remains in [README.md](./README.md).

## Development workflow

Ticket-driven development using GitHub Issues. Setup: [docs/development/ticket-driven-setup.md](./docs/development/ticket-driven-setup.md).

Skills (`.claude/skills/`):

- `/start-ticket <issue-number>` — start issue, plan, implement, open PR
- `/address-pr-feedback <pr-number>` — address review feedback
- `/close-ticket <issue-number>` — post-merge docs update
- `/spec-lookup` — answer from `docs/` (code when needed)

### Cursor

- Skills: `.claude/skills/` (Cursor reads them as Agent Skills)
- Project rules: `.rulesync/rules/` → `rulesync generate` → `.cursor/rules/`

### Codex CLI

- Rules: `.codex/memories/` (generated)
- Skills: `.agents/skills/` (generated)

## AI settings changes

Edit `.rulesync/` only, then `rulesync generate` and commit generated files. Do not edit generated files directly.

## Language

- `README.md` and `docs/`: English
- GitHub Issues and PRs: Japanese
- Code comments: English

See [docs/development/language-policy.md](./docs/development/language-policy.md).

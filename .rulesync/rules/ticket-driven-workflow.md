---
root: false
targets:
  - '*'
description: "Ticket-driven workflow"
globs:
  - '**/*'
cursor:
  alwaysApply: true
---
# Ticket-driven workflow

- Setup: [docs/development/ticket-driven-setup.md](../../docs/development/ticket-driven-setup.md)
- Skills in `.claude/skills/`: `/start-ticket`, `/address-pr-feedback`, `/close-ticket`, `/spec-lookup`
- Cursor reads `.claude/skills/` as Agent Skills; Codex uses `.agents/skills/` (generated)
- Invoke with issue or PR number: `/start-ticket 42`, `/close-ticket 42`
- PR status/diff/comments: prefer **`gh`** (see `github-cli-pr.md`)

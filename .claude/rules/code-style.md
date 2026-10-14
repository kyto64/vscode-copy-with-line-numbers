---
paths:
  - '**/*'
---
# Coding conventions

## General

- Prefer small, focused changes tied to a single GitHub Issue.
- Match existing patterns in the repository before introducing new ones.
- Document non-obvious behavior in `docs/` when it affects how others work.

## Language

- Documentation and PR text: Japanese (team default for this template).
- Code comments and identifiers: English.

## TypeScript / VS Code extension

- Source lives under `src/`; compiled output under `out/` (do not edit `out/` by hand).
- Use `'use strict'` and existing import style (`import * as vscode from 'vscode'`).
- Register commands in `src/extension.ts`; command implementation in `src/copy-with-line-numbers.ts`.
- Follow `tslint` and `tslint-config-airbnb` rules; run `npm run lint` and `npm run compile` before PRs.

## Quality

- Run `npm run compile`, `npm run lint`, and `npm test` when behavior changes; CI runs compile + lint on `master`.
- Do not commit secrets, tokens, or personal credentials.

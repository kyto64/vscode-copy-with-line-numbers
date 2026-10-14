# Documentation inventory

Single Source of Truth (SSOT) boundaries for **vscode-copy-with-line-numbers**.

## SSOT boundary table

| Domain | SSOT location | Notes |
|--------|---------------|-------|
| Product requirements | `docs/product/` | Commands, configuration, user-visible behavior |
| Architecture | `docs/architecture/` | Extension activation, modules, VS Code APIs |
| Operations | `docs/operations/` | CI, release, marketplace |
| Development process | `docs/development/` | Workflow, rulesync, ticket-driven setup |
| Application code | `src/`, `test/` | Implementation and tests; `package.json` for manifest |
| Quick start / install blurb | `README.md` | Short user-facing intro (not full spec) |

When documentation and code conflict, **code wins** until docs are updated in the same PR.

## Directory layout

```
docs/
├── _inventory.md          # this file
├── product/
├── architecture/
├── operations/
└── development/
```

## Key source files

| Path | Role |
|------|------|
| `src/extension.ts` | `activate` / `deactivate`; registers commands |
| `src/copy-with-line-numbers.ts` | Selection formatting, clipboard write |
| `package.json` | Extension manifest, commands, configuration |
| `.github/workflows/ci.yml` | `npm ci`, compile, eslint, tests (`xvfb-run`) |
| `.github/workflows/scorecard.yml` | OpenSSF Scorecard supply-chain analysis |
| `.github/dependabot.yml` | Weekly npm / github-actions updates |
| `SECURITY.md` | Vulnerability reporting (English; latest version only) |

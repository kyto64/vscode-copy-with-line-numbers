# Operations overview

## Repository

- **GitHub**: [kyto64/vscode-copy-with-line-numbers](https://github.com/kyto64/vscode-copy-with-line-numbers)
- **Default branch**: `master`
- **License**: MIT (Copyright yassh; see `LICENSE`)

## CI

Workflow: `.github/workflows/ci.yml`

| Step | Command |
|------|---------|
| Install | `npm ci` |
| Compile | `npm run compile` |
| Lint | `npm run lint` (`eslint .` via `eslint.config.mjs`) |
| Test | `xvfb-run -a npm test` |

Permissions: `contents: read` only.

Separate workflow `.github/workflows/check_rulesync.yaml` validates AI settings when `.rulesync/` or generated agent files change.

## Local verification

```bash
npm ci
npm run compile
npm run lint
npm test          # headless Linux: xvfb-run -a npm test
```

`npm test` compiles TypeScript then runs `@vscode/test-electron` via `test/runTest.ts` (suite under `test/suite/`). On Linux CI, tests run under `xvfb-run` for a virtual display.

## Toolchain (summary)

| Tool | Role |
|------|------|
| TypeScript 5.x | Compile `src/` → `out/` |
| ESLint 10 + `typescript-eslint` | Lint (`eslint.config.mjs`; ignores `out/`, `node_modules/`, `.vscode-test/`) |
| `@vscode/test-electron` | Download VS Code build and run extension tests |
| `engines.vscode` | `^1.74.0` (`@types/vscode` ~1.74.0) |

## Release / marketplace

Publisher id in `package.json`: `yassh`. `repository`, `bugs`, and `homepage` point at this fork on GitHub. Publishing steps are manual (vsce) unless automated later; document version bumps in `CHANGELOG.md` when cutting releases.

## Incident response

- **Broken clipboard on remote**: Confirm VS Code version supports `vscode.env.clipboard`; check user error toast from catch block.
- **CI test failure on Linux**: Confirm `xvfb-run` is available (GitHub-hosted runners include it); inspect `@vscode/test-electron` download logs.

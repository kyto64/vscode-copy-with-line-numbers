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
| Lint | `npm run lint` |

Permissions: `contents: read` only.

Separate workflow `.github/workflows/check_rulesync.yaml` validates AI settings when `.rulesync/` or generated agent files change.

## Local verification

```bash
npm ci
npm run compile
npm run lint
```

`npm test` in `package.json` only runs `npm run compile` (it does not launch the VS Code extension test host). To run integration tests locally, use the **Launch Tests** configuration in `.vscode/launch.json` (`--extensionTestsPath=out/test`). `test/extension.test.ts` is scaffold-level coverage today.

## Release / marketplace

Publisher id in `package.json`: `yassh`. `repository` / `bugs` URLs still point at upstream [yassh/vscode-copy-with-line-numbers](https://github.com/yassh/vscode-copy-with-line-numbers); this fork is [kyto64/vscode-copy-with-line-numbers](https://github.com/kyto64/vscode-copy-with-line-numbers). Publishing steps are manual (vsce) unless automated later; document version bumps in `CHANGELOG.md` when cutting releases.

## Incident response

- **Broken clipboard on remote**: Confirm VS Code version supports `vscode.env.clipboard`; check user error toast from catch block.
- **CI failure**: Inspect compile vs lint job logs; extension tests are not currently in CI.

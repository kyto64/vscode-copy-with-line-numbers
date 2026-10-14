# Integration testing

Extension behavior is verified with `@vscode/test-electron` (see `test/runTest.ts`).

## Running tests locally

```bash
npm run compile
xvfb-run -a npm test   # Linux headless CI uses the same command
```

## Layout

| Path | Role |
|------|------|
| `test/runTest.ts` | Launches VS Code twice: single-root folder workspace, then multi-root `.code-workspace` |
| `test/suite/copy-with-line-numbers.test.ts` | Command matrix, clipboard assertions via `vscode.env.clipboard.readText` |
| `test/suite/copy-with-line-numbers.multi-root.test.ts` | Relative path when multiple workspace folders are open |
| `test/suite/package-manifest.test.ts` | `package.json` context menu contributions |
| `test/fixtures/` | Sample files (UTF-8, CRLF, in/out of workspace) |

Tests assert the full clipboard string, including `File:` headers, `left-pad` line numbers, and multi-selection `---` separators.

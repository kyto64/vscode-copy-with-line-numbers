# Changelog

## 0.1.0 — 2026-10-14

First preview release of **Line Ref Copy** (fork of [yassh/vscode-copy-with-line-numbers](https://github.com/yassh/vscode-copy-with-line-numbers)).

### Added

- Marketplace-oriented manifest: publisher `kyto64`, extension id `line-ref-copy`, `preview: true`.
- Command IDs under `lineRefCopy.*` and setting `lineRefCopy.showSuccessMessage`.
- Editor context menu entry for **Line Ref Copy: With Relative Path** when text is selected.
- Integration tests (`@vscode/test-electron`) and VSIX packaging via `@vscode/vsce`.

### Changed

- Clipboard I/O uses `vscode.env.clipboard` (UTF-8 safe).
- Workspace-relative paths use `getWorkspaceFolder` for multi-root workspaces.

### Notes

- Extension icon remains the upstream asset (`images/icon.png`) until a dedicated icon is chosen.

## Upstream history (yassh)

### 0.0.4
- Add license file

### 0.0.3
- Add license

### 0.0.2
- Add description

### 0.0.1
- Initial release

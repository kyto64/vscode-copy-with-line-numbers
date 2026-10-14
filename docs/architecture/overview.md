# Architecture overview

VS Code extension with a thin activation layer and a single command module.

## Components

```
package.json (manifest, contributes.commands / configuration)
        │
        ▼
src/extension.ts          activate() → registerCommand for each entry in commands map
        │
        ▼
src/copy-with-line-numbers.ts
        ├── read active TextEditor + Document
        ├── build clipboard string (path header + numbered lines)
        └── vscode.env.clipboard.writeText(str)
```

## Activation

- `main`: `./out/src/extension` (compiled from `src/extension.ts`).
- Commands are registered on activation via `activationEvents` matching each command id in `package.json`.

## Copy pipeline

1. **Guard**: If no active editor, show `No editor is active` and return.
2. **Path header** (optional): Based on command variant, set `file` from `document.fileName`, workspace-relative path, or basename; prefix `File: ${file}${EOL}` when non-empty.
3. **Selections**: Sort `editor.selections` by start line; for each range, emit lines from `start.line` through `end.line`.
4. **Numbering**: Use `left-pad` so all line numbers share width up to the largest line number in the selection set.
5. **Clipboard**: `await vscode.env.clipboard.writeText(str)`; on success optionally show `Copied!` per `copyWithLineNumbers.showSuccessMessage`; on failure show error with message.

## External dependencies

| Dependency | Role |
|------------|------|
| `vscode` (dev) | Extension API types and test runner |
| `left-pad` | Numeric padding for line numbers |
| `typescript` | Compile to `out/` |

Runtime clipboard does **not** use the legacy `copy-paste` npm package; clipboard I/O goes through `vscode.env.clipboard` (see comment in source citing mrVanDalo's MIT-licensed approach).

## Data flow

User runs command → extension handler → string built in memory → clipboard → optional UI toast.

No network, no persistent storage, no webviews.

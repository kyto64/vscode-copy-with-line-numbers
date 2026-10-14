# Product overview

**Copy With Line Numbers** adds editor commands that copy the current selection to the system clipboard with prefixed line numbers, optionally including file path metadata.

Inspired by [Copy With Line Numbers Reloaded](https://packagecontrol.io/packages/CopyWithLineNumbersReloaded) for Sublime Text.

## Goals

- Let developers paste code snippets with stable `N: ` line prefixes for reviews, tickets, and chat.
- Support optional file path context (none, full path, workspace-relative path, or file name only).
- Work in remote and sandboxed VS Code environments using the official Clipboard API.

## Commands

| Command ID | Title | Path in output |
|------------|-------|----------------|
| `extension.copyWithLineNumbers.withoutPath` | Copy With Line Numbers: Without Path | (none) |
| `extension.copyWithLineNumbers.withFullPath` | Copy With Line Numbers: With Full Path | Absolute `document.fileName` |
| `extension.copyWithLineNumbers.withRelativePath` | Copy With Line Numbers: With Relative Path | Relative to first workspace folder |
| `extension.copyWithLineNumbers.withFileName` | Copy With Line Numbers: With File Name | Basename only |

When a path mode is used, the clipboard text starts with `File: <path>` followed by a platform-appropriate newline, then numbered lines.

## Line format

- Each selected line becomes `<padded-line-number>: <line text>`.
- Padding width is based on the highest line number in the combined selection (supports multiple cursors/selections).
- Multiple selections are separated by a line containing `---`.

## Configuration

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `copyWithLineNumbers.showSuccessMessage` | boolean | `true` | Show an information message after a successful copy |

## Out of scope

- Syntax highlighting or rich text in the clipboard.
- Custom delimiter or format templates (fixed `N: ` prefix).
- Non-text editors.

## Glossary

| Term | Definition |
|------|------------|
| Selection | One or more `TextEditor.selections` ranges in the active editor |
| Path mode | Whether and how file path metadata is prepended |

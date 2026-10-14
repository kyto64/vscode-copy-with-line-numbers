import * as assert from 'assert'
import * as path from 'path'
import * as vscode from 'vscode'
import { EOL } from 'os'

export const COMMAND_WITHOUT_PATH = 'extension.copyWithLineNumbers.withoutPath'
export const COMMAND_WITH_FULL_PATH = 'extension.copyWithLineNumbers.withFullPath'
export const COMMAND_WITH_RELATIVE_PATH = 'extension.copyWithLineNumbers.withRelativePath'
export const COMMAND_WITH_FILE_NAME = 'extension.copyWithLineNumbers.withFileName'

export const fixturesRoot = path.resolve(__dirname, '../../../test/fixtures')

export function fixturePath(...segments: string[]): string {
  return path.join(fixturesRoot, ...segments)
}

export async function openDocument(filePath: string): Promise<vscode.TextEditor> {
  const doc = await vscode.workspace.openTextDocument(vscode.Uri.file(filePath))
  const editor = await vscode.window.showTextDocument(doc, { preview: false })
  return editor
}

export async function openUntitled(content: string): Promise<vscode.TextEditor> {
  const doc = await vscode.workspace.openTextDocument({ content, language: 'plaintext' })
  const editor = await vscode.window.showTextDocument(doc, { preview: false })
  return editor
}

export function setSelection(
  editor: vscode.TextEditor,
  startLine: number,
  startChar: number,
  endLine: number,
  endChar: number,
): void {
  editor.selection = new vscode.Selection(startLine, startChar, endLine, endChar)
}

export function setSelections(editor: vscode.TextEditor, ranges: vscode.Selection[]): void {
  editor.selections = ranges
}

export async function runCopyCommand(commandId: string, editor?: vscode.TextEditor): Promise<void> {
  if (editor) {
    const selections = [...editor.selections]
    const active = await vscode.window.showTextDocument(editor.document, { preview: false, preserveFocus: false })
    active.selections = selections
    assert.strictEqual(
      vscode.window.activeTextEditor?.document.uri.toString(),
      editor.document.uri.toString(),
      'expected copied editor to be active',
    )
  }
  await vscode.commands.executeCommand(commandId)
}

export async function readClipboard(): Promise<string> {
  return vscode.env.clipboard.readText()
}

export function formatLines(lineNumbers: number[], lines: string[], padWidth?: number): string {
  const width = padWidth ?? Math.max(...lineNumbers).toString().length
  return lineNumbers
    .map((num, i) => `${String(num).padStart(width, '0')}: ${lines[i]}${EOL}`)
    .join('')
}

export function withFileHeader(fileLine: string, body: string): string {
  return `File: ${fileLine}${EOL}${body}`
}

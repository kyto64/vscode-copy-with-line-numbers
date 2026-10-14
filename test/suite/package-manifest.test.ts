import * as assert from 'assert'
import * as fs from 'fs'
import * as path from 'path'

const COMMAND_IDS = [
  'extension.copyWithLineNumbers.withoutPath',
  'extension.copyWithLineNumbers.withFullPath',
  'extension.copyWithLineNumbers.withRelativePath',
  'extension.copyWithLineNumbers.withFileName',
]

const EXPECTED_WHEN = 'editorTextFocus && editorHasSelection'

suite('package manifest', () => {
  test('editor context menu exposes all copy commands when text is selected', () => {
    const manifestPath = path.resolve(__dirname, '../../../package.json')
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8')) as {
      contributes?: {
        commands?: { command: string }[]
        menus?: { 'editor/context'?: { command: string, when?: string, group?: string }[] }
      }
    }

    const commandIds = new Set(manifest.contributes?.commands?.map((c) => c.command) ?? [])
    COMMAND_IDS.forEach((id) => assert.ok(commandIds.has(id), `missing command ${id}`))

    const contextMenu = manifest.contributes?.menus?.['editor/context'] ?? []
    assert.strictEqual(contextMenu.length, COMMAND_IDS.length)

    contextMenu.forEach((entry, index) => {
      assert.strictEqual(entry.command, COMMAND_IDS[index])
      assert.strictEqual(entry.when, EXPECTED_WHEN)
      assert.strictEqual(entry.group, `9_cutcopypaste@${index + 5}`)
    })
  })
})

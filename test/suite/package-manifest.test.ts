import * as assert from 'assert'
import * as fs from 'fs'
import * as path from 'path'

const CONTEXT_MENU_COMMAND = 'lineRefCopy.withRelativePath'
const EXPECTED_WHEN = 'editorTextFocus && editorHasSelection'
const EXPECTED_GROUP = '9_cutcopypaste@5'

suite('package manifest', () => {
  test('editor context menu exposes relative-path copy when text is selected', () => {
    const manifestPath = path.resolve(__dirname, '../../../package.json')
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8')) as {
      contributes?: {
        menus?: { 'editor/context'?: { command: string, when?: string, group?: string }[] }
      }
    }

    const contextMenu = manifest.contributes?.menus?.['editor/context'] ?? []
    assert.strictEqual(contextMenu.length, 1)
    assert.strictEqual(contextMenu[0].command, CONTEXT_MENU_COMMAND)
    assert.strictEqual(contextMenu[0].when, EXPECTED_WHEN)
    assert.strictEqual(contextMenu[0].group, EXPECTED_GROUP)
  })
})

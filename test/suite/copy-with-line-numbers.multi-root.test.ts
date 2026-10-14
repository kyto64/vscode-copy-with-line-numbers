import * as assert from 'assert'
import {
  COMMAND_WITH_RELATIVE_PATH,
  fixturePath,
  formatLines,
  openDocument,
  readClipboard,
  runCopyCommand,
  setSelection,
  withFileHeader,
} from './test-utils'

suite('lineRefCopy (multi-root workspace)', () => {
  test('withRelativePath uses the workspace folder that contains the file', async () => {
    const filePath = fixturePath('folder-b', 'b.txt')
    const editor = await openDocument(filePath)
    setSelection(editor, 0, 0, 0, 13)

    await runCopyCommand(COMMAND_WITH_RELATIVE_PATH, editor)
    const clipboard = await readClipboard()

    const body = formatLines([1], ['from folder b'], 1)
    assert.strictEqual(clipboard, withFileHeader('b.txt', body))
  })
})

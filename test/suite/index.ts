import * as path from 'path'
import Mocha from 'mocha'
import { globSync } from 'glob'

export async function run(): Promise<void> {
  const mocha = new Mocha({ ui: 'tdd', color: true })
  const testsRoot = path.resolve(__dirname, '..')

  globSync('**/*.test.js', { cwd: testsRoot }).forEach((f) => {
    mocha.addFile(path.resolve(testsRoot, f))
  })

  return new Promise((resolve, reject) => {
    mocha.run((failures) => {
      if (failures > 0) {
        reject(new Error(`${failures} tests failed`))
        return
      }
      resolve()
    })
  })
}

import * as path from 'path'
import Mocha from 'mocha'
import { globSync } from 'glob'

export async function run(): Promise<void> {
  const mocha = new Mocha({ ui: 'tdd', color: true, timeout: 30_000 })
  const testsRoot = path.resolve(__dirname, '..')

  const profile = process.env.CWLN_TEST_WORKSPACE_PROFILE ?? 'single-root'
  globSync('**/*.test.js', { cwd: testsRoot })
    .filter((f) => {
      const isMultiRoot = f.includes('multi-root.test.js')
      return profile === 'multi-root' ? isMultiRoot : !isMultiRoot
    })
    .forEach((f) => {
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

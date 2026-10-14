import * as fs from 'fs'
import * as os from 'os'
import * as path from 'path'
import { runTests } from '@vscode/test-electron'

type WorkspaceProfile = 'single-root' | 'multi-root'

async function runProfile(profile: WorkspaceProfile): Promise<void> {
  const extensionDevelopmentPath = path.resolve(__dirname, '../..')
  const extensionTestsPath = path.resolve(__dirname, './suite/index')
  const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), `cwln-vscode-test-${profile}-`))

  const workspacePath = profile === 'single-root'
    ? path.resolve(extensionDevelopmentPath, 'test/fixtures/single-root')
    : path.resolve(extensionDevelopmentPath, 'test/fixtures/multi-root.code-workspace')

  process.env.CWLN_TEST_WORKSPACE_PROFILE = profile

  await runTests({
    extensionDevelopmentPath,
    extensionTestsPath,
    launchArgs: [
      workspacePath,
      '--disable-extensions',
      `--user-data-dir=${userDataDir}`,
    ],
  })
}

async function main(): Promise<void> {
  await runProfile('single-root')
  await runProfile('multi-root')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

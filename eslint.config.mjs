import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      semi: ['error', 'never'],
      'max-len': ['error', { code: 120, ignoreUrls: true }],
    },
  },
  {
    ignores: ['out/**', 'node_modules/**', '.vscode-test/**'],
  },
)

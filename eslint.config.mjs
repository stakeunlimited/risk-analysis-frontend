import typescriptEslint from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: ['**/node_modules/**', '**/dist/**'],
  },
  ...compat.extends(
    'react-app',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'eslint:recommended',
    'prettier',
  ),
  {
    plugins: {
      '@typescript-eslint': typescriptEslint,
      react: pluginReact,
      'react-hooks': pluginReactHooks,
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        tsconfigRootDir: process.cwd(),
        project: ['./tsconfig.json'], // tsconfig.json must exist
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true, // Enable JSX
        },
      },
      globals: {
        React: 'readonly',
        ...globals.node,
        ...globals.browser,
      },
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect React version
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      quotes: ['error', 'single', { avoidEscape: true }],
      semi: 'error',
      'max-len': [
        'error',
        {
          code: 120,
          ignoreUrls: true,
          ignoreStrings: true,
        },
      ],
      'no-console': 'warn',
      'react/react-in-jsx-scope': 'off',
    },
  },
];

import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tsparser from '@typescript-eslint/parser';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default defineConfig([
  {
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      parser: tsparser,
      globals: globals.browser,
    },
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    plugins: {
      js,
      '@typescript-eslint': tseslint,
      prettier: prettierPlugin,
    },
    extends: ['js/recommended'],
    rules: {
      ...tseslint.configs.recommended.rules,
      ...prettierConfig.rules,
      'react/react-in-jsx-scope': 'off',
      '@/no-unused-vars': 'warn',
      'no-unused-vars': 'warn',
      'no-console': 'warn',
      'prettier/prettier': 'warn',
    },
  },
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    plugins: {
      react,
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
    },
  },
]);

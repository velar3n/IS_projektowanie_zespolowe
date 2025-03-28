import eslint from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';

export default tseslint
  .config(
    eslint.configs.recommended,
    tseslint.configs.recommended,
    reactPlugin.configs.flat.recommended,
    reactPlugin.configs.flat['jsx-runtime'],
    {
      settings: {
        react: {
          version: 'detect',
        },
      },
      plugins: {
        'react-hooks': reactHooks,
      },
      rules: {
        ...reactHooks.configs.recommended.rules,
        'no-console': 'warn',
        'react/jsx-no-useless-fragment': 'error',
        '@typescript-eslint/no-unused-vars': 'warn',
        '@typescript-eslint/no-floating-promises': 'off',
        '@typescript-eslint/no-empty-object-type': 'off',
        '@typescript-eslint/no-misused-promises': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
      },
    },
  )
  .concat(eslintPluginPrettier);

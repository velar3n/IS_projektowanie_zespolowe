import { defineConfig } from "eslint/config";
import { fixupConfigRules } from "@eslint/compat";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  {
    extends: fixupConfigRules(
      compat.extends(
        "react-app",
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
      ),
    ),

    languageOptions: {
      parser: tsParser,
    },

    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          vars: "all",
          args: "after-used",
          ignoreRestSiblings: true,
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],

    rules: {
      "prettier/prettier": [
        "warn",
        {
          singleQuote: true,
          jsxSingleQuote: false,
          trailingComma: "all",
          arrowParens: "always",
          bracketSameLine: false,
          bracketSpacing: true,
          endOfLine: "lf",
          printWidth: 80,
          quoteProps: "as-needed",
          requirePragma: false,
          semi: true,
          tabWidth: 2,
          experimentalOperatorPosition: "start",
        },
      ],
    },
  },
]);

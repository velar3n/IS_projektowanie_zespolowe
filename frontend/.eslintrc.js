module.exports = {
  extends: ["react-app", "plugin:prettier/recommended"],
  overrides: [
    {
      files: ["*.ts", "*.tsx", "*.js", "*.jsx"],
      rules: {
        "prettier/prettier": [
          "error",
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
  ],
};

import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  {
    rules: {
      "prettier/prettier": ["error", { endOfLine: "auto" }],
    },
  },
  {
    ignores: ['node_modules/**', 'dist/**', 'coverage\npublic\ndist\npnpm-lock.yaml']
  },
  ...tseslint.configs.recommended,
  eslintPluginPrettierRecommended
];

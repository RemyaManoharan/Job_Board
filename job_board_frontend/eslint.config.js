import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
];

// import globals from 'globals';
// import pluginJs from '@eslint/js';
// import tseslint from 'typescript-eslint';
// import pluginReact from 'eslint-plugin-react';
// import pluginPrettier from 'eslint-plugin-prettier';
// import prettierConfig from 'eslint-config-prettier';
// import pluginReactHooks from 'eslint-plugin-react-hooks';

// /** @type {import('eslint').Linter.FlatConfig[]} */
// export default [
//   { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
//   { languageOptions: { globals: globals.browser } },
//   pluginJs.configs.recommended,
//   ...tseslint.configs.recommended,
//   pluginReact.configs.flat.recommended,
//   pluginReactHooks.configs.recommended,
//   prettierConfig, // Disables conflicting rules with Prettier
//   {
//     rules: {
//       'prettier/prettier': 'error', // Show Prettier errors in ESLint
//       'react/react-in-jsx-scope': 'off', // Not needed for Next.js / React 17+
//       '@typescript-eslint/explicit-module-boundary-types': 'off',
//     },
//     plugins: {
//       prettier: pluginPrettier,
//     },
//   },
// ];

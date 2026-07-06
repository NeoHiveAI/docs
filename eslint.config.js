// ESLint flat config — NeoHive docs (Astro Starlight).
//
// Purpose: lint the "special" MDX / Starlight syntax — JSX components like
// <Steps>, <Tabs>, <Card> — plus .astro components and the TypeScript config
// files. This is what catches an unclosed <Steps>, a typo'd component name, or
// broken JSX before the build does.
//
// Formatting is NOT ESLint's job here. Prettier owns formatting, and
// `eslint-config-prettier` (last in the array) switches off any stylistic
// ESLint rules that would conflict. Prettier is scoped to code files only
// (see .prettierignore) — it never touches Markdown/MDX, so it can't renumber
// ordered lists or break the <Steps> component.

import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';
import * as mdx from 'eslint-plugin-mdx';
import prettier from 'eslint-config-prettier';

export default [
  // Never lint build output, deps, or generated types.
  { ignores: ['dist/', '.astro/', 'node_modules/'] },

  // ---- Plain JS config files (astro.config.mjs) ----
  {
    files: ['**/*.{js,mjs,cjs}'],
    ...js.configs.recommended,
  },

  // ---- TypeScript (content.config.ts, future .ts) ----
  ...tseslint.configs.recommended.map((config) => ({
    ...config,
    files: ['**/*.{ts,mts,cts}'],
  })),

  // ---- Astro components (no-op until you add .astro overrides) ----
  ...astro.configs['flat/recommended'],

  // ---- MDX / Markdown docs: JSX-aware linting of the content ----
  {
    files: ['**/*.{md,mdx}'],
    ...mdx.flat,
    // Parse the MDX (and the JSX inside it) but do NOT lint fenced code blocks
    // as real source — the docs are full of `sh`/`json` examples that aren't
    // meant to pass JS linting.
    processor: mdx.createRemarkProcessor({
      lintCodeBlocks: false,
    }),
  },

  // ---- Prettier compatibility (must be last) ----
  prettier,
];

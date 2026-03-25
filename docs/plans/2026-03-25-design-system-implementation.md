# DigiFemmes Design System — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a complete, open-source, multi-platform design system for DigiFemmes Cote d'Ivoire — from tokens to components to documentation site.

**Architecture:** Foundation First approach — Turborepo monorepo with 7 packages (`@digifemmes/tokens`, `ui`, `icons`, `mobile`, `ai`, `studio`, `cli`), 2 apps (`docs`, `brand-studio`), and shared assets. Each layer builds on the previous one. Vanilla Extract for type-safe zero-runtime CSS. React 19 components with WCAG AAA accessibility.

**Tech Stack:** Turborepo, Next.js 15, Vanilla Extract, React 19, React Native + Expo, TypeScript strict, Vitest, Changesets, GitHub Actions, Vercel.

**Design Doc:** `docs/plans/2026-03-25-design-system-complet-design.md`

---

## Phase 1: Monorepo Scaffold + Tooling

### Task 1: Initialize Git repo and root package.json

**Files:**
- Create: `package.json`
- Create: `.gitignore`
- Create: `.nvmrc`

**Step 1: Initialize git repo**

```bash
cd "C:/Users/allou/OneDrive/Documents/01-DigiFemmes HQ/-DesignSystem DigiFemmes"
git init
```

**Step 2: Create .nvmrc**

```
22
```

**Step 3: Create root package.json**

```json
{
  "name": "digifemmes-design-system",
  "version": "0.0.0",
  "private": true,
  "license": "MIT",
  "packageManager": "pnpm@9.15.4",
  "engines": {
    "node": ">=22"
  },
  "scripts": {
    "build": "turbo run build",
    "dev": "turbo run dev",
    "lint": "turbo run lint",
    "test": "turbo run test",
    "typecheck": "turbo run typecheck",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "clean": "turbo run clean && rm -rf node_modules"
  },
  "devDependencies": {
    "@changesets/cli": "^2.27.0",
    "prettier": "^3.4.0",
    "turbo": "^2.3.0",
    "typescript": "^5.7.0"
  }
}
```

**Step 4: Create .gitignore**

```
node_modules/
dist/
.turbo/
.next/
*.tsbuildinfo
.env
.env.local
.DS_Store
coverage/
.vercel/
```

**Step 5: Install dependencies**

```bash
pnpm install
```

**Step 6: Commit**

```bash
git add package.json .gitignore .nvmrc pnpm-lock.yaml
git commit -m "chore: initialize monorepo root with Turborepo + pnpm"
```

---

### Task 2: Configure Turborepo + workspaces

**Files:**
- Create: `turbo.json`
- Create: `pnpm-workspace.yaml`

**Step 1: Create pnpm-workspace.yaml**

```yaml
packages:
  - "packages/*"
  - "apps/*"
```

**Step 2: Create turbo.json**

```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {
      "dependsOn": ["^build"]
    },
    "test": {
      "dependsOn": ["^build"]
    },
    "typecheck": {
      "dependsOn": ["^build"]
    },
    "clean": {
      "cache": false
    }
  }
}
```

**Step 3: Commit**

```bash
git add turbo.json pnpm-workspace.yaml
git commit -m "chore: configure Turborepo pipelines and pnpm workspaces"
```

---

### Task 3: Configure TypeScript base + ESLint + Prettier

**Files:**
- Create: `tsconfig.json`
- Create: `packages/tsconfig/base.json`
- Create: `packages/tsconfig/react.json`
- Create: `packages/tsconfig/package.json`
- Create: `.prettierrc`
- Create: `.prettierignore`
- Create: `eslint.config.mjs`

**Step 1: Create packages/tsconfig/package.json**

```json
{
  "name": "@digifemmes/tsconfig",
  "version": "0.0.0",
  "private": true
}
```

**Step 2: Create packages/tsconfig/base.json**

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "bundler",
    "module": "ESNext",
    "target": "ES2022",
    "lib": ["ES2022"],
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "isolatedModules": true,
    "resolveJsonModule": true
  },
  "exclude": ["node_modules", "dist"]
}
```

**Step 3: Create packages/tsconfig/react.json**

```json
{
  "extends": "./base.json",
  "compilerOptions": {
    "jsx": "react-jsx",
    "lib": ["ES2022", "DOM", "DOM.Iterable"]
  }
}
```

**Step 4: Create root tsconfig.json**

```json
{
  "extends": "./packages/tsconfig/base.json",
  "compilerOptions": {
    "baseUrl": "."
  }
}
```

**Step 5: Create .prettierrc**

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100,
  "tabWidth": 2
}
```

**Step 6: Create .prettierignore**

```
node_modules/
dist/
.turbo/
.next/
pnpm-lock.yaml
coverage/
```

**Step 7: Create eslint.config.mjs**

```javascript
import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: ['**/dist/**', '**/node_modules/**', '**/.next/**', '**/.turbo/**'],
  },
  {
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/consistent-type-imports': 'error',
    },
  },
);
```

**Step 8: Install ESLint deps at root**

```bash
pnpm add -D -w @eslint/js eslint typescript-eslint
```

**Step 9: Commit**

```bash
git add tsconfig.json packages/tsconfig/ .prettierrc .prettierignore eslint.config.mjs package.json pnpm-lock.yaml
git commit -m "chore: add TypeScript, ESLint, and Prettier configuration"
```

---

### Task 4: Scaffold all package directories (empty shells)

**Files:**
- Create: `packages/tokens/package.json`
- Create: `packages/tokens/tsconfig.json`
- Create: `packages/tokens/src/index.ts`
- Create: `packages/ui/package.json`
- Create: `packages/ui/tsconfig.json`
- Create: `packages/ui/src/index.ts`
- Create: `packages/icons/package.json`
- Create: `packages/icons/tsconfig.json`
- Create: `packages/icons/src/index.ts`
- Create: `packages/mobile/package.json`
- Create: `packages/mobile/tsconfig.json`
- Create: `packages/mobile/src/index.ts`
- Create: `packages/ai/package.json`
- Create: `packages/ai/tsconfig.json`
- Create: `packages/ai/src/index.ts`
- Create: `packages/studio/package.json`
- Create: `packages/studio/tsconfig.json`
- Create: `packages/studio/src/index.ts`
- Create: `packages/cli/package.json`
- Create: `packages/cli/tsconfig.json`
- Create: `packages/cli/src/index.ts`

**Step 1: Create packages/tokens/package.json**

```json
{
  "name": "@digifemmes/tokens",
  "version": "0.1.0",
  "description": "Design tokens for DigiFemmes Design System",
  "license": "MIT",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./css": "./dist/tokens.css"
  },
  "files": ["dist"],
  "scripts": {
    "build": "tsup src/index.ts --format cjs,esm --dts",
    "dev": "tsup src/index.ts --format cjs,esm --dts --watch",
    "lint": "eslint src/",
    "test": "vitest run",
    "typecheck": "tsc --noEmit",
    "clean": "rm -rf dist"
  },
  "devDependencies": {
    "@digifemmes/tsconfig": "workspace:*",
    "tsup": "^8.3.0",
    "vitest": "^2.1.0"
  }
}
```

**Step 2: Create packages/tokens/tsconfig.json**

```json
{
  "extends": "@digifemmes/tsconfig/base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src"]
}
```

**Step 3: Create packages/tokens/src/index.ts**

```typescript
// @digifemmes/tokens — Design tokens for DigiFemmes Design System
// This package will export primitives, semantic, and component tokens.
export {};
```

**Step 4: Create remaining package shells**

For each of `ui`, `icons`, `mobile`, `ai`, `studio`, `cli` — create the same structure with adapted name, description, and for React packages (`ui`, `mobile`, `ai`, `studio`) use the react tsconfig:

- `packages/ui/package.json` — name: `@digifemmes/ui`, description: "React UI components for DigiFemmes Design System", adds `react` and `@digifemmes/tokens` as dependencies
- `packages/icons/package.json` — name: `@digifemmes/icons`, description: "Icon library for DigiFemmes Design System"
- `packages/mobile/package.json` — name: `@digifemmes/mobile`, description: "React Native components for DigiFemmes Design System"
- `packages/ai/package.json` — name: `@digifemmes/ai`, description: "AI chat UI and brand voice for DigiFemmes"
- `packages/studio/package.json` — name: `@digifemmes/studio`, description: "Brand Studio visual generation for DigiFemmes"
- `packages/cli/package.json` — name: `@digifemmes/cli`, description: "CLI tool for DigiFemmes visual generation"

Each gets a `tsconfig.json` extending the appropriate base and a `src/index.ts` with `export {};`.

React packages tsconfig:
```json
{
  "extends": "@digifemmes/tsconfig/react.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src"]
}
```

**Step 5: Install all workspace dependencies**

```bash
pnpm install
```

**Step 6: Verify turbo can see all packages**

```bash
pnpm turbo build --dry
```

Expected: all 8 packages listed (tsconfig, tokens, ui, icons, mobile, ai, studio, cli).

**Step 7: Commit**

```bash
git add packages/
git commit -m "chore: scaffold all package shells (@digifemmes/tokens, ui, icons, mobile, ai, studio, cli)"
```

---

### Task 5: Create assets directory structure + move brand guide

**Files:**
- Create: `assets/logos/primary/.gitkeep`
- Create: `assets/logos/variants/color/.gitkeep`
- Create: `assets/logos/variants/white/.gitkeep`
- Create: `assets/logos/variants/black/.gitkeep`
- Create: `assets/logos/variants/single-color/.gitkeep`
- Create: `assets/logos/cobranding/dominant-70/.gitkeep`
- Create: `assets/logos/cobranding/dominant-60/.gitkeep`
- Create: `assets/logos/cobranding/README.md`
- Create: `assets/patterns/.gitkeep`
- Create: `assets/fonts/clash-display/.gitkeep`
- Create: `assets/fonts/red-hat-display/.gitkeep`
- Move: existing JPGs to `assets/brand-guide/`
- Create: `templates/figma/.gitkeep`
- Create: `templates/social-media/.gitkeep`
- Create: `templates/podcast/.gitkeep`
- Create: `templates/talkshow/.gitkeep`
- Create: `templates/tv/.gitkeep`

**Step 1: Create all asset directories**

```bash
mkdir -p assets/logos/primary assets/logos/variants/{color,white,black,single-color}
mkdir -p assets/logos/cobranding/{dominant-70,dominant-60}
mkdir -p assets/patterns assets/fonts/{clash-display,red-hat-display}
mkdir -p assets/brand-guide
mkdir -p templates/{figma,social-media,podcast,talkshow,tv}
```

**Step 2: Move existing brand guide JPGs**

```bash
mv "DigiFemmes CI CHARTE GRAPHIQUE-"*.jpg assets/brand-guide/
```

**Step 3: Create .gitkeep files for empty dirs**

```bash
find assets templates -type d -empty -exec touch {}/.gitkeep \;
```

**Step 4: Write assets/logos/cobranding/README.md**

Content: co-branding rules from design doc section 4 (dominant 70/30 and 60/40 rules, common rules, interdits).

**Step 5: Commit**

```bash
git add assets/ templates/
git commit -m "chore: create assets structure (logos, fonts, patterns) and templates directories"
```

---

### Task 6: Scaffold docs app (Next.js 15)

**Files:**
- Create: `apps/docs/package.json`
- Create: `apps/docs/tsconfig.json`
- Create: `apps/docs/next.config.mjs`
- Create: `apps/docs/src/app/layout.tsx`
- Create: `apps/docs/src/app/page.tsx`

**Step 1: Create apps/docs/package.json**

```json
{
  "name": "@digifemmes/docs",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev --port 3001",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit",
    "clean": "rm -rf .next"
  },
  "dependencies": {
    "@digifemmes/tokens": "workspace:*",
    "@digifemmes/ui": "workspace:*",
    "next": "^15.1.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@digifemmes/tsconfig": "workspace:*",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "typescript": "^5.7.0"
  }
}
```

**Step 2: Create apps/docs/tsconfig.json**

```json
{
  "extends": "@digifemmes/tsconfig/react.json",
  "compilerOptions": {
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src", "next-env.d.ts", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

**Step 3: Create apps/docs/next.config.mjs**

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@digifemmes/tokens', '@digifemmes/ui'],
};

export default nextConfig;
```

**Step 4: Create apps/docs/src/app/layout.tsx**

```tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DigiFemmes Design System',
  description: 'Systeme de design complet pour DigiFemmes Cote d\'Ivoire',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
```

**Step 5: Create apps/docs/src/app/page.tsx**

```tsx
export default function Home() {
  return (
    <main>
      <h1>DigiFemmes Design System</h1>
      <p>We Can Do More.</p>
    </main>
  );
}
```

**Step 6: Install and verify**

```bash
pnpm install
pnpm turbo build --dry
```

**Step 7: Commit**

```bash
git add apps/docs/
git commit -m "chore: scaffold docs app (Next.js 15)"
```

---

### Task 7: Configure Changesets + README + LICENSE

**Files:**
- Create: `.changeset/config.json`
- Create: `LICENSE`
- Create: `README.md`

**Step 1: Create .changeset/config.json**

```json
{
  "$schema": "https://unpkg.com/@changesets/config@3.0.0/schema.json",
  "changelog": "@changesets/cli/changelog",
  "commit": false,
  "fixed": [],
  "linked": [],
  "access": "public",
  "baseBranch": "main",
  "updateInternalDependencies": "patch",
  "ignore": ["@digifemmes/docs", "@digifemmes/tsconfig"]
}
```

**Step 2: Create LICENSE (MIT)**

```
MIT License

Copyright (c) 2026 DigiFemmes Cote d'Ivoire

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

**Step 3: Create README.md**

Minimal readme with: project name, tagline, monorepo structure overview, quick install (`pnpm add @digifemmes/ui @digifemmes/tokens`), license badge, link to docs site.

**Step 4: Commit**

```bash
git add .changeset/ LICENSE README.md
git commit -m "chore: add Changesets config, MIT license, and README"
```

---

## Phase 2: Design Tokens (`@digifemmes/tokens`)

### Task 8: Implement primitive color tokens

**Files:**
- Create: `packages/tokens/src/primitives/colors.ts`
- Test: `packages/tokens/src/__tests__/colors.test.ts`

**Step 1: Write the failing test**

```typescript
// packages/tokens/src/__tests__/colors.test.ts
import { describe, it, expect } from 'vitest';
import { colors } from '../primitives/colors';

describe('primitive color tokens', () => {
  it('has orange palette with 10 shades', () => {
    expect(Object.keys(colors.orange)).toHaveLength(10);
    expect(colors.orange[500]).toBe('#FF7B00');
  });

  it('has blue palette with 10 shades', () => {
    expect(Object.keys(colors.blue)).toHaveLength(10);
    expect(colors.blue[500]).toBe('#12B8DF');
  });

  it('has navy palette with 10 shades', () => {
    expect(colors.navy[500]).toBe('#225DA7');
  });

  it('has yellow palette with 10 shades', () => {
    expect(colors.yellow[500]).toBe('#FFC107');
  });

  it('has green palette with 10 shades', () => {
    expect(colors.green[500]).toBe('#009578');
  });

  it('has neutral palette with 12 values', () => {
    expect(colors.neutral[0]).toBe('#FFFFFF');
    expect(colors.neutral[1000]).toBe('#000000');
  });

  it('all color values are valid hex', () => {
    const hexRegex = /^#[0-9A-F]{6}$/i;
    const allColors = Object.values(colors).flatMap((palette) => Object.values(palette));
    allColors.forEach((color) => {
      expect(color).toMatch(hexRegex);
    });
  });
});
```

**Step 2: Run test to verify it fails**

```bash
cd packages/tokens && pnpm vitest run src/__tests__/colors.test.ts
```

Expected: FAIL — module not found.

**Step 3: Write implementation**

```typescript
// packages/tokens/src/primitives/colors.ts
export const colors = {
  orange: {
    50:  '#FFF3E0',
    100: '#FFE0B2',
    200: '#FFCC80',
    300: '#FFB74D',
    400: '#FFA726',
    500: '#FF7B00',
    600: '#E56D00',
    700: '#CC6200',
    800: '#B25400',
    900: '#8C4300',
  },
  blue: {
    50:  '#E0F7FA',
    100: '#B2EBF2',
    200: '#80DEEA',
    300: '#4DD0E1',
    400: '#26C6DA',
    500: '#12B8DF',
    600: '#0EA7CA',
    700: '#0D95B3',
    800: '#0A7A93',
    900: '#065A6E',
  },
  navy: {
    50:  '#E8EDF5',
    100: '#C5D0E6',
    200: '#9FB3D6',
    300: '#7895C5',
    400: '#5A7EB9',
    500: '#225DA7',
    600: '#1D5196',
    700: '#184585',
    800: '#133A74',
    900: '#0E2A56',
  },
  yellow: {
    50:  '#FFFDE7',
    100: '#FFF9C4',
    200: '#FFF59D',
    300: '#FFF176',
    400: '#FFEE58',
    500: '#FFC107',
    600: '#E5AD06',
    700: '#CC9A05',
    800: '#B28704',
    900: '#8C6B03',
  },
  green: {
    50:  '#E0F2EE',
    100: '#B3E0D5',
    200: '#80CCBA',
    300: '#4DB89F',
    400: '#26A98B',
    500: '#009578',
    600: '#00856B',
    700: '#00755E',
    800: '#006551',
    900: '#004A3B',
  },
  neutral: {
    0:    '#FFFFFF',
    50:   '#FAFAFA',
    100:  '#F5F5F5',
    200:  '#EEEEEE',
    300:  '#E0E0E0',
    400:  '#BDBDBD',
    500:  '#9E9E9E',
    600:  '#757575',
    700:  '#616161',
    800:  '#424242',
    900:  '#212121',
    1000: '#000000',
  },
} as const;
```

**Step 4: Run test to verify it passes**

```bash
cd packages/tokens && pnpm vitest run src/__tests__/colors.test.ts
```

Expected: PASS — all 7 tests green.

**Step 5: Commit**

```bash
git add packages/tokens/src/primitives/colors.ts packages/tokens/src/__tests__/colors.test.ts
git commit -m "feat(tokens): add primitive color tokens (orange, blue, navy, yellow, green, neutral)"
```

---

### Task 9: Implement primitive typography tokens

**Files:**
- Create: `packages/tokens/src/primitives/typography.ts`
- Test: `packages/tokens/src/__tests__/typography.test.ts`

**Step 1: Write the failing test**

```typescript
import { describe, it, expect } from 'vitest';
import { typography } from '../primitives/typography';

describe('primitive typography tokens', () => {
  it('has three font families', () => {
    expect(typography.family.display).toContain('Clash Display');
    expect(typography.family.body).toContain('Red Hat Display');
    expect(typography.family.mono).toContain('Red Hat Mono');
  });

  it('has font weights from light to black', () => {
    expect(typography.weight.light).toBe(300);
    expect(typography.weight.black).toBe(900);
  });

  it('has font sizes in rem', () => {
    expect(typography.size.base).toBe('1rem');
    expect(typography.size.xs).toBe('0.75rem');
  });

  it('has line heights', () => {
    expect(typography.lineHeight.normal).toBe(1.5);
  });

  it('has letter spacing values', () => {
    expect(typography.letterSpacing.normal).toBe('0');
  });
});
```

**Step 2: Run test to verify it fails**

**Step 3: Write implementation** — Full typography object as specified in design doc section 5.1 (family, weight, size xs-7xl, lineHeight, letterSpacing).

**Step 4: Run test to verify it passes**

**Step 5: Commit**

```bash
git commit -m "feat(tokens): add primitive typography tokens (families, weights, sizes, line-heights)"
```

---

### Task 10: Implement primitive spacing, radius, shadow, motion, breakpoint tokens

**Files:**
- Create: `packages/tokens/src/primitives/spacing.ts`
- Create: `packages/tokens/src/primitives/radius.ts`
- Create: `packages/tokens/src/primitives/shadows.ts`
- Create: `packages/tokens/src/primitives/motion.ts`
- Create: `packages/tokens/src/primitives/breakpoints.ts`
- Create: `packages/tokens/src/primitives/index.ts`
- Test: `packages/tokens/src/__tests__/primitives.test.ts`

**Step 1: Write failing tests** — Test each module exports correct values (spacing scale, radius scale, shadow strings, motion durations/easings, breakpoints including tv at 3840px).

**Step 2: Run tests to verify they fail**

**Step 3: Implement each module** — Values exactly as defined in design doc section 5.1.

**Step 4: Create primitives barrel export**

```typescript
// packages/tokens/src/primitives/index.ts
export { colors } from './colors';
export { typography } from './typography';
export { spacing } from './spacing';
export { radius } from './radius';
export { shadows } from './shadows';
export { motion } from './motion';
export { breakpoints } from './breakpoints';
```

**Step 5: Run tests to verify they pass**

**Step 6: Commit**

```bash
git commit -m "feat(tokens): add spacing, radius, shadow, motion, and breakpoint primitives"
```

---

### Task 11: Implement semantic tokens

**Files:**
- Create: `packages/tokens/src/semantic/colors.ts`
- Create: `packages/tokens/src/semantic/typography.ts`
- Create: `packages/tokens/src/semantic/index.ts`
- Test: `packages/tokens/src/__tests__/semantic.test.ts`

**Step 1: Write failing tests** — Test that semantic tokens reference correct primitives (e.g., `semantic.color.brand.primary === '#FF7B00'`, semantic typography heading h1 uses display family + bold weight + 5xl size).

**Step 2: Implement** — As defined in design doc section 5.2. Semantic color (brand, surface, text, feedback, border) and semantic typography (heading h1-h6, body lg/base/sm/xs, label lg/base/sm).

**Step 3: Run tests, commit**

```bash
git commit -m "feat(tokens): add semantic color and typography tokens"
```

---

### Task 12: Implement theme engine (light + dark themes)

**Files:**
- Create: `packages/tokens/src/themes/light.ts`
- Create: `packages/tokens/src/themes/dark.ts`
- Create: `packages/tokens/src/themes/create-theme.ts`
- Create: `packages/tokens/src/themes/index.ts`
- Test: `packages/tokens/src/__tests__/themes.test.ts`

**Step 1: Write failing tests**

```typescript
import { describe, it, expect } from 'vitest';
import { lightTheme, darkTheme, createTheme } from '../themes';

describe('themes', () => {
  it('light theme has white default surface', () => {
    expect(lightTheme.color.surface.default).toBe('#FFFFFF');
  });

  it('dark theme has deep blue-black default surface', () => {
    expect(darkTheme.color.surface.default).toBe('#0F1117');
  });

  it('dark theme has softened brand colors', () => {
    expect(darkTheme.color.brand.primary).toBe('#FF9A33');
    expect(darkTheme.color.brand.secondary).toBe('#3DD4F5');
  });

  it('createTheme merges overrides onto base', () => {
    const custom = createTheme('test', 'light', {
      color: { brand: { accent: '#FF0000' } },
    });
    expect(custom.color.brand.accent).toBe('#FF0000');
    expect(custom.color.brand.primary).toBe('#FF7B00'); // inherited
    expect(custom.meta.name).toBe('test');
  });
});
```

**Step 2: Implement** — light/dark themes as in design doc section 8, createTheme with deepMerge utility.

**Step 3: Run tests, commit**

```bash
git commit -m "feat(tokens): add light/dark themes and createTheme engine"
```

---

### Task 13: Implement co-branding tokens

**Files:**
- Create: `packages/tokens/src/cobranding.ts`
- Test: `packages/tokens/src/__tests__/cobranding.test.ts`

**Step 1: Write failing tests** — Test dominant70 and dominant60 configs have correct scale values, position options, separator types.

**Step 2: Implement** — As in design doc section 4.

**Step 3: Run tests, commit**

```bash
git commit -m "feat(tokens): add co-branding tokens (70/30 and 60/40 rules)"
```

---

### Task 14: Implement CSS custom properties output + accessibility tokens

**Files:**
- Create: `packages/tokens/src/css/generate.ts`
- Create: `packages/tokens/src/a11y.ts`
- Create: `packages/tokens/src/index.ts` (update barrel export)
- Test: `packages/tokens/src/__tests__/css.test.ts`
- Test: `packages/tokens/src/__tests__/a11y.test.ts`

**Step 1: Write failing test for CSS generation**

```typescript
import { describe, it, expect } from 'vitest';
import { generateCSS } from '../css/generate';
import { lightTheme } from '../themes';

describe('CSS custom properties generation', () => {
  it('generates valid CSS with --df- prefix', () => {
    const css = generateCSS(lightTheme);
    expect(css).toContain('--df-color-brand-primary: #FF7B00');
    expect(css).toContain(':root {');
  });
});
```

**Step 2: Write failing test for a11y**

```typescript
import { describe, it, expect } from 'vitest';
import { accessibility } from '../a11y';

describe('accessibility tokens', () => {
  it('targets WCAG AAA', () => {
    expect(accessibility.contrast.target).toBe('AAA');
  });
  it('has focus style using brand orange', () => {
    expect(accessibility.focus.style).toContain('#FF7B00');
  });
});
```

**Step 3: Implement** — CSS generator that flattens theme object into `--df-*` custom properties. A11y tokens as in design doc section 8.

**Step 4: Update main barrel export**

```typescript
// packages/tokens/src/index.ts
export * from './primitives';
export * from './semantic';
export * from './themes';
export { cobranding } from './cobranding';
export { accessibility } from './a11y';
export { generateCSS } from './css/generate';
```

**Step 5: Run all token tests**

```bash
cd packages/tokens && pnpm vitest run
```

Expected: ALL PASS.

**Step 6: Build the package**

```bash
cd packages/tokens && pnpm build
```

Expected: dist/ folder created with .js, .mjs, .d.ts files.

**Step 7: Commit**

```bash
git commit -m "feat(tokens): add CSS output generator, accessibility tokens, and barrel exports"
```

---

### Task 15: Add Brand Voice config to @digifemmes/ai

**Files:**
- Create: `packages/ai/src/brand-voice.ts`
- Test: `packages/ai/src/__tests__/brand-voice.test.ts`

**Step 1: Write failing test** — Test brandVoice identity (name=Awa), forbidden words list, allowed emojis, greeting responses exist.

**Step 2: Implement** — Complete brandVoice config as in design doc section 7.

**Step 3: Run tests, commit**

```bash
git commit -m "feat(ai): add Awa brand voice configuration"
```

---

## Phase 3: First UI Components (`@digifemmes/ui`)

### Task 16: Setup Vanilla Extract in ui package

**Files:**
- Modify: `packages/ui/package.json` — add vanilla-extract, react deps
- Create: `packages/ui/src/theme.css.ts` — Vanilla Extract theme contract
- Create: `packages/ui/src/sprinkles.css.ts` — utility classes
- Create: `packages/ui/src/reset.css.ts` — CSS reset

**Step 1: Install deps**

```bash
cd packages/ui && pnpm add @vanilla-extract/css @vanilla-extract/recipes @vanilla-extract/sprinkles @digifemmes/tokens
pnpm add -D @vanilla-extract/vite-plugin vitest @testing-library/react @testing-library/jest-dom jsdom react react-dom
```

**Step 2: Create theme contract** from tokens — maps `@digifemmes/tokens` semantic tokens to Vanilla Extract `createThemeContract`.

**Step 3: Create light and dark theme implementations** using `createTheme`.

**Step 4: Create sprinkles** for spacing, colors, typography utilities.

**Step 5: Commit**

```bash
git commit -m "feat(ui): setup Vanilla Extract theme contract from design tokens"
```

---

### Task 17: Implement Button component (TDD)

**Files:**
- Create: `packages/ui/src/components/button/button.tsx`
- Create: `packages/ui/src/components/button/button.css.ts`
- Create: `packages/ui/src/components/button/index.ts`
- Test: `packages/ui/src/components/button/__tests__/button.test.tsx`

**Step 1: Write failing test**

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from '../button';

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Rejoindre</Button>);
    expect(screen.getByRole('button', { name: 'Rejoindre' })).toBeDefined();
  });

  it('supports variant prop', () => {
    render(<Button variant="secondary">Action</Button>);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('secondary');
  });

  it('supports size prop', () => {
    render(<Button size="lg">Grand</Button>);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('lg');
  });

  it('can be disabled', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('renders as anchor when href is provided', () => {
    render(<Button href="/test">Link</Button>);
    expect(screen.getByRole('link', { name: 'Link' })).toBeDefined();
  });
});
```

**Step 2: Run test — verify FAIL**

**Step 3: Implement Button**

- `button.css.ts` — Vanilla Extract `recipe` with variants (primary, secondary, ghost, danger), sizes (sm, md, lg), compound variants for hover/active/focus states. Uses theme tokens.
- `button.tsx` — Polymorphic component (`<button>` or `<a>`), forwards ref, accepts `variant`, `size`, `disabled`, `loading`, `icon`, `iconPosition` props.

**Step 4: Run test — verify PASS**

**Step 5: Commit**

```bash
git commit -m "feat(ui): add Button component with variants, sizes, and polymorphic rendering"
```

---

### Task 18: Implement Input component (TDD)

**Files:**
- Create: `packages/ui/src/components/input/input.tsx`
- Create: `packages/ui/src/components/input/input.css.ts`
- Create: `packages/ui/src/components/input/index.ts`
- Test: `packages/ui/src/components/input/__tests__/input.test.tsx`

**Step 1: Write failing tests** — Renders input, supports label, shows error state, supports sizes, handles onChange.

**Step 2: Implement** — Styled input with label, helper text, error state, left/right icon slots.

**Step 3: Run tests, commit**

```bash
git commit -m "feat(ui): add Input component with label, error state, and icon slots"
```

---

### Task 19: Implement Badge, Avatar, Tag, Divider primitives (TDD)

Same TDD pattern for each:

**Badge:** variants (default, success, warning, error, info), sizes (sm, md).
**Avatar:** sizes (sm, md, lg, xl), fallback initials, image src.
**Tag:** removable, variants matching brand colors.
**Divider:** horizontal/vertical, with optional label.

**Commit per component** or batch:

```bash
git commit -m "feat(ui): add Badge, Avatar, Tag, and Divider primitive components"
```

---

### Task 20: Implement Card component (TDD)

**Files:**
- Create: `packages/ui/src/components/card/card.tsx`
- Create: `packages/ui/src/components/card/card.css.ts`
- Test: `packages/ui/src/components/card/__tests__/card.test.tsx`

**Step 1: Write failing tests** — Card renders, Card.Header/Card.Body/Card.Footer composition, elevated variant has shadow, supports onClick for interactive cards.

**Step 2: Implement** — Compound component pattern (Card, Card.Header, Card.Body, Card.Footer, Card.Image).

**Step 3: Run tests, commit**

```bash
git commit -m "feat(ui): add Card compound component (Header, Body, Footer, Image)"
```

---

### Task 21: Implement Modal/Dialog component (TDD)

**Step 1: Write failing tests** — Opens/closes, focus trap, escape key closes, overlay click closes, renders title and content.

**Step 2: Implement** — Using `<dialog>` native element for accessibility, with Vanilla Extract styling.

**Step 3: Run tests, commit**

```bash
git commit -m "feat(ui): add Modal/Dialog component with focus trap and a11y"
```

---

### Task 22: Implement Toast + Alert components (TDD)

Same TDD pattern:

**Toast:** auto-dismiss, variants (success, error, warning, info), position (top-right, bottom-right, etc.), with ToastProvider context.
**Alert:** variants, closeable, with icon.

```bash
git commit -m "feat(ui): add Toast (with provider) and Alert components"
```

---

### Task 23: Implement remaining Tier 2 components

**Components:** Dropdown, Tabs, Accordion, Breadcrumb, Pagination, Popover, Tooltip, Toggle, Checkbox, Radio, Select, Textarea, Spinner, Progress, Skeleton.

TDD for each. Batch commit by logical group:

```bash
git commit -m "feat(ui): add form components (Select, Textarea, Checkbox, Radio, Toggle)"
git commit -m "feat(ui): add navigation components (Tabs, Accordion, Breadcrumb, Pagination)"
git commit -m "feat(ui): add overlay components (Dropdown, Popover, Tooltip)"
git commit -m "feat(ui): add feedback components (Spinner, Progress, Skeleton)"
```

---

### Task 24: Create UI package barrel export + build

**Files:**
- Update: `packages/ui/src/index.ts`

**Step 1: Create barrel export**

```typescript
// packages/ui/src/index.ts
export { Button } from './components/button';
export { Input } from './components/input';
export { Card } from './components/card';
export { Modal } from './components/modal';
// ... all components
export { lightTheme, darkTheme } from './theme.css';
```

**Step 2: Run full test suite**

```bash
cd packages/ui && pnpm test
```

Expected: ALL PASS.

**Step 3: Build**

```bash
cd packages/ui && pnpm build
```

**Step 4: Commit**

```bash
git commit -m "feat(ui): finalize barrel exports and verify full build"
```

---

## Phase 4: Icons Package

### Task 25: Setup @digifemmes/icons with SVG pipeline

**Files:**
- Create: `packages/icons/src/icons/*.svg` — base icon set (20-30 essential icons)
- Create: `packages/icons/scripts/generate.ts` — SVG to React component generator
- Create: `packages/icons/src/index.ts`

**Step 1: Create icon SVGs** — Essential set: arrow-right, arrow-left, check, close, menu, search, user, settings, home, plus, minus, edit, trash, download, upload, external-link, chevron-down, chevron-up, info, warning, error, success.

**Step 2: Create generation script** — Reads SVG files, outputs React components with `currentColor` for theming, forwards ref, accepts size prop.

**Step 3: Build, test, commit**

```bash
git commit -m "feat(icons): add base icon set with SVG-to-React pipeline"
```

---

## Phase 5: Documentation Site

### Task 26: Build docs site foundation pages

**Pages to implement:**
- `/` — Hero with stats, quickstart code
- `/fondations/couleurs` — Interactive color palette (click to copy hex)
- `/fondations/typographie` — Font specimens
- `/fondations/espacements` — Visual spacing scale
- `/composants/overview` — Grid of all components

TDD for page components, then integration.

```bash
git commit -m "feat(docs): add foundation pages (colors, typography, spacing)"
git commit -m "feat(docs): add component overview page with live previews"
```

---

### Task 27: Add component documentation pages with Sandpack playground

**For each component:**
- MDX page with description, props table, variants preview
- Sandpack playground for live editing
- Do/Don't examples

```bash
git commit -m "feat(docs): add component docs pages with Sandpack playgrounds"
```

---

### Task 28: Add brand pages (logo, co-branding, interdits)

```bash
git commit -m "feat(docs): add brand pages (logo rules, co-branding guidelines, interdits)"
```

---

## Phase 6: AI Components

### Task 29: Implement ChatBubble, ChatWindow, AIAvatar, ThinkingDots

TDD for each. Uses `@digifemmes/tokens` for theming and `@digifemmes/ai/brand-voice` for defaults.

```bash
git commit -m "feat(ai): add ChatBubble and ChatWindow components"
git commit -m "feat(ai): add AIAvatar with pulse animation and ThinkingDots"
```

---

### Task 30: Implement SuggestionChips, AISearchBar, AIWidget

```bash
git commit -m "feat(ai): add SuggestionChips, AISearchBar, and embeddable AIWidget"
```

---

## Phase 7: Mobile Package

### Task 31: Setup @digifemmes/mobile with Expo + React Native

- Translate tokens to React Native StyleSheet format
- Re-implement core primitives (Button, Input, Card, Avatar, Badge) in React Native
- Share brand voice and AI components where possible

```bash
git commit -m "feat(mobile): setup Expo project with token-based React Native components"
git commit -m "feat(mobile): add Button, Input, Card, Avatar, Badge for React Native"
```

---

## Phase 8: Brand Studio App

### Task 32: Scaffold Brand Studio app

- Next.js 15 app at `apps/brand-studio/`
- Template editor for social media, podcast covers, lower thirds
- Uses canvas/SVG rendering with tokens
- Export to PNG/JPG/SVG

```bash
git commit -m "feat(studio): scaffold Brand Studio app with template editor"
```

---

## Phase 9: CI/CD + Distribution

### Task 33: Setup GitHub Actions

**Files:**
- Create: `.github/workflows/ci.yml` — lint, typecheck, test, build on PR
- Create: `.github/workflows/release.yml` — Changesets publish on merge to main

```bash
git commit -m "ci: add GitHub Actions for CI and automated releases"
```

---

### Task 34: Configure Vercel deployments

- `apps/docs` → docs.digifemmes.ci
- `apps/brand-studio` → studio.digifemmes.ci
- Preview deployments on PRs

```bash
git commit -m "ci: configure Vercel deployments for docs and brand-studio"
```

---

## Execution Order Summary

| Phase | Tasks | Dependency |
|-------|-------|-----------|
| **1. Scaffold** | Tasks 1-7 | None |
| **2. Tokens** | Tasks 8-15 | Phase 1 |
| **3. UI Components** | Tasks 16-24 | Phase 2 |
| **4. Icons** | Task 25 | Phase 1 |
| **5. Docs Site** | Tasks 26-28 | Phases 2+3 |
| **6. AI Components** | Tasks 29-30 | Phases 2+3 |
| **7. Mobile** | Task 31 | Phase 2 |
| **8. Brand Studio** | Task 32 | Phases 2+3+4 |
| **9. CI/CD** | Tasks 33-34 | Phase 1 |

**Parallelizable:** Phase 4 (icons) and Phase 9 (CI/CD) can run in parallel with Phase 2. Phase 6 (AI) and Phase 7 (Mobile) can run in parallel with Phase 5 (docs).

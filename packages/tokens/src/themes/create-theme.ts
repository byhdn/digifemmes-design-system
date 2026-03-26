import { lightTheme } from './light';
import { darkTheme } from './dark';

type Theme = typeof lightTheme;
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P] | string;
};

function deepMerge<T extends Record<string, unknown>>(target: T, source: DeepPartial<T>): T {
  const result = { ...target };
  for (const key in source) {
    const sourceVal = source[key];
    const targetVal = target[key];
    if (
      sourceVal &&
      typeof sourceVal === 'object' &&
      !Array.isArray(sourceVal) &&
      targetVal &&
      typeof targetVal === 'object'
    ) {
      (result as Record<string, unknown>)[key] = deepMerge(
        targetVal as Record<string, unknown>,
        sourceVal as DeepPartial<Record<string, unknown>>,
      );
    } else if (sourceVal !== undefined) {
      (result as Record<string, unknown>)[key] = sourceVal;
    }
  }
  return result;
}

export interface ThemeMeta {
  name: string;
  base: 'light' | 'dark';
  version: string;
}

export type ThemeWithMeta = Theme & { meta: ThemeMeta };

export function createTheme(
  name: string,
  base: 'light' | 'dark',
  overrides: DeepPartial<Theme>,
): ThemeWithMeta {
  const baseTheme = base === 'light' ? lightTheme : darkTheme;
  return {
    ...deepMerge(baseTheme as unknown as Record<string, unknown>, overrides as DeepPartial<Record<string, unknown>>) as unknown as Theme,
    meta: { name, base, version: '1.0.0' },
  };
}

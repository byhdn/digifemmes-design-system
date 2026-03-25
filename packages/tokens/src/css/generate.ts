import type { lightTheme } from '../themes/light';

type Theme = typeof lightTheme;

function flattenObject(obj: Record<string, unknown>, prefix = ''): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}-${key}` : key;
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(result, flattenObject(value as Record<string, unknown>, newKey));
    } else {
      result[newKey] = String(value);
    }
  }
  return result;
}

export function generateCSS(theme: Theme, selector = ':root'): string {
  const flat = flattenObject(theme as unknown as Record<string, unknown>);
  const vars = Object.entries(flat)
    .map(([key, value]) => `  --df-${key}: ${value};`)
    .join('\n');
  return `${selector} {\n${vars}\n}`;
}

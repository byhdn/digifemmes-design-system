type ThemeLike = Record<string, unknown>;

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

export function generateCSS(theme: ThemeLike, selector = ':root'): string {
  const flat = flattenObject(theme as Record<string, unknown>);
  const vars = Object.entries(flat)
    .map(([key, value]) => `  --df-${key}: ${value};`)
    .join('\n');
  return `${selector} {\n${vars}\n}`;
}

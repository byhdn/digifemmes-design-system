import { describe, it, expect } from 'vitest';
import { lightTheme } from '../themes/light';
import { darkTheme } from '../themes/dark';
import { createTheme } from '../themes/create-theme';

const requiredColorKeys = ['surface', 'text', 'brand', 'border', 'feedback'];
const requiredSurfaceKeys = ['default', 'subtle', 'muted', 'elevated', 'inverse'];
const requiredTextKeys = ['default', 'subtle', 'muted', 'inverse', 'brand', 'link'];
const requiredBrandKeys = ['primary', 'secondary', 'accent'];
const requiredBorderKeys = ['default', 'subtle', 'strong', 'brand'];
const requiredFeedbackKeys = ['success', 'warning', 'error', 'info'];
const requiredShadowKeys = ['sm', 'md', 'lg'];

function assertThemeStructure(theme: typeof lightTheme, name: string) {
  describe(`${name} structure`, () => {
    it('has color and shadow top-level keys', () => {
      expect(theme).toHaveProperty('color');
      expect(theme).toHaveProperty('shadow');
    });

    it('has all required color group keys', () => {
      for (const key of requiredColorKeys) {
        expect(theme.color).toHaveProperty(key);
      }
    });

    it('has all surface keys', () => {
      for (const key of requiredSurfaceKeys) {
        expect(theme.color.surface).toHaveProperty(key);
      }
    });

    it('has all text keys', () => {
      for (const key of requiredTextKeys) {
        expect(theme.color.text).toHaveProperty(key);
      }
    });

    it('has all brand keys', () => {
      for (const key of requiredBrandKeys) {
        expect(theme.color.brand).toHaveProperty(key);
      }
    });

    it('has all border keys', () => {
      for (const key of requiredBorderKeys) {
        expect(theme.color.border).toHaveProperty(key);
      }
    });

    it('has all feedback keys', () => {
      for (const key of requiredFeedbackKeys) {
        expect(theme.color.feedback).toHaveProperty(key);
      }
    });

    it('has all shadow keys', () => {
      for (const key of requiredShadowKeys) {
        expect(theme.shadow).toHaveProperty(key);
      }
    });
  });
}

describe('lightTheme', () => {
  assertThemeStructure(lightTheme, 'lightTheme');

  it('uses white as default surface', () => {
    expect(lightTheme.color.surface.default).toBe('#FFFFFF');
  });

  it('uses dark text as default text color', () => {
    expect(lightTheme.color.text.default).toBe('#212121');
  });

  it('uses orange as brand primary', () => {
    expect(lightTheme.color.brand.primary).toBe('#FF7B00');
  });

  it('uses blue as brand secondary', () => {
    expect(lightTheme.color.brand.secondary).toBe('#12B8DF');
  });

  it('uses yellow as brand accent', () => {
    expect(lightTheme.color.brand.accent).toBe('#FFC107');
  });

  it('has light shadow values with low opacity', () => {
    expect(lightTheme.shadow.sm).toContain('rgba(0,0,0,0.08)');
  });
});

describe('darkTheme', () => {
  assertThemeStructure(darkTheme, 'darkTheme');

  it('uses dark surface as default', () => {
    expect(darkTheme.color.surface.default).toBe('#0F1117');
  });

  it('uses light text as default text color', () => {
    expect(darkTheme.color.text.default).toBe('#F0F0F5');
  });

  it('uses adjusted brand primary (lighter orange)', () => {
    expect(darkTheme.color.brand.primary).toBe('#FF9A33');
  });

  it('uses adjusted brand secondary (lighter blue)', () => {
    expect(darkTheme.color.brand.secondary).toBe('#3DD4F5');
  });

  it('has heavier shadow values for dark mode', () => {
    expect(darkTheme.shadow.lg).toContain('rgba(0,0,0,0.5)');
  });
});

describe('theme contrast: light vs dark', () => {
  it('inverse surfaces are swapped', () => {
    expect(lightTheme.color.surface.inverse).toBe('#212121');
    expect(darkTheme.color.surface.inverse).toBe('#FAFAFA');
  });

  it('inverse text colors are swapped', () => {
    expect(lightTheme.color.text.inverse).toBe('#FFFFFF');
    expect(darkTheme.color.text.inverse).toBe('#0F1117');
  });
});

describe('createTheme', () => {
  it('creates a theme based on light base', () => {
    const theme = createTheme('custom-light', 'light', {});
    expect(theme.meta.name).toBe('custom-light');
    expect(theme.meta.base).toBe('light');
    expect(theme.meta.version).toBe('1.0.0');
    expect(theme.color.surface.default).toBe(lightTheme.color.surface.default);
  });

  it('creates a theme based on dark base', () => {
    const theme = createTheme('custom-dark', 'dark', {});
    expect(theme.meta.name).toBe('custom-dark');
    expect(theme.meta.base).toBe('dark');
    expect(theme.color.surface.default).toBe(darkTheme.color.surface.default);
  });

  it('applies shallow overrides', () => {
    const theme = createTheme('partner', 'light', {
      shadow: { sm: '0 0 0 red' },
    });
    expect(theme.shadow.sm).toBe('0 0 0 red');
    // non-overridden shadow values remain intact
    expect(theme.shadow.md).toBe(lightTheme.shadow.md);
    expect(theme.shadow.lg).toBe(lightTheme.shadow.lg);
  });

  it('applies deep overrides to nested color keys', () => {
    const theme = createTheme('partner', 'light', {
      color: {
        brand: {
          primary: '#FF0000',
        },
      },
    });
    expect(theme.color.brand.primary).toBe('#FF0000');
    // non-overridden brand values remain
    expect(theme.color.brand.secondary).toBe(lightTheme.color.brand.secondary);
    expect(theme.color.brand.accent).toBe(lightTheme.color.brand.accent);
  });

  it('preserves all base theme keys when overriding a single leaf', () => {
    const theme = createTheme('minimal-override', 'dark', {
      color: {
        text: {
          brand: '#00FF00',
        },
      },
    });
    expect(theme.color.text.brand).toBe('#00FF00');
    expect(theme.color.text.default).toBe(darkTheme.color.text.default);
    expect(theme.color.surface.default).toBe(darkTheme.color.surface.default);
    expect(theme.color.feedback.error).toBe(darkTheme.color.feedback.error);
  });

  it('includes ThemeMeta in the returned object', () => {
    const theme = createTheme('my-theme', 'light', {});
    expect(theme.meta).toEqual({
      name: 'my-theme',
      base: 'light',
      version: '1.0.0',
    });
  });
});

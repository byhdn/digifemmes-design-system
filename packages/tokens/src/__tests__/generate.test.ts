import { describe, it, expect } from 'vitest';
import { generateCSS } from '../css/generate';
import { lightTheme } from '../themes/light';
import { darkTheme } from '../themes/dark';

describe('generateCSS', () => {
  it('produces a string starting with :root selector by default', () => {
    const css = generateCSS(lightTheme);
    expect(css).toMatch(/^:root\s*\{/);
    expect(css).toMatch(/\}$/);
  });

  it('uses the custom selector when provided', () => {
    const css = generateCSS(lightTheme, '.dark-theme');
    expect(css).toMatch(/^\.dark-theme\s*\{/);
  });

  it('prefixes all CSS custom properties with --df-', () => {
    const css = generateCSS(lightTheme);
    const varLines = css
      .split('\n')
      .filter((line) => line.trim().startsWith('--'));
    expect(varLines.length).toBeGreaterThan(0);
    for (const line of varLines) {
      expect(line.trim()).toMatch(/^--df-/);
    }
  });

  it('flattens nested theme keys with dashes', () => {
    const css = generateCSS(lightTheme);
    // color.surface.default -> --df-color-surface-default
    expect(css).toContain('--df-color-surface-default');
    expect(css).toContain('--df-color-text-default');
    expect(css).toContain('--df-color-brand-primary');
    expect(css).toContain('--df-color-border-default');
    expect(css).toContain('--df-color-feedback-success');
    expect(css).toContain('--df-shadow-sm');
    expect(css).toContain('--df-shadow-md');
    expect(css).toContain('--df-shadow-lg');
  });

  it('includes correct values for light theme', () => {
    const css = generateCSS(lightTheme);
    expect(css).toContain('--df-color-brand-primary: #FF7B00');
    expect(css).toContain('--df-color-brand-secondary: #12B8DF');
    expect(css).toContain('--df-color-surface-default: #FFFFFF');
  });

  it('includes correct values for dark theme', () => {
    const css = generateCSS(darkTheme);
    expect(css).toContain('--df-color-brand-primary: #FF9A33');
    expect(css).toContain('--df-color-surface-default: #0F1117');
    expect(css).toContain('--df-color-text-default: #F0F0F5');
  });

  it('generates different output for light and dark themes', () => {
    const lightCSS = generateCSS(lightTheme);
    const darkCSS = generateCSS(darkTheme);
    expect(lightCSS).not.toBe(darkCSS);
  });

  it('generates the same number of CSS variables for light and dark themes', () => {
    const lightVars = generateCSS(lightTheme)
      .split('\n')
      .filter((l) => l.trim().startsWith('--'));
    const darkVars = generateCSS(darkTheme)
      .split('\n')
      .filter((l) => l.trim().startsWith('--'));
    expect(lightVars.length).toBe(darkVars.length);
    expect(lightVars.length).toBeGreaterThan(10);
  });

  it('each variable line ends with a semicolon', () => {
    const css = generateCSS(lightTheme);
    const varLines = css
      .split('\n')
      .filter((line) => line.trim().startsWith('--'));
    for (const line of varLines) {
      expect(line.trim()).toMatch(/;$/);
    }
  });

  it('handles shadow values that contain spaces and commas', () => {
    const css = generateCSS(lightTheme);
    // shadow.sm = "0 1px 3px rgba(0,0,0,0.08)"
    expect(css).toContain('--df-shadow-sm: 0 1px 3px rgba(0,0,0,0.08)');
  });
});

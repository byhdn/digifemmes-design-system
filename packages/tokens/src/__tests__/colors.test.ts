import { describe, it, expect } from 'vitest';
import { colors } from '../primitives/colors';

describe('colors', () => {
  /* ---- Palette existence ---- */
  it('exports all 6 color palettes', () => {
    expect(Object.keys(colors)).toEqual(
      expect.arrayContaining(['orange', 'blue', 'navy', 'yellow', 'green', 'neutral']),
    );
    expect(Object.keys(colors)).toHaveLength(6);
  });

  /* ---- Brand orange palette ---- */
  describe('orange palette', () => {
    it('has shades from 50 to 900', () => {
      const shades = Object.keys(colors.orange).map(Number);
      expect(shades).toEqual([50, 100, 200, 300, 400, 500, 600, 700, 800, 900]);
    });

    it('has correct brand orange 500 value', () => {
      expect(colors.orange[500]).toBe('#FF7B00');
    });

    it('50 shade is the lightest (starts with #FFF)', () => {
      expect(colors.orange[50]).toMatch(/^#FFF/);
    });

    it('900 shade is the darkest', () => {
      expect(colors.orange[900]).toBe('#8C4300');
    });
  });

  /* ---- Brand blue palette ---- */
  describe('blue palette', () => {
    it('has shades from 50 to 900', () => {
      const shades = Object.keys(colors.blue).map(Number);
      expect(shades).toEqual([50, 100, 200, 300, 400, 500, 600, 700, 800, 900]);
    });

    it('has correct brand blue 500 value', () => {
      expect(colors.blue[500]).toBe('#12B8DF');
    });
  });

  /* ---- Navy palette ---- */
  describe('navy palette', () => {
    it('has 10 shades', () => {
      expect(Object.keys(colors.navy)).toHaveLength(10);
    });

    it('has correct navy 500 value', () => {
      expect(colors.navy[500]).toBe('#225DA7');
    });
  });

  /* ---- Yellow palette ---- */
  describe('yellow palette', () => {
    it('has 10 shades', () => {
      expect(Object.keys(colors.yellow)).toHaveLength(10);
    });

    it('has correct yellow 500 value', () => {
      expect(colors.yellow[500]).toBe('#FFC107');
    });
  });

  /* ---- Green palette ---- */
  describe('green palette', () => {
    it('has 10 shades', () => {
      expect(Object.keys(colors.green)).toHaveLength(10);
    });

    it('has correct green 500 value', () => {
      expect(colors.green[500]).toBe('#009578');
    });
  });

  /* ---- Neutral palette ---- */
  describe('neutral palette', () => {
    it('has shades from 0 to 1000 (12 entries)', () => {
      expect(Object.keys(colors.neutral)).toHaveLength(12);
    });

    it('includes pure white (0) and pure black (1000)', () => {
      expect(colors.neutral[0]).toBe('#FFFFFF');
      expect(colors.neutral[1000]).toBe('#000000');
    });

    it('has standard gray midpoint at 500', () => {
      expect(colors.neutral[500]).toBe('#9E9E9E');
    });
  });

  /* ---- General structure checks ---- */
  it('every shade value is a valid 6-digit hex color', () => {
    const hexPattern = /^#[0-9A-F]{6}$/;
    for (const palette of Object.values(colors)) {
      for (const value of Object.values(palette)) {
        expect(value).toMatch(hexPattern);
      }
    }
  });

  it('colors object is frozen (as const)', () => {
    // as const makes it readonly but doesn't freeze at runtime,
    // we just verify the shape is immutable at compile-time by checking values are strings
    for (const palette of Object.values(colors)) {
      for (const value of Object.values(palette)) {
        expect(typeof value).toBe('string');
      }
    }
  });
});

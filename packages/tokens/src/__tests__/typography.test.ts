import { describe, it, expect } from 'vitest';
import { typography } from '../primitives/typography';

describe('typography', () => {
  /* ---- Font families ---- */
  describe('font families', () => {
    it('has display, body, and mono families', () => {
      expect(typography.family).toHaveProperty('display');
      expect(typography.family).toHaveProperty('body');
      expect(typography.family).toHaveProperty('mono');
    });

    it('display font is Clash Display', () => {
      expect(typography.family.display).toContain('Clash Display');
      expect(typography.family.display).toContain('sans-serif');
    });

    it('body font is Red Hat Display', () => {
      expect(typography.family.body).toContain('Red Hat Display');
      expect(typography.family.body).toContain('sans-serif');
    });

    it('mono font is Red Hat Mono', () => {
      expect(typography.family.mono).toContain('Red Hat Mono');
      expect(typography.family.mono).toContain('monospace');
    });
  });

  /* ---- Font weights ---- */
  describe('font weights', () => {
    it('has all weight steps from light to black', () => {
      const expected = ['light', 'regular', 'medium', 'semibold', 'bold', 'extrabold', 'black'];
      expect(Object.keys(typography.weight)).toEqual(expected);
    });

    it('light is 300', () => {
      expect(typography.weight.light).toBe(300);
    });

    it('regular is 400', () => {
      expect(typography.weight.regular).toBe(400);
    });

    it('semibold is 600', () => {
      expect(typography.weight.semibold).toBe(600);
    });

    it('bold is 700', () => {
      expect(typography.weight.bold).toBe(700);
    });

    it('black is 900', () => {
      expect(typography.weight.black).toBe(900);
    });

    it('weights are monotonically increasing', () => {
      const values = Object.values(typography.weight);
      for (let i = 1; i < values.length; i++) {
        expect(values[i]).toBeGreaterThan(values[i - 1]);
      }
    });
  });

  /* ---- Font sizes ---- */
  describe('font sizes', () => {
    it('has 11 size steps from xs to 7xl', () => {
      expect(Object.keys(typography.size)).toHaveLength(11);
    });

    it('base size is 1rem', () => {
      expect(typography.size.base).toBe('1rem');
    });

    it('xs is 0.75rem', () => {
      expect(typography.size.xs).toBe('0.75rem');
    });

    it('all sizes use rem unit', () => {
      for (const value of Object.values(typography.size)) {
        expect(value).toMatch(/rem$/);
      }
    });

    it('sizes increase progressively', () => {
      const numericValues = Object.values(typography.size).map((v) =>
        parseFloat(v),
      );
      for (let i = 1; i < numericValues.length; i++) {
        expect(numericValues[i]).toBeGreaterThanOrEqual(numericValues[i - 1]);
      }
    });
  });

  /* ---- Line heights ---- */
  describe('line heights', () => {
    it('has tight, snug, normal, relaxed, loose', () => {
      expect(Object.keys(typography.lineHeight)).toEqual([
        'tight',
        'snug',
        'normal',
        'relaxed',
        'loose',
      ]);
    });

    it('normal line height is 1.5', () => {
      expect(typography.lineHeight.normal).toBe(1.5);
    });

    it('tight is the smallest line height', () => {
      expect(typography.lineHeight.tight).toBe(1.1);
    });

    it('line heights increase from tight to loose', () => {
      const values = Object.values(typography.lineHeight);
      for (let i = 1; i < values.length; i++) {
        expect(values[i]).toBeGreaterThan(values[i - 1]);
      }
    });
  });

  /* ---- Letter spacing ---- */
  describe('letter spacing', () => {
    it('has tighter, tight, normal, wide, wider', () => {
      expect(Object.keys(typography.letterSpacing)).toEqual([
        'tighter',
        'tight',
        'normal',
        'wide',
        'wider',
      ]);
    });

    it('normal letter spacing is 0', () => {
      expect(typography.letterSpacing.normal).toBe('0');
    });

    it('tighter is negative', () => {
      expect(typography.letterSpacing.tighter).toMatch(/^-/);
    });

    it('wider is positive', () => {
      expect(parseFloat(typography.letterSpacing.wider)).toBeGreaterThan(0);
    });
  });
});

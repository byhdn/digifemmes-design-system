import { describe, it, expect } from 'vitest';
import { accessibility } from '../a11y';

describe('accessibility', () => {
  /* ---- Contrast ratios ---- */
  describe('contrast', () => {
    it('defines AA contrast ratios', () => {
      expect(accessibility.contrast.AA.normal).toBe(4.5);
      expect(accessibility.contrast.AA.large).toBe(3.0);
    });

    it('defines AAA contrast ratios', () => {
      expect(accessibility.contrast.AAA.normal).toBe(7.0);
      expect(accessibility.contrast.AAA.large).toBe(4.5);
    });

    it('targets AAA as the default compliance level', () => {
      expect(accessibility.contrast.target).toBe('AAA');
    });

    it('AAA ratios are stricter than AA', () => {
      expect(accessibility.contrast.AAA.normal).toBeGreaterThan(
        accessibility.contrast.AA.normal,
      );
      expect(accessibility.contrast.AAA.large).toBeGreaterThan(
        accessibility.contrast.AA.large,
      );
    });
  });

  /* ---- Motion / reduced motion ---- */
  describe('motion', () => {
    it('sets duration to 0ms for reduced motion', () => {
      expect(accessibility.motion.reducedMotion.duration).toBe('0ms');
    });

    it('uses linear easing for reduced motion', () => {
      expect(accessibility.motion.reducedMotion.easing).toBe('linear');
    });
  });

  /* ---- Focus styles ---- */
  describe('focus', () => {
    it('uses a 2px solid orange focus ring', () => {
      expect(accessibility.focus.style).toBe('2px solid #FF7B00');
    });

    it('has a 2px focus offset', () => {
      expect(accessibility.focus.offset).toBe('2px');
    });

    it('focus color matches brand orange', () => {
      expect(accessibility.focus.style).toContain('#FF7B00');
    });
  });

  /* ---- Font size constraints ---- */
  describe('fontSize', () => {
    it('minimum base font size is 16px', () => {
      expect(accessibility.fontSize.minBase).toBe('16px');
    });

    it('maximum scale factor is 2.0', () => {
      expect(accessibility.fontSize.maxScale).toBe(2.0);
    });

    it('uses rem units', () => {
      expect(accessibility.fontSize.unit).toBe('rem');
    });
  });

  /* ---- Overall structure ---- */
  describe('structure', () => {
    it('has all top-level keys: contrast, motion, focus, fontSize', () => {
      expect(accessibility).toHaveProperty('contrast');
      expect(accessibility).toHaveProperty('motion');
      expect(accessibility).toHaveProperty('focus');
      expect(accessibility).toHaveProperty('fontSize');
      expect(Object.keys(accessibility)).toHaveLength(4);
    });
  });
});

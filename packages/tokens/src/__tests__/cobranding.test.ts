import { describe, it, expect } from 'vitest';
import { cobranding } from '../cobranding';

describe('cobranding', () => {
  /* ---- dominant70 configuration ---- */
  describe('dominant70', () => {
    const d70 = cobranding.dominant70;

    it('has dfLogoScale of 1 (full size)', () => {
      expect(d70.dfLogoScale).toBe(1);
    });

    it('limits partner logo to 43% scale', () => {
      expect(d70.partnerLogoMaxScale).toBe(0.43);
    });

    it('positions DigiFemmes on the left', () => {
      expect(d70.dfPosition).toBe('left');
    });

    it('uses line separator type', () => {
      expect(d70.separatorType).toBe('line');
    });

    it('does NOT allow partner color', () => {
      expect(d70.partnerColorAllowed).toBe(false);
    });

    it('requires minimum 15% spacing', () => {
      expect(d70.minSpacingPercent).toBe(15);
    });
  });

  /* ---- dominant60 configuration ---- */
  describe('dominant60', () => {
    const d60 = cobranding.dominant60;

    it('has dfLogoScale of 1', () => {
      expect(d60.dfLogoScale).toBe(1);
    });

    it('limits partner logo to 67% scale', () => {
      expect(d60.partnerLogoMaxScale).toBe(0.67);
    });

    it('positions DigiFemmes on the left', () => {
      expect(d60.dfPosition).toBe('left');
    });

    it('uses text separator type', () => {
      expect(d60.separatorType).toBe('text');
    });

    it('allows partner color', () => {
      expect(d60.partnerColorAllowed).toBe(true);
    });

    it('requires minimum 15% spacing', () => {
      expect(d60.minSpacingPercent).toBe(15);
    });
  });

  /* ---- partner scale comparison ---- */
  describe('partner scale hierarchy', () => {
    it('dominant70 gives partner less space than dominant60', () => {
      expect(cobranding.dominant70.partnerLogoMaxScale).toBeLessThan(
        cobranding.dominant60.partnerLogoMaxScale,
      );
    });
  });

  /* ---- allowed backgrounds ---- */
  describe('allowedBackgrounds', () => {
    it('has exactly 4 allowed backgrounds', () => {
      expect(cobranding.allowedBackgrounds).toHaveLength(4);
    });

    it('includes white', () => {
      expect(cobranding.allowedBackgrounds).toContain('#FFFFFF');
    });

    it('includes brand blue (#12B8DF)', () => {
      expect(cobranding.allowedBackgrounds).toContain('#12B8DF');
    });

    it('includes brand orange (#FF7B00)', () => {
      expect(cobranding.allowedBackgrounds).toContain('#FF7B00');
    });

    it('includes black', () => {
      expect(cobranding.allowedBackgrounds).toContain('#000000');
    });
  });

  /* ---- rules ---- */
  describe('rules', () => {
    it('naming order starts with DigiFemmes', () => {
      expect(cobranding.rules.namingOrder).toMatch(/^DigiFemmes/);
      expect(cobranding.rules.namingOrder).toBe('DigiFemmes x [Partner]');
    });

    it('favicon is digifemmes-only', () => {
      expect(cobranding.rules.faviconRule).toBe('digifemmes-only');
    });

    it('social profile is digifemmes-only', () => {
      expect(cobranding.rules.socialProfileRule).toBe('digifemmes-only');
    });

    it('requires a date range for co-branding', () => {
      expect(cobranding.rules.requiresDateRange).toBe(true);
    });
  });
});

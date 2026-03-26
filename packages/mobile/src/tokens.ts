import { colors, typography, spacing } from '@digifemmes/tokens';

/* -------------------------------------------------------------------------- */
/*  Mobile token adaptations                                                   */
/*  Converts rem-based web tokens to numeric values for React Native           */
/* -------------------------------------------------------------------------- */

/** Convert a rem string like '0.75rem' to a numeric pixel value (base 16) */
function remToNum(rem: string): number {
  const match = rem.match(/^([\d.]+)rem$/);
  return match ? parseFloat(match[1]) * 16 : 0;
}

/** Mobile spacing — numeric values for React Native */
export const mobileSpacing = {
  0: 0,
  1: remToNum(spacing[1]),   // 4
  2: remToNum(spacing[2]),   // 8
  3: remToNum(spacing[3]),   // 12
  4: remToNum(spacing[4]),   // 16
  5: remToNum(spacing[5]),   // 20
  6: remToNum(spacing[6]),   // 24
  8: remToNum(spacing[8]),   // 32
  10: remToNum(spacing[10]), // 40
  12: remToNum(spacing[12]), // 48
  16: remToNum(spacing[16]), // 64
  20: remToNum(spacing[20]), // 80
  24: remToNum(spacing[24]), // 96
} as const;

/** Mobile font sizes — numeric values for React Native */
export const mobileFontSize = {
  xs: remToNum(typography.size.xs),       // 12
  sm: remToNum(typography.size.sm),       // 14
  base: remToNum(typography.size.base),   // 16
  lg: remToNum(typography.size.lg),       // 18
  xl: remToNum(typography.size.xl),       // 20
  '2xl': remToNum(typography.size['2xl']), // 24
  '3xl': remToNum(typography.size['3xl']), // 30
  '4xl': remToNum(typography.size['4xl']), // 36
  '5xl': remToNum(typography.size['5xl']), // 48
  '6xl': remToNum(typography.size['6xl']), // 60
  '7xl': remToNum(typography.size['7xl']), // 72
} as const;

/** Mobile font families — platform-agnostic names (users map these to loaded fonts) */
export const mobileFontFamily = {
  display: 'ClashDisplay',
  body: 'RedHatDisplay',
  mono: 'RedHatMono',
} as const;

/** Mobile border radius */
export const mobileRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 24,
  full: 9999,
} as const;

/** Re-export primitives directly */
export { colors, typography, spacing };

/** Re-export font weights */
export const fontWeight = typography.weight;

/** Re-export line heights */
export const lineHeight = typography.lineHeight;

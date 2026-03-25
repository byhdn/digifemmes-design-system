import { typography } from '../primitives/typography';

export const semanticTypography = {
  heading: {
    h1: {
      fontFamily: typography.family.display,
      fontWeight: typography.weight.bold,
      fontSize: typography.size['5xl'],
      lineHeight: typography.lineHeight.tight,
      letterSpacing: typography.letterSpacing.tight,
    },
    h2: {
      fontFamily: typography.family.display,
      fontWeight: typography.weight.bold,
      fontSize: typography.size['4xl'],
      lineHeight: typography.lineHeight.tight,
      letterSpacing: typography.letterSpacing.tight,
    },
    h3: {
      fontFamily: typography.family.display,
      fontWeight: typography.weight.semibold,
      fontSize: typography.size['3xl'],
      lineHeight: typography.lineHeight.snug,
      letterSpacing: typography.letterSpacing.normal,
    },
    h4: {
      fontFamily: typography.family.display,
      fontWeight: typography.weight.medium,
      fontSize: typography.size['2xl'],
      lineHeight: typography.lineHeight.snug,
      letterSpacing: typography.letterSpacing.normal,
    },
    h5: {
      fontFamily: typography.family.display,
      fontWeight: typography.weight.medium,
      fontSize: typography.size.xl,
      lineHeight: typography.lineHeight.normal,
      letterSpacing: typography.letterSpacing.normal,
    },
    h6: {
      fontFamily: typography.family.display,
      fontWeight: typography.weight.medium,
      fontSize: typography.size.lg,
      lineHeight: typography.lineHeight.normal,
      letterSpacing: typography.letterSpacing.normal,
    },
  },
  body: {
    lg: {
      fontFamily: typography.family.body,
      fontWeight: typography.weight.regular,
      fontSize: typography.size.lg,
      lineHeight: typography.lineHeight.relaxed,
    },
    base: {
      fontFamily: typography.family.body,
      fontWeight: typography.weight.regular,
      fontSize: typography.size.base,
      lineHeight: typography.lineHeight.normal,
    },
    sm: {
      fontFamily: typography.family.body,
      fontWeight: typography.weight.regular,
      fontSize: typography.size.sm,
      lineHeight: typography.lineHeight.normal,
    },
    xs: {
      fontFamily: typography.family.body,
      fontWeight: typography.weight.regular,
      fontSize: typography.size.xs,
      lineHeight: typography.lineHeight.normal,
    },
  },
  label: {
    lg: {
      fontFamily: typography.family.body,
      fontWeight: typography.weight.semibold,
      fontSize: typography.size.base,
      lineHeight: typography.lineHeight.tight,
    },
    base: {
      fontFamily: typography.family.body,
      fontWeight: typography.weight.semibold,
      fontSize: typography.size.sm,
      lineHeight: typography.lineHeight.tight,
    },
    sm: {
      fontFamily: typography.family.body,
      fontWeight: typography.weight.medium,
      fontSize: typography.size.xs,
      lineHeight: typography.lineHeight.tight,
    },
  },
} as const;

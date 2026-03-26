import { lightTheme, darkTheme } from '@digifemmes/tokens';
import { mobileSpacing, mobileFontSize, mobileFontFamily, mobileRadius, fontWeight, lineHeight } from './tokens';

/* -------------------------------------------------------------------------- */
/*  Mobile theme system                                                        */
/* -------------------------------------------------------------------------- */

export interface MobileTheme {
  /** Unique theme name */
  name: string;
  /** Whether this is a dark theme */
  dark: boolean;
  /** Semantic color tokens */
  color: {
    surface: {
      default: string;
      subtle: string;
      muted: string;
      elevated: string;
      inverse: string;
    };
    text: {
      default: string;
      subtle: string;
      muted: string;
      inverse: string;
      brand: string;
      link: string;
    };
    brand: {
      primary: string;
      secondary: string;
      accent: string;
    };
    border: {
      default: string;
      subtle: string;
      strong: string;
      brand: string;
    };
    feedback: {
      success: string;
      warning: string;
      error: string;
      info: string;
    };
  };
  /** Spacing scale (numeric for RN) */
  spacing: typeof mobileSpacing;
  /** Font size scale (numeric for RN) */
  fontSize: typeof mobileFontSize;
  /** Font family names */
  fontFamily: typeof mobileFontFamily;
  /** Font weights */
  fontWeight: typeof fontWeight;
  /** Line heights */
  lineHeight: typeof lineHeight;
  /** Border radius scale */
  radius: typeof mobileRadius;
  /** Shadow presets */
  shadow: {
    sm: MobileShadow;
    md: MobileShadow;
    lg: MobileShadow;
  };
}

export interface MobileShadow {
  shadowColor: string;
  shadowOffset: { width: number; height: number };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
}

/* -------------------------------------------------------------------------- */
/*  Shadow helpers                                                             */
/* -------------------------------------------------------------------------- */

const lightShadows: MobileTheme['shadow'] = {
  sm: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  md: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.1,
    shadowRadius: 32,
    elevation: 8,
  },
};

const darkShadows: MobileTheme['shadow'] = {
  sm: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2,
  },
  md: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.5,
    shadowRadius: 32,
    elevation: 8,
  },
};

/* -------------------------------------------------------------------------- */
/*  Shared layout tokens                                                       */
/* -------------------------------------------------------------------------- */

const sharedLayoutTokens = {
  spacing: mobileSpacing,
  fontSize: mobileFontSize,
  fontFamily: mobileFontFamily,
  fontWeight,
  lineHeight,
  radius: mobileRadius,
};

/* -------------------------------------------------------------------------- */
/*  Preset themes                                                              */
/* -------------------------------------------------------------------------- */

export const mobileLight: MobileTheme = {
  name: 'digifemmes-light',
  dark: false,
  color: lightTheme.color,
  shadow: lightShadows,
  ...sharedLayoutTokens,
};

export const mobileDark: MobileTheme = {
  name: 'digifemmes-dark',
  dark: true,
  color: darkTheme.color,
  shadow: darkShadows,
  ...sharedLayoutTokens,
};

/* -------------------------------------------------------------------------- */
/*  Theme factory                                                              */
/* -------------------------------------------------------------------------- */

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

function deepMerge<T extends Record<string, unknown>>(target: T, source: DeepPartial<T>): T {
  const result = { ...target };
  for (const key in source) {
    const sourceVal = source[key];
    const targetVal = target[key];
    if (
      sourceVal &&
      typeof sourceVal === 'object' &&
      !Array.isArray(sourceVal) &&
      targetVal &&
      typeof targetVal === 'object'
    ) {
      (result as Record<string, unknown>)[key] = deepMerge(
        targetVal as Record<string, unknown>,
        sourceVal as DeepPartial<Record<string, unknown>>,
      );
    } else if (sourceVal !== undefined) {
      (result as Record<string, unknown>)[key] = sourceVal;
    }
  }
  return result;
}

/**
 * Create a custom mobile theme by merging overrides onto a base theme.
 *
 * @example
 * ```ts
 * const custom = createMobileTheme('my-theme', 'light', {
 *   color: { brand: { primary: '#FF0000' } },
 * });
 * ```
 */
export function createMobileTheme(
  name: string,
  base: 'light' | 'dark',
  overrides: DeepPartial<Omit<MobileTheme, 'name' | 'dark'>> = {},
): MobileTheme {
  const baseTheme = base === 'light' ? mobileLight : mobileDark;
  const merged = deepMerge(
    baseTheme as unknown as Record<string, unknown>,
    overrides as DeepPartial<Record<string, unknown>>,
  ) as unknown as MobileTheme;
  return { ...merged, name, dark: base === 'dark' };
}

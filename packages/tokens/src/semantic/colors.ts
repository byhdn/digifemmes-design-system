import { colors } from '../primitives/colors';

export const semanticColors = {
  brand: {
    primary: colors.orange[500],
    secondary: colors.blue[500],
    accent: colors.yellow[500],
  },
  surface: {
    default: colors.neutral[0],
    subtle: colors.neutral[50],
    muted: colors.neutral[100],
    elevated: colors.neutral[0],
    inverse: colors.neutral[900],
  },
  text: {
    default: colors.neutral[900],
    subtle: colors.neutral[600],
    muted: colors.neutral[400],
    inverse: colors.neutral[0],
    brand: colors.blue[500],
    link: colors.blue[600],
  },
  feedback: {
    success: colors.green[500],
    warning: colors.yellow[500],
    error: '#DC2626',
    info: colors.blue[500],
  },
  border: {
    default: colors.neutral[200],
    subtle: colors.neutral[100],
    strong: colors.neutral[400],
    brand: colors.orange[500],
  },
} as const;

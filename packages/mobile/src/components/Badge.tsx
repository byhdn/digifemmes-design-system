import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  type ViewStyle,
  type TextStyle,
  type ViewProps,
} from 'react-native';
import { colors } from '@digifemmes/tokens';
import { mobileRadius, mobileFontSize } from '../tokens';

/* -------------------------------------------------------------------------- */
/*  Types                                                                      */
/* -------------------------------------------------------------------------- */

export type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends Omit<ViewProps, 'children'> {
  /** Visual variant */
  variant?: BadgeVariant;
  /** Badge size */
  size?: BadgeSize;
  /** Badge content */
  children: string;
}

/* -------------------------------------------------------------------------- */
/*  Variant colors                                                             */
/* -------------------------------------------------------------------------- */

const variantColors: Record<BadgeVariant, { bg: string; color: string; border: string }> = {
  default: {
    bg: colors.neutral[100],
    color: colors.neutral[900],
    border: colors.neutral[300],
  },
  success: {
    bg: '#E8F5E9',
    color: colors.green[500],
    border: colors.green[500],
  },
  warning: {
    bg: '#FFF8E1',
    color: '#E65100',
    border: colors.yellow[500],
  },
  error: {
    bg: '#FEE2E2',
    color: '#DC2626',
    border: '#DC2626',
  },
  info: {
    bg: '#E1F5FE',
    color: colors.blue[500],
    border: colors.blue[500],
  },
};

const sizeStyles: Record<BadgeSize, { paddingH: number; paddingV: number; fontSize: number }> = {
  sm: { paddingH: 8, paddingV: 2, fontSize: mobileFontSize.xs - 1 },
  md: { paddingH: 10, paddingV: 4, fontSize: mobileFontSize.xs },
};

/* -------------------------------------------------------------------------- */
/*  Component                                                                  */
/* -------------------------------------------------------------------------- */

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  size = 'md',
  children,
  style,
  ...rest
}) => {
  const vc = variantColors[variant];
  const ss = sizeStyles[size];

  const containerStyle: ViewStyle = {
    backgroundColor: vc.bg,
    borderColor: vc.border,
    borderWidth: 1,
    borderRadius: mobileRadius.full,
    paddingHorizontal: ss.paddingH,
    paddingVertical: ss.paddingV,
    alignSelf: 'flex-start',
  };

  const textStyle: TextStyle = {
    color: vc.color,
    fontSize: ss.fontSize,
    fontWeight: '600',
    fontFamily: 'RedHatDisplay',
  };

  return (
    <View
      style={[styles.base, containerStyle, style as ViewStyle]}
      accessibilityRole="text"
      {...rest}
    >
      <Text style={textStyle}>{children}</Text>
    </View>
  );
};

Badge.displayName = 'Badge';

/* -------------------------------------------------------------------------- */
/*  Styles                                                                     */
/* -------------------------------------------------------------------------- */

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

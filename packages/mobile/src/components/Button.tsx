import React from 'react';
import {
  Pressable,
  Text,
  ActivityIndicator,
  StyleSheet,
  type ViewStyle,
  type TextStyle,
  type PressableProps,
} from 'react-native';
import { colors } from '@digifemmes/tokens';
import { mobileSpacing, mobileFontSize, mobileRadius } from '../tokens';

/* -------------------------------------------------------------------------- */
/*  Types                                                                      */
/* -------------------------------------------------------------------------- */

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<PressableProps, 'children'> {
  /** Visual style variant */
  variant?: ButtonVariant;
  /** Button size */
  size?: ButtonSize;
  /** Show loading spinner and disable interaction */
  loading?: boolean;
  /** Button label */
  children: string;
}

/* -------------------------------------------------------------------------- */
/*  Style maps                                                                 */
/* -------------------------------------------------------------------------- */

const variantContainer: Record<ButtonVariant, ViewStyle> = {
  primary: {
    backgroundColor: colors.orange[500],
    borderWidth: 0,
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.orange[500],
  },
  ghost: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  danger: {
    backgroundColor: '#DC2626',
    borderWidth: 0,
  },
};

const variantText: Record<ButtonVariant, TextStyle> = {
  primary: { color: '#FFFFFF' },
  secondary: { color: colors.orange[500] },
  ghost: { color: colors.neutral[900] },
  danger: { color: '#FFFFFF' },
};

const sizeContainer: Record<ButtonSize, ViewStyle> = {
  sm: {
    paddingVertical: mobileSpacing[1],
    paddingHorizontal: mobileSpacing[3],
    minHeight: 32,
    borderRadius: mobileRadius.md,
  },
  md: {
    paddingVertical: mobileSpacing[2],
    paddingHorizontal: mobileSpacing[4],
    minHeight: 40,
    borderRadius: mobileRadius.md,
  },
  lg: {
    paddingVertical: mobileSpacing[3],
    paddingHorizontal: mobileSpacing[6],
    minHeight: 48,
    borderRadius: mobileRadius.lg,
  },
};

const sizeText: Record<ButtonSize, TextStyle> = {
  sm: { fontSize: mobileFontSize.sm - 1 },
  md: { fontSize: mobileFontSize.sm },
  lg: { fontSize: mobileFontSize.base },
};

/* -------------------------------------------------------------------------- */
/*  Component                                                                  */
/* -------------------------------------------------------------------------- */

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  children,
  style,
  ...rest
}) => {
  const isDisabled = disabled || loading;

  const spinnerColor =
    variant === 'secondary' || variant === 'ghost'
      ? colors.orange[500]
      : '#FFFFFF';

  return (
    <Pressable
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        variantContainer[variant],
        sizeContainer[size],
        isDisabled && styles.disabled,
        pressed && !isDisabled && styles.pressed,
        style as ViewStyle,
      ]}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      {...rest}
    >
      {loading && (
        <ActivityIndicator
          size="small"
          color={spinnerColor}
          style={styles.spinner}
        />
      )}
      <Text
        style={[
          styles.label,
          variantText[variant],
          sizeText[size],
          loading && styles.labelLoading,
        ]}
      >
        {children}
      </Text>
    </Pressable>
  );
};

Button.displayName = 'Button';

/* -------------------------------------------------------------------------- */
/*  Styles                                                                     */
/* -------------------------------------------------------------------------- */

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: mobileSpacing[2],
  },
  label: {
    fontFamily: 'RedHatDisplay',
    fontWeight: '600',
  },
  labelLoading: {
    opacity: 0.7,
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.85,
  },
  spinner: {
    marginRight: mobileSpacing[1],
  },
});

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  type ViewStyle,
  type TextStyle,
  type TextInputProps,
} from 'react-native';
import { colors } from '@digifemmes/tokens';
import { mobileSpacing, mobileFontSize, mobileRadius } from '../tokens';

/* -------------------------------------------------------------------------- */
/*  Types                                                                      */
/* -------------------------------------------------------------------------- */

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<TextInputProps, 'style'> {
  /** Label displayed above the input */
  label?: string;
  /** Error message — triggers error styling */
  error?: string;
  /** Helper text shown below the input */
  helperText?: string;
  /** Input size */
  size?: InputSize;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Whether the input is required */
  required?: boolean;
  /** Container style overrides */
  containerStyle?: ViewStyle;
  /** Input style overrides */
  inputStyle?: TextStyle;
}

/* -------------------------------------------------------------------------- */
/*  Size presets                                                                */
/* -------------------------------------------------------------------------- */

const sizeMap: Record<InputSize, { height: number; fontSize: number; paddingH: number; paddingV: number }> = {
  sm: {
    height: 32,
    fontSize: mobileFontSize.sm - 1,
    paddingH: mobileSpacing[2],
    paddingV: mobileSpacing[1],
  },
  md: {
    height: 40,
    fontSize: mobileFontSize.sm,
    paddingH: mobileSpacing[3],
    paddingV: mobileSpacing[2],
  },
  lg: {
    height: 48,
    fontSize: mobileFontSize.base,
    paddingH: mobileSpacing[4],
    paddingV: mobileSpacing[3],
  },
};

/* -------------------------------------------------------------------------- */
/*  Component                                                                  */
/* -------------------------------------------------------------------------- */

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  size = 'md',
  disabled = false,
  required = false,
  containerStyle,
  inputStyle,
  ...rest
}) => {
  const [focused, setFocused] = useState(false);
  const s = sizeMap[size];

  const borderColor = error
    ? '#DC2626'
    : focused
      ? colors.orange[500]
      : colors.neutral[300];

  return (
    <View style={[styles.wrapper, containerStyle]}>
      {label && (
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}

      <TextInput
        editable={!disabled}
        placeholderTextColor={colors.neutral[400]}
        onFocus={(e) => {
          setFocused(true);
          rest.onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          rest.onBlur?.(e);
        }}
        style={[
          styles.input,
          {
            height: s.height,
            fontSize: s.fontSize,
            paddingHorizontal: s.paddingH,
            paddingVertical: s.paddingV,
            borderColor,
          },
          disabled && styles.inputDisabled,
          inputStyle,
        ]}
        accessibilityLabel={label}
        accessibilityState={{ disabled }}
        {...rest}
      />

      {error && <Text style={styles.error}>{error}</Text>}
      {helperText && !error && <Text style={styles.helper}>{helperText}</Text>}
    </View>
  );
};

Input.displayName = 'Input';

/* -------------------------------------------------------------------------- */
/*  Styles                                                                     */
/* -------------------------------------------------------------------------- */

const styles = StyleSheet.create({
  wrapper: {
    gap: mobileSpacing[1],
    width: '100%',
  },
  label: {
    fontFamily: 'RedHatDisplay',
    fontSize: mobileFontSize.sm,
    fontWeight: '500',
    color: colors.neutral[900],
  },
  required: {
    color: '#DC2626',
  },
  input: {
    fontFamily: 'RedHatDisplay',
    color: colors.neutral[900],
    backgroundColor: colors.neutral[0],
    borderWidth: 1.5,
    borderRadius: mobileRadius.md,
  },
  inputDisabled: {
    opacity: 0.5,
    backgroundColor: colors.neutral[100],
  },
  error: {
    fontFamily: 'RedHatDisplay',
    fontSize: mobileFontSize.xs,
    color: '#DC2626',
  },
  helper: {
    fontFamily: 'RedHatDisplay',
    fontSize: mobileFontSize.xs,
    color: colors.neutral[600],
  },
});

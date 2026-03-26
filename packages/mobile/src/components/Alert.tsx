import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  type ViewStyle,
  type ViewProps,
} from 'react-native';
import { colors } from '@digifemmes/tokens';
import { mobileSpacing, mobileFontSize, mobileRadius } from '../tokens';

/* -------------------------------------------------------------------------- */
/*  Types                                                                      */
/* -------------------------------------------------------------------------- */

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps extends Omit<ViewProps, 'children'> {
  /** Alert type */
  variant?: AlertVariant;
  /** Optional bold title */
  title?: string;
  /** Alert body content */
  children: React.ReactNode;
  /** Show close button */
  closeable?: boolean;
  /** Called when the close button is pressed */
  onClose?: () => void;
}

/* -------------------------------------------------------------------------- */
/*  Variant map                                                                */
/* -------------------------------------------------------------------------- */

const variantMap: Record<AlertVariant, { bg: string; border: string; iconColor: string; iconPath: string }> = {
  info: {
    bg: '#E1F5FE',
    border: colors.blue[500],
    iconColor: colors.blue[500],
    iconPath: 'info',
  },
  success: {
    bg: '#E8F5E9',
    border: colors.green[500],
    iconColor: colors.green[500],
    iconPath: 'check',
  },
  warning: {
    bg: '#FFF8E1',
    border: colors.yellow[500],
    iconColor: '#E65100',
    iconPath: 'warn',
  },
  error: {
    bg: '#FEE2E2',
    border: '#DC2626',
    iconColor: '#DC2626',
    iconPath: 'error',
  },
};

/** Simple text-based icons (no SVG dependency needed) */
const iconText: Record<string, string> = {
  info: '\u24D8',       // circled i
  check: '\u2713',      // check mark
  warn: '\u26A0',       // warning sign
  error: '\u2716',      // heavy multiplication x
};

/* -------------------------------------------------------------------------- */
/*  Component                                                                  */
/* -------------------------------------------------------------------------- */

export const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  children,
  closeable = false,
  onClose,
  style,
  ...rest
}) => {
  const v = variantMap[variant];

  const containerStyle: ViewStyle = {
    backgroundColor: v.bg,
    borderLeftWidth: 4,
    borderLeftColor: v.border,
    borderRadius: mobileRadius.md,
  };

  return (
    <View
      style={[styles.container, containerStyle, style as ViewStyle]}
      accessibilityRole="alert"
      {...rest}
    >
      {/* Icon */}
      <Text style={[styles.icon, { color: v.iconColor }]}>
        {iconText[v.iconPath]}
      </Text>

      {/* Content */}
      <View style={styles.content}>
        {title && <Text style={styles.title}>{title}</Text>}
        {typeof children === 'string' ? (
          <Text style={styles.body}>{children}</Text>
        ) : (
          children
        )}
      </View>

      {/* Close button */}
      {closeable && (
        <Pressable
          onPress={onClose}
          style={styles.closeBtn}
          accessibilityRole="button"
          accessibilityLabel="Fermer l'alerte"
          hitSlop={8}
        >
          <Text style={styles.closeText}>{'\u00D7'}</Text>
        </Pressable>
      )}
    </View>
  );
};

Alert.displayName = 'Alert';

/* -------------------------------------------------------------------------- */
/*  Styles                                                                     */
/* -------------------------------------------------------------------------- */

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: mobileSpacing[3],
    paddingVertical: mobileSpacing[3],
    paddingHorizontal: mobileSpacing[4],
  },
  icon: {
    fontSize: 18,
    marginTop: 1,
  },
  content: {
    flex: 1,
  },
  title: {
    fontFamily: 'RedHatDisplay',
    fontWeight: '600',
    fontSize: mobileFontSize.sm,
    color: colors.neutral[900],
    marginBottom: mobileSpacing[1],
  },
  body: {
    fontFamily: 'RedHatDisplay',
    fontSize: mobileFontSize.sm,
    lineHeight: 20,
    color: colors.neutral[900],
  },
  closeBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 20,
    height: 20,
  },
  closeText: {
    fontSize: 18,
    color: colors.neutral[600],
    lineHeight: 20,
  },
});

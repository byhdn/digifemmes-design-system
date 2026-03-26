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

export type TagVariant = 'primary' | 'secondary' | 'accent' | 'navy' | 'green' | 'default';

export interface TagProps extends Omit<ViewProps, 'children'> {
  /** Brand color variant */
  variant?: TagVariant;
  /** Show a remove (X) button */
  removable?: boolean;
  /** Called when the remove button is pressed */
  onRemove?: () => void;
  /** Tag content */
  children: string;
}

/* -------------------------------------------------------------------------- */
/*  Variant colors                                                             */
/* -------------------------------------------------------------------------- */

const variantColors: Record<TagVariant, { bg: string; color: string; border: string }> = {
  primary: {
    bg: colors.orange[50],
    color: colors.orange[500],
    border: colors.orange[500],
  },
  secondary: {
    bg: '#E1F5FE',
    color: colors.blue[500],
    border: colors.blue[500],
  },
  accent: {
    bg: '#FFF8E1',
    color: '#E65100',
    border: colors.yellow[500],
  },
  navy: {
    bg: '#E8EAF6',
    color: colors.navy[500],
    border: colors.navy[500],
  },
  green: {
    bg: '#E8F5E9',
    color: colors.green[500],
    border: colors.green[500],
  },
  default: {
    bg: colors.neutral[100],
    color: colors.neutral[900],
    border: colors.neutral[300],
  },
};

/* -------------------------------------------------------------------------- */
/*  Component                                                                  */
/* -------------------------------------------------------------------------- */

export const Tag: React.FC<TagProps> = ({
  variant = 'default',
  removable = false,
  onRemove,
  children,
  style,
  ...rest
}) => {
  const vc = variantColors[variant];

  const containerStyle: ViewStyle = {
    backgroundColor: vc.bg,
    borderColor: vc.border,
    borderWidth: 1,
    borderRadius: mobileRadius.full,
  };

  return (
    <View
      style={[styles.base, containerStyle, style as ViewStyle]}
      accessibilityRole="text"
      {...rest}
    >
      <Text style={[styles.label, { color: vc.color }]}>{children}</Text>
      {removable && (
        <Pressable
          onPress={onRemove}
          style={styles.removeBtn}
          accessibilityRole="button"
          accessibilityLabel="Supprimer le tag"
          hitSlop={4}
        >
          <Text style={[styles.removeText, { color: vc.color }]}>{'\u00D7'}</Text>
        </Pressable>
      )}
    </View>
  );
};

Tag.displayName = 'Tag';

/* -------------------------------------------------------------------------- */
/*  Styles                                                                     */
/* -------------------------------------------------------------------------- */

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: mobileSpacing[1],
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  label: {
    fontFamily: 'RedHatDisplay',
    fontSize: mobileFontSize.sm - 1,
    fontWeight: '500',
    lineHeight: 18,
  },
  removeBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 16,
    height: 16,
    borderRadius: mobileRadius.full,
  },
  removeText: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: '600',
  },
});

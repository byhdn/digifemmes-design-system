import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  type ViewStyle,
  type ViewProps,
} from 'react-native';
import { colors } from '@digifemmes/tokens';
import { mobileFontSize } from '../tokens';

/* -------------------------------------------------------------------------- */
/*  Types                                                                      */
/* -------------------------------------------------------------------------- */

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps extends Omit<ViewProps, 'children'> {
  /** Image source URI */
  src?: string;
  /** Alt text / accessibility label */
  alt?: string;
  /** Avatar size */
  size?: AvatarSize;
  /** Fallback text — first letters will be shown as initials */
  fallback?: string;
}

/* -------------------------------------------------------------------------- */
/*  Size presets                                                                */
/* -------------------------------------------------------------------------- */

const sizePx: Record<AvatarSize, number> = {
  sm: 32,
  md: 40,
  lg: 48,
  xl: 64,
};

const fontSizeMap: Record<AvatarSize, number> = {
  sm: mobileFontSize.xs,
  md: mobileFontSize.sm,
  lg: mobileFontSize.lg,
  xl: mobileFontSize['2xl'],
};

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                  */
/* -------------------------------------------------------------------------- */

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = 'md',
  fallback,
  style,
  ...rest
}) => {
  const [imgError, setImgError] = useState(false);
  const dim = sizePx[size];
  const showImage = !!src && !imgError;
  const initials = fallback ? getInitials(fallback) : '?';

  const containerStyle: ViewStyle = {
    width: dim,
    height: dim,
    borderRadius: dim / 2,
    backgroundColor: showImage ? colors.neutral[100] : colors.orange[500],
    overflow: 'hidden',
  };

  return (
    <View
      style={[styles.base, containerStyle, style as ViewStyle]}
      accessibilityRole="image"
      accessibilityLabel={alt || fallback || 'Avatar'}
      {...rest}
    >
      {showImage ? (
        <Image
          source={{ uri: src }}
          onError={() => setImgError(true)}
          style={styles.image}
          accessibilityLabel={alt || fallback || 'Avatar'}
        />
      ) : (
        <Text
          style={[
            styles.initials,
            { fontSize: fontSizeMap[size] },
          ]}
        >
          {initials}
        </Text>
      )}
    </View>
  );
};

Avatar.displayName = 'Avatar';

/* -------------------------------------------------------------------------- */
/*  Styles                                                                     */
/* -------------------------------------------------------------------------- */

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  initials: {
    fontFamily: 'RedHatDisplay',
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

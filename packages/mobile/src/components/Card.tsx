import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  type ViewStyle,
  type ViewProps,
} from 'react-native';
import { colors } from '@digifemmes/tokens';
import { mobileSpacing, mobileFontSize, mobileRadius } from '../tokens';

/* -------------------------------------------------------------------------- */
/*  Types                                                                      */
/* -------------------------------------------------------------------------- */

export type CardVariant = 'elevated' | 'outlined' | 'ghost';

export interface CardProps extends ViewProps {
  /** Visual variant */
  variant?: CardVariant;
  /** Children */
  children?: React.ReactNode;
}

export interface CardHeaderProps extends ViewProps {
  children?: React.ReactNode;
}

export interface CardBodyProps extends ViewProps {
  children?: React.ReactNode;
}

export interface CardFooterProps extends ViewProps {
  children?: React.ReactNode;
}

/* -------------------------------------------------------------------------- */
/*  Variant styles                                                             */
/* -------------------------------------------------------------------------- */

const variantMap: Record<CardVariant, ViewStyle> = {
  elevated: {
    backgroundColor: colors.neutral[0],
    borderWidth: 0,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  outlined: {
    backgroundColor: colors.neutral[0],
    borderWidth: 1.5,
    borderColor: colors.neutral[400],
  },
  ghost: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
};

/* -------------------------------------------------------------------------- */
/*  Sub-components                                                             */
/* -------------------------------------------------------------------------- */

const CardHeader: React.FC<CardHeaderProps> = ({ children, style, ...rest }) => (
  <View style={[styles.header, style]} {...rest}>
    {typeof children === 'string' ? (
      <Text style={styles.headerText}>{children}</Text>
    ) : (
      children
    )}
  </View>
);
CardHeader.displayName = 'Card.Header';

const CardBody: React.FC<CardBodyProps> = ({ children, style, ...rest }) => (
  <View style={[styles.body, style]} {...rest}>
    {typeof children === 'string' ? (
      <Text style={styles.bodyText}>{children}</Text>
    ) : (
      children
    )}
  </View>
);
CardBody.displayName = 'Card.Body';

const CardFooter: React.FC<CardFooterProps> = ({ children, style, ...rest }) => (
  <View style={[styles.footer, style]} {...rest}>
    {children}
  </View>
);
CardFooter.displayName = 'Card.Footer';

/* -------------------------------------------------------------------------- */
/*  Main Card                                                                  */
/* -------------------------------------------------------------------------- */

const CardRoot: React.FC<CardProps> = ({
  variant = 'elevated',
  children,
  style,
  ...rest
}) => (
  <View
    style={[styles.base, variantMap[variant], style]}
    {...rest}
  >
    {children}
  </View>
);
CardRoot.displayName = 'Card';

/* -------------------------------------------------------------------------- */
/*  Compound export                                                            */
/* -------------------------------------------------------------------------- */

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
});

/* -------------------------------------------------------------------------- */
/*  Styles                                                                     */
/* -------------------------------------------------------------------------- */

const styles = StyleSheet.create({
  base: {
    borderRadius: mobileRadius.lg,
    overflow: 'hidden',
  },
  header: {
    paddingTop: mobileSpacing[4],
    paddingHorizontal: mobileSpacing[4],
    paddingBottom: mobileSpacing[2],
  },
  headerText: {
    fontFamily: 'ClashDisplay',
    fontWeight: '600',
    fontSize: mobileFontSize.lg,
    color: colors.neutral[900],
  },
  body: {
    paddingVertical: mobileSpacing[2],
    paddingHorizontal: mobileSpacing[4],
  },
  bodyText: {
    fontFamily: 'RedHatDisplay',
    fontSize: mobileFontSize.base - 1,
    lineHeight: 24,
    color: colors.neutral[900],
  },
  footer: {
    paddingBottom: mobileSpacing[4],
    paddingHorizontal: mobileSpacing[4],
    paddingTop: mobileSpacing[2],
    flexDirection: 'row',
    alignItems: 'center',
    gap: mobileSpacing[2],
  },
});

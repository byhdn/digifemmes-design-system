import React from 'react';

export interface BadgeProps {
  /** Visual variant */
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  /** Badge size */
  size?: 'sm' | 'md';
  /** Badge content */
  children: React.ReactNode;
  /** Additional CSS class */
  className?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
}

const variantColors: Record<
  NonNullable<BadgeProps['variant']>,
  { bg: string; color: string; border: string }
> = {
  default: {
    bg: 'var(--df-color-surface-muted)',
    color: 'var(--df-color-text-default)',
    border: 'var(--df-color-border-default)',
  },
  success: {
    bg: '#E8F5E9',
    color: 'var(--df-color-green)',
    border: 'var(--df-color-green)',
  },
  warning: {
    bg: '#FFF8E1',
    color: '#E65100',
    border: 'var(--df-color-brand-accent)',
  },
  error: {
    bg: '#FEE2E2',
    color: 'var(--df-color-error)',
    border: 'var(--df-color-error)',
  },
  info: {
    bg: '#E1F5FE',
    color: 'var(--df-color-brand-secondary)',
    border: 'var(--df-color-brand-secondary)',
  },
};

const sizeStyles: Record<
  NonNullable<BadgeProps['size']>,
  { padding: string; fontSize: string }
> = {
  sm: {
    padding: '0.125rem 0.5rem',
    fontSize: '0.6875rem',
  },
  md: {
    padding: '0.25rem 0.625rem',
    fontSize: '0.75rem',
  },
};

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'default', size = 'md', children, className, style }, ref) => {
    const vc = variantColors[variant];
    const ss = sizeStyles[size];

    const combinedStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--df-font-body)',
      fontWeight: 600,
      lineHeight: 1,
      whiteSpace: 'nowrap',
      borderRadius: 'var(--df-radius-full)',
      backgroundColor: vc.bg,
      color: vc.color,
      border: `1px solid ${vc.border}`,
      padding: ss.padding,
      fontSize: ss.fontSize,
      ...style,
    };

    return (
      <span ref={ref} className={className} style={combinedStyle}>
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

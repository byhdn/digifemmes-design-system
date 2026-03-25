import React from 'react';
import { Spinner } from '../Spinner';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  /** Show loading spinner and disable interaction */
  loading?: boolean;
  /** Render as an anchor element when href is provided */
  href?: string;
  /** Anchor target (only used when href is provided) */
  target?: string;
  /** Anchor rel (only used when href is provided) */
  rel?: string;
}

const sizeStyles: Record<
  NonNullable<ButtonProps['size']>,
  React.CSSProperties
> = {
  sm: {
    padding: 'var(--df-space-1) var(--df-space-3)',
    fontSize: '0.8125rem',
    borderRadius: 'var(--df-radius-md)',
    gap: 'var(--df-space-1)',
    height: '2rem',
  },
  md: {
    padding: 'var(--df-space-2) var(--df-space-4)',
    fontSize: '0.875rem',
    borderRadius: 'var(--df-radius-md)',
    gap: 'var(--df-space-2)',
    height: '2.5rem',
  },
  lg: {
    padding: 'var(--df-space-3) var(--df-space-6)',
    fontSize: '1rem',
    borderRadius: 'var(--df-radius-lg)',
    gap: 'var(--df-space-2)',
    height: '3rem',
  },
};

const variantStyles: Record<
  NonNullable<ButtonProps['variant']>,
  React.CSSProperties
> = {
  primary: {
    backgroundColor: 'var(--df-color-brand-primary)',
    color: 'var(--df-color-text-inverse)',
    border: 'none',
  },
  secondary: {
    backgroundColor: 'transparent',
    color: 'var(--df-color-brand-primary)',
    border: '1.5px solid var(--df-color-brand-primary)',
  },
  ghost: {
    backgroundColor: 'transparent',
    color: 'var(--df-color-text-default)',
    border: '1.5px solid transparent',
  },
  danger: {
    backgroundColor: 'var(--df-color-error)',
    color: 'var(--df-color-text-inverse)',
    border: 'none',
  },
};

const baseStyles: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: 'var(--df-font-body)',
  fontWeight: 600,
  lineHeight: 1,
  cursor: 'pointer',
  transition: 'var(--df-transition-fast)',
  transitionProperty: 'background-color, color, border-color, box-shadow, opacity',
  userSelect: 'none',
  whiteSpace: 'nowrap',
  textDecoration: 'none',
};

const disabledStyles: React.CSSProperties = {
  opacity: 0.5,
  cursor: 'not-allowed',
  pointerEvents: 'none',
};

export const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled = false,
      href,
      target,
      rel,
      type = 'button',
      className,
      style,
      children,
      onClick,
      onMouseEnter,
      onMouseLeave,
      ...rest
    },
    ref
  ) => {
    const [hovered, setHovered] = React.useState(false);
    const isDisabled = disabled || loading;

    const combinedStyle: React.CSSProperties = {
      ...baseStyles,
      ...variantStyles[variant],
      ...sizeStyles[size],
      ...(isDisabled ? disabledStyles : {}),
      ...(hovered && !isDisabled
        ? {
            opacity: 0.85,
            boxShadow: 'var(--df-shadow-sm)',
          }
        : {}),
      ...style,
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement & HTMLAnchorElement>) => {
      setHovered(true);
      onMouseEnter?.(e as React.MouseEvent<HTMLButtonElement>);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement & HTMLAnchorElement>) => {
      setHovered(false);
      onMouseLeave?.(e as React.MouseEvent<HTMLButtonElement>);
    };

    const content = (
      <>
        {loading && (
          <Spinner
            size="sm"
            color={
              variant === 'secondary' || variant === 'ghost'
                ? 'var(--df-color-brand-primary)'
                : 'currentColor'
            }
          />
        )}
        {children}
      </>
    );

    if (href && !isDisabled) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          target={target}
          rel={target === '_blank' ? rel || 'noopener noreferrer' : rel}
          className={className}
          style={combinedStyle}
          role="button"
          onMouseEnter={handleMouseEnter as React.MouseEventHandler<HTMLAnchorElement>}
          onMouseLeave={handleMouseLeave as React.MouseEventHandler<HTMLAnchorElement>}
          onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type}
        disabled={isDisabled}
        className={className}
        style={combinedStyle}
        aria-busy={loading}
        aria-disabled={isDisabled}
        onMouseEnter={handleMouseEnter as React.MouseEventHandler<HTMLButtonElement>}
        onMouseLeave={handleMouseLeave as React.MouseEventHandler<HTMLButtonElement>}
        onClick={onClick}
        {...rest}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';

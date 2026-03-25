import React from 'react';

export interface TagProps {
  /** Brand color variant */
  variant?: 'primary' | 'secondary' | 'accent' | 'navy' | 'green' | 'default';
  /** Show a remove (X) button */
  removable?: boolean;
  /** Called when the remove button is clicked */
  onRemove?: () => void;
  /** Tag content */
  children: React.ReactNode;
  /** Additional CSS class */
  className?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
}

const variantColors: Record<
  NonNullable<TagProps['variant']>,
  { bg: string; color: string; border: string }
> = {
  primary: {
    bg: '#FFF3E0',
    color: 'var(--df-color-brand-primary)',
    border: 'var(--df-color-brand-primary)',
  },
  secondary: {
    bg: '#E1F5FE',
    color: 'var(--df-color-brand-secondary)',
    border: 'var(--df-color-brand-secondary)',
  },
  accent: {
    bg: '#FFF8E1',
    color: '#E65100',
    border: 'var(--df-color-brand-accent)',
  },
  navy: {
    bg: '#E8EAF6',
    color: 'var(--df-color-navy)',
    border: 'var(--df-color-navy)',
  },
  green: {
    bg: '#E8F5E9',
    color: 'var(--df-color-green)',
    border: 'var(--df-color-green)',
  },
  default: {
    bg: 'var(--df-color-surface-muted)',
    color: 'var(--df-color-text-default)',
    border: 'var(--df-color-border-default)',
  },
};

export const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  (
    {
      variant = 'default',
      removable = false,
      onRemove,
      children,
      className,
      style,
    },
    ref
  ) => {
    const vc = variantColors[variant];

    const containerStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--df-space-1)',
      padding: '0.1875rem 0.625rem',
      borderRadius: 'var(--df-radius-full)',
      fontFamily: 'var(--df-font-body)',
      fontSize: '0.8125rem',
      fontWeight: 500,
      lineHeight: 1.4,
      backgroundColor: vc.bg,
      color: vc.color,
      border: `1px solid ${vc.border}`,
      whiteSpace: 'nowrap',
      ...style,
    };

    const removeButtonStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '1rem',
      height: '1rem',
      padding: 0,
      border: 'none',
      background: 'none',
      color: 'inherit',
      cursor: 'pointer',
      borderRadius: 'var(--df-radius-full)',
      opacity: 0.7,
      transition: 'var(--df-transition-fast)',
      fontSize: '0.875rem',
      lineHeight: 1,
      flexShrink: 0,
    };

    return (
      <span ref={ref} className={className} style={containerStyle}>
        {children}
        {removable && (
          <button
            type="button"
            onClick={onRemove}
            aria-label="Remove tag"
            style={removeButtonStyle}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.opacity = '1';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.opacity = '0.7';
            }}
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M1 1L9 9M9 1L1 9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        )}
      </span>
    );
  }
);

Tag.displayName = 'Tag';

import React from 'react';

export interface ProgressProps {
  /** Current progress value (0-100) */
  value: number;
  /** Color variant */
  variant?: 'primary' | 'secondary' | 'success';
  /** Bar height */
  size?: 'sm' | 'md' | 'lg';
  /** Show percentage label */
  showLabel?: boolean;
  /** Additional CSS class */
  className?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
}

const variantColor: Record<NonNullable<ProgressProps['variant']>, string> = {
  primary: 'var(--df-color-brand-primary)',
  secondary: 'var(--df-color-brand-secondary)',
  success: 'var(--df-color-green)',
};

const sizeHeight: Record<NonNullable<ProgressProps['size']>, string> = {
  sm: '0.25rem',
  md: '0.5rem',
  lg: '0.75rem',
};

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      value,
      variant = 'primary',
      size = 'md',
      showLabel = false,
      className,
      style,
    },
    ref
  ) => {
    const clamped = Math.max(0, Math.min(100, value));
    const h = sizeHeight[size];
    const color = variantColor[variant];

    const wrapperStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--df-space-2)',
      width: '100%',
      ...style,
    };

    const trackStyle: React.CSSProperties = {
      flex: 1,
      height: h,
      borderRadius: 'var(--df-radius-full)',
      backgroundColor: 'var(--df-color-surface-muted)',
      overflow: 'hidden',
    };

    const barStyle: React.CSSProperties = {
      width: `${clamped}%`,
      height: '100%',
      borderRadius: 'var(--df-radius-full)',
      backgroundColor: color,
      transition: 'width var(--df-transition-normal)',
    };

    return (
      <div
        ref={ref}
        className={className}
        style={wrapperStyle}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${clamped}% complete`}
      >
        <div style={trackStyle}>
          <div style={barStyle} />
        </div>
        {showLabel && (
          <span
            style={{
              fontFamily: 'var(--df-font-body)',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: 'var(--df-color-text-subtle)',
              minWidth: '2.5rem',
              textAlign: 'right',
              flexShrink: 0,
            }}
          >
            {Math.round(clamped)}%
          </span>
        )}
      </div>
    );
  }
);

Progress.displayName = 'Progress';

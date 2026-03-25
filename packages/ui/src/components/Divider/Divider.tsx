import React from 'react';

export interface DividerProps {
  /** Orientation of the divider */
  orientation?: 'horizontal' | 'vertical';
  /** Optional label text displayed in the middle */
  label?: string;
  /** Additional CSS class */
  className?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
}

export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ orientation = 'horizontal', label, className, style }, ref) => {
    const isVertical = orientation === 'vertical';

    if (isVertical) {
      return (
        <div
          ref={ref}
          role="separator"
          aria-orientation="vertical"
          className={className}
          style={{
            width: '1px',
            alignSelf: 'stretch',
            backgroundColor: 'var(--df-color-border-default)',
            flexShrink: 0,
            ...style,
          }}
        />
      );
    }

    if (label) {
      return (
        <div
          ref={ref}
          role="separator"
          aria-orientation="horizontal"
          className={className}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--df-space-3)',
            width: '100%',
            ...style,
          }}
        >
          <span
            style={{
              flex: 1,
              height: '1px',
              backgroundColor: 'var(--df-color-border-default)',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--df-font-body)',
              fontSize: '0.75rem',
              fontWeight: 500,
              color: 'var(--df-color-text-subtle)',
              whiteSpace: 'nowrap',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {label}
          </span>
          <span
            style={{
              flex: 1,
              height: '1px',
              backgroundColor: 'var(--df-color-border-default)',
            }}
          />
        </div>
      );
    }

    return (
      <hr
        ref={ref as React.Ref<HTMLHRElement>}
        role="separator"
        aria-orientation="horizontal"
        className={className}
        style={{
          width: '100%',
          height: '1px',
          border: 'none',
          backgroundColor: 'var(--df-color-border-default)',
          ...style,
        }}
      />
    );
  }
);

Divider.displayName = 'Divider';

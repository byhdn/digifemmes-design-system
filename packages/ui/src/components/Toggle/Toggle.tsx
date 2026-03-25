import React from 'react';

export interface ToggleProps {
  /** Whether the toggle is on */
  checked?: boolean;
  /** Called when the toggle value changes */
  onChange?: (checked: boolean) => void;
  /** Disable interaction */
  disabled?: boolean;
  /** Toggle size */
  size?: 'sm' | 'md' | 'lg';
  /** Accessible label */
  label?: string;
  /** Additional CSS class */
  className?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
  /** Input id */
  id?: string;
}

const sizeMap: Record<
  NonNullable<ToggleProps['size']>,
  { track: { w: string; h: string }; thumb: string; offset: string }
> = {
  sm: {
    track: { w: '2rem', h: '1.125rem' },
    thumb: '0.875rem',
    offset: '0.9375rem',
  },
  md: {
    track: { w: '2.75rem', h: '1.5rem' },
    thumb: '1.125rem',
    offset: '1.3125rem',
  },
  lg: {
    track: { w: '3.25rem', h: '1.75rem' },
    thumb: '1.375rem',
    offset: '1.5625rem',
  },
};

export const Toggle = React.forwardRef<HTMLInputElement, ToggleProps>(
  (
    {
      checked = false,
      onChange,
      disabled = false,
      size = 'md',
      label,
      className,
      style,
      id,
    },
    ref
  ) => {
    const toggleId = id || React.useId();
    const dims = sizeMap[size];

    const wrapperStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--df-space-2)',
      opacity: disabled ? 0.5 : 1,
      cursor: disabled ? 'not-allowed' : 'pointer',
      ...style,
    };

    const trackStyle: React.CSSProperties = {
      position: 'relative',
      width: dims.track.w,
      height: dims.track.h,
      borderRadius: 'var(--df-radius-full)',
      backgroundColor: checked
        ? 'var(--df-color-brand-primary)'
        : 'var(--df-color-border-strong)',
      transition: 'var(--df-transition-fast)',
      transitionProperty: 'background-color',
      flexShrink: 0,
    };

    const thumbStyle: React.CSSProperties = {
      position: 'absolute',
      top: '50%',
      left: checked ? dims.offset : '0.1875rem',
      transform: 'translateY(-50%)',
      width: dims.thumb,
      height: dims.thumb,
      borderRadius: 'var(--df-radius-full)',
      backgroundColor: '#FFFFFF',
      boxShadow: 'var(--df-shadow-sm)',
      transition: 'var(--df-transition-fast)',
      transitionProperty: 'left',
    };

    const hiddenInputStyle: React.CSSProperties = {
      position: 'absolute',
      width: 1,
      height: 1,
      padding: 0,
      margin: -1,
      overflow: 'hidden',
      clip: 'rect(0, 0, 0, 0)',
      whiteSpace: 'nowrap',
      borderWidth: 0,
    };

    return (
      <label htmlFor={toggleId} className={className} style={wrapperStyle}>
        <input
          ref={ref}
          id={toggleId}
          type="checkbox"
          role="switch"
          aria-checked={checked}
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.checked)}
          style={hiddenInputStyle}
        />
        <span style={trackStyle} aria-hidden="true">
          <span style={thumbStyle} />
        </span>
        {label && (
          <span
            style={{
              fontFamily: 'var(--df-font-body)',
              fontSize: '0.875rem',
              color: 'var(--df-color-text-default)',
              userSelect: 'none',
            }}
          >
            {label}
          </span>
        )}
      </label>
    );
  }
);

Toggle.displayName = 'Toggle';

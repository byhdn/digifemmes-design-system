import React from 'react';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Label displayed above the input */
  label?: string;
  /** Error message — triggers error styling */
  error?: string;
  /** Helper text shown below the input */
  helperText?: string;
  /** Input size */
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap: Record<
  NonNullable<InputProps['size']>,
  { height: string; fontSize: string; padding: string }
> = {
  sm: {
    height: '2rem',
    fontSize: '0.8125rem',
    padding: 'var(--df-space-1) var(--df-space-2)',
  },
  md: {
    height: '2.5rem',
    fontSize: '0.875rem',
    padding: 'var(--df-space-2) var(--df-space-3)',
  },
  lg: {
    height: '3rem',
    fontSize: '1rem',
    padding: 'var(--df-space-3) var(--df-space-4)',
  },
};

const wrapperStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--df-space-1)',
  width: '100%',
};

const labelBaseStyle: React.CSSProperties = {
  fontFamily: 'var(--df-font-body)',
  fontSize: '0.875rem',
  fontWeight: 500,
  color: 'var(--df-color-text-default)',
};

const inputBaseStyle: React.CSSProperties = {
  width: '100%',
  fontFamily: 'var(--df-font-body)',
  color: 'var(--df-color-text-default)',
  backgroundColor: 'var(--df-color-surface-default)',
  border: '1.5px solid var(--df-color-border-default)',
  borderRadius: 'var(--df-radius-md)',
  outline: 'none',
  transition: 'var(--df-transition-fast)',
  transitionProperty: 'border-color, box-shadow',
};

const helperBaseStyle: React.CSSProperties = {
  fontFamily: 'var(--df-font-body)',
  fontSize: '0.75rem',
  margin: 0,
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      size = 'md',
      disabled = false,
      required = false,
      id,
      className,
      style,
      ...rest
    },
    ref
  ) => {
    const inputId = id || React.useId();
    const errorId = error ? `${inputId}-error` : undefined;
    const helperId = helperText && !error ? `${inputId}-helper` : undefined;
    const describedBy = errorId || helperId || undefined;

    const sizeS = sizeMap[size];

    const inputStyle: React.CSSProperties = {
      ...inputBaseStyle,
      height: sizeS.height,
      fontSize: sizeS.fontSize,
      padding: sizeS.padding,
      ...(error
        ? {
            borderColor: 'var(--df-color-error)',
            boxShadow: '0 0 0 1px var(--df-color-error)',
          }
        : {}),
      ...(disabled
        ? {
            opacity: 0.5,
            cursor: 'not-allowed',
            backgroundColor: 'var(--df-color-surface-muted)',
          }
        : {}),
    };

    return (
      <div className={className} style={{ ...wrapperStyle, ...style }}>
        {label && (
          <label htmlFor={inputId} style={labelBaseStyle}>
            {label}
            {required && (
              <span
                style={{ color: 'var(--df-color-error)', marginLeft: '0.25em' }}
                aria-hidden="true"
              >
                *
              </span>
            )}
          </label>
        )}

        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          required={required}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          style={inputStyle}
          {...rest}
        />

        {error && (
          <p
            id={errorId}
            role="alert"
            style={{
              ...helperBaseStyle,
              color: 'var(--df-color-error)',
            }}
          >
            {error}
          </p>
        )}

        {helperText && !error && (
          <p
            id={helperId}
            style={{
              ...helperBaseStyle,
              color: 'var(--df-color-text-subtle)',
            }}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

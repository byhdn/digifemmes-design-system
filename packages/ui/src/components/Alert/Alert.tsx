import React from 'react';

export interface AlertProps {
  /** Alert type */
  variant?: 'info' | 'success' | 'warning' | 'error';
  /** Optional bold title */
  title?: string;
  /** Alert body content */
  children: React.ReactNode;
  /** Show close button */
  closeable?: boolean;
  /** Called when the close button is clicked */
  onClose?: () => void;
  /** Additional CSS class */
  className?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
}

const variantMap: Record<
  NonNullable<AlertProps['variant']>,
  { bg: string; border: string; icon: string; iconColor: string }
> = {
  info: {
    bg: '#E1F5FE',
    border: 'var(--df-color-brand-secondary)',
    iconColor: 'var(--df-color-brand-secondary)',
    icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z',
  },
  success: {
    bg: '#E8F5E9',
    border: 'var(--df-color-green)',
    iconColor: 'var(--df-color-green)',
    icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
  },
  warning: {
    bg: '#FFF8E1',
    border: 'var(--df-color-brand-accent)',
    iconColor: '#E65100',
    icon: 'M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z',
  },
  error: {
    bg: '#FEE2E2',
    border: 'var(--df-color-error)',
    iconColor: 'var(--df-color-error)',
    icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z',
  },
};

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      variant = 'info',
      title,
      children,
      closeable = false,
      onClose,
      className,
      style,
    },
    ref
  ) => {
    const v = variantMap[variant];

    const containerStyle: React.CSSProperties = {
      display: 'flex',
      gap: 'var(--df-space-3)',
      padding: 'var(--df-space-3) var(--df-space-4)',
      borderRadius: 'var(--df-radius-md)',
      backgroundColor: v.bg,
      borderLeft: `4px solid ${v.border}`,
      fontFamily: 'var(--df-font-body)',
      fontSize: '0.875rem',
      lineHeight: 1.5,
      color: 'var(--df-color-text-default)',
      ...style,
    };

    return (
      <div
        ref={ref}
        role="alert"
        className={className}
        style={containerStyle}
      >
        {/* Icon */}
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill={v.iconColor}
          aria-hidden="true"
          style={{ flexShrink: 0, marginTop: '0.125rem' }}
        >
          <path d={v.icon} />
        </svg>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {title && (
            <div
              style={{
                fontWeight: 600,
                marginBottom: 'var(--df-space-1)',
                fontSize: '0.875rem',
              }}
            >
              {title}
            </div>
          )}
          <div>{children}</div>
        </div>

        {/* Close button */}
        {closeable && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close alert"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '1.25rem',
              height: '1.25rem',
              padding: 0,
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              color: 'var(--df-color-text-subtle)',
              borderRadius: 'var(--df-radius-sm)',
              flexShrink: 0,
              transition: 'var(--df-transition-fast)',
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M1 1L13 13M13 1L1 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = 'Alert';

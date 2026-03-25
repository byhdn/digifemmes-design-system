import React from 'react';

export interface SpinnerProps {
  /** Spinner diameter */
  size?: 'sm' | 'md' | 'lg';
  /** Custom color — defaults to brand primary */
  color?: string;
  /** Additional CSS class */
  className?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
}

const sizePx: Record<NonNullable<SpinnerProps['size']>, string> = {
  sm: '1rem',
  md: '1.5rem',
  lg: '2.5rem',
};

const borderWidth: Record<NonNullable<SpinnerProps['size']>, string> = {
  sm: '2px',
  md: '2.5px',
  lg: '3px',
};

const keyframesId = 'df-spinner-rotate';
const keyframesCSS = `@keyframes ${keyframesId}{to{transform:rotate(360deg)}}`;

let injected = false;
function injectKeyframes() {
  if (injected || typeof document === 'undefined') return;
  const style = document.createElement('style');
  style.textContent = keyframesCSS;
  document.head.appendChild(style);
  injected = true;
}

export const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ size = 'md', color, className, style }, ref) => {
    React.useEffect(() => {
      injectKeyframes();
    }, []);

    const dim = sizePx[size];
    const bw = borderWidth[size];

    const combinedStyle: React.CSSProperties = {
      display: 'inline-block',
      width: dim,
      height: dim,
      border: `${bw} solid var(--df-color-border-default)`,
      borderTopColor: color || 'var(--df-color-brand-primary)',
      borderRadius: '50%',
      animation: `${keyframesId} 0.6s linear infinite`,
      flexShrink: 0,
      ...style,
    };

    return (
      <span
        ref={ref}
        role="status"
        aria-label="Loading"
        className={className}
        style={combinedStyle}
      >
        <span style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', borderWidth: 0 }}>
          Loading...
        </span>
      </span>
    );
  }
);

Spinner.displayName = 'Spinner';

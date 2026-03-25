import React from 'react';

export interface SkeletonProps {
  /** Shape variant */
  variant?: 'text' | 'circular' | 'rectangular';
  /** Width (CSS value) */
  width?: string | number;
  /** Height (CSS value) */
  height?: string | number;
  /** Animation style */
  animation?: 'pulse' | 'wave';
  /** Additional CSS class */
  className?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
}

const pulseKeyframesId = 'df-skeleton-pulse';
const waveKeyframesId = 'df-skeleton-wave';

const keyframesCSS = `
@keyframes ${pulseKeyframesId} {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
@keyframes ${waveKeyframesId} {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
`;

let injected = false;
function injectKeyframes() {
  if (injected || typeof document === 'undefined') return;
  const el = document.createElement('style');
  el.textContent = keyframesCSS;
  document.head.appendChild(el);
  injected = true;
}

const variantDefaults: Record<
  NonNullable<SkeletonProps['variant']>,
  { width: string; height: string; borderRadius: string }
> = {
  text: {
    width: '100%',
    height: '1em',
    borderRadius: 'var(--df-radius-sm)',
  },
  circular: {
    width: '2.5rem',
    height: '2.5rem',
    borderRadius: 'var(--df-radius-full)',
  },
  rectangular: {
    width: '100%',
    height: '8rem',
    borderRadius: 'var(--df-radius-md)',
  },
};

export const Skeleton = React.forwardRef<HTMLSpanElement, SkeletonProps>(
  (
    {
      variant = 'text',
      width,
      height,
      animation = 'pulse',
      className,
      style,
    },
    ref
  ) => {
    React.useEffect(() => {
      injectKeyframes();
    }, []);

    const defaults = variantDefaults[variant];

    const w =
      width !== undefined
        ? typeof width === 'number'
          ? `${width}px`
          : width
        : defaults.width;
    const h =
      height !== undefined
        ? typeof height === 'number'
          ? `${height}px`
          : height
        : defaults.height;

    const baseStyle: React.CSSProperties = {
      display: 'block',
      width: w,
      height: h,
      borderRadius: defaults.borderRadius,
      backgroundColor: 'var(--df-color-surface-muted)',
    };

    const animStyle: React.CSSProperties =
      animation === 'pulse'
        ? {
            animation: `${pulseKeyframesId} 1.8s ease-in-out infinite`,
          }
        : {
            backgroundImage:
              'linear-gradient(90deg, var(--df-color-surface-muted) 25%, var(--df-color-border-default) 50%, var(--df-color-surface-muted) 75%)',
            backgroundSize: '200% 100%',
            animation: `${waveKeyframesId} 1.8s ease-in-out infinite`,
          };

    return (
      <span
        ref={ref}
        aria-hidden="true"
        className={className}
        style={{ ...baseStyle, ...animStyle, ...style }}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';

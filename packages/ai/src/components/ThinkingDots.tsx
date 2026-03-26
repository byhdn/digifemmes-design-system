import React from 'react';
import type { ComponentSize } from '../types';

export interface ThinkingDotsProps {
  /** Size of the dots */
  size?: ComponentSize;
  /** Dot color — defaults to DigiFemmes blue */
  color?: string;
  /** Additional inline styles on the wrapper */
  style?: React.CSSProperties;
  /** Additional CSS class */
  className?: string;
}

const dotSizes: Record<ComponentSize, number> = {
  sm: 6,
  md: 8,
  lg: 10,
};

const STYLE_ID = 'df-thinking-dots-keyframes';

function injectKeyframes() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    @keyframes dfDotBounce {
      0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
      30% { transform: translateY(-60%); opacity: 1; }
    }
  `;
  document.head.appendChild(style);
}

export const ThinkingDots = React.forwardRef<HTMLSpanElement, ThinkingDotsProps>(
  ({ size = 'md', color = '#12B8DF', style, className }, ref) => {
    React.useEffect(() => {
      injectKeyframes();
    }, []);

    const dotSize = dotSizes[size];
    const gap = Math.round(dotSize * 0.6);

    const wrapperStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      gap: `${gap}px`,
      padding: `${dotSize}px ${dotSize * 1.5}px`,
      ...style,
    };

    return (
      <span
        ref={ref}
        className={className}
        style={wrapperStyle}
        role="status"
        aria-label="Loading"
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              width: dotSize,
              height: dotSize,
              borderRadius: '50%',
              backgroundColor: color,
              display: 'inline-block',
              animation: `dfDotBounce 1.4s ease-in-out ${i * 0.16}s infinite`,
            }}
          />
        ))}
      </span>
    );
  }
);

ThinkingDots.displayName = 'ThinkingDots';

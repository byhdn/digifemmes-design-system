import React from 'react';
import type { AvatarSize, AvatarStatus } from '../types';

export interface AIAvatarProps {
  /** Avatar size */
  size?: AvatarSize;
  /** Connection/activity status */
  status?: AvatarStatus;
  /** Display name (used for initials fallback) */
  name?: string;
  /** Image URL for the avatar */
  src?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
  /** Additional CSS class */
  className?: string;
}

const sizePx: Record<AvatarSize, number> = {
  sm: 32,
  md: 44,
  lg: 56,
  xl: 72,
};

const fontSizes: Record<AvatarSize, number> = {
  sm: 12,
  md: 16,
  lg: 20,
  xl: 26,
};

const statusDotSizes: Record<AvatarSize, number> = {
  sm: 8,
  md: 10,
  lg: 12,
  xl: 14,
};

const STYLE_ID = 'df-ai-avatar-keyframes';

function injectKeyframes() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    @keyframes dfAvatarPulse {
      0%, 100% { box-shadow: 0 0 0 0 rgba(18, 184, 223, 0.4); }
      50% { box-shadow: 0 0 0 8px rgba(18, 184, 223, 0); }
    }
    @keyframes dfAvatarGlow {
      0%, 100% { box-shadow: 0 0 8px 2px rgba(255, 123, 0, 0.15), 0 0 0 0 rgba(18, 184, 223, 0.1); }
      50% { box-shadow: 0 0 14px 4px rgba(255, 123, 0, 0.25), 0 0 0 0 rgba(18, 184, 223, 0.15); }
    }
  `;
  document.head.appendChild(style);
}

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export const AIAvatar = React.forwardRef<HTMLDivElement, AIAvatarProps>(
  ({ size = 'md', status = 'online', name = 'Awa', src, style, className }, ref) => {
    React.useEffect(() => {
      injectKeyframes();
    }, []);

    const px = sizePx[size];
    const borderWidth = size === 'sm' ? 2 : 3;

    const containerStyle: React.CSSProperties = {
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: px,
      height: px,
      flexShrink: 0,
      ...style,
    };

    const avatarStyle: React.CSSProperties = {
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      background: src
        ? `url(${src}) center/cover no-repeat`
        : 'linear-gradient(135deg, #1B2B5B 0%, #12B8DF 100%)',
      border: `${borderWidth}px solid transparent`,
      backgroundClip: 'padding-box',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#FFFFFF',
      fontFamily:
        "'Montserrat', 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
      fontWeight: 700,
      fontSize: fontSizes[size],
      letterSpacing: '0.02em',
      userSelect: 'none',
      animation:
        status === 'thinking'
          ? 'dfAvatarPulse 2s ease-in-out infinite'
          : 'dfAvatarGlow 3s ease-in-out infinite',
      position: 'relative',
      overflow: 'hidden',
    };

    /* Gradient border ring via a pseudo-like wrapper */
    const ringStyle: React.CSSProperties = {
      position: 'absolute',
      inset: 0,
      borderRadius: '50%',
      padding: borderWidth,
      background: 'linear-gradient(135deg, #FF7B00, #12B8DF)',
      WebkitMask:
        'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
      WebkitMaskComposite: 'xor',
      maskComposite: 'exclude',
      pointerEvents: 'none',
    };

    const dotSize = statusDotSizes[size];
    const statusDotStyle: React.CSSProperties = {
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: dotSize,
      height: dotSize,
      borderRadius: '50%',
      border: '2px solid #FFFFFF',
      backgroundColor:
        status === 'online'
          ? '#22C55E'
          : status === 'thinking'
            ? '#12B8DF'
            : '#9CA3AF',
      zIndex: 2,
    };

    return (
      <div
        ref={ref}
        className={className}
        style={containerStyle}
        role="img"
        aria-label={`${name} - ${status}`}
      >
        <div style={ringStyle} />
        <div style={avatarStyle}>
          {!src && getInitials(name)}
        </div>
        <span style={statusDotStyle} />
      </div>
    );
  }
);

AIAvatar.displayName = 'AIAvatar';

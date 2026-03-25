import React from 'react';

export interface AvatarProps {
  /** Image source URL */
  src?: string;
  /** Alt text for the image */
  alt?: string;
  /** Avatar size */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Fallback text — first letters will be shown as initials */
  fallback?: string;
  /** Additional CSS class */
  className?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
}

const sizePx: Record<NonNullable<AvatarProps['size']>, string> = {
  sm: '2rem',
  md: '2.5rem',
  lg: '3rem',
  xl: '4rem',
};

const fontSizeMap: Record<NonNullable<AvatarProps['size']>, string> = {
  sm: '0.75rem',
  md: '0.875rem',
  lg: '1.125rem',
  xl: '1.5rem',
};

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

export const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({ src, alt, size = 'md', fallback, className, style }, ref) => {
    const [imgError, setImgError] = React.useState(false);

    const dim = sizePx[size];
    const showImage = src && !imgError;
    const initials = fallback ? getInitials(fallback) : '?';

    const containerStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: dim,
      height: dim,
      borderRadius: 'var(--df-radius-full)',
      overflow: 'hidden',
      flexShrink: 0,
      backgroundColor: showImage
        ? 'var(--df-color-surface-muted)'
        : 'var(--df-color-brand-primary)',
      color: 'var(--df-color-text-inverse)',
      fontFamily: 'var(--df-font-body)',
      fontWeight: 600,
      fontSize: fontSizeMap[size],
      userSelect: 'none',
      ...style,
    };

    return (
      <span
        ref={ref}
        role="img"
        aria-label={alt || fallback || 'Avatar'}
        className={className}
        style={containerStyle}
      >
        {showImage ? (
          <img
            src={src}
            alt={alt || fallback || 'Avatar'}
            onError={() => setImgError(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ) : (
          <span aria-hidden="true">{initials}</span>
        )}
      </span>
    );
  }
);

Avatar.displayName = 'Avatar';

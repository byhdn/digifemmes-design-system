import React from 'react';

/* -------------------------------------------------------------------------- */
/*  Card props                                                                 */
/* -------------------------------------------------------------------------- */

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Visual variant */
  variant?: 'default' | 'elevated' | 'outlined';
  /** Adds hover lift effect */
  clickable?: boolean;
}

interface SubComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

interface CardImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Image source */
  src: string;
  /** Alt text */
  alt: string;
}

/* -------------------------------------------------------------------------- */
/*  Variant styles                                                             */
/* -------------------------------------------------------------------------- */

const variantMap: Record<
  NonNullable<CardProps['variant']>,
  React.CSSProperties
> = {
  default: {
    backgroundColor: 'var(--df-color-surface-default)',
    border: '1px solid var(--df-color-border-default)',
    boxShadow: 'var(--df-shadow-sm)',
  },
  elevated: {
    backgroundColor: 'var(--df-color-surface-elevated)',
    border: '1px solid transparent',
    boxShadow: 'var(--df-shadow-md)',
  },
  outlined: {
    backgroundColor: 'var(--df-color-surface-default)',
    border: '1.5px solid var(--df-color-border-strong)',
    boxShadow: 'none',
  },
};

/* -------------------------------------------------------------------------- */
/*  Sub-components                                                             */
/* -------------------------------------------------------------------------- */

const CardHeader = React.forwardRef<HTMLDivElement, SubComponentProps>(
  ({ children, className, style, ...rest }, ref) => (
    <div
      ref={ref}
      className={className}
      style={{
        padding: 'var(--df-space-4) var(--df-space-4) var(--df-space-2)',
        fontFamily: 'var(--df-font-display)',
        fontWeight: 600,
        fontSize: '1.125rem',
        color: 'var(--df-color-text-default)',
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  )
);
CardHeader.displayName = 'Card.Header';

const CardBody = React.forwardRef<HTMLDivElement, SubComponentProps>(
  ({ children, className, style, ...rest }, ref) => (
    <div
      ref={ref}
      className={className}
      style={{
        padding: 'var(--df-space-2) var(--df-space-4)',
        fontFamily: 'var(--df-font-body)',
        fontSize: '0.9375rem',
        color: 'var(--df-color-text-default)',
        lineHeight: 1.6,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  )
);
CardBody.displayName = 'Card.Body';

const CardFooter = React.forwardRef<HTMLDivElement, SubComponentProps>(
  ({ children, className, style, ...rest }, ref) => (
    <div
      ref={ref}
      className={className}
      style={{
        padding: 'var(--df-space-2) var(--df-space-4) var(--df-space-4)',
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--df-space-2)',
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  )
);
CardFooter.displayName = 'Card.Footer';

const CardImage = React.forwardRef<HTMLImageElement, CardImageProps>(
  ({ src, alt, className, style, ...rest }, ref) => (
    <img
      ref={ref}
      src={src}
      alt={alt}
      className={className}
      style={{
        width: '100%',
        height: 'auto',
        objectFit: 'cover',
        display: 'block',
        ...style,
      }}
      {...rest}
    />
  )
);
CardImage.displayName = 'Card.Image';

/* -------------------------------------------------------------------------- */
/*  Main Card                                                                  */
/* -------------------------------------------------------------------------- */

const CardRoot = React.forwardRef<HTMLDivElement, CardProps>(
  (
    { variant = 'default', clickable = false, className, style, children, ...rest },
    ref
  ) => {
    const [hovered, setHovered] = React.useState(false);

    const combinedStyle: React.CSSProperties = {
      borderRadius: 'var(--df-radius-lg)',
      overflow: 'hidden',
      transition: 'var(--df-transition-fast)',
      transitionProperty: 'box-shadow, transform',
      ...variantMap[variant],
      ...(clickable
        ? {
            cursor: 'pointer',
          }
        : {}),
      ...(clickable && hovered
        ? {
            transform: 'translateY(-2px)',
            boxShadow: 'var(--df-shadow-lg)',
          }
        : {}),
      ...style,
    };

    return (
      <div
        ref={ref}
        className={className}
        style={combinedStyle}
        onMouseEnter={clickable ? () => setHovered(true) : undefined}
        onMouseLeave={clickable ? () => setHovered(false) : undefined}
        {...(clickable ? { role: 'button', tabIndex: 0 } : {})}
        {...rest}
      >
        {children}
      </div>
    );
  }
);
CardRoot.displayName = 'Card';

/* -------------------------------------------------------------------------- */
/*  Compound export                                                            */
/* -------------------------------------------------------------------------- */

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
  Image: CardImage,
});

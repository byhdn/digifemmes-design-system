import React from 'react';

export interface TooltipProps {
  /** Tooltip text content */
  content: string;
  /** Preferred position */
  position?: 'top' | 'bottom' | 'left' | 'right';
  /** Trigger element */
  children: React.ReactElement<React.HTMLAttributes<HTMLElement>>;
  /** Additional CSS class applied to the tooltip popup */
  className?: string;
  /** Additional inline styles applied to the tooltip popup */
  style?: React.CSSProperties;
}

const positionStyles: Record<
  NonNullable<TooltipProps['position']>,
  React.CSSProperties
> = {
  top: {
    bottom: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    marginBottom: '0.5rem',
  },
  bottom: {
    top: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    marginTop: '0.5rem',
  },
  left: {
    right: '100%',
    top: '50%',
    transform: 'translateY(-50%)',
    marginRight: '0.5rem',
  },
  right: {
    left: '100%',
    top: '50%',
    transform: 'translateY(-50%)',
    marginLeft: '0.5rem',
  },
};

const arrowStyles: Record<
  NonNullable<TooltipProps['position']>,
  React.CSSProperties
> = {
  top: {
    position: 'absolute',
    bottom: '-4px',
    left: '50%',
    transform: 'translateX(-50%) rotate(45deg)',
    width: '8px',
    height: '8px',
    backgroundColor: 'var(--df-color-text-default)',
  },
  bottom: {
    position: 'absolute',
    top: '-4px',
    left: '50%',
    transform: 'translateX(-50%) rotate(45deg)',
    width: '8px',
    height: '8px',
    backgroundColor: 'var(--df-color-text-default)',
  },
  left: {
    position: 'absolute',
    right: '-4px',
    top: '50%',
    transform: 'translateY(-50%) rotate(45deg)',
    width: '8px',
    height: '8px',
    backgroundColor: 'var(--df-color-text-default)',
  },
  right: {
    position: 'absolute',
    left: '-4px',
    top: '50%',
    transform: 'translateY(-50%) rotate(45deg)',
    width: '8px',
    height: '8px',
    backgroundColor: 'var(--df-color-text-default)',
  },
};

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  position = 'top',
  children,
  className,
  style,
}) => {
  const [visible, setVisible] = React.useState(false);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const tooltipId = React.useId();

  const show = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setVisible(true);
  };

  const hide = () => {
    timeoutRef.current = setTimeout(() => setVisible(false), 100);
  };

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const wrapperStyle: React.CSSProperties = {
    position: 'relative',
    display: 'inline-flex',
  };

  const tooltipStyle: React.CSSProperties = {
    position: 'absolute',
    zIndex: 9999,
    padding: '0.375rem 0.75rem',
    borderRadius: 'var(--df-radius-md)',
    backgroundColor: 'var(--df-color-text-default)',
    color: 'var(--df-color-text-inverse)',
    fontFamily: 'var(--df-font-body)',
    fontSize: '0.75rem',
    fontWeight: 500,
    lineHeight: 1.4,
    whiteSpace: 'nowrap',
    pointerEvents: 'none',
    opacity: visible ? 1 : 0,
    transition: 'opacity var(--df-transition-fast)',
    ...positionStyles[position],
    ...style,
  };

  return (
    <span
      style={wrapperStyle}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {React.cloneElement(children, {
        'aria-describedby': visible ? tooltipId : undefined,
      })}
      <span
        id={tooltipId}
        role="tooltip"
        className={className}
        style={tooltipStyle}
        aria-hidden={!visible}
      >
        {content}
        <span style={arrowStyles[position]} aria-hidden="true" />
      </span>
    </span>
  );
};

Tooltip.displayName = 'Tooltip';

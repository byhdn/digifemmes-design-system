import React from 'react';
import type { IconProps } from './types';

export function createIcon(name: string, path: React.ReactNode) {
  const Icon = React.forwardRef<SVGSVGElement, IconProps>(
    ({ size = 24, color = 'currentColor', ...props }, ref) => (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        {...props}
      >
        {path}
      </svg>
    ),
  );
  Icon.displayName = name;
  return Icon;
}

import type { SVGAttributes } from 'react';

export interface IconProps extends SVGAttributes<SVGElement> {
  size?: number | string;
  color?: string;
}

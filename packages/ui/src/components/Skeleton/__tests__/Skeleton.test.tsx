import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Skeleton } from '../Skeleton';

describe('Skeleton', () => {
  /* ---- Basic rendering ---- */
  it('renders without crashing', () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders as a span element', () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild!.nodeName).toBe('SPAN');
  });

  it('has displayName set to Skeleton', () => {
    expect(Skeleton.displayName).toBe('Skeleton');
  });

  /* ---- Accessibility ---- */
  it('is hidden from screen readers with aria-hidden', () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true');
  });

  /* ---- Variants ---- */
  describe('text variant (default)', () => {
    it('uses 100% width and 1em height', () => {
      const { container } = render(<Skeleton />);
      const el = container.firstChild as HTMLElement;
      expect(el.style.width).toBe('100%');
      expect(el.style.height).toBe('1em');
    });

    it('uses sm border radius', () => {
      const { container } = render(<Skeleton variant="text" />);
      const el = container.firstChild as HTMLElement;
      expect(el.style.borderRadius).toBe('var(--df-radius-sm)');
    });
  });

  describe('circular variant', () => {
    it('uses 2.5rem width and height', () => {
      const { container } = render(<Skeleton variant="circular" />);
      const el = container.firstChild as HTMLElement;
      expect(el.style.width).toBe('2.5rem');
      expect(el.style.height).toBe('2.5rem');
    });

    it('uses full border radius', () => {
      const { container } = render(<Skeleton variant="circular" />);
      const el = container.firstChild as HTMLElement;
      expect(el.style.borderRadius).toBe('var(--df-radius-full)');
    });
  });

  describe('rectangular variant', () => {
    it('uses 100% width and 8rem height', () => {
      const { container } = render(<Skeleton variant="rectangular" />);
      const el = container.firstChild as HTMLElement;
      expect(el.style.width).toBe('100%');
      expect(el.style.height).toBe('8rem');
    });

    it('uses md border radius', () => {
      const { container } = render(<Skeleton variant="rectangular" />);
      const el = container.firstChild as HTMLElement;
      expect(el.style.borderRadius).toBe('var(--df-radius-md)');
    });
  });

  /* ---- Custom dimensions ---- */
  it('accepts custom width as string', () => {
    const { container } = render(<Skeleton width="200px" />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.width).toBe('200px');
  });

  it('accepts custom width as number (converts to px)', () => {
    const { container } = render(<Skeleton width={150} />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.width).toBe('150px');
  });

  it('accepts custom height as string', () => {
    const { container } = render(<Skeleton height="3rem" />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.height).toBe('3rem');
  });

  it('accepts custom height as number (converts to px)', () => {
    const { container } = render(<Skeleton height={100} />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.height).toBe('100px');
  });

  /* ---- Animation ---- */
  it('uses pulse animation by default', () => {
    const { container } = render(<Skeleton />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.animation).toContain('df-skeleton-pulse');
  });

  it('uses wave animation when specified', () => {
    const { container } = render(<Skeleton animation="wave" />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.animation).toContain('df-skeleton-wave');
  });

  /* ---- ForwardRef ---- */
  it('forwards ref to the span element', () => {
    const ref = React.createRef<HTMLSpanElement>();
    render(<Skeleton ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  /* ---- className and style passthrough ---- */
  it('passes custom className', () => {
    const { container } = render(<Skeleton className="my-skeleton" />);
    expect(container.querySelector('.my-skeleton')).toBeInTheDocument();
  });

  it('merges custom style props', () => {
    const { container } = render(<Skeleton style={{ opacity: 0.8 }} />);
    expect((container.firstChild as HTMLElement).style.opacity).toBe('0.8');
  });
});

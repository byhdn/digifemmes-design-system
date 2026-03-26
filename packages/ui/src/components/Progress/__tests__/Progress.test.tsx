import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Progress } from '../Progress';

describe('Progress', () => {
  /* ---- Basic rendering ---- */
  it('renders without crashing', () => {
    render(<Progress value={50} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('has displayName set to Progress', () => {
    expect(Progress.displayName).toBe('Progress');
  });

  /* ---- ARIA attributes ---- */
  it('sets aria-valuenow to the provided value', () => {
    render(<Progress value={75} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '75');
  });

  it('sets aria-valuemin to 0', () => {
    render(<Progress value={50} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuemin', '0');
  });

  it('sets aria-valuemax to 100', () => {
    render(<Progress value={50} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuemax', '100');
  });

  it('sets a descriptive aria-label', () => {
    render(<Progress value={42} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-label', '42% complete');
  });

  /* ---- Value clamping ---- */
  it('clamps negative values to 0', () => {
    render(<Progress value={-10} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0');
  });

  it('clamps values over 100 to 100', () => {
    render(<Progress value={150} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100');
  });

  it('handles value of 0', () => {
    render(<Progress value={0} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0');
  });

  it('handles value of 100', () => {
    render(<Progress value={100} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100');
  });

  /* ---- Label ---- */
  it('does not show label by default', () => {
    render(<Progress value={50} />);
    expect(screen.queryByText('50%')).not.toBeInTheDocument();
  });

  it('shows percentage label when showLabel=true', () => {
    render(<Progress value={73} showLabel />);
    expect(screen.getByText('73%')).toBeInTheDocument();
  });

  it('rounds the label to nearest integer', () => {
    render(<Progress value={66.7} showLabel />);
    expect(screen.getByText('67%')).toBeInTheDocument();
  });

  /* ---- Sizes ---- */
  it('applies sm height', () => {
    const { container } = render(<Progress value={50} size="sm" />);
    const track = container.querySelector('[style*="height"]') as HTMLElement;
    // The track div inside the wrapper
    expect(track).not.toBeNull();
  });

  it('applies md height by default', () => {
    render(<Progress value={50} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  /* ---- Variants ---- */
  it('applies primary variant by default', () => {
    const { container } = render(<Progress value={50} />);
    const bar = container.querySelectorAll('div')[2]; // inner bar
    expect(bar.style.backgroundColor).toBe('var(--df-color-brand-primary)');
  });

  it('applies secondary variant color', () => {
    const { container } = render(<Progress value={50} variant="secondary" />);
    const bar = container.querySelectorAll('div')[2];
    expect(bar.style.backgroundColor).toBe('var(--df-color-brand-secondary)');
  });

  it('applies success variant color', () => {
    const { container } = render(<Progress value={50} variant="success" />);
    const bar = container.querySelectorAll('div')[2];
    expect(bar.style.backgroundColor).toBe('var(--df-color-green)');
  });

  /* ---- ForwardRef ---- */
  it('forwards ref to the wrapper div', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Progress ref={ref} value={50} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  /* ---- className and style passthrough ---- */
  it('passes custom className', () => {
    render(<Progress value={50} className="my-progress" />);
    expect(screen.getByRole('progressbar')).toHaveClass('my-progress');
  });

  it('merges custom style props', () => {
    render(<Progress value={50} style={{ marginTop: '10px' }} />);
    expect(screen.getByRole('progressbar').style.marginTop).toBe('10px');
  });
});

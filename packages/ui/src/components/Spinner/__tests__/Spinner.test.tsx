import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Spinner } from '../Spinner';

describe('Spinner', () => {
  /* ---- Basic rendering ---- */
  it('renders without crashing', () => {
    render(<Spinner />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders as a span element', () => {
    render(<Spinner />);
    expect(screen.getByRole('status').tagName).toBe('SPAN');
  });

  it('has displayName set to Spinner', () => {
    expect(Spinner.displayName).toBe('Spinner');
  });

  /* ---- Accessibility ---- */
  it('has role="status"', () => {
    render(<Spinner />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('has aria-label="Loading"', () => {
    render(<Spinner />);
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Loading');
  });

  it('contains visually hidden "Loading..." text', () => {
    render(<Spinner />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('visually hidden text is clipped', () => {
    render(<Spinner />);
    const hiddenText = screen.getByText('Loading...');
    expect(hiddenText.style.clip).toBe('rect(0px, 0px, 0px, 0px)');
    expect(hiddenText.style.overflow).toBe('hidden');
  });

  /* ---- Sizes ---- */
  it('applies sm size (1rem)', () => {
    render(<Spinner size="sm" />);
    const spinner = screen.getByRole('status');
    expect(spinner.style.width).toBe('1rem');
    expect(spinner.style.height).toBe('1rem');
  });

  it('applies md size (1.5rem) by default', () => {
    render(<Spinner />);
    const spinner = screen.getByRole('status');
    expect(spinner.style.width).toBe('1.5rem');
    expect(spinner.style.height).toBe('1.5rem');
  });

  it('applies lg size (2.5rem)', () => {
    render(<Spinner size="lg" />);
    const spinner = screen.getByRole('status');
    expect(spinner.style.width).toBe('2.5rem');
    expect(spinner.style.height).toBe('2.5rem');
  });

  /* ---- Custom color ---- */
  it('uses brand primary as default top border color', () => {
    render(<Spinner />);
    const spinner = screen.getByRole('status');
    expect(spinner.style.borderTopColor).toBe('var(--df-color-brand-primary)');
  });

  it('applies custom color to top border', () => {
    render(<Spinner color="red" />);
    const spinner = screen.getByRole('status');
    expect(spinner.style.borderTopColor).toBe('red');
  });

  /* ---- Animation ---- */
  it('has rotation animation', () => {
    render(<Spinner />);
    const spinner = screen.getByRole('status');
    expect(spinner.style.animation).toContain('df-spinner-rotate');
  });

  /* ---- ForwardRef ---- */
  it('forwards ref to the span element', () => {
    const ref = React.createRef<HTMLSpanElement>();
    render(<Spinner ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  /* ---- className and style passthrough ---- */
  it('passes custom className', () => {
    render(<Spinner className="my-spinner" />);
    expect(screen.getByRole('status')).toHaveClass('my-spinner');
  });

  it('merges custom style props', () => {
    render(<Spinner style={{ margin: '8px' }} />);
    expect(screen.getByRole('status').style.margin).toBe('8px');
  });
});

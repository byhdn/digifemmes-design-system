import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Toggle } from '../Toggle';

describe('Toggle', () => {
  /* ---- Basic rendering ---- */
  it('renders without crashing', () => {
    render(<Toggle />);
    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  it('has displayName set to Toggle', () => {
    expect(Toggle.displayName).toBe('Toggle');
  });

  /* ---- Switch role / accessibility ---- */
  it('renders a checkbox input with role="switch"', () => {
    render(<Toggle />);
    const input = screen.getByRole('switch');
    expect(input).toHaveAttribute('type', 'checkbox');
  });

  it('sets aria-checked based on checked prop', () => {
    const { rerender } = render(<Toggle checked={false} />);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');

    rerender(<Toggle checked={true} />);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
  });

  /* ---- Label ---- */
  it('renders a label when provided', () => {
    render(<Toggle label="Dark mode" />);
    expect(screen.getByText('Dark mode')).toBeInTheDocument();
  });

  it('the label is associated with the input via htmlFor', () => {
    render(<Toggle label="Feature" id="feat-toggle" />);
    const input = screen.getByRole('switch');
    expect(input).toHaveAttribute('id', 'feat-toggle');
    // The wrapping <label> has htmlFor
    expect(input.closest('label')).toHaveAttribute('for', 'feat-toggle');
  });

  /* ---- Checked state ---- */
  it('defaults to unchecked', () => {
    render(<Toggle />);
    expect(screen.getByRole('switch')).not.toBeChecked();
  });

  it('is checked when checked=true', () => {
    render(<Toggle checked={true} />);
    expect(screen.getByRole('switch')).toBeChecked();
  });

  /* ---- onChange handler ---- */
  it('fires onChange with true when toggling on', () => {
    const onChange = vi.fn();
    render(<Toggle checked={false} onChange={onChange} />);
    fireEvent.click(screen.getByRole('switch'));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('fires onChange with false when toggling off', () => {
    const onChange = vi.fn();
    render(<Toggle checked={true} onChange={onChange} />);
    fireEvent.click(screen.getByRole('switch'));
    expect(onChange).toHaveBeenCalledWith(false);
  });

  /* ---- Disabled state ---- */
  it('disables the input when disabled', () => {
    render(<Toggle disabled />);
    expect(screen.getByRole('switch')).toBeDisabled();
  });

  it('applies reduced opacity when disabled', () => {
    render(<Toggle disabled />);
    const label = screen.getByRole('switch').closest('label') as HTMLElement;
    expect(label.style.opacity).toBe('0.5');
  });

  it('sets disabled attribute on the underlying input', () => {
    render(<Toggle disabled onChange={vi.fn()} />);
    const input = screen.getByRole('switch');
    expect(input).toHaveAttribute('disabled');
  });

  /* ---- Sizes ---- */
  it('applies sm track dimensions', () => {
    render(<Toggle size="sm" />);
    const track = screen.getByRole('switch').nextSibling as HTMLElement;
    expect(track.style.width).toBe('2rem');
    expect(track.style.height).toBe('1.125rem');
  });

  it('applies md (default) track dimensions', () => {
    render(<Toggle />);
    const track = screen.getByRole('switch').nextSibling as HTMLElement;
    expect(track.style.width).toBe('2.75rem');
    expect(track.style.height).toBe('1.5rem');
  });

  it('applies lg track dimensions', () => {
    render(<Toggle size="lg" />);
    const track = screen.getByRole('switch').nextSibling as HTMLElement;
    expect(track.style.width).toBe('3.25rem');
    expect(track.style.height).toBe('1.75rem');
  });

  /* ---- ForwardRef ---- */
  it('forwards ref to the input element', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Toggle ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  /* ---- className and style passthrough ---- */
  it('passes custom className to wrapper label', () => {
    const { container } = render(<Toggle className="my-toggle" />);
    expect(container.querySelector('.my-toggle')).toBeInTheDocument();
  });
});

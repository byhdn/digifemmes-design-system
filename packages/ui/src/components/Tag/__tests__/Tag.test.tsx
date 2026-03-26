import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Tag } from '../Tag';

describe('Tag', () => {
  /* ---- Basic rendering ---- */
  it('renders without crashing', () => {
    render(<Tag>Design</Tag>);
    expect(screen.getByText('Design')).toBeInTheDocument();
  });

  it('renders as a span element', () => {
    render(<Tag>Label</Tag>);
    expect(screen.getByText('Label').tagName).toBe('SPAN');
  });

  it('has displayName set to Tag', () => {
    expect(Tag.displayName).toBe('Tag');
  });

  /* ---- Variants ---- */
  // jsdom converts hex literals to rgb() format
  it('applies default variant', () => {
    render(<Tag>Default</Tag>);
    const tag = screen.getByText('Default');
    expect(tag.style.backgroundColor).toBe('var(--df-color-surface-muted)');
    expect(tag.style.color).toBe('var(--df-color-text-default)');
  });

  it('applies primary variant', () => {
    render(<Tag variant="primary">Primary</Tag>);
    const tag = screen.getByText('Primary');
    expect(tag.style.backgroundColor).toBe('rgb(255, 243, 224)');
    expect(tag.style.color).toBe('var(--df-color-brand-primary)');
  });

  it('applies secondary variant', () => {
    render(<Tag variant="secondary">Secondary</Tag>);
    const tag = screen.getByText('Secondary');
    expect(tag.style.backgroundColor).toBe('rgb(225, 245, 254)');
  });

  it('applies accent variant', () => {
    render(<Tag variant="accent">Accent</Tag>);
    const tag = screen.getByText('Accent');
    expect(tag.style.backgroundColor).toBe('rgb(255, 248, 225)');
    expect(tag.style.color).toBe('rgb(230, 81, 0)');
  });

  it('applies navy variant', () => {
    render(<Tag variant="navy">Navy</Tag>);
    const tag = screen.getByText('Navy');
    expect(tag.style.backgroundColor).toBe('rgb(232, 234, 246)');
  });

  it('applies green variant', () => {
    render(<Tag variant="green">Green</Tag>);
    const tag = screen.getByText('Green');
    expect(tag.style.backgroundColor).toBe('rgb(232, 245, 233)');
  });

  /* ---- Pill shape ---- */
  it('uses full border radius for pill shape', () => {
    render(<Tag>Pill</Tag>);
    expect(screen.getByText('Pill').style.borderRadius).toBe('var(--df-radius-full)');
  });

  /* ---- Removable ---- */
  it('does not show remove button by default', () => {
    render(<Tag>Static</Tag>);
    expect(screen.queryByLabelText('Remove tag')).not.toBeInTheDocument();
  });

  it('shows remove button when removable', () => {
    render(<Tag removable>Removable</Tag>);
    expect(screen.getByLabelText('Remove tag')).toBeInTheDocument();
  });

  it('calls onRemove when remove button is clicked', () => {
    const onRemove = vi.fn();
    render(<Tag removable onRemove={onRemove}>X</Tag>);
    fireEvent.click(screen.getByLabelText('Remove tag'));
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it('remove button has proper aria-label', () => {
    render(<Tag removable>Removable</Tag>);
    expect(screen.getByLabelText('Remove tag')).toBeInTheDocument();
  });

  /* ---- ForwardRef ---- */
  it('forwards ref to the span element', () => {
    const ref = React.createRef<HTMLSpanElement>();
    render(<Tag ref={ref}>Ref</Tag>);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  /* ---- className and style passthrough ---- */
  it('passes custom className', () => {
    render(<Tag className="my-tag">C</Tag>);
    expect(screen.getByText('C')).toHaveClass('my-tag');
  });

  it('merges custom style props', () => {
    render(<Tag style={{ margin: '4px' }}>S</Tag>);
    expect(screen.getByText('S').style.margin).toBe('4px');
  });
});

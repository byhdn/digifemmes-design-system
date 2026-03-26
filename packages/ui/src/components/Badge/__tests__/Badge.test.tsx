import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from '../Badge';

describe('Badge', () => {
  /* ---- Basic rendering ---- */
  it('renders without crashing', () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('renders as a span element', () => {
    render(<Badge>Label</Badge>);
    expect(screen.getByText('Label').tagName).toBe('SPAN');
  });

  it('has displayName set to Badge', () => {
    expect(Badge.displayName).toBe('Badge');
  });

  /* ---- Variants ---- */
  // jsdom converts hex literals to rgb() format
  it('applies default variant styles', () => {
    render(<Badge>Default</Badge>);
    const badge = screen.getByText('Default');
    expect(badge.style.backgroundColor).toBe('var(--df-color-surface-muted)');
    expect(badge.style.color).toBe('var(--df-color-text-default)');
  });

  it('applies success variant styles', () => {
    render(<Badge variant="success">OK</Badge>);
    const badge = screen.getByText('OK');
    expect(badge.style.backgroundColor).toBe('rgb(232, 245, 233)');
    expect(badge.style.color).toBe('var(--df-color-green)');
  });

  it('applies warning variant styles', () => {
    render(<Badge variant="warning">Warn</Badge>);
    const badge = screen.getByText('Warn');
    expect(badge.style.backgroundColor).toBe('rgb(255, 248, 225)');
  });

  it('applies error variant styles', () => {
    render(<Badge variant="error">Error</Badge>);
    const badge = screen.getByText('Error');
    expect(badge.style.backgroundColor).toBe('rgb(254, 226, 226)');
    expect(badge.style.color).toBe('var(--df-color-error)');
  });

  it('applies info variant styles', () => {
    render(<Badge variant="info">Info</Badge>);
    const badge = screen.getByText('Info');
    expect(badge.style.backgroundColor).toBe('rgb(225, 245, 254)');
  });

  /* ---- Sizes ---- */
  it('defaults to md size', () => {
    render(<Badge>Md</Badge>);
    const badge = screen.getByText('Md');
    expect(badge.style.fontSize).toBe('0.75rem');
    expect(badge.style.padding).toBe('0.25rem 0.625rem');
  });

  it('applies sm size', () => {
    render(<Badge size="sm">Sm</Badge>);
    const badge = screen.getByText('Sm');
    expect(badge.style.fontSize).toBe('0.6875rem');
    expect(badge.style.padding).toBe('0.125rem 0.5rem');
  });

  /* ---- Pill shape ---- */
  it('uses full border radius for pill shape', () => {
    render(<Badge>Pill</Badge>);
    expect(screen.getByText('Pill').style.borderRadius).toBe('var(--df-radius-full)');
  });

  /* ---- ForwardRef ---- */
  it('forwards ref to the span element', () => {
    const ref = React.createRef<HTMLSpanElement>();
    render(<Badge ref={ref}>Ref</Badge>);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  /* ---- className and style passthrough ---- */
  it('passes custom className', () => {
    render(<Badge className="my-badge">C</Badge>);
    expect(screen.getByText('C')).toHaveClass('my-badge');
  });

  it('merges custom style props', () => {
    render(<Badge style={{ margin: '4px' }}>S</Badge>);
    expect(screen.getByText('S').style.margin).toBe('4px');
  });
});

import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../Button';

describe('Button', () => {
  /* ---- Basic rendering ---- */
  it('renders without crashing', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders children content', () => {
    render(<Button>Submit</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Submit');
  });

  it('has displayName set to Button', () => {
    expect(Button.displayName).toBe('Button');
  });

  /* ---- Default props ---- */
  it('defaults to type="button"', () => {
    render(<Button>OK</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('allows overriding type to "submit"', () => {
    render(<Button type="submit">Go</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  /* ---- Variants ---- */
  it('applies primary variant styles by default', () => {
    render(<Button>Primary</Button>);
    const btn = screen.getByRole('button');
    expect(btn.style.backgroundColor).toBe('var(--df-color-brand-primary)');
  });

  it('applies secondary variant styles', () => {
    render(<Button variant="secondary">Sec</Button>);
    const btn = screen.getByRole('button');
    expect(btn.style.border).toContain('var(--df-color-brand-primary)');
    expect(btn.style.backgroundColor).toBe('transparent');
  });

  it('applies ghost variant styles', () => {
    render(<Button variant="ghost">Ghost</Button>);
    const btn = screen.getByRole('button');
    expect(btn.style.backgroundColor).toBe('transparent');
  });

  it('applies danger variant styles', () => {
    render(<Button variant="danger">Delete</Button>);
    const btn = screen.getByRole('button');
    expect(btn.style.backgroundColor).toBe('var(--df-color-error)');
  });

  /* ---- Sizes ---- */
  it('applies sm size styles', () => {
    render(<Button size="sm">S</Button>);
    const btn = screen.getByRole('button');
    expect(btn.style.height).toBe('2rem');
    expect(btn.style.fontSize).toBe('0.8125rem');
  });

  it('applies md size styles by default', () => {
    render(<Button>M</Button>);
    const btn = screen.getByRole('button');
    expect(btn.style.height).toBe('2.5rem');
    expect(btn.style.fontSize).toBe('0.875rem');
  });

  it('applies lg size styles', () => {
    render(<Button size="lg">L</Button>);
    const btn = screen.getByRole('button');
    expect(btn.style.height).toBe('3rem');
    expect(btn.style.fontSize).toBe('1rem');
  });

  /* ---- Disabled state ---- */
  it('sets disabled attribute when disabled', () => {
    render(<Button disabled>Disabled</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();
  });

  it('sets aria-disabled when disabled', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true');
  });

  it('applies disabled opacity style', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button').style.opacity).toBe('0.5');
  });

  /* ---- Loading state ---- */
  it('sets aria-busy when loading', () => {
    render(<Button loading>Loading</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
  });

  it('disables the button when loading', () => {
    render(<Button loading>Loading</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('renders a spinner when loading', () => {
    render(<Button loading>Loading</Button>);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  /* ---- Event handlers ---- */
  it('fires onClick handler', () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not fire onClick when disabled', () => {
    const onClick = vi.fn();
    render(<Button disabled onClick={onClick}>No</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  /* ---- Link mode (href) ---- */
  it('renders as an anchor when href is provided', () => {
    render(<Button href="https://digifemmes.org">Link</Button>);
    const link = screen.getByRole('button');
    expect(link.tagName).toBe('A');
    expect(link).toHaveAttribute('href', 'https://digifemmes.org');
  });

  it('adds noopener noreferrer for _blank target', () => {
    render(<Button href="/page" target="_blank">External</Button>);
    const link = screen.getByRole('button');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders as a button (not anchor) when disabled with href', () => {
    render(<Button href="/page" disabled>Disabled link</Button>);
    const el = screen.getByRole('button');
    expect(el.tagName).toBe('BUTTON');
  });

  /* ---- ForwardRef ---- */
  it('forwards ref to the button element', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Ref</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('forwards ref to the anchor element when href is provided', () => {
    const ref = React.createRef<HTMLAnchorElement>();
    render(<Button ref={ref as React.Ref<HTMLButtonElement | HTMLAnchorElement>} href="/x">Ref link</Button>);
    expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
  });

  /* ---- className and style passthrough ---- */
  it('passes custom className', () => {
    render(<Button className="my-btn">Cls</Button>);
    expect(screen.getByRole('button')).toHaveClass('my-btn');
  });

  it('merges custom style props', () => {
    render(<Button style={{ margin: '10px' }}>Styled</Button>);
    expect(screen.getByRole('button').style.margin).toBe('10px');
  });
});

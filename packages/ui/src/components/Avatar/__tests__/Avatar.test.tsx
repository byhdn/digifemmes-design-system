import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Avatar } from '../Avatar';

describe('Avatar', () => {
  /* ---- Basic rendering ---- */
  it('renders without crashing', () => {
    render(<Avatar />);
    // The outer span has role="img"
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('has displayName set to Avatar', () => {
    expect(Avatar.displayName).toBe('Avatar');
  });

  /* ---- Image rendering ---- */
  it('renders an img when src is provided', () => {
    const { container } = render(<Avatar src="/photo.jpg" alt="Jane Doe" />);
    const img = container.querySelector('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/photo.jpg');
    expect(img).toHaveAttribute('alt', 'Jane Doe');
  });

  /* ---- Fallback initials ---- */
  it('shows initials from single-word fallback', () => {
    render(<Avatar fallback="Alice" />);
    expect(screen.getByText('A')).toBeInTheDocument();
  });

  it('shows two-letter initials from multi-word fallback', () => {
    render(<Avatar fallback="Jane Doe" />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('uses first and last name initials for three-word name', () => {
    render(<Avatar fallback="Marie Claude Dupont" />);
    expect(screen.getByText('MD')).toBeInTheDocument();
  });

  it('shows "?" when no src or fallback', () => {
    render(<Avatar />);
    expect(screen.getByText('?')).toBeInTheDocument();
  });

  it('shows initials when image fails to load', () => {
    const { container } = render(<Avatar src="/broken.jpg" fallback="Bob Smith" />);
    const img = container.querySelector('img');
    // simulate image error
    fireEvent.error(img!);
    expect(screen.getByText('BS')).toBeInTheDocument();
  });

  /* ---- Accessibility ---- */
  it('has role="img" on the outer container', () => {
    const { container } = render(<Avatar fallback="Test" />);
    const outerSpan = container.firstChild as HTMLElement;
    expect(outerSpan).toHaveAttribute('role', 'img');
  });

  it('uses alt as aria-label', () => {
    const { container } = render(<Avatar src="/a.jpg" alt="Profile picture" />);
    const outerSpan = container.firstChild as HTMLElement;
    expect(outerSpan).toHaveAttribute('aria-label', 'Profile picture');
  });

  it('uses fallback as aria-label when alt is not provided', () => {
    render(<Avatar fallback="Alice" />);
    expect(screen.getByRole('img')).toHaveAttribute('aria-label', 'Alice');
  });

  it('defaults aria-label to "Avatar"', () => {
    render(<Avatar />);
    expect(screen.getByRole('img')).toHaveAttribute('aria-label', 'Avatar');
  });

  it('marks initials as aria-hidden', () => {
    render(<Avatar fallback="Test" />);
    const initialsSpan = screen.getByText('T');
    expect(initialsSpan).toHaveAttribute('aria-hidden', 'true');
  });

  /* ---- Sizes ---- */
  it('applies sm size (2rem)', () => {
    render(<Avatar size="sm" />);
    const avatar = screen.getByRole('img');
    expect(avatar.style.width).toBe('2rem');
    expect(avatar.style.height).toBe('2rem');
  });

  it('applies md size (2.5rem) by default', () => {
    render(<Avatar />);
    const avatar = screen.getByRole('img');
    expect(avatar.style.width).toBe('2.5rem');
    expect(avatar.style.height).toBe('2.5rem');
  });

  it('applies lg size (3rem)', () => {
    render(<Avatar size="lg" />);
    const avatar = screen.getByRole('img');
    expect(avatar.style.width).toBe('3rem');
    expect(avatar.style.height).toBe('3rem');
  });

  it('applies xl size (4rem)', () => {
    render(<Avatar size="xl" />);
    const avatar = screen.getByRole('img');
    expect(avatar.style.width).toBe('4rem');
    expect(avatar.style.height).toBe('4rem');
  });

  /* ---- Circular shape ---- */
  it('uses full border radius for circular shape', () => {
    render(<Avatar />);
    expect(screen.getByRole('img').style.borderRadius).toBe('var(--df-radius-full)');
  });

  /* ---- ForwardRef ---- */
  it('forwards ref to the span container', () => {
    const ref = React.createRef<HTMLSpanElement>();
    render(<Avatar ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  /* ---- className and style passthrough ---- */
  it('passes custom className', () => {
    render(<Avatar className="my-avatar" />);
    expect(screen.getByRole('img')).toHaveClass('my-avatar');
  });

  it('merges custom style props', () => {
    render(<Avatar style={{ border: '2px solid red' }} />);
    expect(screen.getByRole('img').style.border).toBe('2px solid red');
  });
});

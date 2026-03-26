import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Alert } from '../Alert';

describe('Alert', () => {
  /* ---- Basic rendering ---- */
  it('renders without crashing', () => {
    render(<Alert>Message</Alert>);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('renders children content', () => {
    render(<Alert>Something happened</Alert>);
    expect(screen.getByText('Something happened')).toBeInTheDocument();
  });

  it('has displayName set to Alert', () => {
    expect(Alert.displayName).toBe('Alert');
  });

  /* ---- role ---- */
  it('has role="alert" for screen readers', () => {
    render(<Alert>Notice</Alert>);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  /* ---- Variants ---- */
  // jsdom converts hex literals to rgb() format, so we compare rgb values
  it('defaults to info variant', () => {
    render(<Alert>Info</Alert>);
    const alert = screen.getByRole('alert');
    expect(alert.style.backgroundColor).toBe('rgb(225, 245, 254)');
  });

  it('applies success variant', () => {
    render(<Alert variant="success">OK</Alert>);
    const alert = screen.getByRole('alert');
    expect(alert.style.backgroundColor).toBe('rgb(232, 245, 233)');
  });

  it('applies warning variant', () => {
    render(<Alert variant="warning">Careful</Alert>);
    const alert = screen.getByRole('alert');
    expect(alert.style.backgroundColor).toBe('rgb(255, 248, 225)');
  });

  it('applies error variant', () => {
    render(<Alert variant="error">Failed</Alert>);
    const alert = screen.getByRole('alert');
    expect(alert.style.backgroundColor).toBe('rgb(254, 226, 226)');
  });

  /* ---- Title ---- */
  it('renders title when provided', () => {
    render(<Alert title="Heads up">Details</Alert>);
    expect(screen.getByText('Heads up')).toBeInTheDocument();
  });

  it('title has bold weight', () => {
    render(<Alert title="Bold Title">Body</Alert>);
    const title = screen.getByText('Bold Title');
    expect(title.style.fontWeight).toBe('600');
  });

  it('does not render title div when no title', () => {
    const { container } = render(<Alert>No title</Alert>);
    const divs = container.querySelectorAll('div');
    // none of the inner divs should have fontWeight 600 as a title element
    const titledDivs = Array.from(divs).filter((d) => d.style.fontWeight === '600');
    expect(titledDivs).toHaveLength(0);
  });

  /* ---- Icon ---- */
  it('renders an SVG icon', () => {
    render(<Alert>With icon</Alert>);
    const alert = screen.getByRole('alert');
    const svg = alert.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('aria-hidden', 'true');
  });

  /* ---- Close button ---- */
  it('does not render close button by default', () => {
    render(<Alert>No close</Alert>);
    expect(screen.queryByLabelText('Close alert')).not.toBeInTheDocument();
  });

  it('renders close button when closeable', () => {
    render(<Alert closeable>Closeable</Alert>);
    expect(screen.getByLabelText('Close alert')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn();
    render(<Alert closeable onClose={onClose}>Close me</Alert>);
    fireEvent.click(screen.getByLabelText('Close alert'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  /* ---- ForwardRef ---- */
  it('forwards ref to the alert div', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Alert ref={ref}>Ref</Alert>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  /* ---- className and style passthrough ---- */
  it('passes custom className', () => {
    render(<Alert className="my-alert">C</Alert>);
    expect(screen.getByRole('alert')).toHaveClass('my-alert');
  });

  it('merges custom style props', () => {
    render(<Alert style={{ padding: '20px' }}>S</Alert>);
    expect(screen.getByRole('alert').style.padding).toBe('20px');
  });
});

import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from '../Modal';

// jsdom does not implement HTMLDialogElement.showModal / close natively.
// We mock them so the component can function in tests.
beforeEach(() => {
  HTMLDialogElement.prototype.showModal =
    HTMLDialogElement.prototype.showModal ||
    vi.fn(function (this: HTMLDialogElement) {
      this.setAttribute('open', '');
    });

  HTMLDialogElement.prototype.close =
    HTMLDialogElement.prototype.close ||
    vi.fn(function (this: HTMLDialogElement) {
      this.removeAttribute('open');
    });
});

describe('Modal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    children: <p>Modal body</p>,
  };

  /* ---- Basic rendering ---- */
  it('renders a dialog element when open', () => {
    render(<Modal {...defaultProps} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('renders children content', () => {
    render(<Modal {...defaultProps} />);
    expect(screen.getByText('Modal body')).toBeInTheDocument();
  });

  it('has displayName set to Modal', () => {
    expect(Modal.displayName).toBe('Modal');
  });

  /* ---- Accessibility ---- */
  it('sets aria-modal to true', () => {
    render(<Modal {...defaultProps} />);
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
  });

  it('sets aria-label to title when provided', () => {
    render(<Modal {...defaultProps} title="Confirm" />);
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-label', 'Confirm');
  });

  it('sets aria-label to "Dialog" when no title', () => {
    render(<Modal {...defaultProps} />);
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-label', 'Dialog');
  });

  /* ---- Title / header ---- */
  it('renders the title in an h2', () => {
    render(<Modal {...defaultProps} title="My Title" />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('My Title');
  });

  it('does not render header when no title', () => {
    render(<Modal {...defaultProps} />);
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  /* ---- Close button ---- */
  it('renders close button when title is present', () => {
    render(<Modal {...defaultProps} title="Close me" />);
    const closeBtn = screen.getByLabelText('Close dialog');
    expect(closeBtn).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn();
    render(<Modal {...defaultProps} onClose={onClose} title="X" />);
    fireEvent.click(screen.getByLabelText('Close dialog'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  /* ---- Backdrop click ---- */
  it('calls onClose when clicking the dialog backdrop', () => {
    const onClose = vi.fn();
    render(<Modal {...defaultProps} onClose={onClose} />);
    const dialog = screen.getByRole('dialog');
    // click directly on the dialog element (the backdrop)
    fireEvent.click(dialog);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does NOT call onClose when clicking inside the panel', () => {
    const onClose = vi.fn();
    render(<Modal {...defaultProps} onClose={onClose} />);
    fireEvent.click(screen.getByText('Modal body'));
    expect(onClose).not.toHaveBeenCalled();
  });

  /* ---- Sizes ---- */
  it('defaults to md size', () => {
    render(<Modal {...defaultProps} />);
    // md maxWidth is 32rem - check the panel div
    const dialog = screen.getByRole('dialog');
    const panel = dialog.firstChild as HTMLElement;
    expect(panel.style.maxWidth).toBe('32rem');
  });

  it('applies sm size', () => {
    render(<Modal {...defaultProps} size="sm" />);
    const dialog = screen.getByRole('dialog');
    const panel = dialog.firstChild as HTMLElement;
    expect(panel.style.maxWidth).toBe('24rem');
  });

  it('applies lg size', () => {
    render(<Modal {...defaultProps} size="lg" />);
    const dialog = screen.getByRole('dialog');
    const panel = dialog.firstChild as HTMLElement;
    expect(panel.style.maxWidth).toBe('42rem');
  });

  /* ---- CSS class ---- */
  it('applies df-modal class', () => {
    render(<Modal {...defaultProps} />);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveClass('df-modal');
  });

  it('appends custom className', () => {
    render(<Modal {...defaultProps} className="my-modal" />);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveClass('df-modal');
    expect(dialog).toHaveClass('my-modal');
  });

  /* ---- ForwardRef ---- */
  it('forwards ref to the dialog element', () => {
    const ref = React.createRef<HTMLDialogElement>();
    render(<Modal {...defaultProps} ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDialogElement);
  });
});

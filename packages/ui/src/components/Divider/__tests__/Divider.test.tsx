import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Divider } from '../Divider';

describe('Divider', () => {
  /* ---- Basic rendering ---- */
  it('renders without crashing', () => {
    render(<Divider />);
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  it('has displayName set to Divider', () => {
    expect(Divider.displayName).toBe('Divider');
  });

  /* ---- Horizontal (default) ---- */
  describe('horizontal orientation', () => {
    it('renders as an hr by default (no label)', () => {
      render(<Divider />);
      const sep = screen.getByRole('separator');
      expect(sep.tagName).toBe('HR');
    });

    it('sets aria-orientation to horizontal', () => {
      render(<Divider />);
      expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation', 'horizontal');
    });

    it('uses 100% width', () => {
      render(<Divider />);
      expect(screen.getByRole('separator').style.width).toBe('100%');
    });

    it('uses 1px height', () => {
      render(<Divider />);
      expect(screen.getByRole('separator').style.height).toBe('1px');
    });
  });

  /* ---- Horizontal with label ---- */
  describe('horizontal with label', () => {
    it('renders a div instead of hr when label is provided', () => {
      render(<Divider label="OR" />);
      const sep = screen.getByRole('separator');
      expect(sep.tagName).toBe('DIV');
    });

    it('displays the label text', () => {
      render(<Divider label="Section" />);
      expect(screen.getByText('Section')).toBeInTheDocument();
    });

    it('label text is uppercase', () => {
      render(<Divider label="divider" />);
      const labelEl = screen.getByText('divider');
      expect(labelEl.style.textTransform).toBe('uppercase');
    });

    it('uses flexbox layout with two line spans', () => {
      render(<Divider label="OR" />);
      const sep = screen.getByRole('separator');
      expect(sep.style.display).toBe('flex');
      expect(sep.style.alignItems).toBe('center');
    });
  });

  /* ---- Vertical orientation ---- */
  describe('vertical orientation', () => {
    it('renders as a div', () => {
      render(<Divider orientation="vertical" />);
      const sep = screen.getByRole('separator');
      expect(sep.tagName).toBe('DIV');
    });

    it('sets aria-orientation to vertical', () => {
      render(<Divider orientation="vertical" />);
      expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation', 'vertical');
    });

    it('uses 1px width', () => {
      render(<Divider orientation="vertical" />);
      expect(screen.getByRole('separator').style.width).toBe('1px');
    });

    it('stretches to parent height', () => {
      render(<Divider orientation="vertical" />);
      expect(screen.getByRole('separator').style.alignSelf).toBe('stretch');
    });
  });

  /* ---- ForwardRef ---- */
  it('forwards ref to the element (horizontal)', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Divider ref={ref} />);
    expect(ref.current).toBeTruthy();
  });

  it('forwards ref to the element (vertical)', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Divider ref={ref} orientation="vertical" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('forwards ref to the element (with label)', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Divider ref={ref} label="Test" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  /* ---- className and style passthrough ---- */
  it('passes custom className', () => {
    render(<Divider className="my-divider" />);
    expect(screen.getByRole('separator')).toHaveClass('my-divider');
  });

  it('merges custom style props', () => {
    render(<Divider style={{ margin: '16px 0' }} />);
    expect(screen.getByRole('separator').style.margin).toBe('16px 0px');
  });
});

import React from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Tooltip } from '../Tooltip';

afterEach(() => {
  vi.useRealTimers();
});

describe('Tooltip', () => {
  /* ---- Basic rendering ---- */
  it('renders the trigger child', () => {
    render(
      <Tooltip content="Hint">
        <button>Hover me</button>
      </Tooltip>,
    );
    expect(screen.getByText('Hover me')).toBeInTheDocument();
  });

  it('renders the tooltip text in the DOM', () => {
    const { container } = render(
      <Tooltip content="Tooltip text">
        <button>Trigger</button>
      </Tooltip>,
    );
    // Tooltip is rendered but aria-hidden, so use DOM query
    const tooltipEl = container.querySelector('[role="tooltip"]');
    expect(tooltipEl).toBeInTheDocument();
    expect(tooltipEl).toHaveTextContent('Tooltip text');
  });

  it('has displayName set to Tooltip', () => {
    expect(Tooltip.displayName).toBe('Tooltip');
  });

  /* ---- Visibility ---- */
  it('tooltip is hidden by default (aria-hidden=true)', () => {
    const { container } = render(
      <Tooltip content="Hidden">
        <button>Trigger</button>
      </Tooltip>,
    );
    const tooltipEl = container.querySelector('[role="tooltip"]');
    expect(tooltipEl).toHaveAttribute('aria-hidden', 'true');
  });

  it('shows tooltip on mouseenter (aria-hidden=false)', () => {
    const { container } = render(
      <Tooltip content="Visible">
        <button>Trigger</button>
      </Tooltip>,
    );
    const wrapper = screen.getByText('Trigger').closest('span')!;
    fireEvent.mouseEnter(wrapper);
    const tooltipEl = container.querySelector('[role="tooltip"]');
    expect(tooltipEl).toHaveAttribute('aria-hidden', 'false');
  });

  it('hides tooltip on mouseleave after delay', () => {
    vi.useFakeTimers();
    const { container } = render(
      <Tooltip content="Will hide">
        <button>Trigger</button>
      </Tooltip>,
    );
    const wrapper = screen.getByText('Trigger').closest('span')!;
    fireEvent.mouseEnter(wrapper);
    fireEvent.mouseLeave(wrapper);
    act(() => {
      vi.advanceTimersByTime(150);
    });
    const tooltipEl = container.querySelector('[role="tooltip"]');
    expect(tooltipEl).toHaveAttribute('aria-hidden', 'true');
  });

  it('shows tooltip on focus', () => {
    const { container } = render(
      <Tooltip content="Focused">
        <button>Trigger</button>
      </Tooltip>,
    );
    const wrapper = screen.getByText('Trigger').closest('span')!;
    fireEvent.focus(wrapper);
    const tooltipEl = container.querySelector('[role="tooltip"]');
    expect(tooltipEl).toHaveAttribute('aria-hidden', 'false');
  });

  it('hides tooltip on blur', () => {
    vi.useFakeTimers();
    const { container } = render(
      <Tooltip content="Blurred">
        <button>Trigger</button>
      </Tooltip>,
    );
    const wrapper = screen.getByText('Trigger').closest('span')!;
    fireEvent.focus(wrapper);
    fireEvent.blur(wrapper);
    act(() => {
      vi.advanceTimersByTime(150);
    });
    const tooltipEl = container.querySelector('[role="tooltip"]');
    expect(tooltipEl).toHaveAttribute('aria-hidden', 'true');
  });

  /* ---- aria-describedby ---- */
  it('sets aria-describedby on trigger when visible', () => {
    const { container } = render(
      <Tooltip content="Described">
        <button>Trigger</button>
      </Tooltip>,
    );
    const wrapper = screen.getByText('Trigger').closest('span')!;
    fireEvent.mouseEnter(wrapper);
    const trigger = screen.getByText('Trigger');
    expect(trigger).toHaveAttribute('aria-describedby');
    const tooltipId = trigger.getAttribute('aria-describedby');
    const tooltipEl = container.querySelector('[role="tooltip"]');
    expect(tooltipEl).toHaveAttribute('id', tooltipId);
  });

  /* ---- Position ---- */
  it('defaults to top position', () => {
    const { container } = render(
      <Tooltip content="Top">
        <button>T</button>
      </Tooltip>,
    );
    const tooltipEl = container.querySelector('[role="tooltip"]') as HTMLElement;
    expect(tooltipEl.style.bottom).toBe('100%');
  });

  it('applies bottom position', () => {
    const { container } = render(
      <Tooltip content="Bottom" position="bottom">
        <button>B</button>
      </Tooltip>,
    );
    const tooltipEl = container.querySelector('[role="tooltip"]') as HTMLElement;
    expect(tooltipEl.style.top).toBe('100%');
  });

  it('applies left position', () => {
    const { container } = render(
      <Tooltip content="Left" position="left">
        <button>L</button>
      </Tooltip>,
    );
    const tooltipEl = container.querySelector('[role="tooltip"]') as HTMLElement;
    expect(tooltipEl.style.right).toBe('100%');
  });

  it('applies right position', () => {
    const { container } = render(
      <Tooltip content="Right" position="right">
        <button>R</button>
      </Tooltip>,
    );
    const tooltipEl = container.querySelector('[role="tooltip"]') as HTMLElement;
    expect(tooltipEl.style.left).toBe('100%');
  });

  /* ---- className and style passthrough ---- */
  it('passes custom className to tooltip popup', () => {
    const { container } = render(
      <Tooltip content="Styled" className="my-tooltip">
        <button>T</button>
      </Tooltip>,
    );
    const tooltipEl = container.querySelector('[role="tooltip"]');
    expect(tooltipEl).toHaveClass('my-tooltip');
  });
});

import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Tabs } from '../Tabs';

function renderTabs(activeTab = 'tab1', onChange = vi.fn()) {
  return render(
    <Tabs activeTab={activeTab} onChange={onChange}>
      <Tabs.List>
        <Tabs.Tab tabId="tab1">Tab One</Tabs.Tab>
        <Tabs.Tab tabId="tab2">Tab Two</Tabs.Tab>
        <Tabs.Tab tabId="tab3" disabled>Tab Three</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel tabId="tab1">Panel One Content</Tabs.Panel>
      <Tabs.Panel tabId="tab2">Panel Two Content</Tabs.Panel>
      <Tabs.Panel tabId="tab3">Panel Three Content</Tabs.Panel>
    </Tabs>,
  );
}

describe('Tabs', () => {
  /* ---- Basic rendering ---- */
  it('renders without crashing', () => {
    renderTabs();
    expect(screen.getByRole('tablist')).toBeInTheDocument();
  });

  it('renders all tab buttons', () => {
    renderTabs();
    expect(screen.getAllByRole('tab')).toHaveLength(3);
  });

  it('has displayName set to Tabs', () => {
    expect(Tabs.displayName).toBe('Tabs');
  });

  /* ---- Active tab ---- */
  it('shows the active panel', () => {
    renderTabs('tab1');
    expect(screen.getByText('Panel One Content')).toBeInTheDocument();
  });

  it('hides non-active panels', () => {
    renderTabs('tab1');
    expect(screen.queryByText('Panel Two Content')).not.toBeInTheDocument();
    expect(screen.queryByText('Panel Three Content')).not.toBeInTheDocument();
  });

  it('shows tab2 panel when tab2 is active', () => {
    renderTabs('tab2');
    expect(screen.getByText('Panel Two Content')).toBeInTheDocument();
    expect(screen.queryByText('Panel One Content')).not.toBeInTheDocument();
  });

  /* ---- ARIA attributes ---- */
  it('sets aria-selected on active tab', () => {
    renderTabs('tab1');
    const tab1 = screen.getByText('Tab One');
    const tab2 = screen.getByText('Tab Two');
    expect(tab1).toHaveAttribute('aria-selected', 'true');
    expect(tab2).toHaveAttribute('aria-selected', 'false');
  });

  it('sets aria-controls on tab to point to panel', () => {
    renderTabs('tab1');
    const tab1 = screen.getByText('Tab One');
    expect(tab1).toHaveAttribute('aria-controls', 'panel-tab1');
  });

  it('sets tabpanel role on the panel', () => {
    renderTabs('tab1');
    expect(screen.getByRole('tabpanel')).toBeInTheDocument();
  });

  it('links panel to tab via aria-labelledby', () => {
    renderTabs('tab1');
    const panel = screen.getByRole('tabpanel');
    expect(panel).toHaveAttribute('aria-labelledby', 'tab-tab1');
    expect(panel).toHaveAttribute('id', 'panel-tab1');
  });

  it('active tab has tabIndex 0, others have -1', () => {
    renderTabs('tab1');
    expect(screen.getByText('Tab One')).toHaveAttribute('tabindex', '0');
    expect(screen.getByText('Tab Two')).toHaveAttribute('tabindex', '-1');
  });

  /* ---- Tab switching ---- */
  it('calls onChange when a tab is clicked', () => {
    const onChange = vi.fn();
    renderTabs('tab1', onChange);
    fireEvent.click(screen.getByText('Tab Two'));
    expect(onChange).toHaveBeenCalledWith('tab2');
  });

  it('calls onChange on Enter key press', () => {
    const onChange = vi.fn();
    renderTabs('tab1', onChange);
    fireEvent.keyDown(screen.getByText('Tab Two'), { key: 'Enter' });
    expect(onChange).toHaveBeenCalledWith('tab2');
  });

  it('calls onChange on Space key press', () => {
    const onChange = vi.fn();
    renderTabs('tab1', onChange);
    fireEvent.keyDown(screen.getByText('Tab Two'), { key: ' ' });
    expect(onChange).toHaveBeenCalledWith('tab2');
  });

  /* ---- Disabled tab ---- */
  it('disables the disabled tab button', () => {
    renderTabs();
    expect(screen.getByText('Tab Three')).toBeDisabled();
  });

  it('does not call onChange when clicking a disabled tab', () => {
    const onChange = vi.fn();
    renderTabs('tab1', onChange);
    fireEvent.click(screen.getByText('Tab Three'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('applies reduced opacity on disabled tab', () => {
    renderTabs();
    expect(screen.getByText('Tab Three').style.opacity).toBe('0.5');
  });

  /* ---- Error: using outside context ---- */
  it('throws when Tab is used outside Tabs context', () => {
    expect(() => {
      render(<Tabs.Tab tabId="orphan">Orphan</Tabs.Tab>);
    }).toThrow('Tabs compound components must be used within <Tabs>');
  });

  it('throws when Panel is used outside Tabs context', () => {
    expect(() => {
      render(<Tabs.Panel tabId="orphan">Orphan panel</Tabs.Panel>);
    }).toThrow('Tabs compound components must be used within <Tabs>');
  });

  /* ---- Sub-component displayNames ---- */
  it('sub-components have correct displayNames', () => {
    expect(Tabs.List.displayName).toBe('Tabs.List');
    expect(Tabs.Tab.displayName).toBe('Tabs.Tab');
    expect(Tabs.Panel.displayName).toBe('Tabs.Panel');
  });
});

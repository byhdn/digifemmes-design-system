'use client';

import { ThemeToggle } from './ThemeToggle';

export function TopBar() {
  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 'var(--sidebar-width)',
        right: 0,
        height: 60,
        borderBottom: '1px solid var(--df-color-border-default)',
        backgroundColor: 'var(--df-color-surface-default)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 2rem',
        zIndex: 99,
        gap: '1rem',
      }}
    >
      <a
        href="https://github.com/digifemmes/design-system"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontSize: '0.875rem',
          color: 'var(--df-color-text-subtle)',
          textDecoration: 'none',
          fontWeight: 500,
        }}
      >
        GitHub
      </a>
      <ThemeToggle />
    </header>
  );
}

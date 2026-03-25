'use client';

import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const stored = localStorage.getItem('df-theme') as 'light' | 'dark' | null;
    if (stored) {
      setTheme(stored);
      document.documentElement.setAttribute('data-theme', stored);
    }
  }, []);

  const toggle = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('df-theme', next);
  };

  return (
    <button
      onClick={toggle}
      aria-label={`Passer en mode ${theme === 'light' ? 'sombre' : 'clair'}`}
      style={{
        width: 40,
        height: 40,
        borderRadius: 'var(--df-radius-lg)',
        border: '1px solid var(--df-color-border-default)',
        backgroundColor: 'var(--df-color-surface-default)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.125rem',
        transition: 'all var(--df-transition-fast)',
        color: 'var(--df-color-text-default)',
      }}
    >
      {theme === 'light' ? '\u263D' : '\u2600'}
    </button>
  );
}

'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import React, { useState } from 'react';

interface NavSection {
  title: string;
  items: { label: string; href: string }[];
}

const navigation: NavSection[] = [
  {
    title: 'Demarrage',
    items: [
      { label: 'Introduction', href: '/' },
      { label: 'Installation', href: '/installation' },
    ],
  },
  {
    title: 'Fondations',
    items: [
      { label: 'Couleurs', href: '/fondations/couleurs' },
      { label: 'Typographie', href: '/fondations/typographie' },
      { label: 'Espacements', href: '/fondations/espacements' },
    ],
  },
  {
    title: 'Composants',
    items: [
      { label: 'Vue d\'ensemble', href: '/composants' },
      { label: 'Button', href: '/composants/button' },
      { label: 'Input', href: '/composants/input' },
      { label: 'Card', href: '/composants/card' },
      { label: 'Badge', href: '/composants/badge' },
      { label: 'Avatar', href: '/composants/avatar' },
      { label: 'Tag', href: '/composants/tag' },
      { label: 'Toggle', href: '/composants/toggle' },
      { label: 'Alert', href: '/composants/alert' },
      { label: 'Modal', href: '/composants/modal' },
      { label: 'Tabs', href: '/composants/tabs' },
      { label: 'Progress', href: '/composants/progress' },
      { label: 'Spinner', href: '/composants/spinner' },
      { label: 'Tooltip', href: '/composants/tooltip' },
      { label: 'Skeleton', href: '/composants/skeleton' },
      { label: 'Divider', href: '/composants/divider' },
    ],
  },
  {
    title: 'IA',
    items: [
      { label: 'Brand Voice — Awa', href: '/ia' },
    ],
  },
  {
    title: 'Marque',
    items: [
      { label: 'Logo', href: '/marque' },
      { label: 'Co-Branding', href: '/marque/co-branding' },
      { label: 'Interdits', href: '/marque/interdits' },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const toggle = (title: string) => {
    setCollapsed((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <aside
      style={{
        width: 'var(--sidebar-width)',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        overflowY: 'auto',
        borderRight: '1px solid var(--df-color-border-default)',
        backgroundColor: 'var(--df-color-surface-default)',
        padding: '1.5rem 0',
        zIndex: 100,
      }}
    >
      <Link
        href="/"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0 1.5rem',
          marginBottom: '2rem',
          textDecoration: 'none',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/digifemmes-design-system/logos/primary/digifemmes-logo-symbol.svg"
          alt="DigiFemmes"
          style={{
            width: 36,
            height: 36,
          }}
        />
        <div>
          <div
            style={{
              fontFamily: 'var(--df-font-display)',
              fontWeight: 700,
              fontSize: '0.9375rem',
              color: 'var(--df-color-text-default)',
              lineHeight: 1.2,
            }}
          >
            DigiFemmes
          </div>
          <div
            style={{
              fontSize: '0.6875rem',
              color: 'var(--df-color-text-subtle)',
              fontWeight: 500,
            }}
          >
            Design System
          </div>
        </div>
      </Link>

      <nav>
        {navigation.map((section) => (
          <div key={section.title} style={{ marginBottom: '0.5rem' }}>
            <button
              onClick={() => toggle(section.title)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                padding: '0.5rem 1.5rem',
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                fontSize: '0.6875rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: 'var(--df-color-text-subtle)',
                fontFamily: 'var(--df-font-body)',
              }}
            >
              {section.title}
              <span
                style={{
                  transform: collapsed[section.title] ? 'rotate(-90deg)' : 'rotate(0deg)',
                  transition: 'transform 150ms ease',
                  fontSize: '0.75rem',
                }}
              >
                &#9662;
              </span>
            </button>

            {!collapsed[section.title] && (
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {section.items.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        style={{
                          display: 'block',
                          padding: '0.375rem 1.5rem 0.375rem 2rem',
                          fontSize: '0.875rem',
                          color: isActive
                            ? 'var(--df-color-brand-primary)'
                            : 'var(--df-color-text-default)',
                          fontWeight: isActive ? 600 : 400,
                          textDecoration: 'none',
                          borderLeft: isActive
                            ? '2px solid var(--df-color-brand-primary)'
                            : '2px solid transparent',
                          backgroundColor: isActive
                            ? 'var(--df-color-surface-muted)'
                            : 'transparent',
                          transition: 'all var(--df-transition-fast)',
                        }}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}

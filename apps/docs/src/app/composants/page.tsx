import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Composants',
};

interface ComponentItem {
  name: string;
  description: string;
  href: string;
  ready: boolean;
}

const tiers: { title: string; description: string; items: ComponentItem[] }[] = [
  {
    title: 'Primitives',
    description: 'Composants atomiques de base, les briques fondamentales du design system.',
    items: [
      { name: 'Button', description: 'Bouton d\'action avec variantes et tailles', href: '/composants/button', ready: true },
      { name: 'Input', description: 'Champ de saisie avec label et validation', href: '/composants/input', ready: true },
      { name: 'Badge', description: 'Indicateur de statut ou compteur', href: '/composants/badge', ready: true },
      { name: 'Avatar', description: 'Photo de profil avec fallback initiales', href: '/composants/avatar', ready: true },
      { name: 'Tag', description: 'Etiquette removable', href: '/composants/tag', ready: true },
      { name: 'Toggle', description: 'Interrupteur on/off', href: '/composants/toggle', ready: true },
      { name: 'Spinner', description: 'Indicateur de chargement', href: '/composants/spinner', ready: true },
      { name: 'Skeleton', description: 'Placeholder de chargement', href: '/composants/skeleton', ready: true },
      { name: 'Divider', description: 'Separateur de contenu', href: '/composants/divider', ready: true },
    ],
  },
  {
    title: 'Composes',
    description: 'Composants assembles a partir de primitives, pour des cas d\'usage plus riches.',
    items: [
      { name: 'Card', description: 'Conteneur de contenu avec header/body/footer', href: '/composants/card', ready: true },
      { name: 'Alert', description: 'Message de feedback contextuel', href: '/composants/alert', ready: true },
      { name: 'Tooltip', description: 'Info-bulle au survol', href: '/composants/tooltip', ready: true },
      { name: 'Progress', description: 'Barre de progression', href: '/composants/progress', ready: true },
    ],
  },
  {
    title: 'Patterns',
    description: 'Composants de haut niveau orchestrant plusieurs composants pour des interactions complexes.',
    items: [
      { name: 'Modal', description: 'Fenetre de dialogue modale', href: '/composants/modal', ready: true },
      { name: 'Tabs', description: 'Navigation par onglets', href: '/composants/tabs', ready: true },
    ],
  },
];

export default function ComposantsPage() {
  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '3rem' }}>
        <div
          style={{
            display: 'inline-block',
            padding: '0.25rem 0.75rem',
            borderRadius: 'var(--df-radius-xl)',
            backgroundColor: 'rgba(18,184,223,0.1)',
            color: '#12B8DF',
            fontSize: '0.75rem',
            fontWeight: 600,
            marginBottom: '0.75rem',
          }}
        >
          Composants
        </div>
        <h1
          style={{
            fontFamily: 'var(--df-font-display)',
            fontSize: '2.5rem',
            fontWeight: 800,
            color: 'var(--df-color-text-default)',
            marginBottom: '0.75rem',
          }}
        >
          Vue d'ensemble
        </h1>
        <p style={{ fontSize: '1.0625rem', color: 'var(--df-color-text-subtle)', maxWidth: 600, lineHeight: 1.6 }}>
          Tous les composants React du design system DigiFemmes, organises par niveau de complexite. Accessibles, themables et multi-plateformes.
        </p>
      </div>

      {/* Stats bar */}
      <div
        style={{
          display: 'flex',
          gap: '1.5rem',
          marginBottom: '3rem',
          flexWrap: 'wrap',
        }}
      >
        {[
          { label: 'Total', count: 15 },
          { label: 'Primitives', count: 9 },
          { label: 'Composes', count: 4 },
          { label: 'Patterns', count: 2 },
        ].map((s) => (
          <div
            key={s.label}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              borderRadius: 'var(--df-radius-lg)',
              backgroundColor: 'var(--df-color-surface-muted)',
              border: '1px solid var(--df-color-border-default)',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--df-font-display)',
                fontWeight: 800,
                fontSize: '1.25rem',
                color: 'var(--df-color-brand-primary)',
              }}
            >
              {s.count}
            </span>
            <span style={{ fontSize: '0.8125rem', color: 'var(--df-color-text-subtle)', fontWeight: 500 }}>
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* Tiers */}
      {tiers.map((tier) => (
        <section key={tier.title} style={{ marginBottom: '3rem' }}>
          <h2
            style={{
              fontFamily: 'var(--df-font-display)',
              fontSize: '1.5rem',
              fontWeight: 700,
              color: 'var(--df-color-text-default)',
              marginBottom: '0.25rem',
            }}
          >
            {tier.title}
          </h2>
          <p style={{ fontSize: '0.9375rem', color: 'var(--df-color-text-subtle)', marginBottom: '1.25rem' }}>
            {tier.description}
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '1rem',
            }}
          >
            {tier.items.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '1.25rem 1.5rem',
                  backgroundColor: 'var(--df-color-surface-elevated)',
                  borderRadius: 'var(--df-radius-xl)',
                  border: '1px solid var(--df-color-border-default)',
                  textDecoration: 'none',
                  transition: 'all var(--df-transition-fast)',
                  boxShadow: 'var(--df-shadow-sm)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Top accent line */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    background: item.ready
                      ? 'linear-gradient(90deg, #FF7B00, #12B8DF)'
                      : 'var(--df-color-border-default)',
                  }}
                />

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <h3
                    style={{
                      fontFamily: 'var(--df-font-display)',
                      fontSize: '1.0625rem',
                      fontWeight: 700,
                      color: 'var(--df-color-text-default)',
                    }}
                  >
                    {item.name}
                  </h3>
                  <span
                    style={{
                      fontSize: '0.6875rem',
                      fontWeight: 600,
                      padding: '0.125rem 0.5rem',
                      borderRadius: 'var(--df-radius-xl)',
                      backgroundColor: item.ready ? 'rgba(0,149,120,0.1)' : 'rgba(158,158,158,0.1)',
                      color: item.ready ? '#009578' : 'var(--df-color-text-subtle)',
                    }}
                  >
                    {item.ready ? 'Pret' : 'Bientot'}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: '0.8125rem',
                    color: 'var(--df-color-text-subtle)',
                    lineHeight: 1.5,
                  }}
                >
                  {item.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

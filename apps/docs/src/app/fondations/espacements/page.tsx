import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Espacements',
};

const spacings = [
  { token: '0', rem: '0rem', px: '0px', value: 0 },
  { token: '1', rem: '0.25rem', px: '4px', value: 4 },
  { token: '2', rem: '0.5rem', px: '8px', value: 8 },
  { token: '3', rem: '0.75rem', px: '12px', value: 12 },
  { token: '4', rem: '1rem', px: '16px', value: 16 },
  { token: '5', rem: '1.25rem', px: '20px', value: 20 },
  { token: '6', rem: '1.5rem', px: '24px', value: 24 },
  { token: '8', rem: '2rem', px: '32px', value: 32 },
  { token: '10', rem: '2.5rem', px: '40px', value: 40 },
  { token: '12', rem: '3rem', px: '48px', value: 48 },
  { token: '16', rem: '4rem', px: '64px', value: 64 },
  { token: '20', rem: '5rem', px: '80px', value: 80 },
  { token: '24', rem: '6rem', px: '96px', value: 96 },
];

const radii = [
  { name: 'sm', value: '0.25rem', px: '4px', cssVar: '--df-radius-sm' },
  { name: 'md', value: '0.5rem', px: '8px', cssVar: '--df-radius-md' },
  { name: 'lg', value: '0.75rem', px: '12px', cssVar: '--df-radius-lg' },
  { name: 'xl', value: '1rem', px: '16px', cssVar: '--df-radius-xl' },
  { name: '2xl', value: '1.5rem', px: '24px', cssVar: '--df-radius-2xl' },
  { name: 'full', value: '9999px', px: 'circle', cssVar: '9999px' },
];

const shadows = [
  { name: 'sm', cssVar: 'var(--df-shadow-sm)', description: 'Elements subtils: boutons, inputs' },
  { name: 'md', cssVar: 'var(--df-shadow-md)', description: 'Cards, dropdowns, popovers' },
  { name: 'lg', cssVar: 'var(--df-shadow-lg)', description: 'Modals, overlays, elements flottants' },
];

export default function EspacementsPage() {
  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '3rem' }}>
        <div
          style={{
            display: 'inline-block',
            padding: '0.25rem 0.75rem',
            borderRadius: 'var(--df-radius-xl)',
            backgroundColor: 'rgba(255,123,0,0.1)',
            color: '#FF7B00',
            fontSize: '0.75rem',
            fontWeight: 600,
            marginBottom: '0.75rem',
          }}
        >
          Fondations
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
          Espacements
        </h1>
        <p style={{ fontSize: '1.0625rem', color: 'var(--df-color-text-subtle)', maxWidth: 600, lineHeight: 1.6 }}>
          Un systeme d'espacements base sur un multiple de 4px pour garantir cohesion et alignement sur toutes les interfaces DigiFemmes.
        </p>
      </div>

      {/* Spacing Scale */}
      <section style={{ marginBottom: '3rem' }}>
        <h2
          style={{
            fontFamily: 'var(--df-font-display)',
            fontSize: '1.5rem',
            fontWeight: 700,
            color: 'var(--df-color-text-default)',
            marginBottom: '0.5rem',
          }}
        >
          Echelle d'espacements
        </h2>
        <p style={{ fontSize: '0.9375rem', color: 'var(--df-color-text-subtle)', marginBottom: '1.5rem' }}>
          Chaque token correspond a un multiple de la base 4px.
        </p>
        <div
          style={{
            backgroundColor: 'var(--df-color-surface-elevated)',
            borderRadius: 'var(--df-radius-xl)',
            border: '1px solid var(--df-color-border-default)',
            overflow: 'hidden',
          }}
        >
          {spacings.map((s, i, arr) => (
            <div
              key={s.token}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '0.875rem 1.5rem',
                borderBottom: i < arr.length - 1 ? '1px solid var(--df-color-border-default)' : 'none',
              }}
            >
              <div
                style={{
                  width: 56,
                  flexShrink: 0,
                  fontFamily: 'var(--df-font-mono)',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  color: 'var(--df-color-brand-primary)',
                }}
              >
                space-{s.token}
              </div>
              <div
                style={{
                  width: 80,
                  flexShrink: 0,
                  display: 'flex',
                  gap: '0.375rem',
                  fontFamily: 'var(--df-font-mono)',
                  fontSize: '0.6875rem',
                  color: 'var(--df-color-text-subtle)',
                }}
              >
                <span>{s.rem}</span>
                <span style={{ color: 'var(--df-color-text-muted)' }}>|</span>
                <span>{s.px}</span>
              </div>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                <div
                  style={{
                    height: 20,
                    width: Math.max(s.value * 1.5, 2),
                    background: 'linear-gradient(90deg, #FF7B00, #12B8DF)',
                    borderRadius: 'var(--df-radius-sm)',
                    transition: 'width 300ms ease',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Visual example */}
      <section style={{ marginBottom: '3rem' }}>
        <h2
          style={{
            fontFamily: 'var(--df-font-display)',
            fontSize: '1.5rem',
            fontWeight: 700,
            color: 'var(--df-color-text-default)',
            marginBottom: '0.5rem',
          }}
        >
          Exemple visuel
        </h2>
        <p style={{ fontSize: '0.9375rem', color: 'var(--df-color-text-subtle)', marginBottom: '1.5rem' }}>
          Comment les espacements s'appliquent dans un composant Card.
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1.5rem',
          }}
        >
          <div
            style={{
              backgroundColor: 'var(--df-color-surface-elevated)',
              borderRadius: 'var(--df-radius-xl)',
              border: '1px solid var(--df-color-border-default)',
              padding: '1.5rem',
              position: 'relative',
            }}
          >
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--df-color-text-subtle)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Compact (space-3, space-4)
            </div>
            <div
              style={{
                backgroundColor: 'var(--df-color-surface-muted)',
                borderRadius: 'var(--df-radius-lg)',
                padding: '0.75rem 1rem',
              }}
            >
              <div style={{ fontWeight: 600, fontSize: '0.9375rem', marginBottom: '0.5rem' }}>Titre</div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--df-color-text-subtle)' }}>Contenu compact</div>
            </div>
          </div>
          <div
            style={{
              backgroundColor: 'var(--df-color-surface-elevated)',
              borderRadius: 'var(--df-radius-xl)',
              border: '1px solid var(--df-color-border-default)',
              padding: '1.5rem',
            }}
          >
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--df-color-text-subtle)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Spacieux (space-6, space-8)
            </div>
            <div
              style={{
                backgroundColor: 'var(--df-color-surface-muted)',
                borderRadius: 'var(--df-radius-lg)',
                padding: '1.5rem 2rem',
              }}
            >
              <div style={{ fontWeight: 600, fontSize: '0.9375rem', marginBottom: '1rem' }}>Titre</div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--df-color-text-subtle)' }}>Contenu avec plus d'espace</div>
            </div>
          </div>
        </div>
      </section>

      {/* Border Radius */}
      <section style={{ marginBottom: '3rem' }}>
        <h2
          style={{
            fontFamily: 'var(--df-font-display)',
            fontSize: '1.5rem',
            fontWeight: 700,
            color: 'var(--df-color-text-default)',
            marginBottom: '0.5rem',
          }}
        >
          Border Radius
        </h2>
        <p style={{ fontSize: '0.9375rem', color: 'var(--df-color-text-subtle)', marginBottom: '1.5rem' }}>
          Des coins arrondis pour adoucir les interfaces et renforcer l'identite DigiFemmes.
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
            gap: '1rem',
          }}
        >
          {radii.map((r) => (
            <div
              key={r.name}
              style={{
                backgroundColor: 'var(--df-color-surface-elevated)',
                borderRadius: 'var(--df-radius-lg)',
                border: '1px solid var(--df-color-border-default)',
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.75rem',
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  backgroundColor: 'var(--df-color-brand-primary)',
                  borderRadius: r.name === 'full' ? '9999px' : r.value,
                  opacity: 0.85,
                }}
              />
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--df-font-mono)', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--df-color-text-default)' }}>
                  {r.name}
                </div>
                <div style={{ fontFamily: 'var(--df-font-mono)', fontSize: '0.6875rem', color: 'var(--df-color-text-subtle)', marginTop: '0.125rem' }}>
                  {r.value}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Shadows */}
      <section>
        <h2
          style={{
            fontFamily: 'var(--df-font-display)',
            fontSize: '1.5rem',
            fontWeight: 700,
            color: 'var(--df-color-text-default)',
            marginBottom: '0.5rem',
          }}
        >
          Ombres (Shadows)
        </h2>
        <p style={{ fontSize: '0.9375rem', color: 'var(--df-color-text-subtle)', marginBottom: '1.5rem' }}>
          Trois niveaux d'elevation pour creer de la profondeur.
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem',
          }}
        >
          {shadows.map((s) => (
            <div
              key={s.name}
              style={{
                backgroundColor: 'var(--df-color-surface-elevated)',
                borderRadius: 'var(--df-radius-xl)',
                padding: '2rem 1.5rem',
                boxShadow: s.cssVar,
                border: '1px solid var(--df-color-border-default)',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--df-font-display)',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: 'var(--df-color-text-default)',
                  marginBottom: '0.25rem',
                }}
              >
                shadow-{s.name}
              </div>
              <div
                style={{
                  fontFamily: 'var(--df-font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--df-color-brand-secondary)',
                  fontWeight: 500,
                  marginBottom: '0.75rem',
                }}
              >
                --df-shadow-{s.name}
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--df-color-text-subtle)', lineHeight: 1.5 }}>
                {s.description}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';

const variants = [
  {
    name: 'primary',
    bg: '#FF7B00',
    color: 'white',
    hoverBg: '#E56D00',
    border: 'none',
  },
  {
    name: 'secondary',
    bg: 'transparent',
    color: '#FF7B00',
    hoverBg: 'rgba(255,123,0,0.08)',
    border: '1.5px solid #FF7B00',
  },
  {
    name: 'ghost',
    bg: 'transparent',
    color: 'var(--df-color-text-default)',
    hoverBg: 'var(--df-color-surface-muted)',
    border: 'none',
  },
  {
    name: 'danger',
    bg: '#DC2626',
    color: 'white',
    hoverBg: '#B91C1C',
    border: 'none',
  },
];

const sizeMap = {
  sm: { padding: '0.375rem 0.75rem', fontSize: '0.8125rem' },
  md: { padding: '0.625rem 1.25rem', fontSize: '0.875rem' },
  lg: { padding: '0.875rem 1.75rem', fontSize: '1rem' },
};

const propsList = [
  { name: 'variant', type: '"primary" | "secondary" | "ghost" | "danger"', default: '"primary"', description: 'Style visuel du bouton' },
  { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Taille du bouton' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Desactive le bouton' },
  { name: 'loading', type: 'boolean', default: 'false', description: 'Affiche un spinner et desactive le bouton' },
  { name: 'href', type: 'string', default: '-', description: 'Si defini, rend un lien <a> au lieu d\'un <button>' },
  { name: 'onClick', type: '() => void', default: '-', description: 'Callback au clic' },
  { name: 'type', type: '"button" | "submit" | "reset"', default: '"button"', description: 'Type HTML du bouton' },
  { name: 'children', type: 'ReactNode', default: '-', description: 'Contenu du bouton' },
  { name: 'className', type: 'string', default: '-', description: 'Classes CSS additionnelles' },
];

function SpinnerIcon() {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((r) => (r + 30) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <span
      style={{
        width: 14,
        height: 14,
        border: '2px solid currentColor',
        borderTopColor: 'transparent',
        borderRadius: '50%',
        display: 'inline-block',
        transform: `rotate(${rotation}deg)`,
      }}
    />
  );
}

function DemoButton({
  variant,
  size = 'md',
  disabled = false,
  loading = false,
  children,
}: {
  variant: typeof variants[number];
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}) {
  const s = sizeMap[size];
  return (
    <button
      disabled={disabled || loading}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        padding: s.padding,
        fontSize: s.fontSize,
        fontWeight: 600,
        fontFamily: 'var(--df-font-body)',
        borderRadius: 'var(--df-radius-lg)',
        border: variant.border,
        backgroundColor: disabled ? 'var(--df-color-surface-muted)' : variant.bg,
        color: disabled ? 'var(--df-color-text-muted)' : variant.color,
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all var(--df-transition-fast)',
        opacity: loading ? 0.7 : 1,
        lineHeight: 1.4,
      }}
    >
      {loading && <SpinnerIcon />}
      {children}
    </button>
  );
}

export default function ButtonPage() {
  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <div
            style={{
              display: 'inline-block',
              padding: '0.25rem 0.75rem',
              borderRadius: 'var(--df-radius-xl)',
              backgroundColor: 'rgba(18,184,223,0.1)',
              color: '#12B8DF',
              fontSize: '0.75rem',
              fontWeight: 600,
            }}
          >
            Composant
          </div>
          <div
            style={{
              display: 'inline-block',
              padding: '0.25rem 0.75rem',
              borderRadius: 'var(--df-radius-xl)',
              backgroundColor: 'rgba(0,149,120,0.1)',
              color: '#009578',
              fontSize: '0.75rem',
              fontWeight: 600,
            }}
          >
            Pret
          </div>
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
          Button
        </h1>
        <p style={{ fontSize: '1.0625rem', color: 'var(--df-color-text-subtle)', maxWidth: 600, lineHeight: 1.6 }}>
          Le bouton est l'element d'action principal de l'interface. Il existe en 4 variantes et 3 tailles pour couvrir tous les cas d'usage.
        </p>
      </div>

      {/* Live Preview */}
      <section style={{ marginBottom: '3rem' }}>
        <h2
          style={{
            fontFamily: 'var(--df-font-display)',
            fontSize: '1.5rem',
            fontWeight: 700,
            color: 'var(--df-color-text-default)',
            marginBottom: '1rem',
          }}
        >
          Variantes
        </h2>
        <div
          style={{
            backgroundColor: 'var(--df-color-surface-elevated)',
            borderRadius: 'var(--df-radius-xl)',
            border: '1px solid var(--df-color-border-default)',
            padding: '2rem',
          }}
        >
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            {variants.map((v) => (
              <DemoButton key={v.name} variant={v}>
                {v.name.charAt(0).toUpperCase() + v.name.slice(1)}
              </DemoButton>
            ))}
          </div>

          <div style={{ borderTop: '1px solid var(--df-color-border-default)', paddingTop: '1.5rem' }}>
            <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--df-color-text-subtle)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Tailles
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
              {(['sm', 'md', 'lg'] as const).map((size) => (
                <DemoButton key={size} variant={variants[0]} size={size}>
                  Size {size}
                </DemoButton>
              ))}
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--df-color-border-default)', paddingTop: '1.5rem', marginTop: '1.5rem' }}>
            <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--df-color-text-subtle)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Etats
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <DemoButton variant={variants[0]}>Normal</DemoButton>
              <DemoButton variant={variants[0]} disabled>Disabled</DemoButton>
              <DemoButton variant={variants[0]} loading>Loading</DemoButton>
            </div>
          </div>
        </div>
      </section>

      {/* Props Table */}
      <section style={{ marginBottom: '3rem' }}>
        <h2
          style={{
            fontFamily: 'var(--df-font-display)',
            fontSize: '1.5rem',
            fontWeight: 700,
            color: 'var(--df-color-text-default)',
            marginBottom: '1rem',
          }}
        >
          Props
        </h2>
        <div
          style={{
            backgroundColor: 'var(--df-color-surface-elevated)',
            borderRadius: 'var(--df-radius-xl)',
            border: '1px solid var(--df-color-border-default)',
            overflow: 'hidden',
          }}
        >
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--df-color-surface-muted)' }}>
                {['Prop', 'Type', 'Default', 'Description'].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: '0.75rem 1rem',
                      textAlign: 'left',
                      fontWeight: 600,
                      color: 'var(--df-color-text-default)',
                      borderBottom: '1px solid var(--df-color-border-default)',
                      fontSize: '0.8125rem',
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {propsList.map((p, i, arr) => (
                <tr key={p.name}>
                  <td
                    style={{
                      padding: '0.75rem 1rem',
                      fontFamily: 'var(--df-font-mono)',
                      fontWeight: 600,
                      color: 'var(--df-color-brand-primary)',
                      borderBottom: i < arr.length - 1 ? '1px solid var(--df-color-border-default)' : 'none',
                    }}
                  >
                    {p.name}
                  </td>
                  <td
                    style={{
                      padding: '0.75rem 1rem',
                      fontFamily: 'var(--df-font-mono)',
                      fontSize: '0.75rem',
                      color: 'var(--df-color-text-subtle)',
                      borderBottom: i < arr.length - 1 ? '1px solid var(--df-color-border-default)' : 'none',
                    }}
                  >
                    {p.type}
                  </td>
                  <td
                    style={{
                      padding: '0.75rem 1rem',
                      fontFamily: 'var(--df-font-mono)',
                      fontSize: '0.75rem',
                      color: 'var(--df-color-text-subtle)',
                      borderBottom: i < arr.length - 1 ? '1px solid var(--df-color-border-default)' : 'none',
                    }}
                  >
                    {p.default}
                  </td>
                  <td
                    style={{
                      padding: '0.75rem 1rem',
                      color: 'var(--df-color-text-default)',
                      borderBottom: i < arr.length - 1 ? '1px solid var(--df-color-border-default)' : 'none',
                    }}
                  >
                    {p.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Code Example */}
      <section style={{ marginBottom: '3rem' }}>
        <h2
          style={{
            fontFamily: 'var(--df-font-display)',
            fontSize: '1.5rem',
            fontWeight: 700,
            color: 'var(--df-color-text-default)',
            marginBottom: '1rem',
          }}
        >
          Exemple d'utilisation
        </h2>
        <pre
          style={{
            backgroundColor: 'var(--df-color-surface-muted)',
            borderRadius: 'var(--df-radius-lg)',
            padding: '1.25rem 1.5rem',
            fontFamily: 'var(--df-font-mono)',
            fontSize: '0.8125rem',
            lineHeight: 1.7,
            color: 'var(--df-color-text-default)',
            border: '1px solid var(--df-color-border-default)',
            overflowX: 'auto',
          }}
        >
{`import { Button } from '@digifemmes/ui';

// Bouton principal
<Button variant="primary" size="md" onClick={handleClick}>
  Envoyer
</Button>

// Bouton secondaire
<Button variant="secondary" size="sm">
  Annuler
</Button>

// Bouton danger avec loading
<Button variant="danger" loading>
  Supprimer
</Button>

// Bouton lien
<Button variant="ghost" href="/about">
  En savoir plus
</Button>`}
        </pre>
      </section>

      {/* Do / Don't */}
      <section>
        <h2
          style={{
            fontFamily: 'var(--df-font-display)',
            fontSize: '1.5rem',
            fontWeight: 700,
            color: 'var(--df-color-text-default)',
            marginBottom: '1rem',
          }}
        >
          Bonnes pratiques
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          {/* Do */}
          <div
            style={{
              backgroundColor: 'var(--df-color-surface-elevated)',
              borderRadius: 'var(--df-radius-xl)',
              border: '2px solid #009578',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                backgroundColor: 'rgba(0,149,120,0.08)',
                padding: '0.75rem 1.25rem',
                fontWeight: 700,
                fontSize: '0.875rem',
                color: '#009578',
                borderBottom: '1px solid rgba(0,149,120,0.15)',
              }}
            >
              A faire
            </div>
            <ul
              style={{
                padding: '1rem 1.25rem 1rem 2rem',
                fontSize: '0.8125rem',
                color: 'var(--df-color-text-default)',
                lineHeight: 1.8,
                listStyleType: 'disc',
              }}
            >
              <li>Utiliser un texte d'action clair (Envoyer, Confirmer, Sauvegarder)</li>
              <li>Un seul bouton primary par vue</li>
              <li>Utiliser loading pendant les actions asynchrones</li>
              <li>Garder les labels courts (2-3 mots max)</li>
              <li>Associer une icone pour renforcer l'intention</li>
            </ul>
          </div>

          {/* Don't */}
          <div
            style={{
              backgroundColor: 'var(--df-color-surface-elevated)',
              borderRadius: 'var(--df-radius-xl)',
              border: '2px solid #DC2626',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                backgroundColor: 'rgba(220,38,38,0.08)',
                padding: '0.75rem 1.25rem',
                fontWeight: 700,
                fontSize: '0.875rem',
                color: '#DC2626',
                borderBottom: '1px solid rgba(220,38,38,0.15)',
              }}
            >
              A eviter
            </div>
            <ul
              style={{
                padding: '1rem 1.25rem 1rem 2rem',
                fontSize: '0.8125rem',
                color: 'var(--df-color-text-default)',
                lineHeight: 1.8,
                listStyleType: 'disc',
              }}
            >
              <li>Plusieurs boutons primary cote a cote</li>
              <li>Textes vagues : &ldquo;Cliquer ici&rdquo;, &ldquo;OK&rdquo;</li>
              <li>Bouton disabled sans explication</li>
              <li>Utiliser danger pour des actions non-destructrices</li>
              <li>Bouton trop large sans raison de mise en page</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

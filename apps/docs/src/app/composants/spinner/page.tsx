'use client';

import { useState, useEffect } from 'react';

const sizes = [
  { name: 'sm', dim: '1rem', border: '2px' },
  { name: 'md', dim: '1.5rem', border: '2.5px' },
  { name: 'lg', dim: '2.5rem', border: '3px' },
];

const propsList = [
  { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Diametre du spinner' },
  { name: 'color', type: 'string', default: 'brand-primary', description: 'Couleur personnalisee du spinner' },
  { name: 'className', type: 'string', default: '-', description: 'Classes CSS additionnelles' },
  { name: 'style', type: 'CSSProperties', default: '-', description: 'Styles inline additionnels' },
];

function DemoSpinner({ size, color }: { size: typeof sizes[number]; color?: string }) {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((r) => (r + 12) % 360);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <span
      role="status"
      aria-label="Chargement"
      style={{
        display: 'inline-block',
        width: size.dim,
        height: size.dim,
        border: `${size.border} solid var(--df-color-border-default)`,
        borderTopColor: color || '#FF7B00',
        borderRadius: '50%',
        transform: `rotate(${rotation}deg)`,
        flexShrink: 0,
      }}
    />
  );
}

export default function SpinnerPage() {
  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <div style={{ display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: 'var(--df-radius-xl)', backgroundColor: 'rgba(18,184,223,0.1)', color: '#12B8DF', fontSize: '0.75rem', fontWeight: 600 }}>Composant</div>
          <div style={{ display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: 'var(--df-radius-xl)', backgroundColor: 'rgba(0,149,120,0.1)', color: '#009578', fontSize: '0.75rem', fontWeight: 600 }}>Pret</div>
        </div>
        <h1 style={{ fontFamily: 'var(--df-font-display)', fontSize: '2.5rem', fontWeight: 800, color: 'var(--df-color-text-default)', marginBottom: '0.75rem' }}>Spinner</h1>
        <p style={{ fontSize: '1.0625rem', color: 'var(--df-color-text-subtle)', maxWidth: 600, lineHeight: 1.6 }}>
          Le Spinner est un indicateur de chargement anime. Il signale aux utilisatrices qu&apos;une operation est en cours. Disponible en 3 tailles avec couleur personnalisable.
        </p>
      </div>

      {/* Live Preview */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontFamily: 'var(--df-font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--df-color-text-default)', marginBottom: '1rem' }}>Tailles</h2>
        <div style={{ backgroundColor: 'var(--df-color-surface-elevated)', borderRadius: 'var(--df-radius-xl)', border: '1px solid var(--df-color-border-default)', padding: '2rem' }}>
          <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}>
            {sizes.map((s) => (
              <div key={s.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
                <DemoSpinner size={s} />
                <span style={{ fontFamily: 'var(--df-font-mono)', fontSize: '0.75rem', color: 'var(--df-color-text-subtle)' }}>{s.name}</span>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid var(--df-color-border-default)', paddingTop: '1.5rem' }}>
            <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--df-color-text-subtle)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Couleurs personnalisees</div>
            <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <DemoSpinner size={sizes[1]} color="#FF7B00" />
                <span style={{ fontSize: '0.75rem', color: 'var(--df-color-text-subtle)' }}>Primary</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <DemoSpinner size={sizes[1]} color="#12B8DF" />
                <span style={{ fontSize: '0.75rem', color: 'var(--df-color-text-subtle)' }}>Secondary</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <DemoSpinner size={sizes[1]} color="#009578" />
                <span style={{ fontSize: '0.75rem', color: 'var(--df-color-text-subtle)' }}>Success</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <DemoSpinner size={sizes[1]} color="#DC2626" />
                <span style={{ fontSize: '0.75rem', color: 'var(--df-color-text-subtle)' }}>Error</span>
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--df-color-border-default)', paddingTop: '1.5rem', marginTop: '1.5rem' }}>
            <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--df-color-text-subtle)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Spinner dans un bouton</div>
            <button
              disabled
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.625rem 1.25rem',
                fontSize: '0.875rem',
                fontWeight: 600,
                fontFamily: 'var(--df-font-body)',
                borderRadius: 'var(--df-radius-lg)',
                border: 'none',
                backgroundColor: '#FF7B00',
                color: 'white',
                opacity: 0.7,
                cursor: 'not-allowed',
              }}
            >
              <DemoSpinner size={{ name: 'xs', dim: '0.875rem', border: '2px' }} color="white" />
              Chargement...
            </button>
          </div>
        </div>
      </section>

      {/* Props Table */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontFamily: 'var(--df-font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--df-color-text-default)', marginBottom: '1rem' }}>Props</h2>
        <div style={{ backgroundColor: 'var(--df-color-surface-elevated)', borderRadius: 'var(--df-radius-xl)', border: '1px solid var(--df-color-border-default)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--df-color-surface-muted)' }}>
                {['Propriete', 'Type', 'Defaut', 'Description'].map((h) => (
                  <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600, color: 'var(--df-color-text-default)', borderBottom: '1px solid var(--df-color-border-default)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {propsList.map((p, i, arr) => (
                <tr key={p.name}>
                  <td style={{ padding: '0.75rem 1rem', fontFamily: 'var(--df-font-mono)', fontWeight: 600, color: 'var(--df-color-brand-primary)', borderBottom: i < arr.length - 1 ? '1px solid var(--df-color-border-default)' : 'none' }}>{p.name}</td>
                  <td style={{ padding: '0.75rem 1rem', fontFamily: 'var(--df-font-mono)', fontSize: '0.75rem', color: 'var(--df-color-text-subtle)', borderBottom: i < arr.length - 1 ? '1px solid var(--df-color-border-default)' : 'none' }}>{p.type}</td>
                  <td style={{ padding: '0.75rem 1rem', fontFamily: 'var(--df-font-mono)', fontSize: '0.75rem', color: 'var(--df-color-text-subtle)', borderBottom: i < arr.length - 1 ? '1px solid var(--df-color-border-default)' : 'none' }}>{p.default}</td>
                  <td style={{ padding: '0.75rem 1rem', color: 'var(--df-color-text-default)', borderBottom: i < arr.length - 1 ? '1px solid var(--df-color-border-default)' : 'none' }}>{p.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Code Example */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontFamily: 'var(--df-font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--df-color-text-default)', marginBottom: '1rem' }}>Exemple d&apos;utilisation</h2>
        <pre style={{ backgroundColor: 'var(--df-color-surface-muted)', borderRadius: 'var(--df-radius-lg)', padding: '1.25rem 1.5rem', fontFamily: 'var(--df-font-mono)', fontSize: '0.8125rem', lineHeight: 1.7, color: 'var(--df-color-text-default)', border: '1px solid var(--df-color-border-default)', overflowX: 'auto' }}>
{`import { Spinner, Button } from '@digifemmes/ui';

// Spinner simple
<Spinner size="md" />

// Spinner avec couleur custom
<Spinner size="lg" color="#12B8DF" />

// Spinner dans un bouton loading
<Button variant="primary" loading>
  Enregistrement...
</Button>

// Spinner centré dans une zone de chargement
<div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
  <Spinner size="lg" />
</div>`}
        </pre>
      </section>

      {/* Do / Don't */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontFamily: 'var(--df-font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--df-color-text-default)', marginBottom: '1rem' }}>Bonnes pratiques</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div style={{ backgroundColor: 'var(--df-color-surface-elevated)', borderRadius: 'var(--df-radius-xl)', border: '2px solid #009578', overflow: 'hidden' }}>
            <div style={{ backgroundColor: 'rgba(0,149,120,0.08)', padding: '0.75rem 1.25rem', fontWeight: 700, fontSize: '0.875rem', color: '#009578', borderBottom: '1px solid rgba(0,149,120,0.15)' }}>A faire</div>
            <ul style={{ padding: '1rem 1.25rem 1rem 2rem', fontSize: '0.8125rem', color: 'var(--df-color-text-default)', lineHeight: 1.8, listStyleType: 'disc' }}>
              <li>Accompagner le spinner d&apos;un texte explicatif</li>
              <li>Centrer le spinner dans la zone de chargement</li>
              <li>Utiliser size=&quot;sm&quot; dans les boutons et inline</li>
              <li>Preferer Skeleton pour le chargement initial d&apos;une page</li>
            </ul>
          </div>
          <div style={{ backgroundColor: 'var(--df-color-surface-elevated)', borderRadius: 'var(--df-radius-xl)', border: '2px solid #DC2626', overflow: 'hidden' }}>
            <div style={{ backgroundColor: 'rgba(220,38,38,0.08)', padding: '0.75rem 1.25rem', fontWeight: 700, fontSize: '0.875rem', color: '#DC2626', borderBottom: '1px solid rgba(220,38,38,0.15)' }}>A eviter</div>
            <ul style={{ padding: '1rem 1.25rem 1rem 2rem', fontSize: '0.8125rem', color: 'var(--df-color-text-default)', lineHeight: 1.8, listStyleType: 'disc' }}>
              <li>Spinner sans indication de ce qui charge</li>
              <li>Plusieurs spinners visibles en meme temps</li>
              <li>Spinner pour des operations de moins de 300ms</li>
              <li>Spinner trop grand par rapport au contexte</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Accessibilite */}
      <section>
        <h2 style={{ fontFamily: 'var(--df-font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--df-color-text-default)', marginBottom: '1rem' }}>Accessibilite</h2>
        <div style={{ backgroundColor: 'var(--df-color-surface-elevated)', borderRadius: 'var(--df-radius-xl)', border: '1px solid var(--df-color-border-default)', padding: '1.5rem' }}>
          <ul style={{ fontSize: '0.875rem', color: 'var(--df-color-text-default)', lineHeight: 1.8, listStyleType: 'disc', paddingLeft: '1.25rem' }}>
            <li>Le composant utilise <code style={{ fontFamily: 'var(--df-font-mono)', fontSize: '0.8125rem', backgroundColor: 'var(--df-color-surface-muted)', padding: '0.125rem 0.375rem', borderRadius: 'var(--df-radius-sm)' }}>role=&quot;status&quot;</code> et <code style={{ fontFamily: 'var(--df-font-mono)', fontSize: '0.8125rem', backgroundColor: 'var(--df-color-surface-muted)', padding: '0.125rem 0.375rem', borderRadius: 'var(--df-radius-sm)' }}>aria-label=&quot;Loading&quot;</code>.</li>
            <li>Un texte masque visuellement (&laquo; Loading... &raquo;) est inclus pour les lecteurs d&apos;ecran.</li>
            <li>L&apos;animation CSS est legere et n&apos;utilise pas de clignotement agressif.</li>
            <li>Respecte la preference <code style={{ fontFamily: 'var(--df-font-mono)', fontSize: '0.8125rem', backgroundColor: 'var(--df-color-surface-muted)', padding: '0.125rem 0.375rem', borderRadius: 'var(--df-radius-sm)' }}>prefers-reduced-motion</code> via les CSS du theme.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

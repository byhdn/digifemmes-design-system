'use client';

import { useState, useEffect } from 'react';

const propsList = [
  { name: 'variant', type: '"text" | "circular" | "rectangular"', default: '"text"', description: 'Forme du placeholder' },
  { name: 'width', type: 'string | number', default: 'auto', description: 'Largeur (valeur CSS ou pixels)' },
  { name: 'height', type: 'string | number', default: 'auto', description: 'Hauteur (valeur CSS ou pixels)' },
  { name: 'animation', type: '"pulse" | "wave"', default: '"pulse"', description: 'Type d\'animation de chargement' },
  { name: 'className', type: 'string', default: '-', description: 'Classes CSS additionnelles' },
  { name: 'style', type: 'CSSProperties', default: '-', description: 'Styles inline additionnels' },
];

function DemoSkeleton({ variant = 'text', width, height, animation = 'pulse' }: { variant?: 'text' | 'circular' | 'rectangular'; width?: string; height?: string; animation?: 'pulse' | 'wave' }) {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    if (animation !== 'pulse') return;
    const interval = setInterval(() => {
      setOpacity((o) => (o === 1 ? 0.4 : 1));
    }, 900);
    return () => clearInterval(interval);
  }, [animation]);

  const defaults = {
    text: { w: '100%', h: '1em', br: 'var(--df-radius-sm)' },
    circular: { w: '2.5rem', h: '2.5rem', br: '50%' },
    rectangular: { w: '100%', h: '8rem', br: 'var(--df-radius-md)' },
  };

  const d = defaults[variant];

  return (
    <span
      aria-hidden="true"
      style={{
        display: 'block',
        width: width || d.w,
        height: height || d.h,
        borderRadius: d.br,
        backgroundColor: 'var(--df-color-surface-muted)',
        opacity: animation === 'pulse' ? opacity : 1,
        transition: animation === 'pulse' ? 'opacity 0.9s ease-in-out' : 'none',
        background: animation === 'wave'
          ? 'linear-gradient(90deg, var(--df-color-surface-muted) 25%, var(--df-color-border-default) 50%, var(--df-color-surface-muted) 75%)'
          : undefined,
        backgroundSize: animation === 'wave' ? '200% 100%' : undefined,
      }}
    />
  );
}

export default function SkeletonPage() {
  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <div style={{ display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: 'var(--df-radius-xl)', backgroundColor: 'rgba(18,184,223,0.1)', color: '#12B8DF', fontSize: '0.75rem', fontWeight: 600 }}>Composant</div>
          <div style={{ display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: 'var(--df-radius-xl)', backgroundColor: 'rgba(0,149,120,0.1)', color: '#009578', fontSize: '0.75rem', fontWeight: 600 }}>Pret</div>
        </div>
        <h1 style={{ fontFamily: 'var(--df-font-display)', fontSize: '2.5rem', fontWeight: 800, color: 'var(--df-color-text-default)', marginBottom: '0.75rem' }}>Skeleton</h1>
        <p style={{ fontSize: '1.0625rem', color: 'var(--df-color-text-subtle)', maxWidth: 600, lineHeight: 1.6 }}>
          Le Skeleton est un placeholder anime qui represente le contenu en cours de chargement. Il reduit la perception de temps d&apos;attente en affichant la structure attendue de la page.
        </p>
      </div>

      {/* Live Preview */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontFamily: 'var(--df-font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--df-color-text-default)', marginBottom: '1rem' }}>Variantes</h2>
        <div style={{ backgroundColor: 'var(--df-color-surface-elevated)', borderRadius: 'var(--df-radius-xl)', border: '1px solid var(--df-color-border-default)', padding: '2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginBottom: '2rem' }}>
            <div>
              <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--df-color-text-subtle)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Text</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <DemoSkeleton variant="text" width="100%" height="1rem" />
                <DemoSkeleton variant="text" width="80%" height="1rem" />
                <DemoSkeleton variant="text" width="60%" height="1rem" />
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--df-color-text-subtle)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Circular</div>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <DemoSkeleton variant="circular" width="2rem" height="2rem" />
                <DemoSkeleton variant="circular" width="2.5rem" height="2.5rem" />
                <DemoSkeleton variant="circular" width="3rem" height="3rem" />
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--df-color-text-subtle)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Rectangular</div>
              <DemoSkeleton variant="rectangular" width="100%" height="6rem" />
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--df-color-border-default)', paddingTop: '1.5rem' }}>
            <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--df-color-text-subtle)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Exemple : carte de profil en chargement</div>
            <div style={{ backgroundColor: 'var(--df-color-surface-default)', borderRadius: 'var(--df-radius-xl)', border: '1px solid var(--df-color-border-default)', padding: '1.5rem', maxWidth: 320 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <DemoSkeleton variant="circular" width="3rem" height="3rem" />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <DemoSkeleton variant="text" width="60%" height="0.875rem" />
                  <DemoSkeleton variant="text" width="40%" height="0.75rem" />
                </div>
              </div>
              <DemoSkeleton variant="rectangular" width="100%" height="4rem" />
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                <DemoSkeleton variant="text" width="5rem" height="2rem" />
                <DemoSkeleton variant="text" width="5rem" height="2rem" />
              </div>
            </div>
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
{`import { Skeleton } from '@digifemmes/ui';

// Placeholder de texte
<Skeleton variant="text" width="80%" />

// Placeholder d'avatar
<Skeleton variant="circular" width="3rem" height="3rem" />

// Placeholder d'image
<Skeleton variant="rectangular" width="100%" height="200px" />

// Carte de profil en chargement
function ProfileCardSkeleton() {
  return (
    <Card>
      <Card.Body>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Skeleton variant="circular" width="3rem" height="3rem" />
          <div style={{ flex: 1 }}>
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="text" width="40%" />
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}`}
        </pre>
      </section>

      {/* Do / Don't */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontFamily: 'var(--df-font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--df-color-text-default)', marginBottom: '1rem' }}>Bonnes pratiques</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div style={{ backgroundColor: 'var(--df-color-surface-elevated)', borderRadius: 'var(--df-radius-xl)', border: '2px solid #009578', overflow: 'hidden' }}>
            <div style={{ backgroundColor: 'rgba(0,149,120,0.08)', padding: '0.75rem 1.25rem', fontWeight: 700, fontSize: '0.875rem', color: '#009578', borderBottom: '1px solid rgba(0,149,120,0.15)' }}>A faire</div>
            <ul style={{ padding: '1rem 1.25rem 1rem 2rem', fontSize: '0.8125rem', color: 'var(--df-color-text-default)', lineHeight: 1.8, listStyleType: 'disc' }}>
              <li>Reproduire la mise en page attendue avec les skeletons</li>
              <li>Utiliser circular pour les avatars, text pour les lignes</li>
              <li>Preferer Skeleton a Spinner pour le chargement initial</li>
              <li>Animer avec pulse pour un rendu subtil</li>
            </ul>
          </div>
          <div style={{ backgroundColor: 'var(--df-color-surface-elevated)', borderRadius: 'var(--df-radius-xl)', border: '2px solid #DC2626', overflow: 'hidden' }}>
            <div style={{ backgroundColor: 'rgba(220,38,38,0.08)', padding: '0.75rem 1.25rem', fontWeight: 700, fontSize: '0.875rem', color: '#DC2626', borderBottom: '1px solid rgba(220,38,38,0.15)' }}>A eviter</div>
            <ul style={{ padding: '1rem 1.25rem 1rem 2rem', fontSize: '0.8125rem', color: 'var(--df-color-text-default)', lineHeight: 1.8, listStyleType: 'disc' }}>
              <li>Skeleton qui ne correspond pas a la mise en page reelle</li>
              <li>Trop de skeletons differents sur une page</li>
              <li>Skeleton pour des actions rapides (&lt;300ms)</li>
              <li>Utiliser Skeleton pour un chargement de type soumission (utiliser Spinner)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Accessibilite */}
      <section>
        <h2 style={{ fontFamily: 'var(--df-font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--df-color-text-default)', marginBottom: '1rem' }}>Accessibilite</h2>
        <div style={{ backgroundColor: 'var(--df-color-surface-elevated)', borderRadius: 'var(--df-radius-xl)', border: '1px solid var(--df-color-border-default)', padding: '1.5rem' }}>
          <ul style={{ fontSize: '0.875rem', color: 'var(--df-color-text-default)', lineHeight: 1.8, listStyleType: 'disc', paddingLeft: '1.25rem' }}>
            <li>Le composant utilise <code style={{ fontFamily: 'var(--df-font-mono)', fontSize: '0.8125rem', backgroundColor: 'var(--df-color-surface-muted)', padding: '0.125rem 0.375rem', borderRadius: 'var(--df-radius-sm)' }}>aria-hidden=&quot;true&quot;</code> car il est purement decoratif.</li>
            <li>Les lecteurs d&apos;ecran ne lisent pas les skeletons — ils attendent le contenu reel.</li>
            <li>Associer un <code style={{ fontFamily: 'var(--df-font-mono)', fontSize: '0.8125rem', backgroundColor: 'var(--df-color-surface-muted)', padding: '0.125rem 0.375rem', borderRadius: 'var(--df-radius-sm)' }}>aria-busy=&quot;true&quot;</code> au conteneur parent pendant le chargement.</li>
            <li>L&apos;animation pulse est douce et respecte <code style={{ fontFamily: 'var(--df-font-mono)', fontSize: '0.8125rem', backgroundColor: 'var(--df-color-surface-muted)', padding: '0.125rem 0.375rem', borderRadius: 'var(--df-radius-sm)' }}>prefers-reduced-motion</code>.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

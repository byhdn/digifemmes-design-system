'use client';

import { useState } from 'react';

const variants = [
  { name: 'default', bg: 'var(--df-color-surface-muted)', color: 'var(--df-color-text-default)', border: 'var(--df-color-border-default)' },
  { name: 'primary', bg: '#FFF3E0', color: '#FF7B00', border: '#FF7B00' },
  { name: 'secondary', bg: '#E1F5FE', color: '#12B8DF', border: '#12B8DF' },
  { name: 'accent', bg: '#FFF8E1', color: '#E65100', border: '#FFC107' },
  { name: 'navy', bg: '#E8EAF6', color: '#225DA7', border: '#225DA7' },
  { name: 'green', bg: '#E8F5E9', color: '#009578', border: '#009578' },
];

const propsList = [
  { name: 'variant', type: '"primary" | "secondary" | "accent" | "navy" | "green" | "default"', default: '"default"', description: 'Variante de couleur du tag' },
  { name: 'removable', type: 'boolean', default: 'false', description: 'Affiche un bouton de suppression (X)' },
  { name: 'onRemove', type: '() => void', default: '-', description: 'Callback au clic sur le bouton de suppression' },
  { name: 'children', type: 'ReactNode', default: '-', description: 'Contenu du tag' },
  { name: 'className', type: 'string', default: '-', description: 'Classes CSS additionnelles' },
  { name: 'style', type: 'CSSProperties', default: '-', description: 'Styles inline additionnels' },
];

function DemoTag({ variant, removable = false, onRemove, children }: { variant: typeof variants[number]; removable?: boolean; onRemove?: () => void; children: React.ReactNode }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.25rem',
        padding: '0.1875rem 0.625rem',
        borderRadius: '9999px',
        fontFamily: 'var(--df-font-body)',
        fontSize: '0.8125rem',
        fontWeight: 500,
        lineHeight: 1.4,
        backgroundColor: variant.bg,
        color: variant.color,
        border: `1px solid ${variant.border}`,
        whiteSpace: 'nowrap',
      }}
    >
      {children}
      {removable && (
        <button
          type="button"
          onClick={onRemove}
          aria-label="Supprimer le tag"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '1rem',
            height: '1rem',
            padding: 0,
            border: 'none',
            background: 'none',
            color: 'inherit',
            cursor: 'pointer',
            borderRadius: '50%',
            opacity: 0.7,
            fontSize: '0.875rem',
            lineHeight: 1,
            flexShrink: 0,
          }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
            <path d="M1 1L9 9M9 1L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </span>
  );
}

export default function TagPage() {
  const [removedTags, setRemovedTags] = useState<string[]>([]);

  const demoTags = ['React', 'TypeScript', 'Design System', 'Accessible'];
  const visibleTags = demoTags.filter((t) => !removedTags.includes(t));

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <div style={{ display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: 'var(--df-radius-xl)', backgroundColor: 'rgba(18,184,223,0.1)', color: '#12B8DF', fontSize: '0.75rem', fontWeight: 600 }}>Composant</div>
          <div style={{ display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: 'var(--df-radius-xl)', backgroundColor: 'rgba(0,149,120,0.1)', color: '#009578', fontSize: '0.75rem', fontWeight: 600 }}>Pret</div>
        </div>
        <h1 style={{ fontFamily: 'var(--df-font-display)', fontSize: '2.5rem', fontWeight: 800, color: 'var(--df-color-text-default)', marginBottom: '0.75rem' }}>Tag</h1>
        <p style={{ fontSize: '1.0625rem', color: 'var(--df-color-text-subtle)', maxWidth: 600, lineHeight: 1.6 }}>
          Le Tag est une etiquette coloree utilisee pour categoriser, filtrer ou afficher des mots-cles. Il peut etre rendu supprimable avec un bouton de fermeture.
        </p>
      </div>

      {/* Live Preview */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontFamily: 'var(--df-font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--df-color-text-default)', marginBottom: '1rem' }}>Variantes</h2>
        <div style={{ backgroundColor: 'var(--df-color-surface-elevated)', borderRadius: 'var(--df-radius-xl)', border: '1px solid var(--df-color-border-default)', padding: '2rem' }}>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            {variants.map((v) => (
              <DemoTag key={v.name} variant={v}>{v.name}</DemoTag>
            ))}
          </div>

          <div style={{ borderTop: '1px solid var(--df-color-border-default)', paddingTop: '1.5rem' }}>
            <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--df-color-text-subtle)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Tags supprimables (cliquer sur X)
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {visibleTags.map((tag, i) => (
                <DemoTag key={tag} variant={variants[(i + 1) % variants.length]} removable onRemove={() => setRemovedTags((prev) => [...prev, tag])}>
                  {tag}
                </DemoTag>
              ))}
              {visibleTags.length === 0 && (
                <span style={{ fontSize: '0.875rem', color: 'var(--df-color-text-subtle)', fontStyle: 'italic' }}>
                  Tous les tags ont ete supprimes.{' '}
                  <button type="button" onClick={() => setRemovedTags([])} style={{ color: 'var(--df-color-brand-primary)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600, fontFamily: 'var(--df-font-body)', fontSize: '0.875rem', textDecoration: 'underline' }}>
                    Reinitialiser
                  </button>
                </span>
              )}
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
{`import { Tag } from '@digifemmes/ui';
import { useState } from 'react';

function TagFilter() {
  const [tags, setTags] = useState(['React', 'TypeScript', 'Node.js']);

  return (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      {tags.map((tag) => (
        <Tag
          key={tag}
          variant="primary"
          removable
          onRemove={() => setTags((prev) => prev.filter((t) => t !== tag))}
        >
          {tag}
        </Tag>
      ))}
    </div>
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
              <li>Utiliser les variantes pour differencier les categories</li>
              <li>Garder le texte court (1-3 mots)</li>
              <li>Activer removable uniquement quand l&apos;utilisatrice peut modifier la selection</li>
              <li>Grouper les tags dans un conteneur flex avec wrap</li>
            </ul>
          </div>
          <div style={{ backgroundColor: 'var(--df-color-surface-elevated)', borderRadius: 'var(--df-radius-xl)', border: '2px solid #DC2626', overflow: 'hidden' }}>
            <div style={{ backgroundColor: 'rgba(220,38,38,0.08)', padding: '0.75rem 1.25rem', fontWeight: 700, fontSize: '0.875rem', color: '#DC2626', borderBottom: '1px solid rgba(220,38,38,0.15)' }}>A eviter</div>
            <ul style={{ padding: '1rem 1.25rem 1rem 2rem', fontSize: '0.8125rem', color: 'var(--df-color-text-default)', lineHeight: 1.8, listStyleType: 'disc' }}>
              <li>Trop de tags sur une meme ligne sans wrap</li>
              <li>Utiliser un tag comme bouton d&apos;action (utiliser Button)</li>
              <li>Confondre Tag et Badge (le Badge est pour les statuts)</li>
              <li>Texte trop long qui depasse visuellement</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Accessibilite */}
      <section>
        <h2 style={{ fontFamily: 'var(--df-font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--df-color-text-default)', marginBottom: '1rem' }}>Accessibilite</h2>
        <div style={{ backgroundColor: 'var(--df-color-surface-elevated)', borderRadius: 'var(--df-radius-xl)', border: '1px solid var(--df-color-border-default)', padding: '1.5rem' }}>
          <ul style={{ fontSize: '0.875rem', color: 'var(--df-color-text-default)', lineHeight: 1.8, listStyleType: 'disc', paddingLeft: '1.25rem' }}>
            <li>Le bouton de suppression possede un <code style={{ fontFamily: 'var(--df-font-mono)', fontSize: '0.8125rem', backgroundColor: 'var(--df-color-surface-muted)', padding: '0.125rem 0.375rem', borderRadius: 'var(--df-radius-sm)' }}>aria-label=&quot;Remove tag&quot;</code>.</li>
            <li>Le tag est un <code style={{ fontFamily: 'var(--df-font-mono)', fontSize: '0.8125rem', backgroundColor: 'var(--df-color-surface-muted)', padding: '0.125rem 0.375rem', borderRadius: 'var(--df-radius-sm)' }}>&lt;span&gt;</code> non interactif dont le contenu est lu par les lecteurs d&apos;ecran.</li>
            <li>Le bouton de suppression est focusable au clavier et activable avec Entree/Espace.</li>
            <li>Les couleurs respectent un ratio de contraste WCAG AA.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

'use client';

import { useState } from 'react';

const propsList = [
  { name: 'content', type: 'string', default: '-', description: 'Texte affiche dans le tooltip' },
  { name: 'position', type: '"top" | "bottom" | "left" | "right"', default: '"top"', description: 'Position preferee du tooltip' },
  { name: 'children', type: 'ReactElement', default: '-', description: 'Element declencheur (hover/focus)' },
  { name: 'className', type: 'string', default: '-', description: 'Classes CSS appliquees au popup' },
  { name: 'style', type: 'CSSProperties', default: '-', description: 'Styles inline appliques au popup' },
];

function DemoTooltip({ content, position = 'top', children }: { content: string; position?: 'top' | 'bottom' | 'left' | 'right'; children: React.ReactNode }) {
  const [visible, setVisible] = useState(false);

  const posStyles: Record<string, React.CSSProperties> = {
    top: { bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: '0.5rem' },
    bottom: { top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: '0.5rem' },
    left: { right: '100%', top: '50%', transform: 'translateY(-50%)', marginRight: '0.5rem' },
    right: { left: '100%', top: '50%', transform: 'translateY(-50%)', marginLeft: '0.5rem' },
  };

  return (
    <span
      style={{ position: 'relative', display: 'inline-flex' }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}
      <span
        role="tooltip"
        style={{
          position: 'absolute',
          zIndex: 9999,
          padding: '0.375rem 0.75rem',
          borderRadius: 'var(--df-radius-md)',
          backgroundColor: 'var(--df-color-text-default)',
          color: 'var(--df-color-text-inverse)',
          fontFamily: 'var(--df-font-body)',
          fontSize: '0.75rem',
          fontWeight: 500,
          lineHeight: 1.4,
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          opacity: visible ? 1 : 0,
          transition: 'opacity 150ms ease',
          ...posStyles[position],
        }}
      >
        {content}
      </span>
    </span>
  );
}

export default function TooltipPage() {
  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <div style={{ display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: 'var(--df-radius-xl)', backgroundColor: 'rgba(18,184,223,0.1)', color: '#12B8DF', fontSize: '0.75rem', fontWeight: 600 }}>Composant</div>
          <div style={{ display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: 'var(--df-radius-xl)', backgroundColor: 'rgba(0,149,120,0.1)', color: '#009578', fontSize: '0.75rem', fontWeight: 600 }}>Pret</div>
        </div>
        <h1 style={{ fontFamily: 'var(--df-font-display)', fontSize: '2.5rem', fontWeight: 800, color: 'var(--df-color-text-default)', marginBottom: '0.75rem' }}>Tooltip</h1>
        <p style={{ fontSize: '1.0625rem', color: 'var(--df-color-text-subtle)', maxWidth: 600, lineHeight: 1.6 }}>
          Le Tooltip est une info-bulle qui apparait au survol ou au focus d&apos;un element. Il fournit un complement d&apos;information contextuel sans encombrer l&apos;interface.
        </p>
      </div>

      {/* Live Preview */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontFamily: 'var(--df-font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--df-color-text-default)', marginBottom: '1rem' }}>Positions</h2>
        <div style={{ backgroundColor: 'var(--df-color-surface-elevated)', borderRadius: 'var(--df-radius-xl)', border: '1px solid var(--df-color-border-default)', padding: '4rem 2rem' }}>
          <div style={{ display: 'flex', gap: '3rem', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
            {(['top', 'bottom', 'left', 'right'] as const).map((pos) => (
              <DemoTooltip key={pos} content={`Tooltip ${pos}`} position={pos}>
                <button
                  type="button"
                  style={{
                    padding: '0.625rem 1.25rem',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    fontFamily: 'var(--df-font-body)',
                    borderRadius: 'var(--df-radius-lg)',
                    border: '1.5px solid var(--df-color-border-strong)',
                    backgroundColor: 'var(--df-color-surface-default)',
                    color: 'var(--df-color-text-default)',
                    cursor: 'pointer',
                  }}
                >
                  {pos.charAt(0).toUpperCase() + pos.slice(1)}
                </button>
              </DemoTooltip>
            ))}
          </div>
        </div>
      </section>

      {/* Exemples contextuels */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontFamily: 'var(--df-font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--df-color-text-default)', marginBottom: '1rem' }}>Exemples contextuels</h2>
        <div style={{ backgroundColor: 'var(--df-color-surface-elevated)', borderRadius: 'var(--df-radius-xl)', border: '1px solid var(--df-color-border-default)', padding: '2rem' }}>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <DemoTooltip content="Ajouter un nouveau projet" position="top">
              <button
                type="button"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '2.5rem',
                  height: '2.5rem',
                  borderRadius: '50%',
                  border: 'none',
                  backgroundColor: '#FF7B00',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                }}
              >
                +
              </button>
            </DemoTooltip>
            <DemoTooltip content="Modifier le profil" position="bottom">
              <button
                type="button"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '2.5rem',
                  height: '2.5rem',
                  borderRadius: 'var(--df-radius-lg)',
                  border: '1.5px solid var(--df-color-border-strong)',
                  backgroundColor: 'var(--df-color-surface-default)',
                  color: 'var(--df-color-text-default)',
                  cursor: 'pointer',
                  fontSize: '1rem',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
              </button>
            </DemoTooltip>
            <DemoTooltip content="Copie dans le presse-papier" position="top">
              <span style={{ fontFamily: 'var(--df-font-mono)', fontSize: '0.8125rem', padding: '0.5rem 0.75rem', backgroundColor: 'var(--df-color-surface-muted)', borderRadius: 'var(--df-radius-md)', color: 'var(--df-color-text-default)', cursor: 'pointer', border: '1px solid var(--df-color-border-default)' }}>
                npm i @digifemmes/ui
              </span>
            </DemoTooltip>
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
{`import { Tooltip, Button } from '@digifemmes/ui';

// Tooltip sur un bouton
<Tooltip content="Enregistrer les modifications" position="top">
  <Button variant="primary">Sauvegarder</Button>
</Tooltip>

// Tooltip sur un bouton icone
<Tooltip content="Modifier le profil" position="bottom">
  <button aria-label="Modifier">
    <EditIcon />
  </button>
</Tooltip>

// Tooltip a droite
<Tooltip content="Copie !" position="right">
  <code>npm i @digifemmes/ui</code>
</Tooltip>`}
        </pre>
      </section>

      {/* Do / Don't */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontFamily: 'var(--df-font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--df-color-text-default)', marginBottom: '1rem' }}>Bonnes pratiques</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div style={{ backgroundColor: 'var(--df-color-surface-elevated)', borderRadius: 'var(--df-radius-xl)', border: '2px solid #009578', overflow: 'hidden' }}>
            <div style={{ backgroundColor: 'rgba(0,149,120,0.08)', padding: '0.75rem 1.25rem', fontWeight: 700, fontSize: '0.875rem', color: '#009578', borderBottom: '1px solid rgba(0,149,120,0.15)' }}>A faire</div>
            <ul style={{ padding: '1rem 1.25rem 1rem 2rem', fontSize: '0.8125rem', color: 'var(--df-color-text-default)', lineHeight: 1.8, listStyleType: 'disc' }}>
              <li>Texte court et descriptif (1 ligne max)</li>
              <li>Utiliser sur les boutons icones sans label visible</li>
              <li>Positionner pour eviter que le tooltip sorte de l&apos;ecran</li>
              <li>Apparition au focus clavier en plus du hover</li>
            </ul>
          </div>
          <div style={{ backgroundColor: 'var(--df-color-surface-elevated)', borderRadius: 'var(--df-radius-xl)', border: '2px solid #DC2626', overflow: 'hidden' }}>
            <div style={{ backgroundColor: 'rgba(220,38,38,0.08)', padding: '0.75rem 1.25rem', fontWeight: 700, fontSize: '0.875rem', color: '#DC2626', borderBottom: '1px solid rgba(220,38,38,0.15)' }}>A eviter</div>
            <ul style={{ padding: '1rem 1.25rem 1rem 2rem', fontSize: '0.8125rem', color: 'var(--df-color-text-default)', lineHeight: 1.8, listStyleType: 'disc' }}>
              <li>Contenu interactif dans un tooltip (liens, boutons)</li>
              <li>Texte trop long ou multi-lignes</li>
              <li>Information essentielle uniquement dans un tooltip</li>
              <li>Tooltip sur des elements deja explicites</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Accessibilite */}
      <section>
        <h2 style={{ fontFamily: 'var(--df-font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--df-color-text-default)', marginBottom: '1rem' }}>Accessibilite</h2>
        <div style={{ backgroundColor: 'var(--df-color-surface-elevated)', borderRadius: 'var(--df-radius-xl)', border: '1px solid var(--df-color-border-default)', padding: '1.5rem' }}>
          <ul style={{ fontSize: '0.875rem', color: 'var(--df-color-text-default)', lineHeight: 1.8, listStyleType: 'disc', paddingLeft: '1.25rem' }}>
            <li>Le tooltip utilise <code style={{ fontFamily: 'var(--df-font-mono)', fontSize: '0.8125rem', backgroundColor: 'var(--df-color-surface-muted)', padding: '0.125rem 0.375rem', borderRadius: 'var(--df-radius-sm)' }}>role=&quot;tooltip&quot;</code> et un <code style={{ fontFamily: 'var(--df-font-mono)', fontSize: '0.8125rem', backgroundColor: 'var(--df-color-surface-muted)', padding: '0.125rem 0.375rem', borderRadius: 'var(--df-radius-sm)' }}>id</code> unique.</li>
            <li>L&apos;element declencheur recoit <code style={{ fontFamily: 'var(--df-font-mono)', fontSize: '0.8125rem', backgroundColor: 'var(--df-color-surface-muted)', padding: '0.125rem 0.375rem', borderRadius: 'var(--df-radius-sm)' }}>aria-describedby</code> pointant vers le tooltip.</li>
            <li>Le tooltip apparait au focus clavier, pas uniquement au hover souris.</li>
            <li><code style={{ fontFamily: 'var(--df-font-mono)', fontSize: '0.8125rem', backgroundColor: 'var(--df-color-surface-muted)', padding: '0.125rem 0.375rem', borderRadius: 'var(--df-radius-sm)' }}>aria-hidden</code> est utilise pour masquer le tooltip quand il n&apos;est pas visible.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

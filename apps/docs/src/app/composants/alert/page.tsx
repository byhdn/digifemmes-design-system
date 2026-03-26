'use client';

import { useState } from 'react';

const variants = [
  { name: 'info', bg: '#E1F5FE', border: '#12B8DF', iconColor: '#12B8DF', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z', label: 'Information' },
  { name: 'success', bg: '#E8F5E9', border: '#009578', iconColor: '#009578', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z', label: 'Succes' },
  { name: 'warning', bg: '#FFF8E1', border: '#FFC107', iconColor: '#E65100', icon: 'M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z', label: 'Attention' },
  { name: 'error', bg: '#FEE2E2', border: '#DC2626', iconColor: '#DC2626', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z', label: 'Erreur' },
];

const propsList = [
  { name: 'variant', type: '"info" | "success" | "warning" | "error"', default: '"info"', description: 'Type semantique de l\'alerte' },
  { name: 'title', type: 'string', default: '-', description: 'Titre optionnel en gras' },
  { name: 'children', type: 'ReactNode', default: '-', description: 'Contenu du message' },
  { name: 'closeable', type: 'boolean', default: 'false', description: 'Affiche un bouton de fermeture' },
  { name: 'onClose', type: '() => void', default: '-', description: 'Callback a la fermeture' },
  { name: 'className', type: 'string', default: '-', description: 'Classes CSS additionnelles' },
  { name: 'style', type: 'CSSProperties', default: '-', description: 'Styles inline additionnels' },
];

function DemoAlert({ variant, title, children, closeable = false, onClose }: { variant: typeof variants[number]; title?: string; children: React.ReactNode; closeable?: boolean; onClose?: () => void }) {
  return (
    <div role="alert" style={{ display: 'flex', gap: '0.75rem', padding: '0.75rem 1rem', borderRadius: 'var(--df-radius-md)', backgroundColor: variant.bg, borderLeft: `4px solid ${variant.border}`, fontFamily: 'var(--df-font-body)', fontSize: '0.875rem', lineHeight: 1.5, color: 'var(--df-color-text-default)' }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill={variant.iconColor} aria-hidden="true" style={{ flexShrink: 0, marginTop: '0.125rem' }}>
        <path d={variant.icon} />
      </svg>
      <div style={{ flex: 1, minWidth: 0 }}>
        {title && <div style={{ fontWeight: 600, marginBottom: '0.25rem', fontSize: '0.875rem' }}>{title}</div>}
        <div>{children}</div>
      </div>
      {closeable && (
        <button type="button" onClick={onClose} aria-label="Fermer l'alerte" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '1.25rem', height: '1.25rem', padding: 0, border: 'none', background: 'none', cursor: 'pointer', color: 'var(--df-color-text-subtle)', borderRadius: 'var(--df-radius-sm)', flexShrink: 0 }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default function AlertPage() {
  const [dismissed, setDismissed] = useState<string[]>([]);

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <div style={{ display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: 'var(--df-radius-xl)', backgroundColor: 'rgba(18,184,223,0.1)', color: '#12B8DF', fontSize: '0.75rem', fontWeight: 600 }}>Composant</div>
          <div style={{ display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: 'var(--df-radius-xl)', backgroundColor: 'rgba(0,149,120,0.1)', color: '#009578', fontSize: '0.75rem', fontWeight: 600 }}>Pret</div>
        </div>
        <h1 style={{ fontFamily: 'var(--df-font-display)', fontSize: '2.5rem', fontWeight: 800, color: 'var(--df-color-text-default)', marginBottom: '0.75rem' }}>Alert</h1>
        <p style={{ fontSize: '1.0625rem', color: 'var(--df-color-text-subtle)', maxWidth: 600, lineHeight: 1.6 }}>
          L&apos;Alert est un message de feedback contextuel qui informe l&apos;utilisatrice d&apos;un etat, d&apos;un succes, d&apos;un avertissement ou d&apos;une erreur. Elle supporte un titre, une icone semantique et peut etre fermee.
        </p>
      </div>

      {/* Live Preview */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontFamily: 'var(--df-font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--df-color-text-default)', marginBottom: '1rem' }}>Variantes</h2>
        <div style={{ backgroundColor: 'var(--df-color-surface-elevated)', borderRadius: 'var(--df-radius-xl)', border: '1px solid var(--df-color-border-default)', padding: '2rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
            {variants.map((v) => (
              <DemoAlert key={v.name} variant={v} title={v.label}>
                Ceci est un message de type {v.name}. Il donne du contexte sur une action ou un etat.
              </DemoAlert>
            ))}
          </div>

          <div style={{ borderTop: '1px solid var(--df-color-border-default)', paddingTop: '1.5rem' }}>
            <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--df-color-text-subtle)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Alertes fermables (cliquer sur X)
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {variants.filter((v) => !dismissed.includes(v.name)).map((v) => (
                <DemoAlert key={v.name} variant={v} title={v.label} closeable onClose={() => setDismissed((prev) => [...prev, v.name])}>
                  Cette alerte peut etre fermee.
                </DemoAlert>
              ))}
              {dismissed.length === variants.length && (
                <span style={{ fontSize: '0.875rem', color: 'var(--df-color-text-subtle)', fontStyle: 'italic' }}>
                  Toutes les alertes ont ete fermees.{' '}
                  <button type="button" onClick={() => setDismissed([])} style={{ color: 'var(--df-color-brand-primary)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600, fontFamily: 'var(--df-font-body)', fontSize: '0.875rem', textDecoration: 'underline' }}>
                    Reinitialiser
                  </button>
                </span>
              )}
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--df-color-border-default)', paddingTop: '1.5rem', marginTop: '1.5rem' }}>
            <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--df-color-text-subtle)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Sans titre
            </div>
            <DemoAlert variant={variants[0]}>
              Un message d&apos;information simple, sans titre, pour un feedback rapide.
            </DemoAlert>
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
{`import { Alert } from '@digifemmes/ui';

// Alerte d'information
<Alert variant="info" title="Mise a jour">
  Une nouvelle version est disponible.
</Alert>

// Alerte de succes fermable
<Alert variant="success" title="Succes" closeable onClose={handleClose}>
  Ton profil a ete mis a jour avec succes.
</Alert>

// Alerte d'erreur sans titre
<Alert variant="error">
  Une erreur est survenue. Reessaie plus tard.
</Alert>`}
        </pre>
      </section>

      {/* Do / Don't */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontFamily: 'var(--df-font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--df-color-text-default)', marginBottom: '1rem' }}>Bonnes pratiques</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div style={{ backgroundColor: 'var(--df-color-surface-elevated)', borderRadius: 'var(--df-radius-xl)', border: '2px solid #009578', overflow: 'hidden' }}>
            <div style={{ backgroundColor: 'rgba(0,149,120,0.08)', padding: '0.75rem 1.25rem', fontWeight: 700, fontSize: '0.875rem', color: '#009578', borderBottom: '1px solid rgba(0,149,120,0.15)' }}>A faire</div>
            <ul style={{ padding: '1rem 1.25rem 1rem 2rem', fontSize: '0.8125rem', color: 'var(--df-color-text-default)', lineHeight: 1.8, listStyleType: 'disc' }}>
              <li>Utiliser la variante semantique appropriee (error pour une erreur, success pour un succes)</li>
              <li>Fournir un titre court et un message descriptif</li>
              <li>Rendre fermable les alertes non-critiques</li>
              <li>Placer les alertes en haut de la zone de contenu</li>
            </ul>
          </div>
          <div style={{ backgroundColor: 'var(--df-color-surface-elevated)', borderRadius: 'var(--df-radius-xl)', border: '2px solid #DC2626', overflow: 'hidden' }}>
            <div style={{ backgroundColor: 'rgba(220,38,38,0.08)', padding: '0.75rem 1.25rem', fontWeight: 700, fontSize: '0.875rem', color: '#DC2626', borderBottom: '1px solid rgba(220,38,38,0.15)' }}>A eviter</div>
            <ul style={{ padding: '1rem 1.25rem 1rem 2rem', fontSize: '0.8125rem', color: 'var(--df-color-text-default)', lineHeight: 1.8, listStyleType: 'disc' }}>
              <li>Trop d&apos;alertes en meme temps (alert fatigue)</li>
              <li>Alerte d&apos;erreur fermable sans possibilite de correction</li>
              <li>Texte trop long dans une alerte</li>
              <li>Utiliser une alerte pour du contenu permanent (utiliser un encart)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Accessibilite */}
      <section>
        <h2 style={{ fontFamily: 'var(--df-font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--df-color-text-default)', marginBottom: '1rem' }}>Accessibilite</h2>
        <div style={{ backgroundColor: 'var(--df-color-surface-elevated)', borderRadius: 'var(--df-radius-xl)', border: '1px solid var(--df-color-border-default)', padding: '1.5rem' }}>
          <ul style={{ fontSize: '0.875rem', color: 'var(--df-color-text-default)', lineHeight: 1.8, listStyleType: 'disc', paddingLeft: '1.25rem' }}>
            <li>Le composant utilise <code style={{ fontFamily: 'var(--df-font-mono)', fontSize: '0.8125rem', backgroundColor: 'var(--df-color-surface-muted)', padding: '0.125rem 0.375rem', borderRadius: 'var(--df-radius-sm)' }}>role=&quot;alert&quot;</code>, lu automatiquement par les lecteurs d&apos;ecran a l&apos;apparition.</li>
            <li>L&apos;icone est masquee avec <code style={{ fontFamily: 'var(--df-font-mono)', fontSize: '0.8125rem', backgroundColor: 'var(--df-color-surface-muted)', padding: '0.125rem 0.375rem', borderRadius: 'var(--df-radius-sm)' }}>aria-hidden=&quot;true&quot;</code> (decorative).</li>
            <li>Le bouton de fermeture possede un <code style={{ fontFamily: 'var(--df-font-mono)', fontSize: '0.8125rem', backgroundColor: 'var(--df-color-surface-muted)', padding: '0.125rem 0.375rem', borderRadius: 'var(--df-radius-sm)' }}>aria-label=&quot;Close alert&quot;</code>.</li>
            <li>Les couleurs de fond et de texte respectent les ratios WCAG AA.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

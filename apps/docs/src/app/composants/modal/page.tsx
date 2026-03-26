'use client';

import { useState } from 'react';

const propsList = [
  { name: 'isOpen', type: 'boolean', default: '-', description: 'Controle la visibilite de la modale' },
  { name: 'onClose', type: '() => void', default: '-', description: 'Callback a la fermeture (Escape, clic overlay, bouton X)' },
  { name: 'title', type: 'string', default: '-', description: 'Titre affiche dans le header' },
  { name: 'children', type: 'ReactNode', default: '-', description: 'Contenu du corps de la modale' },
  { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Largeur de la modale (24rem / 32rem / 42rem)' },
  { name: 'className', type: 'string', default: '-', description: 'Classes CSS additionnelles' },
  { name: 'style', type: 'CSSProperties', default: '-', description: 'Styles inline additionnels' },
];

const sizeWidths = { sm: '24rem', md: '32rem', lg: '42rem' };

function DemoModal({ isOpen, onClose, title, children, size = 'md' }: { isOpen: boolean; onClose: () => void; title?: string; children: React.ReactNode; size?: 'sm' | 'md' | 'lg' }) {
  if (!isOpen) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', backgroundColor: 'rgba(0,0,0,0.45)', zIndex: 9999 }} onClick={onClose}>
      <div style={{ width: '100%', maxWidth: sizeWidths[size], maxHeight: '85vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--df-color-surface-default)', borderRadius: 'var(--df-radius-xl)', boxShadow: 'var(--df-shadow-lg)', overflow: 'hidden' }} onClick={(e) => e.stopPropagation()}>
        {title && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.5rem', borderBottom: '1px solid var(--df-color-border-default)', flexShrink: 0 }}>
            <h2 style={{ margin: 0, fontFamily: 'var(--df-font-display)', fontSize: '1.125rem', fontWeight: 600, color: 'var(--df-color-text-default)' }}>{title}</h2>
            <button type="button" onClick={onClose} aria-label="Fermer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '2rem', height: '2rem', padding: 0, border: 'none', background: 'none', cursor: 'pointer', color: 'var(--df-color-text-subtle)', borderRadius: 'var(--df-radius-sm)' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            </button>
          </div>
        )}
        <div style={{ padding: '1.5rem', overflowY: 'auto', flex: 1, fontFamily: 'var(--df-font-body)', fontSize: '0.9375rem', lineHeight: 1.6, color: 'var(--df-color-text-default)' }}>{children}</div>
      </div>
    </div>
  );
}

export default function ModalPage() {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <div style={{ display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: 'var(--df-radius-xl)', backgroundColor: 'rgba(18,184,223,0.1)', color: '#12B8DF', fontSize: '0.75rem', fontWeight: 600 }}>Composant</div>
          <div style={{ display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: 'var(--df-radius-xl)', backgroundColor: 'rgba(0,149,120,0.1)', color: '#009578', fontSize: '0.75rem', fontWeight: 600 }}>Pret</div>
        </div>
        <h1 style={{ fontFamily: 'var(--df-font-display)', fontSize: '2.5rem', fontWeight: 800, color: 'var(--df-color-text-default)', marginBottom: '0.75rem' }}>Modal</h1>
        <p style={{ fontSize: '1.0625rem', color: 'var(--df-color-text-subtle)', maxWidth: 600, lineHeight: 1.6 }}>
          La Modal est une fenetre de dialogue qui s&apos;affiche au-dessus du contenu. Elle utilise l&apos;element natif <code style={{ fontFamily: 'var(--df-font-mono)', backgroundColor: 'var(--df-color-surface-muted)', padding: '0.125rem 0.375rem', borderRadius: 'var(--df-radius-sm)' }}>&lt;dialog&gt;</code> pour une accessibilite optimale. Disponible en 3 tailles.
        </p>
      </div>

      {/* Live Preview */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontFamily: 'var(--df-font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--df-color-text-default)', marginBottom: '1rem' }}>Demonstration</h2>
        <div style={{ backgroundColor: 'var(--df-color-surface-elevated)', borderRadius: 'var(--df-radius-xl)', border: '1px solid var(--df-color-border-default)', padding: '2rem' }}>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            {(['sm', 'md', 'lg'] as const).map((size, idx) => (
              <button
                key={size}
                onClick={() => [setOpen1, setOpen2, setOpen3][idx](true)}
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
                  cursor: 'pointer',
                  transition: 'all 150ms ease',
                }}
              >
                Modal {size.toUpperCase()}
              </button>
            ))}
          </div>

          <div style={{ fontSize: '0.875rem', color: 'var(--df-color-text-subtle)', lineHeight: 1.6 }}>
            Clique sur un bouton pour ouvrir la modale. Ferme-la avec le bouton X, la touche Escape ou en cliquant sur l&apos;overlay sombre.
          </div>
        </div>
      </section>

      <DemoModal isOpen={open1} onClose={() => setOpen1(false)} title="Modale petite (sm)" size="sm">
        <p>Ceci est une modale de taille &laquo; sm &raquo; (24rem). Ideale pour les confirmations rapides ou les messages courts.</p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1.5rem' }}>
          <button type="button" onClick={() => setOpen1(false)} style={{ padding: '0.5rem 1rem', fontSize: '0.8125rem', fontWeight: 600, borderRadius: 'var(--df-radius-lg)', border: '1.5px solid #FF7B00', backgroundColor: 'transparent', color: '#FF7B00', cursor: 'pointer', fontFamily: 'var(--df-font-body)' }}>Annuler</button>
          <button type="button" onClick={() => setOpen1(false)} style={{ padding: '0.5rem 1rem', fontSize: '0.8125rem', fontWeight: 600, borderRadius: 'var(--df-radius-lg)', border: 'none', backgroundColor: '#FF7B00', color: 'white', cursor: 'pointer', fontFamily: 'var(--df-font-body)' }}>Confirmer</button>
        </div>
      </DemoModal>

      <DemoModal isOpen={open2} onClose={() => setOpen2(false)} title="Modale moyenne (md)" size="md">
        <p style={{ marginBottom: '1rem' }}>Ceci est une modale de taille &laquo; md &raquo; (32rem). La taille par defaut, adaptee a la plupart des formulaires et contenus.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
            <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--df-color-text-default)' }}>Nom complet</label>
            <input placeholder="Awa Diallo" style={{ padding: '0.625rem 0.875rem', fontSize: '0.875rem', fontFamily: 'var(--df-font-body)', borderRadius: 'var(--df-radius-lg)', border: '1.5px solid var(--df-color-border-strong)', backgroundColor: 'var(--df-color-surface-default)', color: 'var(--df-color-text-default)', outline: 'none' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
            <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--df-color-text-default)' }}>Email</label>
            <input placeholder="awa@digifemmes.ci" type="email" style={{ padding: '0.625rem 0.875rem', fontSize: '0.875rem', fontFamily: 'var(--df-font-body)', borderRadius: 'var(--df-radius-lg)', border: '1.5px solid var(--df-color-border-strong)', backgroundColor: 'var(--df-color-surface-default)', color: 'var(--df-color-text-default)', outline: 'none' }} />
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
          <button type="button" onClick={() => setOpen2(false)} style={{ padding: '0.5rem 1rem', fontSize: '0.8125rem', fontWeight: 600, borderRadius: 'var(--df-radius-lg)', border: '1.5px solid #FF7B00', backgroundColor: 'transparent', color: '#FF7B00', cursor: 'pointer', fontFamily: 'var(--df-font-body)' }}>Annuler</button>
          <button type="button" onClick={() => setOpen2(false)} style={{ padding: '0.5rem 1rem', fontSize: '0.8125rem', fontWeight: 600, borderRadius: 'var(--df-radius-lg)', border: 'none', backgroundColor: '#FF7B00', color: 'white', cursor: 'pointer', fontFamily: 'var(--df-font-body)' }}>Enregistrer</button>
        </div>
      </DemoModal>

      <DemoModal isOpen={open3} onClose={() => setOpen3(false)} title="Modale grande (lg)" size="lg">
        <p style={{ marginBottom: '1rem' }}>Ceci est une modale de taille &laquo; lg &raquo; (42rem). Utilisee pour du contenu riche, des tableaux ou des formulaires complexes.</p>
        <p style={{ marginBottom: '1rem' }}>La formation DigiFemmes en developpement web couvre les technologies suivantes :</p>
        <ul style={{ paddingLeft: '1.25rem', marginBottom: '1.5rem', lineHeight: 1.8 }}>
          <li>HTML, CSS et JavaScript fondamentaux</li>
          <li>React et TypeScript pour le frontend</li>
          <li>Node.js et Express pour le backend</li>
          <li>PostgreSQL pour les bases de donnees</li>
          <li>Git et GitHub pour la collaboration</li>
        </ul>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
          <button type="button" onClick={() => setOpen3(false)} style={{ padding: '0.5rem 1rem', fontSize: '0.8125rem', fontWeight: 600, borderRadius: 'var(--df-radius-lg)', border: '1.5px solid #FF7B00', backgroundColor: 'transparent', color: '#FF7B00', cursor: 'pointer', fontFamily: 'var(--df-font-body)' }}>Fermer</button>
          <button type="button" onClick={() => setOpen3(false)} style={{ padding: '0.5rem 1rem', fontSize: '0.8125rem', fontWeight: 600, borderRadius: 'var(--df-radius-lg)', border: 'none', backgroundColor: '#FF7B00', color: 'white', cursor: 'pointer', fontFamily: 'var(--df-font-body)' }}>S&apos;inscrire</button>
        </div>
      </DemoModal>

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
{`import { Modal, Button } from '@digifemmes/ui';
import { useState } from 'react';

function ConfirmDialog() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Supprimer le compte
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Confirmer la suppression"
        size="sm"
      >
        <p>Es-tu sure de vouloir supprimer ton compte ?
           Cette action est irreversible.</p>
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
          <Button variant="secondary" onClick={() => setIsOpen(false)}>
            Annuler
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Supprimer
          </Button>
        </div>
      </Modal>
    </>
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
              <li>Toujours fournir un titre clair et descriptif</li>
              <li>Permettre la fermeture via Escape et clic overlay</li>
              <li>Utiliser size=&quot;sm&quot; pour les confirmations simples</li>
              <li>Ajouter des boutons d&apos;action dans le footer</li>
            </ul>
          </div>
          <div style={{ backgroundColor: 'var(--df-color-surface-elevated)', borderRadius: 'var(--df-radius-xl)', border: '2px solid #DC2626', overflow: 'hidden' }}>
            <div style={{ backgroundColor: 'rgba(220,38,38,0.08)', padding: '0.75rem 1.25rem', fontWeight: 700, fontSize: '0.875rem', color: '#DC2626', borderBottom: '1px solid rgba(220,38,38,0.15)' }}>A eviter</div>
            <ul style={{ padding: '1rem 1.25rem 1rem 2rem', fontSize: '0.8125rem', color: 'var(--df-color-text-default)', lineHeight: 1.8, listStyleType: 'disc' }}>
              <li>Modales imbriquees (modale qui ouvre une modale)</li>
              <li>Contenu trop long qui necessite beaucoup de scroll</li>
              <li>Modale sans possibilite de fermeture</li>
              <li>Utiliser une modale pour du contenu qui devrait etre une page</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Accessibilite */}
      <section>
        <h2 style={{ fontFamily: 'var(--df-font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--df-color-text-default)', marginBottom: '1rem' }}>Accessibilite</h2>
        <div style={{ backgroundColor: 'var(--df-color-surface-elevated)', borderRadius: 'var(--df-radius-xl)', border: '1px solid var(--df-color-border-default)', padding: '1.5rem' }}>
          <ul style={{ fontSize: '0.875rem', color: 'var(--df-color-text-default)', lineHeight: 1.8, listStyleType: 'disc', paddingLeft: '1.25rem' }}>
            <li>Utilise l&apos;element natif <code style={{ fontFamily: 'var(--df-font-mono)', fontSize: '0.8125rem', backgroundColor: 'var(--df-color-surface-muted)', padding: '0.125rem 0.375rem', borderRadius: 'var(--df-radius-sm)' }}>&lt;dialog&gt;</code> avec <code style={{ fontFamily: 'var(--df-font-mono)', fontSize: '0.8125rem', backgroundColor: 'var(--df-color-surface-muted)', padding: '0.125rem 0.375rem', borderRadius: 'var(--df-radius-sm)' }}>aria-modal=&quot;true&quot;</code>.</li>
            <li>Le focus est piege dans la modale quand elle est ouverte (focus trap natif du dialog).</li>
            <li>Fermeture avec la touche Escape geree nativement.</li>
            <li>Le bouton de fermeture possede <code style={{ fontFamily: 'var(--df-font-mono)', fontSize: '0.8125rem', backgroundColor: 'var(--df-color-surface-muted)', padding: '0.125rem 0.375rem', borderRadius: 'var(--df-radius-sm)' }}>aria-label=&quot;Close dialog&quot;</code>.</li>
            <li><code style={{ fontFamily: 'var(--df-font-mono)', fontSize: '0.8125rem', backgroundColor: 'var(--df-color-surface-muted)', padding: '0.125rem 0.375rem', borderRadius: 'var(--df-radius-sm)' }}>aria-label</code> sur le dialog reprend le titre pour les lecteurs d&apos;ecran.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

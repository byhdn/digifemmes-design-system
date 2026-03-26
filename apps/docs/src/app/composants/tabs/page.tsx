'use client';

import { useState } from 'react';

const propsList = [
  { name: 'activeTab', type: 'string', default: '-', description: 'Identifiant de l\'onglet actif' },
  { name: 'onChange', type: '(tabId: string) => void', default: '-', description: 'Callback a la selection d\'un onglet' },
  { name: 'children', type: 'ReactNode', default: '-', description: 'Sous-composants Tabs.List et Tabs.Panel' },
  { name: 'className', type: 'string', default: '-', description: 'Classes CSS additionnelles' },
  { name: 'style', type: 'CSSProperties', default: '-', description: 'Styles inline additionnels' },
];

const subComponents = [
  { name: 'Tabs.List', description: 'Conteneur de la barre d\'onglets avec role="tablist"' },
  { name: 'Tabs.Tab', description: 'Bouton d\'onglet individuel. Props : tabId (string), disabled (boolean)' },
  { name: 'Tabs.Panel', description: 'Panneau de contenu associe a un onglet. Props : tabId (string)' },
];

function DemoTabs({ tabs, activeTab, onChange }: { tabs: { id: string; label: string; content: React.ReactNode; disabled?: boolean }[]; activeTab: string; onChange: (id: string) => void }) {
  return (
    <div>
      <div role="tablist" style={{ display: 'flex', gap: 0, borderBottom: '2px solid var(--df-color-border-default)' }}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              type="button"
              aria-selected={isActive}
              disabled={tab.disabled}
              onClick={() => !tab.disabled && onChange(tab.id)}
              style={{
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.5rem 1rem',
                fontFamily: 'var(--df-font-body)',
                fontSize: '0.875rem',
                fontWeight: isActive ? 600 : 400,
                color: isActive ? '#FF7B00' : 'var(--df-color-text-subtle)',
                backgroundColor: 'transparent',
                border: 'none',
                borderBottom: `2px solid ${isActive ? '#FF7B00' : 'transparent'}`,
                marginBottom: '-2px',
                cursor: tab.disabled ? 'not-allowed' : 'pointer',
                opacity: tab.disabled ? 0.5 : 1,
                transition: 'color 150ms ease, border-color 150ms ease',
                whiteSpace: 'nowrap',
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      {tabs.map((tab) => (
        activeTab === tab.id ? (
          <div key={tab.id} role="tabpanel" style={{ padding: '1rem 0' }}>
            {tab.content}
          </div>
        ) : null
      ))}
    </div>
  );
}

export default function TabsPage() {
  const [tab1, setTab1] = useState('overview');
  const [tab2, setTab2] = useState('code');

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <div style={{ display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: 'var(--df-radius-xl)', backgroundColor: 'rgba(18,184,223,0.1)', color: '#12B8DF', fontSize: '0.75rem', fontWeight: 600 }}>Composant</div>
          <div style={{ display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: 'var(--df-radius-xl)', backgroundColor: 'rgba(0,149,120,0.1)', color: '#009578', fontSize: '0.75rem', fontWeight: 600 }}>Pret</div>
        </div>
        <h1 style={{ fontFamily: 'var(--df-font-display)', fontSize: '2.5rem', fontWeight: 800, color: 'var(--df-color-text-default)', marginBottom: '0.75rem' }}>Tabs</h1>
        <p style={{ fontSize: '1.0625rem', color: 'var(--df-color-text-subtle)', maxWidth: 600, lineHeight: 1.6 }}>
          Les Tabs permettent de naviguer entre plusieurs panneaux de contenu dans une meme zone. Le composant utilise un pattern compound (Tabs.List, Tabs.Tab, Tabs.Panel) pour une composition flexible.
        </p>
      </div>

      {/* Live Preview */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontFamily: 'var(--df-font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--df-color-text-default)', marginBottom: '1rem' }}>Demonstration</h2>
        <div style={{ backgroundColor: 'var(--df-color-surface-elevated)', borderRadius: 'var(--df-radius-xl)', border: '1px solid var(--df-color-border-default)', padding: '2rem' }}>
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--df-color-text-subtle)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Onglets basiques</div>
            <DemoTabs
              activeTab={tab1}
              onChange={setTab1}
              tabs={[
                { id: 'overview', label: 'Vue d\'ensemble', content: <p style={{ fontSize: '0.875rem', color: 'var(--df-color-text-default)', lineHeight: 1.6 }}>Bienvenue dans la vue d&apos;ensemble du composant. Ici tu trouveras une description generale du fonctionnement et des cas d&apos;usage.</p> },
                { id: 'api', label: 'API', content: <p style={{ fontSize: '0.875rem', color: 'var(--df-color-text-default)', lineHeight: 1.6 }}>La documentation de l&apos;API detaille toutes les props, les sous-composants et les types TypeScript disponibles.</p> },
                { id: 'examples', label: 'Exemples', content: <p style={{ fontSize: '0.875rem', color: 'var(--df-color-text-default)', lineHeight: 1.6 }}>Voici des exemples pratiques d&apos;utilisation du composant Tabs dans differents contextes.</p> },
              ]}
            />
          </div>

          <div style={{ borderTop: '1px solid var(--df-color-border-default)', paddingTop: '1.5rem' }}>
            <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--df-color-text-subtle)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Avec onglet desactive</div>
            <DemoTabs
              activeTab={tab2}
              onChange={setTab2}
              tabs={[
                { id: 'code', label: 'Code', content: <pre style={{ fontFamily: 'var(--df-font-mono)', fontSize: '0.8125rem', color: 'var(--df-color-text-default)', backgroundColor: 'var(--df-color-surface-muted)', padding: '1rem', borderRadius: 'var(--df-radius-md)' }}>{'const hello = "DigiFemmes";'}</pre> },
                { id: 'preview', label: 'Apercu', content: <p style={{ fontSize: '0.875rem', color: 'var(--df-color-text-default)' }}>Apercu du rendu visuel du code ci-dessus.</p> },
                { id: 'tests', label: 'Tests', disabled: true, content: <p>Tests</p> },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Sub-components */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontFamily: 'var(--df-font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--df-color-text-default)', marginBottom: '1rem' }}>Sous-composants</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {subComponents.map((sub) => (
            <div key={sub.name} style={{ backgroundColor: 'var(--df-color-surface-muted)', borderRadius: 'var(--df-radius-lg)', padding: '1rem 1.25rem', border: '1px solid var(--df-color-border-default)' }}>
              <div style={{ fontFamily: 'var(--df-font-mono)', fontSize: '0.875rem', fontWeight: 600, color: 'var(--df-color-brand-secondary)', marginBottom: '0.25rem' }}>{sub.name}</div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--df-color-text-subtle)' }}>{sub.description}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Props Table */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontFamily: 'var(--df-font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--df-color-text-default)', marginBottom: '1rem' }}>Props (Tabs root)</h2>
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
{`import { Tabs } from '@digifemmes/ui';
import { useState } from 'react';

function ComponentDoc() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <Tabs activeTab={activeTab} onChange={setActiveTab}>
      <Tabs.List>
        <Tabs.Tab tabId="overview">Vue d'ensemble</Tabs.Tab>
        <Tabs.Tab tabId="api">API</Tabs.Tab>
        <Tabs.Tab tabId="examples">Exemples</Tabs.Tab>
        <Tabs.Tab tabId="tests" disabled>Tests</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel tabId="overview">
        <p>Description du composant...</p>
      </Tabs.Panel>
      <Tabs.Panel tabId="api">
        <p>Documentation de l'API...</p>
      </Tabs.Panel>
      <Tabs.Panel tabId="examples">
        <p>Exemples de code...</p>
      </Tabs.Panel>
    </Tabs>
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
              <li>Labels courts et clairs pour chaque onglet</li>
              <li>Maximum 5-6 onglets visibles</li>
              <li>Le premier onglet doit etre le plus pertinent</li>
              <li>Indiquer visuellement les onglets desactives</li>
            </ul>
          </div>
          <div style={{ backgroundColor: 'var(--df-color-surface-elevated)', borderRadius: 'var(--df-radius-xl)', border: '2px solid #DC2626', overflow: 'hidden' }}>
            <div style={{ backgroundColor: 'rgba(220,38,38,0.08)', padding: '0.75rem 1.25rem', fontWeight: 700, fontSize: '0.875rem', color: '#DC2626', borderBottom: '1px solid rgba(220,38,38,0.15)' }}>A eviter</div>
            <ul style={{ padding: '1rem 1.25rem 1rem 2rem', fontSize: '0.8125rem', color: 'var(--df-color-text-default)', lineHeight: 1.8, listStyleType: 'disc' }}>
              <li>Trop d&apos;onglets qui necessitent un scroll horizontal</li>
              <li>Contenu d&apos;onglet qui n&apos;a pas de lien logique avec les autres</li>
              <li>Onglets imbriques (tabs dans des tabs)</li>
              <li>Utiliser des tabs pour de la navigation globale (utiliser un menu)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Accessibilite */}
      <section>
        <h2 style={{ fontFamily: 'var(--df-font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--df-color-text-default)', marginBottom: '1rem' }}>Accessibilite</h2>
        <div style={{ backgroundColor: 'var(--df-color-surface-elevated)', borderRadius: 'var(--df-radius-xl)', border: '1px solid var(--df-color-border-default)', padding: '1.5rem' }}>
          <ul style={{ fontSize: '0.875rem', color: 'var(--df-color-text-default)', lineHeight: 1.8, listStyleType: 'disc', paddingLeft: '1.25rem' }}>
            <li>Utilise les roles ARIA : <code style={{ fontFamily: 'var(--df-font-mono)', fontSize: '0.8125rem', backgroundColor: 'var(--df-color-surface-muted)', padding: '0.125rem 0.375rem', borderRadius: 'var(--df-radius-sm)' }}>tablist</code>, <code style={{ fontFamily: 'var(--df-font-mono)', fontSize: '0.8125rem', backgroundColor: 'var(--df-color-surface-muted)', padding: '0.125rem 0.375rem', borderRadius: 'var(--df-radius-sm)' }}>tab</code>, <code style={{ fontFamily: 'var(--df-font-mono)', fontSize: '0.8125rem', backgroundColor: 'var(--df-color-surface-muted)', padding: '0.125rem 0.375rem', borderRadius: 'var(--df-radius-sm)' }}>tabpanel</code>.</li>
            <li><code style={{ fontFamily: 'var(--df-font-mono)', fontSize: '0.8125rem', backgroundColor: 'var(--df-color-surface-muted)', padding: '0.125rem 0.375rem', borderRadius: 'var(--df-radius-sm)' }}>aria-selected</code> indique l&apos;onglet actif, <code style={{ fontFamily: 'var(--df-font-mono)', fontSize: '0.8125rem', backgroundColor: 'var(--df-color-surface-muted)', padding: '0.125rem 0.375rem', borderRadius: 'var(--df-radius-sm)' }}>aria-controls</code> lie chaque tab a son panel.</li>
            <li>Navigation clavier : Tab pour entrer, fleches pour naviguer, Entree/Espace pour activer.</li>
            <li>L&apos;onglet actif a <code style={{ fontFamily: 'var(--df-font-mono)', fontSize: '0.8125rem', backgroundColor: 'var(--df-color-surface-muted)', padding: '0.125rem 0.375rem', borderRadius: 'var(--df-radius-sm)' }}>tabIndex=0</code>, les autres <code style={{ fontFamily: 'var(--df-font-mono)', fontSize: '0.8125rem', backgroundColor: 'var(--df-color-surface-muted)', padding: '0.125rem 0.375rem', borderRadius: 'var(--df-radius-sm)' }}>tabIndex=-1</code>.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

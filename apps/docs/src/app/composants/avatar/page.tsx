'use client';

const sizes = [
  { name: 'sm', dim: '2rem', font: '0.75rem' },
  { name: 'md', dim: '2.5rem', font: '0.875rem' },
  { name: 'lg', dim: '3rem', font: '1.125rem' },
  { name: 'xl', dim: '4rem', font: '1.5rem' },
];

const propsList = [
  { name: 'src', type: 'string', default: '-', description: 'URL de l\'image de profil' },
  { name: 'alt', type: 'string', default: '-', description: 'Texte alternatif pour l\'image' },
  { name: 'size', type: '"sm" | "md" | "lg" | "xl"', default: '"md"', description: 'Taille de l\'avatar' },
  { name: 'fallback', type: 'string', default: '-', description: 'Nom complet pour generer les initiales en fallback' },
  { name: 'className', type: 'string', default: '-', description: 'Classes CSS additionnelles' },
  { name: 'style', type: 'CSSProperties', default: '-', description: 'Styles inline additionnels' },
];

function DemoAvatar({ size, fallback, color }: { size: typeof sizes[number]; fallback: string; color?: string }) {
  const initials = fallback.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2);
  return (
    <span
      role="img"
      aria-label={fallback}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size.dim,
        height: size.dim,
        borderRadius: '50%',
        overflow: 'hidden',
        flexShrink: 0,
        backgroundColor: color || '#FF7B00',
        color: 'white',
        fontFamily: 'var(--df-font-body)',
        fontWeight: 600,
        fontSize: size.font,
        userSelect: 'none',
      }}
    >
      {initials}
    </span>
  );
}

export default function AvatarPage() {
  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <div style={{ display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: 'var(--df-radius-xl)', backgroundColor: 'rgba(18,184,223,0.1)', color: '#12B8DF', fontSize: '0.75rem', fontWeight: 600 }}>
            Composant
          </div>
          <div style={{ display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: 'var(--df-radius-xl)', backgroundColor: 'rgba(0,149,120,0.1)', color: '#009578', fontSize: '0.75rem', fontWeight: 600 }}>
            Pret
          </div>
        </div>
        <h1 style={{ fontFamily: 'var(--df-font-display)', fontSize: '2.5rem', fontWeight: 800, color: 'var(--df-color-text-default)', marginBottom: '0.75rem' }}>
          Avatar
        </h1>
        <p style={{ fontSize: '1.0625rem', color: 'var(--df-color-text-subtle)', maxWidth: 600, lineHeight: 1.6 }}>
          L&apos;Avatar represente une utilisatrice via sa photo de profil ou ses initiales en fallback. Il existe en 4 tailles pour s&apos;adapter a tous les contextes.
        </p>
      </div>

      {/* Live Preview — Tailles */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontFamily: 'var(--df-font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--df-color-text-default)', marginBottom: '1rem' }}>
          Tailles
        </h2>
        <div style={{ backgroundColor: 'var(--df-color-surface-elevated)', borderRadius: 'var(--df-radius-xl)', border: '1px solid var(--df-color-border-default)', padding: '2rem' }}>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}>
            {sizes.map((s) => (
              <div key={s.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <DemoAvatar size={s} fallback="Awa Diallo" />
                <span style={{ fontFamily: 'var(--df-font-mono)', fontSize: '0.75rem', color: 'var(--df-color-text-subtle)' }}>{s.name}</span>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid var(--df-color-border-default)', paddingTop: '1.5rem' }}>
            <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--df-color-text-subtle)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Fallback initiales
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <DemoAvatar size={sizes[2]} fallback="Awa Diallo" color="#FF7B00" />
              <DemoAvatar size={sizes[2]} fallback="Fatou Kone" color="#12B8DF" />
              <DemoAvatar size={sizes[2]} fallback="Marie Toure" color="#225DA7" />
              <DemoAvatar size={sizes[2]} fallback="Salimata Bamba" color="#009578" />
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--df-color-border-default)', paddingTop: '1.5rem', marginTop: '1.5rem' }}>
            <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--df-color-text-subtle)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Groupe d&apos;avatars
            </div>
            <div style={{ display: 'flex' }}>
              {['Awa Diallo', 'Fatou Kone', 'Marie Toure', 'Salimata Bamba'].map((name, i) => (
                <span key={name} style={{ marginLeft: i > 0 ? '-0.5rem' : 0, border: '2px solid var(--df-color-surface-elevated)', borderRadius: '50%' }}>
                  <DemoAvatar size={sizes[1]} fallback={name} color={['#FF7B00', '#12B8DF', '#225DA7', '#009578'][i]} />
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Props Table */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontFamily: 'var(--df-font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--df-color-text-default)', marginBottom: '1rem' }}>
          Props
        </h2>
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
        <h2 style={{ fontFamily: 'var(--df-font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--df-color-text-default)', marginBottom: '1rem' }}>
          Exemple d&apos;utilisation
        </h2>
        <pre style={{ backgroundColor: 'var(--df-color-surface-muted)', borderRadius: 'var(--df-radius-lg)', padding: '1.25rem 1.5rem', fontFamily: 'var(--df-font-mono)', fontSize: '0.8125rem', lineHeight: 1.7, color: 'var(--df-color-text-default)', border: '1px solid var(--df-color-border-default)', overflowX: 'auto' }}>
{`import { Avatar } from '@digifemmes/ui';

// Avatar avec image
<Avatar
  src="/photos/awa.jpg"
  alt="Awa Diallo"
  size="lg"
/>

// Avatar avec initiales (fallback)
<Avatar fallback="Awa Diallo" size="md" />

// Groupe d'avatars
<div style={{ display: 'flex' }}>
  <Avatar fallback="Awa Diallo" size="sm" />
  <Avatar fallback="Fatou Kone" size="sm"
    style={{ marginLeft: '-0.5rem' }} />
</div>`}
        </pre>
      </section>

      {/* Do / Don't */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontFamily: 'var(--df-font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--df-color-text-default)', marginBottom: '1rem' }}>
          Bonnes pratiques
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div style={{ backgroundColor: 'var(--df-color-surface-elevated)', borderRadius: 'var(--df-radius-xl)', border: '2px solid #009578', overflow: 'hidden' }}>
            <div style={{ backgroundColor: 'rgba(0,149,120,0.08)', padding: '0.75rem 1.25rem', fontWeight: 700, fontSize: '0.875rem', color: '#009578', borderBottom: '1px solid rgba(0,149,120,0.15)' }}>A faire</div>
            <ul style={{ padding: '1rem 1.25rem 1rem 2rem', fontSize: '0.8125rem', color: 'var(--df-color-text-default)', lineHeight: 1.8, listStyleType: 'disc' }}>
              <li>Toujours fournir un fallback avec le nom complet</li>
              <li>Utiliser alt pour decrire la personne</li>
              <li>Adapter la taille au contexte (sm en liste, lg en profil)</li>
              <li>Chevaucher les avatars de -0.5rem pour un groupe</li>
            </ul>
          </div>
          <div style={{ backgroundColor: 'var(--df-color-surface-elevated)', borderRadius: 'var(--df-radius-xl)', border: '2px solid #DC2626', overflow: 'hidden' }}>
            <div style={{ backgroundColor: 'rgba(220,38,38,0.08)', padding: '0.75rem 1.25rem', fontWeight: 700, fontSize: '0.875rem', color: '#DC2626', borderBottom: '1px solid rgba(220,38,38,0.15)' }}>A eviter</div>
            <ul style={{ padding: '1rem 1.25rem 1rem 2rem', fontSize: '0.8125rem', color: 'var(--df-color-text-default)', lineHeight: 1.8, listStyleType: 'disc' }}>
              <li>Avatar sans fallback ni alt (inaccessible)</li>
              <li>Images non carrees qui seront deformees</li>
              <li>Trop d&apos;avatars dans un groupe (&gt;5, utiliser un compteur)</li>
              <li>Utiliser l&apos;avatar comme bouton sans role=&quot;button&quot;</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Accessibilite */}
      <section>
        <h2 style={{ fontFamily: 'var(--df-font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--df-color-text-default)', marginBottom: '1rem' }}>
          Accessibilite
        </h2>
        <div style={{ backgroundColor: 'var(--df-color-surface-elevated)', borderRadius: 'var(--df-radius-xl)', border: '1px solid var(--df-color-border-default)', padding: '1.5rem' }}>
          <ul style={{ fontSize: '0.875rem', color: 'var(--df-color-text-default)', lineHeight: 1.8, listStyleType: 'disc', paddingLeft: '1.25rem' }}>
            <li>Le composant utilise <code style={{ fontFamily: 'var(--df-font-mono)', fontSize: '0.8125rem', backgroundColor: 'var(--df-color-surface-muted)', padding: '0.125rem 0.375rem', borderRadius: 'var(--df-radius-sm)' }}>role=&quot;img&quot;</code> avec un <code style={{ fontFamily: 'var(--df-font-mono)', fontSize: '0.8125rem', backgroundColor: 'var(--df-color-surface-muted)', padding: '0.125rem 0.375rem', borderRadius: 'var(--df-radius-sm)' }}>aria-label</code> descriptif.</li>
            <li>Les initiales en fallback sont masquees des lecteurs d&apos;ecran via <code style={{ fontFamily: 'var(--df-font-mono)', fontSize: '0.8125rem', backgroundColor: 'var(--df-color-surface-muted)', padding: '0.125rem 0.375rem', borderRadius: 'var(--df-radius-sm)' }}>aria-hidden=&quot;true&quot;</code>.</li>
            <li>L&apos;image possede un attribut alt significatif.</li>
            <li>En cas d&apos;erreur de chargement de l&apos;image, le fallback initiales est affiche automatiquement.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

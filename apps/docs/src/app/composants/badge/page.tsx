'use client';

const variants = [
  { name: 'default', bg: 'var(--df-color-surface-muted)', color: 'var(--df-color-text-default)', border: 'var(--df-color-border-default)' },
  { name: 'success', bg: '#E8F5E9', color: '#009578', border: '#009578' },
  { name: 'warning', bg: '#FFF8E1', color: '#E65100', border: '#FFC107' },
  { name: 'error', bg: '#FEE2E2', color: '#DC2626', border: '#DC2626' },
  { name: 'info', bg: '#E1F5FE', color: '#12B8DF', border: '#12B8DF' },
];

const sizeMap = {
  sm: { padding: '0.125rem 0.5rem', fontSize: '0.6875rem' },
  md: { padding: '0.25rem 0.625rem', fontSize: '0.75rem' },
};

const propsList = [
  { name: 'variant', type: '"default" | "success" | "warning" | "error" | "info"', default: '"default"', description: 'Variante visuelle du badge' },
  { name: 'size', type: '"sm" | "md"', default: '"md"', description: 'Taille du badge' },
  { name: 'children', type: 'ReactNode', default: '-', description: 'Contenu du badge' },
  { name: 'className', type: 'string', default: '-', description: 'Classes CSS additionnelles' },
  { name: 'style', type: 'CSSProperties', default: '-', description: 'Styles inline additionnels' },
];

function DemoBadge({ variant, size = 'md', children }: { variant: typeof variants[number]; size?: 'sm' | 'md'; children: React.ReactNode }) {
  const s = sizeMap[size];
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--df-font-body)',
        fontWeight: 600,
        lineHeight: 1,
        whiteSpace: 'nowrap',
        borderRadius: '9999px',
        backgroundColor: variant.bg,
        color: variant.color,
        border: `1px solid ${variant.border}`,
        padding: s.padding,
        fontSize: s.fontSize,
      }}
    >
      {children}
    </span>
  );
}

export default function BadgePage() {
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
          Badge
        </h1>
        <p style={{ fontSize: '1.0625rem', color: 'var(--df-color-text-subtle)', maxWidth: 600, lineHeight: 1.6 }}>
          Le Badge est un indicateur compact qui affiche un statut, un compteur ou une categorie. Il existe en 5 variantes semantiques et 2 tailles.
        </p>
      </div>

      {/* Live Preview — Variantes */}
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
              <DemoBadge key={v.name} variant={v}>
                {v.name.charAt(0).toUpperCase() + v.name.slice(1)}
              </DemoBadge>
            ))}
          </div>

          <div style={{ borderTop: '1px solid var(--df-color-border-default)', paddingTop: '1.5rem' }}>
            <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--df-color-text-subtle)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Tailles
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
              {(['sm', 'md'] as const).map((size) => (
                <DemoBadge key={size} variant={variants[1]} size={size}>
                  Size {size}
                </DemoBadge>
              ))}
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--df-color-border-default)', paddingTop: '1.5rem', marginTop: '1.5rem' }}>
            <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--df-color-text-subtle)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Exemples contextuels
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <DemoBadge variant={variants[1]}>Active</DemoBadge>
              <DemoBadge variant={variants[3]}>3 erreurs</DemoBadge>
              <DemoBadge variant={variants[2]}>En attente</DemoBadge>
              <DemoBadge variant={variants[4]}>Nouveau</DemoBadge>
              <DemoBadge variant={variants[0]}>Brouillon</DemoBadge>
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
                {['Propriete', 'Type', 'Defaut', 'Description'].map((h) => (
                  <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600, color: 'var(--df-color-text-default)', borderBottom: '1px solid var(--df-color-border-default)' }}>
                    {h}
                  </th>
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
        <h2
          style={{
            fontFamily: 'var(--df-font-display)',
            fontSize: '1.5rem',
            fontWeight: 700,
            color: 'var(--df-color-text-default)',
            marginBottom: '1rem',
          }}
        >
          Exemple d&apos;utilisation
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
{`import { Badge } from '@digifemmes/ui';

// Badge de statut
<Badge variant="success">Active</Badge>

// Badge d'erreur compact
<Badge variant="error" size="sm">3</Badge>

// Badge informatif
<Badge variant="info">Nouveau</Badge>

// Badge dans un header de carte
<Card.Header>
  <h3>Formation React</h3>
  <Badge variant="success">En cours</Badge>
</Card.Header>`}
        </pre>
      </section>

      {/* Do / Don't */}
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
          Bonnes pratiques
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div
            style={{
              backgroundColor: 'var(--df-color-surface-elevated)',
              borderRadius: 'var(--df-radius-xl)',
              border: '2px solid #009578',
              overflow: 'hidden',
            }}
          >
            <div style={{ backgroundColor: 'rgba(0,149,120,0.08)', padding: '0.75rem 1.25rem', fontWeight: 700, fontSize: '0.875rem', color: '#009578', borderBottom: '1px solid rgba(0,149,120,0.15)' }}>
              A faire
            </div>
            <ul style={{ padding: '1rem 1.25rem 1rem 2rem', fontSize: '0.8125rem', color: 'var(--df-color-text-default)', lineHeight: 1.8, listStyleType: 'disc' }}>
              <li>Utiliser les variantes semantiques (success pour valide, error pour erreur)</li>
              <li>Garder le texte court (1-2 mots ou un chiffre)</li>
              <li>Utiliser size=&quot;sm&quot; pour les compteurs numeriques</li>
              <li>Associer le badge a un element parent pour le contexte</li>
            </ul>
          </div>
          <div
            style={{
              backgroundColor: 'var(--df-color-surface-elevated)',
              borderRadius: 'var(--df-radius-xl)',
              border: '2px solid #DC2626',
              overflow: 'hidden',
            }}
          >
            <div style={{ backgroundColor: 'rgba(220,38,38,0.08)', padding: '0.75rem 1.25rem', fontWeight: 700, fontSize: '0.875rem', color: '#DC2626', borderBottom: '1px solid rgba(220,38,38,0.15)' }}>
              A eviter
            </div>
            <ul style={{ padding: '1rem 1.25rem 1rem 2rem', fontSize: '0.8125rem', color: 'var(--df-color-text-default)', lineHeight: 1.8, listStyleType: 'disc' }}>
              <li>Texte trop long dans un badge (utiliser un Tag a la place)</li>
              <li>Plusieurs badges de meme couleur cote a cote sans distinction</li>
              <li>Utiliser un badge comme bouton (il n&apos;est pas interactif)</li>
              <li>Melanger les variantes sans logique semantique</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Accessibilite */}
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
          Accessibilite
        </h2>
        <div
          style={{
            backgroundColor: 'var(--df-color-surface-elevated)',
            borderRadius: 'var(--df-radius-xl)',
            border: '1px solid var(--df-color-border-default)',
            padding: '1.5rem',
          }}
        >
          <ul style={{ fontSize: '0.875rem', color: 'var(--df-color-text-default)', lineHeight: 1.8, listStyleType: 'disc', paddingLeft: '1.25rem' }}>
            <li>Le badge est un <code style={{ fontFamily: 'var(--df-font-mono)', fontSize: '0.8125rem', backgroundColor: 'var(--df-color-surface-muted)', padding: '0.125rem 0.375rem', borderRadius: 'var(--df-radius-sm)' }}>&lt;span&gt;</code> non interactif, lisible par les lecteurs d&apos;ecran.</li>
            <li>Le contenu textuel est lu directement — pas besoin d&apos;aria-label supplementaire.</li>
            <li>Les couleurs respectent un ratio de contraste WCAG AA minimum de 4.5:1.</li>
            <li>Ne jamais transmettre une information uniquement par la couleur : le texte doit suffire.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

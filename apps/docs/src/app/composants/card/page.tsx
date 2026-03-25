'use client';

const cardVariants = [
  {
    name: 'Default',
    description: 'Carte standard avec bordure subtile',
    style: {
      backgroundColor: 'var(--df-color-surface-elevated)',
      border: '1px solid var(--df-color-border-default)',
      borderRadius: 'var(--df-radius-xl)',
      boxShadow: 'none',
    },
  },
  {
    name: 'Elevated',
    description: 'Carte avec ombre portee pour l\'elevation',
    style: {
      backgroundColor: 'var(--df-color-surface-elevated)',
      border: '1px solid var(--df-color-border-default)',
      borderRadius: 'var(--df-radius-xl)',
      boxShadow: 'var(--df-shadow-md)',
    },
  },
  {
    name: 'Outlined',
    description: 'Carte avec bordure plus marquee',
    style: {
      backgroundColor: 'var(--df-color-surface-default)',
      border: '2px solid var(--df-color-border-strong)',
      borderRadius: 'var(--df-radius-xl)',
      boxShadow: 'none',
    },
  },
];

const props = [
  { name: 'variant', type: '"default" | "elevated" | "outlined"', default: '"default"', description: 'Style visuel de la carte' },
  { name: 'padding', type: '"none" | "sm" | "md" | "lg"', default: '"md"', description: 'Espacement interieur' },
  { name: 'children', type: 'ReactNode', default: '-', description: 'Contenu de la carte' },
  { name: 'className', type: 'string', default: '-', description: 'Classes CSS additionnelles' },
  { name: 'as', type: 'ElementType', default: '"div"', description: 'Balise HTML ou composant a utiliser' },
  { name: 'onClick', type: '() => void', default: '-', description: 'Rend la carte cliquable' },
];

const subComponents = [
  { name: 'Card.Header', description: 'En-tete de la carte avec padding et bordure inferieure' },
  { name: 'Card.Body', description: 'Contenu principal de la carte' },
  { name: 'Card.Footer', description: 'Pied de carte avec padding et bordure superieure' },
];

export default function CardPage() {
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
          Card
        </h1>
        <p style={{ fontSize: '1.0625rem', color: 'var(--df-color-text-subtle)', maxWidth: 600, lineHeight: 1.6 }}>
          La Card est un conteneur flexible utilise pour regrouper du contenu. Elle supporte un pattern compound (Header, Body, Footer) pour une composition riche.
        </p>
      </div>

      {/* Variants */}
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
          {cardVariants.map((v) => (
            <div key={v.name}>
              <div style={{ ...v.style, padding: '1.5rem', marginBottom: '0.75rem' }}>
                <div style={{ fontFamily: 'var(--df-font-display)', fontWeight: 700, fontSize: '1rem', marginBottom: '0.5rem', color: 'var(--df-color-text-default)' }}>
                  Titre de la carte
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--df-color-text-subtle)', lineHeight: 1.5 }}>
                  Ceci est un exemple de contenu dans une carte DigiFemmes.
                </div>
              </div>
              <div style={{ fontFamily: 'var(--df-font-mono)', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--df-color-brand-primary)' }}>
                {v.name.toLowerCase()}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--df-color-text-subtle)', marginTop: '0.125rem' }}>
                {v.description}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Compound pattern */}
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
          Compound Pattern
        </h2>
        <p style={{ fontSize: '0.9375rem', color: 'var(--df-color-text-subtle)', marginBottom: '1.5rem' }}>
          La Card utilise le pattern compound pour une composition flexible avec Header, Body et Footer.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          {/* Demo card */}
          <div
            style={{
              backgroundColor: 'var(--df-color-surface-elevated)',
              borderRadius: 'var(--df-radius-xl)',
              border: '1px solid var(--df-color-border-default)',
              overflow: 'hidden',
              boxShadow: 'var(--df-shadow-md)',
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: '1rem 1.5rem',
                borderBottom: '1px solid var(--df-color-border-default)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ fontFamily: 'var(--df-font-display)', fontWeight: 700, fontSize: '1rem', color: 'var(--df-color-text-default)' }}>
                Formation DigiFemmes
              </div>
              <span
                style={{
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  padding: '0.125rem 0.5rem',
                  borderRadius: 'var(--df-radius-xl)',
                  backgroundColor: 'rgba(0,149,120,0.1)',
                  color: '#009578',
                }}
              >
                Active
              </span>
            </div>
            {/* Body */}
            <div style={{ padding: '1.25rem 1.5rem' }}>
              <p style={{ fontSize: '0.875rem', color: 'var(--df-color-text-subtle)', lineHeight: 1.6 }}>
                Formation en developpement web pour les femmes de Cote d'Ivoire.
                Duree : 12 semaines. Technologies : React, Node.js, TypeScript.
              </p>
            </div>
            {/* Footer */}
            <div
              style={{
                padding: '0.75rem 1.5rem',
                borderTop: '1px solid var(--df-color-border-default)',
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '0.5rem',
              }}
            >
              <button
                style={{
                  padding: '0.5rem 1rem',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  borderRadius: 'var(--df-radius-lg)',
                  border: '1.5px solid #FF7B00',
                  backgroundColor: 'transparent',
                  color: '#FF7B00',
                  cursor: 'pointer',
                  fontFamily: 'var(--df-font-body)',
                }}
              >
                Details
              </button>
              <button
                style={{
                  padding: '0.5rem 1rem',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  borderRadius: 'var(--df-radius-lg)',
                  border: 'none',
                  backgroundColor: '#FF7B00',
                  color: 'white',
                  cursor: 'pointer',
                  fontFamily: 'var(--df-font-body)',
                }}
              >
                S'inscrire
              </button>
            </div>
          </div>

          {/* Sub-components list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {subComponents.map((sub) => (
              <div
                key={sub.name}
                style={{
                  backgroundColor: 'var(--df-color-surface-muted)',
                  borderRadius: 'var(--df-radius-lg)',
                  padding: '1rem 1.25rem',
                  border: '1px solid var(--df-color-border-default)',
                }}
              >
                <div style={{ fontFamily: 'var(--df-font-mono)', fontSize: '0.875rem', fontWeight: 600, color: 'var(--df-color-brand-secondary)', marginBottom: '0.25rem' }}>
                  {sub.name}
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--df-color-text-subtle)' }}>
                  {sub.description}
                </div>
              </div>
            ))}
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
                  <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600, color: 'var(--df-color-text-default)', borderBottom: '1px solid var(--df-color-border-default)' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {props.map((p, i, arr) => (
                <tr key={p.name}>
                  <td style={{ padding: '0.75rem 1rem', fontFamily: 'var(--df-font-mono)', fontWeight: 600, color: 'var(--df-color-brand-primary)', borderBottom: i < arr.length - 1 ? '1px solid var(--df-color-border-default)' : 'none' }}>
                    {p.name}
                  </td>
                  <td style={{ padding: '0.75rem 1rem', fontFamily: 'var(--df-font-mono)', fontSize: '0.75rem', color: 'var(--df-color-text-subtle)', borderBottom: i < arr.length - 1 ? '1px solid var(--df-color-border-default)' : 'none' }}>
                    {p.type}
                  </td>
                  <td style={{ padding: '0.75rem 1rem', fontFamily: 'var(--df-font-mono)', fontSize: '0.75rem', color: 'var(--df-color-text-subtle)', borderBottom: i < arr.length - 1 ? '1px solid var(--df-color-border-default)' : 'none' }}>
                    {p.default}
                  </td>
                  <td style={{ padding: '0.75rem 1rem', color: 'var(--df-color-text-default)', borderBottom: i < arr.length - 1 ? '1px solid var(--df-color-border-default)' : 'none' }}>
                    {p.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Code Example */}
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
{`import { Card, Button, Badge } from '@digifemmes/ui';

function FormationCard({ formation }) {
  return (
    <Card variant="elevated">
      <Card.Header>
        <h3>{formation.titre}</h3>
        <Badge variant={formation.active ? 'success' : 'neutral'}>
          {formation.active ? 'Active' : 'Terminee'}
        </Badge>
      </Card.Header>

      <Card.Body>
        <p>{formation.description}</p>
        <p>Duree : {formation.duree} semaines</p>
      </Card.Body>

      <Card.Footer>
        <Button variant="secondary" size="sm">
          Details
        </Button>
        <Button variant="primary" size="sm">
          S'inscrire
        </Button>
      </Card.Footer>
    </Card>
  );
}`}
        </pre>
      </section>
    </div>
  );
}

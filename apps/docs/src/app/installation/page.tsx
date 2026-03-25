import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Installation',
};

const packages = [
  { name: '@digifemmes/tokens', description: 'Design tokens (couleurs, typo, espacements)' },
  { name: '@digifemmes/ui', description: 'Composants React (web)' },
  { name: '@digifemmes/ui-native', description: 'Composants React Native (mobile)' },
  { name: '@digifemmes/icons', description: 'Icones SVG optimisees' },
  { name: '@digifemmes/utils', description: 'Utilitaires partages (cn, formatters, etc.)' },
  { name: '@digifemmes/hooks', description: 'React hooks (useMediaQuery, useClipboard, etc.)' },
  { name: '@digifemmes/eslint-config', description: 'Configuration ESLint partagee' },
];

function CodeBlock({ code, label }: { code: string; label?: string }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      {label && (
        <div
          style={{
            fontSize: '0.75rem',
            fontWeight: 600,
            color: 'var(--df-color-text-subtle)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '0.5rem',
          }}
        >
          {label}
        </div>
      )}
      <pre
        style={{
          backgroundColor: 'var(--df-color-surface-muted)',
          borderRadius: 'var(--df-radius-lg)',
          padding: '1rem 1.25rem',
          fontFamily: 'var(--df-font-mono)',
          fontSize: '0.8125rem',
          lineHeight: 1.7,
          color: 'var(--df-color-text-default)',
          border: '1px solid var(--df-color-border-default)',
          overflowX: 'auto',
        }}
      >
        {code}
      </pre>
    </div>
  );
}

export default function InstallationPage() {
  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '3rem' }}>
        <div
          style={{
            display: 'inline-block',
            padding: '0.25rem 0.75rem',
            borderRadius: 'var(--df-radius-xl)',
            backgroundColor: 'rgba(18,184,223,0.1)',
            color: '#12B8DF',
            fontSize: '0.75rem',
            fontWeight: 600,
            marginBottom: '0.75rem',
          }}
        >
          Demarrage
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
          Installation
        </h1>
        <p style={{ fontSize: '1.0625rem', color: 'var(--df-color-text-subtle)', maxWidth: 600, lineHeight: 1.6 }}>
          Configure ton environnement et installe les packages DigiFemmes en quelques minutes.
        </p>
      </div>

      {/* Prerequisites */}
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
          Prerequis
        </h2>
        <div
          style={{
            backgroundColor: 'var(--df-color-surface-elevated)',
            borderRadius: 'var(--df-radius-xl)',
            border: '1px solid var(--df-color-border-default)',
            overflow: 'hidden',
          }}
        >
          {[
            { name: 'Node.js', version: '22+', description: 'Runtime JavaScript' },
            { name: 'pnpm', version: '9+', description: 'Gestionnaire de paquets' },
            { name: 'React', version: '19+', description: 'Bibliotheque UI' },
            { name: 'Next.js', version: '15+', description: 'Framework React (optionnel)' },
          ].map((req, i, arr) => (
            <div
              key={req.name}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem 1.5rem',
                borderBottom: i < arr.length - 1 ? '1px solid var(--df-color-border-default)' : 'none',
              }}
            >
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9375rem', color: 'var(--df-color-text-default)' }}>
                  {req.name}
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--df-color-text-subtle)' }}>
                  {req.description}
                </div>
              </div>
              <div
                style={{
                  fontFamily: 'var(--df-font-mono)',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  color: 'var(--df-color-brand-primary)',
                  backgroundColor: 'rgba(255,123,0,0.08)',
                  padding: '0.25rem 0.75rem',
                  borderRadius: 'var(--df-radius-md)',
                }}
              >
                {req.version}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Packages */}
      <section style={{ marginBottom: '3rem' }}>
        <h2
          style={{
            fontFamily: 'var(--df-font-display)',
            fontSize: '1.5rem',
            fontWeight: 700,
            color: 'var(--df-color-text-default)',
            marginBottom: '0.5rem',
          }}
        >
          Packages disponibles
        </h2>
        <p style={{ fontSize: '0.9375rem', color: 'var(--df-color-text-subtle)', marginBottom: '1.5rem' }}>
          Installe uniquement les packages dont tu as besoin.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              style={{
                backgroundColor: 'var(--df-color-surface-elevated)',
                borderRadius: 'var(--df-radius-lg)',
                padding: '1rem 1.5rem',
                border: '1px solid var(--df-color-border-default)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
              }}
            >
              <div>
                <code
                  style={{
                    fontFamily: 'var(--df-font-mono)',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: 'var(--df-color-brand-secondary)',
                  }}
                >
                  {pkg.name}
                </code>
                <div style={{ fontSize: '0.8125rem', color: 'var(--df-color-text-subtle)', marginTop: '0.125rem' }}>
                  {pkg.description}
                </div>
              </div>
              <code
                style={{
                  fontFamily: 'var(--df-font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--df-color-text-subtle)',
                  whiteSpace: 'nowrap',
                  backgroundColor: 'var(--df-color-surface-muted)',
                  padding: '0.25rem 0.5rem',
                  borderRadius: 'var(--df-radius-sm)',
                }}
              >
                pnpm add {pkg.name}
              </code>
            </div>
          ))}
        </div>
      </section>

      {/* Quick start */}
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
          Demarrage rapide
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Step 1 */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #FF7B00, #12B8DF)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                1
              </div>
              <h3 style={{ fontFamily: 'var(--df-font-display)', fontSize: '1rem', fontWeight: 600 }}>
                Installer les packages principaux
              </h3>
            </div>
            <CodeBlock code="pnpm add @digifemmes/ui @digifemmes/tokens" />
          </div>

          {/* Step 2 */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #FF7B00, #12B8DF)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                2
              </div>
              <h3 style={{ fontFamily: 'var(--df-font-display)', fontSize: '1rem', fontWeight: 600 }}>
                Importer les styles globaux
              </h3>
            </div>
            <CodeBlock
              label="app/layout.tsx"
              code={`import '@digifemmes/tokens/css/variables.css';
import '@digifemmes/ui/styles.css';`}
            />
          </div>

          {/* Step 3 */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #FF7B00, #12B8DF)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                3
              </div>
              <h3 style={{ fontFamily: 'var(--df-font-display)', fontSize: '1rem', fontWeight: 600 }}>
                Utiliser un composant
              </h3>
            </div>
            <CodeBlock
              label="app/page.tsx"
              code={`import { Button, Card } from '@digifemmes/ui';

export default function Page() {
  return (
    <Card>
      <Card.Header>
        <h2>Bienvenue</h2>
      </Card.Header>
      <Card.Body>
        <p>Mon premier composant DigiFemmes.</p>
        <Button variant="primary" size="md">
          Commencer
        </Button>
      </Card.Body>
    </Card>
  );
}`}
            />
          </div>
        </div>
      </section>

      {/* Next steps */}
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
          Prochaines etapes
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          {[
            { label: 'Explorer les couleurs', href: '/fondations/couleurs' },
            { label: 'Decouvrir la typographie', href: '/fondations/typographie' },
            { label: 'Voir les composants', href: '/composants' },
            { label: 'Comprendre les espacements', href: '/fondations/espacements' },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '1rem 1.25rem',
                borderRadius: 'var(--df-radius-lg)',
                border: '1px solid var(--df-color-border-default)',
                backgroundColor: 'var(--df-color-surface-elevated)',
                color: 'var(--df-color-text-default)',
                textDecoration: 'none',
                fontSize: '0.9375rem',
                fontWeight: 500,
                transition: 'all var(--df-transition-fast)',
              }}
            >
              <span style={{ color: 'var(--df-color-brand-primary)', fontSize: '1.25rem' }}>&rarr;</span>
              {link.label}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

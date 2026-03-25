import Link from 'next/link';

const stats = [
  { value: '15+', label: 'Composants' },
  { value: '7', label: 'Packages' },
  { value: '2', label: 'Themes' },
];

const features = [
  {
    title: 'Tokens',
    description: 'Couleurs, typographie, espacements, ombres et rayons. Un langage visuel unifie pour tous les produits.',
    icon: '\u2728',
    href: '/fondations/couleurs',
  },
  {
    title: 'Composants',
    description: 'React, React Native, accessibles par defaut. Du Button au Modal, chaque composant est teste et documente.',
    icon: '\u2B21',
    href: '/composants',
  },
  {
    title: 'Multi-plateforme',
    description: 'Web, Mobile, SaaS, IA, TV. Un seul design system pour toutes les plateformes DigiFemmes.',
    icon: '\u26A1',
    href: '/installation',
  },
];

export default function HomePage() {
  return (
    <div style={{ marginLeft: '-3rem', marginRight: '-3rem', marginTop: '-2.5rem' }}>
      {/* Hero Section */}
      <section
        style={{
          background: 'linear-gradient(135deg, #FF7B00 0%, #12B8DF 100%)',
          padding: '5rem 3rem 4rem',
          borderRadius: '0 0 var(--df-radius-2xl) var(--df-radius-2xl)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-50%',
            right: '-10%',
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-30%',
            left: '-5%',
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.03)',
          }}
        />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 700 }}>
          <div
            style={{
              display: 'inline-block',
              padding: '0.375rem 1rem',
              borderRadius: 'var(--df-radius-xl)',
              backgroundColor: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(8px)',
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: 'white',
              marginBottom: '1.5rem',
              letterSpacing: '0.02em',
            }}
          >
            v1.0 Beta
          </div>

          <h1
            style={{
              fontFamily: 'var(--df-font-display)',
              fontSize: '3.5rem',
              fontWeight: 800,
              color: 'white',
              lineHeight: 1.05,
              marginBottom: '1.25rem',
            }}
          >
            DigiFemmes<br />Design System
          </h1>

          <p
            style={{
              fontSize: '1.1875rem',
              color: 'rgba(255,255,255,0.9)',
              lineHeight: 1.6,
              marginBottom: '0.75rem',
              maxWidth: 560,
            }}
          >
            Construis des experiences inclusives, modernes et coherentes sur toutes les plateformes DigiFemmes.
          </p>

          <p
            style={{
              fontFamily: 'var(--df-font-display)',
              fontSize: '1.5rem',
              fontWeight: 700,
              color: 'rgba(255,255,255,0.95)',
              fontStyle: 'italic',
              marginBottom: '2.5rem',
            }}
          >
            &ldquo;We Can Do More.&rdquo;
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link
              href="/installation"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '0.875rem 2rem',
                borderRadius: 'var(--df-radius-lg)',
                backgroundColor: 'white',
                color: '#FF7B00',
                fontWeight: 700,
                fontSize: '0.9375rem',
                textDecoration: 'none',
                transition: 'transform 150ms ease, box-shadow 150ms ease',
                boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
              }}
            >
              Commencer
            </Link>
            <Link
              href="/composants"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '0.875rem 2rem',
                borderRadius: 'var(--df-radius-lg)',
                backgroundColor: 'rgba(255,255,255,0.15)',
                color: 'white',
                fontWeight: 600,
                fontSize: '0.9375rem',
                textDecoration: 'none',
                border: '1px solid rgba(255,255,255,0.3)',
                backdropFilter: 'blur(8px)',
              }}
            >
              Explorer les composants
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.5rem',
          padding: '0 3rem',
          marginTop: '-2.5rem',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            style={{
              backgroundColor: 'var(--df-color-surface-elevated)',
              borderRadius: 'var(--df-radius-xl)',
              padding: '2rem',
              textAlign: 'center',
              boxShadow: 'var(--df-shadow-lg)',
              border: '1px solid var(--df-color-border-default)',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--df-font-display)',
                fontSize: '2.5rem',
                fontWeight: 800,
                background: 'linear-gradient(135deg, #FF7B00, #12B8DF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                lineHeight: 1.1,
              }}
            >
              {stat.value}
            </div>
            <div
              style={{
                fontSize: '0.9375rem',
                color: 'var(--df-color-text-subtle)',
                fontWeight: 500,
                marginTop: '0.25rem',
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </section>

      {/* Quick Install */}
      <section style={{ padding: '3rem 3rem 0' }}>
        <h2
          style={{
            fontFamily: 'var(--df-font-display)',
            fontSize: '1.25rem',
            fontWeight: 700,
            color: 'var(--df-color-text-default)',
            marginBottom: '1rem',
          }}
        >
          Installation rapide
        </h2>
        <div
          style={{
            backgroundColor: 'var(--df-color-surface-muted)',
            borderRadius: 'var(--df-radius-lg)',
            padding: '1.25rem 1.5rem',
            fontFamily: 'var(--df-font-mono)',
            fontSize: '0.875rem',
            color: 'var(--df-color-text-default)',
            border: '1px solid var(--df-color-border-default)',
            overflowX: 'auto',
          }}
        >
          <span style={{ color: 'var(--df-color-text-subtle)' }}>$</span>{' '}
          pnpm add @digifemmes/ui @digifemmes/tokens
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '3rem 3rem 4rem' }}>
        <h2
          style={{
            fontFamily: 'var(--df-font-display)',
            fontSize: '1.75rem',
            fontWeight: 700,
            color: 'var(--df-color-text-default)',
            marginBottom: '0.5rem',
          }}
        >
          Tout ce dont tu as besoin
        </h2>
        <p
          style={{
            fontSize: '1rem',
            color: 'var(--df-color-text-subtle)',
            marginBottom: '2rem',
            maxWidth: 480,
          }}
        >
          Un design system complet pour creer des produits inclusifs et performants.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem',
          }}
        >
          {features.map((feature) => (
            <Link
              key={feature.title}
              href={feature.href}
              style={{
                display: 'block',
                textDecoration: 'none',
                backgroundColor: 'var(--df-color-surface-elevated)',
                borderRadius: 'var(--df-radius-xl)',
                padding: '2rem 1.5rem',
                border: '1px solid var(--df-color-border-default)',
                boxShadow: 'var(--df-shadow-sm)',
                transition: 'all var(--df-transition-normal)',
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 'var(--df-radius-lg)',
                  background: 'linear-gradient(135deg, rgba(255,123,0,0.1), rgba(18,184,223,0.1))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  marginBottom: '1rem',
                }}
              >
                {feature.icon}
              </div>
              <h3
                style={{
                  fontFamily: 'var(--df-font-display)',
                  fontSize: '1.125rem',
                  fontWeight: 700,
                  color: 'var(--df-color-text-default)',
                  marginBottom: '0.5rem',
                }}
              >
                {feature.title}
              </h3>
              <p
                style={{
                  fontSize: '0.875rem',
                  color: 'var(--df-color-text-subtle)',
                  lineHeight: 1.6,
                }}
              >
                {feature.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

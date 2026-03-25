'use client';

import { useState } from 'react';

const palettes = {
  'Couleurs principales': {
    Orange: {
      50: '#FFF3E0', 100: '#FFE0B2', 200: '#FFCC80', 300: '#FFB74D', 400: '#FFA726',
      500: '#FF7B00', 600: '#E56D00', 700: '#CC6200', 800: '#B25400', 900: '#8C4300',
    },
    Blue: {
      50: '#E0F7FA', 100: '#B2EBF2', 200: '#80DEEA', 300: '#4DD0E1', 400: '#26C6DA',
      500: '#12B8DF', 600: '#0EA7CA', 700: '#0D95B3', 800: '#0A7A93', 900: '#065A6E',
    },
  },
  'Couleurs secondaires': {
    Navy: {
      50: '#E8EDF5', 100: '#C5D0E6', 200: '#9FB3D6', 300: '#7895C5', 400: '#5A7EB9',
      500: '#225DA7', 600: '#1D5196', 700: '#184585', 800: '#133A74', 900: '#0E2A56',
    },
    Yellow: {
      50: '#FFFDE7', 100: '#FFF9C4', 200: '#FFF59D', 300: '#FFF176', 400: '#FFEE58',
      500: '#FFC107', 600: '#E5AD06', 700: '#CC9A05', 800: '#B28704', 900: '#8C6B03',
    },
    Green: {
      50: '#E0F2EE', 100: '#B3E0D5', 200: '#80CCBA', 300: '#4DB89F', 400: '#26A98B',
      500: '#009578', 600: '#00856B', 700: '#00755E', 800: '#006551', 900: '#004A3B',
    },
  },
  'Neutres': {
    Neutral: {
      0: '#FFFFFF', 50: '#FAFAFA', 100: '#F5F5F5', 200: '#EEEEEE', 300: '#E0E0E0',
      400: '#BDBDBD', 500: '#9E9E9E', 600: '#757575', 700: '#616161', 800: '#424242',
      900: '#212121', 1000: '#000000',
    },
  },
};

function ColorSwatch({ name, shade, hex }: { name: string; shade: string; hex: string }) {
  const [copied, setCopied] = useState(false);
  const shadeNum = parseInt(shade);
  const isDark = shadeNum >= 500 || (name === 'Neutral' && shadeNum >= 500);

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Fallback: ignore if clipboard not available
    }
  };

  return (
    <button
      onClick={handleClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid var(--df-color-border-default)',
        borderRadius: 'var(--df-radius-lg)',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all var(--df-transition-fast)',
        backgroundColor: 'var(--df-color-surface-elevated)',
        boxShadow: 'var(--df-shadow-sm)',
        padding: 0,
        width: '100%',
        textAlign: 'left',
      }}
      title={`Copier ${hex}`}
    >
      <div
        style={{
          backgroundColor: hex,
          height: 64,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {copied && (
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              color: isDark ? 'white' : '#212121',
              backgroundColor: isDark ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.7)',
              padding: '0.125rem 0.5rem',
              borderRadius: 'var(--df-radius-sm)',
            }}
          >
            Copie !
          </span>
        )}
      </div>
      <div style={{ padding: '0.5rem 0.625rem' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--df-color-text-default)' }}>
          {shade}
        </div>
        <div
          style={{
            fontFamily: 'var(--df-font-mono)',
            fontSize: '0.6875rem',
            color: 'var(--df-color-text-subtle)',
            marginTop: '0.125rem',
          }}
        >
          {hex}
        </div>
      </div>
    </button>
  );
}

export default function CouleursPage() {
  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '3rem' }}>
        <div
          style={{
            display: 'inline-block',
            padding: '0.25rem 0.75rem',
            borderRadius: 'var(--df-radius-xl)',
            backgroundColor: 'rgba(255,123,0,0.1)',
            color: '#FF7B00',
            fontSize: '0.75rem',
            fontWeight: 600,
            marginBottom: '0.75rem',
          }}
        >
          Fondations
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
          Couleurs
        </h1>
        <p style={{ fontSize: '1.0625rem', color: 'var(--df-color-text-subtle)', maxWidth: 600, lineHeight: 1.6 }}>
          La palette DigiFemmes est construite autour de l'orange energique et du bleu digital.
          Chaque couleur est declinee en 10 nuances pour offrir flexibilite et accessibilite.
        </p>
      </div>

      {/* Gradient Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #FF7B00, #12B8DF)',
          borderRadius: 'var(--df-radius-xl)',
          padding: '2rem',
          marginBottom: '3rem',
          display: 'flex',
          alignItems: 'center',
          gap: '2rem',
        }}
      >
        <div style={{ flex: 1 }}>
          <h3 style={{ fontFamily: 'var(--df-font-display)', color: 'white', fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            Gradient principal
          </h3>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.875rem' }}>
            Le gradient Orange &rarr; Blue est la signature visuelle de DigiFemmes. Utilise-le pour les CTA, les headers et les elements distinctifs.
          </p>
        </div>
        <code
          style={{
            fontFamily: 'var(--df-font-mono)',
            fontSize: '0.75rem',
            color: 'white',
            backgroundColor: 'rgba(0,0,0,0.2)',
            padding: '0.5rem 0.75rem',
            borderRadius: 'var(--df-radius-md)',
            whiteSpace: 'nowrap',
          }}
        >
          linear-gradient(135deg, #FF7B00, #12B8DF)
        </code>
      </div>

      {/* Palette sections */}
      {Object.entries(palettes).map(([sectionTitle, colors]) => (
        <section key={sectionTitle} style={{ marginBottom: '3rem' }}>
          <h2
            style={{
              fontFamily: 'var(--df-font-display)',
              fontSize: '1.5rem',
              fontWeight: 700,
              color: 'var(--df-color-text-default)',
              marginBottom: '1.5rem',
              paddingBottom: '0.75rem',
              borderBottom: '1px solid var(--df-color-border-default)',
            }}
          >
            {sectionTitle}
          </h2>

          {Object.entries(colors).map(([colorName, shades]) => (
            <div key={colorName} style={{ marginBottom: '2rem' }}>
              <h3
                style={{
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: 'var(--df-color-text-default)',
                  marginBottom: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <span
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: 'var(--df-radius-sm)',
                    backgroundColor: Object.values(shades)[Math.floor(Object.keys(shades).length / 2)],
                    display: 'inline-block',
                    border: '1px solid var(--df-color-border-default)',
                  }}
                />
                {colorName}
              </h3>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))',
                  gap: '0.625rem',
                }}
              >
                {Object.entries(shades).map(([shade, hex]) => (
                  <ColorSwatch key={shade} name={colorName} shade={shade} hex={hex} />
                ))}
              </div>
            </div>
          ))}
        </section>
      ))}

      {/* Usage section */}
      <section
        style={{
          backgroundColor: 'var(--df-color-surface-muted)',
          borderRadius: 'var(--df-radius-xl)',
          padding: '2rem',
          border: '1px solid var(--df-color-border-default)',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--df-font-display)',
            fontSize: '1.25rem',
            fontWeight: 700,
            color: 'var(--df-color-text-default)',
            marginBottom: '1rem',
          }}
        >
          Utilisation en CSS
        </h2>
        <pre
          style={{
            fontFamily: 'var(--df-font-mono)',
            fontSize: '0.8125rem',
            lineHeight: 1.7,
            color: 'var(--df-color-text-default)',
            overflowX: 'auto',
          }}
        >
{`.hero {
  background: var(--df-color-brand-primary);  /* Orange 500 */
  color: var(--df-color-text-inverse);
}

.card {
  background: var(--df-color-surface-elevated);
  border: 1px solid var(--df-color-border-default);
}

.link {
  color: var(--df-color-brand-secondary);  /* Blue 500 */
}`}
        </pre>
      </section>
    </div>
  );
}

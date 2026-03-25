import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Typographie',
};

const displayWeights = [
  { name: 'Light', weight: 300 },
  { name: 'Regular', weight: 400 },
  { name: 'Medium', weight: 500 },
  { name: 'Semibold', weight: 600 },
  { name: 'Bold', weight: 700 },
];

const bodyWeights = [
  { name: 'Light', weight: 300 },
  { name: 'Regular', weight: 400 },
  { name: 'Medium', weight: 500 },
  { name: 'Semibold', weight: 600 },
  { name: 'Bold', weight: 700 },
  { name: 'Extrabold', weight: 800 },
  { name: 'Black', weight: 900 },
];

const sizes = [
  { name: 'xs', rem: '0.75rem', px: '12px' },
  { name: 'sm', rem: '0.875rem', px: '14px' },
  { name: 'base', rem: '1rem', px: '16px' },
  { name: 'lg', rem: '1.125rem', px: '18px' },
  { name: 'xl', rem: '1.25rem', px: '20px' },
  { name: '2xl', rem: '1.5rem', px: '24px' },
  { name: '3xl', rem: '1.875rem', px: '30px' },
  { name: '4xl', rem: '2.25rem', px: '36px' },
  { name: '5xl', rem: '3rem', px: '48px' },
  { name: '6xl', rem: '3.75rem', px: '60px' },
  { name: '7xl', rem: '4.5rem', px: '72px' },
];

const hierarchy = [
  { tag: 'H1', size: '3rem', weight: 800, family: 'display', sample: 'Heading One' },
  { tag: 'H2', size: '2.25rem', weight: 700, family: 'display', sample: 'Heading Two' },
  { tag: 'H3', size: '1.875rem', weight: 700, family: 'display', sample: 'Heading Three' },
  { tag: 'H4', size: '1.5rem', weight: 600, family: 'display', sample: 'Heading Four' },
  { tag: 'H5', size: '1.25rem', weight: 600, family: 'display', sample: 'Heading Five' },
  { tag: 'H6', size: '1.125rem', weight: 600, family: 'display', sample: 'Heading Six' },
  { tag: 'Body', size: '1rem', weight: 400, family: 'body', sample: 'Corps de texte principal pour la lecture continue.' },
  { tag: 'Small', size: '0.875rem', weight: 400, family: 'body', sample: 'Texte secondaire et annotations.' },
  { tag: 'Label', size: '0.75rem', weight: 600, family: 'body', sample: 'LABEL / CAPTION TEXT' },
];

export default function TypographiePage() {
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
          Typographie
        </h1>
        <p style={{ fontSize: '1.0625rem', color: 'var(--df-color-text-subtle)', maxWidth: 600, lineHeight: 1.6 }}>
          Le systeme typographique DigiFemmes associe Clash Display pour les titres et Red Hat Display pour le texte courant. Un duo moderne, lisible et expressif.
        </p>
      </div>

      {/* Font pairing overview */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem',
          marginBottom: '3rem',
        }}
      >
        <div
          style={{
            background: 'linear-gradient(135deg, #FF7B00, #E56D00)',
            borderRadius: 'var(--df-radius-xl)',
            padding: '2rem',
            color: 'white',
          }}
        >
          <div style={{ fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.8, marginBottom: '0.5rem' }}>
            Titres
          </div>
          <div style={{ fontFamily: 'var(--df-font-display)', fontSize: '2rem', fontWeight: 700, lineHeight: 1.1 }}>
            Clash Display
          </div>
        </div>
        <div
          style={{
            background: 'linear-gradient(135deg, #12B8DF, #0D95B3)',
            borderRadius: 'var(--df-radius-xl)',
            padding: '2rem',
            color: 'white',
          }}
        >
          <div style={{ fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.8, marginBottom: '0.5rem' }}>
            Corps de texte
          </div>
          <div style={{ fontFamily: 'var(--df-font-body)', fontSize: '2rem', fontWeight: 700, lineHeight: 1.1 }}>
            Red Hat Display
          </div>
        </div>
      </div>

      {/* Clash Display specimen */}
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
          Police pour titres
        </h2>
        <p style={{ fontSize: '0.9375rem', color: 'var(--df-color-text-subtle)', marginBottom: '1.5rem' }}>
          Clash Display — Geometrique, audacieuse, moderne. Pour tous les headings et elements de marque.
        </p>
        <div
          style={{
            backgroundColor: 'var(--df-color-surface-elevated)',
            borderRadius: 'var(--df-radius-xl)',
            border: '1px solid var(--df-color-border-default)',
            overflow: 'hidden',
          }}
        >
          {displayWeights.map((w, i, arr) => (
            <div
              key={w.weight}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.25rem 1.5rem',
                borderBottom: i < arr.length - 1 ? '1px solid var(--df-color-border-default)' : 'none',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--df-font-display)',
                  fontWeight: w.weight,
                  fontSize: '1.75rem',
                  color: 'var(--df-color-text-default)',
                }}
              >
                AaBb 01234
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--df-color-text-default)' }}>
                  {w.name}
                </div>
                <div style={{ fontFamily: 'var(--df-font-mono)', fontSize: '0.75rem', color: 'var(--df-color-text-subtle)' }}>
                  {w.weight}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Red Hat Display specimen */}
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
          Police de texte
        </h2>
        <p style={{ fontSize: '0.9375rem', color: 'var(--df-color-text-subtle)', marginBottom: '1.5rem' }}>
          Red Hat Display — Humaniste, lisible, chaleureuse. Pour le corps de texte, les boutons et les labels.
        </p>
        <div
          style={{
            backgroundColor: 'var(--df-color-surface-elevated)',
            borderRadius: 'var(--df-radius-xl)',
            border: '1px solid var(--df-color-border-default)',
            overflow: 'hidden',
          }}
        >
          {bodyWeights.map((w, i, arr) => (
            <div
              key={w.weight}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem 1.5rem',
                borderBottom: i < arr.length - 1 ? '1px solid var(--df-color-border-default)' : 'none',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--df-font-body)',
                  fontWeight: w.weight,
                  fontSize: '1.5rem',
                  color: 'var(--df-color-text-default)',
                }}
              >
                AaBb 01234
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--df-color-text-default)' }}>
                  {w.name}
                </div>
                <div style={{ fontFamily: 'var(--df-font-mono)', fontSize: '0.75rem', color: 'var(--df-color-text-subtle)' }}>
                  {w.weight}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Red Hat Mono specimen */}
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
          Police monospace
        </h2>
        <p style={{ fontSize: '0.9375rem', color: 'var(--df-color-text-subtle)', marginBottom: '1.5rem' }}>
          Red Hat Mono — Pour le code, les donnees et les elements techniques.
        </p>
        <div
          style={{
            backgroundColor: 'var(--df-color-surface-elevated)',
            borderRadius: 'var(--df-radius-xl)',
            border: '1px solid var(--df-color-border-default)',
            overflow: 'hidden',
          }}
        >
          {[
            { name: 'Regular', weight: 400 },
            { name: 'Bold', weight: 700 },
          ].map((w, i, arr) => (
            <div
              key={w.weight}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.25rem 1.5rem',
                borderBottom: i < arr.length - 1 ? '1px solid var(--df-color-border-default)' : 'none',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--df-font-mono)',
                  fontWeight: w.weight,
                  fontSize: '1.5rem',
                  color: 'var(--df-color-text-default)',
                }}
              >
                AaBb 01234 {'{'}code{'}'}
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--df-color-text-default)' }}>
                  {w.name}
                </div>
                <div style={{ fontFamily: 'var(--df-font-mono)', fontSize: '0.75rem', color: 'var(--df-color-text-subtle)' }}>
                  {w.weight}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Size Scale */}
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
          Echelle de tailles
        </h2>
        <p style={{ fontSize: '0.9375rem', color: 'var(--df-color-text-subtle)', marginBottom: '1.5rem' }}>
          Une echelle modulaire de xs (12px) a 7xl (72px) pour une hierarchie visuelle coherente.
        </p>
        <div
          style={{
            backgroundColor: 'var(--df-color-surface-elevated)',
            borderRadius: 'var(--df-radius-xl)',
            border: '1px solid var(--df-color-border-default)',
            overflow: 'hidden',
          }}
        >
          {sizes.map((s, i, arr) => (
            <div
              key={s.name}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
                padding: '1rem 1.5rem',
                borderBottom: i < arr.length - 1 ? '1px solid var(--df-color-border-default)' : 'none',
              }}
            >
              <div
                style={{
                  width: 56,
                  flexShrink: 0,
                  fontFamily: 'var(--df-font-mono)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: 'var(--df-color-brand-primary)',
                }}
              >
                {s.name}
              </div>
              <div
                style={{
                  width: 100,
                  flexShrink: 0,
                  display: 'flex',
                  gap: '0.5rem',
                  fontFamily: 'var(--df-font-mono)',
                  fontSize: '0.6875rem',
                  color: 'var(--df-color-text-subtle)',
                }}
              >
                <span>{s.rem}</span>
                <span style={{ color: 'var(--df-color-text-muted)' }}>|</span>
                <span>{s.px}</span>
              </div>
              <div
                style={{
                  fontSize: s.rem,
                  fontFamily: 'var(--df-font-body)',
                  fontWeight: 400,
                  color: 'var(--df-color-text-default)',
                  lineHeight: 1.2,
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                }}
              >
                DigiFemmes
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Hierarchy */}
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
          Hierarchie typographique
        </h2>
        <p style={{ fontSize: '0.9375rem', color: 'var(--df-color-text-subtle)', marginBottom: '1.5rem' }}>
          Exemples concrets de chaque niveau de la hierarchie.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {hierarchy.map((h) => (
            <div
              key={h.tag}
              style={{
                backgroundColor: 'var(--df-color-surface-elevated)',
                borderRadius: 'var(--df-radius-lg)',
                padding: '1.25rem 1.5rem',
                border: '1px solid var(--df-color-border-default)',
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
              }}
            >
              <div
                style={{
                  width: 60,
                  flexShrink: 0,
                  fontFamily: 'var(--df-font-mono)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: 'var(--df-color-brand-secondary)',
                  backgroundColor: 'rgba(18,184,223,0.08)',
                  textAlign: 'center',
                  padding: '0.25rem 0.5rem',
                  borderRadius: 'var(--df-radius-sm)',
                }}
              >
                {h.tag}
              </div>
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <div
                  style={{
                    fontFamily: h.family === 'display' ? 'var(--df-font-display)' : 'var(--df-font-body)',
                    fontSize: h.size,
                    fontWeight: h.weight,
                    color: 'var(--df-color-text-default)',
                    lineHeight: 1.2,
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {h.sample}
                </div>
              </div>
              <div
                style={{
                  flexShrink: 0,
                  textAlign: 'right',
                  fontFamily: 'var(--df-font-mono)',
                  fontSize: '0.6875rem',
                  color: 'var(--df-color-text-subtle)',
                  lineHeight: 1.6,
                }}
              >
                <div>{h.size}</div>
                <div>wt {h.weight}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Typography rules table */}
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
          Regles typographiques
        </h2>
        <div
          style={{
            backgroundColor: 'var(--df-color-surface-elevated)',
            borderRadius: 'var(--df-radius-xl)',
            border: '1px solid var(--df-color-border-default)',
            overflow: 'hidden',
          }}
        >
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--df-color-surface-muted)' }}>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600, color: 'var(--df-color-text-default)', borderBottom: '1px solid var(--df-color-border-default)' }}>
                  Contexte
                </th>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600, color: 'var(--df-color-text-default)', borderBottom: '1px solid var(--df-color-border-default)' }}>
                  Police
                </th>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600, color: 'var(--df-color-text-default)', borderBottom: '1px solid var(--df-color-border-default)' }}>
                  Taille
                </th>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600, color: 'var(--df-color-text-default)', borderBottom: '1px solid var(--df-color-border-default)' }}>
                  Poids
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                { ctx: 'Titres principaux', font: 'Clash Display', size: '2.25 - 3rem', weight: '700 - 800' },
                { ctx: 'Sous-titres', font: 'Clash Display', size: '1.25 - 1.875rem', weight: '600 - 700' },
                { ctx: 'Corps de texte', font: 'Red Hat Display', size: '1rem', weight: '400' },
                { ctx: 'Texte secondaire', font: 'Red Hat Display', size: '0.875rem', weight: '400 - 500' },
                { ctx: 'Labels / Boutons', font: 'Red Hat Display', size: '0.875rem', weight: '600' },
                { ctx: 'Code / Donnees', font: 'Red Hat Mono', size: '0.8125rem', weight: '400' },
                { ctx: 'Captions', font: 'Red Hat Display', size: '0.75rem', weight: '500' },
              ].map((row, i, arr) => (
                <tr key={row.ctx}>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 500, color: 'var(--df-color-text-default)', borderBottom: i < arr.length - 1 ? '1px solid var(--df-color-border-default)' : 'none' }}>
                    {row.ctx}
                  </td>
                  <td style={{ padding: '0.75rem 1rem', color: 'var(--df-color-brand-secondary)', fontWeight: 500, borderBottom: i < arr.length - 1 ? '1px solid var(--df-color-border-default)' : 'none' }}>
                    {row.font}
                  </td>
                  <td style={{ padding: '0.75rem 1rem', fontFamily: 'var(--df-font-mono)', fontSize: '0.8125rem', color: 'var(--df-color-text-subtle)', borderBottom: i < arr.length - 1 ? '1px solid var(--df-color-border-default)' : 'none' }}>
                    {row.size}
                  </td>
                  <td style={{ padding: '0.75rem 1rem', fontFamily: 'var(--df-font-mono)', fontSize: '0.8125rem', color: 'var(--df-color-text-subtle)', borderBottom: i < arr.length - 1 ? '1px solid var(--df-color-border-default)' : 'none' }}>
                    {row.weight}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

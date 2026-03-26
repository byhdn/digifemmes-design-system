'use client';

import { useState } from 'react';
import { typography } from '@digifemmes/tokens';

/* -------------------------------------------------------------------------- */
/*  Constants                                                                  */
/* -------------------------------------------------------------------------- */

const DEFAULT_TEXT = 'DigiFemmes inspire les femmes a travers la technologie.';

const HEADING_SAMPLES = [
  { key: '7xl', label: '7xl', size: typography.size['7xl'], weight: 800, family: 'display' },
  { key: '6xl', label: '6xl', size: typography.size['6xl'], weight: 800, family: 'display' },
  { key: '5xl', label: '5xl', size: typography.size['5xl'], weight: 700, family: 'display' },
  { key: '4xl', label: '4xl', size: typography.size['4xl'], weight: 700, family: 'display' },
  { key: '3xl', label: '3xl', size: typography.size['3xl'], weight: 700, family: 'display' },
  { key: '2xl', label: '2xl', size: typography.size['2xl'], weight: 600, family: 'display' },
  { key: 'xl', label: 'xl', size: typography.size.xl, weight: 600, family: 'display' },
] as const;

const BODY_SAMPLES = [
  { key: 'lg', label: 'Body lg', size: typography.size.lg, weight: 400, family: 'body' },
  { key: 'base', label: 'Body base', size: typography.size.base, weight: 400, family: 'body' },
  { key: 'sm', label: 'Body sm', size: typography.size.sm, weight: 400, family: 'body' },
  { key: 'xs', label: 'Body xs', size: typography.size.xs, weight: 400, family: 'body' },
] as const;

const FONT_FAMILIES: Record<string, string> = {
  display: typography.family.display,
  body: typography.family.body,
  mono: typography.family.mono,
};

/* -------------------------------------------------------------------------- */
/*  Component                                                                  */
/* -------------------------------------------------------------------------- */

export default function TypographyPage() {
  const [previewText, setPreviewText] = useState(DEFAULT_TEXT);

  const getFontFamily = (key: string) => FONT_FAMILIES[key] || FONT_FAMILIES.body;

  return (
    <div>
      {/* Header */}
      <h1 style={titleStyle}>Typographie</h1>
      <p style={subtitleStyle}>
        Specimen typographique du design system DigiFemmes. Editez le texte ci-dessous pour previsualiser.
      </p>

      {/* Editable preview input */}
      <div style={{ marginBottom: 32 }}>
        <label style={labelStyle}>Texte de previsualisation</label>
        <input
          type="text"
          value={previewText}
          onChange={(e) => setPreviewText(e.target.value)}
          style={inputStyle}
          placeholder="Saisissez votre texte ici..."
        />
      </div>

      {/* Font families */}
      <section style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Familles de polices</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {Object.entries(FONT_FAMILIES).map(([key, family]) => (
            <div key={key} style={familyCardStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: '0.8125rem', fontWeight: 600, textTransform: 'capitalize', color: '#757575' }}>
                  {key}
                </span>
                <code style={codeStyle}>{family}</code>
              </div>
              <p
                style={{
                  fontFamily: family,
                  fontSize: '1.5rem',
                  fontWeight: key === 'display' ? 700 : 400,
                  margin: 0,
                  lineHeight: 1.4,
                }}
              >
                {previewText || DEFAULT_TEXT}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Heading scale */}
      <section style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Echelle des titres (Clash Display)</h2>
        <div style={scaleTableStyle}>
          {/* Table header */}
          <div style={tableHeaderRowStyle}>
            <span style={{ ...cellStyle, width: 60 }}>Token</span>
            <span style={{ ...cellStyle, width: 80 }}>Taille</span>
            <span style={{ ...cellStyle, width: 80 }}>Graisse</span>
            <span style={{ ...cellStyle, flex: 1 }}>Apercu</span>
          </div>
          {HEADING_SAMPLES.map((item) => (
            <div key={item.key} style={tableRowStyle}>
              <span style={{ ...cellStyle, width: 60, fontWeight: 600, color: '#FF7B00' }}>
                {item.label}
              </span>
              <code style={{ ...cellStyle, width: 80, ...codeStyle }}>{item.size}</code>
              <span style={{ ...cellStyle, width: 80, color: '#9E9E9E' }}>{item.weight}</span>
              <span
                style={{
                  ...cellStyle,
                  flex: 1,
                  fontFamily: getFontFamily(item.family),
                  fontSize: item.size,
                  fontWeight: item.weight,
                  lineHeight: 1.1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {previewText || DEFAULT_TEXT}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Body scale */}
      <section style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Echelle du corps (Red Hat Display)</h2>
        <div style={scaleTableStyle}>
          <div style={tableHeaderRowStyle}>
            <span style={{ ...cellStyle, width: 100 }}>Token</span>
            <span style={{ ...cellStyle, width: 80 }}>Taille</span>
            <span style={{ ...cellStyle, flex: 1 }}>Apercu</span>
          </div>
          {BODY_SAMPLES.map((item) => (
            <div key={item.key} style={tableRowStyle}>
              <span style={{ ...cellStyle, width: 100, fontWeight: 600, color: '#12B8DF' }}>
                {item.label}
              </span>
              <code style={{ ...cellStyle, width: 80, ...codeStyle }}>{item.size}</code>
              <span
                style={{
                  ...cellStyle,
                  flex: 1,
                  fontFamily: getFontFamily(item.family),
                  fontSize: item.size,
                  fontWeight: item.weight,
                  lineHeight: 1.5,
                }}
              >
                {previewText || DEFAULT_TEXT}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Weight comparison */}
      <section style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Graisses disponibles</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {Object.entries(typography.weight).map(([name, weight]) => (
            <div key={name} style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
              <span style={{ width: 100, fontSize: '0.8125rem', color: '#9E9E9E' }}>
                {name} ({weight})
              </span>
              <span
                style={{
                  fontFamily: typography.family.body,
                  fontSize: '1.25rem',
                  fontWeight: weight,
                }}
              >
                {previewText || DEFAULT_TEXT}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Line height comparison */}
      <section style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Hauteurs de ligne</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
          {Object.entries(typography.lineHeight).map(([name, lh]) => (
            <div key={name} style={lhCardStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontWeight: 600, fontSize: '0.8125rem', color: '#FF7B00' }}>{name}</span>
                <code style={codeStyle}>{lh}</code>
              </div>
              <p
                style={{
                  fontFamily: typography.family.body,
                  fontSize: '0.9375rem',
                  lineHeight: lh,
                  margin: 0,
                  color: '#616161',
                }}
              >
                {previewText || DEFAULT_TEXT} {previewText || DEFAULT_TEXT}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Styles                                                                     */
/* -------------------------------------------------------------------------- */

const titleStyle: React.CSSProperties = {
  fontSize: '1.75rem',
  fontWeight: 800,
  marginBottom: 8,
  marginTop: 0,
};

const subtitleStyle: React.CSSProperties = {
  fontSize: '1rem',
  color: '#757575',
  margin: '0 0 24px',
  maxWidth: 520,
  lineHeight: 1.5,
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.875rem',
  fontWeight: 500,
  marginBottom: 6,
  color: '#616161',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: 560,
  padding: '10px 14px',
  fontSize: '0.9375rem',
  fontFamily: "'Red Hat Display', sans-serif",
  border: '1.5px solid #E0E0E0',
  borderRadius: 8,
  outline: 'none',
  boxSizing: 'border-box',
};

const sectionStyle: React.CSSProperties = {
  marginBottom: 40,
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: '1.125rem',
  fontWeight: 700,
  marginBottom: 16,
  marginTop: 0,
  color: '#212121',
};

const scaleTableStyle: React.CSSProperties = {
  backgroundColor: '#FFFFFF',
  border: '1px solid #EEEEEE',
  borderRadius: 12,
  overflow: 'hidden',
};

const tableHeaderRowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  padding: '10px 16px',
  backgroundColor: '#FAFAFA',
  borderBottom: '1px solid #EEEEEE',
  fontSize: '0.75rem',
  fontWeight: 600,
  color: '#9E9E9E',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
};

const tableRowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  padding: '12px 16px',
  borderBottom: '1px solid #F5F5F5',
};

const cellStyle: React.CSSProperties = {
  flexShrink: 0,
};

const codeStyle: React.CSSProperties = {
  fontFamily: "'Red Hat Mono', monospace",
  fontSize: '0.75rem',
  backgroundColor: '#F5F5F5',
  padding: '2px 6px',
  borderRadius: 4,
  color: '#616161',
};

const familyCardStyle: React.CSSProperties = {
  padding: 20,
  backgroundColor: '#FFFFFF',
  border: '1px solid #EEEEEE',
  borderRadius: 12,
};

const lhCardStyle: React.CSSProperties = {
  padding: 16,
  backgroundColor: '#FFFFFF',
  border: '1px solid #EEEEEE',
  borderRadius: 10,
};

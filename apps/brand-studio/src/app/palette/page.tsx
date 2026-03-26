'use client';

import { useState } from 'react';
import { colors } from '@digifemmes/tokens';

/* -------------------------------------------------------------------------- */
/*  Types                                                                      */
/* -------------------------------------------------------------------------- */

type ColorScale = Record<string, string>;
type ColorPalette = Record<string, ColorScale>;

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function hexToRgb(hex: string): string {
  const h = hex.replace('#', '');
  const bigint = parseInt(h, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `${r}, ${g}, ${b}`;
}

function generateCSSVariables(palette: ColorPalette): string {
  const lines = [':root {'];
  for (const [name, scale] of Object.entries(palette)) {
    for (const [step, value] of Object.entries(scale)) {
      lines.push(`  --df-color-${name}-${step}: ${value};`);
    }
  }
  lines.push('}');
  return lines.join('\n');
}

function generateJSON(palette: ColorPalette): string {
  return JSON.stringify(palette, null, 2);
}

function isLightColor(hex: string): boolean {
  const h = hex.replace('#', '');
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6;
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                  */
/* -------------------------------------------------------------------------- */

export default function PalettePage() {
  const [copiedValue, setCopiedValue] = useState<string | null>(null);
  const [exportFormat, setExportFormat] = useState<'css' | 'json'>('css');
  const [darkPreview, setDarkPreview] = useState(false);

  const palette = colors as unknown as ColorPalette;

  const handleCopy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedValue(value);
      setTimeout(() => setCopiedValue(null), 1500);
    } catch {
      // Fallback: do nothing
    }
  };

  const exportContent =
    exportFormat === 'css'
      ? generateCSSVariables(palette)
      : generateJSON(palette);

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
        <div>
          <h1 style={titleStyle}>Generateur de palette</h1>
          <p style={subtitleStyle}>
            Toutes les couleurs de la marque DigiFemmes. Cliquez sur une couleur pour copier sa valeur hex.
          </p>
        </div>
        <button
          onClick={() => setDarkPreview(!darkPreview)}
          style={{
            ...toggleBtnStyle,
            backgroundColor: darkPreview ? '#212121' : '#FFFFFF',
            color: darkPreview ? '#F0F0F5' : '#212121',
            borderColor: darkPreview ? '#424242' : '#E0E0E0',
          }}
        >
          {darkPreview ? '\u263E Sombre' : '\u2600 Clair'}
        </button>
      </div>

      {/* Color grids */}
      <div
        style={{
          ...paletteContainerStyle,
          backgroundColor: darkPreview ? '#0F1117' : '#FFFFFF',
          borderColor: darkPreview ? '#2A2D42' : '#EEEEEE',
        }}
      >
        {Object.entries(palette).map(([name, scale]) => (
          <div key={name} style={{ marginBottom: 28 }}>
            <h2
              style={{
                fontSize: '0.9375rem',
                fontWeight: 700,
                textTransform: 'capitalize',
                marginBottom: 10,
                marginTop: 0,
                color: darkPreview ? '#F0F0F5' : '#212121',
              }}
            >
              {name}
            </h2>
            <div style={swatchGridStyle}>
              {Object.entries(scale).map(([step, hex]) => {
                const light = isLightColor(hex);
                const isCopied = copiedValue === hex;
                return (
                  <button
                    key={step}
                    onClick={() => handleCopy(hex)}
                    style={{
                      ...swatchStyle,
                      backgroundColor: hex,
                      color: light ? '#212121' : '#FFFFFF',
                      border: isCopied ? '2px solid #FF7B00' : '1px solid rgba(0,0,0,0.08)',
                    }}
                    title={`${name}-${step}: ${hex} | rgb(${hexToRgb(hex)})`}
                  >
                    <span style={{ fontSize: '0.6875rem', fontWeight: 600 }}>{step}</span>
                    <span style={{ fontSize: '0.625rem', opacity: 0.8 }}>
                      {isCopied ? 'Copie !' : hex}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Export section */}
      <div style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: 12, marginTop: 0 }}>
          Exporter la palette
        </h2>
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <button
            onClick={() => setExportFormat('css')}
            style={{
              ...exportTabStyle,
              backgroundColor: exportFormat === 'css' ? '#FF7B00' : '#F5F5F5',
              color: exportFormat === 'css' ? '#FFFFFF' : '#616161',
            }}
          >
            CSS Variables
          </button>
          <button
            onClick={() => setExportFormat('json')}
            style={{
              ...exportTabStyle,
              backgroundColor: exportFormat === 'json' ? '#FF7B00' : '#F5F5F5',
              color: exportFormat === 'json' ? '#FFFFFF' : '#616161',
            }}
          >
            JSON
          </button>
          <button
            onClick={() => handleCopy(exportContent)}
            style={{
              ...exportTabStyle,
              backgroundColor: '#12B8DF',
              color: '#FFFFFF',
              marginLeft: 'auto',
            }}
          >
            {copiedValue === exportContent ? 'Copie !' : 'Copier tout'}
          </button>
        </div>
        <pre style={codeBlockStyle}>{exportContent}</pre>
      </div>

      {/* Color detail on hover — show RGB */}
      <div style={{ marginTop: 24, fontSize: '0.8125rem', color: '#9E9E9E' }}>
        Astuce : survolez une couleur pour voir le code hex. Cliquez pour copier.
      </div>
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
  margin: 0,
  maxWidth: 480,
  lineHeight: 1.5,
};

const toggleBtnStyle: React.CSSProperties = {
  padding: '8px 16px',
  borderRadius: 8,
  border: '1.5px solid',
  fontFamily: "'Red Hat Display', sans-serif",
  fontSize: '0.8125rem',
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'all 0.15s',
};

const paletteContainerStyle: React.CSSProperties = {
  padding: 24,
  borderRadius: 16,
  border: '1px solid',
  transition: 'background-color 0.2s, border-color 0.2s',
};

const swatchGridStyle: React.CSSProperties = {
  display: 'flex',
  gap: 6,
  flexWrap: 'wrap',
};

const swatchStyle: React.CSSProperties = {
  width: 72,
  height: 64,
  borderRadius: 10,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 2,
  cursor: 'pointer',
  fontFamily: "'Red Hat Mono', monospace",
  transition: 'transform 0.1s',
};

const exportTabStyle: React.CSSProperties = {
  padding: '6px 14px',
  borderRadius: 6,
  border: 'none',
  fontFamily: "'Red Hat Display', sans-serif",
  fontSize: '0.8125rem',
  fontWeight: 600,
  cursor: 'pointer',
};

const codeBlockStyle: React.CSSProperties = {
  backgroundColor: '#1E2030',
  color: '#F0F0F5',
  padding: 20,
  borderRadius: 12,
  fontSize: '0.75rem',
  lineHeight: 1.6,
  fontFamily: "'Red Hat Mono', monospace",
  overflow: 'auto',
  maxHeight: 400,
  margin: 0,
};

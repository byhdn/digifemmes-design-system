'use client';

import { useState } from 'react';
import { cobranding, colors } from '@digifemmes/tokens';

/* -------------------------------------------------------------------------- */
/*  Constants                                                                  */
/* -------------------------------------------------------------------------- */

const RATIOS = [
  {
    key: '70-30',
    label: 'Dominant 70/30',
    dfPercent: 70,
    partnerPercent: 30,
    config: cobranding.dominant70,
  },
  {
    key: '60-40',
    label: 'Dominant 60/40',
    dfPercent: 60,
    partnerPercent: 40,
    config: cobranding.dominant60,
  },
] as const;

const BG_OPTIONS = cobranding.allowedBackgrounds;

/* -------------------------------------------------------------------------- */
/*  Component                                                                  */
/* -------------------------------------------------------------------------- */

export default function CobrandingPage() {
  const [selectedBg, setSelectedBg] = useState<string>(BG_OPTIONS[0]);
  const [partnerName, setPartnerName] = useState('Partenaire');

  const isLightBg = selectedBg === '#FFFFFF';
  const textColor = isLightBg ? '#212121' : '#FFFFFF';

  return (
    <div>
      {/* Header */}
      <h1 style={titleStyle}>Co-branding</h1>
      <p style={subtitleStyle}>
        Previsualisation des mises en page co-brandees selon les regles du brand guide DigiFemmes.
        Selectionnez un fond et un nom de partenaire.
      </p>

      {/* Controls */}
      <div style={controlsStyle}>
        <div>
          <label style={labelStyle}>Nom du partenaire</label>
          <input
            type="text"
            value={partnerName}
            onChange={(e) => setPartnerName(e.target.value)}
            style={inputStyle}
            placeholder="Ex: Orange CI"
          />
        </div>
        <div>
          <label style={labelStyle}>Fond autorise</label>
          <div style={{ display: 'flex', gap: 8 }}>
            {BG_OPTIONS.map((bg) => (
              <button
                key={bg}
                onClick={() => setSelectedBg(bg)}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 8,
                  backgroundColor: bg,
                  border: selectedBg === bg ? '3px solid #FF7B00' : '2px solid #E0E0E0',
                  cursor: 'pointer',
                  transition: 'border-color 0.15s',
                }}
                title={bg}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Ratio previews */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32, marginTop: 32 }}>
        {RATIOS.map((ratio) => (
          <div key={ratio.key}>
            <h2 style={ratioTitleStyle}>{ratio.label}</h2>
            <p style={ratioDescStyle}>
              Logo DigiFemmes a {ratio.dfPercent}% / {partnerName} a {ratio.partnerPercent}%
              {ratio.config.separatorType === 'line' ? ' — separateur ligne' : ' — separateur texte'}
            </p>

            {/* Visual preview */}
            <div
              style={{
                ...previewContainerStyle,
                backgroundColor: selectedBg,
                border: `1px solid ${isLightBg ? '#EEEEEE' : 'transparent'}`,
              }}
            >
              {/* DigiFemmes side */}
              <div
                style={{
                  flex: ratio.dfPercent,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 24,
                }}
              >
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>
                    <span style={{ color: isLightBg ? colors.orange[500] : '#FFB74D' }}>Digi</span>
                    <span style={{ color: isLightBg ? colors.blue[500] : '#4DD0E1' }}>Femmes</span>
                  </div>
                  <div style={{ fontSize: '0.6875rem', color: textColor, opacity: 0.6, marginTop: 4 }}>
                    Logo principal ({ratio.dfPercent}%)
                  </div>
                </div>
              </div>

              {/* Separator */}
              <div style={separatorStyle}>
                {ratio.config.separatorType === 'line' ? (
                  <div
                    style={{
                      width: 1,
                      height: 48,
                      backgroundColor: textColor,
                      opacity: 0.25,
                    }}
                  />
                ) : (
                  <span
                    style={{
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      color: textColor,
                      opacity: 0.4,
                    }}
                  >
                    x
                  </span>
                )}
              </div>

              {/* Partner side */}
              <div
                style={{
                  flex: ratio.partnerPercent,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 24,
                }}
              >
                <div style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      width: 64 * ratio.config.partnerLogoMaxScale,
                      height: 64 * ratio.config.partnerLogoMaxScale,
                      borderRadius: 8,
                      border: `2px dashed ${textColor}`,
                      opacity: 0.3,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto',
                    }}
                  >
                    <span style={{ fontSize: '0.625rem', color: textColor, opacity: 0.6 }}>Logo</span>
                  </div>
                  <div style={{ fontSize: '0.6875rem', color: textColor, opacity: 0.6, marginTop: 6 }}>
                    {partnerName} ({ratio.partnerPercent}%)
                  </div>
                </div>
              </div>
            </div>

            {/* Size ratio bar */}
            <div style={ratioBarContainerStyle}>
              <div
                style={{
                  ...ratioBarSegmentStyle,
                  flex: ratio.dfPercent,
                  backgroundColor: colors.orange[500],
                  borderRadius: '6px 0 0 6px',
                }}
              >
                <span style={ratioBarLabelStyle}>DigiFemmes {ratio.dfPercent}%</span>
              </div>
              <div
                style={{
                  ...ratioBarSegmentStyle,
                  flex: ratio.partnerPercent,
                  backgroundColor: colors.blue[500],
                  borderRadius: '0 6px 6px 0',
                }}
              >
                <span style={ratioBarLabelStyle}>{partnerName} {ratio.partnerPercent}%</span>
              </div>
            </div>

            {/* Config details */}
            <div style={configGridStyle}>
              <ConfigItem label="Echelle max partenaire" value={`${(ratio.config.partnerLogoMaxScale * 100).toFixed(0)}%`} />
              <ConfigItem label="Position DF" value={ratio.config.dfPosition} />
              <ConfigItem label="Separateur" value={ratio.config.separatorType} />
              <ConfigItem label="Couleur partenaire" value={ratio.config.partnerColorAllowed ? 'Oui' : 'Non'} />
              <ConfigItem label="Espacement min" value={`${ratio.config.minSpacingPercent}%`} />
            </div>
          </div>
        ))}
      </div>

      {/* Rules reference */}
      <section style={{ marginTop: 40 }}>
        <h2 style={ratioTitleStyle}>Regles de co-branding</h2>
        <div style={rulesGridStyle}>
          <RuleCard
            title="Ordre de nommage"
            value={cobranding.rules.namingOrder}
            description="Toujours utiliser cet ordre dans les communications."
          />
          <RuleCard
            title="Favicon"
            value={cobranding.rules.faviconRule === 'digifemmes-only' ? 'DigiFemmes uniquement' : 'Mixte'}
            description="Le favicon reste celui de DigiFemmes sur les plateformes partagees."
          />
          <RuleCard
            title="Photo de profil social"
            value={cobranding.rules.socialProfileRule === 'digifemmes-only' ? 'DigiFemmes uniquement' : 'Mixte'}
            description="La photo de profil sur les reseaux reste DigiFemmes."
          />
          <RuleCard
            title="Periode requise"
            value={cobranding.rules.requiresDateRange ? 'Oui' : 'Non'}
            description="Le co-branding doit toujours specifier une periode de validite."
          />
        </div>
      </section>

      {/* Allowed backgrounds reference */}
      <section style={{ marginTop: 32 }}>
        <h2 style={ratioTitleStyle}>Fonds autorises</h2>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {BG_OPTIONS.map((bg) => (
            <div
              key={bg}
              style={{
                width: 80,
                height: 56,
                borderRadius: 10,
                backgroundColor: bg,
                border: '1px solid #E0E0E0',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                paddingBottom: 6,
              }}
            >
              <code
                style={{
                  fontSize: '0.625rem',
                  fontFamily: "'Red Hat Mono', monospace",
                  color: bg === '#FFFFFF' ? '#212121' : '#FFFFFF',
                  opacity: 0.8,
                }}
              >
                {bg}
              </code>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Sub-components                                                             */
/* -------------------------------------------------------------------------- */

function ConfigItem({ label, value }: { label: string; value: string }) {
  return (
    <div style={configItemStyle}>
      <span style={{ fontSize: '0.75rem', color: '#9E9E9E' }}>{label}</span>
      <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#212121' }}>{value}</span>
    </div>
  );
}

function RuleCard({ title, value, description }: { title: string; value: string; description: string }) {
  return (
    <div style={ruleCardStyle}>
      <h3 style={{ fontSize: '0.875rem', fontWeight: 600, margin: '0 0 4px', color: '#212121' }}>{title}</h3>
      <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#FF7B00', marginBottom: 6 }}>{value}</div>
      <p style={{ fontSize: '0.8125rem', color: '#757575', margin: 0, lineHeight: 1.4 }}>{description}</p>
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
  maxWidth: 560,
  lineHeight: 1.5,
};

const controlsStyle: React.CSSProperties = {
  display: 'flex',
  gap: 24,
  alignItems: 'flex-end',
  flexWrap: 'wrap',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.875rem',
  fontWeight: 500,
  marginBottom: 6,
  color: '#616161',
};

const inputStyle: React.CSSProperties = {
  padding: '10px 14px',
  fontSize: '0.9375rem',
  fontFamily: "'Red Hat Display', sans-serif",
  border: '1.5px solid #E0E0E0',
  borderRadius: 8,
  outline: 'none',
  width: 220,
};

const ratioTitleStyle: React.CSSProperties = {
  fontSize: '1.125rem',
  fontWeight: 700,
  marginBottom: 6,
  marginTop: 0,
};

const ratioDescStyle: React.CSSProperties = {
  fontSize: '0.875rem',
  color: '#757575',
  marginBottom: 16,
  marginTop: 0,
};

const previewContainerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'stretch',
  minHeight: 160,
  borderRadius: 14,
  overflow: 'hidden',
  transition: 'background-color 0.2s',
};

const separatorStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  paddingLeft: 4,
  paddingRight: 4,
};

const ratioBarContainerStyle: React.CSSProperties = {
  display: 'flex',
  height: 28,
  borderRadius: 6,
  overflow: 'hidden',
  marginTop: 12,
};

const ratioBarSegmentStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const ratioBarLabelStyle: React.CSSProperties = {
  fontSize: '0.6875rem',
  fontWeight: 600,
  color: '#FFFFFF',
};

const configGridStyle: React.CSSProperties = {
  display: 'flex',
  gap: 16,
  flexWrap: 'wrap',
  marginTop: 12,
};

const configItemStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  padding: '10px 14px',
  backgroundColor: '#F5F5F5',
  borderRadius: 8,
  minWidth: 120,
};

const rulesGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
  gap: 16,
  marginTop: 16,
};

const ruleCardStyle: React.CSSProperties = {
  padding: 16,
  backgroundColor: '#FFFFFF',
  border: '1px solid #EEEEEE',
  borderRadius: 10,
};

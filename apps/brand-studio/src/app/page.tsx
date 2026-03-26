const TOOLS = [
  {
    href: '/palette',
    title: 'Generateur de palette',
    description:
      "Explorez toutes les couleurs de la marque DigiFemmes. Copiez les valeurs hex/RGB, exportez en CSS ou JSON.",
    icon: '\uD83C\uDFA8',
    color: '#FF7B00',
    bgColor: '#FFF3E0',
  },
  {
    href: '/typography',
    title: 'Typographie',
    description:
      "Specimen typographique complet : tailles, graisses, hauteurs de ligne. Previsualisation editable.",
    icon: '\uD83D\uDCDD',
    color: '#12B8DF',
    bgColor: '#E0F7FA',
  },
  {
    href: '/cobranding',
    title: 'Co-branding',
    description:
      "Previsualisation de mises en page co-brandees avec les ratios 70/30 et 60/40. Regles de partenariat.",
    icon: '\uD83E\uDD1D',
    color: '#225DA7',
    bgColor: '#E8EDF5',
  },
  {
    href: '#',
    title: 'Previsualisation logo',
    description:
      "Previsualisation du logo DigiFemmes sur differents fonds. Verification de lisibilite et de contraste.",
    icon: '\uD83D\uDDBC\uFE0F',
    color: '#009578',
    bgColor: '#E0F2EE',
    comingSoon: true,
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <div style={heroStyle}>
        <h1 style={titleStyle}>Brand Studio</h1>
        <p style={subtitleStyle}>
          Outils pour generer et previsualiser les visuels on-brand DigiFemmes.
          Selectionne un outil ci-dessous pour commencer.
        </p>
      </div>

      {/* Tool cards grid */}
      <div style={gridStyle}>
        {TOOLS.map((tool) => (
          <a
            key={tool.title}
            href={tool.comingSoon ? undefined : tool.href}
            style={{
              ...cardStyle,
              cursor: tool.comingSoon ? 'default' : 'pointer',
              opacity: tool.comingSoon ? 0.7 : 1,
            }}
          >
            {/* Icon badge */}
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                backgroundColor: tool.bgColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                flexShrink: 0,
              }}
            >
              {tool.icon}
            </div>

            {/* Content */}
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <h2
                  style={{
                    margin: 0,
                    fontSize: '1.0625rem',
                    fontWeight: 700,
                    color: tool.color,
                  }}
                >
                  {tool.title}
                </h2>
                {tool.comingSoon && (
                  <span style={comingSoonBadge}>Bientot</span>
                )}
              </div>
              <p
                style={{
                  margin: '6px 0 0',
                  fontSize: '0.875rem',
                  color: '#757575',
                  lineHeight: 1.5,
                }}
              >
                {tool.description}
              </p>
            </div>

            {/* Arrow */}
            {!tool.comingSoon && (
              <span
                style={{
                  fontSize: '1.25rem',
                  color: '#BDBDBD',
                  flexShrink: 0,
                }}
              >
                {'\u2192'}
              </span>
            )}
          </a>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Styles                                                                     */
/* -------------------------------------------------------------------------- */

const heroStyle: React.CSSProperties = {
  marginBottom: 32,
};

const titleStyle: React.CSSProperties = {
  fontSize: '2rem',
  fontWeight: 800,
  marginBottom: 8,
  marginTop: 0,
  color: '#212121',
};

const subtitleStyle: React.CSSProperties = {
  fontSize: '1.0625rem',
  color: '#757575',
  maxWidth: 560,
  lineHeight: 1.6,
  margin: 0,
};

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
  gap: 20,
};

const cardStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: 16,
  padding: 20,
  backgroundColor: '#FFFFFF',
  borderRadius: 12,
  border: '1px solid #EEEEEE',
  textDecoration: 'none',
  transition: 'box-shadow 0.15s, border-color 0.15s',
};

const comingSoonBadge: React.CSSProperties = {
  display: 'inline-block',
  fontSize: '0.6875rem',
  fontWeight: 600,
  padding: '2px 8px',
  borderRadius: 9999,
  backgroundColor: '#F5F5F5',
  color: '#9E9E9E',
  border: '1px solid #E0E0E0',
};

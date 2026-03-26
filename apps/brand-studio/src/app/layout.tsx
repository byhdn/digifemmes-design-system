import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DigiFemmes Brand Studio',
  description: "Outils de marque pour DigiFemmes Cote d'Ivoire — palettes, typographie, co-branding",
};

const NAV_ITEMS = [
  { href: '/', label: 'Accueil', icon: '\u2302' },
  { href: '/palette', label: 'Palette', icon: '\u25A0' },
  { href: '/typography', label: 'Typographie', icon: 'Aa' },
  { href: '/cobranding', label: 'Co-branding', icon: '\u2694' },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@300;400;500;600;700;800;900&family=Red+Hat+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={bodyStyle}>
        {/* Header */}
        <header style={headerStyle}>
          <a href="/" style={logoLinkStyle}>
            <span style={logoOrangeStyle}>Digi</span>
            <span style={logoBlueStyle}>Femmes</span>
            <span style={studioLabelStyle}>Brand Studio</span>
          </a>
        </header>

        <div style={shellStyle}>
          {/* Sidebar */}
          <nav style={sidebarStyle}>
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={item.href} style={navLinkStyle}>
                <span style={navIconStyle}>{item.icon}</span>
                {item.label}
              </a>
            ))}
          </nav>

          {/* Main content */}
          <main style={mainStyle}>{children}</main>
        </div>
      </body>
    </html>
  );
}

/* -------------------------------------------------------------------------- */
/*  Inline styles (no external CSS needed)                                     */
/* -------------------------------------------------------------------------- */

const bodyStyle: React.CSSProperties = {
  margin: 0,
  fontFamily: "'Red Hat Display', sans-serif",
  backgroundColor: '#FAFAFA',
  color: '#212121',
  minHeight: '100vh',
};

const headerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  height: 56,
  paddingLeft: 24,
  paddingRight: 24,
  backgroundColor: '#FFFFFF',
  borderBottom: '1px solid #EEEEEE',
  position: 'sticky',
  top: 0,
  zIndex: 50,
};

const logoLinkStyle: React.CSSProperties = {
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'baseline',
  gap: 0,
};

const logoOrangeStyle: React.CSSProperties = {
  fontSize: '1.25rem',
  fontWeight: 800,
  color: '#FF7B00',
};

const logoBlueStyle: React.CSSProperties = {
  fontSize: '1.25rem',
  fontWeight: 800,
  color: '#12B8DF',
};

const studioLabelStyle: React.CSSProperties = {
  fontSize: '0.8125rem',
  fontWeight: 500,
  color: '#9E9E9E',
  marginLeft: 8,
};

const shellStyle: React.CSSProperties = {
  display: 'flex',
  minHeight: 'calc(100vh - 56px)',
};

const sidebarStyle: React.CSSProperties = {
  width: 220,
  padding: '24px 12px',
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  borderRight: '1px solid #EEEEEE',
  backgroundColor: '#FFFFFF',
  flexShrink: 0,
};

const navLinkStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  padding: '10px 14px',
  borderRadius: 8,
  textDecoration: 'none',
  fontSize: '0.875rem',
  fontWeight: 500,
  color: '#616161',
  transition: 'background-color 0.15s, color 0.15s',
};

const navIconStyle: React.CSSProperties = {
  width: 20,
  textAlign: 'center',
  fontSize: '1rem',
};

const mainStyle: React.CSSProperties = {
  flex: 1,
  padding: 32,
  overflow: 'auto',
};

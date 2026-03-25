import type { Metadata } from 'next';
import { Sidebar } from '@/components/Sidebar';
import { TopBar } from '@/components/TopBar';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: {
    default: 'DigiFemmes Design System',
    template: '%s | DigiFemmes DS',
  },
  description:
    'Systeme de design complet, open-source, pour DigiFemmes Cote d\'Ivoire. Composants, tokens, guidelines pour Web, Mobile, SaaS, IA et Media.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        <Sidebar />
        <TopBar />
        <main
          style={{
            marginLeft: 'var(--sidebar-width)',
            marginTop: 60,
            padding: '2.5rem 3rem',
            maxWidth: 960,
          }}
        >
          {children}
        </main>
      </body>
    </html>
  );
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DigiFemmes Brand Studio',
  description: 'Generateur de visuels pour DigiFemmes Cote d\'Ivoire',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}

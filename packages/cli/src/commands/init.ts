import * as fs from 'node:fs';
import * as path from 'node:path';
import { logger } from '../utils/logger';

/* -------------------------------------------------------------------------- */
/*  digifemmes init                                                            */
/*  Scaffold a new project with @digifemmes/* dependencies                     */
/* -------------------------------------------------------------------------- */

const PACKAGE_JSON_TEMPLATE = (name: string) =>
  JSON.stringify(
    {
      name,
      version: '0.0.1',
      private: true,
      scripts: {
        dev: 'next dev',
        build: 'next build',
        start: 'next start',
        lint: 'next lint',
      },
      dependencies: {
        '@digifemmes/tokens': 'latest',
        '@digifemmes/ui': 'latest',
        '@digifemmes/icons': 'latest',
        next: '^15.0.0',
        react: '^19.0.0',
        'react-dom': '^19.0.0',
      },
      devDependencies: {
        '@types/react': '^19.0.0',
        '@types/react-dom': '^19.0.0',
        typescript: '^5.7.0',
      },
    },
    null,
    2,
  );

const GLOBAL_CSS = `/* DigiFemmes Design System — Base CSS */
@import '@digifemmes/ui/styles';

:root {
  /* Override brand tokens here if needed */
}

body {
  font-family: 'Red Hat Display', sans-serif;
  background: var(--df-color-surface-default);
  color: var(--df-color-text-default);
  margin: 0;
}
`;

const PAGE_TEMPLATE = `import { Button } from '@digifemmes/ui';

export default function Home() {
  return (
    <main style={{ padding: '3rem', fontFamily: "'Red Hat Display', sans-serif" }}>
      <h1 style={{ fontSize: '2.25rem', fontWeight: 700, marginBottom: '1rem' }}>
        Mon projet DigiFemmes
      </h1>
      <p style={{ fontSize: '1.125rem', color: '#757575', maxWidth: 600, marginBottom: '2rem' }}>
        Bienvenue dans votre projet DigiFemmes Design System.
      </p>
      <Button variant="primary" size="md">
        Commencer
      </Button>
    </main>
  );
}
`;

export async function initCommand(projectName?: string): Promise<void> {
  const name = projectName || 'my-digifemmes-app';
  const targetDir = path.resolve(process.cwd(), name);

  logger.banner();
  logger.info(`Initialisation du projet : ${name}`);
  logger.newLine();

  // Step 1: Create directory
  const totalSteps = 4;

  logger.step(1, totalSteps, 'Creation du repertoire du projet...');
  if (fs.existsSync(targetDir)) {
    logger.error(`Le repertoire "${name}" existe deja.`);
    process.exit(1);
  }
  fs.mkdirSync(targetDir, { recursive: true });

  // Step 2: Write package.json
  logger.step(2, totalSteps, 'Generation de package.json...');
  fs.writeFileSync(path.join(targetDir, 'package.json'), PACKAGE_JSON_TEMPLATE(name));

  // Step 3: Write CSS
  logger.step(3, totalSteps, 'Ajout des styles de base...');
  const stylesDir = path.join(targetDir, 'src', 'app');
  fs.mkdirSync(stylesDir, { recursive: true });
  fs.writeFileSync(path.join(stylesDir, 'globals.css'), GLOBAL_CSS);
  fs.writeFileSync(path.join(stylesDir, 'page.tsx'), PAGE_TEMPLATE);

  // Step 4: Print getting started
  logger.step(4, totalSteps, 'Finalisation...');
  logger.newLine();
  logger.success('Projet cree avec succes !');
  logger.newLine();
  logger.info('Pour commencer :');
  logger.newLine();
  logger.dim(`  cd ${name}`);
  logger.dim('  pnpm install');
  logger.dim('  pnpm dev');
  logger.newLine();
  logger.brand('Bon dev avec DigiFemmes !');
}

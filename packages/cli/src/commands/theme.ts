import * as fs from 'node:fs';
import * as path from 'node:path';
import * as readline from 'node:readline';
import { logger } from '../utils/logger';

/* -------------------------------------------------------------------------- */
/*  digifemmes theme                                                           */
/*  Generate a custom theme file                                               */
/* -------------------------------------------------------------------------- */

function ask(rl: readline.Interface, question: string, defaultVal: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(`  ${question} (${defaultVal}): `, (answer) => {
      resolve(answer.trim() || defaultVal);
    });
  });
}

function isValidHex(color: string): boolean {
  return /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(color);
}

function generateThemeFile(
  themeName: string,
  base: 'light' | 'dark',
  primary: string,
  secondary: string,
  accent: string,
): string {
  return `import { createTheme } from '@digifemmes/tokens';

/**
 * Custom DigiFemmes theme: ${themeName}
 * Base: ${base}
 * Generated with @digifemmes/cli
 */
export const ${toCamelCase(themeName)}Theme = createTheme('${themeName}', '${base}', {
  color: {
    brand: {
      primary: '${primary}',
      secondary: '${secondary}',
      accent: '${accent}',
    },
    border: {
      brand: '${primary}',
    },
    text: {
      brand: '${secondary}',
      link: '${secondary}',
    },
  },
});
`;
}

function toCamelCase(str: string): string {
  return str
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, char: string) => char.toUpperCase())
    .replace(/^[A-Z]/, (c) => c.toLowerCase());
}

export async function themeCommand(outputPath?: string): Promise<void> {
  logger.banner();
  logger.info('Generateur de theme DigiFemmes');
  logger.newLine();

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  try {
    const themeName = await ask(rl, 'Nom du theme', 'custom');
    const base = (await ask(rl, 'Theme de base (light/dark)', 'light')) as 'light' | 'dark';

    if (base !== 'light' && base !== 'dark') {
      logger.error('Le theme de base doit etre "light" ou "dark".');
      rl.close();
      return;
    }

    logger.newLine();
    logger.info('Couleurs de la marque (format hex) :');

    const primary = await ask(rl, 'Couleur primaire', '#FF7B00');
    const secondary = await ask(rl, 'Couleur secondaire', '#12B8DF');
    const accent = await ask(rl, 'Couleur accent', '#FFC107');

    rl.close();

    // Validate colors
    for (const [label, color] of [['primaire', primary], ['secondaire', secondary], ['accent', accent]] as const) {
      if (!isValidHex(color)) {
        logger.error(`La couleur ${label} "${color}" n'est pas un hex valide.`);
        return;
      }
    }

    // Generate file
    const content = generateThemeFile(themeName, base, primary, secondary, accent);

    const outFile = outputPath || path.resolve(process.cwd(), 'theme.ts');
    fs.writeFileSync(outFile, content, 'utf-8');

    logger.newLine();
    logger.success(`Theme "${themeName}" genere dans : ${outFile}`);
    logger.newLine();
    logger.info('Usage :');
    logger.dim(`  import { ${toCamelCase(themeName)}Theme } from './theme';`);
    logger.newLine();
  } catch {
    rl.close();
    logger.error('Generation du theme annulee.');
  }
}

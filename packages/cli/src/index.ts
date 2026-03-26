import { initCommand } from './commands/init';
import { addCommand } from './commands/add';
import { themeCommand } from './commands/theme';
import { logger } from './utils/logger';

/* -------------------------------------------------------------------------- */
/*  DigiFemmes CLI                                                             */
/*  Usage: digifemmes <command> [options]                                       */
/* -------------------------------------------------------------------------- */

const VERSION = '0.1.0';

function printHelp(): void {
  logger.banner();
  logger.info(`Version ${VERSION}`);
  logger.newLine();
  console.log('  Commandes :');
  console.log('');
  console.log('    init [nom]         Creer un nouveau projet DigiFemmes');
  console.log('    add [composant]    Ajouter un composant (voir la liste)');
  console.log('    theme [fichier]    Generer un theme personnalise');
  console.log('    help               Afficher cette aide');
  console.log('    version            Afficher la version');
  console.log('');
  logger.dim('  Exemples :');
  logger.dim('    digifemmes init mon-app');
  logger.dim('    digifemmes add button');
  logger.dim('    digifemmes theme ./src/theme.ts');
  logger.newLine();
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const command = args[0];
  const arg1 = args[1];

  switch (command) {
    case 'init':
      await initCommand(arg1);
      break;

    case 'add':
      await addCommand(arg1);
      break;

    case 'theme':
      await themeCommand(arg1);
      break;

    case 'version':
    case '-v':
    case '--version':
      console.log(`@digifemmes/cli v${VERSION}`);
      break;

    case 'help':
    case '-h':
    case '--help':
      printHelp();
      break;

    default:
      if (command) {
        logger.error(`Commande inconnue : "${command}"`);
        logger.newLine();
      }
      printHelp();
      break;
  }
}

main().catch((err: unknown) => {
  logger.error(err instanceof Error ? err.message : String(err));
  process.exit(1);
});

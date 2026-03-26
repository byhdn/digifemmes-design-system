import { logger } from '../utils/logger';

/* -------------------------------------------------------------------------- */
/*  digifemmes add <component>                                                 */
/*  Add a component usage example to the current project                       */
/* -------------------------------------------------------------------------- */

interface ComponentInfo {
  name: string;
  description: string;
  importStatement: string;
  usageExample: string;
}

const AVAILABLE_COMPONENTS: Record<string, ComponentInfo> = {
  button: {
    name: 'Button',
    description: 'Bouton interactif avec 4 variantes et 3 tailles',
    importStatement: "import { Button } from '@digifemmes/ui';",
    usageExample: `<Button variant="primary" size="md">
  Cliquer ici
</Button>

<Button variant="secondary" size="md">
  Secondaire
</Button>

<Button variant="ghost" size="sm">
  Ghost
</Button>

<Button variant="danger" loading>
  Suppression...
</Button>`,
  },
  input: {
    name: 'Input',
    description: 'Champ de saisie avec label, erreur et aide',
    importStatement: "import { Input } from '@digifemmes/ui';",
    usageExample: `<Input
  label="Email"
  placeholder="votre@email.ci"
  helperText="Nous ne partagerons jamais votre email."
/>

<Input
  label="Mot de passe"
  type="password"
  error="Le mot de passe est requis."
  required
/>`,
  },
  card: {
    name: 'Card',
    description: 'Carte avec variantes elevated, outlined et ghost',
    importStatement: "import { Card } from '@digifemmes/ui';",
    usageExample: `<Card variant="elevated">
  <Card.Header>Titre de la carte</Card.Header>
  <Card.Body>Contenu de la carte avec les informations principales.</Card.Body>
  <Card.Footer>
    <Button size="sm">Action</Button>
  </Card.Footer>
</Card>`,
  },
  badge: {
    name: 'Badge',
    description: 'Badge de statut avec 5 variantes',
    importStatement: "import { Badge } from '@digifemmes/ui';",
    usageExample: `<Badge variant="success">Actif</Badge>
<Badge variant="warning">En attente</Badge>
<Badge variant="error">Erreur</Badge>
<Badge variant="info">Nouveau</Badge>`,
  },
  avatar: {
    name: 'Avatar',
    description: 'Avatar image avec fallback initiales',
    importStatement: "import { Avatar } from '@digifemmes/ui';",
    usageExample: `<Avatar
  src="https://example.com/photo.jpg"
  alt="Photo de profil"
  size="lg"
  fallback="Awa Koné"
/>`,
  },
  alert: {
    name: 'Alert',
    description: "Banniere d'alerte avec 4 variantes et icones",
    importStatement: "import { Alert } from '@digifemmes/ui';",
    usageExample: `<Alert variant="info" title="Information">
  Votre profil a ete mis a jour.
</Alert>

<Alert variant="error" title="Erreur" closeable onClose={() => {}}>
  Une erreur est survenue.
</Alert>`,
  },
  tag: {
    name: 'Tag',
    description: 'Tag/chip avec option de suppression',
    importStatement: "import { Tag } from '@digifemmes/ui';",
    usageExample: `<Tag variant="primary">Design</Tag>
<Tag variant="secondary" removable onRemove={() => {}}>Tech</Tag>
<Tag variant="accent">Event</Tag>`,
  },
  modal: {
    name: 'Modal',
    description: 'Fenetre modale accessible',
    importStatement: "import { Modal } from '@digifemmes/ui';",
    usageExample: `<Modal open={isOpen} onClose={() => setIsOpen(false)}>
  <Modal.Header>Confirmation</Modal.Header>
  <Modal.Body>Etes-vous sure de vouloir continuer ?</Modal.Body>
  <Modal.Footer>
    <Button variant="ghost" onClick={() => setIsOpen(false)}>Annuler</Button>
    <Button variant="primary">Confirmer</Button>
  </Modal.Footer>
</Modal>`,
  },
  toggle: {
    name: 'Toggle',
    description: 'Interrupteur on/off',
    importStatement: "import { Toggle } from '@digifemmes/ui';",
    usageExample: `<Toggle
  checked={darkMode}
  onChange={setDarkMode}
  label="Mode sombre"
/>`,
  },
  spinner: {
    name: 'Spinner',
    description: 'Indicateur de chargement anime',
    importStatement: "import { Spinner } from '@digifemmes/ui';",
    usageExample: `<Spinner size="md" color="var(--df-color-brand-primary)" />`,
  },
};

export async function addCommand(componentName?: string): Promise<void> {
  logger.banner();

  // No component specified — list all available
  if (!componentName) {
    logger.info('Composants disponibles :');
    logger.newLine();

    for (const [key, comp] of Object.entries(AVAILABLE_COMPONENTS)) {
      console.log(`  ${key.padEnd(12)} ${comp.description}`);
    }

    logger.newLine();
    logger.dim('Usage: digifemmes add <composant>');
    logger.dim('Exemple: digifemmes add button');
    return;
  }

  const key = componentName.toLowerCase();
  const component = AVAILABLE_COMPONENTS[key];

  if (!component) {
    logger.error(`Composant "${componentName}" non trouve.`);
    logger.newLine();
    logger.info('Composants disponibles :');
    for (const k of Object.keys(AVAILABLE_COMPONENTS)) {
      logger.dim(`  - ${k}`);
    }
    return;
  }

  // Print usage example
  logger.success(`Composant : ${component.name}`);
  logger.dim(component.description);
  logger.newLine();

  logger.info('Import :');
  logger.newLine();
  console.log(`  ${component.importStatement}`);
  logger.newLine();

  logger.info('Exemple :');
  logger.newLine();
  for (const line of component.usageExample.split('\n')) {
    console.log(`  ${line}`);
  }
  logger.newLine();

  logger.success(`Consultez la doc pour plus d'options sur ${component.name}.`);
}

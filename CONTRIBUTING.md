# Comment contribuer au DigiFemmes Design System

Merci de vouloir contribuer au design system DigiFemmes ! Ce guide t'accompagne pour proposer des ameliorations, corriger des bugs ou ajouter de nouveaux composants.

## Prerequis

- **Node.js** >= 22
- **pnpm** >= 9 (installe via `corepack enable`)
- **Git** configure avec ton identite

## Installation locale

```bash
# Cloner le repo
git clone https://github.com/digifemmes/digifemmes-design-system.git
cd digifemmes-design-system

# Installer les dependances
pnpm install

# Lancer le site de documentation en dev
pnpm --filter docs dev

# Builder tous les packages
pnpm build
```

## Structure du monorepo

```
digifemmes-design-system/
├── apps/
│   └── docs/             # Site de documentation (Next.js 15, App Router)
├── packages/
│   ├── ui/               # Composants React (@digifemmes/ui)
│   └── tokens/           # Design tokens (couleurs, typographie, espacements)
├── package.json          # Workspace root
├── pnpm-workspace.yaml   # Configuration pnpm workspaces
└── turbo.json            # Configuration Turborepo
```

## Convention de commits

Nous utilisons [Conventional Commits](https://www.conventionalcommits.org/) pour un historique clair et des changelogs automatises.

### Format

```
<type>(<scope>): <description courte>

[corps optionnel]

[footer optionnel]
```

### Types autorises

| Type       | Description                                      |
| ---------- | ------------------------------------------------ |
| `feat`     | Nouvelle fonctionnalite ou composant              |
| `fix`      | Correction de bug                                 |
| `docs`     | Documentation uniquement                          |
| `style`    | Formatage, point-virgule manquant, etc.           |
| `refactor` | Refactoring sans ajout de fonctionnalite ni fix   |
| `perf`     | Amelioration de performance                       |
| `test`     | Ajout ou modification de tests                    |
| `chore`    | Maintenance, config, dependances                  |
| `ci`       | Configuration CI/CD                               |

### Exemples

```bash
feat(ui): add Tooltip component
fix(ui): correct Badge border color in dark mode
docs: add Progress component documentation page
chore: upgrade Next.js to 15.1
```

## Creer un composant

### 1. Creer les fichiers du composant

```
packages/ui/src/components/MonComposant/
├── MonComposant.tsx      # Implementation
├── MonComposant.test.tsx # Tests unitaires
└── index.ts              # Re-export
```

### 2. Suivre les conventions

- **TypeScript strict** : exporter une interface `MonComposantProps`
- **forwardRef** : utiliser `React.forwardRef` pour permettre les refs
- **Inline styles** : utiliser les CSS custom properties (`var(--df-color-...)`)
- **Props standard** : inclure `className`, `style`, `children` quand c'est pertinent
- **Accessibilite** : ajouter les attributs ARIA necessaires (`role`, `aria-label`, etc.)

### 3. Exporter le composant

Ajouter l'export dans `packages/ui/src/index.ts` :

```typescript
export { MonComposant } from './components/MonComposant';
export type { MonComposantProps } from './components/MonComposant';
```

### 4. Creer la page de documentation

Creer `apps/docs/src/app/composants/mon-composant/page.tsx` en suivant le pattern des pages existantes :

- Header avec badges "Composant" et "Pret"
- Live preview avec toutes les variantes
- Table des props
- Exemple de code
- Section Do / Don't
- Section Accessibilite

### 5. Ajouter a la navigation

Mettre a jour `apps/docs/src/components/Sidebar.tsx` pour ajouter le lien dans la section "Composants".

## Tests obligatoires

Chaque composant doit avoir des tests couvrant :

- **Rendu par defaut** : le composant s'affiche sans erreur
- **Props** : chaque prop modifie le rendu comme attendu
- **Accessibilite** : les attributs ARIA sont presents et corrects
- **Etats** : disabled, loading, error, etc.
- **Interactions** : clics, hover, focus quand applicable

```bash
# Lancer les tests
pnpm --filter @digifemmes/ui test

# Lancer les tests en mode watch
pnpm --filter @digifemmes/ui test:watch
```

## Processus de review

1. **Creer une branche** depuis `main` : `feat/mon-composant` ou `fix/bug-description`
2. **Committer** en suivant les Conventional Commits
3. **Pousser** la branche et ouvrir une Pull Request
4. **Description de la PR** :
   - Resumer les changements
   - Lier les issues concernees
   - Ajouter des captures d'ecran si changement visuel
5. **Review** : au moins 1 approbation requise
6. **Merge** : squash merge dans `main`

## Code de conduite

Le projet DigiFemmes est un espace inclusif et bienveillant. En contribuant, tu t'engages a :

- **Respecter** toutes les contributrices et contributeurs
- **Communiquer** de maniere constructive et bienveillante
- **Accepter** les retours de review avec ouverture
- **Eviter** tout langage ou comportement discriminatoire
- **Signaler** tout comportement inapproprie a l'equipe

DigiFemmes oeuvre pour l'autonomisation des femmes en Cote d'Ivoire par le digital. Notre code de conduite reflète cette mission : chaque interaction doit etre empreinte de respect, d'inclusion et de professionnalisme.

---

Des questions ? Ouvre une issue ou contacte l'equipe sur le canal Slack #design-system.

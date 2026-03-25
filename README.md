# DigiFemmes Design System

> **We Can Do More.** — Systeme de design complet, open-source, pour DigiFemmes Cote d'Ivoire.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## Packages

| Package | Description | Version |
|---------|-------------|---------|
| `@digifemmes/tokens` | Design tokens (couleurs, typo, espacements, themes) | 0.1.0 |
| `@digifemmes/ui` | Composants React web | 0.1.0 |
| `@digifemmes/icons` | Icones SVG en composants React | 0.1.0 |
| `@digifemmes/mobile` | Composants React Native | 0.1.0 |
| `@digifemmes/ai` | Chat UI, Brand Voice (Awa), Widgets IA | 0.1.0 |
| `@digifemmes/studio` | Brand Studio — generation de visuels | 0.1.0 |
| `@digifemmes/cli` | CLI pour generer des visuels | 0.1.0 |

## Quick Start

```bash
# Installation
pnpm add @digifemmes/ui @digifemmes/tokens

# Usage
import { Button, Card, Input } from '@digifemmes/ui';
import { lightTheme, darkTheme } from '@digifemmes/tokens';
```

## Developpement

```bash
# Clone et install
git clone https://github.com/digifemmes/design-system.git
cd design-system
pnpm install

# Lancer le dev
pnpm dev

# Build tous les packages
pnpm build

# Tests
pnpm test
```

## Architecture

```
digifemmes-design-system/
├── packages/          # Packages npm publics
│   ├── tokens/        # @digifemmes/tokens
│   ├── ui/            # @digifemmes/ui
│   ├── icons/         # @digifemmes/icons
│   ├── mobile/        # @digifemmes/mobile
│   ├── ai/            # @digifemmes/ai
│   ├── studio/        # @digifemmes/studio
│   └── cli/           # @digifemmes/cli
├── apps/
│   ├── docs/          # Site de documentation
│   └── brand-studio/  # App Brand Studio
├── assets/            # Logos, fonts, patterns
└── templates/         # Templates media (social, podcast, TV)
```

## Valeurs DigiFemmes

- **Autonomisation** — Renforcer les competences et la confiance
- **Inclusion sans frontieres** — Accessible a tous
- **Innovation** — Technologies de pointe et pensee creative
- **Collaboration** — Unir les forces pour un impact reel
- **Durabilite** — Changement durable, pas temporaire

## Contribuer

Voir le [guide de contribution](apps/docs/CONTRIBUTING.md).

## Licence

MIT — [DigiFemmes Cote d'Ivoire](https://digifemmes.ci)

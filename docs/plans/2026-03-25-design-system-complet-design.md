# DigiFemmes Design System — Document de Design

**Date :** 2026-03-25
**Auteur :** byhdn
**Statut :** Valide
**Version :** 1.0.0

---

## 1. Vision

Un Design System complet, open-source, futuriste (vision 2030) pour **DigiFemmes Cote d'Ivoire**. Couvre toutes les plateformes : Web, Mobile, SaaS, Agents IA, Podcasts, Talkshows, Social Media, TV.

**Tagline :** "We Can Do More"
**Valeurs :** Autonomisation, Inclusion sans frontieres, Innovation, Collaboration, Durabilite
**Ton :** Inclusif, Impactant, Innovant, Collaboratif, Informel

---

## 2. Decisions techniques

| Decision | Choix |
|----------|-------|
| **Approche** | Foundation First — monorepo structure complet des J1, rempli couche par couche |
| **Monorepo** | Turborepo |
| **Framework web** | Next.js 15 (App Router) |
| **Styling** | Vanilla Extract / StyleX (CSS type-safe, zero runtime) |
| **Mobile** | React Native + Expo + PWA |
| **Media** | Templates Figma + App Brand Studio + Generation par code |
| **IA** | Theme chat + Brand voice (Awa) + Composants embedables |
| **Utilisateurs** | Public, open-source (MIT), tout l'ecosysteme DigiFemmes |
| **Hosting** | Vercel (docs + Brand Studio) |
| **CI/CD** | GitHub Actions + Changesets |
| **Tests visuels** | Chromatic |
| **Package registry** | npm public (@digifemmes/*) |

---

## 3. Architecture du monorepo

```
digifemmes-design-system/
├── packages/
│   ├── tokens/           # @digifemmes/tokens
│   ├── ui/               # @digifemmes/ui
│   ├── mobile/           # @digifemmes/mobile
│   ├── icons/            # @digifemmes/icons
│   ├── ai/               # @digifemmes/ai
│   ├── studio/           # @digifemmes/studio
│   └── cli/              # @digifemmes/cli
│
├── assets/
│   ├── logos/
│   │   ├── primary/              # Logo complet, symbole, wordmark, tagline (SVG)
│   │   ├── variants/
│   │   │   ├── color/
│   │   │   ├── white/
│   │   │   ├── black/
│   │   │   └── single-color/
│   │   └── cobranding/
│   │       ├── dominant-70/      # DigiFemmes 70% — partenaire 30%
│   │       ├── dominant-60/      # DigiFemmes 60% — partenaire 40%
│   │       └── README.md
│   ├── patterns/
│   ├── fonts/
│   │   ├── clash-display/
│   │   └── red-hat-display/
│   └── brand-guide/              # Charte graphique JPG originale
│
├── apps/
│   ├── docs/                     # Site documentation public (Next.js)
│   └── brand-studio/             # App Brand Studio (Next.js)
│
├── templates/
│   ├── figma/
│   ├── social-media/
│   ├── podcast/
│   ├── talkshow/
│   └── tv/
│
├── turbo.json
├── package.json
└── README.md
```

---

## 4. Regles de co-branding

### Niveau 1 — Dominant 70/30 (partenariat standard)

- Sponsors, partenaires techniques, collaborations ponctuelles
- Logo DigiFemmes = taille de reference (1x)
- Logo partenaire = max 0.43x de la hauteur du logo DigiFemmes
- DigiFemmes toujours a gauche (horizontal) ou en haut (vertical)
- Couleurs DigiFemmes dominent le layout
- Typo DigiFemmes pour tout le texte
- Separateur : ligne verticale 1px #E0E0E0 ou espace libre min 40px

### Niveau 2 — Dominant 60/40 (partenariat strategique)

- Co-fondateurs de programme, partenaires institutionnels, co-producteurs media
- Logo DigiFemmes = taille de reference (1x)
- Logo partenaire = max 0.67x de la hauteur du logo DigiFemmes
- DigiFemmes toujours a gauche ou en haut
- Le partenaire peut utiliser une couleur secondaire dans le layout
- Palette DigiFemmes reste dominante (min 60% de surface coloree)
- Separateur : "x" ou "&" en Red Hat Display Medium, couleur #12B8DF

### Regles communes

| Regle | Detail |
|-------|--------|
| Espace libre | Min 15% de la hauteur du logo DF entre les deux logos |
| Fond autorise | Blanc, Bleu DF #12B8DF, Orange DF #FF7B00, Noir |
| Interdits | Fusionner les logos, modifier les couleurs DF, placer le partenaire au-dessus/a gauche de DF |
| Mention textuelle | "DigiFemmes x [Partenaire]" — jamais l'inverse |
| Favicon / app icon | Toujours l'icone DigiFemmes seule |
| Reseaux sociaux | Photo de profil = DigiFemmes seul, co-branding uniquement dans les visuels de contenu |
| Duree | Tout visuel co-brande doit mentionner l'annee ou la periode du partenariat |

### Tokens de co-branding

```typescript
export const cobranding = {
  dominant70: {
    dfLogoScale: 1,
    partnerLogoMaxScale: 0.43,
    dfPosition: 'left' | 'top',
    separatorType: 'line',
    partnerColorAllowed: false,
  },
  dominant60: {
    dfLogoScale: 1,
    partnerLogoMaxScale: 0.67,
    dfPosition: 'left' | 'top',
    separatorType: 'text',
    partnerColorAllowed: true,
  },
} as const;
```

---

## 5. Design Tokens

### 5.1 Primitives

#### Couleurs

| Nom | Hex | Usage |
|-----|-----|-------|
| **Orange 500** | #FF7B00 | Couleur principale |
| **Blue 500** | #12B8DF | Couleur secondaire |
| **Navy 500** | #225DA7 | Bleu fonce secondaire |
| **Yellow 500** | #FFC107 | Jaune secondaire |
| **Green 500** | #009578 | Vert secondaire |

Chaque couleur a une echelle de 50 a 900 (10 nuances).

Neutres : #FFFFFF (0) a #000000 (1000), echelle de 12 valeurs.

#### Typographie

| Role | Police | Poids disponibles |
|------|--------|-------------------|
| **Titres** | Clash Display | Light, Regular, Medium, Semi-Bold, Bold |
| **Texte** | Red Hat Display | Light, Regular, Medium, Semi-Bold, Bold, Extra-Bold, Black |
| **Code** | Red Hat Mono | Regular, Bold |

Echelle de tailles : xs (12px) a 7xl (72px), en rem.

#### Espacement

Echelle : 0, 1 (4px), 2 (8px), 3 (12px), 4 (16px), 5 (20px), 6 (24px), 8 (32px), 10 (40px), 12 (48px), 16 (64px), 20 (80px), 24 (96px).

#### Rayons de bordure

none, sm (4px), md (8px), lg (12px), xl (16px), 2xl (24px), full (9999px).

#### Ombres

xs, sm, md, lg, xl, 2xl — avec variantes light/dark.

#### Motion

Durees : instant (50ms), fast (150ms), normal (300ms), slow (500ms), slower (800ms).
Easings : default, in, out, inOut, bounce, spring.

#### Breakpoints

mobile (320px), tablet (768px), desktop (1024px), wide (1440px), ultra (1920px), tv (3840px).

### 5.2 Tokens semantiques

- **Brand :** primary (orange 500), secondary (blue 500), accent (yellow 500)
- **Surfaces :** default (#FFF), subtle, muted, elevated, inverse
- **Texte :** default (#212121), subtle, muted, inverse, brand, link
- **Feedback :** success (green), warning (yellow), error (#DC2626), info (blue)
- **Bordures :** default, subtle, strong, brand

### 5.3 Tokens composants

Chaque composant a ses propres tokens derivant des semantiques (ex: button.primary.bg = brand.primary).

### 5.4 Formats de sortie

| Format | Plateforme |
|--------|------------|
| CSS Custom Properties | Web (Next.js, PWA) |
| Vanilla Extract themes | Web (type-safe) |
| JSON | Figma, Brand Studio, pipelines |
| React Native StyleSheet | Mobile (Expo) |
| Swift / Kotlin constants | Natif futur |
| SCSS variables | Legacy / templates email |

---

## 6. Composants UI

### Tier 1 — Primitives (P0)

Button, Input, Textarea, Select, Checkbox, Radio, Toggle, Badge, Avatar, Tag, Tooltip, Spinner, Progress, Skeleton, Icon, Divider

### Tier 2 — Composes (P0)

Card, Modal, Dialog, Toast, Alert, Dropdown, Tabs, Accordion, Breadcrumb, Pagination, Popover

### Tier 3 — Patterns (P1)

Navbar, Sidebar, Hero, Footer, FormLayout, DataTable, EmptyState, StatsCard, AuthLayout, PageLayout

### Tier 4 — Composants IA (P1)

ChatBubble, ChatWindow, AIAvatar, ThinkingDots, SuggestionChips, AISearchBar, AIWidget

### Tier 5 — Composants Media (P2)

SocialPost, PodcastCover, StoryTemplate, Audiogram, LowerThird, TVBanner, CobrandingLayout

### Specs communes

- Variants : primary, secondary, ghost, danger
- Tailles : sm, md, lg
- Etats : default, hover, active, focus, disabled
- Dark mode natif
- Accessibilite WCAG AAA

---

## 7. Brand Voice IA — Awa

### Identite

- **Nom :** Awa (prenom feminin ivoirien, signifie "belle")
- **Role :** Assistante DigiFemmes
- **Tagline :** "Ensemble, on peut faire plus."

### Personnalite

Chaleureuse, directe, encourageante, pragmatique, inclusive.
Ton : informel-professionnel (tutoiement autorise, respectueux).
Energie : positive-calme.

### Langue

- Primaire : francais (fr-CI en priorite)
- Fallback : anglais
- Expressions autorisees : "On est ensemble", "C'est parti !", "Pas de souci", "Bien joue !"
- Interdits : "malheureusement", "impossible", "vous devez", "erreur de votre part", "en tant qu'IA", "je ne suis qu'un robot"

### Reponses

- Salutations adaptees au moment de la journee
- Messages de succes celebratoires
- Messages d'erreur bienveillants et orientees solution
- Messages de reflexion naturels
- Longueur max : 300 caracteres
- Emojis : minimal (1-2 max), autorises : sparkle, bulb, target, check, wave, rocket, muscle

---

## 8. Dark Mode et Theming

### Light Theme

- Surface default : #FFFFFF
- Text default : #212121
- Brand primary : #FF7B00
- Brand secondary : #12B8DF

### Dark Theme

- Surface default : #0F1117 (bleu-noir profond)
- Surface elevated : #252840
- Text default : #F0F0F5 (pas blanc pur)
- Brand primary : #FF9A33 (orange adouci)
- Brand secondary : #3DD4F5 (bleu lumineux)
- Ombres plus marquees

### Theme Engine

```typescript
function createTheme(name: string, base: 'light' | 'dark', overrides: ThemeOverride): Theme
```

Themes derives prevus :
- **Partenaire co-brande** — couleur accent du partenaire
- **Nuit Africaine** — theme evenementiel (noir profond + or chaud)
- **TV Broadcast** — contraste eleve pour ecrans TV

### Accessibilite

- Cible WCAG AAA (ratio 7:1 pour texte normal)
- Support prefers-reduced-motion
- Focus visible orange (#FF7B00)
- Taille de base min 16px, scaling jusqu'a 200%, unite rem

---

## 9. Documentation publique

### Site docs.digifemmes.ci

- **Framework :** Next.js 15 (App Router) + MDX
- **Playground :** Sandpack (CodeSandbox in-browser)
- **Search :** Algolia DocSearch
- **Hosting :** Vercel
- **Versioning :** Changesets + changelogs auto

### Pages

- Fondations (couleurs, typo, espacements, motion, icones, motifs, a11y)
- Composants (1 page par composant avec preview live, props, variants, code, do/don't)
- IA (brand voice, chat UI, widgets, guidelines)
- Studio (social media, podcast, talkshow, TV, templates)
- Marque (logo, co-branding, ton de voix, interdits)
- Ressources (Figma, GitHub, changelog, contribuer)
- Playground (sandbox en ligne)

### Distribution

| Canal | Contenu |
|-------|---------|
| npm public | @digifemmes/tokens, ui, icons, mobile, ai, cli |
| CDN (cdn.digifemmes.ci) | Logos SVG/PNG, fonts woff2, patterns, icones |
| Figma Community | UI Kit, Icons, Templates |
| GitHub | Repo open-source MIT |

### CI/CD

- PR : lint, type check, tests unitaires (Vitest), tests visuels (Chromatic), a11y (axe-core), build, preview Vercel
- Merge main : version bump (Changesets), publish npm, deploy docs + studio, invalidate CDN

---

## 10. Stack technique complete

| Brique | Technologie |
|--------|-------------|
| Monorepo | Turborepo |
| Framework web | Next.js 15 (App Router) |
| Styling | Vanilla Extract / StyleX |
| Composants | React 19 |
| Mobile | React Native + Expo |
| PWA | Next.js + next-pwa |
| Docs | Next.js + MDX + Sandpack |
| Tests | Vitest + Testing Library |
| Tests visuels | Chromatic |
| Accessibilite | axe-core |
| Lint | ESLint + Prettier |
| Types | TypeScript strict |
| Versioning | Changesets |
| CI/CD | GitHub Actions |
| Hosting | Vercel |
| CDN | Vercel Edge / Cloudflare |
| Search docs | Algolia DocSearch |
| Package registry | npm |
| License | MIT |

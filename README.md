# FRACTOÏA

Application web éducative pour construire la notion de fraction au **cycle 3** (CM1–6e), avec une attention particulière aux fractions supérieures à l'unité.

Conçue selon les principes didactiques de **Brousseau** (fraction comme magnitude, droite numérique) et les travaux d'**André Tricot** sur le numérique éducatif (feedback immédiat, charge cognitive maîtrisée, scénario pédagogique explicite).

---

## Stack technique

| Outil | Version |
|---|---|
| Node.js | 20.19.0 |
| pnpm | 10.33.0 |
| React | 19 |
| Vite | 8 |
| Tailwind CSS | 4 (`@tailwindcss/vite`) |
| JSDoc | (sans TypeScript) |

## Démarrage

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
pnpm preview
```

---

## Architecture

```
src/
├── components/
│   ├── ui/          # Composants réutilisables  (≤ 150 lignes)
│   ├── worlds/      # Composants par monde      (≤ 200 lignes)
│   └── layout/      # Structure générale        (≤ 200 lignes)
├── hooks/           # Logique métier             (≤ 80 lignes)
├── data/            # Défis et contenus narratifs
└── App.jsx          # Orchestrateur              (≤ 200 lignes)
```

**Règle absolue :** 1 réponse = 1 fichier complet créé ou mis à jour.

---

## Progression des sprints

| Sprint | Contenu | Statut |
|---|---|---|
| 1 | Socle technique · `NumberLine` · hooks de base | ✅ Terminé |
| 2 | `WorldFarm` (fraction-partage) · `useFractionChallenge` | ✅ Terminé |
| 3 | `WorldRoad` (fraction-magnitude · fractions > 1) | ✅ Terminé |
| 4 | `WorldWorkshop` · `WorldMarket` · `WorldMap` (hub île SVG) | ✅ Terminé |
| 5 | `WorldFestival` · `TeacherDashboard` · unlock inter-monde | ✅ Terminé |

---

## Fondements didactiques

- **5 sens de la fraction** travaillés progressivement : partage, mesure, opérateur, quotient, magnitude
- **Droite numérique omniprésente** : les fractions > 1 apparaissent naturellement dans la continuité des entiers, sans rupture conceptuelle
- **Feedback immédiat non punitif** : l'erreur est une information, jamais une sanction
- **Décomposition visible** : `2 + ¹⁄₄ = ⁹⁄₄` rendue explicite à chaque placement > 1

## Références

- Brousseau & Brousseau (1987) — fraction-commensuration
- Projet REPSAF / Pôle Pégase (2022) — fraction comme magnitude
- Amadieu & Tricot (2014) — *Apprendre avec le numérique*
- CSEN / Dehaene et al. (2022) — test de la ligne numérique
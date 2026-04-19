# FRACTOÏA

Application web éducative pour construire la notion de fraction au **cycle 3** (CM1–6ème), avec une attention particulière aux fractions supérieures à l'unité.

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

---

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

## Les 5 mondes

| # | Monde | Sens | Niveau |
|---|---|---|---|
| 1 | 🌾 La Ferme de Mila | Fraction-partage | CE2-révision · CM1 |
| 2 | 🔨 L'Atelier de Koro | Fraction-opérateur | CM1 (unitaire) · CM2 (non-unitaire) |
| 3 | ⭐ La Route des Étoiles | Fraction-magnitude (> 1) | CM1 |
| 4 | 🏪 Le Marché de Sao | Fraction-quotient | 6ème |
| 5 | 🎪 Le Grand Festival | Synthèse des 4 sens | 6ème |

---

## Positionnement dans les programmes 2025

FRACTOÏA est aligné sur les programmes du cycle 3 publiés au **Bulletin officiel n°16 du 10 avril 2025**.

| Monde | Niveau | Attendu programme |
|---|---|---|
| 1 — La Ferme de Mila | CE2-révision · CM1 | Reconnaître et nommer des fractions simples (dén. ≤ 8) ; placer une fraction ≤ 1 sur une demi-droite graduée |
| 2 — L'Atelier de Koro | CM1 (unitaire) · CM2 (non-unitaire) | Utiliser une fraction comme opérateur multiplicatif — unitaire au CM1 (un tiers de 12), non-unitaire au CM2 (deux tiers de 12) |
| 3 — La Route des Étoiles | CM1 — objectif central | Encadrer une fraction par deux entiers consécutifs ; placer une fraction > 1 sur une demi-droite graduée |
| 4 — Le Marché de Sao | 6ème | Comprendre qu'une fraction est le résultat d'un partage équitable : a ÷ b = a/b |
| 5 — Le Grand Festival | 6ème — synthèse de cycle | Mobiliser les quatre sens de la fraction sans appui systématique |

### Note de transition — rentrée 2025

Les élèves entrant en **CM1 à la rentrée 2025** constituent la première cohorte à avoir suivi le programme de cycle 2 rénové. Les cohortes précédentes n'ont pas bénéficié du programme rénové en CE2.

**Conséquence pratique** : pour ces élèves, le Monde 1 n'est pas une simple révision — il peut constituer une véritable première rencontre avec les fractions simples. Il est recommandé de ne pas le passer en accéléré.

> Cette note sera retirée à partir de la rentrée 2027, lorsque toutes les cohortes de cycle 3 auront bénéficié du programme rénové de cycle 2.

---

## Fondements didactiques

### 5 sens de la fraction travaillés progressivement

| Sens | Description | Monde |
|---|---|---|
| Partage | La fraction comme partie d'un tout | 1 |
| Mesure | La fraction comme résultat d'un mesurage | 2 (palier 0) |
| Opérateur | La fraction comme transformation d'une grandeur | 2 |
| Magnitude | La fraction comme position sur une demi-droite graduée | 3 |
| Quotient | La fraction comme résultat d'une division | 4 |

### Principes Tricot intégrés

| Principe | Implémentation |
|---|---|
| Réduire la charge extrinsèque | Interface épurée : 1 fraction à la fois, pas de menus parasites |
| Feedback immédiat | `FeedbackToast` dès la réponse, correction contextualisée |
| Activité active | Clic sur la demi-droite numérique SVG |
| Scénario pédagogique | Histoire cohérente qui donne du sens à chaque défi |
| Pas de punition | Erreur = information ; `showHint` à partir de 2 erreurs |
| Éviter surcharge attentionnelle | Pas d'animations décoratives pendant les défis |
| Rôle de l'enseignant | `TeacherDashboard` avec stats par monde et par sens |

---

## Références

- Brousseau & Brousseau (1987) — fraction-commensuration
- Projet REPSAF / Pôle Pégase (2022) — fraction comme magnitude
- Amadieu & Tricot (2014) — *Apprendre avec le numérique*
- CSEN / Dehaene et al. (2022) — test de la ligne numérique
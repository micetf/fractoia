# 🔬 Synthèse de recherche

## I. Didactique des fractions — ce que dit la recherche

### Les cinq sens de la fraction (Brousseau, Coulange & Train)

Les travaux en didactique distinguent plusieurs acceptions possibles des fractions au cycle 3 : la fraction-partage (partage de l'unité), la fraction-mesure (mesure d'une grandeur), la fraction-commensuration, et la fraction-quotient — cette dernière acception étant relativement oubliée dans le curriculum français.

Pour les programmes cycle 3, on distingue ainsi la **fraction-nombre** (3/4 est un nombre entre 0 et 1 à situer sur une droite graduée), la **fraction-opérateur** (prendre les 3/4 d'une mesure ou d'une quantité, par exemple les 3/4 de 60 cm) et la **fraction-division/quotient** (3/4 = 3 divisé par 4).

### Le piège de la conception bipartite

La recherche identifie une conception intuitive au cœur des difficultés des élèves : la fraction comprise comme une **structure bipartite** (a/b, c'est "a sur b"). Cette conception est renforcée par les choix didactiques qui alignent la forme a/b sur des contextes qui convoquent uniquement le sens parties/tout. Or, penser la fraction comme une **magnitude** (une grandeur mesurable sur une droite) est un levier essentiel pour dépasser ces limites.

### Le mur des fractions supérieures à l'unité

Les fractions supérieures à 1 représentent un obstacle majeur. Les élèves en difficulté avec cette notion ont tendance à bloquer car leur conception de la fraction comme "partie d'un tout" rend inconcevable qu'une fraction puisse dépasser l'entier. La conception bipartite s'avère particulièrement limitante ici : il est essentiel d'identifier ces conceptions intuitives pour mettre ensuite en place un travail de conceptualisation.

### Ce qui fonctionne didactiquement

La résolution de problèmes, bien qu'elle soit incitée pour les autres activités mathématiques du cycle 3, reste marginale dans l'étude des fractions dans le curriculum français — alors qu'elle constitue un levier fort pour favoriser le dépassement des conceptions intuitives.

Le jeu pédagogique est pertinent pour acquérir des savoirs mathématiques : s'il est bien pensé, il permet la mise en place d'une démarche didactique mêlant recherche, exploration, élaboration de stratégies, **feedbacks immédiats** et **motivation intrinsèque**. L'erreur n'est pas pénalisante mais reste au sein du jeu, ce qui aide les élèves à "débloquer" leur compréhension des fractions supérieures à 1.

---

## II. André Tricot et le numérique éducatif — les principes qui guident la conception

Tricot est une référence incontournable sur le numérique éducatif en France, notamment pour son ouvrage *Apprendre avec le numérique* (co-écrit avec Franck Amadieu). Sa position de fond est que **le numérique est un outil**, pas une solution magique : c'est la pédagogie qui doit être mise au centre.

### La charge cognitive — trois types à maîtriser

Tricot distingue trois types de charges pour l'élève en activité : la **charge essentielle** (les ressources accordées à la situation d'apprentissage elle-même), la **charge intrinsèque** (les ressources accordées à la réalisation de la tâche), et la **charge extrinsèque** (les informations parasites qui gênent — surcharge des supports, détails inutiles). Parfois la charge essentielle disparaît car l'élève est focalisé sur les mauvaises choses.

### Ce qui fonctionne vraiment avec le numérique

Tricot et Amadieu confirment que l'élève apprend mieux quand il est **actif**, qu'il **pratique**, et qu'il **reçoit des réponses en retour de ses erreurs**. Le jeu sérieux est une des voies pour y arriver, mais pour qu'un apprentissage efficace ait lieu, il faut que l'activité se déroule dans un **scénario pédagogique bien conçu**.

---

# 🎮 FRACTOÏA — Architecture implémentée

## Vision générale

> Un jeu d'aventure narratif à 5 mondes progressifs dans lequel un·e explorateur·rice construit sa maîtrise des fractions — jusqu'aux fractions supérieures à l'unité qui deviennent la clé du monde final.

---

## Architecture des mondes et sens travaillés

```
┌─────────────────────────────────────────────────────────────────┐
│  MONDE 1 : "La Ferme de Mila"  🌾                   ✅          │
│  Sens : fraction-partage (fractions ≤ 1, dén. ≤ 8)             │
│  Mécaniques : FractionBar + droite numérique 0→2               │
│  Hook : useFractionChallenge                                    │
├─────────────────────────────────────────────────────────────────┤
│  MONDE 2 : "L'Atelier de Koro"  🔨                  ✅          │
│  Sens : fraction-opérateur (num/den × total)                    │
│  Mécaniques : équation num/den × total = ? + droite             │
│  Hook : useOperatorChallenge  (target = num/den × total)        │
├─────────────────────────────────────────────────────────────────┤
│  MONDE 3 : "La Route des Étoiles"  ⭐ ← PIVOT > 1  ✅          │
│  Sens : fraction comme magnitude sur droite graduée             │
│  Mécaniques : droite 0→4, DecompBubble si valeur > 1           │
│  Hook : useFractionChallenge                                    │
├─────────────────────────────────────────────────────────────────┤
│  MONDE 4 : "Le Marché de Sao"  🏪                   ✅          │
│  Sens : fraction-quotient (objects ÷ people = num/den)          │
│  Mécaniques : équation objects ÷ people + droite                │
│  Hook : useFractionChallenge                                    │
├─────────────────────────────────────────────────────────────────┤
│  MONDE 5 : "Le Grand Festival"  🎪                  ✅          │
│  Sens : TOUS (partage, mesure, magnitude, quotient)             │
│  Mécaniques : dispatcher par champ `sense`, badge discret       │
│  Hook : useFractionChallenge                                    │
└─────────────────────────────────────────────────────────────────┘
```

---

## Architecture technique complète

```
src/
├── components/
│   ├── ui/
│   │   ├── FractionBar.jsx          ✅  Barre partitionnée (sens partage)
│   │   ├── NumberLine.jsx           ✅  Droite graduée interactive (SVG)
│   │   ├── DecompBubble.jsx         ✅  Décomposition entier + fraction (> 1)
│   │   ├── FractionDisplay.jsx      ✅  Notation fractionnaire verticale
│   │   ├── FeedbackToast.jsx        ✅  Feedback immédiat animé
│   │   ├── ProgressStars.jsx        ✅  Étoiles de progression (0-3)
│   │   └── WorldNode.jsx            ✅  Nœud interactif sur WorldMap
│   │
│   ├── worlds/
│   │   ├── WorldFarm.jsx            ✅  Monde 1 — fraction-partage
│   │   ├── WorldWorkshop.jsx        ✅  Monde 2 — fraction-opérateur
│   │   ├── WorldRoad.jsx            ✅  Monde 3 — fraction-magnitude
│   │   ├── WorldMarket.jsx          ✅  Monde 4 — fraction-quotient
│   │   └── WorldFestival.jsx        ✅  Monde 5 — tous les sens
│   │
│   └── layout/
│       ├── WorldMap.jsx             ✅  Carte hub (île SVG + chemin animé)
│       └── TeacherDashboard.jsx     ✅  Tableau de bord enseignant
│
├── hooks/
│   ├── useLocalStorage.js           ✅  Persistance localStorage + reset
│   ├── useFeedback.js               ✅  Feedback immédiat (success/error/hint)
│   ├── useFractionChallenge.js      ✅  Séquence défis — target = num/den
│   ├── useOperatorChallenge.js      ✅  Séquence défis — target = num/den × total
│   └── useGameProgression.js        ✅  Progression globale, étoiles, unlock
│
├── data/challenges/
│   ├── world1.js                    ✅  6 défis — partage, dén. ≤ 8
│   ├── world2.js                    ✅  6 défis — opérateur (champs total, unit)
│   ├── world3.js                    ✅  6 défis — magnitude, fractions > 1
│   ├── world4.js                    ✅  6 défis — quotient (champs objects, people)
│   └── world5.js                    ✅  6 défis — synthèse (champ sense)
│
└── App.jsx                          ✅  Routeur état + unlock inter-monde
```

---

## Patterns établis (ne pas modifier)

### Styles boutons
Objet inline via fonction `btn(bg, fg, px)` dans chaque composant monde — contourne Preflight Tailwind v4 sur `<button>`.

### Dispatcher FractionBar / showDecomposition

| Composant | Sens | FractionBar | showDecomposition |
|---|---|---|---|
| WorldFarm | partage | ✅ | `false` |
| WorldWorkshop | opérateur | ❌ | `true` (résultat peut > 1) |
| WorldRoad | magnitude | ❌ | `true` |
| WorldMarket | quotient | ❌ | `true` |
| WorldFestival | tous | si `sense==='partage'` | si `num > den` |

### Hooks — différence clé

- `useFractionChallenge` : `target = num / den`
- `useOperatorChallenge` : `target = (num / den) × total`

### Unlock inter-monde

`unlockWorld(nextId)` est appelé dans `App.jsx` via `handleComplete(nextWorldId)` au `onComplete` de chaque monde. Il est **idempotent** — sans effet si le monde est déjà déverrouillé.

| Monde terminé | Déverrouille |
|---|---|
| WorldFarm (1) | WorldWorkshop (2) |
| WorldWorkshop (2) | WorldRoad (3) |
| WorldRoad (3) | WorldMarket (4) |
| WorldMarket (4) | WorldFestival (5) |
| WorldFestival (5) | — |

### Conventions data/ (tous fichiers challenges/worldN.js)

- `context` : aucune notation fractionnaire — `FractionDisplay` affiche la fraction séparément
- `hint` : écriture littérale uniquement ("trois demis", "cinq quarts"…), jamais de barre oblique
- `sense` (world5 uniquement) : `'partage' | 'mesure' | 'magnitude' | 'quotient'` — non affiché à l'élève, exploité par `TeacherDashboard` et le dispatcher de `WorldFestival`

### Champs supplémentaires par monde

| Fichier | Champs extra | Usage |
|---|---|---|
| world2.js | `total`, `unit` | `useOperatorChallenge` calcule la cible ; `WorldWorkshop` affiche l'équation |
| world4.js | `objects`, `people` | `WorldMarket` affiche l'équation ÷ |
| world5.js | `sense` | `WorldFestival` dispatcher + `TeacherDashboard` SenseBreakdown |

---

## TeacherDashboard — structure

| Bloc | Contenu |
|---|---|
| Résumé global | Étoiles /15 · Mondes terminés /5 · Taux de réussite global |
| Ligne par monde | Bordure colorée · étoiles · barre taux · % réussite · moyenne essais · 🔒 si verrouillé |
| Détail Festival | Décomposition par sens (4 barres) — visible si `world5.results` non vide |
| Reset | `window.confirm` + `resetGame()` |

---

## Progression des sprints

| Sprint | Contenu | Statut |
|---|---|---|
| 1 | Socle technique · NumberLine · hooks de base | ✅ Terminé |
| 2 | WorldFarm · useFractionChallenge · FractionBar | ✅ Terminé |
| 3 | WorldRoad · fraction-magnitude · fractions > 1 | ✅ Terminé |
| 4 | WorldWorkshop · WorldMarket · WorldMap (île SVG) | ✅ Terminé |
| 5 | WorldFestival · TeacherDashboard · unlock inter-monde | ✅ Terminé |

---

## Principes Tricot intégrés

| Principe | Implémentation |
|---|---|
| Réduire la charge extrinsèque | Interface épurée : 1 fraction à la fois, pas de menus parasites |
| Feedback immédiat | `FeedbackToast` dès la réponse, correction contextualisée |
| Activité active | Clic sur la droite numérique SVG |
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
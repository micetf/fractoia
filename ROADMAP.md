# FRACTOÏA — ROADMAP

> **Document de référence technique** — architecture, conventions de code, et backlog des sprints.  
> Source de vérité unique. La base de connaissance Claude doit pointer vers ce fichier.

---

## État du projet

**Version actuelle** : 5 mondes jouables, TeacherDashboard, unlock inter-monde.  
**Prochaine étape** : Sprint 0 → aligner la documentation et les métadonnées sur les programmes BO n°16, 2025.

### Progression historique

| Sprint | Contenu | Statut |
|---|---|---|
| 1 | Socle technique · `NumberLine` · hooks de base | ✅ Terminé |
| 2 | `WorldFarm` · `useFractionChallenge` · `FractionBar` | ✅ Terminé |
| 3 | `WorldRoad` · fraction-magnitude · fractions > 1 | ✅ Terminé |
| 4 | `WorldWorkshop` · `WorldMarket` · `WorldMap` (île SVG) | ✅ Terminé |
| 5 | `WorldFestival` · `TeacherDashboard` · unlock inter-monde | ✅ Terminé |

---

## Architecture technique

```
src/
├── components/
│   ├── ui/
│   │   ├── FractionBar.jsx          ✅  Barre partitionnée (sens partage)
│   │   ├── NumberLine.jsx           ✅  Demi-droite graduée interactive (SVG)
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

## Patterns établis — ne pas modifier

### Styles boutons

Objet inline via fonction `btn(bg, fg, px)` dans chaque composant monde — contourne Preflight Tailwind v4 sur `<button>`.

```js
const btn = (bg, fg = "#2d1a08", px = "2rem") => ({
    padding: `0.75rem ${px}`,
    borderRadius: "1rem",
    fontSize: "1.125rem",
    fontWeight: 700,
    backgroundColor: bg,
    color: fg,
    border: "none",
    cursor: "pointer",
    fontFamily: "'Baloo 2', sans-serif",
});
```

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

`unlockWorld(nextId)` est appelé dans `App.jsx` via `handleComplete(nextWorldId)`. **Idempotent** — sans effet si le monde est déjà déverrouillé.

| Monde terminé | Déverrouille |
|---|---|
| WorldFarm (1) | WorldWorkshop (2) |
| WorldWorkshop (2) | WorldRoad (3) |
| WorldRoad (3) | WorldMarket (4) |
| WorldMarket (4) | WorldFestival (5) |
| WorldFestival (5) | — |

### Conventions data/ (tous fichiers `challenges/worldN.js`)

- `context` : aucune notation fractionnaire — `FractionDisplay` affiche la fraction séparément
- `hint` : écriture littérale uniquement ("trois demis", "cinq quarts"…), jamais de barre oblique
- `level` : niveau programme cible — `"CE2-révision"` / `"CM1"` / `"CM2"` / `"6e"`
- `sense` (world5 uniquement) : `'partage' | 'mesure' | 'magnitude' | 'quotient'` — non affiché à l'élève, exploité par `TeacherDashboard`

### Champs supplémentaires par monde

| Fichier | Champs extra | Usage |
|---|---|---|
| world2.js | `total`, `unit` | `useOperatorChallenge` calcule la cible ; `WorldWorkshop` affiche l'équation |
| world4.js | `objects`, `people` | `WorldMarket` affiche l'équation ÷ |
| world5.js | `sense` | `WorldFestival` dispatcher + `TeacherDashboard` SenseBreakdown |

### TeacherDashboard — structure

| Bloc | Contenu |
|---|---|
| Résumé global | Étoiles /15 · Mondes terminés /5 · Taux de réussite global |
| Ligne par monde | Bordure colorée · étoiles · barre taux · % réussite · moyenne essais · 🔒 si verrouillé |
| Détail Festival | Décomposition par sens (4 barres) — visible si `world5.results` non vide |
| Reset | `window.confirm` + `resetGame()` |

---

## Backlog — conformité programmes BO n°16, 2025

> **Contexte** : les programmes cycle 3 publiés au BO n°16 du 10 avril 2025 précisent des attendus absents ou mal ciblés dans la version actuelle. Les sprints ci-dessous les couvrent dans l'ordre de dépendance.

### Vue d'ensemble

```
Sprint 0 ── Docs & métadonnées          ~2h   aucun risque       ← en cours
Sprint 1 ── TeacherDashboard            ~3h   1 fichier
Sprint 2 ── Encadrement CM1             ~5h   3 fichiers
Sprint 3 ── Fraction-mesure CE2→CM1     ~4h   3 fichiers
Sprint 4 ── Addition/soustraction CM2   ~6h   6 fichiers
Sprint 5 ── Validation finale           ~3h   docs + lint
                                       ───
                                       ~23h total
```

**Ordre contraint** : Sprint 0 précède tout (les champs `level` et `sense` sont utilisés dès Sprint 1). Sprints 2 et 3 sont indépendants. Sprint 4 dépend de Sprint 3. Sprint 5 clôt.

---

### Sprint 0 — Fondations documentaires ← EN COURS

**Objectif** : aligner tout ce qui ne touche pas au code avant de modifier quoi que ce soit.  
**Effort** : ~2h. Aucun risque de régression.

| # | Fichier | Action | Statut |
|---|---|---|---|
| 0.1 | `ROADMAP.md` | Ajouter tableau Monde / Niveau / Attendu officiel | ✅ Fait |
| 0.2 | `README.md` | Ajouter section programmes 2025 + note de transition | ✅ Fait |
| 0.3 | `src/components/ui/NumberLine.jsx` | `aria-label` : "droite numérique" → "demi-droite graduée" | ✅ Fait |
| 0.4 | Tous les `data/challenges/worldN.js` | Ajouter champ `level` à chaque défi | ✅ Fait |

**Critères d'acceptation**
- Le tableau ROADMAP liste les 5 mondes avec niveau cible et attendu programme.
- La note de transition rentrée 2025 est présente dans le README.
- Aucune occurrence de "droite numérique" dans les `aria-label` des composants SVG.
- Chaque défi possède un champ `level` cohérent avec les programmes.

**Message de commit**
```
docs: aligner ROADMAP, README et métadonnées sur les programmes cycle 3 (BO n°16, 2025)

- Ajoute champ `level` dans tous les fichiers data/challenges/
- Remplace "droite numérique" par "demi-droite graduée" dans aria-label (NumberLine.jsx)
- Ajoute tableau ciblage Monde/Niveau/Attendu dans ROADMAP.md
- Ajoute section programmes 2025 + note de transition dans README.md
```

---

### Sprint 1 — TeacherDashboard : lisibilité programme

**Objectif** : qu'un enseignant ou un CPC lise d'un coup d'œil le niveau programme de chaque monde.  
**Effort** : ~3h. 1 fichier modifié. Contrainte : composant ≤ 200 lignes.

| # | Fichier | Action |
|---|---|---|
| 1.1 | `src/components/layout/TeacherDashboard.jsx` | Ajouter bandeau `level` sous chaque nom de monde dans `WorldRow` |
| 1.2 | `src/components/layout/TeacherDashboard.jsx` | Ajouter section dépliable "À propos des programmes" |
| 1.3 | `src/components/layout/TeacherDashboard.jsx` | Ajouter alerte transition rentrée 2025 si aucune progression enregistrée |

**Données à ajouter dans `WORLDS_META`**
```js
const WORLDS_META = [
  { id: 1, label: "🌾 La Ferme de Mila",    color: "#f59e0b",
    level: "CE2-révision / CM1 P1",
    attendu: "Fraction-partage · Réactiver fraction < 1 (dén. ≤ 8)" },
  { id: 2, label: "🔨 L'Atelier de Koro",   color: "#f97316",
    level: "CM1 (palier 1) · CM2 (paliers 2–3)",
    attendu: "Fraction-opérateur · Unitaire (CM1) puis non-unitaire (CM2)" },
  { id: 3, label: "⭐ La Route des Étoiles", color: "#818cf8",
    level: "CM1 — objectif central",
    attendu: "Fractions > 1 · Placement sur demi-droite · Encadrement" },
  { id: 4, label: "🏪 Le Marché de Sao",    color: "#34d399",
    level: "6ème",
    attendu: "Fraction-quotient · a ÷ b = a/b" },
  { id: 5, label: "🎪 Le Grand Festival",   color: "#ec4899",
    level: "6ème — synthèse de cycle",
    attendu: "Tous les sens · Mobilisation sans appui systématique" },
];
```

**Critères d'acceptation**
- Chaque ligne de monde affiche un badge niveau coloré.
- La section "À propos" est visible mais ne surcharge pas l'interface principale.
- L'alerte de transition disparaît dès qu'une progression est enregistrée.

**Message de commit**
```
feat(TeacherDashboard): afficher le niveau programme par monde

- Ajoute champ level et attendu dans WORLDS_META
- Affiche badge niveau sous chaque WorldRow
- Ajoute section "À propos des programmes" (dépliable)
- Ajoute alerte de transition rentrée 2025
```

---

### Sprint 2 — Encadrement d'une fraction (CM1 attendu manquant)

**Objectif** : couvrir l'attendu CM1 "encadrer une fraction par deux entiers consécutifs".  
**Effort** : ~5h. 3 fichiers.

**Rappel programme** : CM1 — Savoir encadrer une fraction par deux entiers consécutifs ; savoir placer une fraction ou la somme d'un nombre entier et d'une fraction inférieure à un sur une demi-droite graduée.

**Flux pédagogique**
```
Phase 'bracket'
  → BracketQuestion : "7/4 est entre ___ et ___ ?"
  → Correct → phase 'place'
  → Incorrect → feedback hint sans pénalité (principe Tricot)

Phase 'place'
  → NumberLine avec bornes visuellement marquées
  → Validation habituelle
```

| # | Fichier | Action |
|---|---|---|
| 2.1 | `src/hooks/useFractionChallenge.js` | Ajouter état `phase` : `'bracket'` → `'place'` → `'done'` |
| 2.2 | `src/components/ui/BracketQuestion.jsx` | Nouveau composant (≤ 150 lignes) |
| 2.3 | `src/components/worlds/WorldRoad.jsx` | Intégrer `BracketQuestion` en phase `'bracket'` |
| 2.4 | `src/data/challenges/world3.js` | Ajouter champ `bracket: [lower, upper]` à chaque défi |

**Exemple de défi mis à jour**
```js
{ num: 7, den: 4, max: 3, bracket: [1, 2], level: "CM1", emoji: "🌟", … }
```

**Critères d'acceptation**
- Question d'encadrement systématique avant la demi-droite dans WorldRoad.
- Encadrement incorrect → feedback non punitif, nouvelle tentative possible.
- Encadrement correct → demi-droite s'ouvre sans reset.
- `BracketQuestion` ≤ 150 lignes · `useFractionChallenge` ≤ 80 lignes.

**Message de commit**
```
feat(WorldRoad): ajouter la phase d'encadrement (attendu CM1 BO 2025)

- Nouveau composant BracketQuestion
- useFractionChallenge étendu avec état de phase
- world3.js enrichi du champ bracket
- Flux bracket → place conforme à l'attendu CM1
```

---

### Sprint 3 — Fraction-mesure (CE2 → CM1, sens absent)

**Objectif** : introduire la fraction comme mesure d'une grandeur, sens absent de l'application.  
**Effort** : ~4h. 3 fichiers.

**Distinction avec le sens opérateur**

| Sens | Formulation type | Présent |
|---|---|---|
| Mesure | "Cette planche *mesure* 3/4 de mètre" | ❌ absent |
| Opérateur | "Prendre *les* 3/4 d'une planche de 1 m" | ✅ Monde 2 |

| # | Fichier | Action |
|---|---|---|
| 3.1 | `src/data/challenges/world2.js` | Ajouter 3 défis `sense: "mesure"` en palier 0, `level: "CM1"` |
| 3.2 | `src/components/worlds/WorldWorkshop.jsx` | Affichage conditionnel selon `sense` (règle SVG vs équation) |
| 3.3 | `src/components/ui/MeasureRuler.jsx` | Nouveau composant optionnel — règle SVG annotée (≤ 150 lignes) |

**Exemple de défi mesure**
```js
{
  num: 3, den: 4, total: 1, unit: "m", max: 1,
  level: "CM1", sense: "mesure", emoji: "📐",
  context: "Koro pose sa règle le long de la pièce de bois. " +
           "Elle s'arrête à la troisième graduation sur quatre. " +
           "Où se trouve l'extrémité de la planche sur la règle ?",
  hint: "Trois quarts se trouve entre la moitié et 1 — " +
        "à la troisième marque quand la règle est divisée en quatre.",
}
```

**Critères d'acceptation**
- Défis `mesure` présentés avant les défis `operateur-unitaire`.
- Affichage WorldWorkshop adapté selon `sense` (pas d'équation `× total` pour mesure).
- `TeacherDashboard` SenseBreakdown remonte `"mesure"` dans les stats du Monde 2.

**Message de commit**
```
feat(WorldWorkshop): ajouter le sens fraction-mesure (CE2→CM1, BO 2025)

- 3 défis mesure ajoutés en tête de world2.js
- Affichage conditionnel selon sense dans WorldWorkshop
- Nouveau composant MeasureRuler (règle SVG annotée)
- SenseBreakdown TeacherDashboard couvre désormais le Monde 2
```

---

### Sprint 4 — Addition de fractions de même dénominateur (CM2 absent)

**Objectif** : couvrir l'attendu CM2 "additionner et soustraire des fractions de même dénominateur".  
**Effort** : ~6h. 6 fichiers. Sprint le plus structurant.

**Implémentation choisie** : Nouveau Monde 2bis "Le Grenier de Koro" — respecte la règle 1 monde = 1 sens sans alourdir WorldWorkshop.

| # | Fichier | Action |
|---|---|---|
| 4.1 | `src/data/challenges/world2bis.js` | 6 défis addition/soustraction, même dénominateur, `level: "CM2"` |
| 4.2 | `src/hooks/useAdditionChallenge.js` | Nouveau hook — cible = `(num1 ± num2) / den` |
| 4.3 | `src/components/worlds/WorldGranary.jsx` | Nouveau monde (≤ 200 lignes) |
| 4.4 | `src/components/ui/FractionEquation.jsx` | Affichage équation addition/soustraction |
| 4.5 | `src/App.jsx` | Ajouter `WorldGranary` entre WorldWorkshop (2) et WorldRoad (3) |
| 4.6 | `src/components/layout/WorldMap.jsx` | Ajouter nœud Monde 2bis |

**Structure des défis**
```js
// Progression dans world2bis.js :
// Palier 1 (1-2) : addition, résultat < 1
// Palier 2 (3-4) : addition, résultat > 1 — pont avec WorldRoad
// Palier 3 (5-6) : soustraction, résultat < 1
{
  num1: 1, num2: 2, den: 4, op: "+",
  max: 2, level: "CM2", sense: "addition",
  emoji: "🌾",
  context: "Koro remplit un quart du sac de farine, puis encore deux quarts. " +
           "Quelle fraction du sac a-t-il remplie en tout ?",
  hint: "Un quart plus deux quarts, c'est trois quarts — " +
        "additionne simplement les numérateurs.",
}
```

**Critères d'acceptation**
- Résultat correct = `(num1 ± num2) / den` calculé dans `useAdditionChallenge`.
- `DecompBubble` visible si résultat > 1 (cohérence WorldRoad).
- Monde déverrouillé après WorldWorkshop dans App.jsx.
- `WorldGranary` ≤ 200 lignes · `useAdditionChallenge` ≤ 80 lignes.

**Message de commit**
```
feat: ajouter Monde 2bis WorldGranary (addition fractions, CM2 BO 2025)

- Nouveau fichier world2bis.js (6 défis addition/soustraction même dénominateur)
- Nouveau hook useAdditionChallenge
- Nouveau composant WorldGranary et FractionEquation
- Intégration dans App.jsx et WorldMap
- Unlock chain : WorldWorkshop → WorldGranary → WorldRoad
```

---

### Sprint 5 — Validation finale et conformité globale

**Objectif** : vérification croisée complète, mise à jour des docs, tag de version.  
**Effort** : ~3h.

| # | Action |
|---|---|
| 5.1 | Vérifier que tous les dénominateurs sont ≤ 20 (CM1), ≤ 60 (CM2) dans leurs mondes |
| 5.2 | Vérifier que l'ordre des mondes dans `WorldMap` et `App.jsx` respecte la progression |
| 5.3 | S'assurer que `WORLD2BIS_CHALLENGES` ne contient aucune notation fractionnaire dans `context` et `hint` |
| 5.4 | Mettre à jour ce fichier `ROADMAP.md` avec l'architecture finale à 6 mondes |
| 5.5 | Passer `pnpm lint` et corriger les avertissements |

**Critères d'acceptation**
- `pnpm build` passe sans erreur ni warning.
- `TeacherDashboard` affiche 6 mondes avec leurs niveaux corrects.
- Aucun défi ne contient de notation `a/b` dans `context` ou `hint`.

**Message de commit**
```
chore: validation conformité programmes 2025 et documentation finale

- Vérification dénominateurs par niveau (CM1 ≤20, CM2 ≤60)
- ROADMAP.md mis à jour architecture 6 mondes
- Lint propre
```
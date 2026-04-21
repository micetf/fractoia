# FRACTOÏA — ROADMAP

> **Document de référence technique** — architecture, conventions de code, backlog des sprints et conformité aux programmes.
> Source de vérité unique. La base de connaissance Claude **et** le repo GitHub doivent pointer vers ce fichier.
>
> Référence programme : **Bulletin officiel n°16 du 10 avril 2026** — Programme de mathématiques pour le cycle 3.

---

## État du projet

**Version actuelle** : 7 mondes jouables, TeacherDashboard, unlock inter-monde, GameProgressionProvider (Context).
**Prochaine étape** : Sprint B — Automatismes 6ème (fraction↔décimale + égalités à trous).

### Progression historique

| Sprint | Contenu | Statut |
|---|---|---|
| 1 | Socle technique · `NumberLine` · hooks de base | ✅ Terminé |
| 2 | `WorldFarm` · `useFractionChallenge` · `FractionBar` | ✅ Terminé |
| 3 | `WorldRoad` · fraction-magnitude · fractions > 1 | ✅ Terminé |
| 4 | `WorldWorkshop` · `WorldMarket` · `WorldMap` (île SVG) | ✅ Terminé |
| 5 | `WorldFestival` · `TeacherDashboard` · unlock inter-monde | ✅ Terminé |
| 0 | Docs & métadonnées · champs `level` · `aria-label` | ✅ Terminé |
| 1b | `TeacherDashboard` v1 · badges niveau · `AboutPrograms` | ✅ Terminé |
| 2b | Encadrement CM1 · `BracketQuestion` · `useFractionChallenge` étendu | ✅ Terminé |
| 3b | Fraction-mesure CE2→CM1 · `MeasureRuler` · palier 0 world2 | ✅ Terminé |
| 4b | Addition/soustraction CM2 · `WorldGranary` (worldId 6) · `FractionEquation` | ✅ Terminé |
| 5b | Validation conformité · `pnpm build` propre · lint · 6 mondes | ✅ Terminé |
| A | Comparaison de fractions · `WorldBridge` (worldId 7) · `CompareQuestion` · `useCompareChallenge` | ✅ Terminé |

---

## Architecture technique

```
src/
├── components/
│   ├── ui/
│   │   ├── FractionBar.jsx          ✅  Barre partitionnée (sens partage)
│   │   ├── FractionDisc.jsx         ⬜  Secteur SVG (Sprint C)
│   │   ├── FractionTriangle.jsx     ⬜  Triangle SVG (Sprint C)
│   │   ├── NumberLine.jsx           ✅  Demi-droite graduée interactive (SVG)
│   │   ├── DecompBubble.jsx         ✅  Décomposition entier + fraction (> 1)
│   │   ├── FractionDisplay.jsx      ✅  Notation fractionnaire verticale
│   │   ├── FractionEquation.jsx     ✅  Équation addition/soustraction
│   │   ├── MeasureRuler.jsx         ✅  Règle SVG annotée (sens mesure)
│   │   ├── BracketQuestion.jsx      ✅  Encadrement par deux entiers consécutifs
│   │   ├── CompareQuestion.jsx      ✅  Comparaison deux fractions A/B/Égales (Sprint A)
│   │   ├── FeedbackToast.jsx        ✅  Feedback immédiat animé
│   │   ├── ProgressStars.jsx        ✅  Étoiles de progression (0-3)
│   │   ├── SenseBreakdown.jsx       ✅  Décomposition par sens (TeacherDashboard)
│   │   ├── AboutPrograms.jsx        ✅  Section dépliable programmes (TeacherDashboard)
│   │   └── WorldNode.jsx            ✅  Nœud interactif sur WorldMap
│   │
│   ├── worlds/
│   │   ├── WorldFarm.jsx            ✅  Monde 1 — fraction-partage
│   │   ├── WorldWorkshop.jsx        ✅  Monde 2 — fraction-mesure + opérateur
│   │   ├── WorldGranary.jsx         ✅  Monde 6 — addition/soustraction (même dén.)
│   │   ├── WorldBridge.jsx          ✅  Monde 7 — comparaison de fractions (Sprint A)
│   │   ├── WorldRoad.jsx            ✅  Monde 3 — fraction-magnitude + encadrement
│   │   ├── WorldMarket.jsx          ✅  Monde 4 — fraction-quotient
│   │   └── WorldFestival.jsx        ✅  Monde 5 — tous les sens
│   │
│   └── layout/
│       ├── WorldMap.jsx             ✅  Carte hub (île SVG + nœuds HTML overlay)
│       └── TeacherDashboard.jsx     ✅  Tableau de bord enseignant (7 mondes)
│
├── hooks/
│   ├── useLocalStorage.js           ✅  Persistance localStorage + reset
│   ├── useFeedback.js               ✅  Feedback immédiat (success/error/hint)
│   ├── useFractionChallenge.js      ✅  Séquence défis — target = num/den (+ phase bracket)
│   ├── useOperatorChallenge.js      ✅  Séquence défis — target = (num/den) × total
│   ├── useAdditionChallenge.js      ✅  Séquence défis — target = (num1 ± num2) / den
│   ├── useCompareChallenge.js       ✅  Comparaison A/B/equal + errorBias (Sprint A)
│   └── useGameProgression.js        ✅  GameProgressionProvider (Context) + unlock (worldIds 1–7)
│
├── data/challenges/
│   ├── world1.js                    ✅  6 défis — partage, dén. ≤ 8
│   ├── world2.js                    ✅  9 défis — mesure (palier 0) + opérateur (paliers 1-3)
│   ├── world2bis.js                 ✅  6 défis — addition/soustraction CM2 (worldId 6)
│   ├── world2ter.js                 ✅  6 défis — comparaison, champs fracA/fracB/correct/errorBias (Sprint A)
│   ├── world3.js                    ✅  6 défis — magnitude > 1, champ bracket
│   ├── world4.js                    ✅  6 défis — quotient + fractions équivalentes
│   └── world5.js                    ✅  6 défis — synthèse tous sens
│
└── App.jsx                          ✅  GameProgressionProvider + AppRouter (7 routes)
```

---

## Conformité aux programmes — BO n°16, 2026

### CM1 — Fractions (dénominateurs ≤ 20, sauf fractions décimales ≤ 100)

| Attendu officiel (BO n°16) | FRACTOÏA | Sprint |
|---|---|---|
| Interpréter, représenter, écrire et lire des fractions | ✅ Monde 1 | — |
| Écrire une fraction > 1 comme somme entier + fraction < 1 | ✅ Monde 3 (DecompBubble) | — |
| Écrire somme entier + fraction < 1 comme une fraction unique | ✅ Monde 3 | — |
| Encadrer une fraction par deux entiers consécutifs | ✅ Monde 3 (BracketQuestion) | — |
| Placer une fraction sur une demi-droite graduée | ✅ Mondes 1–3 | — |
| Repérer un point d'une demi-droite par une fraction | ✅ implicite | — |
| Comparer des fractions | ✅ Monde 7 (WorldBridge) | Sprint A ✅ |
| Additionner et soustraire des fractions (même dén.) | ✅ Monde 6 | — |
| Déterminer une fraction d'une quantité — unitaire | ✅ Monde 2 | — |

### CM2 — Fractions (dénominateurs ≤ 60, sauf fractions décimales ≤ 1000)

| Attendu officiel (BO n°16) | FRACTOÏA | Sprint |
|---|---|---|
| Tout CM1 + | | |
| Comparer des fractions | ✅ Monde 7 (WorldBridge) | Sprint A ✅ |
| Additionner et soustraire des fractions (même dén.) | ✅ Monde 6 | — |
| Calculer le produit d'un entier et d'une fraction | ✅ Monde 2 (non-unitaire) | — |
| Déterminer une fraction d'une quantité — non-unitaire | ✅ Monde 2 | — |

### 6ème — Automatismes (texte BO n°16)

| Attendu officiel (BO n°16) | FRACTOÏA | Sprint |
|---|---|---|
| Reconnaître une fraction sur représentations variées (rectangle, disque, triangle, bande) | ⚠️ rectangle + bande seulement | **Sprint C** |
| Relations 1/4, 1/2, 3/4, 1 — égalités à trous | ❌ absent | **Sprint B** |
| Passer fraction ↔ décimale : 1/4=0,25 ; 1/2=0,5 ; 3/4=0,75 ; 3/2=1,5 ; 5/2=2,5 | ❌ absent | **Sprint B** |
| Calculer 2/3 de 12, 3/4 de 10 (opérateur) | ✅ Monde 2 | — |

### 6ème — Connaissances et capacités attendues

| Attendu officiel (BO n°16) | FRACTOÏA | Sprint |
|---|---|---|
| Sens quotient (a÷b = a/b) | ✅ Monde 4 | — |
| Compléter des égalités à trous multiplicatives | ❌ absent | **Sprint B** |
| Placer une fraction sur demi-droite (cas simples) | ✅ Monde 4 | — |
| Graduer un segment de longueur donnée | ❌ absent | **Sprint C** |
| Établir des égalités de fractions | ✅ Monde 7 palier 3 (`correct: "equal"`) | Sprint A ✅ |
| Comparer et encadrer des fractions | ✅ Monde 7 (WorldBridge) | Sprint A ✅ |
| Ordonner une liste de fractions / nombres mixtes | ⚠️ partiel Monde 7 (6 défis, pas d'ordre explicite) | — |
| Additionner et soustraire des fractions | ✅ Monde 6 | — |
| Multiplier une fraction par un nombre entier | ⚠️ Monde 2 (sur quantité, pas nombre abstrait) | — |
| Pourcentages — comprendre, calculer, appliquer | ❌ absent | **Sprint D** |

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
| WorldWorkshop | mesure + opérateur | ❌ | `true` (résultat peut > 1) |
| WorldGranary | addition/soustraction | ❌ | `true` (résultat peut > 1) |
| WorldBridge | comparaison | ❌ — double NumberLine post-réponse | `false` |
| WorldRoad | magnitude | ❌ | `true` |
| WorldMarket | quotient | ❌ | `true` |
| WorldFestival | tous | si `sense==='partage'` | si `num > den` |

### Hooks — différence clé

| Hook | Cible calculée |
|---|---|
| `useFractionChallenge` | `target = num / den` (+ phase `bracket` → `place` → `done`) |
| `useOperatorChallenge` | `target = (num / den) × total` |
| `useAdditionChallenge` | `target = (num1 ± num2) / den` |
| `useCompareChallenge` | valide `"A"` / `"B"` / `"equal"`, retourne `errorBias` si incorrect |

### Unlock inter-monde (App.jsx — chaîne réelle)

```
WorldFarm (1) → WorldWorkshop (2) → WorldGranary (6)
             → WorldBridge (7)    → WorldRoad (3)
             → WorldMarket (4)    → WorldFestival (5)
```

`unlockWorld(nextId)` est appelé dans `App.jsx` via `handleComplete(nextWorldId)`. **Idempotent.**

### Architecture WorldMap — règle critique

Les `WorldNode` sont rendus **en dehors du `<svg>`**, dans un `<div position:relative>` qui encapsule également le SVG. Les coordonnées `x` et `y` (0–100) du tableau `WORLDS` correspondent à des pourcentages CSS sur ce conteneur.

> ⚠️ Ne jamais rendre des `<button>` HTML à l'intérieur d'un `<svg>` — `position: absolute` n'y fonctionne pas.

### Conventions data/ (tous fichiers `challenges/worldN.js`)

- `context` : langage naturel uniquement, **aucune notation fractionnaire**. `FractionDisplay` affiche la fraction.
- `hint` : écriture littérale uniquement ("trois demis", "cinq quarts"…), **jamais de barre oblique**.
- `level` : `"CE2-révision"` · `"CM1"` · `"CM2"` · `"6e"`
- `sense` (world5) : `'partage' | 'mesure' | 'magnitude' | 'quotient' | 'decimal-auto' | 'equality-gap'`
- `errorBias` (world2ter) : `'larger-denom-bigger' | 'same-denom-strategy' | 'benchmark-half' | null`
- `correct` (world2ter) : `"A" | "B" | "equal"` — `"equal"` affiche un 3e bouton dans `CompareQuestion`

### Champs supplémentaires par monde

| Fichier | Champs extra | Usage |
|---|---|---|
| `world2.js` | `total`, `unit`, `sense` | `useOperatorChallenge` calcule la cible ; branche mesure vs opérateur |
| `world2bis.js` | `num1`, `num2`, `den`, `op` | `useAdditionChallenge` calcule `(num1 ± num2) / den` |
| `world2ter.js` | `fracA`, `fracB`, `correct`, `strategy`, `errorBias` | `useCompareChallenge` valide le choix |
| `world3.js` | `bracket` | `BracketQuestion` phase 1 avant NumberLine |
| `world4.js` | `objects`, `people` | `WorldMarket` affiche l'équation `÷` |
| `world5.js` | `sense` | Dispatcher `WorldFestival` + `SenseBreakdown` |

### TeacherDashboard — WORLDS_META (worldId réels, ordre d'affichage)

| worldId | Monde | Niveau programme |
|---|---|---|
| 1 | 🌾 La Ferme de Mila | CE2-révision / CM1 |
| 2 | 🔨 L'Atelier de Koro | CM1 (unitaire) · CM2 (non-unitaire) |
| 6 | 🫙 Le Grenier de Koro | CM2 |
| 7 | 🌉 Le Pont de Léna | CM1 · CM2 · 6ème |
| 3 | ⭐ La Route des Étoiles | CM1 |
| 4 | 🏪 Le Marché de Sao | 6ème |
| 5 | 🎪 Le Grand Festival | 6ème — synthèse |

Total étoiles max : `WORLDS_META.length × 3 = 21`. Calculé dynamiquement — ne pas hardcoder.

---

## Backlog v2 — conformité BO n°16, 2026

### Vue d'ensemble

```
PRIORITÉ 1 — lacunes programme immédiates
  Sprint A ── Comparaison de fractions (CM1/CM2/6e)        ✅ Terminé
  Sprint B ── Automatismes 6e : fraction↔décimale          ~5h   3 fichiers  ← PROCHAIN
               + égalités à trous

PRIORITÉ 2 — complétude programme
  Sprint C ── Représentations variées + graduation          ~5h   3 fichiers
  Sprint D ── Pourcentages (6e)                             ~7h   5 fichiers

PRIORITÉ 3 — qualité didactique
  Sprint E ── Feedback diagnostique (types d'erreurs)       ~5h   4 fichiers
  Sprint F ── Multi-représentations coordonnées             ~4h   3 fichiers

PRIORITÉ 4 — IHM éducation
  Sprint G ── Accessibilité WCAG 2.1 AA (transversal)      ~6h   transversal
  Sprint H ── Touch-first tablette + Dashboard v2           ~8h   4 fichiers
                                                           ───
                                                           ~40h restants
```

**Dépendances** : B et C sont indépendants. D dépend de B (automatismes décimaux). E dépend de A (champ `errorBias` prêt dans world2ter). G est transversal, commencer tôt.

---

### Sprint A — Comparaison de fractions ✅ TERMINÉ

**Source BO n°16** : attendu explicite CM1, CM2 et 6ème — "Comparer des fractions" + "Établir des égalités de fractions".

**Fichiers livrés**

| Fichier | Action |
|---|---|
| `src/data/challenges/world2ter.js` | 6 défis, 3 stratégies, champ `errorBias`, `correct: "equal"` |
| `src/hooks/useCompareChallenge.js` | Logique A/B/equal, retourne `errorBias` si incorrect |
| `src/components/ui/CompareQuestion.jsx` | Boutons A/B/Égales + NumberLine double phase revealed |
| `src/components/worlds/WorldBridge.jsx` | Monde 7, thème indigo |
| `src/hooks/useGameProgression.js` | worldId 7 ajouté dans INIT |
| `src/App.jsx` | Route bridge + unlock Granary→Bridge→Road |
| `src/components/layout/WorldMap.jsx` | Nœud bridge (44,22) + overlay HTML corrigé |
| `src/components/layout/TeacherDashboard.jsx` | worldId 7 dans WORLDS_META |

**Leçon architecture retenue** : les `WorldNode` (`<button>` HTML) ne peuvent pas être enfants d'un `<svg>`. Structure correcte : `<div position:relative>` contenant le SVG (visuel seul) et les nœuds en overlay absolu avec `left/top` en pourcentages.

---

### Sprint B — Automatismes 6ème : fraction↔décimale + égalités à trous ← **PROCHAIN**

**Source BO n°16** : automatismes explicites 6ème.

Cas fraction↔décimale imposés par le texte :
`1/4 = 0,25 · 1/2 = 0,5 · 3/4 = 0,75 · 3/2 = 1,5 · 4/2 = 2 · 5/2 = 2,5`

Égalités à trous imposées par le texte :
`1/2+1/2=? · 1/4+1/4=? · 1−1/4=? · 1/2+1/4=? · 1−1/2=? · 3/4+1/4=? · 1/2−1/4=? · 3/4−1/4=?`

Égalités multiplicatives à trous (sens quotient 6ème) :
expressions du type `__ × 1/4 = 3/4` ou `3/4 = 3 × __`

**Implémentation** : extension de `WorldFestival` (Monde 5) — deux nouvelles branches `sense`.

| # | Fichier | Action |
|---|---|---|
| B.1 | `src/data/challenges/world5.js` | +3 défis `sense: "decimal-auto"` + 3 défis `sense: "equality-gap"` |
| B.2 | `src/components/worlds/WorldFestival.jsx` | Branches conditionnelles selon `sense` |
| B.3 | `src/components/ui/DecimalInput.jsx` | Saisie décimale FR (virgule), clavier numérique — ≤ 150 lignes |

**Critères d'acceptation**

- Les 6 correspondances fraction↔décimale du BO sont toutes jouables.
- Les 8 égalités à trous du BO sont toutes jouables.
- `DecimalInput` accepte la virgule comme séparateur décimal (usage FR).
- `WorldFestival` ≤ 200 lignes après modification.

**Message de commit**

```
feat(WorldFestival): automatismes 6e — fraction↔décimale + égalités à trous (BO n°16 2026)

- world5.js : +3 défis decimal-auto, +3 défis equality-gap
- DecimalInput : saisie décimale FR, clavier numérique
- Branches WorldFestival selon sense
```

---

### Sprint C — Représentations variées + graduation d'un segment

**Source BO n°16** :
- Automatismes 6ème : "L'élève sait reconnaître une fraction sur des représentations **variées**, par exemple : rectangle, disque, triangle, bande graduée."
- Capacités 6ème : "Graduer un segment de longueur donnée."

FRACTOÏA couvre rectangle (`FractionBar`) et bande (`NumberLine`). Disque et triangle manquent.

| # | Fichier | Action |
|---|---|---|
| C.1 | `src/components/ui/FractionDisc.jsx` | Secteur circulaire SVG animé — ≤ 150 lignes |
| C.2 | `src/components/ui/FractionTriangle.jsx` | Triangle partitionné SVG — ≤ 150 lignes |
| C.3 | `src/components/worlds/WorldFarm.jsx` | Rotation des 4 représentations en phase `done` (paliers 2-3) |

**Note pédagogique** : nouvelles représentations affichées **après** la réponse uniquement — principe Tricot.

**Message de commit**

```
feat(ui): représentations variées — FractionDisc + FractionTriangle (automatismes 6e, BO n°16 2026)
```

---

### Sprint D — Pourcentages (6ème)

**Source BO n°16** : "Comprendre le sens d'un pourcentage ; calculer une proportion et l'exprimer sous forme de pourcentage dans des cas simples ; appliquer un pourcentage à une grandeur ou un nombre."

**Nouveau Monde : 🎭 La Fête de l'Équinoxe** (worldId 8, unlock Market→Equinox→Festival)

```
Palier 1 — sens       : "50 élèves sur 100, c'est 50 %"
Palier 2 — calcul     : "25 % de 80 billets, c'est combien ?"
Palier 3 — proportion : "30 billets sur 40, c'est quel % ?"
```

| # | Fichier | Action |
|---|---|---|
| D.1 | `src/data/challenges/world_equinox.js` | 6 défis — 3 paliers |
| D.2 | `src/hooks/usePercentChallenge.js` | Logique cible = `(pct/100) × total` — ≤ 80 lignes |
| D.3 | `src/components/ui/PercentDisplay.jsx` | Affichage "X %" — ≤ 150 lignes |
| D.4 | `src/components/worlds/WorldEquinox.jsx` | Nouveau monde — ≤ 200 lignes |
| D.5 | `src/App.jsx` + `WorldMap.jsx` | worldId 8, unlock chain mis à jour |

**Message de commit**

```
feat: Monde 8 WorldEquinox — pourcentages (6e, BO n°16 2026)
```

---

### Sprint E — Feedback diagnostique

**Fondement** : Hattie & Timperley (2007) — feedback efficace si porte sur la stratégie, pas seulement le résultat.

**Cinq codes d'erreur** (Stafylidou & Vosniadou, 2004 ; CSEN, 2022) :

| Code | Description | Monde déclencheur |
|---|---|---|
| `larger-denom-bigger` | Croire que 1/5 > 1/3 parce que 5 > 3 | WorldBridge palier 2 |
| `sum-of-parts` | Additionner les dénominateurs (1/4+1/4=2/8) | WorldGranary |
| `fraction-always-lt-1` | Croire qu'une fraction est toujours < 1 | WorldRoad, WorldFestival |
| `whole-number` | Traiter num. et dén. comme des entiers indépendants | WorldBridge |
| `benchmark-half` | Mauvais positionnement par rapport à 1/2 | WorldBridge palier 3 |

| # | Fichier | Action |
|---|---|---|
| E.1 | `src/data/errorMessages.js` | Table des 5 messages diagnostiques |
| E.2 | `src/hooks/useFeedback.js` | Accepter `errorCode` optionnel |
| E.3 | `src/components/ui/FeedbackToast.jsx` | Zone diagnostic distincte (🔍) — non-régressif |

**Message de commit**

```
feat(FeedbackToast): feedback diagnostique par type d'erreur cognitive
```

---

### Sprint F — Multi-représentations coordonnées

**Fondement** : Rau (2017) — plusieurs représentations sont plus efficaces si explicitement mises en correspondance.

Mode "révélation" post-réponse : `FractionBar` + `NumberLine` liées visuellement.

| # | Fichier | Action |
|---|---|---|
| F.1 | `src/components/ui/DualRepresentation.jsx` | Wrapper FractionBar + NumberLine animé — ≤ 150 lignes |
| F.2 | `src/components/worlds/WorldFarm.jsx` | `DualRepresentation` phase `done` (paliers 2-3) |
| F.3 | `src/components/worlds/WorldWorkshop.jsx` | Idem paliers non-unitaires |

**Message de commit**

```
feat(ui): DualRepresentation — liaison FractionBar/NumberLine post-réponse
```

---

### Sprint G — Accessibilité WCAG 2.1 AA (transversal)

**Contexte** : classes ordinaires avec élèves ULIS, DYS, déficits visuels.
Mener un audit Lighthouse / axe DevTools avant de coder.

```
NumberLine.jsx      → role="slider", aria-valuemin/max/now, navigation clavier ← →
FractionDisplay.jsx → aria-label="3 sur 4" (jamais "3/4")
FeedbackToast.jsx   → role="alert" aria-live="assertive"
Boutons interactifs → focus-visible:ring-2 Tailwind
Couleurs            → contraste ≥ 4.5:1
Typographie         → taille min 16px, option police Luciole
```

| # | Fichier | Action |
|---|---|---|
| G.1 | `src/components/ui/NumberLine.jsx` | `role="slider"`, navigation clavier, `aria-value*` |
| G.2 | `src/components/ui/FractionDisplay.jsx` | `aria-label` littéral |
| G.3 | `src/components/ui/FeedbackToast.jsx` | `role="alert"` |
| G.4 | `src/components/ui/AccessibilityMenu.jsx` | Bouton ⚙️ — police, taille, contraste — ≤ 150 lignes |

**Message de commit**

```
a11y: accessibilité WCAG 2.1 AA — sprint transversal
```

---

### Sprint H — Touch-first tablette + TeacherDashboard v2

**Contexte IHM** : usage dominant en classe primaire = tablette. Cible tactile minimale = **44 × 44 px**.

**Touch** :

```
NumberLine.jsx   → onPointerDown/Move/Up, hitbox 44px, snapping aux graduations
WorldNode        → zone cliquable étendue à 44×44px
Inputs           → type="number" inputmode="numeric", taille min 48px
```

**TeacherDashboard v2** — trois nouvelles sections :
1. Carte des obstacles (`errorBias` par monde + suggestion pédagogique)
2. Suggestions de prolongement (basées sur les étoiles)
3. Export synthèse (`window.print()` + CSS `@media print`)

| # | Fichier | Action |
|---|---|---|
| H.1 | `src/components/ui/NumberLine.jsx` | Pointer events, hitbox 44px, snapping |
| H.2 | `src/components/layout/WorldMap.jsx` | Hitbox `WorldNode` ≥ 44×44px |
| H.3 | `src/hooks/useGameProgression.js` | Stocker les `errorBias` dans localStorage |
| H.4 | `src/components/layout/TeacherDashboard.jsx` | Section obstacles + suggestions |
| H.5 | `src/components/ui/ExportSummary.jsx` | Fiche PDF CSS print — ≤ 150 lignes |

**Message de commit**

```
feat: Sprint H — touch tablette + TeacherDashboard v2
```

---

## Références didactiques

| Référence | Usage dans FRACTOÏA |
|---|---|
| Brousseau & Brousseau (1987) — fraction-commensuration | Fraction-mesure / magnitude |
| Projet REPSAF / Pôle Pégase (2022) — fraction comme magnitude | Monde 3 |
| Amadieu & Tricot (2014) — *Apprendre avec le numérique* | Tous les principes IHM |
| CSEN / Dehaene et al. (2022) — test de la ligne numérique | NumberLine comme évaluation |
| Ni & Zhou (2005) — *Teaching and Learning Fractions* | Biais du nombre entier — Sprint A, E |
| Siegler et al. (2011) — *Fractions: The New Frontier* | Magnitude = prédicteur arithmétique |
| Rau (2017) — *Conditions for the Effectiveness of Multiple Visual Representations* | Sprint F |
| Hattie & Timperley (2007) — *The Power of Feedback* | Sprint E |
| Stafylidou & Vosniadou (2004) — *Understanding of Fractions* | Catalogue d'erreurs typiques |
| Vamvakoussi & Vosniadou (2010) — *Bridging the gap* | Fractions ↔ décimaux |
| WCAG 2.1 (W3C, 2018) | Sprint G |

---

## Workflow agile — cycle d'un sprint

```bash
# 1. Créer la branche
git checkout main && git pull origin main
git checkout -b feat/sprint-B-automatismes-6e

# 2. Après chaque fichier — un commit par fichier
git add src/data/challenges/world5.js
git commit -m "feat(data): world5.js — défis decimal-auto et equality-gap (automatismes 6e)"
# ... répéter pour chaque fichier

# 3. Push + Pull Request GitHub
git push origin feat/sprint-B-automatismes-6e
# Créer PR → merger après pnpm build vert

# 4. Retour sur main
git checkout main && git pull origin main

# 5. Mettre à jour ROADMAP.md (sprint terminé → ✅)
git add ROADMAP.md
git commit -m "docs(ROADMAP): Sprint B terminé ✅"
git push

# 6. Synchroniser la base de connaissances Claude
#    Projet → Base de connaissances → supprimer ancien ROADMAP.md → uploader le nouveau
```

> **Règle de synchronisation** : à chaque sprint terminé et mergé, la base de connaissances Claude est mise à jour **manuellement** depuis le fichier versionné dans le repo. Le repo GitHub est la source de vérité ; la base de connaissances en est le miroir.
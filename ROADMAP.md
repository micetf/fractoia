# FRACTOÏA — ROADMAP

> **Document de référence technique** — architecture, conventions de code, backlog des sprints et conformité aux programmes.
> Source de vérité unique. La base de connaissance Claude **et** le repo GitHub doivent pointer vers ce fichier.
>
> Référence programme : **Bulletin officiel n°16 du 10 avril 2026** — Programme de mathématiques pour le cycle 3.

---

## État du projet

**Version actuelle** : 6 mondes jouables, TeacherDashboard, unlock inter-monde, GameProgressionProvider (Context).
**Prochaine étape** : Sprint A — Comparaison de fractions.

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
│   │   ├── FeedbackToast.jsx        ✅  Feedback immédiat animé
│   │   ├── ProgressStars.jsx        ✅  Étoiles de progression (0-3)
│   │   ├── SenseBreakdown.jsx       ✅  Décomposition par sens (TeacherDashboard)
│   │   ├── AboutPrograms.jsx        ✅  Section dépliable programmes (TeacherDashboard)
│   │   ├── CompareQuestion.jsx      ⬜  Comparaison deux fractions (Sprint A)
│   │   └── WorldNode.jsx            ✅  Nœud interactif sur WorldMap
│   │
│   ├── worlds/
│   │   ├── WorldFarm.jsx            ✅  Monde 1 — fraction-partage
│   │   ├── WorldWorkshop.jsx        ✅  Monde 2 — fraction-mesure + opérateur
│   │   ├── WorldGranary.jsx         ✅  Monde 6 — addition/soustraction (même dén.)
│   │   ├── WorldBridge.jsx          ⬜  Monde 7 — comparaison de fractions (Sprint A)
│   │   ├── WorldRoad.jsx            ✅  Monde 3 — fraction-magnitude + encadrement
│   │   ├── WorldMarket.jsx          ✅  Monde 4 — fraction-quotient
│   │   └── WorldFestival.jsx        ✅  Monde 5 — tous les sens + automatismes 6e
│   │
│   └── layout/
│       ├── WorldMap.jsx             ✅  Carte hub (île SVG + chemin animé)
│       └── TeacherDashboard.jsx     ✅  Tableau de bord enseignant
│
├── hooks/
│   ├── useLocalStorage.js           ✅  Persistance localStorage + reset
│   ├── useFeedback.js               ✅  Feedback immédiat (success/error/hint)
│   ├── useFractionChallenge.js      ✅  Séquence défis — target = num/den (+ phase bracket)
│   ├── useOperatorChallenge.js      ✅  Séquence défis — target = (num/den) × total
│   ├── useAdditionChallenge.js      ✅  Séquence défis — target = (num1 ± num2) / den
│   ├── useCompareChallenge.js       ⬜  Séquence défis — comparaison A vs B (Sprint A)
│   └── useGameProgression.js        ✅  GameProgressionProvider (Context) + unlock
│
├── data/challenges/
│   ├── world1.js                    ✅  6 défis — partage, dén. ≤ 8
│   ├── world2.js                    ✅  9 défis — mesure (palier 0) + opérateur (paliers 1-3)
│   ├── world2bis.js                 ✅  6 défis — addition/soustraction CM2 (worldId 6)
│   ├── world3.js                    ✅  6 défis — magnitude > 1, champ bracket
│   ├── world4.js                    ✅  6 défis — quotient + fractions équivalentes
│   ├── world5.js                    ✅  6 défis — synthèse tous sens
│   └── world2ter.js                 ⬜  6 défis — comparaison (Sprint A)
│
└── App.jsx                          ✅  GameProgressionProvider + AppRouter
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
| **Comparer des fractions** | ❌ absent | **Sprint A** |
| Additionner et soustraire des fractions (même dén.) | ✅ Monde 6 | — |
| Déterminer une fraction d'une quantité — unitaire | ✅ Monde 2 | — |

### CM2 — Fractions (dénominateurs ≤ 60, sauf fractions décimales ≤ 1000)

| Attendu officiel (BO n°16) | FRACTOÏA | Sprint |
|---|---|---|
| Tout CM1 + | | |
| **Comparer des fractions** | ❌ absent | **Sprint A** |
| Additionner et soustraire des fractions (même dén.) | ✅ Monde 6 | — |
| Calculer le produit d'un entier et d'une fraction | ✅ Monde 2 (non-unitaire) | — |
| Déterminer une fraction d'une quantité — non-unitaire | ✅ Monde 2 | — |

### 6ème — Automatismes (texte BO n°16)

| Attendu officiel (BO n°16) | FRACTOÏA | Sprint |
|---|---|---|
| Reconnaître une fraction sur représentations **variées** (rectangle, disque, triangle, bande) | ⚠️ rectangle + bande seulement | **Sprint C** |
| Relations 1/4, 1/2, 3/4, 1 — **égalités à trous** (1/2+1/4=? ; 1−1/4=?…) | ❌ absent | **Sprint B** |
| Passer fraction ↔ décimale : 1/4=0,25 ; 1/2=0,5 ; 3/4=0,75 ; 3/2=1,5 ; 5/2=2,5 | ❌ absent | **Sprint B** |
| Diviseurs et multiples réactivés (pour simplification, addition, comparaison) | ⚠️ outil non explicité | — |
| Calculer 2/3 de 12, 3/4 de 10 (opérateur) | ✅ Monde 2 | — |

### 6ème — Connaissances et capacités attendues

| Attendu officiel (BO n°16) | FRACTOÏA | Sprint |
|---|---|---|
| Relier fraction au résultat de la division (a÷b = a/b) | ✅ Monde 4 | — |
| Comprendre la définition du quotient — compléter égalités multiplicatives | ❌ absent | **Sprint B** |
| Placer une fraction sur demi-droite (cas simples) | ✅ Monde 4 | — |
| **Graduer un segment de longueur donnée** | ❌ absent | **Sprint C** |
| Savoir que a/b peut être entier, décimal non entier, non décimal | ⚠️ Monde 4 palier 3 | — |
| **Établir des égalités de fractions** | ⚠️ effleuré Monde 4 | **Sprint A** |
| **Comparer et encadrer des fractions** | ❌ absent | **Sprint A** |
| **Ordonner une liste de fractions / nombres mixtes** | ❌ absent | **Sprint A** |
| Additionner et soustraire des fractions | ✅ Monde 6 | — |
| Multiplier une fraction par un nombre entier (abstrait, pas seulement quantité) | ⚠️ partiel Monde 2 | — |
| Résoudre / inventer des problèmes mettant en jeu des fractions | ✅ tous les mondes | — |
| **Pourcentages** — comprendre, calculer proportion, appliquer | ❌ absent | **Sprint D** |

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
| `useCompareChallenge` | valide le choix `"A"` ou `"B"`, détecte `errorBias` |

### Unlock inter-monde (App.jsx — chaîne réelle)

```
WorldFarm (1) → WorldWorkshop (2) → WorldGranary (6)
             → WorldBridge (7)    → WorldRoad (3)
             → WorldMarket (4)    → WorldFestival (5)
```

`unlockWorld(nextId)` est appelé dans `App.jsx` via `handleComplete(nextWorldId)`. **Idempotent.**

### Conventions data/ (tous fichiers `challenges/worldN.js`)

- `context` : langage naturel uniquement, **aucune notation fractionnaire**. `FractionDisplay` affiche la fraction.
- `hint` : écriture littérale uniquement ("trois demis", "cinq quarts"…), **jamais de barre oblique**.
- `level` : `"CE2-révision"` · `"CM1"` · `"CM2"` · `"6e"`
- `sense` (world5) : `'partage' | 'mesure' | 'magnitude' | 'quotient' | 'decimal-auto' | 'equality-gap'`
- `errorBias` (world2ter) : `'larger-denom-bigger' | 'same-denom-strategy' | 'benchmark-half' | null`

### Champs supplémentaires par monde

| Fichier | Champs extra | Usage |
|---|---|---|
| `world2.js` | `total`, `unit`, `sense` | `useOperatorChallenge` calcule la cible ; branche mesure vs opérateur |
| `world2bis.js` | `num1`, `num2`, `den`, `op` | `useAdditionChallenge` calcule `(num1 ± num2) / den` |
| `world2ter.js` | `fracA`, `fracB`, `correct`, `strategy`, `errorBias` | `useCompareChallenge` valide le choix |
| `world3.js` | `bracket` | `BracketQuestion` phase 1 avant NumberLine |
| `world4.js` | `objects`, `people` | `WorldMarket` affiche l'équation `÷` |
| `world5.js` | `sense` | Dispatcher `WorldFestival` + `SenseBreakdown` |

### TeacherDashboard — structure (WORLDS_META worldId réels)

| worldId | Monde | Niveau |
|---|---|---|
| 1 | 🌾 La Ferme de Mila | CE2-révision / CM1 |
| 2 | 🔨 L'Atelier de Koro | CM1 (unitaire) · CM2 (non-unitaire) |
| 6 | 🫙 Le Grenier de Koro | CM2 |
| 7 | 🌉 Le Pont de Léna | CM1 · CM2 · 6ème ⬜ Sprint A |
| 3 | ⭐ La Route des Étoiles | CM1 |
| 4 | 🏪 Le Marché de Sao | 6ème |
| 5 | 🎪 Le Grand Festival | 6ème — synthèse |

---

## Backlog v2 — conformité BO n°16, 2026

### Vue d'ensemble

```
PRIORITÉ 1 — lacunes programme immédiates
  Sprint A ── Comparaison de fractions (CM1/CM2/6e)      ~6h   5 fichiers  ← PROCHAIN
  Sprint B ── Automatismes 6e : fraction↔décimale        ~5h   3 fichiers
               + égalités à trous

PRIORITÉ 2 — complétude programme
  Sprint C ── Représentations variées + graduation        ~5h   3 fichiers
  Sprint D ── Pourcentages (6e)                           ~7h   5 fichiers

PRIORITÉ 3 — qualité didactique
  Sprint E ── Feedback diagnostique (types d'erreurs)     ~5h   4 fichiers
  Sprint F ── Multi-représentations coordonnées           ~4h   3 fichiers

PRIORITÉ 4 — IHM éducation
  Sprint G ── Accessibilité WCAG 2.1 AA (transversal)    ~6h   transversal
  Sprint H ── Touch-first tablette + Dashboard v2         ~8h   4 fichiers
                                                         ───
                                                         ~46h total
```

**Dépendances** : A précède tout (champ `errorBias` utilisé par Sprint E). B et C indépendants. D dépend de B (automatismes décimaux). G est transversal, commencer tôt.

---

### Sprint A — Comparaison de fractions ← **PROCHAIN SPRINT**

**Source BO n°16** : attendu explicite **CM1**, **CM2** et **6ème** — "Comparer des fractions" + "Établir des égalités de fractions" + "Ordonner une liste de fractions".
Lacune la plus pénalisante de FRACTOÏA à ce jour.

**Fondement didactique** : la comparaison est le terrain principal du *biais du nombre entier* (Ni & Zhou, 2005) : un élève croit que 1/4 > 1/3 "parce que 4 > 3". Le palier 2 (même numérateur) attaque cette conception directement.

**Nouveau Monde : 🌉 Le Pont de Léna** (worldId 7, entre Monde 6 et Monde 3)

```
Palier 1 (CM1) — même dénominateur : 3/5 vs 2/5
  Stratégie attendue : comparer les numérateurs
  Feedback si erreur : "same-denom-strategy"

Palier 2 (CM1/CM2) — même numérateur : 2/3 vs 2/5   ← rupture cognitive
  Stratégie attendue : "plus le dénominateur est grand, plus les parts sont petites"
  errorBias : "larger-denom-bigger"

Palier 3 (CM2/6e) — cas général via repère 1/2 ou égalité : 3/8 vs 5/7 ; 4/6 = 2/3 ?
  Stratégie attendue : benchmark (l'un sous 1/2, l'autre au-dessus)
  Inclut l'établissement d'égalités de fractions (automatisme 6e)
  errorBias : "benchmark-half" ou null
```

**Flux pédagogique**

```
CompareQuestion : "Laquelle est la plus grande ?" [bouton A] [bouton B]
  → Correct → FeedbackToast contextuel
              + les deux fractions apparaissent simultanément sur la même NumberLine
  → Incorrect → FeedbackToast avec message diagnostique (errorBias)
                + indice disponible dès la 2e erreur
```

| # | Fichier | Action |
|---|---|---|
| A.1 | `src/data/challenges/world2ter.js` | 6 défis, 3 paliers, champs `fracA`, `fracB`, `correct`, `strategy`, `level`, `errorBias` |
| A.2 | `src/hooks/useCompareChallenge.js` | Logique comparaison, détection `errorBias` — ≤ 80 lignes |
| A.3 | `src/components/ui/CompareQuestion.jsx` | Deux boutons fraction + NumberLine double post-réponse — ≤ 150 lignes |
| A.4 | `src/components/worlds/WorldBridge.jsx` | Nouveau monde — ≤ 200 lignes |
| A.5 | `src/App.jsx` + `src/components/layout/WorldMap.jsx` | Intégration worldId 7, unlock chain, nœud carte |

**Structure d'un défi (palier 2 — même numérateur)**

```js
{
  fracA: { num: 2, den: 3 },
  fracB: { num: 2, den: 5 },
  correct: "A",
  strategy: "same-numerator",
  level: "CM1",
  emoji: "🌉",
  context: "Le chemin de gauche mesure deux tiers de lieue, "
         + "celui de droite deux cinquièmes. Lequel est le plus long ?",
  hint: "Quand le numérateur est identique, "
      + "les parts les plus grandes viennent du dénominateur le plus petit.",
  errorBias: "larger-denom-bigger",
}
```

**Critères d'acceptation**

- Les trois stratégies (même dén. / même num. / benchmark) sont représentées.
- Post-réponse : A et B positionnés simultanément sur une seule `NumberLine`.
- `errorBias` non-null → message diagnostique distinct dans `FeedbackToast`.
- Unlock chain : `WorldGranary (6) → WorldBridge (7) → WorldRoad (3)`.
- `WorldBridge` ≤ 200 lignes · `useCompareChallenge` ≤ 80 lignes.

**Message de commit**

```
feat: Monde 7 WorldBridge — comparaison de fractions (CM1/CM2/6e, BO n°16 2026)

- world2ter.js : 6 défis, 3 stratégies, champ errorBias
- useCompareChallenge : logique comparaison + détection biais cognitifs
- CompareQuestion : deux boutons fraction + NumberLine double post-réponse
- WorldBridge : nouveau monde (worldId 7)
- App.jsx + WorldMap : unlock chain WorldGranary → WorldBridge → WorldRoad
```

---

### Sprint B — Automatismes 6ème : fraction↔décimale + égalités à trous

**Source BO n°16** : automatismes explicites 6ème.
- Cas imposés par le texte : `1/4=0,25 ; 1/2=0,5 ; 3/4=0,75 ; 3/2=1,5 ; 4/2=2 ; 5/2=2,5`
- Égalités à trous : `1/2+1/2=? ; 1/4+1/4=? ; 1−1/4=? ; 1/2+1/4=? ; 3/4+1/4=? ; 1/2−1/4=? ; 3/4−1/4=?`
- Compléter des **égalités multiplicatives à trous** (sens quotient 6ème)

**Implémentation** : extension de `WorldFestival` (Monde 5) — deux nouvelles branches `sense`.

| # | Fichier | Action |
|---|---|---|
| B.1 | `src/data/challenges/world5.js` | +3 défis `sense: "decimal-auto"` + 3 défis `sense: "equality-gap"` |
| B.2 | `src/components/worlds/WorldFestival.jsx` | Branches conditionnelles selon `sense` |
| B.3 | `src/components/ui/DecimalInput.jsx` | Saisie décimale FR (virgule), clavier numérique adapté — ≤ 150 lignes |

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
- Automatismes 6ème : "L'élève sait reconnaître une fraction sur des représentations **variées**, par exemple : [rectangle, disque, triangle, bande graduée]."
- Capacités 6ème : "**Graduer un segment de longueur donnée**."

FRACTOÏA couvre rectangle (`FractionBar`) et bande (`NumberLine`). **Disque et triangle manquent.**

| # | Fichier | Action |
|---|---|---|
| C.1 | `src/components/ui/FractionDisc.jsx` | Secteur circulaire SVG animé — ≤ 150 lignes |
| C.2 | `src/components/ui/FractionTriangle.jsx` | Triangle partitionné SVG — ≤ 150 lignes |
| C.3 | `src/components/worlds/WorldFarm.jsx` | Rotation des 4 représentations en phase `done` (paliers 2-3) |

**Note pédagogique** : les nouvelles représentations s'affichent **après** la réponse, pas pendant le défi — principe Tricot (pas de surcharge attentionnelle pendant la tâche).

**Message de commit**

```
feat(ui): représentations variées — FractionDisc + FractionTriangle (automatismes 6e, BO n°16 2026)

- FractionDisc : secteur SVG, props num/den
- FractionTriangle : triangle partitionné SVG
- WorldFarm : rotation des 4 représentations phase done (paliers 2-3)
```

---

### Sprint D — Pourcentages (6ème)

**Source BO n°16** : attendus explicites 6ème — "Comprendre le sens d'un pourcentage ; calculer une proportion et l'exprimer sous forme de pourcentage dans des cas simples ; appliquer un pourcentage à une grandeur ou un nombre."

**Nouveau Monde : 🎭 La Fête de l'Équinoxe** (worldId 8, après Monde 4, avant Monde 5)

```
Palier 1 — sens : "50 élèves sur 100, c'est 50 %"
  → fraction (p/100) → pourcentage
  → Stratégie : reconnaissance directe dénominateur 100

Palier 2 — calcul : "25 % de 80 billets, c'est combien ?"
  → pourcentage appliqué à une grandeur
  → Cible : résultat entier sur NumberLine

Palier 3 — proportion : "30 billets vendus sur 40, c'est quel pourcentage ?"
  → fraction → conversion → pourcentage
  → Lien avec fraction décimale (Sprint B)
```

| # | Fichier | Action |
|---|---|---|
| D.1 | `src/data/challenges/world_equinox.js` | 6 défis — 3 paliers, champs `pct`, `total`, `result` |
| D.2 | `src/hooks/usePercentChallenge.js` | Logique cible = `(pct/100) × total` — ≤ 80 lignes |
| D.3 | `src/components/ui/PercentDisplay.jsx` | Affichage "X %" — ≤ 150 lignes |
| D.4 | `src/components/worlds/WorldEquinox.jsx` | Nouveau monde — ≤ 200 lignes |
| D.5 | `src/App.jsx` + `WorldMap.jsx` | Intégration worldId 8, unlock après WorldMarket (4) |

**Message de commit**

```
feat: Monde 8 WorldEquinox — pourcentages (6e, BO n°16 2026)

- world_equinox.js : 6 défis 3 paliers (sens / calcul / proportion)
- usePercentChallenge : cible (pct/100) × total
- PercentDisplay : affichage "X %"
- WorldEquinox : nouveau monde worldId 8
- Unlock : WorldMarket (4) → WorldEquinox (8) → WorldFestival (5)
```

---

### Sprint E — Feedback diagnostique

**Fondement** : Hattie & Timperley (2007) — le feedback est efficace quand il porte sur **la stratégie**, pas seulement sur le résultat.

**Cinq codes d'erreur documentés** issus des travaux de Stafylidou & Vosniadou (2004) et du CSEN (2022) :

| Code | Description | Déclenché par |
|---|---|---|
| `larger-denom-bigger` | Croire que 1/5 > 1/3 parce que 5 > 3 | WorldBridge palier 2 |
| `sum-of-parts` | Additionner les dénominateurs (1/4+1/4=2/8) | WorldGranary erreurs |
| `fraction-always-lt-1` | Croire qu'une fraction est toujours < 1 | WorldRoad, WorldFestival |
| `whole-number` | Traiter num. et dén. comme des entiers indépendants | WorldBridge général |
| `benchmark-half` | Mauvais positionnement par rapport à 1/2 | WorldBridge palier 3 |

| # | Fichier | Action |
|---|---|---|
| E.1 | `src/data/errorMessages.js` | Table des 5 messages diagnostiques |
| E.2 | `src/hooks/useFeedback.js` | Accepter `errorCode` optionnel |
| E.3 | `src/components/ui/FeedbackToast.jsx` | Zone diagnostic distincte (fond coloré, icône 🔍) |
| E.4 | `src/data/challenges/world2ter.js` | Champ `errorBias` déjà prévu en Sprint A |

**Critères d'acceptation**

- `FeedbackToast` sans `errorCode` → comportement identique à l'actuel (non-régressif).
- Diagnostic visuellement distinct du feedback correct/incorrect.
- `FeedbackToast` reste ≤ 150 lignes.

**Message de commit**

```
feat(FeedbackToast): feedback diagnostique par type d'erreur cognitive

- errorMessages.js : 5 codes, texte pédagogique
- useFeedback : errorCode optionnel
- FeedbackToast : zone diagnostic — non-régressif sans errorCode
```

---

### Sprint F — Multi-représentations coordonnées

**Fondement** : Rau (2017) — plusieurs représentations en parallèle sont plus efficaces **à condition d'être explicitement mises en correspondance**.

Mode "révélation" post-réponse dans `WorldFarm` et `WorldWorkshop` : `FractionBar` + `NumberLine` liées visuellement après validation.

| # | Fichier | Action |
|---|---|---|
| F.1 | `src/components/ui/DualRepresentation.jsx` | Wrapper FractionBar + NumberLine avec liaison animée — ≤ 150 lignes |
| F.2 | `src/components/worlds/WorldFarm.jsx` | `DualRepresentation` en phase `done` (paliers 2-3) |
| F.3 | `src/components/worlds/WorldWorkshop.jsx` | Idem paliers opérateur non-unitaire |

**Message de commit**

```
feat(ui): DualRepresentation — liaison FractionBar/NumberLine post-réponse

- DualRepresentation : wrapper animé FractionBar ↔ NumberLine
- WorldFarm + WorldWorkshop : activation phase done
```

---

### Sprint G — Accessibilité WCAG 2.1 AA (transversal)

**Contexte** : classes ordinaires avec élèves ULIS, DYS, déficits visuels.

**Points d'action prioritaires** issus d'un audit Lighthouse / axe DevTools à mener en premier :

```
NumberLine.jsx (SVG interactif)
  → role="slider", aria-valuemin, aria-valuemax, aria-valuenow
  → Navigation clavier : ← → déplace le curseur par pas de 1/den

FractionDisplay.jsx
  → aria-label="3 sur 4" (jamais "3/4" — screen reader lirait "3 virgule 4")

FeedbackToast.jsx
  → role="alert" aria-live="assertive"

Tous les boutons interactifs
  → focus-visible:ring-2 Tailwind sur tous les éléments

Couleurs
  → Contraste ≥ 4.5:1 (vérifier WebAIM Contrast Checker)
  → Ne jamais coder une information par la couleur seule

Typographie
  → Taille minimale 16px pour les textes de défis
  → Option police Luciole (police française conçue pour les malvoyants)
```

| # | Fichier | Action |
|---|---|---|
| G.1 | `src/components/ui/NumberLine.jsx` | `role="slider"`, navigation clavier, `aria-value*` |
| G.2 | `src/components/ui/FractionDisplay.jsx` | `aria-label` littéral |
| G.3 | `src/components/ui/FeedbackToast.jsx` | `role="alert"` |
| G.4 | `src/components/ui/AccessibilityMenu.jsx` | Bouton ⚙️ — choix police, taille texte, contraste — ≤ 150 lignes |
| G.5 | Tous composants interactifs | `focus-visible` ring |

**Message de commit**

```
a11y: accessibilité WCAG 2.1 AA — sprint transversal

- NumberLine : role slider, navigation clavier, aria-value
- FractionDisplay : aria-label littéral
- FeedbackToast : role alert
- AccessibilityMenu : police / taille / contraste
- focus-visible sur tous les éléments interactifs
```

---

### Sprint H — Touch-first tablette + TeacherDashboard v2

**Contexte IHM** : usage dominant en classe primaire française = tablette. Cible tactile minimale = **44 × 44 px** (Apple HIG / Material Design).

**Touch (modifications prioritaires)**

```
NumberLine.jsx
  → Remplacer onClick par onPointerDown/onPointerMove/onPointerUp
  → Hitbox curseur étendue à 44px
  → Snapping visuel aux graduations proches (± 5px)

WorldNode (WorldMap)
  → Zone cliquable étendue à 44×44px

CompareQuestion, BracketQuestion
  → Boutons fraction : height ≥ 56px
  → Inputs : type="number" inputmode="numeric", taille ≥ 48px
```

**TeacherDashboard v2 — trois nouvelles sections**

1. **Carte des obstacles** : `errorBias` déclenchés par monde, avec suggestion pédagogique contextuelle.
2. **Suggestions de prolongement** : basées sur les étoiles obtenues par monde.
3. **Export synthèse** : `window.print()` + CSS `@media print` — fiche A4 sans dépendance externe.

| # | Fichier | Action |
|---|---|---|
| H.1 | `src/components/ui/NumberLine.jsx` | Pointer events, hitbox 44px, snapping |
| H.2 | `src/components/layout/WorldMap.jsx` | Hitbox `WorldNode` ≥ 44×44px |
| H.3 | `src/hooks/useGameProgression.js` | Stocker les `errorBias` déclenchés dans localStorage |
| H.4 | `src/components/layout/TeacherDashboard.jsx` | Section obstacles + suggestions |
| H.5 | `src/components/ui/ExportSummary.jsx` | Fiche PDF CSS print — ≤ 150 lignes |

**Message de commit**

```
feat: Sprint H — touch tablette + TeacherDashboard v2

- NumberLine : pointerDown/Move/Up, hitbox 44px, snapping
- WorldNode : hitbox 44×44px minimum
- useGameProgression : stockage errorBias
- TeacherDashboard : obstacles + suggestions + export print
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
git checkout -b feat/sprint-A-comparaison

# 2. Après chaque fichier — un commit par fichier
git add src/data/challenges/world2ter.js
git commit -m "feat(data): world2ter — 6 défis comparaison fractions (CM1/CM2/6e)"
# ... répéter pour chaque fichier

# 3. Push + Pull Request GitHub
git push origin feat/sprint-A-comparaison
# Créer PR sur GitHub → merger après test pnpm build

# 4. Retour sur main
git checkout main && git pull origin main

# 5. Mettre à jour ce fichier ROADMAP.md
#    Changer le statut du sprint : ← EN COURS → ✅ Terminé
git add ROADMAP.md
git commit -m "docs(ROADMAP): Sprint A terminé ✅"
git push

# 6. Synchroniser la base de connaissances Claude
#    Projet → Base de connaissances → supprimer ancien ROADMAP.md → uploader le nouveau
```

> **Règle de synchronisation** : à chaque sprint terminé et mergé, la base de connaissances Claude est mise à jour **manuellement** depuis le fichier versionné dans le repo. Le repo GitHub est la source de vérité ; la base de connaissances en est le miroir.
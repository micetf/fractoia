# FRACTOÏA — ROADMAP

> **Document de référence technique** — architecture, conventions de code, état des sprints et conformité aux programmes.
> Source de vérité unique. La base de connaissance Claude **et** le repo GitHub doivent pointer vers ce fichier.
>
> Référence programme : **Bulletin officiel n°16 du 10 avril 2026** — Programme de mathématiques pour le cycle 3.

---

## État du projet — v1.0 complète

**8 mondes jouables · Accessibilité WCAG 2.1 AA · Touch tablette · Dashboard v2**
Tous les sprints A–H sont terminés et mergés. Le projet est conforme au BO n°16 (2026).

### Progression historique

| Sprint | Contenu | Statut |
|---|---|---|
| 1–5b | Socle technique, mondes 1–5, WorldMap, TeacherDashboard v1 | ✅ Terminé |
| A | Comparaison de fractions · Monde 7 Le Pont de Léna | ✅ Terminé |
| B | Automatismes 6ème · fraction↔décimale · égalités à trous | ✅ Terminé |
| C | Représentations variées · FractionDisc · FractionTriangle | ✅ Terminé |
| D | Pourcentages · Monde 8 La Fête de l'Équinoxe | ✅ Terminé |
| E | Feedback diagnostique · 5 biais cognitifs · FeedbackToast | ✅ Terminé |
| F | Multi-représentations coordonnées · DualRepresentation | ✅ Terminé |
| G | Accessibilité WCAG 2.1 AA · clavier · aria · AccessibilityMenu | ✅ Terminé |
| H | Touch tablette · Dashboard v2 · ExportSummary · recordError | ✅ Terminé |

---

## Architecture technique

```
src/
├── components/
│   ├── ui/
│   │   ├── FractionBar.jsx          ✅  Barre partitionnée (sens partage)
│   │   ├── FractionDisc.jsx         ✅  Secteur circulaire SVG (Sprint C)
│   │   ├── FractionTriangle.jsx     ✅  Triangle partitionné SVG (Sprint C)
│   │   ├── NumberLine.jsx           ✅  Demi-droite SVG · pointer events · clavier (Sprints G+H)
│   │   ├── DecompBubble.jsx         ✅  Décomposition entier + fraction (> 1)
│   │   ├── FractionDisplay.jsx      ✅  Notation fractionnaire verticale · aria-label
│   │   ├── FractionEquation.jsx     ✅  Équation addition/soustraction
│   │   ├── MeasureRuler.jsx         ✅  Règle SVG annotée (sens mesure)
│   │   ├── BracketQuestion.jsx      ✅  Encadrement par deux entiers consécutifs
│   │   ├── CompareQuestion.jsx      ✅  Comparaison A/B/Égales + mini-droite SVG dédiée
│   │   ├── DecimalInput.jsx         ✅  Saisie décimale FR · equality-gap boutons (Sprint B)
│   │   ├── DualRepresentation.jsx   ✅  FractionBar + NumberLine liées (Sprint F)
│   │   ├── PercentDisplay.jsx       ✅  Affichage X% + barre visuelle (Sprint D)
│   │   ├── FeedbackToast.jsx        ✅  Toast · role=alert · zone diagnostic (Sprints E+G)
│   │   ├── ProgressStars.jsx        ✅  Étoiles de progression (0-3)
│   │   ├── SenseBreakdown.jsx       ✅  Décomposition par sens (TeacherDashboard)
│   │   ├── AboutPrograms.jsx        ✅  Section dépliable programmes (TeacherDashboard)
│   │   ├── WorldNode.jsx            ✅  Nœud HTML overlay · hitbox 44px (Sprint H)
│   │   ├── AccessibilityMenu.jsx    ✅  Police Luciole · grande taille · contraste (Sprint G)
│   │   └── ExportSummary.jsx        ✅  Fiche bilan imprimable (Sprint H)
│   │
│   ├── worlds/
│   │   ├── WorldFarm.jsx            ✅  Monde 1 — partage · DualRepresentation · Disc/Triangle
│   │   ├── WorldWorkshop.jsx        ✅  Monde 2 — mesure + opérateur · DualRepresentation
│   │   ├── WorldGranary.jsx         ✅  Monde 6 — addition/soustraction (même dén.)
│   │   ├── WorldBridge.jsx          ✅  Monde 7 — comparaison · feedback diagnostique
│   │   ├── WorldRoad.jsx            ✅  Monde 3 — magnitude + encadrement
│   │   ├── WorldMarket.jsx          ✅  Monde 4 — quotient
│   │   ├── WorldEquinox.jsx         ✅  Monde 8 — pourcentages (Sprint D)
│   │   └── WorldFestival.jsx        ✅  Monde 5 — tous les sens · automatismes 6ème
│   │
│   └── layout/
│       ├── WorldMap.jsx             ✅  Île SVG + nœuds HTML overlay · 8 mondes
│       └── TeacherDashboard.jsx     ✅  v2 · obstacles · suggestions · export print
│
├── hooks/
│   ├── useLocalStorage.js           ✅
│   ├── useFeedback.js               ✅  diagnostic optionnel dans showError (Sprint E)
│   ├── useFractionChallenge.js      ✅  target = num/den · phases bracket/place/done
│   ├── useOperatorChallenge.js      ✅  target = (num/den) × total
│   ├── useAdditionChallenge.js      ✅  target = (num1 ± num2) / den
│   ├── useCompareChallenge.js       ✅  A/B/equal · retourne errorBias (Sprint A)
│   ├── usePercentChallenge.js       ✅  target = challenge.result · tolérance 0.5 (Sprint D)
│   └── useGameProgression.js        ✅  Context · unlock · recordResult · recordError (Sprint H)
│
├── data/
│   ├── errorMessages.js             ✅  5 codes biais cognitifs (Sprint E)
│   └── challenges/
│       ├── world1.js                ✅  6 défis — partage
│       ├── world2.js                ✅  9 défis — mesure + opérateur
│       ├── world2bis.js             ✅  6 défis — addition/soustraction
│       ├── world2ter.js             ✅  6 défis — comparaison · errorBias
│       ├── world3.js                ✅  6 défis — magnitude · bracket
│       ├── world4.js                ✅  6 défis — quotient
│       ├── world5.js                ✅  12 défis — tous sens + automatismes 6ème
│       └── world_equinox.js         ✅  6 défis — pourcentages 3 paliers (Sprint D)
│
├── styles/
│   └── a11y-overrides.css           ✅  data-a11y-* · focus-visible (Sprint G)
│
└── App.jsx                          ✅  GameProgressionProvider · 8 routes · AccessibilityMenu
```

---

## Conformité BO n°16, 2026 — état final

### CM1

| Attendu | Couvert | Monde |
|---|---|---|
| Interpréter, représenter, écrire, lire des fractions | ✅ | 1 |
| Fraction > 1 = entier + fraction < 1 | ✅ | 3 |
| Encadrer par deux entiers consécutifs | ✅ | 3 |
| Placer sur demi-droite | ✅ | 1–3 |
| Comparer des fractions | ✅ | 7 |
| Additionner / soustraire (même dén.) | ✅ | 6 |
| Fraction d'une quantité — unitaire | ✅ | 2 |

### CM2

| Attendu | Couvert | Monde |
|---|---|---|
| Tout CM1 | ✅ | — |
| Comparer des fractions | ✅ | 7 |
| Produit entier × fraction | ✅ | 2 |
| Fraction d'une quantité — non-unitaire | ✅ | 2 |

### 6ème — Automatismes

| Attendu | Couvert | Monde |
|---|---|---|
| Reconnaître fraction sur représentations variées (rectangle, disque, triangle, bande) | ✅ | 1 (Sprint C) |
| Égalités à trous : 1/2+1/4=? · 1−1/4=? … | ✅ | 5 (Sprint B) |
| Fraction ↔ décimale : 1/4=0,25 · 3/4=0,75 · 3/2=1,5 … | ✅ | 5 (Sprint B) |
| Calculer 2/3 de 12, 3/4 de 10 | ✅ | 2 |

### 6ème — Capacités

| Attendu | Couvert | Monde |
|---|---|---|
| Sens quotient (a÷b = a/b) | ✅ | 4 |
| Établir des égalités de fractions | ✅ | 7 |
| Comparer et encadrer des fractions | ✅ | 7 |
| Additionner / soustraire des fractions | ✅ | 6 |
| Pourcentages — sens, calcul, proportion | ✅ | 8 (Sprint D) |
| Multiplier fraction × entier abstrait | ⚠️ | 2 (sur quantité, pas nombre abstrait) |
| Ordonner une liste de fractions | ⚠️ | 7 (6 défis, pas d'ordre explicite) |

---

## Patterns établis — ne pas modifier

### Styles boutons

```js
const btn = (bg, fg = "#2d1a08", px = "2rem") => ({
    padding: `0.75rem ${px}`, borderRadius: "1rem", fontSize: "1.125rem",
    fontWeight: 700, backgroundColor: bg, color: fg, border: "none",
    cursor: "pointer", fontFamily: "'Baloo 2', sans-serif",
});
```

### Dispatcher représentation post-réponse

| Monde | Pendant le défi | Post-réponse |
|---|---|---|
| Farm (1) | FractionBar + NumberLine séparés | DualRepresentation + Disc/Triangle (paliers 2-3) |
| Workshop (2) | MeasureRuler ou équation + NumberLine | DualRepresentation (paliers non-unitaires) |
| Granary (6) | FractionEquation | NumberLine seule |
| Bridge (7) | CompareQuestion phase=question | CompareQuestion phase=revealed (mini-droite SVG) |
| Road (3) | FractionDisplay + NumberLine | NumberLine avec targetValue |
| Market (4) | Équation ÷ + NumberLine | NumberLine avec targetValue |
| Equinox (8) | Boutons/Saisie selon sense | PercentDisplay ou équation pct×total |
| Festival (5) | Selon sense | DualRepresentation / DecimalInput / boutons |

### Hooks — cibles calculées

| Hook | Cible |
|---|---|
| `useFractionChallenge` | `target = num / den` |
| `useOperatorChallenge` | `target = (num / den) × total` |
| `useAdditionChallenge` | `target = (num1 ± num2) / den` |
| `useCompareChallenge` | Valide `"A"` / `"B"` / `"equal"`, retourne `errorBias` |
| `usePercentChallenge` | Valide `Math.abs(answer − result) < 0.5` |

### Unlock inter-monde (App.jsx)

```
Farm(1) → Workshop(2) → Granary(6) → Bridge(7) → Road(3) → Market(4) → Equinox(8) → Festival(5)
```

### Architecture WorldMap — règle critique

Les `WorldNode` sont des `<button>` HTML dans un `<div position:relative>`.
**Jamais à l'intérieur d'un `<svg>`** — `position: absolute` n'y fonctionne pas.

### Conventions data/challenges/

- `context` : langage naturel, **aucune notation fractionnaire** — FractionDisplay affiche
- `hint` : écriture littérale ("trois demis"), **jamais de barre oblique**
- `level` : `"CE2-révision"` · `"CM1"` · `"CM2"` · `"6e"`
- `sense` (world5) : `'partage'|'mesure'|'magnitude'|'quotient'|'decimal-auto'|'equality-gap'`
- `errorBias` (world2ter) : `'larger-denom-bigger'|'same-denom-strategy'|'benchmark-half'|null`
- `correct` (world2ter) : `"A"|"B"|"equal"`

### TeacherDashboard — WORLDS_META (ordre d'affichage)

| worldId | Monde | Couleur |
|---|---|---|
| 1 | 🌾 La Ferme de Mila | #f59e0b |
| 2 | 🔨 L'Atelier de Koro | #f97316 |
| 6 | 🫙 Le Grenier de Koro | #eab308 |
| 7 | 🌉 Le Pont de Léna | #818cf8 |
| 3 | ⭐ La Route des Étoiles | #6366f1 |
| 4 | 🏪 Le Marché de Sao | #34d399 |
| 8 | 🎭 La Fête de l'Équinoxe | #0ea5e9 |
| 5 | 🎪 Le Grand Festival | #ec4899 |

Total étoiles max : `WORLDS_META.length × 3 = 24`. **Ne pas hardcoder.**

### Accessibilité — règles WCAG 2.1 AA

- `NumberLine` : `role="slider"` · `tabIndex={0}` · `onKeyDown` ← → · `aria-valuetext`
- `FractionDisplay` : `role="img"` · `aria-label="3 sur 4"` (jamais "3/4")
- `FeedbackToast` : `role="alert"` · `aria-live="assertive"` · `aria-atomic="true"`
- `WorldNode` : `minWidth/minHeight: 44px` (WCAG 2.5.5)
- `NumberLine` SVG : `style={{ touchAction: "none" }}` pour pointer events touch
- Focus visible global : géré par `a11y-overrides.css` (`:focus-visible`)

### useGameProgression — API complète

```js
const { gameState, recordResult, recordError, unlockWorld, getWorldProgress, resetGame } = useGameProgression();

// Enregistrer un résultat de défi
recordResult(worldId, challengeIndex, success, attempts);

// Enregistrer un biais cognitif déclenché (Sprint H)
recordError(worldId, errorBias); // idempotent — doublons ignorés

// Déverrouiller un monde
unlockWorld(worldId); // idempotent
```

---

## Leçons d'architecture retenues

| Sprint | Leçon |
|---|---|
| A | `WorldNode` HTML → overlay div, **jamais dans `<svg>`** |
| B | `key={index}` sur `DecimalInput` pour reset à chaque défi |
| B | `showError` sans `diagnostic` = comportement inchangé (non-régressif) |
| C | FractionTriangle : diviser la **BASE** en parts égales (aires correctes) |
| D | `PercentDisplay` uniquement pour vraies valeurs %, jamais pour quantités |
| D | Post-réponse `calcul` : équation `pct% × total = result unit` |
| E | `initPhase` et constantes similaires → module level (hors hooks), évite ESLint exhaustive-deps |
| F | `DualRepresentation` post-réponse seulement (principe Tricot) |
| G | `dragging.current` (useRef) ne doit pas être lu pendant le rendu → `useState` |
| G | `>` et `<` dans texte JSX → `&gt;` et `&lt;` |
| H | `isDragging` en `useState` (pas `useRef`) car il influence le JSX rendu |

---

## Références didactiques

| Référence | Usage |
|---|---|
| Brousseau & Brousseau (1987) | Fraction-mesure / magnitude |
| Projet REPSAF / Pôle Pégase (2022) | Monde 3 |
| Amadieu & Tricot (2014) — *Apprendre avec le numérique* | Principe surcharge cognitive |
| CSEN / Dehaene et al. (2022) | NumberLine comme outil diagnostique |
| Ni & Zhou (2005) | Biais du nombre entier |
| Siegler et al. (2011) | Magnitude = prédicteur arithmétique |
| Rau (2017) | Multi-représentations coordonnées (Sprint F) |
| Hattie & Timperley (2007) | Feedback diagnostique (Sprint E) |
| Stafylidou & Vosniadou (2004) | Catalogue d'erreurs typiques |
| Vamvakoussi & Vosniadou (2010) | Fractions ↔ décimaux |
| WCAG 2.1 (W3C, 2018) | Sprint G |

---

## Workflow agile — cycle d'un sprint

```bash
git checkout main && git pull origin main
git checkout -b feat/sprint-X-nom

# Un commit par fichier
git add src/...
git commit -m "feat(...): ..."

git push origin feat/sprint-X-nom
# PR → merge → retour sur main

git add ROADMAP.md
git commit -m "docs(ROADMAP): Sprint X terminé ✅"
git push

# Synchroniser la base de connaissances Claude :
# Projet → Base de connaissances → supprimer ancien ROADMAP.md → uploader le nouveau
```

> **Reset localStorage** obligatoire quand les worldIds ou la structure INIT changent :
> `localStorage.removeItem("fractoia_progress")`
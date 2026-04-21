/**
 * Défis du Monde 7 — "Le Pont de Léna"
 * Sens travaillé : comparaison de fractions
 *
 * Attendus programme (BO n°16, 2026) :
 * - CM1 : "Comparer des fractions"
 * - CM2 : "Comparer des fractions" (dénominateurs ≤ 60)
 * - 6ème : "Établir des égalités de fractions · Comparer et encadrer des fractions ·
 *           Ordonner une liste de fractions"
 *
 * Fondement didactique :
 * Le "biais du nombre entier" (Ni & Zhou, 2005) est la principale source d'erreur
 * documentée sur la comparaison de fractions : un élève croit que 1/5 > 1/3 parce
 * que 5 > 3. La progression didactique de ce monde attaque ce biais de front au palier 2.
 *
 * Conventions d'écriture :
 * - `context` : aucune notation fractionnaire — `FractionDisplay` affiche fracA et fracB.
 * - `hint`    : écriture littérale uniquement ("deux tiers", "trois huitièmes"…)
 *
 * Progression didactique :
 * - Palier 1 (défis 1-2) : même dénominateur (CM1)
 *   Stratégie : comparer les numérateurs
 * - Palier 2 (défis 3-4) : même numérateur (CM1/CM2) ← rupture biais du nombre entier
 *   Stratégie : "plus le dénominateur est grand, plus les parts sont petites"
 * - Palier 3 (défis 5-6) : cas général via repère 1/2 + égalité (CM2/6e)
 *   Stratégie : repère intermédiaire (benchmark) et égalité de fractions
 *
 * Champ `correct` : "A" | "B" | "equal"
 *   "equal" → CompareQuestion affiche un troisième bouton "Égales"
 *
 * Champ `errorBias` : code utilisé par Sprint E (feedback diagnostique)
 *   "larger-denom-bigger" : croire que plus grand dénominateur = plus grande fraction
 *   "benchmark-half"      : mauvais positionnement par rapport à 1/2
 *   null                  : pas de biais cognitif dominant identifié pour ce défi
 *
 * @typedef {Object} Fraction
 * @property {number} num
 * @property {number} den
 *
 * @typedef {Object} BridgeChallenge
 * @property {Fraction} fracA      - Fraction de gauche
 * @property {Fraction} fracB      - Fraction de droite
 * @property {'A'|'B'|'equal'} correct  - Réponse attendue
 * @property {string}   strategy   - Stratégie didactique cible
 * @property {string}   level      - Niveau programme (BO n°16, 2026)
 * @property {string}   emoji
 * @property {string}   context    - Mise en situation narrative (sans notation fractionnaire)
 * @property {string}   hint       - Indice en écriture littérale (≥ 2 erreurs)
 * @property {string|null} errorBias - Code de biais cognitif (pour Sprint E)
 */

/** @type {BridgeChallenge[]} */
export const WORLD2TER_CHALLENGES = [
    // ── Palier 1 : même dénominateur — CM1 ──────────────────────────────────────
    // Stratégie : les parts sont de même taille, il suffit de compter les numérateurs.
    // Aucun piège cognitif : sert d'entrée en douceur.
    {
        fracA: { num: 3, den: 5 },
        fracB: { num: 2, den: 5 },
        correct: "A",
        strategy: "same-denominator",
        level: "CM1",
        emoji: "🌉",
        context:
            "Deux chemins traversent la rivière par le même pont. " +
            "Léna mesure leur longueur en parts égales de la rive. " +
            "Le chemin de gauche en fait trois sur cinq, celui de droite deux sur cinq. " +
            "Elle veut emprunter le plus long.",
        hint:
            "Les deux chemins utilisent des parts de même taille — " +
            "cinq parts chacun. Compte simplement : trois parts, c'est plus que deux parts.",
        errorBias: null,
    },
    {
        fracA: { num: 4, den: 7 },
        fracB: { num: 6, den: 7 },
        correct: "B",
        strategy: "same-denominator",
        level: "CM1",
        emoji: "🏞️",
        context:
            "Deux passerelles enjambent le même canyon. " +
            "La première couvre quatre septièmes de la largeur, la seconde six septièmes. " +
            "Léna veut prendre la plus longue pour admirer le panorama.",
        hint:
            "Les deux passerelles mesurent en septièmes — parts de même taille. " +
            "Six septièmes, c'est plus que quatre septièmes.",
        errorBias: null,
    },

    // ── Palier 2 : même numérateur — CM1/CM2 ────────────────────────────────────
    // Rupture : le biais du nombre entier pousse à croire que le plus grand dénominateur
    // donne la plus grande fraction. Ce palier contredit directement cette conception.
    {
        fracA: { num: 2, den: 3 },
        fracB: { num: 2, den: 5 },
        correct: "A",
        strategy: "same-numerator",
        level: "CM1",
        emoji: "🌲",
        context:
            "Deux sentiers de forêt mènent au même sommet. " +
            "Chacun parcourt deux parts du trajet, " +
            "mais le premier est découpé en trois parts et le second en cinq. " +
            "Lequel est le plus long ?",
        hint:
            "Les deux sentiers couvrent deux parts — mais pas les mêmes parts. " +
            "Un tiers du chemin est plus grand qu'un cinquième. " +
            "Diviser en trois donne de plus grandes parts que diviser en cinq.",
        errorBias: "larger-denom-bigger",
    },
    {
        fracA: { num: 3, den: 8 },
        fracB: { num: 3, den: 4 },
        correct: "B",
        strategy: "same-numerator",
        level: "CM2",
        emoji: "💧",
        context:
            "Deux ruisseaux alimentent les réservoirs du pont. " +
            "Le premier en remplit trois huitièmes, le second trois quarts. " +
            "Chaque ruisseau apporte trois parts — mais lesquelles sont les plus grandes ?",
        hint:
            "Les deux ruisseaux apportent trois parts chacun, " +
            "mais un quart est bien plus grand qu'un huitième. " +
            "Trois quarts, c'est donc beaucoup plus que trois huitièmes.",
        errorBias: "larger-denom-bigger",
    },

    // ── Palier 3 : cas général — CM2/6e ─────────────────────────────────────────
    // Défi 5 : repère 1/2 (benchmark) — aucun numérateur ni dénominateur commun.
    // Défi 6 : égalité de fractions (attendu 6e explicite dans le BO).
    {
        fracA: { num: 3, den: 8 },
        fracB: { num: 5, den: 7 },
        correct: "B",
        strategy: "benchmark-half",
        level: "CM2",
        emoji: "⚖️",
        context:
            "Léna compare deux sentiers qui longent le lac. " +
            "Le premier en fait trois huitièmes, le second cinq septièmes. " +
            "Elle repère d'abord si chaque sentier dépasse la moitié du lac.",
        hint:
            "Trois huitièmes est en dessous de la moitié du lac — " +
            "la moitié exacte serait quatre huitièmes. " +
            "Cinq septièmes est au-dessus de la moitié — " +
            "la moitié exacte serait trois virgule cinq septièmes. " +
            "Le second sentier est donc plus long.",
        errorBias: "benchmark-half",
    },
    {
        fracA: { num: 4, den: 6 },
        fracB: { num: 2, den: 3 },
        correct: "equal",
        strategy: "equality",
        level: "6e",
        emoji: "🔍",
        context:
            "Léna mesure les deux rambardes du pont. " +
            "La première couvre quatre sixièmes de sa longueur, la seconde deux tiers. " +
            "Sur la grande carte du pont, les deux mesures désignent-elles le même point ?",
        hint:
            "Quatre sixièmes et deux tiers occupent exactement le même endroit sur la demi-droite. " +
            "Si on simplifie quatre sixièmes en divisant le numérateur et le dénominateur par deux, " +
            "on obtient deux tiers. Les deux rambardes ont la même longueur.",
        errorBias: null,
    },
];

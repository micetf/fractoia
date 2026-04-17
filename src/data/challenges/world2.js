/**
 * Défis du Monde 2 — "L'Atelier de Koro"
 * Sens travaillé : fraction-opérateur (prendre les a/b d'une grandeur)
 *
 * ⚠️ Spécificité de ce monde par rapport aux autres :
 * La cible sur la droite numérique N'EST PAS num/den mais (num/den) × total.
 * Le composant WorldWorkshop doit calculer : target = (challenge.num / challenge.den) * challenge.total
 * et utiliser cette valeur comme `targetValue` sur la NumberLine.
 *
 * Conventions d'écriture :
 * - `context` : langage naturel, aucune notation fractionnaire écrite.
 *   La fraction est affichée par FractionDisplay, le total par un élément dédié.
 * - `hint`    : écriture littérale uniquement ("un demi", "trois quarts"…)
 *
 * Progression didactique :
 * - Palier 1 (défis 1-2) : total = 1 — la droite reste entre 0 et 1, cas emblématiques
 * - Palier 2 (défis 3-4) : total = 2 — le résultat peut dépasser 1, pont avec les entiers
 * - Palier 3 (défis 5-6) : total ≥ 2 — résultats > 1, pont didactique avec le Monde 3
 *
 * Niveaux programme (BO n°16, avril 2025) :
 * - Fractions unitaires (num = 1) → "CM1" : "un tiers de 12 billes, un quart de 100 mètres"
 * - Fractions non-unitaires (num > 1) → "CM2" : "deux tiers de 12€, trois quarts de 100 mètres"
 *
 * Lien didactique clé : "prendre les 3/4 de 2 mètres = 1,5 mètre"
 * rompt la conception "la fraction, c'est toujours moins que 1".
 *
 * @typedef {Object} WorkshopChallenge
 * @property {number} num      - Numérateur de la fraction-opérateur
 * @property {number} den      - Dénominateur
 * @property {number} total    - Grandeur de référence (ex. 2 pour "2 mètres")
 * @property {string} unit     - Unité narrative (ex. "m", "kg")
 * @property {number} max      - Étendue de la droite numérique (doit couvrir num/den × total)
 * @property {string} level    - Niveau programme cible (BO n°16, 2025)
 * @property {string} emoji
 * @property {string} context  - Mise en situation (sans notation fractionnaire)
 * @property {string} hint     - Indice en écriture littérale (≥ 2 erreurs)
 */

/** @type {WorkshopChallenge[]} */
export const WORLD2_CHALLENGES = [
    // ── Palier 1 : total = 1 m — terrain familier, même droite que le Monde 1 ──
    {
        num: 1,
        den: 2,
        total: 1,
        unit: "m",
        max: 1,
        level: "CM1", // fraction unitaire (num = 1)
        emoji: "🪵",
        context:
            "Koro doit couper cette planche en deux parties égales. Pour la première pièce, il n'utilise que la moitié.",
        hint: "Un demi de la planche se trouve exactement au milieu — à mi-chemin entre 0 et 1.",
    },
    {
        num: 3,
        den: 4,
        total: 1,
        unit: "m",
        max: 1,
        level: "CM2", // fraction non-unitaire (num > 1)
        emoji: "🔩",
        context:
            "La barre de métal fait 1 mètre. Koro en réserve les trois quarts pour fabriquer la roue du moulin.",
        hint: "Trois quarts de la barre, c'est entre la moitié et le bout — juste avant la fin.",
    },

    // ── Palier 2 : total = 2 m — le résultat peut atteindre ou dépasser 1 ──
    {
        num: 1,
        den: 2,
        total: 2,
        unit: "m",
        max: 2,
        level: "CM1", // fraction unitaire (num = 1)
        emoji: "🪚",
        context:
            "La grande poutre fait 2 mètres. Koro en utilise exactement la moitié pour l'encadrement de la porte.",
        hint: "La moitié de deux mètres, c'est exactement un mètre entier — pile sur la graduation 1.",
    },
    {
        num: 3,
        den: 4,
        total: 2,
        unit: "m",
        max: 2,
        level: "CM2", // fraction non-unitaire (num > 1)
        emoji: "📏",
        context:
            "La traverse fait 2 mètres. Koro a besoin des trois quarts pour assembler le grand cadre de la fenêtre.",
        hint: "Trois quarts de deux mètres, c'est un mètre entier et encore la moitié d'un mètre — cherche entre 1 et 2.",
    },

    // ── Palier 3 : résultats > 1 — pont avec la fraction-magnitude du Monde 3 ──
    {
        num: 5,
        den: 8,
        total: 2,
        unit: "m",
        max: 2,
        level: "CM2", // fraction non-unitaire (num > 1)
        emoji: "⚙️",
        context:
            "Koro taille une pièce spéciale : il prend les cinq huitièmes d'une barre de 2 mètres.",
        hint: "Cinq huitièmes de deux mètres, c'est un peu plus d'un mètre — entre 1 et un mètre et demi.",
    },
    {
        num: 5,
        den: 6,
        total: 3,
        unit: "m",
        max: 3,
        level: "CM2", // fraction non-unitaire (num > 1)
        emoji: "🏗️",
        context:
            "Pour le grand axe du moulin, Koro mesure les cinq sixièmes d'une longue barre de 3 mètres.",
        hint: "Cinq sixièmes de trois mètres, c'est deux mètres et encore une moitié — cherche entre 2 et 3.",
    },
];

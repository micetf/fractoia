/**
 * Défis du Monde 1 — "La Ferme de Mila"
 * Sens travaillé : fraction-partage (toutes fractions ≤ 1, dénominateurs ≤ 8)
 *
 * Conventions d'écriture dans les textes :
 * - `context` : langage naturel ("2 parts sur 3"), sans notation fractionnaire.
 * - `hint`    : écriture littérale ("un quart", "trois quarts"…)
 *   pour ne pas ancrer la notation barre oblique dans la mémoire de l'élève.
 *
 * Progression didactique :
 * - Palier 1 (défis 1-2) : fractions emblématiques — un demi, un quart
 * - Palier 2 (défis 3-4) : fractions proches de 1 — trois quarts, deux tiers
 * - Palier 3 (défis 5-6) : dénominateurs plus grands — trois huitièmes, cinq sixièmes
 *
 * @typedef {Object} FarmChallenge
 * @property {number} num
 * @property {number} den
 * @property {number} max     - Étendue de la droite numérique
 * @property {string} emoji
 * @property {string} context - Mise en situation narrative (sans notation fractionnaire)
 * @property {string} hint    - Indice en écriture littérale (≥ 2 erreurs)
 */

/** @type {FarmChallenge[]} */
export const WORLD1_CHALLENGES = [
    {
        num: 1,
        den: 2,
        max: 2,
        emoji: "🍞",
        context: "Mila coupe sa baguette en 2 parts égales et en emporte 1.",
        hint: "Un demi se trouve exactement au milieu entre 0 et 1.",
    },
    {
        num: 1,
        den: 4,
        max: 2,
        emoji: "🥕",
        context:
            "Le potager est divisé en 4 rangées égales. Les carottes occupent 1 rangée.",
        hint: "Un quart est entre 0 et un demi, plutôt proche de 0.",
    },
    {
        num: 3,
        den: 4,
        max: 2,
        emoji: "🍎",
        context: "Mila remplit 3 cases sur 4 de son panier de pommes.",
        hint: "Trois quarts est entre un demi et 1, juste avant 1.",
    },
    {
        num: 2,
        den: 3,
        max: 2,
        emoji: "🥧",
        context: "Il reste 2 parts de tarte aux prunes sur 3.",
        hint: "Deux tiers est entre un demi et 1.",
    },
    {
        num: 3,
        den: 8,
        max: 2,
        emoji: "🌱",
        context: "Mila a semé 3 sillons sur 8 dans son champ.",
        hint: "Trois huitièmes est un peu moins qu'un demi.",
    },
    {
        num: 5,
        den: 6,
        max: 2,
        emoji: "🐄",
        context: "5 étables sur 6 sont occupées par les vaches de Mila.",
        hint: "Cinq sixièmes est très proche de 1, juste avant.",
    },
];

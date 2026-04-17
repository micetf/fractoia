/**
 * Défis du Monde 1 — "La Ferme de Mila"
 * Sens travaillé : fraction-partage (toutes fractions ≤ 1, dénominateurs ≤ 8)
 *
 * Progression didactique :
 * - Palier 1 (défis 1-2) : fractions emblématiques 1/2, 1/4
 * - Palier 2 (défis 3-4) : fractions proches de 1 : 3/4, 2/3
 * - Palier 3 (défis 5-6) : dénominateurs plus grands : 3/8, 5/6
 *
 * @typedef {Object} FarmChallenge
 * @property {number} num
 * @property {number} den
 * @property {number} max     - Étendue de la droite numérique
 * @property {string} emoji
 * @property {string} context - Mise en situation narrative
 * @property {string} hint    - Indice si ≥ 2 erreurs
 */

/** @type {FarmChallenge[]} */
export const WORLD1_CHALLENGES = [
    {
        num: 1,
        den: 2,
        max: 2,
        emoji: "🍞",
        context: "Mila coupe sa baguette en 2 parts égales et en emporte 1.",
        hint: "La moitié se trouve exactement au milieu entre 0 et 1.",
    },
    {
        num: 1,
        den: 4,
        max: 2,
        emoji: "🥕",
        context:
            "Le potager est divisé en 4 rangées égales. Les carottes occupent 1 rangée.",
        hint: "1/4 est entre 0 et 1/2, plutôt proche de 0.",
    },
    {
        num: 3,
        den: 4,
        max: 2,
        emoji: "🍎",
        context: "Mila remplit 3 cases sur 4 de son panier de pommes.",
        hint: "3/4 est entre 1/2 et 1, juste avant 1.",
    },
    {
        num: 2,
        den: 3,
        max: 2,
        emoji: "🥧",
        context: "Il reste 2 parts de tarte aux prunes sur 3.",
        hint: "2/3 est entre 1/2 et 1.",
    },
    {
        num: 3,
        den: 8,
        max: 2,
        emoji: "🌱",
        context: "Mila a semé 3 sillons sur 8 dans son champ.",
        hint: "3/8 est un peu moins que 1/2.",
    },
    {
        num: 5,
        den: 6,
        max: 2,
        emoji: "🐄",
        context: "5 étables sur 6 sont occupées par les vaches de Mila.",
        hint: "5/6 est très proche de 1, juste avant.",
    },
];

/**
 * Défis du Monde 3 — "La Route des Étoiles"
 * Sens travaillé : fraction comme magnitude (mesure sur droite numérique)
 * Toutes les fractions sont > 1 — c'est le pivot didactique de FRACTOÏA.
 *
 * Progression didactique :
 * - Palier 1 (défis 1-2) : juste après 1 — 3/2, 5/4
 *   → l'élève dépasse l'entier pour la première fois
 * - Palier 2 (défis 3-4) : entre 1 et 2 — 7/4, 5/3
 *   → la décomposition entier + fraction devient indispensable
 * - Palier 3 (défis 5-6) : proches de 2 ou au-delà — 9/4, 7/3
 *   → consolidation ; 7/3 > 2 brise définitivement la conception bipartite
 *
 * Principe anti-obstacle (Brousseau / REPSAF) :
 * Le contexte kilométrique donne un sens concret au dépassement de l'unité.
 * La droite s'étend jusqu'à `max` sans rupture visuelle.
 *
 * @typedef {Object} RoadChallenge
 * @property {number} num        - Numérateur
 * @property {number} den        - Dénominateur
 * @property {number} max        - Étendue de la droite numérique
 * @property {string} emoji
 * @property {string} context    - Mise en situation narrative
 * @property {string} hint       - Indice affiché à partir de la 2e erreur
 */

/** @type {RoadChallenge[]} */
export const WORLD3_CHALLENGES = [
    {
        num: 3,
        den: 2,
        max: 3,
        emoji: "🚩",
        context:
            "La 1ʳᵉ borne est à 1 journée de marche. Le camp est à 3/2 journées — tu dois dépasser la borne !",
        hint: "3/2, c'est 1 journée entière et encore 1/2 journée. Cherche à mi-chemin entre 1 et 2.",
    },
    {
        num: 5,
        den: 4,
        max: 3,
        emoji: "⛺",
        context:
            "Le refuge est à 5/4 de lieue. Tu passes la 1ʳᵉ borne et tu avances encore un peu.",
        hint: "5/4 = 1 et 1/4. Place-toi juste après 1, à un quart de la route vers 2.",
    },
    {
        num: 7,
        den: 4,
        max: 3,
        emoji: "🌟",
        context:
            "L'étoile guide est à 7/4 de distance. Elle est entre la 1ʳᵉ et la 2ᵉ borne.",
        hint: "7/4 = 1 et 3/4. Tu es plus près de 2 que de 1 — cherche à 3 quarts après la 1ʳᵉ borne.",
    },
    {
        num: 5,
        den: 3,
        max: 3,
        emoji: "🏕️",
        context:
            "Le bivouac est à 5/3 de journée. Les bornes sont tous les tiers : 1/3, 2/3, 1, 4/3…",
        hint: "5/3 = 1 et 2/3. Divise l'espace entre 1 et 2 en 3 parties égales, et prends les 2 premières.",
    },
    {
        num: 9,
        den: 4,
        max: 4,
        emoji: "🔭",
        context:
            "L'observatoire est à 9/4 de lieue. La route dépasse la 2ᵉ borne !",
        hint: "9/4 = 2 et 1/4. Passe la 2ᵉ borne et avance encore d'un quart.",
    },
    {
        num: 7,
        den: 3,
        max: 4,
        emoji: "🎪",
        context:
            "Le Grand Festival est à 7/3 de journée — au-delà de la 2ᵉ borne. L'aventure continue !",
        hint: "7/3 = 2 et 1/3. Passe la 2ᵉ borne et avance d'un tiers de plus.",
    },
];

/**
 * Défis du Monde 3 — "La Route des Étoiles"
 * Sens travaillé : fraction comme magnitude (mesure sur droite numérique)
 * Toutes les fractions sont > 1 — c'est le pivot didactique de FRACTOÏA.
 *
 * Conventions d'écriture dans les textes :
 * - `context` : aucune fraction écrite — la fraction est affichée par FractionDisplay.
 * - `hint`    : écriture littérale des fractions ("trois demis", "un quart"…)
 *
 * Progression didactique :
 * - Palier 1 (défis 1-2) : juste après 1 — 3/2, 5/4
 * - Palier 2 (défis 3-4) : entre 1 et 2 — 7/4, 5/3
 * - Palier 3 (défis 5-6) : proches de 2 ou au-delà — 9/4, 7/3
 *
 * Sprint 2 — champ `bracket` :
 * Encadrement par deux entiers consécutifs (attendu CM1, BO n°16, 2025).
 * Utilisé par BracketQuestion pour la phase d'encadrement avant placement.
 *
 * Niveau programme (BO n°16, avril 2025) :
 * - Tous les défis → "CM1" : encadrement + placement sur demi-droite graduée.
 *
 * @typedef {Object} RoadChallenge
 * @property {number}   num
 * @property {number}   den
 * @property {number}   max      - Étendue de la droite numérique
 * @property {number[]} bracket  - [entier inférieur, entier supérieur]
 * @property {string}   level    - Niveau programme cible (BO n°16, 2025)
 * @property {string}   emoji
 * @property {string}   context  - Mise en situation narrative (sans notation fractionnaire)
 * @property {string}   hint     - Indice en écriture littérale (≥ 2 erreurs)
 */

/** @type {RoadChallenge[]} */
export const WORLD3_CHALLENGES = [
    // ── Palier 1 : juste après 1 — première rupture avec les fractions < 1 ──
    {
        num: 3,
        den: 2,
        max: 3,
        bracket: [1, 2],
        level: "CM1",
        emoji: "🚩",
        context:
            "La 1ʳᵉ borne est à 1 journée de marche. Le camp se trouve au-delà — tu dois dépasser la borne !",
        hint: "Trois demis, c'est 1 journée entière et encore une demie. Cherche à mi-chemin entre 1 et 2.",
    },
    {
        num: 5,
        den: 4,
        max: 3,
        bracket: [1, 2],
        level: "CM1",
        emoji: "⛺",
        context:
            "Le refuge se trouve juste après la 1ʳᵉ borne. Tu passes le jalon et tu avances encore un peu.",
        hint: "Cinq quarts, c'est 1 entier et encore un quart. Place-toi juste après 1, à un quart de la route vers 2.",
    },

    // ── Palier 2 : entre 1 et 2 — décomposition entier + fraction ──
    {
        num: 7,
        den: 4,
        max: 3,
        bracket: [1, 2],
        level: "CM1",
        emoji: "🌟",
        context:
            "L'étoile guide brille entre la 1ʳᵉ et la 2ᵉ borne. Elle est plus proche de 2 que de 1.",
        hint: "Sept quarts, c'est 1 entier et encore trois quarts. Depuis la 1ʳᵉ borne, avance des trois quarts du chemin vers 2.",
    },
    {
        num: 5,
        den: 3,
        max: 3,
        bracket: [1, 2],
        level: "CM1",
        emoji: "🏕️",
        context:
            "Le bivouac se cache entre la 1ʳᵉ et la 2ᵉ borne. La route est divisée en tiers.",
        hint: "Cinq tiers, c'est 1 entier et encore deux tiers. Divise l'espace entre 1 et 2 en 3 parties égales et prends les deux premières.",
    },

    // ── Palier 3 : au-delà de 2 — consolidation finale ──
    {
        num: 9,
        den: 4,
        max: 4,
        bracket: [2, 3],
        level: "CM1",
        emoji: "🔭",
        context:
            "L'observatoire se dresse bien au-delà de la 2ᵉ borne. La route continue encore !",
        hint: "Neuf quarts, c'est 2 entiers et encore un quart. Passe la 2ᵉ borne et avance d'un quart supplémentaire.",
    },
    {
        num: 7,
        den: 3,
        max: 4,
        bracket: [2, 3],
        level: "CM1",
        emoji: "🎪",
        context:
            "Le Grand Festival se trouve après la 2ᵉ borne. L'aventure dépasse tout ce que tu imaginais !",
        hint: "Sept tiers, c'est 2 entiers et encore un tiers. Passe la 2ᵉ borne et avance d'un tiers de plus.",
    },
];

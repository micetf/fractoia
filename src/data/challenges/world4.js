/**
 * Défis du Monde 4 — "Le Marché de Sao"
 * Sens travaillé : fraction-quotient (a ÷ b = a/b) + fractions équivalentes
 *
 * Pivot pédagogique : "3 pizzas partagées entre 4 personnes" → chaque personne reçoit 3/4.
 * La fraction n'est plus une "partie d'un tout" mais le résultat d'un partage équitable.
 *
 * ⚠️ Champs supplémentaires `objects` et `people` :
 * WorldMarket les utilise pour l'affichage narratif ("X objets ÷ Y personnes").
 * num et den restent la fraction résultante à placer sur la droite.
 *
 * Conventions d'écriture :
 * - `context` : aucune notation fractionnaire — les nombres `objects` et `people`
 *   sont mentionnés en toutes lettres ou en chiffres arabes.
 * - `hint`    : écriture littérale uniquement ("trois quarts", "cinq quarts"…)
 *
 * Progression didactique :
 * - Palier 1 (défis 1-2) : objects < people → résultat < 1, sens partage simple
 * - Palier 2 (défis 3-4) : objects > people → résultat > 1 !
 *   "3 citrons entre 2 marchands" rompt définitivement la conception bipartite
 * - Palier 3 (défis 5-6) : fractions équivalentes — deux partages différents,
 *   même point sur la droite (4÷6 = 2÷3 ; 6÷4 = 3÷2)
 *
 * Niveau programme (BO n°16, avril 2025) :
 * - Tous les défis → "6e" :
 *   "Comprendre et utiliser la notion de fraction : fraction comme quotient —
 *    le quotient a ÷ b peut s'écrire a/b."
 *
 * @typedef {Object} MarketChallenge
 * @property {number} num      - Numérateur de la fraction résultante à placer
 * @property {number} den      - Dénominateur
 * @property {number} objects  - Nombre d'objets partagés (dividende narratif)
 * @property {number} people   - Nombre de personnes (diviseur narratif)
 * @property {number} max      - Étendue de la droite numérique
 * @property {string} level    - Niveau programme cible (BO n°16, 2025)
 * @property {string} emoji
 * @property {string} context  - Mise en situation (sans notation fractionnaire)
 * @property {string} hint     - Indice en écriture littérale (≥ 2 erreurs)
 */

/** @type {MarketChallenge[]} */
export const WORLD4_CHALLENGES = [
    // ── Palier 1 : objects < people — résultat < 1 ──
    {
        num: 1,
        den: 2,
        objects: 1,
        people: 2,
        max: 2,
        level: "6e",
        emoji: "🥭",
        context:
            "Sao partage 1 mangue entre 2 clients. Chaque client doit recevoir exactement la même part.",
        hint: "Une mangue pour deux clients, c'est une demie mangue chacun — exactement au milieu entre 0 et 1.",
    },
    {
        num: 1,
        den: 4,
        objects: 1,
        people: 4,
        max: 2,
        level: "6e",
        emoji: "🫓",
        context:
            "Il reste 1 galette de riz pour 4 enfants. Sao la découpe en parts parfaitement égales.",
        hint: "Une galette pour quatre enfants, c'est un quart de galette chacun — proche de 0, entre 0 et un demi.",
    },

    // ── Palier 2 : objects > people — résultat > 1, rupture conceptuelle ──
    {
        num: 3,
        den: 2,
        objects: 3,
        people: 2,
        max: 3,
        level: "6e",
        emoji: "🍋",
        context:
            "3 citrons à partager équitablement entre 2 marchands. Chacun reçoit plus d'un citron entier !",
        hint: "Trois citrons pour deux marchands, c'est un citron entier et encore la moitié d'un autre — cherche entre 1 et 2.",
    },
    {
        num: 5,
        den: 4,
        objects: 5,
        people: 4,
        max: 3,
        level: "6e",
        emoji: "🍈",
        context:
            "Sao découpe 5 parts de melon pour 4 familles. Chaque famille reçoit plus d'une part complète.",
        hint: "Cinq parts pour quatre familles, c'est une part entière et encore un quart — juste après 1.",
    },

    // ── Palier 3 : fractions équivalentes — même point, partages différents ──
    {
        num: 4,
        den: 6,
        objects: 4,
        people: 6,
        max: 2,
        level: "6e",
        emoji: "🎂",
        context:
            "4 gâteaux à distribuer à 6 voisins. La part par personne est la même que si on partageait 2 gâteaux entre 3 !",
        hint: "Quatre sixièmes et deux tiers, c'est exactement la même quantité — entre un demi et 1.",
    },
    {
        num: 7,
        den: 4,
        objects: 7,
        people: 4,
        max: 3,
        level: "6e",
        emoji: "🍰",
        context:
            "7 tranches de tarte pour 4 acheteurs. L'abondance du marché — chacun repart avec bien plus d'une tranche !",
        hint: "Sept quarts, c'est une tranche entière et encore trois quarts — cherche entre 1 et 2, mais plus près de 2.",
    },
];

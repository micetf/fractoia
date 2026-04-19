/**
 * Défis du Monde 2bis — "Le Grenier de Koro"
 * Sens travaillé : addition et soustraction de fractions (même dénominateur)
 * Niveau programme : CM2 (BO n°16, 2025)
 *
 * Attendu : "additionner et soustraire des fractions ayant le même dénominateur"
 * Cible sur la demi-droite = (num1 ± num2) / den, calculée par useAdditionChallenge.
 *
 * Conventions d'écriture :
 * - `context` : aucune notation fractionnaire — FractionEquation affiche l'équation.
 * - `hint`    : écriture littérale uniquement.
 *
 * Progression :
 * - Palier 1 (1-2) : addition, résultat < 1
 * - Palier 2 (3-4) : addition, résultat > 1 — pont avec WorldRoad
 * - Palier 3 (5-6) : soustraction, résultat < 1
 *
 * @typedef {Object} GranaryChallenge
 * @property {number}    num1
 * @property {number}    num2
 * @property {number}    den
 * @property {'+'|'-'}  op
 * @property {number}    max   - Étendue de la demi-droite
 * @property {string}    level
 * @property {string}    sense - "addition" | "soustraction"
 * @property {string}    emoji
 * @property {string}    context
 * @property {string}    hint
 */

/** @type {GranaryChallenge[]} */
export const WORLD2BIS_CHALLENGES = [
    // ── Palier 1 : addition, résultat < 1 ──
    {
        num1: 1,
        num2: 2,
        den: 4,
        op: "+",
        max: 2,
        level: "CM2",
        sense: "addition",
        emoji: "🌾",
        context:
            "Koro remplit un quart du sac de farine, puis encore deux quarts. " +
            "Quelle fraction du sac a-t-il remplie en tout ?",
        hint:
            "Un quart plus deux quarts, c'est trois quarts — " +
            "additionne simplement les numérateurs.",
    },
    {
        num1: 1,
        num2: 4,
        den: 6,
        op: "+",
        max: 2,
        level: "CM2",
        sense: "addition",
        emoji: "🫘",
        context:
            "Koro verse un sixième de son stock de graines dans un pot, " +
            "puis encore quatre sixièmes. Quelle part du stock a-t-il versée ?",
        hint:
            "Un sixième plus quatre sixièmes, c'est cinq sixièmes — " +
            "les dénominateurs sont identiques, additionne les numérateurs.",
    },

    // ── Palier 2 : addition, résultat > 1 — pont avec WorldRoad ──
    {
        num1: 3,
        num2: 2,
        den: 4,
        op: "+",
        max: 3,
        level: "CM2",
        sense: "addition",
        emoji: "🪣",
        context:
            "Le premier seau contient trois quarts d'un panier de grains, " +
            "le second en contient deux quarts. " +
            "Combien de paniers Koro a-t-il en tout ?",
        hint:
            "Trois quarts plus deux quarts, c'est cinq quarts — " +
            "c'est plus d'un entier, cherche entre 1 et 2.",
    },
    {
        num1: 2,
        num2: 2,
        den: 3,
        op: "+",
        max: 3,
        level: "CM2",
        sense: "addition",
        emoji: "🧺",
        context:
            "Koro remplit deux corbeilles de deux tiers chacune. " +
            "Quelle quantité totale cela représente-t-il en paniers entiers ?",
        hint:
            "Deux tiers plus deux tiers, c'est quatre tiers — " +
            "un entier et encore un tiers, cherche juste après 1.",
    },

    // ── Palier 3 : soustraction, résultat < 1 ──
    {
        num1: 5,
        num2: 2,
        den: 6,
        op: "-",
        max: 2,
        level: "CM2",
        sense: "soustraction",
        emoji: "🫙",
        context:
            "Le grenier était rempli à cinq sixièmes. Koro en a utilisé deux sixièmes " +
            "pour préparer la farine. Quelle fraction reste-t-il ?",
        hint:
            "Cinq sixièmes moins deux sixièmes, c'est trois sixièmes — " +
            "soustrais les numérateurs, le dénominateur ne change pas.",
    },
    {
        num1: 7,
        num2: 3,
        den: 8,
        op: "-",
        max: 2,
        level: "CM2",
        sense: "soustraction",
        emoji: "🌽",
        context:
            "Le panier contenait sept huitièmes de maïs. Koro en a distribué " +
            "trois huitièmes aux animaux. Quelle fraction reste dans le panier ?",
        hint:
            "Sept huitièmes moins trois huitièmes, c'est quatre huitièmes — " +
            "la moitié exacte du panier.",
    },
];

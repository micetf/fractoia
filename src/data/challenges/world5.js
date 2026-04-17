/**
 * Défis du Monde 5 — "Le Grand Festival"
 * Sens travaillé : TOUS les sens de la fraction — partage, opérateur, quotient, magnitude
 * Les fractions > 1 sont pleinement intégrées dans la progression.
 *
 * Rôle didactique : ce monde est une synthèse.
 * L'élève doit mobiliser le bon sens selon le contexte narratif,
 * sans appui systématique sur une représentation unique.
 *
 * Conventions d'écriture :
 * - `context` : aucune notation fractionnaire — le contexte seul oriente le sens.
 * - `hint`    : écriture littérale uniquement ("sept quarts", "deux tiers"…)
 *
 * Progression didactique :
 * - Palier 1 (défis 1-2) : révision — sens partage et mesure, fractions ≤ 1
 *   Contextes festifs simples pour entrer en douceur
 * - Palier 2 (défis 3-4) : fractions > 1 dans des sens variés
 *   L'élève ne sait pas à l'avance si la fraction dépasse 1
 * - Palier 3 (défis 5-6) : fractions bien > 2 — consolidation finale
 *   Brise définitivement la conception "la fraction, c'est toujours petit"
 *
 * @typedef {Object} FestivalChallenge
 * @property {number} num
 * @property {number} den
 * @property {number} max      - Étendue de la droite numérique
 * @property {string} emoji
 * @property {string} context  - Mise en situation sans notation fractionnaire
 * @property {string} hint     - Indice en écriture littérale (≥ 2 erreurs)
 * @property {string} sense    - Sens mobilisé — documentation didactique, non affiché
 */

/** @type {FestivalChallenge[]} */
export const WORLD5_CHALLENGES = [
    // ── Palier 1 : révision des sens connus, fractions ≤ 1 ──
    {
        num: 2,
        den: 3,
        max: 2,
        emoji: "🎆",
        context:
            "Les artificiers ont tiré 2 feux sur 3 prévus. Où se trouve ce moment sur la ligne du temps du spectacle ?",
        hint: "Deux tiers est entre un demi et 1 — un peu plus proche de 1 que de la moitié.",
        sense: "partage",
    },
    {
        num: 5,
        den: 8,
        max: 2,
        emoji: "🎵",
        context:
            "Le concert dure 8 actes. Après 5 actes, à quel endroit de la soirée se trouve le public ?",
        hint: "Cinq huitièmes est un peu moins qu'un demi ajouté à un quart — entre la moitié et trois quarts.",
        sense: "mesure",
    },

    // ── Palier 2 : fractions > 1, sens variés ──
    {
        num: 7,
        den: 4,
        max: 3,
        emoji: "🎡",
        context:
            "La grande roue fait des tours. Après sept quarts de tour, les nacelles ont dépassé le sommet et descendent encore.",
        hint: "Sept quarts, c'est 1 tour entier et encore trois quarts — cherche entre 1 et 2, plus près de 2.",
        sense: "magnitude",
    },
    {
        num: 5,
        den: 3,
        max: 3,
        emoji: "🎪",
        context:
            "L'acrobate traverse la scène 5 fois en 3 secondes. Combien de longueurs de scène parcoure-t-il chaque seconde ?",
        hint: "Cinq tiers, c'est 1 longueur entière et encore deux tiers — cherche entre 1 et 2.",
        sense: "quotient",
    },

    // ── Palier 3 : fractions bien supérieures à 2 — consolidation finale ──
    {
        num: 9,
        den: 4,
        max: 4,
        emoji: "🔭",
        context:
            "L'astronome du festival pointe sa lunette : l'étoile filante a parcouru neuf quarts de la largeur du ciel visible.",
        hint: "Neuf quarts, c'est 2 entiers et encore un quart — passe la graduation 2 et avance d'un petit pas.",
        sense: "magnitude",
    },
    {
        num: 8,
        den: 3,
        max: 4,
        emoji: "🎠",
        context:
            "Le manège tourne : en 3 minutes il fait exactement 1 tour. Après 8 minutes, combien de tours complets et de fraction de tour a-t-il parcourus ?",
        hint: "Huit tiers, c'est 2 tours entiers et encore deux tiers — cherche entre 2 et 3, à deux tiers du chemin.",
        sense: "quotient",
    },
];

/**
 * Défis du Monde 5 — "Le Grand Festival"
 *
 * Sens travaillés :
 * - Paliers 1-3 (existants) : partage · mesure · magnitude · quotient
 * - Palier 4 (Sprint B) : decimal-auto — fraction → écriture décimale
 * - Palier 5 (Sprint B) : equality-gap — compléter une égalité à trous
 *
 * Sprint B — automatismes 6ème (BO n°16, 2026) :
 * Cas decimal-auto couverts (3/6 du BO) : 1/4=0,25 · 1/2=0,5 · 3/2=1,5
 * Cas equality-gap couverts (3/8 du BO) : 1/4+1/4=1/2 · 1−1/4=3/4 · 3/4+1/4=1
 *
 * Pour les défis decimal-auto et equality-gap :
 * - `num` / `den` représentent le RÉSULTAT attendu (target = num/den)
 * - `useFractionChallenge` reste utilisé sans modification — check(value) compare
 *   la valeur décimale saisie par l'élève via DecimalInput
 * - WorldFestival branche sur DecimalInput au lieu de NumberLine pour ces sens
 *
 * Conventions (tous défis) :
 * - `context` : aucune notation fractionnaire — FractionDisplay affiche séparément
 * - `hint`    : écriture littérale, jamais de barre oblique
 *
 * @typedef {Object} FestivalChallenge
 * @property {number} num
 * @property {number} den
 * @property {number} max
 * @property {string} level
 * @property {string} emoji
 * @property {string} context
 * @property {string} hint
 * @property {string} sense
 */

/** @type {FestivalChallenge[]} */
export const WORLD5_CHALLENGES = [
    // ── Palier 1 : révision des sens connus, fractions ≤ 1 ──────────────────
    {
        num: 2,
        den: 3,
        max: 2,
        level: "6e",
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
        level: "6e",
        emoji: "🎵",
        context:
            "Le concert dure 8 actes. Après 5 actes, à quel endroit de la soirée se trouve le public ?",
        hint: "Cinq huitièmes est un peu moins qu'un demi ajouté à un quart — entre la moitié et trois quarts.",
        sense: "mesure",
    },

    // ── Palier 2 : fractions > 1, sens variés ───────────────────────────────
    {
        num: 7,
        den: 4,
        max: 3,
        level: "6e",
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
        level: "6e",
        emoji: "🎪",
        context:
            "5 chapiteaux à partager entre 3 troupes. Chaque troupe reçoit plus d'un chapiteau entier !",
        hint: "Cinq tiers, c'est 1 entier et encore deux tiers — cherche juste après 1, entre 1 et 2.",
        sense: "quotient",
    },

    // ── Palier 3 : fractions bien supérieures à 2 ───────────────────────────
    {
        num: 9,
        den: 4,
        max: 4,
        level: "6e",
        emoji: "🎠",
        context:
            "Le carrousel fait des tours. Après neuf quarts de tour, il a dépassé les deux premiers tours complets.",
        hint: "Neuf quarts, c'est 2 tours entiers et encore un quart — cherche juste après 2.",
        sense: "magnitude",
    },
    {
        num: 7,
        den: 3,
        max: 4,
        level: "6e",
        emoji: "🎻",
        context:
            "7 violons à distribuer entre 3 musiciens. Chacun reçoit bien plus que deux instruments.",
        hint: "Sept tiers, c'est 2 entiers et encore un tiers — cherche juste après 2.",
        sense: "quotient",
    },

    // ── Palier 4 : automatisme fraction→décimale (Sprint B, BO n°16) ────────
    // FractionDisplay montre la fraction ; l'élève tape l'écriture décimale FR.
    // Cas couverts : 1/4=0,25 · 1/2=0,5 · 3/2=1,5
    {
        num: 1,
        den: 4,
        max: 2,
        level: "6e",
        emoji: "🎹",
        context:
            "Le premier acte dure un quart de la soirée. Écris cette durée sous forme décimale.",
        hint: "Un quart s'écrit zéro virgule vingt-cinq.",
        sense: "decimal-auto",
    },
    {
        num: 1,
        den: 2,
        max: 2,
        level: "6e",
        emoji: "🥁",
        context:
            "L'entracte occupe une demie de la soirée. Écris cette durée sous forme décimale.",
        hint: "Une demie s'écrit zéro virgule cinq.",
        sense: "decimal-auto",
    },
    {
        num: 3,
        den: 2,
        max: 3,
        level: "6e",
        emoji: "🎺",
        context:
            "Le bis dure trois demies de soirée — plus d'une soirée entière ! Écris cela sous forme décimale.",
        hint: "Trois demies s'écrit un virgule cinq — une soirée et encore une demie.",
        sense: "decimal-auto",
    },

    // ── Palier 5 : égalités à trous (Sprint B, BO n°16) ────────────────────
    // num/den = RÉSULTAT de l'égalité. Résultats distincts : 0,5 · 0,75 · 1,0
    // L'élève saisit le résultat en écriture décimale via DecimalInput.
    // Cas couverts : 1/4+1/4=1/2 · 1−1/4=3/4 · 3/4+1/4=1
    {
        num: 1,
        den: 2,
        max: 2,
        level: "6e",
        emoji: "🎸",
        context:
            "Deux sets de guitare : le premier dure un quart de soirée, le second aussi. Quelle fraction de la soirée ont-ils joué au total ? Donne la réponse en écriture décimale.",
        hint: "Un quart plus un quart, c'est deux quarts — soit une demie, soit zéro virgule cinq.",
        sense: "equality-gap",
    },
    {
        num: 3,
        den: 4,
        max: 2,
        level: "6e",
        emoji: "🪗",
        context:
            "La soirée entière est planifiée. Les discours prennent un quart du temps. Quelle fraction reste-t-il pour la fête ? Donne la réponse en écriture décimale.",
        hint: "Un entier moins un quart, c'est trois quarts — soit zéro virgule soixante-quinze.",
        sense: "equality-gap",
    },
    {
        num: 4,
        den: 4,
        max: 2,
        level: "6e",
        emoji: "🎙️",
        context:
            "Le premier DJ joue trois quarts de la nuit, le second prend le relai pour un quart. Ensemble, combien font-ils ? Donne la réponse en écriture décimale.",
        hint: "Trois quarts plus un quart, c'est quatre quarts — c'est exactement un entier, soit un virgule zéro.",
        sense: "equality-gap",
    },
];

/**
 * Défis du Monde 5 — "Le Grand Festival"
 * Sens travaillé : TOUS les sens + automatismes 6ème (BO n°16, 2026)
 *
 * Progression :
 * - Palier 1 (1-2)  : révision sens partage et mesure, fractions ≤ 1
 * - Palier 2 (3-4)  : fractions > 1 dans des sens variés
 * - Palier 3 (5-6)  : fractions bien supérieures à 2 — consolidation finale
 * - Palier 4 (7-9)  : decimal-auto — fraction ↔ décimale (automatismes 6ème BO)
 * - Palier 5 (10-12): equality-gap — égalités à trous (automatismes 6ème BO)
 *
 * Automatismes 6ème couverts (BO n°16, texte exact) :
 *   fraction↔décimale : 1/4=0,25 · 3/4=0,75 · 3/2=1,5
 *   égalités à trous  : 1/2+1/4=? · 1−1/4=? · 3/4−1/4=?
 *
 * Interaction selon `sense` :
 *   partage|mesure|magnitude|quotient → NumberLine (useFractionChallenge, target=num/den)
 *   decimal-auto  → DecimalInput (même target=num/den, saisie virgule FR)
 *   equality-gap  → DecimalInput mode choix (même target=num/den, 4 boutons fraction)
 *
 * @typedef {Object} Fraction
 * @property {number} num
 * @property {number} den
 *
 * @typedef {Object} FestivalChallenge
 * @property {number}   num
 * @property {number}   den
 * @property {number}   max
 * @property {string}   level
 * @property {string}   emoji
 * @property {string}   context
 * @property {string}   hint
 * @property {string}   sense
 * @property {number|null}  [eqWhole]   - equality-gap : entier du membre gauche
 * @property {Fraction|null} [eqA]      - equality-gap : première fraction (ou null)
 * @property {string}       [eqOp]     - equality-gap : opérateur "+" | "−"
 * @property {Fraction}     [eqB]      - equality-gap : deuxième fraction
 * @property {Fraction[]}   [choices]  - equality-gap : 4 choix de réponse
 */

/** @type {FestivalChallenge[]} */
export const WORLD5_CHALLENGES = [
    // ── Palier 1 : révision sens connus, fractions ≤ 1 ──────────────────────
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
            "L'acrobate traverse la scène 5 fois en 3 secondes. Combien de longueurs de scène parcourt-il chaque seconde ?",
        hint: "Cinq tiers, c'est 1 longueur entière et encore deux tiers — cherche entre 1 et 2.",
        sense: "quotient",
    },

    // ── Palier 3 : fractions bien supérieures à 2 ───────────────────────────
    {
        num: 9,
        den: 4,
        max: 4,
        level: "6e",
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
        level: "6e",
        emoji: "🎠",
        context:
            "Le manège tourne : en 3 minutes il fait exactement 1 tour. Après 8 minutes, combien de tours a-t-il parcourus ?",
        hint: "Huit tiers, c'est 2 tours entiers et encore deux tiers — cherche entre 2 et 3, à deux tiers du chemin.",
        sense: "quotient",
    },

    // ── Palier 4 : automatismes fraction↔décimale (BO n°16, 2026) ───────────
    // target = num/den = valeur décimale attendue — useFractionChallenge inchangé
    {
        num: 1,
        den: 4,
        max: 2,
        level: "6e",
        emoji: "🎟️",
        context:
            "Le régisseur a vendu un quart des billets du festival. Écris cette fraction sous forme décimale.",
        hint: "Un quart, c'est zéro virgule vingt-cinq — divise 1 par 4.",
        sense: "decimal-auto",
    },
    {
        num: 3,
        den: 4,
        max: 2,
        level: "6e",
        emoji: "🏟️",
        context:
            "Les gradins sont remplis aux trois quarts. Écris cette proportion sous forme décimale.",
        hint: "Trois quarts, c'est zéro virgule soixante-quinze — la moitié plus un quart.",
        sense: "decimal-auto",
    },
    {
        num: 3,
        den: 2,
        max: 3,
        level: "6e",
        emoji: "🌙",
        context:
            "Le festival dure trois demis journées. Écris cette durée sous forme décimale.",
        hint: "Trois demis, c'est un virgule cinq — un entier et encore une demie journée.",
        sense: "decimal-auto",
    },

    // ── Palier 5 : automatismes égalités à trous (BO n°16, 2026) ────────────
    // num/den = réponse correcte ; choices = 4 options boutons
    {
        num: 3,
        den: 4,
        max: 2,
        level: "6e",
        emoji: "🎶",
        context:
            "Le jongleur a lancé la moitié de ses torches, puis encore un quart. Quelle fraction a-t-il lancée en tout ?",
        hint: "Un demi et un quart — le demi vaut deux quarts, donc deux quarts plus un quart font trois quarts.",
        sense: "equality-gap",
        eqWhole: null,
        eqA: { num: 1, den: 2 },
        eqOp: "+",
        eqB: { num: 1, den: 4 },
        choices: [
            { num: 3, den: 4 },
            { num: 1, den: 2 },
            { num: 1, den: 4 },
            { num: 2, den: 6 },
        ],
    },
    {
        num: 3,
        den: 4,
        max: 2,
        level: "6e",
        emoji: "💡",
        context:
            "La scène était entièrement éclairée. On a éteint un quart des projecteurs. Quelle fraction reste allumée ?",
        hint: "Un entier vaut quatre quarts. Quatre quarts moins un quart, c'est trois quarts.",
        sense: "equality-gap",
        eqWhole: 1,
        eqA: null,
        eqOp: "−",
        eqB: { num: 1, den: 4 },
        choices: [
            { num: 3, den: 4 },
            { num: 5, den: 4 },
            { num: 1, den: 4 },
            { num: 1, den: 2 },
        ],
    },
    {
        num: 1,
        den: 2,
        max: 2,
        level: "6e",
        emoji: "🎺",
        context:
            "Le traiteur avait préparé trois quarts du repas. Il en a déjà servi un quart. Quelle fraction reste à servir ?",
        hint: "Trois quarts moins un quart — même dénominateur, soustrait les numérateurs : trois moins un, c'est deux quarts, soit un demi.",
        sense: "equality-gap",
        eqWhole: null,
        eqA: { num: 3, den: 4 },
        eqOp: "−",
        eqB: { num: 1, den: 4 },
        choices: [
            { num: 1, den: 2 },
            { num: 1, den: 4 },
            { num: 3, den: 4 },
            { num: 2, den: 8 },
        ],
    },
];

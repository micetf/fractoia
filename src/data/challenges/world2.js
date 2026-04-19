/**
 * Défis du Monde 2 — "L'Atelier de Koro"
 * Sens travaillés : fraction-mesure (palier 0) puis fraction-opérateur (paliers 1-3)
 *
 * ⚠️ Cible sur la demi-droite = (num/den) × total (useOperatorChallenge).
 * Pour les défis mesure (total = 1) : cible = num/den. Rétrocompatible.
 *
 * Sprint 3 — champ `sense` :
 * - `sense: "mesure"` → WorldWorkshop affiche MeasureRuler (BO n°16, CE2→CM1)
 * - sans `sense`      → affichage équation × total (comportement historique)
 *
 * Progression :
 * - Palier 0 (défis 1-3) : fraction-mesure, total=1, "CM1"
 * - Palier 1 (défis 4-5) : opérateur unitaire, total=1, "CM1"
 * - Palier 2 (défis 6-7) : opérateur non-unitaire, total=2, "CM2"
 * - Palier 3 (défis 8-9) : opérateur non-unitaire, total≥2, "CM2"
 *
 * @typedef {Object} WorkshopChallenge
 * @property {number} num
 * @property {number} den
 * @property {number} total
 * @property {string} unit
 * @property {number} max
 * @property {string} level
 * @property {string} [sense]
 * @property {string} emoji
 * @property {string} context
 * @property {string} hint
 */

/** @type {WorkshopChallenge[]} */
export const WORLD2_CHALLENGES = [
    // ── Palier 0 : fraction-mesure (CM1) ──
    {
        num: 1,
        den: 2,
        total: 1,
        unit: "m",
        max: 1,
        level: "CM1",
        sense: "mesure",
        emoji: "📐",
        context:
            "Koro pose sa règle contre la planche. L'extrémité s'arrête exactement à la moitié de la règle. Quelle longueur mesure cette planche ?",
        hint: "La planche s'arrête au milieu de la règle — un demi mètre se place exactement entre 0 et 1.",
    },
    {
        num: 3,
        den: 4,
        total: 1,
        unit: "m",
        max: 1,
        level: "CM1",
        sense: "mesure",
        emoji: "📏",
        context:
            "La pièce de bois s'arrête à la troisième graduation sur quatre de la règle de Koro. Quelle fraction de mètre mesure-t-elle ?",
        hint: "Trois quarts de mètre, c'est entre la moitié et 1 — à la troisième marque quand la règle est divisée en quatre.",
    },
    {
        num: 2,
        den: 3,
        total: 1,
        unit: "m",
        max: 1,
        level: "CM1",
        sense: "mesure",
        emoji: "🪵",
        context:
            "La baguette de Koro dépasse les deux premières graduations sur trois de sa règle. Où se trouve son extrémité sur la demi-droite ?",
        hint: "Deux tiers de mètre se trouve entre la moitié et 1 — juste après la graduation du milieu.",
    },

    // ── Palier 1 : opérateur unitaire, total = 1 (CM1) ──
    {
        num: 1,
        den: 2,
        total: 1,
        unit: "m",
        max: 1,
        level: "CM1",
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
        level: "CM2",
        emoji: "🔩",
        context:
            "La barre de métal fait 1 mètre. Koro en réserve les trois quarts pour fabriquer la roue du moulin.",
        hint: "Trois quarts de la barre, c'est entre la moitié et le bout — juste avant la fin.",
    },

    // ── Palier 2 : opérateur non-unitaire, total = 2 (CM2) ──
    {
        num: 1,
        den: 2,
        total: 2,
        unit: "m",
        max: 2,
        level: "CM1",
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
        level: "CM2",
        emoji: "📏",
        context:
            "La traverse fait 2 mètres. Koro a besoin des trois quarts pour assembler le grand cadre de la fenêtre.",
        hint: "Trois quarts de deux mètres, c'est un mètre entier et encore la moitié d'un mètre — cherche entre 1 et 2.",
    },

    // ── Palier 3 : résultats > 1, pont Monde 3 (CM2) ──
    {
        num: 5,
        den: 8,
        total: 2,
        unit: "m",
        max: 2,
        level: "CM2",
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
        level: "CM2",
        emoji: "🏗️",
        context:
            "Pour le grand axe du moulin, Koro mesure les cinq sixièmes d'une longue barre de 3 mètres.",
        hint: "Cinq sixièmes de trois mètres, c'est deux mètres et encore une moitié — cherche entre 2 et 3.",
    },
];

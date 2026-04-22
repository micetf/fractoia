/**
 * Défis du Monde 8 — "La Fête de l'Équinoxe"
 * Sens travaillé : les pourcentages
 *
 * Attendus 6ème (BO n°16, 2026) :
 *   "Comprendre le sens d'un pourcentage"
 *   "Calculer une proportion et l'exprimer sous forme de pourcentage dans des cas simples"
 *   "Appliquer un pourcentage à une grandeur ou à un nombre"
 *
 * Lien BO : "La fraction opère également sur un nombre, notamment quand
 * elle est exprimée sous forme de pourcentage."
 *
 * Conventions :
 * - `context` : pas de notation fractionnaire, pas de "%/" — langage naturel.
 * - `hint`    : écriture littérale des fractions si nécessaire.
 *
 * Progression :
 * - Palier 1 (1-2) : sens — reconnaître un pourcentage comme fraction de 100
 *   Interaction : 4 boutons de choix (pas de saisie)
 * - Palier 2 (3-4) : calcul — appliquer un pourcentage à une grandeur
 *   Interaction : saisie numérique du résultat entier
 * - Palier 3 (5-6) : proportion — exprimer une proportion en pourcentage
 *   Interaction : saisie numérique du pourcentage
 *
 * Champ `result` : réponse correcte (nombre entier dans tous les cas)
 * Champ `choices` : 4 options pour palier 1 (null sinon)
 * Champ `unit` : unité affichée dans l'énoncé et la saisie
 * Champ `suffix` : "%" si la réponse attendue est un pourcentage (paliers 1 et 3)
 *
 * @typedef {Object} EquinoxChallenge
 * @property {number}         result   - Réponse attendue (cible du hook)
 * @property {number|null}    pct      - Pourcentage (paliers 1 et 2)
 * @property {number|null}    total    - Grandeur totale (palier 2)
 * @property {string}         sense    - "sens" | "calcul" | "proportion"
 * @property {string}         unit     - Unité narrative (billets, élèves…)
 * @property {string}         suffix   - "%" si réponse = pourcentage
 * @property {number[]|null}  choices  - 4 options boutons (palier 1) ou null
 * @property {string}         level
 * @property {string}         emoji
 * @property {string}         context
 * @property {string}         hint
 */

/** @type {EquinoxChallenge[]} */
export const WORLD_EQUINOX_CHALLENGES = [
    // ── Palier 1 : sens — fraction de 100 ───────────────────────────────────
    {
        result: 50,
        pct: 50,
        total: 100,
        sense: "sens",
        unit: "élèves",
        suffix: "%",
        choices: [25, 50, 75, 10],
        level: "6e",
        emoji: "🎭",
        context:
            "Sur les 100 élèves invités à la fête, la moitié sont déjà arrivés. Quel pourcentage des invités est présent ?",
        hint: "La moitié de 100, c'est 50. La moitié, c'est aussi cinquante pour cent.",
    },
    {
        result: 25,
        pct: 25,
        total: 100,
        sense: "sens",
        unit: "costumes",
        suffix: "%",
        choices: [10, 20, 25, 50],
        level: "6e",
        emoji: "🎨",
        context:
            "L'atelier de costumes a préparé 100 tenues. Un quart d'entre elles sont en rouge. Quel pourcentage est rouge ?",
        hint: "Un quart de 100, c'est 25. Un quart, c'est aussi vingt-cinq pour cent.",
    },

    // ── Palier 2 : calcul — appliquer un % à une grandeur ───────────────────
    {
        result: 40,
        pct: 50,
        total: 80,
        sense: "calcul",
        unit: "billets",
        suffix: "",
        choices: null,
        level: "6e",
        emoji: "🎟️",
        context:
            "La salle de spectacle compte 80 places. Cinquante pour cent des billets sont déjà vendus. Combien de billets ont été vendus ?",
        hint: "Cinquante pour cent, c'est la moitié. La moitié de quatre-vingt, c'est quarante.",
    },
    {
        result: 15,
        pct: 25,
        total: 60,
        sense: "calcul",
        unit: "musiciens",
        suffix: "",
        choices: null,
        level: "6e",
        emoji: "🎺",
        context:
            "L'orchestre de la fête compte 60 musiciens. Vingt-cinq pour cent jouent d'un instrument à vent. Combien est-ce ?",
        hint: "Vingt-cinq pour cent, c'est un quart. Le quart de soixante, c'est quinze.",
    },

    // ── Palier 3 : proportion — exprimer en % ───────────────────────────────
    {
        result: 75,
        pct: null,
        total: 40,
        sense: "proportion",
        unit: "entrées",
        suffix: "%",
        choices: null,
        level: "6e",
        emoji: "🌗",
        context:
            "Sur 40 entrées disponibles pour le bal de l'équinoxe, 30 ont déjà trouvé preneur. Quel pourcentage cela représente-t-il ?",
        hint: "Trente sur quarante. Trente sur quarante, c'est la même chose que soixante-quinze sur cent, soit soixante-quinze pour cent.",
    },
    {
        result: 30,
        pct: null,
        total: 60,
        sense: "proportion",
        unit: "lanternes",
        suffix: "%",
        choices: null,
        level: "6e",
        emoji: "🏮",
        context:
            "On a suspendu 60 lanternes dans la cour de la fête. Dix-huit sont éteintes. Quel pourcentage des lanternes est éteint ?",
        hint: "Dix-huit sur soixante. Divise les deux par deux : neuf sur trente. Multiplie par cent : trente pour cent.",
    },
];

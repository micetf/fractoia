/**
 * Messages de feedback diagnostique — Sprint E.
 *
 * Fondement didactique : Hattie & Timperley (2007) — le feedback est efficace
 * quand il porte sur la STRATÉGIE, pas seulement sur la correction.
 * Ces messages nomment le biais cognitif et proposent la stratégie correcte.
 *
 * Source des codes d'erreur :
 *   Stafylidou & Vosniadou (2004) — catalogue d'erreurs typiques sur les fractions
 *   CSEN / Dehaene et al. (2022) — test de la ligne numérique
 *
 * Usage dans les composants :
 *   const msg = ERROR_MESSAGES[errorBias]   // peut être undefined → pas de diagnostic
 *   if (msg) showError(msg.body)
 *
 * @typedef {Object} ErrorMessage
 * @property {string} title - Court titre pédagogique (jamais affiché seul)
 * @property {string} body  - Message complet affiché dans FeedbackToast
 */

/** @type {Record<string, ErrorMessage>} */
export const ERROR_MESSAGES = {
    /**
     * Biais du nombre entier — traiter num. et dén. comme deux entiers indépendants.
     * Ex : croire que 1/5 > 1/3 « parce que 5 > 3 ».
     */
    "larger-denom-bigger": {
        title: "Attention au dénominateur !",
        body:
            "🔍 Plus le dénominateur est grand, plus chaque part est PETITE. " +
            "Un cinquième de gâteau est plus petit qu'un tiers — " +
            "car on a découpé en plus de parts.",
    },

    /**
     * Biais du nombre entier — comparer les numérateurs et dénominateurs séparément
     * comme s'ils étaient des entiers indépendants, toutes situations confondues.
     */
    "whole-number": {
        title: "Une fraction est un seul nombre !",
        body:
            "🔍 Une fraction n'est pas deux nombres séparés. " +
            "Son emplacement sur la demi-droite dépend des deux à la fois. " +
            "Cherche où se trouve ce point sur la droite.",
    },

    /**
     * Erreur d'addition — additionner aussi les dénominateurs (1/4 + 1/4 = 2/8).
     */
    "sum-of-parts": {
        title: "Les dénominateurs ne s'additionnent pas !",
        body:
            "🔍 Quand les parts sont de même taille, seul le NOMBRE de parts change. " +
            "Un quart plus un quart, c'est deux quarts — " +
            "pas deux huitièmes.",
    },

    /**
     * Conception « la fraction, c'est toujours petit » — croire qu'une fraction
     * est nécessairement inférieure à 1.
     */
    "fraction-always-lt-1": {
        title: "Une fraction peut dépasser 1 !",
        body:
            "🔍 Une fraction comme sept quarts dépasse 1 entier. " +
            "Cherche au-delà de la graduation 1 sur la demi-droite.",
    },

    /**
     * Mauvais positionnement par rapport au repère 1/2.
     * Ex : placer 5/7 avant 1/2 alors que 5/7 > 1/2.
     */
    "benchmark-half": {
        title: "Utilise la moitié comme repère !",
        body:
            "🔍 Commence par vérifier si chaque fraction est au-dessus ou en dessous " +
            "de la moitié. La moitié exacte vaut autant de numérateur que la " +
            "moitié du dénominateur.",
    },
};

import { useState, useCallback } from "react";

/**
 * Gère la séquence de défis pourcentages (Monde 8 — WorldEquinox).
 *
 * La cible est toujours `challenge.result` (nombre entier).
 * Tolérance de 0,5 pour absorber les arrondis de saisie.
 *
 * Trois sens gérés par les défis, pas par le hook :
 *   "sens"       → l'élève clique un bouton (answer = choix entier)
 *   "calcul"     → l'élève saisit le résultat (ex: 40 billets)
 *   "proportion" → l'élève saisit le pourcentage (ex: 75 %)
 *
 * @template T
 * @param {T[]} challenges  - Défis (champ `result` requis)
 * @returns {{
 *   challenge: T,
 *   index: number,
 *   total: number,
 *   attempts: number,
 *   done: boolean,
 *   check: function(number): { correct: boolean, attempts: number, showHint: boolean },
 *   next: function(): void,
 *   reset: function(): void,
 * }}
 */
export function usePercentChallenge(challenges) {
    const [index, setIndex] = useState(0);
    const [attempts, setAttempts] = useState(0);
    const [done, setDone] = useState(false);

    const challenge = challenges[index];

    const check = useCallback(
        (answer) => {
            const att = attempts + 1;
            setAttempts(att);
            const correct = Math.abs(answer - challenge.result) < 0.5;
            return { correct, attempts: att, showHint: !correct && att >= 2 };
        },
        [attempts, challenge]
    );

    const next = useCallback(() => {
        if (index + 1 >= challenges.length) {
            setDone(true);
        } else {
            setIndex((i) => i + 1);
            setAttempts(0);
        }
    }, [index, challenges.length]);

    const reset = useCallback(() => {
        setIndex(0);
        setAttempts(0);
        setDone(false);
    }, []);

    return {
        challenge,
        index,
        total: challenges.length,
        attempts,
        done,
        check,
        next,
        reset,
    };
}

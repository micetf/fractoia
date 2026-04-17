import { useState, useCallback } from "react";

/**
 * @typedef {Object} OperatorCheckResult
 * @property {boolean} correct
 * @property {number}  attempts
 * @property {boolean} showHint - true dès la 2e erreur consécutive
 */

/**
 * Gère la séquence de défis fraction-opérateur (Monde 2).
 *
 * Différence clé avec useFractionChallenge :
 * la cible sur la droite est `(num / den) × total`, pas `num / den`.
 * Les champs `total` et `unit` des défis world2.js sont exploités ici.
 *
 * Principe Tricot : même structure de feedback adaptatif que
 * useFractionChallenge — 1re erreur → encouragement, 2e → indice contextuel.
 *
 * @template T
 * @param {T[]} challenges   - Tableau de défis (champs num, den, total requis)
 * @param {number} [tolerance=0.02]
 * @returns {{
 *   challenge: T,
 *   index: number,
 *   total: number,
 *   attempts: number,
 *   target: number,
 *   done: boolean,
 *   check: function(number): OperatorCheckResult,
 *   next: function(): void,
 *   reset: function(): void,
 * }}
 */
export function useOperatorChallenge(challenges, tolerance = 0.02) {
    const [index, setIndex] = useState(0);
    const [attempts, setAttempts] = useState(0);
    const [done, setDone] = useState(false);

    const challenge = challenges[index];

    /** Cible = fraction × grandeur totale (ex. 3/4 × 2 m = 1,5 m). */
    const target = challenge
        ? (challenge.num / challenge.den) * challenge.total
        : 0;

    const check = useCallback(
        (value) => {
            const att = attempts + 1;
            setAttempts(att);
            const correct = Math.abs(value - target) <= tolerance;
            return { correct, attempts: att, showHint: !correct && att >= 2 };
        },
        [attempts, target, tolerance]
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
        target,
        done,
        check,
        next,
        reset,
    };
}

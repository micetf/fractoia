import { useState, useCallback } from "react";

/**
 * @typedef {Object} CheckResult
 * @property {boolean} correct
 * @property {number}  attempts
 * @property {boolean} showHint - true si ≥ 2 erreurs consécutives
 */

/**
 * Gère la séquence de défis et la logique de réponse/indices.
 *
 * Principe Tricot : le feedback s'adapte au nombre de tentatives —
 * 1re erreur → encouragement simple,
 * 2e erreur  → indice contextuel lié à la situation.
 *
 * @template T
 * @param {T[]} challenges    - Tableau de défis à parcourir
 * @param {number} [tolerance=0.02]
 * @returns {{
 *   challenge: T,
 *   index: number,
 *   total: number,
 *   attempts: number,
 *   target: number,
 *   done: boolean,
 *   check: function(number): CheckResult,
 *   next: function(): void,
 *   reset: function(): void,
 * }}
 *
 * @example
 * const { challenge, check, next, done } = useFractionChallenge(WORLD1_CHALLENGES)
 * const result = check(userAnswer) // { correct, attempts, showHint }
 */
export function useFractionChallenge(challenges, tolerance = 0.02) {
    const [index, setIndex] = useState(0);
    const [attempts, setAttempts] = useState(0);
    const [done, setDone] = useState(false);

    const challenge = challenges[index];
    const target = challenge ? challenge.num / challenge.den : 0;

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

import { useState, useCallback } from "react";

/**
 * Gère la séquence de défis addition/soustraction de fractions (Monde 2bis).
 *
 * Différence clé avec useFractionChallenge :
 * la cible est (num1 ± num2) / den selon le champ `op` du défi.
 *
 * @template T
 * @param {T[]} challenges  - Tableau de défis (champs num1, num2, den, op requis)
 * @param {number} [tolerance=0.02]
 * @returns {{
 *   challenge: T,
 *   index: number,
 *   total: number,
 *   attempts: number,
 *   target: number,
 *   done: boolean,
 *   check: function(number): { correct: boolean, attempts: number, showHint: boolean },
 *   next: function(): void,
 *   reset: function(): void,
 * }}
 */
export function useAdditionChallenge(challenges, tolerance = 0.02) {
    const [index, setIndex] = useState(0);
    const [attempts, setAttempts] = useState(0);
    const [done, setDone] = useState(false);

    const challenge = challenges[index];

    /** Cible = (num1 ± num2) / den selon l'opérateur du défi. */
    const target = challenge
        ? challenge.op === "+"
            ? (challenge.num1 + challenge.num2) / challenge.den
            : (challenge.num1 - challenge.num2) / challenge.den
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

import { useState, useCallback } from "react";

/** Détermine la phase initiale d'un défi. Hors hook : évite les avertissements exhaustive-deps. */
const initPhase = (ch) => (ch?.bracket ? "bracket" : "place");

/**
 * Gère la séquence de défis fraction avec phase d'encadrement optionnelle.
 * Sans `bracket` : phase `'place'` directe — rétrocompatible avec world1/4/5.
 * @template T
 * @param {T[]} challenges
 * @param {number} [tolerance=0.02]
 */
export function useFractionChallenge(challenges, tolerance = 0.02) {
    const [index, setIndex] = useState(0);
    const [attempts, setAttempts] = useState(0);
    const [done, setDone] = useState(false);
    const [phase, setPhase] = useState(() => initPhase(challenges[0]));

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

    const confirmBracket = useCallback(() => setPhase("place"), []);

    const next = useCallback(() => {
        if (index + 1 >= challenges.length) {
            setDone(true);
        } else {
            const nextIdx = index + 1;
            setIndex(nextIdx);
            setAttempts(0);
            setPhase(initPhase(challenges[nextIdx]));
        }
    }, [index, challenges]);

    const reset = useCallback(() => {
        setIndex(0);
        setAttempts(0);
        setDone(false);
        setPhase(initPhase(challenges[0]));
    }, [challenges]);

    return {
        challenge,
        index,
        total: challenges.length,
        attempts,
        target,
        phase,
        done,
        check,
        confirmBracket,
        next,
        reset,
    };
}

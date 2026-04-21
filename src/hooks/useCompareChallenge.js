import { useState, useCallback } from "react";

/**
 * Séquence de défis comparaison de fractions (Monde 7 — WorldBridge).
 *
 * L'élève choisit "A", "B" ou "equal". Pas de cible sur demi-droite.
 * Après validation correcte, `reveal()` déclenche la phase "revealed" :
 * WorldBridge affiche les deux fractions simultanément sur la NumberLine.
 * `check()` retourne `errorBias` du défi si incorrect (utilisé par Sprint E).
 *
 * @template T
 * @param {T[]} challenges  - Défis (champs fracA, fracB, correct, errorBias requis)
 */
export function useCompareChallenge(challenges) {
    const [index, setIndex] = useState(0);
    const [attempts, setAttempts] = useState(0);
    const [phase, setPhase] = useState(
        /** @type {'question'|'revealed'} */ ("question")
    );
    const [done, setDone] = useState(false);

    const challenge = challenges[index];

    /**
     * @param {'A'|'B'|'equal'} answer
     * @returns {{ correct: boolean, attempts: number, showHint: boolean, errorBias: string|null }}
     */
    const check = useCallback(
        (answer) => {
            const att = attempts + 1;
            setAttempts(att);
            const correct = answer === challenge.correct;
            return {
                correct,
                attempts: att,
                showHint: !correct && att >= 2,
                errorBias: correct ? null : (challenge.errorBias ?? null),
            };
        },
        [attempts, challenge]
    );

    /** Passe en phase "revealed" — appelé par WorldBridge après réponse correcte. */
    const reveal = useCallback(() => setPhase("revealed"), []);

    const next = useCallback(() => {
        if (index + 1 >= challenges.length) {
            setDone(true);
        } else {
            setIndex((i) => i + 1);
            setAttempts(0);
            setPhase("question");
        }
    }, [index, challenges.length]);

    const reset = useCallback(() => {
        setIndex(0);
        setAttempts(0);
        setPhase("question");
        setDone(false);
    }, []);

    return {
        challenge,
        index,
        total: challenges.length,
        attempts,
        phase,
        done,
        check,
        reveal,
        next,
        reset,
    };
}

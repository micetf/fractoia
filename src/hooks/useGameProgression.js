import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage.js";

/**
 * @typedef {{ challengeIndex: number, success: boolean, attempts: number }} ChallengeResult
 * @typedef {{ worldId: number, results: ChallengeResult[], unlocked: boolean, stars: number }} WorldProgress
 * @typedef {{ currentWorld: number, worlds: WorldProgress[], totalStars: number }} GameState
 */

/** @type {GameState} */
const INIT = {
    currentWorld: 1,
    totalStars: 0,
    worlds: [1, 2, 3, 4, 5].map((id) => ({
        worldId: id,
        results: [],
        unlocked: id === 1,
        stars: 0,
    })),
};

/** Calcule les étoiles d'un monde en fonction des résultats. @param {ChallengeResult[]} r */
const calcStars = (r) => {
    const ok = r.filter((x) => x.success).length;
    return ok >= r.length
        ? 3
        : ok >= Math.ceil(r.length * 0.66)
          ? 2
          : ok > 0
            ? 1
            : 0;
};

/**
 * Gère la progression globale du joueur dans FRACTOÏA.
 *
 * @returns {{ gameState: GameState, recordResult: function, unlockWorld: function, getWorldProgress: function, resetGame: function }}
 */
export function useGameProgression() {
    const [gameState, setGameState, resetGame] = useLocalStorage(
        "fractoia_progress",
        INIT
    );

    const recordResult = useCallback(
        (worldId, challengeIndex, success, attempts) => {
            setGameState((prev) => {
                const worlds = prev.worlds.map((w) => {
                    if (w.worldId !== worldId) return w;
                    const idx = w.results.findIndex(
                        (r) => r.challengeIndex === challengeIndex
                    );
                    const entry = { challengeIndex, success, attempts };
                    const results =
                        idx >= 0
                            ? w.results.map((r, i) => (i === idx ? entry : r))
                            : [...w.results, entry];
                    return { ...w, results, stars: calcStars(results) };
                });
                return {
                    ...prev,
                    worlds,
                    totalStars: worlds.reduce((s, w) => s + w.stars, 0),
                };
            });
        },
        [setGameState]
    );

    const unlockWorld = useCallback(
        (worldId) => {
            setGameState((prev) => ({
                ...prev,
                worlds: prev.worlds.map((w) =>
                    w.worldId === worldId ? { ...w, unlocked: true } : w
                ),
            }));
        },
        [setGameState]
    );

    const getWorldProgress = useCallback(
        (worldId) =>
            gameState.worlds.find((w) => w.worldId === worldId) ??
            INIT.worlds[0],
        [gameState]
    );

    return {
        gameState,
        recordResult,
        unlockWorld,
        getWorldProgress,
        resetGame,
    };
}

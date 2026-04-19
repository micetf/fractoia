import { useCallback, createContext, useContext, createElement } from "react";
import { useLocalStorage } from "./useLocalStorage.js";

const INIT = {
    currentWorld: 1,
    totalStars: 0,
    worlds: [1, 2, 3, 4, 5, 6].map((id) => ({
        worldId: id,
        results: [],
        unlocked: id === 1,
        stars: 0,
    })),
};

/** Guard r.length > 0 : tableau vide = 0 étoiles (fix edge case calcStars). */
const calcStars = (r) => {
    if (!r.length) return 0;
    const ok = r.filter((x) => x.success).length;
    return ok >= r.length
        ? 3
        : ok >= Math.ceil(r.length * 0.66)
          ? 2
          : ok > 0
            ? 1
            : 0;
};
const GameProgressionContext = createContext(null);

/**
 * Provider racine — instance unique partagée entre tous les composants.
 * Élimine la désynchronisation entre useState indépendants (bug unlock stale state).
 * À placer dans App.jsx, au-dessus de AppRouter.
 */
export function GameProgressionProvider({ children }) {
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

    // createElement évite le JSX dans un fichier .js (Vite/OXC refuse JSX hors .jsx)
    return createElement(
        GameProgressionContext.Provider,
        {
            value: {
                gameState,
                recordResult,
                unlockWorld,
                getWorldProgress,
                resetGame,
            },
        },
        children
    );
}

/**
 * API identique à l'ancienne version — aucun composant consommateur à modifier.
 * Lève une erreur explicite si utilisé hors Provider.
 */
export function useGameProgression() {
    const ctx = useContext(GameProgressionContext);
    if (!ctx)
        throw new Error(
            "useGameProgression doit être dans <GameProgressionProvider>"
        );
    return ctx;
}

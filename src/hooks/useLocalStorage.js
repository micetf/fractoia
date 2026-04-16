import { useState, useCallback } from "react";

/**
 * Hook de persistance en localStorage avec synchronisation d'état React.
 *
 * @template T
 * @param {string} key - Clé de stockage localStorage
 * @param {T} initialValue - Valeur par défaut si rien en storage
 * @returns {[T, function(T|function(T): T): void, function(): void]} [valeur, setter, reset]
 *
 * @example
 * const [score, setScore, resetScore] = useLocalStorage('fractoia_score', 0)
 */
export function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item !== null ? JSON.parse(item) : initialValue;
        } catch {
            return initialValue;
        }
    });

    const setValue = useCallback(
        (value) => {
            setStoredValue((prev) => {
                const next = typeof value === "function" ? value(prev) : value;
                try {
                    window.localStorage.setItem(key, JSON.stringify(next));
                } catch {
                    console.warn(
                        `[useLocalStorage] Impossible d'écrire la clé "${key}"`
                    );
                }
                return next;
            });
        },
        [key]
    );

    const reset = useCallback(() => {
        try {
            window.localStorage.removeItem(key);
        } catch {
            /* silent */
        }
        setStoredValue(initialValue);
    }, [key, initialValue]);

    return [storedValue, setValue, reset];
}

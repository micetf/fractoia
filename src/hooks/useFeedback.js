import { useState, useCallback, useRef } from "react";

/**
 * @typedef {'success'|'error'|'hint'|'idle'} FeedbackStatus
 *
 * @typedef {Object} FeedbackState
 * @property {FeedbackStatus} status
 * @property {string}         message
 * @property {boolean}        visible
 * @property {string|null}    diagnostic - Message diagnostique (Sprint E) ou null
 */

/**
 * Gère le feedback immédiat après une réponse élève.
 *
 * Sprint E — `showError` accepte un second paramètre optionnel `diagnostic` :
 *   showError("Pas tout à fait…", "🔍 Plus le dénominateur est grand…")
 * Le diagnostic est transmis à FeedbackToast qui l'affiche dans une zone
 * distincte. Sans diagnostic, le comportement est identique à l'ancienne version.
 *
 * @param {{ successDuration?: number, errorDuration?: number }} [config={}]
 */
export function useFeedback(config = {}) {
    const { successDuration = 2200, errorDuration = 3500 } = config;

    const [feedback, setFeedback] = useState({
        status: "idle",
        message: "",
        visible: false,
        diagnostic: null,
    });
    const timerRef = useRef(null);

    const clear = useCallback(() => {
        if (timerRef.current) clearTimeout(timerRef.current);
        setFeedback({
            status: "idle",
            message: "",
            visible: false,
            diagnostic: null,
        });
    }, []);

    const show = useCallback(
        (status, message, duration, diagnostic = null) => {
            if (timerRef.current) clearTimeout(timerRef.current);
            setFeedback({ status, message, visible: true, diagnostic });
            timerRef.current = setTimeout(clear, duration);
        },
        [clear]
    );

    const showSuccess = useCallback(
        (message) => show("success", message, successDuration),
        [show, successDuration]
    );

    /**
     * @param {string}      message    - Message principal
     * @param {string|null} [diagnostic] - Message diagnostique optionnel (Sprint E)
     */
    const showError = useCallback(
        (message, diagnostic = null) =>
            show("error", message, errorDuration, diagnostic),
        [show, errorDuration]
    );

    const showHint = useCallback(
        (message) => show("hint", message, errorDuration),
        [show, errorDuration]
    );

    return { feedback, showSuccess, showError, showHint, clear };
}

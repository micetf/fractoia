import { useState, useCallback, useRef } from "react";

/**
 * @typedef {'success'|'error'|'hint'|'idle'} FeedbackStatus
 *
 * @typedef {Object} FeedbackState
 * @property {FeedbackStatus} status
 * @property {string} message
 * @property {boolean} visible
 */

/**
 * @typedef {Object} FeedbackConfig
 * @property {number} [successDuration=2000] - Durée d'affichage en succès (ms)
 * @property {number} [errorDuration=3000]   - Durée d'affichage en erreur (ms)
 */

/**
 * Gère le feedback immédiat après une réponse élève.
 *
 * Principe didactique (Tricot) : l'élève doit recevoir une réponse corrective
 * immédiate, sans punition, pour réguler son apprentissage.
 *
 * @param {FeedbackConfig} [config={}]
 * @returns {{ feedback: FeedbackState, showSuccess: function, showError: function, showHint: function, clear: function }}
 *
 * @example
 * const { feedback, showSuccess, showError } = useFeedback()
 * showSuccess('Bravo ! 7/4 est bien entre 1 et 2.')
 */
export function useFeedback(config = {}) {
    const { successDuration = 2200, errorDuration = 3000 } = config;

    const [feedback, setFeedback] = useState({
        status: "idle",
        message: "",
        visible: false,
    });
    const timerRef = useRef(null);

    const clear = useCallback(() => {
        if (timerRef.current) clearTimeout(timerRef.current);
        setFeedback({ status: "idle", message: "", visible: false });
    }, []);

    const show = useCallback(
        (status, message, duration) => {
            if (timerRef.current) clearTimeout(timerRef.current);
            setFeedback({ status, message, visible: true });
            timerRef.current = setTimeout(clear, duration);
        },
        [clear]
    );

    const showSuccess = useCallback(
        (message) => {
            show("success", message, successDuration);
        },
        [show, successDuration]
    );

    const showError = useCallback(
        (message) => {
            show("error", message, errorDuration);
        },
        [show, errorDuration]
    );

    const showHint = useCallback(
        (message) => {
            show("hint", message, errorDuration);
        },
        [show, errorDuration]
    );

    return { feedback, showSuccess, showError, showHint, clear };
}

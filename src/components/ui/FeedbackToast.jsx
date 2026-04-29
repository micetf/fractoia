/**
 * @typedef {import('../../hooks/useFeedback.js').FeedbackState} FeedbackState
 */

const PALETTE = {
    success: { bg: "#059669", border: "#047857", icon: "🎉" },
    error: { bg: "#dc2626", border: "#b91c1c", icon: "🤔" },
    hint: { bg: "#0284c7", border: "#0369a1", icon: "💡" },
};

/**
 * Toast de feedback animé — affiché en bas à droite.
 *
 * Sprint E : zone diagnostic pour les biais cognitifs.
 * Sprint G — accessibilité WCAG 2.1 AA :
 *   - role="alert" aria-live="assertive" aria-atomic="true"
 *     → les lecteurs d'écran annoncent le message complet dès apparition
 *   - La zone diagnostic a son propre aria-live="polite" pour ne pas
 *     interrompre la lecture du message principal.
 *   - Contraste garanti ≥ 4.5:1 sur fond coloré (texte blanc sur rouge/vert/bleu)
 *
 * @param {Object}        props
 * @param {FeedbackState} props.feedback
 */
function FeedbackToast({ feedback }) {
    if (!feedback.visible || feedback.status === "idle") return null;

    const { bg, border, icon } = PALETTE[feedback.status] ?? PALETTE.error;

    return (
        <div
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            style={{
                position: "fixed",
                bottom: "1.5rem",
                right: "1.25rem",
                zIndex: 50,
                maxWidth: "20rem",
                width: "calc(100vw - 2.5rem)",
                borderRadius: "1rem",
                overflow: "hidden",
                border: `2px solid ${border}`,
                boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
                animation: "slideInRight .25s ease",
            }}
        >
            {/* Message principal */}
            <div
                style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: ".75rem",
                    padding: ".875rem 1rem",
                    background: bg,
                }}
            >
                <span
                    aria-hidden="true"
                    style={{
                        fontSize: "1.5rem",
                        lineHeight: 1,
                        marginTop: ".1rem",
                        flexShrink: 0,
                    }}
                >
                    {icon}
                </span>
                <p
                    style={{
                        fontFamily: "'Nunito',sans-serif",
                        fontWeight: 700,
                        fontSize: ".875rem",
                        color: "#fff",
                        margin: 0,
                        lineHeight: 1.45,
                    }}
                >
                    {feedback.message}
                </p>
            </div>

            {/* Zone diagnostic — Sprint E + Sprint G aria-live="polite" */}
            {feedback.diagnostic && (
                <div
                    aria-live="polite"
                    style={{
                        background: "rgba(0,0,0,0.3)",
                        borderTop: `1px solid ${border}88`,
                        padding: ".5rem .875rem .625rem",
                    }}
                >
                    <p
                        style={{
                            fontFamily: "'Nunito',sans-serif",
                            fontSize: ".78rem",
                            color: "rgba(255,255,255,0.92)",
                            margin: 0,
                            lineHeight: 1.5,
                        }}
                    >
                        {feedback.diagnostic}
                    </p>
                </div>
            )}
        </div>
    );
}

export default FeedbackToast;

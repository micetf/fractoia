/**
 * @typedef {import('../../hooks/useFeedback.js').FeedbackState} FeedbackState
 */

const CONFIG = {
    success: {
        icon: "🎉",
        bg: "bg-jade-500",
        border: "border-jade-600",
        text: "text-white",
    },
    error: {
        icon: "🤔",
        bg: "bg-coral-500",
        border: "border-coral-600",
        text: "text-white",
    },
    hint: {
        icon: "💡",
        bg: "bg-sky-500",
        border: "border-sky-600",
        text: "text-white",
    },
};

/**
 * Affiche un toast de feedback animé en bas de l'écran.
 *
 * Sprint E — zone diagnostic :
 * Si `feedback.diagnostic` est non-null, un bandeau secondaire s'affiche sous
 * le message principal avec un fond légèrement coloré et l'icône 🔍.
 * Ce bandeau identifie le biais cognitif et la stratégie correcte.
 * Sans `diagnostic`, le rendu est identique à l'ancienne version (non-régressif).
 *
 * @param {Object}        props
 * @param {FeedbackState} props.feedback
 */
function FeedbackToast({ feedback }) {
    if (!feedback.visible || feedback.status === "idle") return null;

    const cfg = CONFIG[feedback.status];

    return (
        <div
            className={`
                animate-slide-in-right fixed bottom-6 right-6 z-50
                max-w-xs w-full rounded-2xl border-2 shadow-float
                overflow-hidden
                ${cfg.bg} ${cfg.border}
            `}
            role="alert"
            aria-live="assertive"
        >
            {/* Message principal */}
            <div className={`flex items-start gap-3 px-4 py-3 ${cfg.text}`}>
                <span
                    className="text-2xl leading-none mt-0.5"
                    aria-hidden="true"
                >
                    {cfg.icon}
                </span>
                <p
                    className="text-sm font-bold leading-snug flex-1"
                    style={{ fontFamily: "'Nunito', sans-serif" }}
                >
                    {feedback.message}
                </p>
            </div>

            {/* Zone diagnostic — visible uniquement si errorBias présent */}
            {feedback.diagnostic && (
                <div
                    style={{
                        background: "rgba(0,0,0,0.25)",
                        borderTop: "1px solid rgba(255,255,255,0.15)",
                        padding: ".5rem .875rem .625rem",
                    }}
                >
                    <p
                        style={{
                            fontFamily: "'Nunito', sans-serif",
                            fontSize: ".75rem",
                            color: "rgba(255,255,255,0.9)",
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

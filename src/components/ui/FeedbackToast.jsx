/**
 * @typedef {import('../hooks/useFeedback.js').FeedbackState} FeedbackState
 */

const CONFIG = {
    success: {
        icon: "🎉",
        bg: "bg-jade-500",
        border: "border-jade-600",
        text: "text-white",
        bar: "bg-jade-400",
    },
    error: {
        icon: "🤔",
        bg: "bg-coral-500",
        border: "border-coral-600",
        text: "text-white",
        bar: "bg-coral-400",
    },
    hint: {
        icon: "💡",
        bg: "bg-sky-500",
        border: "border-sky-600",
        text: "text-white",
        bar: "bg-sky-400",
    },
};

/**
 * Affiche un toast de feedback animé en bas de l'écran.
 *
 * Conçu selon le principe Tricot : feedback immédiat, non punitif,
 * informatif sur l'erreur ou le succès.
 *
 * @param {Object} props
 * @param {FeedbackState} props.feedback - État du feedback depuis useFeedback
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
            role="status"
            aria-live="polite"
        >
            {/* Contenu */}
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
        </div>
    );
}

export default FeedbackToast;

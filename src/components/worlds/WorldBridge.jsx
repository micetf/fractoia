import { useState, useCallback } from "react";
import CompareQuestion from "../ui/CompareQuestion.jsx";
import FeedbackToast from "../ui/FeedbackToast.jsx";
import ProgressStars from "../ui/ProgressStars.jsx";
import { useFeedback } from "../../hooks/useFeedback.js";
import { useCompareChallenge } from "../../hooks/useCompareChallenge.js";
import { useGameProgression } from "../../hooks/useGameProgression.js";
import { WORLD2TER_CHALLENGES } from "../../data/challenges/world2ter.js";

const btn = (bg, fg = "#fff", px = "2rem") => ({
    padding: `0.75rem ${px}`,
    borderRadius: "1rem",
    fontSize: "1.125rem",
    fontWeight: 700,
    backgroundColor: bg,
    color: fg,
    border: "none",
    cursor: "pointer",
    fontFamily: "'Baloo 2', sans-serif",
});
const BTN_NEXT = btn("#6ee7b7", "#0f172a");
const BTN_RESET = btn("#6366f1", "#fff", "1.5rem");

/**
 * Monde 7 "Le Pont de Léna" — comparaison de fractions.
 *
 * Attendus (BO n°16, 2026) :
 *   CM1/CM2 : "Comparer des fractions"
 *   6ème    : "Établir des égalités · Comparer et encadrer · Ordonner"
 *
 * Mécanique :
 *   Phase "question" → CompareQuestion affiche fracA / fracB + boutons A / B / Égales
 *   Phase "revealed" → NumberLine double (valA + valB) après réponse correcte
 *
 * @param {{ onComplete?: function }} props
 */
function WorldBridge({ onComplete }) {
    const [showCorrection, setShowCorrection] = useState(false);
    const [starsEarned, setStarsEarned] = useState(0);
    const [showHintFlag, setShowHintFlag] = useState(false);

    const { feedback, showSuccess, showError, showHint } = useFeedback();
    const { challenge, index, total, phase, done, check, reveal, next, reset } =
        useCompareChallenge(WORLD2TER_CHALLENGES);
    const { recordResult } = useGameProgression();

    const handleAnswer = useCallback(
        (answer) => {
            if (showCorrection) return;
            const { correct, attempts, showHint: needHint } = check(answer);
            if (correct) {
                const stars = attempts === 1 ? 3 : attempts === 2 ? 2 : 1;
                setStarsEarned(stars);
                setShowCorrection(true);
                setShowHintFlag(false);
                recordResult(7, index, true, attempts);
                reveal();
                showSuccess(
                    attempts === 1
                        ? "Parfait ! Tu as compris d'un coup d'œil ! ⭐⭐⭐"
                        : `Bravo ! Trouvé en ${attempts} essais.`
                );
            } else {
                if (needHint) {
                    setShowHintFlag(true);
                    showHint(`${challenge.emoji} ${challenge.hint}`);
                } else {
                    showError(
                        "Pas tout à fait… Réfléchis à la taille des parts !"
                    );
                }
            }
        },
        [
            showCorrection,
            check,
            challenge,
            index,
            recordResult,
            reveal,
            showSuccess,
            showError,
            showHint,
        ]
    );

    const handleNext = useCallback(() => {
        setShowCorrection(false);
        setStarsEarned(0);
        setShowHintFlag(false);
        next();
    }, [next]);

    const handleReset = useCallback(() => {
        setShowCorrection(false);
        setStarsEarned(0);
        setShowHintFlag(false);
        reset();
    }, [reset]);

    // ── Écran de fin ──────────────────────────────────────────────────────────
    if (done) {
        return (
            <div
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "2rem",
                    background:
                        "linear-gradient(135deg, #1e1b4b 0%, #312e81 60%, #4c1d95 100%)",
                }}
            >
                <div className="text-center animate-bounce-in">
                    <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>
                        🌉
                    </div>
                    <h2
                        style={{
                            fontFamily: "'Baloo 2', sans-serif",
                            color: "#e0e7ff",
                            fontSize: "2rem",
                            fontWeight: 800,
                            margin: "0 0 0.5rem",
                        }}
                    >
                        Monde 7 terminé !
                    </h2>
                    <p
                        style={{
                            color: "#a5b4fc",
                            fontFamily: "'Nunito', sans-serif",
                            marginBottom: "1.5rem",
                            lineHeight: 1.5,
                        }}
                    >
                        Tu sais comparer des fractions — même quand le
                        dénominateur est plus grand !
                    </p>
                    <div
                        style={{
                            display: "flex",
                            gap: "1rem",
                            justifyContent: "center",
                            flexWrap: "wrap",
                        }}
                    >
                        <button onClick={handleReset} style={BTN_RESET}>
                            Rejouer 🔄
                        </button>
                        {onComplete && (
                            <button
                                onClick={onComplete}
                                style={btn("#6ee7b7", "#0f172a")}
                            >
                                La Route des Étoiles ⭐
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // ── Jeu principal ─────────────────────────────────────────────────────────
    return (
        <div
            style={{
                minHeight: "100vh",
                background:
                    "linear-gradient(160deg, #1e1b4b 0%, #2e1065 50%, #1e1b4b 100%)",
                padding: "1.5rem 1rem 2rem",
            }}
        >
            <main
                style={{
                    maxWidth: "36rem",
                    margin: "0 auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.25rem",
                }}
            >
                {/* En-tête */}
                <div style={{ textAlign: "center" }}>
                    <p
                        style={{
                            fontFamily: "'Baloo 2', sans-serif",
                            color: "#a5b4fc",
                            fontSize: "0.78rem",
                            fontWeight: 700,
                            letterSpacing: "0.08em",
                            margin: "0 0 0.25rem",
                        }}
                    >
                        MONDE 7 · LE PONT DE LÉNA
                    </p>
                    <h1
                        style={{
                            fontFamily: "'Baloo 2', sans-serif",
                            color: "#e0e7ff",
                            fontSize: "1.5rem",
                            fontWeight: 800,
                            margin: 0,
                            lineHeight: 1.2,
                        }}
                    >
                        Comparer des fractions
                    </h1>
                </div>

                {/* Contexte narratif */}
                <div
                    style={{
                        background: "rgba(255,255,255,0.06)",
                        borderRadius: "1.25rem",
                        border: "1.5px solid rgba(165,180,252,0.25)",
                        padding: "1.1rem 1.25rem",
                        display: "flex",
                        gap: "0.75rem",
                        alignItems: "flex-start",
                    }}
                >
                    <span style={{ fontSize: "1.75rem", lineHeight: 1 }}>
                        {challenge.emoji}
                    </span>
                    <p
                        style={{
                            fontFamily: "'Nunito', sans-serif",
                            color: "#c7d2fe",
                            fontSize: "0.95rem",
                            lineHeight: 1.6,
                            margin: 0,
                        }}
                    >
                        {challenge.context}
                    </p>
                </div>

                {/* Question de comparaison */}
                <CompareQuestion
                    challenge={challenge}
                    phase={phase}
                    onAnswer={handleAnswer}
                    showHint={showHintFlag}
                />

                {/* Actions post-réponse correcte */}
                {showCorrection && (
                    <div
                        className="flex flex-col items-center animate-float-up"
                        style={{ gap: "1rem" }}
                    >
                        <ProgressStars count={starsEarned} animate />
                        <button onClick={handleNext} style={BTN_NEXT}>
                            {index + 1 < total
                                ? "Défi suivant →"
                                : "Terminer le monde 🌉"}
                        </button>
                    </div>
                )}

                {/* Barre de progression */}
                <div
                    style={{
                        display: "flex",
                        gap: "0.4rem",
                        justifyContent: "center",
                        marginTop: "0.5rem",
                    }}
                >
                    {Array.from({ length: total }, (_, i) => (
                        <div
                            key={i}
                            className={i === index ? "animate-pulse-glow" : ""}
                            style={{
                                height: "0.4rem",
                                borderRadius: "999px",
                                transition: "all 0.3s",
                                width: i === index ? "2rem" : "1.25rem",
                                backgroundColor:
                                    i < index
                                        ? "#6ee7b7"
                                        : i === index
                                          ? "#818cf8"
                                          : "rgba(165,180,252,0.2)",
                            }}
                        />
                    ))}
                </div>
            </main>
            <FeedbackToast feedback={feedback} />
        </div>
    );
}

export default WorldBridge;

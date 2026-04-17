import { useState, useCallback } from "react";
import NumberLine from "../ui/NumberLine.jsx";
import FractionDisplay from "../ui/FractionDisplay.jsx";
import FractionBar from "../ui/FractionBar.jsx";
import FeedbackToast from "../ui/FeedbackToast.jsx";
import ProgressStars from "../ui/ProgressStars.jsx";
import { useFeedback } from "../../hooks/useFeedback.js";
import { useFractionChallenge } from "../../hooks/useFractionChallenge.js";
import { useGameProgression } from "../../hooks/useGameProgression.js";
import { WORLD1_CHALLENGES } from "../../data/challenges/world1.js";

/* Styles boutons inline — contourne Preflight Tailwind v4 sur <button> */
const btn = (bg, fg = "#2d1a08", px = "2rem") => ({
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
const BTN_VALIDATE = btn("#fbbf24");
const BTN_NEXT = btn("#10b981", "#ffffff");
const BTN_RESET = btn("#fbbf24", "#2d1a08", "1.5rem");

/**
 * Monde 1 "La Ferme de Mila" — sens fraction-partage (fractions ≤ 1).
 * Séquence : contexte narratif → FractionBar → FractionDisplay → NumberLine
 * @param {Object}   props
 * @param {function} [props.onComplete]
 */
function WorldFarm({ onComplete }) {
    const [answer, setAnswer] = useState(null);
    const [showCorrection, setShowCorrection] = useState(false);
    const [starsEarned, setStarsEarned] = useState(0);

    const { feedback, showSuccess, showError, showHint } = useFeedback();
    const { challenge, index, total, target, done, check, next, reset } =
        useFractionChallenge(WORLD1_CHALLENGES);
    const { recordResult } = useGameProgression();

    const handleAnswer = useCallback(
        (val) => {
            if (!showCorrection) setAnswer(val);
        },
        [showCorrection]
    );

    const handleValidate = useCallback(() => {
        if (answer === null) {
            showHint("Clique sur la droite pour placer ta fraction !");
            return;
        }
        const { correct, attempts, showHint: needHint } = check(answer);
        if (correct) {
            const stars = attempts === 1 ? 3 : attempts === 2 ? 2 : 1;
            setStarsEarned(stars);
            setShowCorrection(true);
            recordResult(1, index, true, attempts);
            showSuccess(
                attempts === 1
                    ? `Parfait ! Tu as trouvé exactement ! ⭐⭐⭐`
                    : `Bravo ! Tu as trouvé en ${attempts} essais.`
            );
        } else {
            if (needHint) showHint(`${challenge.emoji} ${challenge.hint}`);
            else showError("Pas tout à fait… Regarde bien la bande !");
            setAnswer(null);
        }
    }, [
        answer,
        check,
        challenge,
        index,
        recordResult,
        showSuccess,
        showError,
        showHint,
    ]);

    const handleNext = useCallback(() => {
        setAnswer(null);
        setShowCorrection(false);
        setStarsEarned(0);
        next();
    }, [next]);

    const handleReset = useCallback(() => {
        setAnswer(null);
        setShowCorrection(false);
        setStarsEarned(0);
        reset();
    }, [reset]);

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
                        "linear-gradient(135deg, #fdf6ec 0%, #fef3c7 100%)",
                }}
            >
                <div className="text-center animate-bounce-in">
                    <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>
                        🌾
                    </div>
                    <h2
                        style={{
                            fontFamily: "'Baloo 2', sans-serif",
                            color: "#5c3d1a",
                            fontSize: "2rem",
                            fontWeight: 800,
                            margin: "0 0 0.5rem",
                        }}
                    >
                        Monde 1 terminé !
                    </h2>
                    <p
                        style={{
                            color: "#9c6b30",
                            fontFamily: "'Nunito', sans-serif",
                            marginBottom: "1.5rem",
                        }}
                    >
                        Tu maîtrises la fraction-partage. La Route des Étoiles
                        t'attend…
                    </p>
                    <div
                        style={{
                            display: "flex",
                            gap: "0.75rem",
                            justifyContent: "center",
                        }}
                    >
                        <button onClick={handleReset} style={BTN_RESET}>
                            Rejouer
                        </button>
                        {onComplete && (
                            <button onClick={onComplete} style={BTN_NEXT}>
                                Monde suivant →
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            style={{
                minHeight: "100vh",
                padding: "1.5rem 1rem",
                background:
                    "linear-gradient(160deg, #fdf6ec 0%, #fef3c7 60%, #e0f2fe 100%)",
            }}
        >
            {/* En-tête monde */}
            <header
                style={{
                    maxWidth: "42rem",
                    margin: "0 auto 1.25rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <div>
                    <h1
                        style={{
                            fontFamily: "'Baloo 2', sans-serif",
                            color: "#5c3d1a",
                            fontSize: "1.5rem",
                            fontWeight: 800,
                            lineHeight: 1,
                            margin: 0,
                        }}
                    >
                        🌾 La Ferme de Mila
                    </h1>
                    <p
                        style={{
                            color: "#9c6b30",
                            fontFamily: "'Nunito', sans-serif",
                            fontSize: "0.8rem",
                            margin: "0.2rem 0 0",
                        }}
                    >
                        Monde 1 · Fraction-partage
                    </p>
                </div>
                <div
                    style={{
                        fontFamily: "'Nunito', sans-serif",
                        fontSize: "0.875rem",
                        color: "#9c6b30",
                        display: "flex",
                        gap: "0.2rem",
                        alignItems: "center",
                    }}
                >
                    <span>Défi</span>
                    <strong style={{ color: "#5c3d1a" }}>{index + 1}</strong>
                    <span>/</span>
                    <span>{total}</span>
                </div>
            </header>

            {/* Carte défi */}
            <main style={{ maxWidth: "42rem", margin: "0 auto" }}>
                <div
                    style={{
                        borderRadius: "1.5rem",
                        padding: "1.75rem",
                        backgroundColor: "#ffffff",
                        border: "2px solid #e8cfa4",
                        boxShadow: "0 8px 32px -4px rgba(92,61,26,0.22)",
                    }}
                >
                    {/* Contexte narratif */}
                    <div
                        className="animate-float-up"
                        style={{ textAlign: "center", marginBottom: "1.25rem" }}
                    >
                        <div
                            style={{
                                fontSize: "2.5rem",
                                marginBottom: "0.5rem",
                            }}
                        >
                            {challenge.emoji}
                        </div>
                        <p
                            style={{
                                fontFamily: "'Nunito', sans-serif",
                                color: "#5c3d1a",
                                fontSize: "1rem",
                                lineHeight: 1.5,
                                margin: 0,
                            }}
                        >
                            {challenge.context}
                        </p>
                    </div>

                    {/* Représentation visuelle (fraction-partage) */}
                    <div style={{ marginBottom: "1.25rem" }}>
                        <FractionBar
                            numerator={challenge.num}
                            denominator={challenge.den}
                            animate
                            size="md"
                            color="#f59e0b"
                        />
                    </div>

                    {/* Notation fractionnaire */}
                    <div style={{ textAlign: "center", marginBottom: "1rem" }}>
                        <FractionDisplay
                            numerator={challenge.num}
                            denominator={challenge.den}
                            size="lg"
                        />
                    </div>

                    {/* Droite numérique */}
                    <div style={{ marginBottom: "0.5rem" }}>
                        <NumberLine
                            min={0}
                            max={challenge.max}
                            denominator={challenge.den}
                            value={answer}
                            onChange={handleAnswer}
                            showDecomposition={false}
                            disabled={showCorrection}
                            targetValue={showCorrection ? target : null}
                        />
                    </div>

                    {/* Actions */}
                    {!showCorrection ? (
                        <div
                            className="flex justify-center"
                            style={{ marginTop: "1.5rem" }}
                        >
                            <button
                                onClick={handleValidate}
                                style={BTN_VALIDATE}
                                className="animate-pulse-glow"
                            >
                                Valider ✓
                            </button>
                        </div>
                    ) : (
                        <div
                            className="flex flex-col items-center animate-float-up"
                            style={{ gap: "1rem", marginTop: "1.5rem" }}
                        >
                            <ProgressStars count={starsEarned} animate />
                            <button onClick={handleNext} style={BTN_NEXT}>
                                {index + 1 < total
                                    ? "Défi suivant →"
                                    : "Terminer le monde 🌾"}
                            </button>
                        </div>
                    )}
                </div>

                {/* Barre de progression */}
                <div
                    style={{
                        display: "flex",
                        gap: "0.4rem",
                        justifyContent: "center",
                        marginTop: "1.1rem",
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
                                        ? "#34d399"
                                        : i === index
                                          ? "#fbbf24"
                                          : "#e8cfa4",
                            }}
                        />
                    ))}
                </div>
            </main>

            <FeedbackToast feedback={feedback} />
        </div>
    );
}

export default WorldFarm;

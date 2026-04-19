import { useState, useCallback } from "react";
import NumberLine from "../ui/NumberLine.jsx";
import FractionEquation from "../ui/FractionEquation.jsx";
import FeedbackToast from "../ui/FeedbackToast.jsx";
import ProgressStars from "../ui/ProgressStars.jsx";
import { useFeedback } from "../../hooks/useFeedback.js";
import { useAdditionChallenge } from "../../hooks/useAdditionChallenge.js";
import { useGameProgression } from "../../hooks/useGameProgression.js";
import { WORLD2BIS_CHALLENGES } from "../../data/challenges/world2bis.js";

const btn = (bg, fg = "#1e1b4b", px = "2rem") => ({
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
const BTN_VALIDATE = btn("#fbbf24", "#1e1b4b");
const BTN_NEXT = btn("#10b981", "#fff");
const BTN_RESET = btn("#fbbf24", "#1e1b4b", "1.5rem");

/**
 * Monde 2bis "Le Grenier de Koro" — addition et soustraction de fractions.
 *
 * Attendu CM2 (BO n°16, 2025) :
 * "Additionner et soustraire des fractions ayant le même dénominateur."
 *
 * Mécanique : FractionEquation affiche a/n ± b/n = ?/n.
 * L'élève place le résultat sur la demi-droite.
 * DecompBubble si résultat > 1 (palier 2) — cohérence avec WorldRoad.
 *
 * @param {{ onComplete?: function }} props
 */
function WorldGranary({ onComplete }) {
    const [answer, setAnswer] = useState(null);
    const [showCorrection, setShowCorrection] = useState(false);
    const [starsEarned, setStarsEarned] = useState(0);

    const { feedback, showSuccess, showError, showHint } = useFeedback();
    const { challenge, index, total, target, done, check, next, reset } =
        useAdditionChallenge(WORLD2BIS_CHALLENGES);
    const { recordResult } = useGameProgression();

    const resultNum = challenge
        ? challenge.op === "+"
            ? challenge.num1 + challenge.num2
            : challenge.num1 - challenge.num2
        : 0;

    const handleAnswer = useCallback(
        (val) => {
            if (!showCorrection) setAnswer(val);
        },
        [showCorrection]
    );

    const handleValidate = useCallback(() => {
        if (answer === null) {
            showHint("Clique sur la demi-droite pour placer ton résultat !");
            return;
        }
        const { correct, attempts, showHint: needHint } = check(answer);
        if (correct) {
            const stars = attempts === 1 ? 3 : attempts === 2 ? 2 : 1;
            setStarsEarned(stars);
            setShowCorrection(true);
            recordResult(6, index, true, attempts);
            showSuccess(
                attempts === 1
                    ? "Parfait ! Calcul exact du premier coup ! ⭐⭐⭐"
                    : `Bravo ! Trouvé en ${attempts} essais.`
            );
        } else {
            if (needHint) showHint(`${challenge.emoji} ${challenge.hint}`);
            else showError("Pas tout à fait… Relis bien l'équation !");
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
                        "linear-gradient(135deg, #fffbeb 0%, #fef3c7 60%, #fde68a 100%)",
                }}
            >
                <div className="text-center animate-bounce-in">
                    <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>
                        🫙
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
                        Monde 2bis terminé !
                    </h2>
                    <p
                        style={{
                            color: "#9c6b30",
                            fontFamily: "'Nunito', sans-serif",
                            marginBottom: "1.5rem",
                        }}
                    >
                        Tu maîtrises l'addition et la soustraction de fractions.
                        La Route des Étoiles t'attend !
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
                    "linear-gradient(160deg, #1c1004 0%, #2d1a08 55%, #3d2210 100%)",
            }}
        >
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
                            color: "#fef3c7",
                            fontSize: "1.5rem",
                            fontWeight: 800,
                            lineHeight: 1,
                            margin: 0,
                        }}
                    >
                        🫙 Le Grenier de Koro
                    </h1>
                    <p
                        style={{
                            color: "#fcd34d",
                            fontFamily: "'Nunito', sans-serif",
                            fontSize: "0.8rem",
                            margin: "0.2rem 0 0",
                        }}
                    >
                        Défi {index + 1} / {total}
                    </p>
                </div>
            </header>

            <main style={{ maxWidth: "42rem", margin: "0 auto" }}>
                <div
                    style={{
                        background: "rgba(255,255,255,0.05)",
                        borderRadius: "1.5rem",
                        border: "1px solid rgba(251,191,36,0.2)",
                        padding: "1.5rem 1.25rem",
                    }}
                >
                    {/* Contexte narratif */}
                    <div
                        style={{
                            background: "rgba(255,255,255,0.05)",
                            borderRadius: "1rem",
                            padding: "1rem",
                            marginBottom: "1.25rem",
                            display: "flex",
                            gap: "0.75rem",
                            alignItems: "flex-start",
                        }}
                    >
                        <div
                            style={{
                                fontSize: "1.75rem",
                                lineHeight: 1,
                                flexShrink: 0,
                            }}
                        >
                            {challenge.emoji}
                        </div>
                        <p
                            style={{
                                fontFamily: "'Nunito', sans-serif",
                                color: "#fef3c7",
                                fontSize: "1rem",
                                lineHeight: 1.5,
                                margin: 0,
                            }}
                        >
                            {challenge.context}
                        </p>
                    </div>

                    {/* Équation */}
                    <div style={{ marginBottom: "1.25rem" }}>
                        <FractionEquation
                            num1={challenge.num1}
                            num2={challenge.num2}
                            den={challenge.den}
                            op={challenge.op}
                            showResult={showCorrection}
                            resultNum={resultNum}
                        />
                    </div>

                    {/* Demi-droite */}
                    <div style={{ marginBottom: "0.5rem" }}>
                        <NumberLine
                            min={0}
                            max={challenge.max}
                            denominator={challenge.den}
                            value={answer}
                            onChange={handleAnswer}
                            showDecomposition
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
                                    : "Terminer le monde 🫙"}
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
                                          : "rgba(251,191,36,0.2)",
                            }}
                        />
                    ))}
                </div>
            </main>

            <FeedbackToast feedback={feedback} />
        </div>
    );
}

export default WorldGranary;

import { useState, useCallback } from "react";
import FractionDisplay from "../ui/FractionDisplay.jsx";
import FractionBar from "../ui/FractionBar.jsx";
import FractionDisc from "../ui/FractionDisc.jsx";
import FractionTriangle from "../ui/FractionTriangle.jsx";
import DualRepresentation from "../ui/DualRepresentation.jsx";
import NumberLine from "../ui/NumberLine.jsx";
import FeedbackToast from "../ui/FeedbackToast.jsx";
import ProgressStars from "../ui/ProgressStars.jsx";
import { useFeedback } from "../../hooks/useFeedback.js";
import { useFractionChallenge } from "../../hooks/useFractionChallenge.js";
import { useGameProgression } from "../../hooks/useGameProgression.js";
import { WORLD1_CHALLENGES } from "../../data/challenges/world1.js";

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
 *
 * Sprint C : FractionDisc / FractionTriangle en rotation post-réponse (index ≥ 2).
 * Sprint F : DualRepresentation (FractionBar + NumberLine liées) pour tous les défis
 *   post-réponse — remplace l'affichage séparé des deux représentations.
 *   Principe Tricot + Rau (2017) : correspondance explicite visible uniquement après.
 *
 * @param {{ onComplete?: function }} props
 */
function WorldFarm({ onComplete }) {
    const [answer, setAnswer] = useState(null);
    const [showCorrection, setShowCorrection] = useState(false);
    const [starsEarned, setStarsEarned] = useState(0);

    const { feedback, showSuccess, showError, showHint } = useFeedback();
    const { challenge, index, total, target, done, check, next, reset } =
        useFractionChallenge(WORLD1_CHALLENGES);
    const { recordResult } = useGameProgression();

    // Sprint C — représentation supplémentaire post-réponse (paliers 2-3)
    const extraRep =
        showCorrection && index >= 2
            ? index % 2 === 0
                ? "disc"
                : "triangle"
            : null;

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
            setStarsEarned(attempts === 1 ? 3 : attempts === 2 ? 2 : 1);
            setShowCorrection(true);
            recordResult(1, index, true, attempts);
            showSuccess(
                attempts === 1
                    ? "Parfait ! Tu as trouvé exactement ! ⭐⭐⭐"
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
                        "linear-gradient(135deg,#fdf6ec 0%,#fef3c7 100%)",
                }}
            >
                <div className="text-center animate-bounce-in">
                    <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>
                        🌾
                    </div>
                    <h2
                        style={{
                            fontFamily: "'Baloo 2',sans-serif",
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
                            fontFamily: "'Nunito',sans-serif",
                            marginBottom: "1.5rem",
                        }}
                    >
                        Tu maîtrises la fraction-partage. L'Atelier de Koro
                        t'attend !
                    </p>
                    <div
                        style={{
                            display: "flex",
                            gap: "1rem",
                            justifyContent: "center",
                        }}
                    >
                        <button onClick={handleReset} style={BTN_RESET}>
                            Rejouer 🔄
                        </button>
                        {onComplete && (
                            <button
                                onClick={onComplete}
                                style={btn("#10b981", "#fff")}
                            >
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
                background:
                    "linear-gradient(160deg,#fdf6ec 0%,#fef3c7 55%,#fde68a 100%)",
                padding: "1.5rem 1rem 2rem",
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
                            fontFamily: "'Baloo 2',sans-serif",
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
                            fontFamily: "'Nunito',sans-serif",
                            fontSize: ".8rem",
                            margin: ".2rem 0 0",
                        }}
                    >
                        Monde 1 · Fraction-partage
                    </p>
                </div>
                <div
                    style={{
                        fontFamily: "'Nunito',sans-serif",
                        fontSize: ".875rem",
                        color: "#9c6b30",
                        display: "flex",
                        gap: ".2rem",
                    }}
                >
                    <span>Défi</span>
                    <strong style={{ color: "#5c3d1a" }}>{index + 1}</strong>
                    <span>/</span>
                    <span>{total}</span>
                </div>
            </header>

            <main style={{ maxWidth: "42rem", margin: "0 auto" }}>
                <div
                    style={{
                        borderRadius: "1.5rem",
                        padding: "1.75rem",
                        background: "#fffbf0",
                        border: "2px solid #e8cfa4",
                        boxShadow: "0 8px 32px -4px rgba(92,61,26,0.18)",
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                    }}
                >
                    {/* Contexte */}
                    <div
                        className="animate-float-up"
                        style={{ textAlign: "center" }}
                    >
                        <div
                            style={{
                                fontSize: "2.5rem",
                                marginBottom: ".5rem",
                            }}
                        >
                            {challenge.emoji}
                        </div>
                        <p
                            style={{
                                fontFamily: "'Nunito',sans-serif",
                                color: "#5c3d1a",
                                fontSize: "1rem",
                                lineHeight: 1.5,
                                margin: 0,
                            }}
                        >
                            {challenge.context}
                        </p>
                    </div>

                    {/* Pendant le défi : FractionBar + FractionDisplay + NumberLine séparés */}
                    {!showCorrection && (
                        <>
                            <FractionBar
                                numerator={challenge.num}
                                denominator={challenge.den}
                                animate
                                size="md"
                                color="#f59e0b"
                            />
                            <div style={{ textAlign: "center" }}>
                                <FractionDisplay
                                    numerator={challenge.num}
                                    denominator={challenge.den}
                                    size="lg"
                                />
                            </div>
                            <NumberLine
                                min={0}
                                max={challenge.max}
                                denominator={challenge.den}
                                value={answer}
                                onChange={handleAnswer}
                                showDecomposition={false}
                                disabled={false}
                                targetValue={null}
                            />
                            <div className="flex justify-center">
                                <button
                                    onClick={handleValidate}
                                    style={BTN_VALIDATE}
                                    className="animate-pulse-glow"
                                >
                                    Valider ✓
                                </button>
                            </div>
                        </>
                    )}

                    {/* Post-réponse : Sprint F — DualRepresentation (Barre ↔ Droite liées) */}
                    {showCorrection && (
                        <>
                            <DualRepresentation
                                numerator={challenge.num}
                                denominator={challenge.den}
                                target={target}
                                max={challenge.max}
                                color="#f59e0b"
                            />
                            {/* Sprint C — représentation supplémentaire (paliers 2-3) */}
                            {extraRep && (
                                <div
                                    className="animate-float-up"
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        gap: ".4rem",
                                        padding: ".75rem",
                                        background: "rgba(245,158,11,0.08)",
                                        borderRadius: "1rem",
                                        border: "1px solid rgba(245,158,11,0.22)",
                                    }}
                                >
                                    <p
                                        style={{
                                            fontFamily: "'Nunito',sans-serif",
                                            fontSize: ".72rem",
                                            color: "#92400e",
                                            margin: 0,
                                        }}
                                    >
                                        ③{" "}
                                        {extraRep === "disc"
                                            ? "Disque"
                                            : "Triangle"}{" "}
                                        — autre représentation :
                                    </p>
                                    {extraRep === "disc" ? (
                                        <FractionDisc
                                            numerator={challenge.num}
                                            denominator={challenge.den}
                                            color="#f59e0b"
                                            size="md"
                                            animate
                                        />
                                    ) : (
                                        <FractionTriangle
                                            numerator={challenge.num}
                                            denominator={challenge.den}
                                            color="#f59e0b"
                                            size="md"
                                            animate
                                        />
                                    )}
                                </div>
                            )}
                            <div
                                className="flex flex-col items-center animate-float-up"
                                style={{ gap: "1rem" }}
                            >
                                <ProgressStars count={starsEarned} animate />
                                <button onClick={handleNext} style={BTN_NEXT}>
                                    {index + 1 < total
                                        ? "Défi suivant →"
                                        : "Terminer le monde 🌾"}
                                </button>
                            </div>
                        </>
                    )}
                </div>

                <div
                    style={{
                        display: "flex",
                        gap: ".4rem",
                        justifyContent: "center",
                        marginTop: "1.1rem",
                    }}
                >
                    {Array.from({ length: total }, (_, i) => (
                        <div
                            key={i}
                            className={i === index ? "animate-pulse-glow" : ""}
                            style={{
                                height: ".4rem",
                                borderRadius: "999px",
                                transition: "all .3s",
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

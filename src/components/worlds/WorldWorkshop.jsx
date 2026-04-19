import { useState, useCallback } from "react";
import NumberLine from "../ui/NumberLine.jsx";
import FractionDisplay from "../ui/FractionDisplay.jsx";
import MeasureRuler from "../ui/MeasureRuler.jsx";
import FeedbackToast from "../ui/FeedbackToast.jsx";
import ProgressStars from "../ui/ProgressStars.jsx";
import { useFeedback } from "../../hooks/useFeedback.js";
import { useOperatorChallenge } from "../../hooks/useOperatorChallenge.js";
import { useGameProgression } from "../../hooks/useGameProgression.js";
import { WORLD2_CHALLENGES } from "../../data/challenges/world2.js";

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
const BTN_VALIDATE = btn("#f59e0b");
const BTN_NEXT = btn("#10b981", "#fff");
const BTN_RESET = btn("#f59e0b", "#1e1b4b", "1.5rem");

const fmt = (n) =>
    Number.isInteger(n)
        ? String(n)
        : n.toFixed(2).replace(".", ",").replace(/0$/, "");

/**
 * Monde 2 "L'Atelier de Koro" — fraction-mesure (palier 0) et fraction-opérateur.
 *
 * Sprint 3 — affichage conditionnel selon `challenge.sense` :
 * - `sense === "mesure"` → MeasureRuler (la fraction est le résultat du mesurage)
 * - sans `sense`         → équation num/den × total = ? (comportement historique)
 *
 * useOperatorChallenge reste inchangé : pour les défis mesure (total=1),
 * target = (num/den) × 1 = num/den, ce qui est correct.
 *
 * @param {{ onComplete?: function }} props
 */
function WorldWorkshop({ onComplete }) {
    const [answer, setAnswer] = useState(null);
    const [showCorrection, setShowCorrection] = useState(false);
    const [starsEarned, setStarsEarned] = useState(0);

    const { feedback, showSuccess, showError, showHint } = useFeedback();
    const { challenge, index, total, target, done, check, next, reset } =
        useOperatorChallenge(WORLD2_CHALLENGES);
    const { recordResult } = useGameProgression();

    const isMesure = challenge?.sense === "mesure";

    const handleAnswer = useCallback(
        (val) => {
            if (!showCorrection) setAnswer(val);
        },
        [showCorrection]
    );

    const handleValidate = useCallback(() => {
        if (answer === null) {
            showHint("Clique sur la demi-droite pour placer ta réponse !");
            return;
        }
        const { correct, attempts, showHint: needHint } = check(answer);
        if (correct) {
            const stars = attempts === 1 ? 3 : attempts === 2 ? 2 : 1;
            setStarsEarned(stars);
            setShowCorrection(true);
            recordResult(2, index, true, attempts);
            showSuccess(
                attempts === 1
                    ? "Parfait ! Bonne réponse du premier coup ! ⭐⭐⭐"
                    : `Bravo ! Trouvé en ${attempts} essais.`
            );
        } else {
            if (needHint) showHint(`${challenge.emoji} ${challenge.hint}`);
            else
                showError(
                    isMesure
                        ? "Pas tout à fait… Regarde bien la règle !"
                        : "Pas tout à fait… Relis bien la mesure totale !"
                );
            setAnswer(null);
        }
    }, [
        answer,
        check,
        challenge,
        index,
        isMesure,
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
                        "linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)",
                }}
            >
                <div className="text-center animate-bounce-in">
                    <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>
                        🔨
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
                        Monde 2 terminé !
                    </h2>
                    <p
                        style={{
                            color: "#9c6b30",
                            fontFamily: "'Nunito', sans-serif",
                            marginBottom: "1.5rem",
                        }}
                    >
                        Tu maîtrises la fraction-mesure et la
                        fraction-opérateur. La Route des Étoiles t'attend !
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
                    "linear-gradient(160deg, #fffbeb 0%, #fef3c7 55%, #fde68a 100%)",
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
                            color: "#5c3d1a",
                            fontSize: "1.5rem",
                            fontWeight: 800,
                            lineHeight: 1,
                            margin: 0,
                        }}
                    >
                        🔨 L'Atelier de Koro
                    </h1>
                    <p
                        style={{
                            color: "#9c6b30",
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
                        borderRadius: "1.5rem",
                        padding: "1.75rem",
                        backgroundColor: "#fff",
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

                    {/* Affichage conditionnel selon le sens */}
                    {isMesure ? (
                        /* Sens mesure : règle SVG + fraction */
                        <div style={{ marginBottom: "1.25rem" }}>
                            <MeasureRuler
                                numerator={challenge.num}
                                denominator={challenge.den}
                                unit={challenge.unit}
                            />
                            <div
                                style={{
                                    textAlign: "center",
                                    marginTop: "0.5rem",
                                }}
                            >
                                <FractionDisplay
                                    numerator={challenge.num}
                                    denominator={challenge.den}
                                    size="lg"
                                />
                            </div>
                        </div>
                    ) : (
                        /* Sens opérateur : équation num/den × total unit = ? unit
                           Unités affichées en ligne (baseline) — jamais en dessous
                           d'un chiffre pour éviter toute confusion avec un dénominateur. */
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "0.6rem",
                                marginBottom: "1.25rem",
                                flexWrap: "wrap",
                            }}
                        >
                            <FractionDisplay
                                numerator={challenge.num}
                                denominator={challenge.den}
                                size="lg"
                            />
                            <span
                                style={{
                                    fontFamily: "'Baloo 2', sans-serif",
                                    fontSize: "2rem",
                                    fontWeight: 800,
                                    color: "#b45309",
                                }}
                            >
                                ×
                            </span>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "baseline",
                                    gap: "0.25rem",
                                }}
                            >
                                <span
                                    style={{
                                        fontFamily: "'Baloo 2', sans-serif",
                                        fontSize: "2.5rem",
                                        fontWeight: 800,
                                        color: "#5c3d1a",
                                    }}
                                >
                                    {challenge.total}
                                </span>
                                <span
                                    style={{
                                        fontFamily: "'Nunito', sans-serif",
                                        fontSize: "1rem",
                                        color: "#9c6b30",
                                        fontWeight: 600,
                                    }}
                                >
                                    {challenge.unit}
                                </span>
                            </div>
                            <span
                                style={{
                                    fontFamily: "'Baloo 2', sans-serif",
                                    fontSize: "2rem",
                                    fontWeight: 800,
                                    color: "#b45309",
                                }}
                            >
                                =
                            </span>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "baseline",
                                    gap: "0.25rem",
                                }}
                            >
                                <span
                                    style={{
                                        fontFamily: "'Baloo 2', sans-serif",
                                        fontSize: "2.5rem",
                                        fontWeight: 800,
                                        color: showCorrection
                                            ? "#059669"
                                            : "#d97706",
                                    }}
                                >
                                    {showCorrection ? fmt(target) : "?"}
                                </span>
                                {showCorrection && (
                                    <span
                                        style={{
                                            fontFamily: "'Nunito', sans-serif",
                                            fontSize: "1rem",
                                            color: "#059669",
                                            fontWeight: 600,
                                        }}
                                    >
                                        {challenge.unit}
                                    </span>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Demi-droite */}
                    <div style={{ marginBottom: "0.5rem" }}>
                        <NumberLine
                            min={0}
                            max={challenge.total}
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
                                    : "Terminer le monde 🔨"}
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
                                          ? "#f59e0b"
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

export default WorldWorkshop;

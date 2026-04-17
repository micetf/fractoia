import { useState, useCallback } from "react";
import NumberLine from "../ui/NumberLine.jsx";
import FractionDisplay from "../ui/FractionDisplay.jsx";
import FeedbackToast from "../ui/FeedbackToast.jsx";
import ProgressStars from "../ui/ProgressStars.jsx";
import { useFeedback } from "../../hooks/useFeedback.js";
import { useFractionChallenge } from "../../hooks/useFractionChallenge.js";
import { useGameProgression } from "../../hooks/useGameProgression.js";
import { WORLD4_CHALLENGES } from "../../data/challenges/world4.js";

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
const BTN_VALIDATE = btn("#fb923c");
const BTN_NEXT = btn("#10b981", "#fff");
const BTN_RESET = btn("#fb923c", "#2d1a08", "1.5rem");

/**
 * Monde 4 "Le Marché de Sao" — sens fraction-quotient.
 *
 * Mécanique : l'élève voit le partage équitable `objects ÷ people`
 * et place la fraction résultante sur la droite numérique.
 *
 * Pivot pédagogique : dès le défi 3, `objects > people` → résultat > 1.
 * La rupture "on peut partager plus que l'unité" se produit naturellement
 * dans un contexte de marché (3 citrons pour 2 marchands = 1,5 chacun).
 *
 * showDecomposition=true : DecompBubble visible dès que la part > 1.
 * Aucune FractionBar : le sens partage-d'un-tout n'est pas le propos ici.
 *
 * @param {Object}   props
 * @param {function} [props.onComplete]
 */
function WorldMarket({ onComplete }) {
    const [answer, setAnswer] = useState(null);
    const [showCorrection, setShowCorrection] = useState(false);
    const [starsEarned, setStarsEarned] = useState(0);

    const { feedback, showSuccess, showError, showHint } = useFeedback();
    const { challenge, index, total, target, done, check, next, reset } =
        useFractionChallenge(WORLD4_CHALLENGES);
    const { recordResult } = useGameProgression();

    const handleAnswer = useCallback(
        (val) => {
            if (!showCorrection) setAnswer(val);
        },
        [showCorrection]
    );

    const handleValidate = useCallback(() => {
        if (answer === null) {
            showHint("Clique sur la droite pour placer la part de chacun !");
            return;
        }
        const { correct, attempts, showHint: needHint } = check(answer);
        if (correct) {
            const stars = attempts === 1 ? 3 : attempts === 2 ? 2 : 1;
            setStarsEarned(stars);
            setShowCorrection(true);
            recordResult(4, index, true, attempts);
            showSuccess(
                attempts === 1
                    ? "Parfait ! Partage équitable réussi ! ⭐⭐⭐"
                    : `Bravo ! Trouvé en ${attempts} essais.`
            );
        } else {
            if (needHint) showHint(`${challenge.emoji} ${challenge.hint}`);
            else
                showError(
                    "Pas tout à fait… Combien chacun reçoit-il exactement ?"
                );
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
                        "linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)",
                }}
            >
                <div className="text-center animate-bounce-in">
                    <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>
                        🏪
                    </div>
                    <h2
                        style={{
                            fontFamily: "'Baloo 2', sans-serif",
                            color: "#7c2d12",
                            fontSize: "2rem",
                            fontWeight: 800,
                            margin: "0 0 0.5rem",
                        }}
                    >
                        Monde 4 terminé !
                    </h2>
                    <p
                        style={{
                            color: "#c2410c",
                            fontFamily: "'Nunito', sans-serif",
                            marginBottom: "1.5rem",
                        }}
                    >
                        Tu maîtrises la fraction-quotient. Le Grand Festival
                        t'appelle !
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
                    "linear-gradient(160deg, #fff7ed 0%, #ffedd5 55%, #fef3c7 100%)",
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
                            color: "#7c2d12",
                            fontSize: "1.5rem",
                            fontWeight: 800,
                            lineHeight: 1,
                            margin: 0,
                        }}
                    >
                        🏪 Le Marché de Sao
                    </h1>
                    <p
                        style={{
                            color: "#c2410c",
                            fontFamily: "'Nunito', sans-serif",
                            fontSize: "0.8rem",
                            margin: "0.2rem 0 0",
                        }}
                    >
                        Monde 4 · Fraction-quotient
                    </p>
                </div>
                <div
                    style={{
                        fontFamily: "'Nunito', sans-serif",
                        fontSize: "0.875rem",
                        color: "#c2410c",
                        display: "flex",
                        gap: "0.2rem",
                        alignItems: "center",
                    }}
                >
                    <span>Défi</span>
                    <strong style={{ color: "#7c2d12" }}>{index + 1}</strong>
                    <span>/</span>
                    <span>{total}</span>
                </div>
            </header>

            <main style={{ maxWidth: "42rem", margin: "0 auto" }}>
                <div
                    style={{
                        borderRadius: "1.5rem",
                        padding: "1.75rem",
                        backgroundColor: "#fff",
                        border: "2px solid #fed7aa",
                        boxShadow: "0 8px 32px -4px rgba(124,45,18,0.18)",
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
                                color: "#7c2d12",
                                fontSize: "1rem",
                                lineHeight: 1.5,
                                margin: 0,
                            }}
                        >
                            {challenge.context}
                        </p>
                    </div>

                    {/* Équation quotient : objects ÷ people = fraction */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "0.75rem",
                            marginBottom: "1.25rem",
                            flexWrap: "wrap",
                            padding: "0.75rem",
                            backgroundColor: "#fff7ed",
                            borderRadius: "1rem",
                            border: "1.5px solid #fed7aa",
                        }}
                    >
                        <span
                            style={{
                                fontFamily: "'Baloo 2', sans-serif",
                                fontSize: "2.5rem",
                                fontWeight: 800,
                                color: "#7c2d12",
                            }}
                        >
                            {challenge.objects}
                        </span>
                        <span
                            style={{
                                fontFamily: "'Baloo 2', sans-serif",
                                fontSize: "2rem",
                                fontWeight: 800,
                                color: "#ea580c",
                            }}
                        >
                            ÷
                        </span>
                        <span
                            style={{
                                fontFamily: "'Baloo 2', sans-serif",
                                fontSize: "2.5rem",
                                fontWeight: 800,
                                color: "#7c2d12",
                            }}
                        >
                            {challenge.people}
                        </span>
                        <span
                            style={{
                                fontFamily: "'Baloo 2', sans-serif",
                                fontSize: "2rem",
                                fontWeight: 800,
                                color: "#ea580c",
                            }}
                        >
                            =
                        </span>
                        <FractionDisplay
                            numerator={challenge.num}
                            denominator={challenge.den}
                            size="lg"
                            color="#7c2d12"
                            barColor="#ea580c"
                        />
                    </div>

                    {/* Droite numérique — showDecomposition car résultat peut être > 1 */}
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
                                    : "Terminer le monde 🏪"}
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
                                          ? "#fb923c"
                                          : "#fed7aa",
                            }}
                        />
                    ))}
                </div>
            </main>

            <FeedbackToast feedback={feedback} />
        </div>
    );
}

export default WorldMarket;

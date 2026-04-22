import { useState, useCallback } from "react";
import NumberLine from "../ui/NumberLine.jsx";
import FractionDisplay from "../ui/FractionDisplay.jsx";
import FractionBar from "../ui/FractionBar.jsx";
import DecimalInput from "../ui/DecimalInput.jsx";
import FeedbackToast from "../ui/FeedbackToast.jsx";
import ProgressStars from "../ui/ProgressStars.jsx";
import { useFeedback } from "../../hooks/useFeedback.js";
import { useFractionChallenge } from "../../hooks/useFractionChallenge.js";
import { useGameProgression } from "../../hooks/useGameProgression.js";
import { WORLD5_CHALLENGES } from "../../data/challenges/world5.js";

const btn = (bg, fg = "#1a0836", px = "2rem") => ({
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
const BTN_VALIDATE = btn("#fbbf24", "#1a0836");
const BTN_NEXT = btn("#f9a8d4", "#831843");
const BTN_RESET = btn("#fbbf24", "#1a0836", "1.5rem");

const SENSE_BADGE = {
    partage: { label: "Fraction-partage", bg: "#fef3c7", color: "#92400e" },
    mesure: { label: "Fraction-mesure", bg: "#dbeafe", color: "#1e40af" },
    magnitude: { label: "Fraction-magnitude", bg: "#ede9fe", color: "#5b21b6" },
    quotient: { label: "Fraction-quotient", bg: "#d1fae5", color: "#065f46" },
    "decimal-auto": {
        label: "Automatisme décimal",
        bg: "#fce7f3",
        color: "#9d174d",
    },
    "equality-gap": {
        label: "Égalité à trous",
        bg: "#fff7ed",
        color: "#9a3412",
    },
};

/**
 * Monde 5 "Le Grand Festival" — synthèse des 4 sens + automatismes 6ème.
 *
 * Sprint B — deux nouveaux modes via `sense` :
 *   decimal-auto  → DecimalInput (onChange) + bouton Valider du parent
 *   equality-gap  → équation + 4 boutons fraction inline (validation immédiate)
 *
 * Interface DecimalInput : onChange(float|null) à chaque frappe → stocké dans `answer`.
 * Clé `key={index}` sur DecimalInput pour réinitialiser l'input à chaque défi.
 *
 * @param {{ onComplete?: function }} props
 */
function WorldFestival({ onComplete }) {
    const [answer, setAnswer] = useState(null);
    const [showCorrection, setShowCorrection] = useState(false);
    const [starsEarned, setStarsEarned] = useState(0);

    const { feedback, showSuccess, showError, showHint } = useFeedback();
    const { challenge, index, total, done, check, next, reset } =
        useFractionChallenge(WORLD5_CHALLENGES);
    const { recordResult } = useGameProgression();

    const sense = challenge?.sense ?? "partage";
    const isEquality = sense === "equality-gap";
    const isDecimal = sense === "decimal-auto";
    const isStandard = !isDecimal && !isEquality;
    const showDecomp =
        isStandard && challenge ? challenge.num > challenge.den : false;
    const badge = challenge ? (SENSE_BADGE[sense] ?? null) : null;

    /** Logique de validation partagée — cible = num/den (useFractionChallenge). */
    const runCheck = useCallback(
        (floatValue) => {
            if (showCorrection) return;
            const { correct, attempts, showHint: needHint } = check(floatValue);
            if (correct) {
                setStarsEarned(attempts === 1 ? 3 : attempts === 2 ? 2 : 1);
                setShowCorrection(true);
                recordResult(5, index, true, attempts);
                showSuccess(
                    attempts === 1
                        ? "Magnifique ! Parfait ! ⭐⭐⭐"
                        : `Bravo ! Trouvé en ${attempts} essais.`
                );
            } else {
                if (needHint) {
                    showHint(`${challenge.emoji} ${challenge.hint}`);
                } else {
                    showError("Pas tout à fait… Lis bien la situation !");
                    setAnswer(null);
                }
            }
        },
        [
            showCorrection,
            check,
            challenge,
            index,
            recordResult,
            showSuccess,
            showError,
            showHint,
        ]
    );

    const handleAnswer = useCallback(
        (val) => {
            if (!showCorrection) setAnswer(val);
        },
        [showCorrection]
    );
    const handleValidate = useCallback(() => {
        if (answer === null) {
            showHint(
                isDecimal
                    ? "Entre un nombre décimal avec une virgule !"
                    : "Clique sur la droite pour placer ta fraction !"
            );
            return;
        }
        runCheck(answer);
    }, [answer, isDecimal, showHint, runCheck]);

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
                        "linear-gradient(135deg,#1a0836 0%,#3b0764 60%,#701a75 100%)",
                }}
            >
                <div className="text-center animate-bounce-in">
                    <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>
                        🎪
                    </div>
                    <h2
                        style={{
                            fontFamily: "'Baloo 2',sans-serif",
                            color: "#fdf4ff",
                            fontSize: "2rem",
                            fontWeight: 800,
                            margin: "0 0 .5rem",
                        }}
                    >
                        Le Grand Festival terminé !
                    </h2>
                    <p
                        style={{
                            color: "#f0abfc",
                            fontFamily: "'Nunito',sans-serif",
                            marginBottom: "1.5rem",
                        }}
                    >
                        Tu maîtrises tous les sens de la fraction. Incroyable !
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
                                style={btn("#f0abfc", "#831843")}
                            >
                                Terminer ✨
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
                    "linear-gradient(160deg,#1a0836 0%,#3b0764 50%,#1a0836 100%)",
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
                            color: "#fdf4ff",
                            fontSize: "1.5rem",
                            fontWeight: 800,
                            lineHeight: 1,
                            margin: 0,
                        }}
                    >
                        🎪 Le Grand Festival
                    </h1>
                    <p
                        style={{
                            color: "#f0abfc",
                            fontFamily: "'Nunito',sans-serif",
                            fontSize: ".8rem",
                            margin: ".2rem 0 0",
                        }}
                    >
                        Monde 5 · Synthèse — tous les sens
                    </p>
                </div>
                <div
                    style={{
                        fontFamily: "'Nunito',sans-serif",
                        fontSize: ".875rem",
                        color: "#f0abfc",
                        display: "flex",
                        gap: ".2rem",
                        alignItems: "center",
                    }}
                >
                    <span>Défi</span>
                    <strong style={{ color: "#fdf4ff" }}>{index + 1}</strong>
                    <span>/</span>
                    <span>{total}</span>
                </div>
            </header>

            <main style={{ maxWidth: "42rem", margin: "0 auto" }}>
                <div
                    style={{
                        borderRadius: "1.5rem",
                        padding: "1.75rem",
                        backgroundColor: "rgba(255,255,255,0.07)",
                        border: "2px solid rgba(240,171,252,0.25)",
                        boxShadow: "0 8px 32px -4px rgba(0,0,0,0.6)",
                    }}
                >
                    {badge && (
                        <div
                            style={{
                                display: "inline-block",
                                fontSize: ".65rem",
                                fontFamily: "'Nunito',sans-serif",
                                fontWeight: 700,
                                color: badge.color,
                                background: badge.bg,
                                borderRadius: "999px",
                                padding: "2px 10px",
                                marginBottom: ".75rem",
                            }}
                        >
                            {badge.label}
                        </div>
                    )}

                    <div
                        style={{
                            display: "flex",
                            gap: ".75rem",
                            alignItems: "flex-start",
                            marginBottom: "1.25rem",
                        }}
                    >
                        <span style={{ fontSize: "1.75rem", lineHeight: 1 }}>
                            {challenge.emoji}
                        </span>
                        <p
                            style={{
                                fontFamily: "'Nunito',sans-serif",
                                color: "#e9d5ff",
                                fontSize: "1rem",
                                lineHeight: 1.55,
                                margin: 0,
                            }}
                        >
                            {challenge.context}
                        </p>
                    </div>

                    {sense === "partage" && (
                        <div style={{ marginBottom: "1.25rem" }}>
                            <FractionBar
                                numerator={challenge.num}
                                denominator={challenge.den}
                                animate
                                size="md"
                                color="#fbbf24"
                            />
                        </div>
                    )}

                    {!isEquality && (
                        <div
                            style={{
                                textAlign: "center",
                                marginBottom: "1.25rem",
                            }}
                        >
                            <FractionDisplay
                                numerator={challenge.num}
                                denominator={challenge.den}
                                size="lg"
                                color="#fdf4ff"
                                barColor="#f0abfc"
                            />
                        </div>
                    )}

                    {isStandard && (
                        <div style={{ marginBottom: ".5rem" }}>
                            <NumberLine
                                min={0}
                                max={challenge.max}
                                denominator={challenge.den}
                                value={answer}
                                onChange={handleAnswer}
                                showDecomposition={showDecomp}
                                disabled={showCorrection}
                                targetValue={
                                    showCorrection
                                        ? challenge.num / challenge.den
                                        : null
                                }
                            />
                        </div>
                    )}

                    {isDecimal && !showCorrection && (
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                marginBottom: ".5rem",
                            }}
                        >
                            <DecimalInput key={index} onChange={handleAnswer} />
                        </div>
                    )}

                    {isEquality && !showCorrection && (
                        <>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: ".5rem",
                                    flexWrap: "wrap",
                                    marginBottom: "1.25rem",
                                }}
                            >
                                {challenge.eqWhole != null && (
                                    <span
                                        style={{
                                            fontFamily: "'Baloo 2',sans-serif",
                                            fontSize: "2rem",
                                            fontWeight: 800,
                                            color: "#fdf4ff",
                                        }}
                                    >
                                        {challenge.eqWhole}
                                    </span>
                                )}
                                {challenge.eqA && (
                                    <FractionDisplay
                                        numerator={challenge.eqA.num}
                                        denominator={challenge.eqA.den}
                                        size="lg"
                                        color="#fdf4ff"
                                        barColor="#f0abfc"
                                    />
                                )}
                                <span
                                    style={{
                                        fontFamily: "'Baloo 2',sans-serif",
                                        fontSize: "1.75rem",
                                        fontWeight: 800,
                                        color: "#f0abfc",
                                    }}
                                >
                                    {challenge.eqOp}
                                </span>
                                <FractionDisplay
                                    numerator={challenge.eqB.num}
                                    denominator={challenge.eqB.den}
                                    size="lg"
                                    color="#fdf4ff"
                                    barColor="#f0abfc"
                                />
                                <span
                                    style={{
                                        fontFamily: "'Baloo 2',sans-serif",
                                        fontSize: "1.75rem",
                                        fontWeight: 800,
                                        color: "#f0abfc",
                                    }}
                                >
                                    =
                                </span>
                                <span
                                    style={{
                                        fontFamily: "'Baloo 2',sans-serif",
                                        fontSize: "2rem",
                                        fontWeight: 800,
                                        color: "#fbbf24",
                                    }}
                                >
                                    ?
                                </span>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    gap: ".75rem",
                                    justifyContent: "center",
                                    flexWrap: "wrap",
                                }}
                            >
                                {challenge.choices.map((c, i) => (
                                    <button
                                        key={i}
                                        onClick={() => runCheck(c.num / c.den)}
                                        style={{
                                            padding: ".6rem 1rem",
                                            borderRadius: ".875rem",
                                            border: "1.5px solid rgba(240,171,252,0.3)",
                                            background:
                                                "rgba(255,255,255,0.06)",
                                            cursor: "pointer",
                                        }}
                                    >
                                        <FractionDisplay
                                            numerator={c.num}
                                            denominator={c.den}
                                            size="md"
                                            color="#fdf4ff"
                                            barColor="#f0abfc"
                                        />
                                    </button>
                                ))}
                            </div>
                        </>
                    )}

                    {!showCorrection && !isEquality && (
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
                    )}

                    {showCorrection && (
                        <div
                            className="flex flex-col items-center animate-float-up"
                            style={{ gap: "1rem", marginTop: "1.5rem" }}
                        >
                            <ProgressStars count={starsEarned} animate />
                            <button onClick={handleNext} style={BTN_NEXT}>
                                {index + 1 < total
                                    ? "Défi suivant →"
                                    : "Terminer le festival 🎪"}
                            </button>
                        </div>
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
                                        ? "#f0abfc"
                                        : i === index
                                          ? "#fbbf24"
                                          : "rgba(240,171,252,0.2)",
                            }}
                        />
                    ))}
                </div>
            </main>
            <FeedbackToast feedback={feedback} />
        </div>
    );
}

export default WorldFestival;

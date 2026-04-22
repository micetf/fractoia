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
 * Sprint B : ajout des sens "decimal-auto" et "equality-gap".
 * Ces deux sens utilisent `DecimalInput` à la place de `NumberLine`.
 * La logique de validation (`runCheck`) est partagée entre les trois modes.
 *
 * @param {{ onComplete?: function }} props
 */
function WorldFestival({ onComplete }) {
    const [answer, setAnswer] = useState(null);
    const [showCorrection, setShowCorrection] = useState(false);
    const [starsEarned, setStarsEarned] = useState(0);
    const [showHintFlag, setShowHintFlag] = useState(false);

    const { feedback, showSuccess, showError, showHint } = useFeedback();
    const { challenge, index, total, done, check, next, reset } =
        useFractionChallenge(WORLD5_CHALLENGES);
    const { recordResult } = useGameProgression();

    const sense = challenge?.sense ?? "partage";
    const isAutomatism = sense === "decimal-auto" || sense === "equality-gap";
    const showDecomp =
        !isAutomatism && challenge ? challenge.num > challenge.den : false;
    const showBar = sense === "partage";
    const badge = challenge ? (SENSE_BADGE[sense] ?? null) : null;

    /** Logique de validation partagée entre NumberLine, DecimalInput et choix fraction. */
    const runCheck = useCallback(
        (floatValue) => {
            if (showCorrection) return;
            const { correct, attempts, showHint: needHint } = check(floatValue);
            if (correct) {
                const stars = attempts === 1 ? 3 : attempts === 2 ? 2 : 1;
                setStarsEarned(stars);
                setShowCorrection(true);
                setShowHintFlag(false);
                recordResult(5, index, true, attempts);
                showSuccess(
                    attempts === 1
                        ? "Magnifique ! Parfait ! ⭐⭐⭐"
                        : `Bravo ! Trouvé en ${attempts} essais.`
                );
            } else {
                if (needHint) {
                    setShowHintFlag(true);
                    showHint(`${challenge.emoji} ${challenge.hint}`);
                } else {
                    showError("Pas tout à fait… Lis bien la situation !");
                }
                setAnswer(null);
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
            showHint("Clique sur la droite pour placer ta fraction !");
            return;
        }
        runCheck(answer);
    }, [answer, showHint, runCheck]);
    const handleNext = useCallback(() => {
        setAnswer(null);
        setShowCorrection(false);
        setStarsEarned(0);
        setShowHintFlag(false);
        next();
    }, [next]);
    const handleReset = useCallback(() => {
        setAnswer(null);
        setShowCorrection(false);
        setStarsEarned(0);
        setShowHintFlag(false);
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
                    {/* Badge sens */}
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

                    {/* Contexte */}
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

                    {/* FractionBar — sens partage uniquement */}
                    {showBar && (
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

                    {/* Mode automatismes — DecimalInput (decimal-auto ou equality-gap) */}
                    {isAutomatism && !showCorrection && (
                        <DecimalInput
                            challenge={challenge}
                            onValidate={runCheck}
                            disabled={showCorrection}
                            showHint={showHintFlag}
                        />
                    )}

                    {/* Mode standard — FractionDisplay + NumberLine */}
                    {!isAutomatism && (
                        <>
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
                            {!showCorrection && (
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
                        </>
                    )}

                    {/* Post-réponse */}
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

                {/* Barre de progression */}
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

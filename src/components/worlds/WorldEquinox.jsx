import { useState, useCallback } from "react";
import PercentDisplay from "../ui/PercentDisplay.jsx";
import FeedbackToast from "../ui/FeedbackToast.jsx";
import ProgressStars from "../ui/ProgressStars.jsx";
import { useFeedback } from "../../hooks/useFeedback.js";
import { usePercentChallenge } from "../../hooks/usePercentChallenge.js";
import { useGameProgression } from "../../hooks/useGameProgression.js";
import { WORLD_EQUINOX_CHALLENGES } from "../../data/challenges/world_equinox.js";

const C = {
    bg: "linear-gradient(160deg,#0c2340 0%,#0f3460 50%,#0c2340 100%)",
    card: "rgba(255,255,255,0.07)",
    border: "rgba(14,165,233,0.3)",
    text: "#e0f2fe",
    sub: "#7dd3fc",
};

const btn = (bg, fg = "#fff", px = "2rem") => ({
    padding: `0.75rem ${px}`,
    borderRadius: "1rem",
    fontSize: "1.125rem",
    fontWeight: 700,
    backgroundColor: bg,
    color: fg,
    border: "none",
    cursor: "pointer",
    fontFamily: "'Baloo 2',sans-serif",
});
const BTN_NEXT = btn("#0ea5e9", "#fff");
const BTN_RESET = btn("#0ea5e9", "#fff", "1.5rem");

/**
 * Monde 8 "La Fête de l'Équinoxe" — les pourcentages (6ème).
 *
 * Attendus BO n°16, 2026 : comprendre / calculer / appliquer un pourcentage.
 *
 * Trois interactions selon `challenge.sense` :
 *   "sens"       → 4 boutons de choix (validation immédiate)
 *   "calcul"     → saisie numérique du résultat + Valider
 *   "proportion" → saisie numérique du % + Valider
 *
 * @param {{ onComplete?: function }} props
 */
function WorldEquinox({ onComplete }) {
    const [answer, setAnswer] = useState("");
    const [showCorrection, setShowCorrection] = useState(false);
    const [starsEarned, setStarsEarned] = useState(0);
    const [inputError, setInputError] = useState(false);

    const { feedback, showSuccess, showError, showHint } = useFeedback();
    const { challenge, index, total, done, check, next, reset } =
        usePercentChallenge(WORLD_EQUINOX_CHALLENGES);
    const { recordResult } = useGameProgression();

    const runCheck = useCallback(
        (floatValue) => {
            if (showCorrection) return;
            const { correct, attempts, showHint: needHint } = check(floatValue);
            if (correct) {
                setStarsEarned(attempts === 1 ? 3 : attempts === 2 ? 2 : 1);
                setShowCorrection(true);
                recordResult(8, index, true, attempts);
                showSuccess(
                    attempts === 1
                        ? "Parfait ! ⭐⭐⭐"
                        : `Bravo ! Trouvé en ${attempts} essais.`
                );
            } else {
                if (needHint) showHint(`${challenge.emoji} ${challenge.hint}`);
                else showError("Pas tout à fait… Relis bien l'énoncé !");
                setAnswer("");
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

    const handleSubmit = useCallback(() => {
        const n = parseFloat(String(answer).replace(",", "."));
        if (isNaN(n)) {
            setInputError(true);
            return;
        }
        setInputError(false);
        runCheck(n);
    }, [answer, runCheck]);

    const handleNext = useCallback(() => {
        setAnswer("");
        setShowCorrection(false);
        setStarsEarned(0);
        setInputError(false);
        next();
    }, [next]);
    const handleReset = useCallback(() => {
        setAnswer("");
        setShowCorrection(false);
        setStarsEarned(0);
        setInputError(false);
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
                    background: C.bg,
                }}
            >
                <div className="text-center animate-bounce-in">
                    <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>
                        🎭
                    </div>
                    <h2
                        style={{
                            fontFamily: "'Baloo 2',sans-serif",
                            color: C.text,
                            fontSize: "2rem",
                            fontWeight: 800,
                            margin: "0 0 .5rem",
                        }}
                    >
                        Monde 8 terminé !
                    </h2>
                    <p
                        style={{
                            color: C.sub,
                            fontFamily: "'Nunito',sans-serif",
                            marginBottom: "1.5rem",
                        }}
                    >
                        Tu maîtrises les pourcentages. Le Grand Festival
                        t'appelle !
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
                                style={btn("#38bdf8", "#0c2340")}
                            >
                                Le Grand Festival 🎪
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    const isSens = challenge.sense === "sens";
    const isCalcul = challenge.sense === "calcul";
    const isProportion = challenge.sense === "proportion";
    const inputSuffix = isProportion ? " %" : ` ${challenge.unit}`;

    return (
        <div
            style={{
                minHeight: "100vh",
                background: C.bg,
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
                            color: C.text,
                            fontSize: "1.5rem",
                            fontWeight: 800,
                            lineHeight: 1,
                            margin: 0,
                        }}
                    >
                        🎭 La Fête de l'Équinoxe
                    </h1>
                    <p
                        style={{
                            color: C.sub,
                            fontFamily: "'Nunito',sans-serif",
                            fontSize: ".8rem",
                            margin: ".2rem 0 0",
                        }}
                    >
                        Monde 8 · Les pourcentages
                    </p>
                </div>
                <div
                    style={{
                        fontFamily: "'Nunito',sans-serif",
                        fontSize: ".875rem",
                        color: C.sub,
                        display: "flex",
                        gap: ".2rem",
                    }}
                >
                    <span>Défi</span>
                    <strong style={{ color: C.text }}>{index + 1}</strong>
                    <span>/</span>
                    <span>{total}</span>
                </div>
            </header>

            <main style={{ maxWidth: "36rem", margin: "0 auto" }}>
                <div
                    style={{
                        borderRadius: "1.5rem",
                        padding: "1.75rem",
                        background: C.card,
                        border: `2px solid ${C.border}`,
                        boxShadow: "0 8px 32px -4px rgba(0,0,0,0.5)",
                    }}
                >
                    {/* Contexte */}
                    <div
                        style={{
                            display: "flex",
                            gap: ".75rem",
                            alignItems: "flex-start",
                            marginBottom: "1.5rem",
                        }}
                    >
                        <span style={{ fontSize: "1.75rem", lineHeight: 1 }}>
                            {challenge.emoji}
                        </span>
                        <p
                            style={{
                                fontFamily: "'Nunito',sans-serif",
                                color: C.text,
                                fontSize: "1rem",
                                lineHeight: 1.6,
                                margin: 0,
                            }}
                        >
                            {challenge.context}
                        </p>
                    </div>

                    {/* Affichage du % — seulement pour 'calcul' (le % est une donnée, pas la réponse) */}
                    {isCalcul && !showCorrection && (
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                marginBottom: "1.5rem",
                            }}
                        >
                            <PercentDisplay
                                pct={challenge.pct}
                                color="#0ea5e9"
                                size="md"
                            />
                        </div>
                    )}

                    {/* Palier 1 — sens : 4 boutons */}
                    {isSens && !showCorrection && (
                        <div
                            style={{
                                display: "flex",
                                gap: ".75rem",
                                justifyContent: "center",
                                flexWrap: "wrap",
                            }}
                        >
                            {challenge.choices.map((c) => (
                                <button
                                    key={c}
                                    onClick={() => runCheck(c)}
                                    style={{
                                        padding: ".7rem 1.4rem",
                                        borderRadius: "1rem",
                                        border: `1.5px solid ${C.border}`,
                                        background: C.card,
                                        color: C.text,
                                        fontFamily: "'Baloo 2',sans-serif",
                                        fontWeight: 800,
                                        fontSize: "1.125rem",
                                        cursor: "pointer",
                                    }}
                                >
                                    {c} %
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Paliers 2 et 3 — saisie numérique */}
                    {(isCalcul || isProportion) && !showCorrection && (
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: ".75rem",
                                flexWrap: "wrap",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: ".4rem",
                                }}
                            >
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    value={answer}
                                    onChange={(e) => {
                                        setAnswer(
                                            e.target.value.replace(
                                                /[^0-9,.]/,
                                                ""
                                            )
                                        );
                                        setInputError(false);
                                    }}
                                    onKeyDown={(e) =>
                                        e.key === "Enter" && handleSubmit()
                                    }
                                    placeholder={isProportion ? "0" : "0"}
                                    style={{
                                        width: "5.5rem",
                                        padding: ".6rem .875rem",
                                        borderRadius: ".75rem",
                                        border: `2px solid ${inputError ? "#f87171" : C.border}`,
                                        background: "rgba(255,255,255,0.08)",
                                        color: C.text,
                                        fontFamily: "'Baloo 2',sans-serif",
                                        fontWeight: 700,
                                        fontSize: "1.5rem",
                                        textAlign: "center",
                                        outline: "none",
                                    }}
                                />
                                <span
                                    style={{
                                        fontFamily: "'Nunito',sans-serif",
                                        color: C.sub,
                                        fontSize: ".9rem",
                                    }}
                                >
                                    {inputSuffix}
                                </span>
                            </div>
                            <button onClick={handleSubmit} style={BTN_NEXT}>
                                Valider ✓
                            </button>
                        </div>
                    )}

                    {showCorrection && isCalcul && (
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: ".5rem",
                                flexWrap: "wrap",
                                padding: ".75rem",
                                background: "rgba(14,165,233,0.1)",
                                borderRadius: "1rem",
                                border: `1px solid ${C.border}`,
                            }}
                        >
                            <span
                                style={{
                                    fontFamily: "'Baloo 2',sans-serif",
                                    fontWeight: 800,
                                    color: "#38bdf8",
                                    fontSize: "1.5rem",
                                }}
                            >
                                {challenge.pct} %
                            </span>
                            <span style={{ color: C.sub, fontSize: "1.25rem" }}>
                                ×
                            </span>
                            <span
                                style={{
                                    fontFamily: "'Baloo 2',sans-serif",
                                    fontWeight: 800,
                                    color: C.text,
                                    fontSize: "1.5rem",
                                }}
                            >
                                {challenge.total}
                            </span>
                            <span style={{ color: C.sub, fontSize: "1.25rem" }}>
                                =
                            </span>
                            <span
                                style={{
                                    fontFamily: "'Baloo 2',sans-serif",
                                    fontWeight: 800,
                                    color: "#6ee7b7",
                                    fontSize: "2rem",
                                }}
                            >
                                {challenge.result}
                            </span>
                            <span
                                style={{
                                    fontFamily: "'Nunito',sans-serif",
                                    color: C.sub,
                                    fontSize: ".9rem",
                                    alignSelf: "flex-end",
                                    paddingBottom: ".25rem",
                                }}
                            >
                                {challenge.unit}
                            </span>
                        </div>
                    )}
                    {showCorrection && !isCalcul && (
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <PercentDisplay
                                pct={challenge.result}
                                color="#0ea5e9"
                                size="lg"
                            />
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
                                    : "Terminer le monde 🎭"}
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
                                        ? "#38bdf8"
                                        : i === index
                                          ? "#0ea5e9"
                                          : "rgba(14,165,233,0.2)",
                            }}
                        />
                    ))}
                </div>
            </main>
            <FeedbackToast feedback={feedback} />
        </div>
    );
}

export default WorldEquinox;

import { useState, useCallback } from "react";
import NumberLine from "./components/ui/NumberLine.jsx";
import FractionDisplay from "./components/ui/FractionDisplay.jsx";
import FeedbackToast from "./components/ui/FeedbackToast.jsx";
import ProgressStars from "./components/ui/ProgressStars.jsx";
import { useFeedback } from "./hooks/useFeedback.js";
import { useGameProgression } from "./hooks/useGameProgression.js";

/** @type {Array<{num: number, den: number, max: number, hint: string}>} */
const DEMO_CHALLENGES = [
    { num: 3, den: 4, max: 2, hint: "3/4 se trouve entre 0 et 1." },
    {
        num: 5,
        den: 4,
        max: 3,
        hint: "5/4 est plus grand que 1. Cherche entre 1 et 2 !",
    },
    {
        num: 7,
        den: 3,
        max: 4,
        hint: "7/3 dépasse 2… tu peux le décomposer en 2 + 1/3.",
    },
    { num: 1, den: 2, max: 2, hint: "1/2 est juste au milieu entre 0 et 1." },
    { num: 9, den: 4, max: 4, hint: "9/4 = 2 + 1/4. Cherche juste après 2 !" },
];

const TOLERANCE = 0.01;

/* Factory boutons — contourne le Preflight Tailwind v4 sur <button> */
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

/** Démo Sprint 1 — 5 défis progressifs incluant des fractions > 1. */
function App() {
    const [challengeIdx, setChallengeIdx] = useState(0);
    const [answer, setAnswer] = useState(null);
    const [attempts, setAttempts] = useState(0);
    const [showCorrection, setShowCorrection] = useState(false);
    const [starsEarned, setStarsEarned] = useState(0);
    const [finished, setFinished] = useState(false);

    const { feedback, showSuccess, showError, showHint } = useFeedback();
    const { recordResult } = useGameProgression();

    const challenge = DEMO_CHALLENGES[challengeIdx];
    const target = challenge.num / challenge.den;

    const handleAnswer = useCallback(
        (val) => {
            if (showCorrection || finished) return;
            setAnswer(val);
        },
        [showCorrection, finished]
    );

    const handleValidate = useCallback(() => {
        if (answer === null) {
            showHint("Clique sur la droite pour placer ta réponse !");
            return;
        }
        const att = attempts + 1;
        setAttempts(att);
        if (Math.abs(answer - target) <= TOLERANCE) {
            const stars = att === 1 ? 3 : att === 2 ? 2 : 1;
            setStarsEarned(stars);
            setShowCorrection(true);
            recordResult(1, challengeIdx, true, att);
            showSuccess(
                att === 1
                    ? `Parfait ! ${challenge.num}/${challenge.den} est exactement là. ⭐⭐⭐`
                    : `Bravo ! Tu as trouvé ${challenge.num}/${challenge.den} en ${att} essais.`
            );
        } else {
            if (att >= 2) showHint(challenge.hint);
            else showError("Pas tout à fait… Essaie encore !");
            setAnswer(null);
        }
    }, [
        answer,
        attempts,
        target,
        challenge,
        challengeIdx,
        recordResult,
        showSuccess,
        showError,
        showHint,
    ]);

    const handleNext = useCallback(() => {
        if (challengeIdx + 1 >= DEMO_CHALLENGES.length) {
            setFinished(true);
            return;
        }
        setChallengeIdx((i) => i + 1);
        setAnswer(null);
        setAttempts(0);
        setShowCorrection(false);
        setStarsEarned(0);
    }, [challengeIdx]);

    const handleReset = () => {
        setChallengeIdx(0);
        setAnswer(null);
        setAttempts(0);
        setShowCorrection(false);
        setStarsEarned(0);
        setFinished(false);
    };

    if (finished) {
        return (
            <div
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "1.5rem",
                    background:
                        "linear-gradient(135deg, #fdf6ec 0%, #fef3c7 100%)",
                }}
            >
                <div className="text-center animate-bounce-in">
                    <div style={{ fontSize: "5rem", marginBottom: "1rem" }}>
                        🗺️
                    </div>
                    <h1
                        style={{
                            fontFamily: "'Baloo 2', sans-serif",
                            color: "#5c3d1a",
                            fontSize: "2.25rem",
                            fontWeight: 800,
                            marginBottom: "0.5rem",
                        }}
                    >
                        Sprint 1 terminé !
                    </h1>
                    <p
                        style={{
                            color: "#9c6b30",
                            fontFamily: "'Nunito', sans-serif",
                            marginBottom: "1.5rem",
                        }}
                    >
                        Tous les composants de base sont opérationnels.
                    </p>
                    <button onClick={handleReset} style={BTN_RESET}>
                        Recommencer la démo
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div
            style={{
                minHeight: "100vh",
                padding: "2rem 1rem",
                background:
                    "linear-gradient(160deg, #fdf6ec 0%, #fef3c7 60%, #e0f2fe 100%)",
            }}
        >
            {/* En-tête — layout inline pour garantir le rendu */}
            <header
                style={{
                    maxWidth: "42rem",
                    margin: "0 auto 1.5rem",
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
                            fontSize: "1.875rem",
                            fontWeight: 800,
                            lineHeight: 1,
                            margin: 0,
                        }}
                    >
                        FRACTOÏA
                    </h1>
                    <p
                        style={{
                            color: "#9c6b30",
                            fontFamily: "'Nunito', sans-serif",
                            fontSize: "0.875rem",
                            margin: "0.25rem 0 0",
                        }}
                    >
                        Sprint 1 — Démo NumberLine
                    </p>
                </div>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.25rem",
                        fontFamily: "'Nunito', sans-serif",
                        fontSize: "0.875rem",
                        color: "#9c6b30",
                    }}
                >
                    <span>Défi</span>
                    <strong style={{ color: "#5c3d1a", fontSize: "1rem" }}>
                        {challengeIdx + 1}
                    </strong>
                    <span>/</span>
                    <span>{DEMO_CHALLENGES.length}</span>
                </div>
            </header>

            {/* Carte principale */}
            <main style={{ maxWidth: "42rem", margin: "0 auto" }}>
                <div
                    style={{
                        borderRadius: "1.5rem",
                        padding: "2rem",
                        backgroundColor: "#ffffff",
                        border: "2px solid #e8cfa4",
                        boxShadow: "0 8px 32px -4px rgba(92,61,26,0.22)",
                    }}
                >
                    {/* Question */}
                    <div
                        className="text-center animate-float-up"
                        style={{ marginBottom: "1.5rem" }}
                    >
                        <p
                            style={{
                                color: "#9c6b30",
                                fontFamily: "'Nunito', sans-serif",
                                fontSize: "0.875rem",
                                marginBottom: "0.75rem",
                            }}
                        >
                            Place sur la droite…
                        </p>
                        <FractionDisplay
                            numerator={challenge.num}
                            denominator={challenge.den}
                            size="xl"
                        />
                    </div>

                    {/* Droite numérique */}
                    <div
                        style={{ padding: "0 0.5rem", marginBottom: "0.5rem" }}
                    >
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
                                {challengeIdx + 1 < DEMO_CHALLENGES.length
                                    ? "Défi suivant →"
                                    : "Terminer 🎉"}
                            </button>
                        </div>
                    )}
                </div>

                {/* Barre de progression */}
                <div
                    style={{
                        display: "flex",
                        gap: "0.5rem",
                        justifyContent: "center",
                        marginTop: "1.25rem",
                    }}
                >
                    {DEMO_CHALLENGES.map((_, i) => (
                        <div
                            key={i}
                            className={
                                i === challengeIdx ? "animate-pulse-glow" : ""
                            }
                            style={{
                                height: "0.5rem",
                                borderRadius: "999px",
                                width: i === challengeIdx ? "2rem" : "1.5rem",
                                backgroundColor:
                                    i < challengeIdx
                                        ? "#34d399"
                                        : i === challengeIdx
                                          ? "#fbbf24"
                                          : "#e8cfa4",
                                transition: "all 0.3s",
                            }}
                        />
                    ))}
                </div>
            </main>

            <FeedbackToast feedback={feedback} />
        </div>
    );
}

export default App;

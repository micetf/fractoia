import { useState, useMemo } from "react";
import FractionDisplay from "./FractionDisplay.jsx";

/** Mélange un tableau sans muter l'original. */
const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

const btnOption = (selected, correct) => ({
    padding: "0.6rem 1.4rem",
    borderRadius: "0.875rem",
    fontSize: "1rem",
    fontWeight: 700,
    fontFamily: "'Baloo 2', sans-serif",
    border: `2px solid ${selected ? (correct ? "#6ee7b7" : "#f87171") : "rgba(165,180,252,0.4)"}`,
    background: selected
        ? correct
            ? "rgba(110,231,183,0.18)"
            : "rgba(248,113,113,0.18)"
        : "rgba(255,255,255,0.06)",
    color: selected ? (correct ? "#6ee7b7" : "#f87171") : "#e0e7ff",
    cursor: selected ? "default" : "pointer",
    transition: "all 0.18s",
    minWidth: "6rem",
});

/**
 * Question d'encadrement — Phase 'bracket' du Monde 3.
 *
 * Affiche 3 paires d'entiers consécutifs ; l'élève choisit celle qui
 * encadre la fraction. Feedback non punitif (principe Tricot) :
 * une réponse incorrecte laisse retenter sans pénalité de score.
 *
 * @param {Object}   props
 * @param {Object}   props.challenge        - Défi courant (num, den, bracket)
 * @param {function} props.onCorrect        - Appelé quand l'encadrement est validé
 */
function BracketQuestion({ challenge, onCorrect }) {
    const [chosen, setChosen] = useState(null); // index de l'option choisie
    const [wrongCount, setWrongCount] = useState(0);

    const [lower, upper] = challenge.bracket;

    // Génère 3 paires : correct + 2 distracteurs adjacents
    const options = useMemo(() => {
        const correct = [lower, upper];
        const d1 = lower > 0 ? [lower - 1, lower] : [upper, upper + 1];
        const d2 = [upper, upper + 1];
        // évite doublons si d1 === d2 (cas lower=0)
        const pool =
            d1[0] === d2[0]
                ? [correct, d2, [upper + 1, upper + 2]]
                : [correct, d1, d2];
        return shuffle(pool);
    }, [lower, upper]);

    const correctIdx = options.findIndex(
        ([a, b]) => a === lower && b === upper
    );

    const handleChoice = (idx) => {
        if (chosen !== null && chosen === correctIdx) return; // déjà validé
        setChosen(idx);
        if (idx === correctIdx) {
            // Légère pause pour laisser voir le feedback vert avant transition
            setTimeout(onCorrect, 480);
        } else {
            setWrongCount((c) => c + 1);
        }
    };

    const hint =
        wrongCount >= 1
            ? `💡 Cherche la partie entière : combine ${challenge.num} ÷ ${challenge.den} et encadre.`
            : null;

    return (
        <div
            style={{
                background: "rgba(255,255,255,0.05)",
                borderRadius: "1.25rem",
                border: "1.5px solid rgba(165,180,252,0.25)",
                padding: "1.5rem 1.25rem",
                textAlign: "center",
            }}
        >
            {/* Consigne */}
            <p
                style={{
                    fontFamily: "'Nunito', sans-serif",
                    color: "#c7d2fe",
                    fontSize: "0.9rem",
                    marginBottom: "1.25rem",
                    lineHeight: 1.5,
                }}
            >
                Entre quels entiers consécutifs se trouve cette fraction ?
            </p>

            {/* Fraction */}
            <div style={{ marginBottom: "1.5rem" }}>
                <FractionDisplay
                    numerator={challenge.num}
                    denominator={challenge.den}
                    size="lg"
                    color="#e0e7ff"
                    barColor="#818cf8"
                />
            </div>

            {/* Options */}
            <div
                style={{
                    display: "flex",
                    gap: "0.75rem",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    marginBottom: "1rem",
                }}
            >
                {options.map(([a, b], idx) => {
                    const isChosen = chosen === idx;
                    const isCorrect = idx === correctIdx;
                    return (
                        <button
                            key={idx}
                            onClick={() => handleChoice(idx)}
                            style={btnOption(isChosen, isCorrect)}
                            aria-pressed={isChosen}
                        >
                            {a} &lt; … &lt; {b}
                        </button>
                    );
                })}
            </div>

            {/* Feedback hint non punitif */}
            {hint && (
                <p
                    style={{
                        fontFamily: "'Nunito', sans-serif",
                        color: "#fcd34d",
                        fontSize: "0.8rem",
                        marginTop: "0.5rem",
                        lineHeight: 1.4,
                    }}
                >
                    {hint}
                </p>
            )}
        </div>
    );
}

export default BracketQuestion;

import FractionDisplay from "./FractionDisplay.jsx";
import NumberLine from "./NumberLine.jsx";

// ── Thème visuel Monde 7 (indigo / violet) ───────────────────────────────────
const C = {
    border: "rgba(165,180,252,0.3)",
    bg: "rgba(255,255,255,0.06)",
    sub: "#a5b4fc",
    text: "#e0e7ff",
    colorA: "#818cf8", // indigo — fraction A
    colorB: "#c084fc", // violet — fraction B
};

const btnChoice = (bg) => ({
    padding: "0.7rem 1.4rem",
    borderRadius: "1rem",
    fontSize: "1rem",
    fontWeight: 700,
    fontFamily: "'Baloo 2', sans-serif",
    backgroundColor: bg,
    color: "#fff",
    border: "none",
    cursor: "pointer",
});

/**
 * Interface de comparaison de deux fractions — Monde 7 (WorldBridge).
 *
 * Phase "question" :
 *   Affiche fracA (gauche) et fracB (droite) avec leurs labels A / B.
 *   Boutons : "A est plus grande" · "Égales" (conditionnel) · "B est plus grande".
 *
 * Phase "revealed" :
 *   Les deux fractions restent visibles.
 *   Une NumberLine disabled affiche valA (marker value) et valB (marker targetValue)
 *   sur la même demi-droite — mise en correspondance visuelle immédiate.
 *
 * @param {Object}   props
 * @param {import('../../data/challenges/world2ter.js').BridgeChallenge} props.challenge
 * @param {'question'|'revealed'} props.phase
 * @param {function('A'|'B'|'equal'): void} props.onAnswer - Appelé au clic bouton
 * @param {boolean}  [props.showHint=false]
 */
function CompareQuestion({ challenge, phase, onAnswer, showHint = false }) {
    const { fracA, fracB, correct } = challenge;
    const valA = fracA.num / fracA.den;
    const valB = fracB.num / fracB.den;

    return (
        <div
            style={{
                background: C.bg,
                borderRadius: "1.25rem",
                border: `1.5px solid ${C.border}`,
                padding: "1.5rem 1.25rem",
            }}
        >
            {/* Consigne contextuelle */}
            <p
                style={{
                    fontFamily: "'Nunito', sans-serif",
                    color: C.sub,
                    fontSize: "0.88rem",
                    textAlign: "center",
                    marginBottom: "1.5rem",
                    lineHeight: 1.5,
                }}
            >
                {phase === "revealed"
                    ? "Voici leurs positions sur la demi-droite :"
                    : "Laquelle de ces deux fractions est la plus grande ?"}
            </p>

            {/* Fractions A et B côte à côte */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-end",
                    gap: "3.5rem",
                    marginBottom: "1.75rem",
                }}
            >
                {[
                    { label: "A", frac: fracA, color: C.colorA },
                    { label: "B", frac: fracB, color: C.colorB },
                ].map(({ label, frac, color }) => (
                    <div key={label} style={{ textAlign: "center" }}>
                        <p
                            style={{
                                fontFamily: "'Baloo 2', sans-serif",
                                fontWeight: 800,
                                color,
                                fontSize: "0.78rem",
                                marginBottom: "0.4rem",
                                letterSpacing: "0.06em",
                            }}
                        >
                            {label}
                        </p>
                        <FractionDisplay
                            numerator={frac.num}
                            denominator={frac.den}
                            size="lg"
                            color={C.text}
                            barColor={color}
                        />
                    </div>
                ))}
            </div>

            {/* Phase question : boutons de choix */}
            {phase === "question" && (
                <div
                    style={{
                        display: "flex",
                        gap: "0.75rem",
                        justifyContent: "center",
                        flexWrap: "wrap",
                    }}
                >
                    <button
                        onClick={() => onAnswer("A")}
                        style={btnChoice("#6366f1")}
                    >
                        A est plus grande
                    </button>
                    {correct === "equal" && (
                        <button
                            onClick={() => onAnswer("equal")}
                            style={btnChoice("#0ea5e9")}
                        >
                            Égales
                        </button>
                    )}
                    <button
                        onClick={() => onAnswer("B")}
                        style={btnChoice("#7c3aed")}
                    >
                        B est plus grande
                    </button>
                </div>
            )}

            {/* Phase revealed : demi-droite double — A (value) + B (targetValue) */}
            {phase === "revealed" && (
                <div style={{ marginTop: "0.5rem" }}>
                    <NumberLine
                        min={0}
                        max={2}
                        denominator={fracA.den}
                        value={valA}
                        targetValue={valB}
                        showDecomposition={false}
                        disabled
                        onChange={() => {}}
                    />
                    {/* Légende des deux marqueurs */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            gap: "2rem",
                            marginTop: "0.5rem",
                        }}
                    >
                        {[
                            { label: "A", color: C.colorA },
                            { label: "B", color: C.colorB },
                        ].map(({ label, color }) => (
                            <span
                                key={label}
                                style={{
                                    fontFamily: "'Nunito', sans-serif",
                                    fontSize: "0.78rem",
                                    color,
                                    fontWeight: 700,
                                }}
                            >
                                ● {label}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Indice — visible dès la 2e erreur, uniquement en phase question */}
            {showHint && phase === "question" && (
                <p
                    style={{
                        fontFamily: "'Nunito', sans-serif",
                        color: "#fcd34d",
                        fontSize: "0.82rem",
                        textAlign: "center",
                        marginTop: "1.1rem",
                        lineHeight: 1.5,
                    }}
                >
                    💡 {challenge.hint}
                </p>
            )}
        </div>
    );
}

export default CompareQuestion;

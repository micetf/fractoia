import FractionDisplay from "./FractionDisplay.jsx";

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
 * Mini-droite graduée SVG avec marqueurs A et B explicitement étiquetés.
 * Subdivisions : LCM(denA, denB) si ≤ 12, sinon quarts.
 */
function CompareNumberLine({ valA, denA, valB, denB }) {
    const W = 400,
        H = 80,
        PAD = 40;
    const rangeMax = Math.max(2, Math.ceil(Math.max(valA, valB)) + 1);
    const toX = (v) => PAD + (v / rangeMax) * (W - 2 * PAD);

    // Calcul LCM pour les sous-graduations
    const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
    const lcm = (a, b) => (a * b) / gcd(a, b);
    const subDiv = lcm(denA, denB) <= 12 ? lcm(denA, denB) : 4;

    // Ticks : toutes les valeurs k/subDiv dans [0, rangeMax]
    const ticks = Array.from(
        { length: subDiv * rangeMax + 1 },
        (_, i) => i / subDiv
    );
    const integers = Array.from({ length: rangeMax + 1 }, (_, i) => i);

    return (
        <div
            aria-label={`A vaut ${valA}, B vaut ${valB}`}
            style={{ width: "100%" }}
        >
            <svg
                viewBox={`0 0 ${W} ${H}`}
                style={{ width: "100%", maxHeight: "5.5rem", display: "block" }}
            >
                {/* Axe */}
                <line
                    x1={PAD}
                    y1={44}
                    x2={W - PAD + 8}
                    y2={44}
                    stroke="rgba(165,180,252,0.55)"
                    strokeWidth="2"
                    strokeLinecap="round"
                />
                <polygon
                    points={`${W - PAD + 8},40 ${W - PAD + 16},44 ${W - PAD + 8},48`}
                    fill="rgba(165,180,252,0.55)"
                />

                {/* Sous-graduations */}
                {ticks.map((v, i) => {
                    const isInt = Number.isInteger(v);
                    if (isInt) return null; // entiers gérés séparément
                    return (
                        <line
                            key={i}
                            x1={toX(v)}
                            y1={39}
                            x2={toX(v)}
                            y2={49}
                            stroke="rgba(165,180,252,0.3)"
                            strokeWidth="1"
                        />
                    );
                })}

                {/* Graduations entières + labels */}
                {integers.map((n) => (
                    <g key={n}>
                        <line
                            x1={toX(n)}
                            y1={36}
                            x2={toX(n)}
                            y2={52}
                            stroke="rgba(165,180,252,0.65)"
                            strokeWidth="2"
                        />
                        <text
                            x={toX(n)}
                            y={66}
                            textAnchor="middle"
                            fill="rgba(165,180,252,0.8)"
                            style={{
                                fontFamily: "'Baloo 2',sans-serif",
                                fontSize: "11px",
                                fontWeight: 700,
                            }}
                        >
                            {n}
                        </text>
                    </g>
                ))}

                {/* Marqueur B — dessiné en premier (A passe devant si égaux) */}
                <line
                    x1={toX(valB)}
                    y1={22}
                    x2={toX(valB)}
                    y2={50}
                    stroke={C.colorB}
                    strokeWidth="2"
                    strokeDasharray="3 2"
                    opacity=".7"
                />
                <circle cx={toX(valB)} cy={44} r={7} fill={C.colorB} />
                <text
                    x={toX(valB)}
                    y={18}
                    textAnchor="middle"
                    fill={C.colorB}
                    style={{
                        fontFamily: "'Baloo 2',sans-serif",
                        fontSize: "12px",
                        fontWeight: 800,
                    }}
                >
                    B
                </text>

                {/* Marqueur A */}
                <line
                    x1={toX(valA)}
                    y1={22}
                    x2={toX(valA)}
                    y2={50}
                    stroke={C.colorA}
                    strokeWidth="2"
                    strokeDasharray="3 2"
                    opacity=".7"
                />
                <circle cx={toX(valA)} cy={44} r={7} fill={C.colorA} />
                <text
                    x={toX(valA)}
                    y={18}
                    textAnchor="middle"
                    fill={C.colorA}
                    style={{
                        fontFamily: "'Baloo 2',sans-serif",
                        fontSize: "12px",
                        fontWeight: 800,
                    }}
                >
                    A
                </text>
            </svg>
        </div>
    );
}

/**
 * Interface de comparaison de deux fractions — Monde 7 (WorldBridge).
 *
 * Phase "question" : boutons A / B / Égales.
 * Phase "revealed" : mini-droite SVG avec marqueurs A (indigo) et B (violet)
 *   directement étiquetés — pas de légende séparée, code couleur cohérent
 *   avec les FractionDisplay au-dessus.
 *
 * @param {Object}                  props
 * @param {Object}                  props.challenge
 * @param {'question'|'revealed'}   props.phase
 * @param {function}                props.onAnswer
 * @param {boolean}                 [props.showHint=false]
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
            <p
                style={{
                    fontFamily: "'Nunito',sans-serif",
                    color: C.sub,
                    fontSize: ".88rem",
                    textAlign: "center",
                    marginBottom: "1.5rem",
                    lineHeight: 1.5,
                }}
            >
                {phase === "revealed"
                    ? "Leurs positions sur la demi-droite :"
                    : "Laquelle de ces deux fractions est la plus grande ?"}
            </p>

            {/* Fractions A et B côte à côte — labels colorés */}
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
                                fontFamily: "'Baloo 2',sans-serif",
                                fontWeight: 800,
                                color,
                                fontSize: ".78rem",
                                marginBottom: ".4rem",
                                letterSpacing: ".06em",
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

            {/* Phase question — boutons */}
            {phase === "question" && (
                <div
                    style={{
                        display: "flex",
                        gap: ".75rem",
                        justifyContent: "center",
                        flexWrap: "wrap",
                    }}
                >
                    <button
                        onClick={() => onAnswer("A")}
                        style={btnChoice(C.colorA)}
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
                        style={btnChoice(C.colorB)}
                    >
                        B est plus grande
                    </button>
                </div>
            )}

            {/* Phase revealed — droite avec A et B étiquetés dans leurs couleurs */}
            {phase === "revealed" && (
                <div style={{ marginTop: ".25rem" }}>
                    <CompareNumberLine
                        valA={valA}
                        denA={fracA.den}
                        valB={valB}
                        denB={fracB.den}
                    />
                </div>
            )}

            {/* Indice */}
            {showHint && phase === "question" && (
                <p
                    style={{
                        fontFamily: "'Nunito',sans-serif",
                        color: "#fcd34d",
                        fontSize: ".82rem",
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

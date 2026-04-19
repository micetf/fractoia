import FractionDisplay from "./FractionDisplay.jsx";

/**
 * Affiche l'équation d'addition ou soustraction de fractions :
 *   num1/den  +  num2/den  =  ?/den   (avant correction)
 *   num1/den  +  num2/den  =  res/den (après correction)
 *
 * Le dénominateur du résultat est toujours affiché pour guider
 * l'élève : il sait qu'il cherche une fraction de même dénominateur.
 *
 * @param {Object}   props
 * @param {number}   props.num1
 * @param {number}   props.num2
 * @param {number}   props.den
 * @param {'+'|'-'}  props.op
 * @param {boolean}  [props.showResult=false]
 * @param {number}   [props.resultNum]    - Numérateur du résultat (si showResult)
 */
function FractionEquation({
    num1,
    num2,
    den,
    op,
    showResult = false,
    resultNum,
}) {
    const opSymbol = op === "+" ? "+" : "−";
    const opColor = op === "+" ? "#059669" : "#dc2626";

    const sym = (content, color = "#92400e") => ({
        fontFamily: "'Baloo 2', sans-serif",
        fontSize: "2rem",
        fontWeight: 800,
        color,
        lineHeight: 1,
        alignSelf: "center",
    });

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.75rem",
                flexWrap: "wrap",
                padding: "0.75rem",
                background: "rgba(255,255,255,0.08)",
                borderRadius: "1rem",
                border: "1.5px solid rgba(251,191,36,0.3)",
            }}
        >
            <FractionDisplay
                numerator={num1}
                denominator={den}
                size="lg"
                color="#fef3c7"
                barColor="#fbbf24"
            />

            <span style={sym(opSymbol, opColor)}>{opSymbol}</span>

            <FractionDisplay
                numerator={num2}
                denominator={den}
                size="lg"
                color="#fef3c7"
                barColor="#fbbf24"
            />

            <span style={sym("=")}> =</span>

            {showResult ? (
                /* Correction : affiche le résultat */
                <FractionDisplay
                    numerator={resultNum}
                    denominator={den}
                    size="lg"
                    color="#6ee7b7"
                    barColor="#10b981"
                />
            ) : (
                /* Avant correction : affiche ?/den pour guider */
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "0.2rem",
                    }}
                >
                    <span
                        style={{
                            fontFamily: "'Baloo 2', sans-serif",
                            fontSize: "2.5rem",
                            fontWeight: 800,
                            color: "#fcd34d",
                            lineHeight: 1,
                        }}
                    >
                        ?
                    </span>
                    <span
                        style={{
                            display: "block",
                            height: "4px",
                            width: "2.5rem",
                            background: "#fbbf24",
                            borderRadius: "999px",
                        }}
                    />
                    <span
                        style={{
                            fontFamily: "'Baloo 2', sans-serif",
                            fontSize: "2.5rem",
                            fontWeight: 800,
                            color: "#fef3c7",
                            lineHeight: 1,
                        }}
                    >
                        {den}
                    </span>
                </div>
            )}
        </div>
    );
}

export default FractionEquation;

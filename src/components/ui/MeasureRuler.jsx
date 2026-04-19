/**
 * Règle SVG annotée pour le sens fraction-mesure (Sprint 3).
 *
 * Visualise la fraction comme longueur physique : la pièce de bois
 * occupe `numerator` graduations sur `denominator` de la règle.
 * Didactique : la fraction *est* le résultat du mesurage, pas une opération.
 *
 * @param {Object} props
 * @param {number} props.numerator
 * @param {number} props.denominator
 * @param {string} [props.unit="m"]
 */
function MeasureRuler({ numerator, denominator, unit = "m" }) {
    const W = 480,
        H = 88,
        PAD = 36;
    const rulerW = W - 2 * PAD;
    const segW = rulerW / denominator;
    const plankW = segW * numerator;
    const RY = 44,
        RH = 20; // ruler Y-center et hauteur

    return (
        <div aria-hidden="true" style={{ padding: "0.25rem 0 0.5rem" }}>
            <svg
                viewBox={`0 0 ${W} ${H}`}
                className="w-full"
                style={{ maxHeight: "5.5rem" }}
            >
                {/* Fond règle */}
                <rect
                    x={PAD}
                    y={RY - RH / 2}
                    width={rulerW}
                    height={RH}
                    rx="3"
                    fill="#fef9ec"
                    stroke="#d4a96a"
                    strokeWidth="1.5"
                />

                {/* Segments — premier `num` en ambre */}
                {Array.from({ length: denominator }, (_, i) => (
                    <rect
                        key={i}
                        x={PAD + i * segW + 0.75}
                        y={RY - RH / 2 + 1}
                        width={segW - 1.5}
                        height={RH - 2}
                        rx="2"
                        fill={i < numerator ? "#fbbf24" : "transparent"}
                        opacity={i < numerator ? 0.75 : 1}
                    />
                ))}

                {/* Traits de graduation */}
                {Array.from({ length: denominator + 1 }, (_, i) => (
                    <line
                        key={i}
                        x1={PAD + i * segW}
                        y1={RY - RH / 2 - 3}
                        x2={PAD + i * segW}
                        y2={RY + RH / 2 + 3}
                        stroke="#b45309"
                        strokeWidth={i === 0 || i === denominator ? 2 : 1}
                    />
                ))}

                {/* Accolade longueur mesurée */}
                <line
                    x1={PAD}
                    y1={RY - RH / 2 - 10}
                    x2={PAD + plankW}
                    y2={RY - RH / 2 - 10}
                    stroke="#f59e0b"
                    strokeWidth="2"
                />
                <line
                    x1={PAD}
                    y1={RY - RH / 2 - 14}
                    x2={PAD}
                    y2={RY - RH / 2 - 6}
                    stroke="#f59e0b"
                    strokeWidth="2"
                />
                <line
                    x1={PAD + plankW}
                    y1={RY - RH / 2 - 14}
                    x2={PAD + plankW}
                    y2={RY - RH / 2 - 6}
                    stroke="#f59e0b"
                    strokeWidth="2"
                />
                <text
                    x={PAD + plankW / 2}
                    y={RY - RH / 2 - 18}
                    textAnchor="middle"
                    fontSize="10"
                    fontFamily="'Nunito', sans-serif"
                    fontWeight="700"
                    fill="#b45309"
                >
                    ? {unit}
                </text>

                {/* Labels 0 et 1 */}
                <text
                    x={PAD}
                    y={H - 4}
                    textAnchor="middle"
                    fontSize="11"
                    fontFamily="'Baloo 2', sans-serif"
                    fill="#5c3d1a"
                >
                    0
                </text>
                <text
                    x={PAD + rulerW}
                    y={H - 4}
                    textAnchor="middle"
                    fontSize="11"
                    fontFamily="'Baloo 2', sans-serif"
                    fill="#5c3d1a"
                >
                    1 {unit}
                </text>
            </svg>
        </div>
    );
}

export default MeasureRuler;

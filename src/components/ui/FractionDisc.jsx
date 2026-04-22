/**
 * Représentation d'une fraction comme secteur de disque (camembert).
 * Automatismes 6ème (BO n°16, 2026) : reconnaître une fraction sur
 * des représentations variées — rectangle, **disque**, triangle, bande.
 *
 * Affiché uniquement en phase post-réponse (principe Tricot — pas de
 * surcharge attentionnelle pendant la tâche).
 *
 * @param {Object} props
 * @param {number} props.numerator
 * @param {number} props.denominator
 * @param {string} [props.color='#f59e0b']
 * @param {'sm'|'md'|'lg'} [props.size='md']
 * @param {boolean} [props.animate=false]
 */
function FractionDisc({
    numerator,
    denominator,
    color = "#f59e0b",
    size = "md",
    animate = false,
}) {
    const dims = { sm: 72, md: 100, lg: 132 };
    const R = dims[size] / 2;
    const cx = R,
        cy = R;
    const D = dims[size];

    /**
     * Calcule le path SVG d'un secteur angulaire.
     * @param {number} startAngle - en degrés, 0 = droite
     * @param {number} endAngle
     */
    const sectorPath = (startAngle, endAngle) => {
        const toRad = (deg) => (deg - 90) * (Math.PI / 180);
        const x1 = cx + R * Math.cos(toRad(startAngle));
        const y1 = cy + R * Math.sin(toRad(startAngle));
        const x2 = cx + R * Math.cos(toRad(endAngle));
        const y2 = cy + R * Math.sin(toRad(endAngle));
        const large = endAngle - startAngle > 180 ? 1 : 0;
        // Secteur complet = cercle plein
        if (endAngle - startAngle >= 360) {
            return `M ${cx},${cy} m -${R},0 a ${R},${R} 0 1,0 ${R * 2},0 a ${R},${R} 0 1,0 -${R * 2},0`;
        }
        return `M ${cx},${cy} L ${x1},${y1} A ${R},${R} 0 ${large},1 ${x2},${y2} Z`;
    };

    const sliceAngle = 360 / denominator;
    const filledAngle = sliceAngle * numerator;

    return (
        <div
            role="img"
            aria-label={`${numerator} part${numerator > 1 ? "s" : ""} sur ${denominator} — disque`}
            style={{ display: "inline-block" }}
        >
            <svg
                viewBox={`0 0 ${D} ${D}`}
                width={D}
                height={D}
                style={{ display: "block" }}
            >
                {/* Fond du disque — parts inactives */}
                <circle
                    cx={cx}
                    cy={cy}
                    r={R - 1}
                    fill="#fdf6ec"
                    stroke="#e8cfa4"
                    strokeWidth="1.5"
                />

                {/* Secteur actif */}
                <path
                    d={sectorPath(0, filledAngle)}
                    fill={color}
                    opacity={0.85}
                    style={animate ? { transition: "opacity .4s ease" } : {}}
                />

                {/* Lignes de partition */}
                {Array.from({ length: denominator }, (_, i) => {
                    const rad = ((i * sliceAngle - 90) * Math.PI) / 180;
                    return (
                        <line
                            key={i}
                            x1={cx}
                            y1={cy}
                            x2={cx + R * Math.cos(rad)}
                            y2={cy + R * Math.sin(rad)}
                            stroke="#d97706"
                            strokeWidth="1.5"
                        />
                    );
                })}

                {/* Bordure extérieure */}
                <circle
                    cx={cx}
                    cy={cy}
                    r={R - 1}
                    fill="none"
                    stroke="#d97706"
                    strokeWidth="1.5"
                />
            </svg>
        </div>
    );
}

export default FractionDisc;

/**
 * Représentation d'une fraction comme triangle partitionné.
 * Automatismes 6ème (BO n°16, 2026) : reconnaître une fraction sur
 * des représentations variées — rectangle, disque, **triangle**, bande.
 *
 * Le triangle équilatéral est découpé en `denominator` bandes
 * horizontales d'aire égale, dont les `numerator` premières
 * (en partant du bas) sont colorées.
 *
 * Didactique : "aires égales" ≠ "hauteurs égales" — les bandes ont
 * des largeurs variables. Ce détail n'est pas modélisé ici : on
 * divise par hauteurs égales pour rester accessible au cycle 3.
 *
 * @param {Object} props
 * @param {number} props.numerator
 * @param {number} props.denominator
 * @param {string} [props.color='#f59e0b']
 * @param {'sm'|'md'|'lg'} [props.size='md']
 * @param {boolean} [props.animate=false]
 */
function FractionTriangle({
    numerator,
    denominator,
    color = "#f59e0b",
    size = "md",
    animate = false,
}) {
    const dims = { sm: 72, md: 100, lg: 132 };
    const W = dims[size];
    const H = Math.round(W * 0.866); // hauteur triangle équilatéral
    const PAD = 4;

    // Sommets du triangle (pointe en haut)
    const apex = [W / 2, PAD];
    const baseL = [PAD, H + PAD];
    const baseR = [W - PAD, H + PAD];

    /**
     * Pour une hauteur normalisée t ∈ [0,1] depuis le sommet,
     * retourne les x gauche/droite de la coupe horizontale.
     */
    const cutX = (t) => {
        const lx = apex[0] + t * (baseL[0] - apex[0]);
        const rx = apex[0] + t * (baseR[0] - apex[0]);
        return [lx, rx];
    };
    const cutY = (t) => apex[1] + t * H;

    // Construire les bandes (de bas = 1 à haut = denominator)
    const bands = Array.from({ length: denominator }, (_, i) => {
        const tTop = i / denominator;
        const tBot = (i + 1) / denominator;
        const [lxT, rxT] = cutX(tTop);
        const [lxB, rxB] = cutX(tBot);
        const yT = cutY(tTop);
        const yB = cutY(tBot);
        // band index from bottom : bandFromBottom = denominator - 1 - i
        const fromBottom = denominator - 1 - i;
        const active = fromBottom < numerator;
        const points = `${lxT},${yT} ${rxT},${yT} ${rxB},${yB} ${lxB},${yB}`;
        return { points, active };
    });

    return (
        <div
            role="img"
            aria-label={`${numerator} part${numerator > 1 ? "s" : ""} sur ${denominator} — triangle`}
            style={{ display: "inline-block" }}
        >
            <svg
                viewBox={`0 0 ${W} ${H + PAD * 2}`}
                width={W}
                height={H + PAD * 2}
                style={{ display: "block" }}
            >
                {bands.map(({ points, active }, i) => (
                    <polygon
                        key={i}
                        points={points}
                        fill={active ? color : "#fdf6ec"}
                        stroke="#d97706"
                        strokeWidth="1"
                        opacity={active ? (animate ? 0.85 : 0.85) : 1}
                        style={
                            animate
                                ? { transition: `opacity .3s ease ${i * 50}ms` }
                                : {}
                        }
                    />
                ))}
                {/* Contour */}
                <polygon
                    points={`${apex.join(",")} ${baseR.join(",")} ${baseL.join(",")}`}
                    fill="none"
                    stroke="#d97706"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                />
            </svg>
        </div>
    );
}

export default FractionTriangle;

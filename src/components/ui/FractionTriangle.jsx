/**
 * Représentation d'une fraction comme triangle partitionné en secteurs.
 * Automatismes 6ème (BO n°16, 2026) : reconnaître une fraction sur
 * des représentations variées — rectangle, disque, **triangle**, bande.
 *
 * Construction géométrique correcte :
 * La base est divisée en `denominator` segments ÉGAUX.
 * Des lignes relient chaque point de division à l'apex (sommet).
 * Chaque secteur triangulaire a EXACTEMENT la même aire :
 *   aire = ½ × (base / denominator) × hauteur
 * Colorier les `numerator` premiers secteurs (de gauche) représente
 * fidèlement la fraction num/den.
 *
 * @param {Object}  props
 * @param {number}  props.numerator
 * @param {number}  props.denominator
 * @param {string}  [props.color='#f59e0b']
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
    const dims = { sm: 80, md: 110, lg: 144 };
    const W = dims[size];
    const H = Math.round(W * 0.8); // hauteur un peu moins que la base
    const PAD = 6;

    // Coordonnées des 3 sommets du grand triangle
    const apex = [W / 2, PAD]; // sommet haut
    const baseY = H + PAD; // y de la base
    const baseXL = PAD; // x coin bas-gauche
    const baseXR = W - PAD; // x coin bas-droite
    const baseLen = baseXR - baseXL;

    // Points de division sur la base
    // Point i : baseXL + i * (baseLen / denominator)
    const basePoint = (i) => baseXL + (i * baseLen) / denominator;

    // Chaque secteur i est le triangle : apex → basePoint(i) → basePoint(i+1)
    const sectors = Array.from({ length: denominator }, (_, i) => {
        const x1 = basePoint(i);
        const x2 = basePoint(i + 1);
        const pts = `${apex[0]},${apex[1]} ${x1},${baseY} ${x2},${baseY}`;
        return { pts, active: i < numerator };
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
                {/* Secteurs remplis */}
                {sectors.map(({ pts, active }, i) => (
                    <polygon
                        key={i}
                        points={pts}
                        fill={active ? color : "#fdf6ec"}
                        stroke="#d97706"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                        style={
                            animate
                                ? {
                                      transition: `opacity .3s ease ${i * 60}ms`,
                                      opacity: active ? 0.88 : 1,
                                  }
                                : { opacity: active ? 0.88 : 1 }
                        }
                    />
                ))}
                {/* Contour extérieur */}
                <polygon
                    points={`${apex[0]},${apex[1]} ${baseXL},${baseY} ${baseXR},${baseY}`}
                    fill="none"
                    stroke="#d97706"
                    strokeWidth="2"
                    strokeLinejoin="round"
                />
            </svg>
        </div>
    );
}

export default FractionTriangle;

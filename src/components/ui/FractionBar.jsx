/**
 * Représentation visuelle d'une fraction comme partition d'un tout.
 * Sens « fraction-partage » : `numerator` parties colorées sur `denominator` totales.
 *
 * Rôle didactique : établir le lien entre la notation a/b et
 * l'image mentale "a parties sur b parties égales" avant le
 * placement sur la droite numérique.
 *
 * @param {Object} props
 * @param {number} props.numerator
 * @param {number} props.denominator
 * @param {string} [props.color='#f59e0b']    - Couleur des parties actives
 * @param {'sm'|'md'|'lg'} [props.size='md']
 * @param {boolean} [props.animate=false]
 */
function FractionBar({
    numerator,
    denominator,
    color = "#f59e0b",
    size = "md",
    animate = false,
}) {
    const heights = { sm: "2rem", md: "3.5rem", lg: "5rem" };
    const gaps = { sm: "2px", md: "3px", lg: "4px" };
    const radii = { sm: "6px", md: "10px", lg: "12px" };
    const borderWidths = { sm: "1.5px", md: "2px", lg: "2.5px" };

    const gap = gaps[size];
    const radius = radii[size];
    const border = borderWidths[size];

    return (
        <div
            role="img"
            aria-label={`${numerator} partie${numerator > 1 ? "s" : ""} sur ${denominator}`}
            style={{ width: "100%" }}
        >
            {/* Barre partitionnée */}
            <div style={{ display: "flex", gap, padding: "0 0.25rem" }}>
                {Array.from({ length: denominator }, (_, i) => {
                    const active = i < numerator;
                    const isFirst = i === 0;
                    const isLast = i === denominator - 1;

                    return (
                        <div
                            key={i}
                            style={{
                                flex: 1,
                                height: heights[size],
                                borderRadius: isFirst
                                    ? `${radius} 0 0 ${radius}`
                                    : isLast
                                      ? `0 ${radius} ${radius} 0`
                                      : "2px",
                                backgroundColor: active ? color : "#fdf6ec",
                                border: `${border} solid ${active ? "#d97706" : "#e8cfa4"}`,
                                transition: animate
                                    ? `background-color 0.25s ease ${i * 60}ms, border-color 0.25s ease ${i * 60}ms`
                                    : "none",
                                boxShadow: active
                                    ? `inset 0 2px 4px rgba(180,83,9,0.15)`
                                    : "none",
                            }}
                        />
                    );
                })}
            </div>

            {/* Repères 0 et 1 sous la barre */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "0.25rem 0.25rem 0",
                    fontFamily: "'Baloo 2', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    color: "#9c6b30",
                }}
            >
                <span>0</span>
                <span>1</span>
            </div>
        </div>
    );
}

export default FractionBar;

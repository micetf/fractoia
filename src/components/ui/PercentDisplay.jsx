/**
 * Affiche un pourcentage de manière centrale et lisible, avec un fond
 * coloré qui renforce visuellement la notion de "partie pour cent".
 *
 * Utilisé dans WorldEquinox pour afficher le % d'un défi "sens" ou la
 * réponse attendue d'un défi "calcul".
 *
 * @param {Object}  props
 * @param {number}  props.pct         - Valeur (0-100)
 * @param {string}  [props.label]     - Texte affiché sous le %, ex: "des billets"
 * @param {string}  [props.color='#0ea5e9']
 * @param {'sm'|'md'|'lg'} [props.size='md']
 */
function PercentDisplay({ pct, label, color = "#0ea5e9", size = "md" }) {
    const fontSizes = { sm: "2rem", md: "3rem", lg: "4rem" };
    const barH = { sm: "1.25rem", md: "1.75rem", lg: "2.25rem" };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: ".5rem",
            }}
        >
            {/* Valeur numérique */}
            <div
                style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: ".15em",
                }}
            >
                <span
                    style={{
                        fontFamily: "'Baloo 2',sans-serif",
                        fontWeight: 800,
                        fontSize: fontSizes[size],
                        color,
                        lineHeight: 1,
                    }}
                >
                    {pct}
                </span>
                <span
                    style={{
                        fontFamily: "'Baloo 2',sans-serif",
                        fontWeight: 700,
                        fontSize: `calc(${fontSizes[size]} * .55)`,
                        color,
                        lineHeight: 1,
                    }}
                >
                    %
                </span>
            </div>

            {/* Barre "pour cent" — visualise pct/100 */}
            <div
                aria-label={`${pct} pour cent`}
                style={{
                    width: "9rem",
                    height: barH[size],
                    borderRadius: "999px",
                    background: "rgba(255,255,255,0.12)",
                    overflow: "hidden",
                    border: `1.5px solid ${color}44`,
                }}
            >
                <div
                    style={{
                        width: `${pct}%`,
                        height: "100%",
                        borderRadius: "999px",
                        background: color,
                        opacity: 0.8,
                        transition: "width .6s ease",
                    }}
                />
            </div>

            {/* Label contextuel */}
            {label && (
                <p
                    style={{
                        fontFamily: "'Nunito',sans-serif",
                        fontSize: ".78rem",
                        color: "rgba(255,255,255,0.65)",
                        margin: 0,
                        textAlign: "center",
                    }}
                >
                    {label}
                </p>
            )}
        </div>
    );
}

export default PercentDisplay;

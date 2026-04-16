/**
 * Fraction verticale utilisée en interne dans DecompBubble.
 * @param {Object} props
 * @param {number} props.n       - Numérateur
 * @param {number} props.denom   - Dénominateur
 * @param {string} [props.color] - Couleur du texte et de la barre
 */
function InlineFrac({ n, denom, color = "#0284c7" }) {
    const barColor = color === "#0284c7" ? "#38bdf8" : "#34d399";
    return (
        <span
            style={{
                display: "inline-flex",
                flexDirection: "column",
                alignItems: "center",
                lineHeight: 1,
                gap: "2px",
                color,
            }}
        >
            <span>{n}</span>
            <span
                style={{
                    display: "block",
                    width: "100%",
                    height: "2px",
                    backgroundColor: barColor,
                    borderRadius: "999px",
                }}
                aria-hidden="true"
            />
            <span>{denom}</span>
        </span>
    );
}

/**
 * Affiche la décomposition d'une fraction supérieure à 1.
 * Ex : 7/3 → "2 + 1/3 = 7/3" (toutes les fractions en notation verticale)
 *
 * Cœur pédagogique anti-obstacle fractions > 1 (Brousseau / projet REPSAF).
 *
 * @param {Object} props
 * @param {number} props.ip  - Partie entière
 * @param {number} props.fn  - Numérateur de la partie fractionnaire
 * @param {number} props.d   - Dénominateur commun
 * @param {number} props.num - Numérateur de la fraction totale
 */
function DecompBubble({ ip, fn, d, num }) {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "0.25rem",
            }}
        >
            <div
                style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.375rem 1rem",
                    borderRadius: "1rem",
                    border: "2px solid #fcd34d",
                    backgroundColor: "#fffbeb",
                    fontFamily: "'Baloo 2', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                }}
                role="note"
                aria-label={`${num} sur ${d} se décompose en ${ip} et ${fn} sur ${d}`}
            >
                <span style={{ color: "#5c3d1a" }}>{ip}</span>
                <span
                    style={{
                        color: "#9c6b30",
                        fontWeight: 400,
                        fontSize: "0.8rem",
                    }}
                >
                    +
                </span>
                <InlineFrac n={fn} denom={d} color="#0284c7" />
                <span
                    style={{
                        color: "#9c6b30",
                        fontWeight: 400,
                        fontSize: "0.8rem",
                    }}
                >
                    =
                </span>
                <InlineFrac n={num} denom={d} color="#059669" />
            </div>
        </div>
    );
}

export default DecompBubble;

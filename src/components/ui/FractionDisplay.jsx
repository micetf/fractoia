/**
 * Affiche une fraction sous forme verticale (numérateur / barre / dénominateur).
 *
 * Utilise des styles inline pour garantir un rendu indépendant du CSS Tailwind,
 * évitant tout problème lié aux couleurs custom non définies dans @theme.
 *
 * @param {Object} props
 * @param {number} props.numerator
 * @param {number} props.denominator
 * @param {'sm'|'md'|'lg'|'xl'} [props.size='xl']
 * @param {string} [props.color='#2d1a08'] - Couleur des chiffres
 * @param {string} [props.barColor='#5c3d1a'] - Couleur de la barre
 */
function FractionDisplay({
    numerator,
    denominator,
    size = "xl",
    color = "#2d1a08",
    barColor = "#5c3d1a",
}) {
    const fontSizes = {
        sm: "1.25rem",
        md: "1.875rem",
        lg: "2.25rem",
        xl: "3rem",
    };
    const barThickness = { sm: "2px", md: "3px", lg: "3px", xl: "4px" };
    const paddings = {
        sm: "0 0.5rem",
        md: "0 0.75rem",
        lg: "0 0.875rem",
        xl: "0 1rem",
    };

    const numStyle = {
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        lineHeight: 1,
        fontFamily: "'Baloo 2', system-ui, sans-serif",
        fontWeight: 800,
        color,
        gap: "0.2em",
    };

    const barStyle = {
        display: "block",
        width: "100%",
        height: barThickness[size],
        backgroundColor: barColor,
        borderRadius: "999px",
        margin: "0.1em 0",
    };

    const digitStyle = {
        fontSize: fontSizes[size],
        padding: paddings[size],
    };

    return (
        <span
            style={numStyle}
            role="img"
            aria-label={`${numerator} sur ${denominator}`}
        >
            <span style={digitStyle}>{numerator}</span>
            <span style={barStyle} aria-hidden="true" />
            <span style={digitStyle}>{denominator}</span>
        </span>
    );
}

export default FractionDisplay;

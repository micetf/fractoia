/**
 * Nœud interactif sur WorldMap — bouton HTML en overlay sur le SVG de l'île.
 *
 * Sprint H — touch tablette :
 *   Hitbox minimale 44×44px (WCAG 2.5.5 / Apple HIG).
 *   Le bouton est centré sur ses coordonnées (transform: translate(-50%,-50%))
 *   et sa taille minimale est garantie par minWidth/minHeight.
 *
 * ⚠️ Ce composant ne doit JAMAIS être rendu à l'intérieur d'un <svg>.
 *   Il est positionné en absolu dans un <div position:relative> parent.
 *
 * @param {Object}   props
 * @param {string}   props.emoji
 * @param {string}   props.label
 * @param {string}   [props.sub]
 * @param {boolean}  [props.unlocked=false]
 * @param {boolean}  [props.comingSoon=false]
 * @param {number}   [props.stars=0]
 * @param {function} [props.onClick]
 * @param {Object}   [props.style]   - left/top/transform depuis WorldMap
 */
function WorldNode({
    emoji,
    label,
    unlocked = false,
    comingSoon = false,
    stars = 0,
    onClick,
    style = {},
}) {
    const isClickable = unlocked && !comingSoon;

    const handleClick = () => {
        if (isClickable) onClick?.();
    };

    return (
        <button
            onClick={handleClick}
            disabled={!isClickable}
            title={comingSoon ? `${label} — bientôt disponible` : label}
            aria-label={`${label}${!unlocked ? " — verrouillé" : stars > 0 ? ` — ${stars} étoile${stars > 1 ? "s" : ""}` : ""}`}
            style={{
                position: "absolute",
                ...style,
                /* Hitbox minimale 44×44px — WCAG 2.5.5 */
                minWidth: "44px",
                minHeight: "44px",
                padding: "0",
                /* Présentation */
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "2px",
                background: "none",
                border: "none",
                cursor: isClickable ? "pointer" : "default",
                opacity: !unlocked ? 0.55 : 1,
                transition: "opacity .2s, transform .15s",
                /* Agrandissement au survol/focus */
                ...(isClickable ? {} : {}),
            }}
            onMouseEnter={(e) => {
                if (isClickable)
                    e.currentTarget.style.transform = style.transform
                        ? style.transform + " scale(1.15)"
                        : "translate(-50%,-50%) scale(1.15)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform =
                    style.transform || "translate(-50%,-50%)";
            }}
        >
            {/* Bulle emoji */}
            <div
                style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    borderRadius: "50%",
                    background: unlocked
                        ? "rgba(255,255,255,0.92)"
                        : "rgba(255,255,255,0.45)",
                    border: unlocked
                        ? "2px solid rgba(255,255,255,0.8)"
                        : "2px solid rgba(255,255,255,0.3)",
                    boxShadow: unlocked ? "0 2px 8px rgba(0,0,0,0.25)" : "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.25rem",
                    backdropFilter: "blur(4px)",
                }}
            >
                {unlocked ? emoji : "🔒"}
            </div>

            {/* Étoiles */}
            {unlocked && stars > 0 && (
                <div style={{ display: "flex", gap: "1px" }}>
                    {Array.from({ length: 3 }, (_, i) => (
                        <span
                            key={i}
                            style={{
                                fontSize: ".55rem",
                                opacity: i < stars ? 1 : 0.25,
                            }}
                        >
                            ⭐
                        </span>
                    ))}
                </div>
            )}

            {/* Label */}
            <span
                style={{
                    fontFamily: "'Baloo 2', sans-serif",
                    fontWeight: 700,
                    fontSize: ".6rem",
                    color: "#fff",
                    textShadow: "0 1px 3px rgba(0,0,0,0.7)",
                    whiteSpace: "nowrap",
                    maxWidth: "6rem",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    lineHeight: 1.2,
                }}
            >
                {label}
            </span>
        </button>
    );
}

export default WorldNode;

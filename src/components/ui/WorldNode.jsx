/**
 * Nœud interactif sur la WorldMap — représente un monde jouable.
 *
 * Affiche l'emoji, le nom, les étoiles obtenues et l'état (actif / déverrouillé /
 * verrouillé / bientôt disponible). Le style de positionnement absolu est injecté
 * via la prop `style` depuis WorldMap.
 *
 * @param {Object}   props
 * @param {string}   props.emoji
 * @param {string}   props.label       - Nom du monde (sans emoji)
 * @param {string}   props.sub         - Sous-titre didactique (lu par les lecteurs d'écran)
 * @param {number}   props.stars       - Étoiles obtenues (0-3)
 * @param {boolean}  props.unlocked
 * @param {boolean}  [props.comingSoon=false] - Vrai si le composant monde n'existe pas encore
 * @param {boolean}  [props.active=false]     - Vrai si c'est le monde en cours de jeu
 * @param {function} props.onClick
 * @param {Object}   [props.style]     - Positionnement absolu (left, top, transform)
 */
function WorldNode({
    emoji,
    label,
    sub,
    stars,
    unlocked,
    comingSoon = false,
    active = false,
    onClick,
    style,
}) {
    const interactive = unlocked && !comingSoon;

    const bubble = {
        width: "3.25rem",
        height: "3.25rem",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.6rem",
        border: `3px solid ${
            active
                ? "#fbbf24"
                : interactive
                  ? "rgba(255,255,255,0.75)"
                  : "rgba(255,255,255,0.2)"
        }`,
        backgroundColor: active
            ? "rgba(251,191,36,0.28)"
            : interactive
              ? "rgba(255,255,255,0.16)"
              : "rgba(0,0,0,0.38)",
        boxShadow: active
            ? "0 0 0 5px rgba(251,191,36,0.3), 0 4px 20px rgba(0,0,0,0.5)"
            : interactive
              ? "0 4px 14px rgba(0,0,0,0.35)"
              : "none",
        backdropFilter: "blur(6px)",
        filter: interactive ? "none" : "grayscale(0.7) brightness(0.5)",
        transition: "transform 0.15s, box-shadow 0.15s",
    };

    /* Ligne d'étoiles : ·· si aucune, ⭐ par étoile gagnée */
    const starsLine = interactive
        ? Array.from({ length: 3 }, (_, i) => (i < stars ? "⭐" : "·")).join("")
        : null;

    const labelColor = interactive ? "#fff" : "rgba(255,255,255,0.35)";

    return (
        <button
            onClick={interactive ? onClick : undefined}
            aria-label={`${label} — ${sub}${
                comingSoon
                    ? ", bientôt disponible"
                    : unlocked
                      ? `, ${stars} étoile${stars !== 1 ? "s" : ""}`
                      : ", verrouillé"
            }`}
            aria-pressed={active}
            style={{
                position: "absolute",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.2rem",
                background: "none",
                border: "none",
                cursor: interactive ? "pointer" : "default",
                padding: 0,
                userSelect: "none",
                ...style,
            }}
        >
            <div style={bubble}>
                {comingSoon ? "🔜" : unlocked ? emoji : "🔒"}
            </div>

            <span
                style={{
                    fontFamily: "'Baloo 2', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.6rem",
                    color: labelColor,
                    textAlign: "center",
                    maxWidth: "4.75rem",
                    lineHeight: 1.3,
                    textShadow: "0 1px 6px rgba(0,0,0,0.85)",
                }}
            >
                {label}
            </span>

            {starsLine && (
                <span
                    style={{
                        fontSize: "0.55rem",
                        letterSpacing: "0.08em",
                        opacity: 0.85,
                    }}
                >
                    {starsLine}
                </span>
            )}

            {comingSoon && (
                <span
                    style={{
                        fontSize: "0.5rem",
                        backgroundColor: "rgba(251,191,36,0.88)",
                        color: "#2d1a08",
                        borderRadius: "4px",
                        padding: "1px 5px",
                        fontWeight: 700,
                        fontFamily: "'Nunito', sans-serif",
                    }}
                >
                    Bientôt
                </span>
            )}
        </button>
    );
}

export default WorldNode;

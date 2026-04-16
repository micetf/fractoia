/**
 * Affiche jusqu'à 3 étoiles de progression avec animation d'apparition.
 *
 * @param {Object} props
 * @param {number} props.count    - Nombre d'étoiles gagnées (0-3)
 * @param {number} [props.total=3] - Nombre total d'étoiles possibles
 * @param {'sm'|'md'|'lg'} [props.size='md'] - Taille des étoiles
 * @param {boolean} [props.animate=false]    - Déclenche l'animation pop
 */
function ProgressStars({ count, total = 3, size = "md", animate = false }) {
    const sizes = { sm: "text-xl", md: "text-3xl", lg: "text-5xl" };
    const gaps = { sm: "gap-1", md: "gap-2", lg: "gap-3" };

    return (
        <div
            className={`flex items-center ${gaps[size]}`}
            role="img"
            aria-label={`${count} étoile${count > 1 ? "s" : ""} sur ${total}`}
        >
            {Array.from({ length: total }, (_, i) => {
                const earned = i < count;
                return (
                    <span
                        key={i}
                        className={`
              ${sizes[size]}
              transition-transform
              ${earned && animate ? "animate-star-pop" : ""}
              ${earned ? "drop-shadow" : "opacity-25 grayscale"}
            `}
                        style={
                            earned && animate
                                ? {
                                      animationDelay: `${i * 120}ms`,
                                      animationFillMode: "both",
                                  }
                                : {}
                        }
                        aria-hidden="true"
                    >
                        {earned ? "⭐" : "☆"}
                    </span>
                );
            })}
        </div>
    );
}

export default ProgressStars;

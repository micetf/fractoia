import FractionBar from "./FractionBar.jsx";
import NumberLine from "./NumberLine.jsx";

/**
 * Multi-représentations coordonnées — Sprint F.
 *
 * Fondement didactique : Rau (2017) — les représentations multiples sont efficaces
 * à condition d'être EXPLICITEMENT mises en correspondance.
 *
 * Ce composant affiche :
 *   1. FractionBar   — sens partage (a parts sur b)
 *   2. Pont visuel   — ligne pointillée + label "= même fraction"
 *   3. NumberLine    — sens magnitude (position sur la demi-droite)
 *
 * La correspondance est soulignée visuellement : la FractionBar et la
 * NumberLine partagent la même couleur, et une ligne relie leur position.
 *
 * Affiché uniquement POST-RÉPONSE (principe Tricot : pas de surcharge
 * attentionnelle pendant la tâche de placement).
 *
 * @param {Object}  props
 * @param {number}  props.numerator
 * @param {number}  props.denominator
 * @param {number}  props.target      - Valeur correcte sur la demi-droite
 * @param {number}  [props.max=2]
 * @param {string}  [props.color='#f59e0b']
 */
function DualRepresentation({
    numerator,
    denominator,
    target,
    max = 2,
    color = "#f59e0b",
}) {
    return (
        <div
            style={{
                background: `${color}10`,
                border: `1.5px solid ${color}30`,
                borderRadius: "1rem",
                padding: ".875rem 1rem",
                display: "flex",
                flexDirection: "column",
                gap: ".5rem",
            }}
            aria-label="Deux représentations de la même fraction"
        >
            {/* Label */}
            <p
                style={{
                    fontFamily: "'Nunito',sans-serif",
                    fontSize: ".72rem",
                    color: `${color}cc`,
                    margin: 0,
                    textAlign: "center",
                    fontWeight: 600,
                }}
            >
                Même fraction, deux représentations :
            </p>

            {/* Représentation 1 — Barre (partage) */}
            <div>
                <p
                    style={{
                        fontFamily: "'Nunito',sans-serif",
                        fontSize: ".65rem",
                        color: `${color}99`,
                        margin: "0 0 .25rem .25rem",
                    }}
                >
                    ① Barre — parties d'un tout
                </p>
                <FractionBar
                    numerator={numerator}
                    denominator={denominator}
                    color={color}
                    size="sm"
                    animate={false}
                />
            </div>

            {/* Pont visuel */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: ".5rem",
                    padding: "0 .25rem",
                }}
            >
                <div
                    style={{
                        flex: 1,
                        height: "1px",
                        borderTop: `1.5px dashed ${color}44`,
                    }}
                />
                <span
                    style={{
                        fontFamily: "'Nunito',sans-serif",
                        fontSize: ".65rem",
                        color: `${color}88`,
                        whiteSpace: "nowrap",
                    }}
                >
                    = même nombre
                </span>
                <div
                    style={{
                        flex: 1,
                        height: "1px",
                        borderTop: `1.5px dashed ${color}44`,
                    }}
                />
            </div>

            {/* Représentation 2 — Demi-droite (magnitude) */}
            <div>
                <p
                    style={{
                        fontFamily: "'Nunito',sans-serif",
                        fontSize: ".65rem",
                        color: `${color}99`,
                        margin: "0 0 .25rem .25rem",
                    }}
                >
                    ② Demi-droite — position sur les nombres
                </p>
                <NumberLine
                    min={0}
                    max={max}
                    denominator={denominator}
                    value={null}
                    targetValue={target}
                    showDecomposition={false}
                    disabled
                    onChange={() => {}}
                />
            </div>
        </div>
    );
}

export default DualRepresentation;

import { useState, useRef, useCallback } from "react";
import DecompBubble from "./DecompBubble.jsx";

/**
 * @typedef {Object} NumberLineProps
 * @property {number}      [min=0]
 * @property {number}      [max=3]
 * @property {number}      [denominator=4]
 * @property {number|null} [value=null]
 * @property {function(number): void} [onChange]
 * @property {boolean}     [showDecomposition=true]
 * @property {boolean}     [disabled=false]
 * @property {number|null} [targetValue=null]
 */

const VIEW_W = 600;
const VIEW_H = 110;
const PAD = 44;

/**
 * Demi-droite graduée SVG interactive — pièce maîtresse de FRACTOÏA.
 *
 * Sprint G : role="slider" + navigation clavier ← →
 * Sprint H : pointer events (touch natif tablette), touch-action: none,
 *   setPointerCapture pour suivi hors SVG, hitbox étendue implicite
 *   (SVG full-width ≥ 44px de hauteur → cible tactile OK).
 *
 * @param {NumberLineProps} props
 */
function NumberLine({
    min = 0,
    max = 3,
    denominator = 4,
    value = null,
    onChange,
    showDecomposition = true,
    disabled = false,
    targetValue = null,
}) {
    const svgRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [hoverX, setHoverX] = useState(null);
    const [focused, setFocused] = useState(false);

    const toX = useCallback(
        (v) => PAD + ((v - min) / (max - min)) * (VIEW_W - 2 * PAD),
        [min, max]
    );

    const toSnapped = useCallback(
        (x) => {
            const raw = min + ((x - PAD) / (VIEW_W - 2 * PAD)) * (max - min);
            return (
                Math.round(Math.max(min, Math.min(max, raw)) * denominator) /
                denominator
            );
        },
        [min, max, denominator]
    );

    const getSvgX = useCallback((clientX) => {
        const r = svgRef.current?.getBoundingClientRect();
        return r ? ((clientX - r.left) / r.width) * VIEW_W : 0;
    }, []);

    // ── Pointer events (souris + touch) ─────────────────────────────
    const handlePointerDown = useCallback(
        (e) => {
            if (disabled) return;
            e.currentTarget.setPointerCapture(e.pointerId);
            setIsDragging(true);
            onChange?.(toSnapped(getSvgX(e.clientX)));
        },
        [disabled, onChange, toSnapped, getSvgX]
    );

    const handlePointerMove = useCallback(
        (e) => {
            if (disabled) return;
            const sx = getSvgX(e.clientX);
            if (isDragging) onChange?.(toSnapped(sx));
            else setHoverX(sx);
        },
        [disabled, isDragging, onChange, toSnapped, getSvgX]
    );

    const handlePointerUp = useCallback((e) => {
        setIsDragging(false);
        e.currentTarget.releasePointerCapture?.(e.pointerId);
    }, []);

    const handlePointerLeave = useCallback(() => {
        if (!isDragging) setHoverX(null);
    }, [isDragging]);

    // ── Navigation clavier ← → (Sprint G) ───────────────────────────
    const handleKeyDown = useCallback(
        (e) => {
            if (disabled || (e.key !== "ArrowLeft" && e.key !== "ArrowRight"))
                return;
            e.preventDefault();
            const step = 1 / denominator;
            const cur = value ?? min;
            const next =
                e.key === "ArrowRight"
                    ? Math.min(
                          max,
                          Math.round((cur + step) * denominator) / denominator
                      )
                    : Math.max(
                          min,
                          Math.round((cur - step) * denominator) / denominator
                      );
            onChange?.(next);
        },
        [disabled, value, min, max, denominator, onChange]
    );

    const ticks = Array.from(
        { length: (max - min) * denominator + 1 },
        (_, i) => {
            const v = min + i / denominator;
            return { v, x: toX(v), isInt: Number.isInteger(v) };
        }
    );

    const decomp = (() => {
        if (!showDecomposition || value === null || value <= 1) return null;
        const ip = Math.floor(value);
        const fn = Math.round((value - ip) * denominator);
        return fn === 0
            ? null
            : { ip, fn, d: denominator, num: Math.round(value * denominator) };
    })();

    const ghostVal = hoverX !== null && !isDragging ? toSnapped(hoverX) : null;
    const valueText =
        value !== null
            ? `${Math.round(value * denominator)} sur ${denominator}`
            : "non placé";

    return (
        <div className="w-full select-none">
            <svg
                ref={svgRef}
                viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
                className={`w-full ${disabled ? "cursor-default opacity-70" : "cursor-crosshair"}`}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerLeave}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onKeyDown={handleKeyDown}
                tabIndex={disabled ? -1 : 0}
                role="slider"
                aria-valuemin={min}
                aria-valuemax={max}
                aria-valuenow={value ?? min}
                aria-valuetext={valueText}
                aria-label="Demi-droite graduée — utilise les flèches ← → pour déplacer"
                aria-disabled={disabled}
                style={{
                    touchAction: "none",
                    ...(focused && !disabled
                        ? {
                              outline: "3px solid #3b82f6",
                              outlineOffset: "3px",
                              borderRadius: "6px",
                          }
                        : { outline: "none" }),
                }}
            >
                {/* Bandes alternées */}
                {Array.from({ length: max - min }, (_, i) => (
                    <rect
                        key={i}
                        x={toX(min + i)}
                        y={34}
                        width={toX(min + i + 1) - toX(min + i)}
                        height={32}
                        fill={
                            i % 2 === 0
                                ? "rgba(253,211,77,0.12)"
                                : "rgba(186,230,253,0.12)"
                        }
                    />
                ))}

                {/* Axe + flèche */}
                <line
                    x1={PAD}
                    y1={50}
                    x2={VIEW_W - PAD + 6}
                    y2={50}
                    stroke="#9c6b30"
                    strokeWidth="3"
                    strokeLinecap="round"
                />
                <polygon
                    points={`${VIEW_W - PAD + 14},50 ${VIEW_W - PAD + 2},44 ${VIEW_W - PAD + 2},56`}
                    fill="#9c6b30"
                />

                {/* Graduations */}
                {ticks.map(({ v, x, isInt }) => (
                    <g key={v}>
                        <line
                            x1={x}
                            y1={isInt ? 32 : 42}
                            x2={x}
                            y2={isInt ? 68 : 58}
                            stroke={isInt ? "#5c3d1a" : "#d4a96a"}
                            strokeWidth={isInt ? 2.5 : 1.5}
                        />
                        {isInt && (
                            <text
                                x={x}
                                y={84}
                                textAnchor="middle"
                                fontSize="18"
                                fontWeight="700"
                                fill="#5c3d1a"
                                fontFamily="'Baloo 2', sans-serif"
                            >
                                {v}
                            </text>
                        )}
                    </g>
                ))}

                {/* Cible correction */}
                {targetValue !== null && (
                    <line
                        x1={toX(targetValue)}
                        y1={26}
                        x2={toX(targetValue)}
                        y2={74}
                        stroke="#10b981"
                        strokeWidth="3"
                        strokeDasharray="5,3"
                        strokeLinecap="round"
                        opacity="0.8"
                    />
                )}

                {/* Fantôme hover */}
                {!disabled && ghostVal !== null && value === null && (
                    <circle
                        cx={toX(ghostVal)}
                        cy={50}
                        r={10}
                        fill="rgba(245,158,11,0.25)"
                        stroke="rgba(245,158,11,0.55)"
                        strokeWidth="2"
                        strokeDasharray="4,3"
                    />
                )}

                {/* Marqueur réponse */}
                {value !== null && (
                    <g>
                        <circle
                            cx={toX(value)}
                            cy={50}
                            r={12}
                            fill="#f59e0b"
                            stroke="#b45309"
                            strokeWidth="2.5"
                            style={{
                                filter: "drop-shadow(0 2px 5px rgba(180,83,9,0.45))",
                            }}
                        />
                        <circle cx={toX(value)} cy={50} r={4.5} fill="#fff" />
                    </g>
                )}
            </svg>

            {decomp && <DecompBubble {...decomp} denominator={decomp.d} />}
        </div>
    );
}

export default NumberLine;

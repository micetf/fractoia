import { useState } from "react";

/**
 * Saisie d'un nombre décimal — Sprint B, sens decimal-auto et equality-gap.
 *
 * Usage : <DecimalInput key={index} onChange={handleAnswer} disabled={showCorrection} />
 * Utiliser `key={index}` dans le parent pour remonter le composant à chaque défi.
 *
 * Conventions FR :
 * - Virgule (,) acceptée comme séparateur décimal
 * - Point (.) également accepté (clavier numérique mobile)
 * - inputmode="decimal" déclenche le clavier numérique sur mobile
 *
 * Flux :
 * - L'élève tape → onChange(parsedFloat) si valide, onChange(null) sinon
 * - Le parent (WorldFestival) stocke la valeur dans son état `answer`
 * - Le bouton "Valider" du parent appelle check(answer)
 *
 * @param {Object}   props
 * @param {function(number|null): void} props.onChange - Valeur parsée ou null si invalide
 * @param {boolean}  [props.disabled=false]
 * @param {string}   [props.placeholder="0,25"]
 */
function DecimalInput({ onChange, disabled = false, placeholder = "0,25" }) {
    const [raw, setRaw] = useState("");
    const [isInvalid, setIsInvalid] = useState(false);

    /** Normalise la saisie FR (virgule → point) et parse en float. */
    const parse = (str) => {
        const normalized = str.trim().replace(",", ".");
        if (normalized === "" || normalized === ".") return null;
        const n = parseFloat(normalized);
        return isNaN(n) ? null : n;
    };

    const handleChange = (e) => {
        if (disabled) return;
        // Filtre les caractères non numériques sauf virgule, point, signe moins
        const filtered = e.target.value.replace(/[^0-9,.-]/g, "");
        setRaw(filtered);
        const parsed = parse(filtered);
        setIsInvalid(filtered !== "" && parsed === null);
        onChange(parsed);
    };

    const borderColor = isInvalid
        ? "#f87171"
        : raw !== "" && parse(raw) !== null
          ? "#6ee7b7"
          : "rgba(240,171,252,0.4)";

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.5rem",
            }}
        >
            <input
                type="text"
                inputMode="decimal"
                value={raw}
                onChange={handleChange}
                disabled={disabled}
                placeholder={placeholder}
                aria-label="Saisir un nombre décimal"
                style={{
                    width: "9rem",
                    padding: "0.875rem 1rem",
                    borderRadius: "0.875rem",
                    border: `2px solid ${borderColor}`,
                    background: disabled
                        ? "rgba(255,255,255,0.04)"
                        : "rgba(255,255,255,0.1)",
                    color: disabled ? "rgba(240,171,252,0.5)" : "#fdf4ff",
                    fontFamily: "'Baloo 2', sans-serif",
                    fontWeight: 800,
                    fontSize: "1.75rem",
                    textAlign: "center",
                    outline: "none",
                    transition: "border-color 0.2s",
                    letterSpacing: "0.04em",
                }}
            />
            {/* Rappel de convention — visible tant que le champ est vide */}
            {raw === "" && !disabled && (
                <p
                    style={{
                        fontFamily: "'Nunito', sans-serif",
                        fontSize: "0.72rem",
                        color: "rgba(240,171,252,0.6)",
                        margin: 0,
                    }}
                >
                    Utilise la virgule pour les décimaux (ex : 0,25)
                </p>
            )}
            {isInvalid && (
                <p
                    style={{
                        fontFamily: "'Nunito', sans-serif",
                        fontSize: "0.72rem",
                        color: "#f87171",
                        margin: 0,
                    }}
                >
                    Format invalide — essaie par exemple : 0,5 ou 1,25
                </p>
            )}
        </div>
    );
}

export default DecimalInput;

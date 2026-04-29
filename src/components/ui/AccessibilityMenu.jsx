import { useState, useEffect, useCallback } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage.js";

/**
 * @typedef {Object} A11yPrefs
 * @property {boolean} luciole     - Police Luciole (DYS/malvoyance)
 * @property {boolean} largeText   - Taille de texte augmentée (+20%)
 * @property {boolean} highContrast - Mode contraste élevé
 */

const DEFAULTS = { luciole: false, largeText: false, highContrast: false };

/**
 * Applique les préférences d'accessibilité sur <html>.
 * Chaque préférence ajoute/supprime un attribut data-* ciblé par CSS.
 */
function applyPrefs(prefs) {
    const root = document.documentElement;
    root.setAttribute("data-a11y-luciole", String(prefs.luciole));
    root.setAttribute("data-a11y-large-text", String(prefs.largeText));
    root.setAttribute("data-a11y-high-contrast", String(prefs.highContrast));
}

const TOGGLE_BTN = (active) => ({
    padding: ".45rem .875rem",
    borderRadius: ".75rem",
    fontSize: ".8rem",
    fontFamily: "'Nunito',sans-serif",
    fontWeight: 700,
    cursor: "pointer",
    border: active ? "1.5px solid #3b82f6" : "1.5px solid #e8cfa4",
    background: active ? "#eff6ff" : "#fff",
    color: active ? "#1d4ed8" : "#5c3d1a",
    transition: "all .15s",
});

/**
 * Menu d'accessibilité FRACTOÏA — Sprint G (WCAG 2.1 AA).
 *
 * Trois réglages persistés dans localStorage :
 *   - Police Luciole (conçue pour les lecteurs DYS, malvoyants)
 *   - Grande taille de texte (+20% via data-a11y-large-text sur <html>)
 *   - Contraste élevé (mode dark renforcé via data-a11y-high-contrast)
 *
 * Le composant se monte en position fixe en bas à gauche.
 * Un bouton ⚙️ ouvre/ferme le panneau.
 *
 * Usage dans App.jsx :
 *   import AccessibilityMenu from "./components/ui/AccessibilityMenu.jsx";
 *   // Ajouter <AccessibilityMenu /> dans AppRouter, hors de toute div relative
 *
 * @param {Object} [props]
 */
function AccessibilityMenu() {
    const [prefs, setPrefs] = useLocalStorage("fractoia_a11y", DEFAULTS);
    const [open, setOpen] = useState(false);

    // Appliquer au montage et à chaque changement
    useEffect(() => {
        applyPrefs(prefs);
    }, [prefs]);

    const toggle = useCallback(
        (key) => {
            setPrefs((p) => {
                const next = { ...p, [key]: !p[key] };
                applyPrefs(next);
                return next;
            });
        },
        [setPrefs]
    );

    return (
        <div
            style={{
                position: "fixed",
                bottom: "1.25rem",
                right: "5rem",
                zIndex: 50,
            }}
        >
            {/* Panneau */}
            {open && (
                <div
                    role="dialog"
                    aria-modal="false"
                    aria-label="Réglages d'accessibilité"
                    style={{
                        position: "absolute",
                        bottom: "3rem",
                        right: 0,
                        width: "15rem",
                        background: "#fff",
                        border: "1.5px solid #e8cfa4",
                        borderRadius: "1rem",
                        padding: ".875rem 1rem 1rem",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.14)",
                        display: "flex",
                        flexDirection: "column",
                        gap: ".625rem",
                    }}
                >
                    <p
                        style={{
                            fontFamily: "'Baloo 2',sans-serif",
                            fontWeight: 800,
                            fontSize: ".85rem",
                            color: "#2d1a08",
                            margin: "0 0 .25rem",
                        }}
                    >
                        ⚙️ Accessibilité
                    </p>

                    {[
                        {
                            key: "luciole",
                            label: "Police Luciole",
                            desc: "Adaptée DYS / malvoyance",
                        },
                        {
                            key: "largeText",
                            label: "Grande taille",
                            desc: "Texte agrandi de 20 %",
                        },
                        {
                            key: "highContrast",
                            label: "Contraste élevé",
                            desc: "Mode sombre renforcé",
                        },
                    ].map(({ key, label, desc }) => (
                        <div key={key}>
                            <button
                                onClick={() => toggle(key)}
                                aria-pressed={prefs[key]}
                                style={TOGGLE_BTN(prefs[key])}
                            >
                                {prefs[key] ? "✓ " : ""}
                                {label}
                            </button>
                            <p
                                style={{
                                    fontFamily: "'Nunito',sans-serif",
                                    fontSize: ".68rem",
                                    color: "#9c6b30",
                                    margin: ".15rem 0 0 .25rem",
                                }}
                            >
                                {desc}
                            </p>
                        </div>
                    ))}

                    <button
                        onClick={() => {
                            setPrefs(DEFAULTS);
                            applyPrefs(DEFAULTS);
                        }}
                        style={{
                            marginTop: ".25rem",
                            padding: ".35rem .75rem",
                            borderRadius: ".625rem",
                            border: "1.5px solid #fca5a5",
                            background: "#fff5f5",
                            color: "#b91c1c",
                            fontFamily: "'Nunito',sans-serif",
                            fontWeight: 600,
                            fontSize: ".72rem",
                            cursor: "pointer",
                        }}
                    >
                        Réinitialiser
                    </button>
                </div>
            )}

            {/* Bouton déclencheur */}
            <button
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                aria-controls="fractoia-a11y-panel"
                aria-label="Ouvrir les réglages d'accessibilité"
                title="Accessibilité"
                style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    borderRadius: "50%",
                    border: "1.5px solid #e8cfa4",
                    background: "rgba(255,255,255,0.92)",
                    backdropFilter: "blur(8px)",
                    fontSize: "1.125rem",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                }}
            >
                ⚙️
            </button>
        </div>
    );
}

export default AccessibilityMenu;

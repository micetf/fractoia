import { useState } from "react";
import WorldFarm from "./components/worlds/WorldFarm.jsx";
import WorldRoad from "./components/worlds/WorldRoad.jsx";

/**
 * @typedef {'farm'|'road'|'map'} WorldId
 */

/** Ordre de progression des mondes disponibles. */
const WORLDS = [
    { id: "farm", label: "🌾 La Ferme de Mila", sub: "Fraction-partage" },
    { id: "road", label: "⭐ La Route des Étoiles", sub: "Fraction-magnitude" },
];

const btn = (bg, fg = "#fff", px = "1.5rem") => ({
    padding: `0.65rem ${px}`,
    borderRadius: "0.875rem",
    fontSize: "1rem",
    fontWeight: 700,
    backgroundColor: bg,
    color: fg,
    border: "none",
    cursor: "pointer",
    fontFamily: "'Baloo 2', sans-serif",
    transition: "opacity 0.15s",
});

/**
 * Écran de sélection de monde — hub provisoire avant la WorldMap (Sprint 4).
 *
 * @param {Object}   props
 * @param {WorldId}  props.current    - Monde actif (met le bouton en surbrillance)
 * @param {function} props.onSelect   - Callback de sélection
 */
function WorldSelector({ current, onSelect }) {
    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "1.5rem",
                padding: "2rem",
                background:
                    "linear-gradient(160deg, #fdf6ec 0%, #fef3c7 50%, #ede9fe 100%)",
            }}
        >
            <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>
                    🗺️
                </div>
                <h1
                    style={{
                        fontFamily: "'Baloo 2', sans-serif",
                        color: "#2d1a08",
                        fontSize: "2rem",
                        fontWeight: 800,
                        margin: 0,
                    }}
                >
                    FRACTOÏA
                </h1>
                <p
                    style={{
                        color: "#6b5c4a",
                        fontFamily: "'Nunito', sans-serif",
                        marginTop: "0.4rem",
                    }}
                >
                    Choisis ton monde
                </p>
            </div>

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                    width: "100%",
                    maxWidth: "22rem",
                }}
            >
                {WORLDS.map((w) => (
                    <button
                        key={w.id}
                        onClick={() => onSelect(w.id)}
                        style={{
                            ...btn(
                                current === w.id ? "#f59e0b" : "#ffffff",
                                current === w.id ? "#2d1a08" : "#4b3728",
                                "1.5rem"
                            ),
                            border: `2px solid ${current === w.id ? "#d97706" : "#e8cfa4"}`,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            gap: "0.1rem",
                            boxShadow: "0 2px 8px rgba(92,61,26,0.10)",
                        }}
                    >
                        <span style={{ fontSize: "1rem" }}>{w.label}</span>
                        <span
                            style={{
                                fontSize: "0.75rem",
                                fontWeight: 400,
                                opacity: 0.75,
                                fontFamily: "'Nunito', sans-serif",
                            }}
                        >
                            {w.sub}
                        </span>
                    </button>
                ))}
            </div>

            <p
                style={{
                    color: "#9c8070",
                    fontFamily: "'Nunito', sans-serif",
                    fontSize: "0.78rem",
                    marginTop: "0.5rem",
                }}
            >
                La carte des mondes arrivera au Sprint 4
            </p>
        </div>
    );
}

/**
 * Point d'entrée de FRACTOÏA — Sprint 3.
 *
 * Navigation sans react-router-dom : un état `screen` pilote l'affichage.
 * - `'selector'`   → hub de sélection de monde (provisoire)
 * - `'farm'`       → Monde 1 (WorldFarm)
 * - `'road'`       → Monde 3 (WorldRoad)
 *
 * La WorldMap de navigation sera introduite au Sprint 4.
 */
function App() {
    const [screen, setScreen] = useState("selector");
    const [lastWorld, setLastWorld] = useState("farm");

    const goTo = (id) => {
        setLastWorld(id);
        setScreen(id);
    };

    if (screen === "farm")
        return <WorldFarm onComplete={() => setScreen("selector")} />;

    if (screen === "road")
        return <WorldRoad onComplete={() => setScreen("selector")} />;

    return <WorldSelector current={lastWorld} onSelect={goTo} />;
}

export default App;

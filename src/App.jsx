import { useState } from "react";
import WorldFarm from "./components/worlds/WorldFarm.jsx";
import WorldWorkshop from "./components/worlds/WorldWorkshop.jsx";
import WorldRoad from "./components/worlds/WorldRoad.jsx";
import WorldMarket from "./components/worlds/WorldMarket.jsx";
import WorldFestival from "./components/worlds/WorldFestival.jsx";
import WorldMap from "./components/layout/WorldMap.jsx";
import TeacherDashboard from "./components/layout/TeacherDashboard.jsx";

/**
 * @typedef {'map'|'farm'|'workshop'|'road'|'market'|'festival'|'dashboard'} ScreenId
 */

/**
 * Point d'entrée de FRACTOÏA — Sprint 5.
 *
 * Navigation sans react-router-dom : un état `screen` pilote l'affichage.
 * - `'map'`       → WorldMap (hub île SVG, Sprint 4)
 * - `'farm'`      → Monde 1 — fraction-partage
 * - `'workshop'`  → Monde 2 — fraction-opérateur
 * - `'road'`      → Monde 3 — fraction-magnitude
 * - `'market'`    → Monde 4 — fraction-quotient
 * - `'festival'`  → Monde 5 — tous les sens (Sprint 5)
 * - `'dashboard'` → Tableau de bord enseignant (Sprint 5)
 */
function App() {
    const [screen, setScreen] = useState("map");

    const goTo = (id) => setScreen(id);
    const goMap = () => setScreen("map");

    /* ── Mondes ─────────────────────────────────────────── */
    if (screen === "farm") return <WorldFarm onComplete={goMap} />;

    if (screen === "workshop") return <WorldWorkshop onComplete={goMap} />;

    if (screen === "road") return <WorldRoad onComplete={goMap} />;

    if (screen === "market") return <WorldMarket onComplete={goMap} />;

    /* ── Sprint 5 : Festival (à livrer) ─────────────────── */
    if (screen === "festival") return <WorldFestival onComplete={goMap} />;

    /* ── Dashboard enseignant ────────────────────────────── */
    if (screen === "dashboard") return <TeacherDashboard onClose={goMap} />;

    /* ── Carte des mondes (hub) ──────────────────────────── */
    return (
        <div style={{ position: "relative" }}>
            <WorldMap onSelect={goTo} />

            {/* Accès tableau de bord — bouton flottant discret */}
            <button
                onClick={() => goTo("dashboard")}
                title="Tableau de bord enseignant"
                style={{
                    position: "fixed",
                    bottom: "1.25rem",
                    left: "1.25rem",
                    zIndex: 40,
                    padding: ".5rem .9rem",
                    borderRadius: ".875rem",
                    border: "1.5px solid #e8cfa4",
                    background: "rgba(255,255,255,0.92)",
                    backdropFilter: "blur(8px)",
                    color: "#5c3d1a",
                    fontFamily: "'Baloo 2', sans-serif",
                    fontWeight: 700,
                    fontSize: ".78rem",
                    cursor: "pointer",
                    boxShadow: "0 2px 10px rgba(92,61,26,0.14)",
                }}
            >
                📋 Enseignant
            </button>
        </div>
    );
}

export default App;

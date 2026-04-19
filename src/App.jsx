import { useState } from "react";
import { GameProgressionProvider } from "./hooks/useGameProgression.js";
import { useGameProgression } from "./hooks/useGameProgression.js";
import WorldFarm from "./components/worlds/WorldFarm.jsx";
import WorldWorkshop from "./components/worlds/WorldWorkshop.jsx";
import WorldRoad from "./components/worlds/WorldRoad.jsx";
import WorldMarket from "./components/worlds/WorldMarket.jsx";
import WorldFestival from "./components/worlds/WorldFestival.jsx";
import WorldMap from "./components/layout/WorldMap.jsx";
import TeacherDashboard from "./components/layout/TeacherDashboard.jsx";

/**
 * Routeur interne — consomme le Context GameProgressionProvider.
 * Séparé de App pour que useGameProgression() soit appelé
 * à l'intérieur du Provider (règle des hooks React).
 */
function AppRouter() {
    const [screen, setScreen] = useState("map");
    const { unlockWorld } = useGameProgression();

    const goMap = () => setScreen("map");
    const goTo = (id) => setScreen(id);

    /**
     * Termine un monde, déverrouille le suivant, retourne à la carte.
     * @param {number} [nextWorldId]
     */
    const handleComplete = (nextWorldId) => {
        if (nextWorldId) unlockWorld(nextWorldId);
        goMap();
    };

    if (screen === "farm")
        return <WorldFarm onComplete={() => handleComplete(2)} />;
    if (screen === "workshop")
        return <WorldWorkshop onComplete={() => handleComplete(3)} />;
    if (screen === "road")
        return <WorldRoad onComplete={() => handleComplete(4)} />;
    if (screen === "market")
        return <WorldMarket onComplete={() => handleComplete(5)} />;
    if (screen === "festival")
        return <WorldFestival onComplete={() => handleComplete()} />;
    if (screen === "dashboard") return <TeacherDashboard onClose={goMap} />;

    return (
        <div style={{ position: "relative" }}>
            <WorldMap onSelect={goTo} />
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

/**
 * Point d'entrée de FRACTOÏA.
 * GameProgressionProvider garantit une instance unique de useGameProgression
 * partagée entre App, WorldMap, TeacherDashboard et tous les mondes.
 * Élimine la désynchronisation entre useState indépendants.
 */
function App() {
    return (
        <GameProgressionProvider>
            <AppRouter />
        </GameProgressionProvider>
    );
}

export default App;

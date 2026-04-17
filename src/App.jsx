import { useState } from "react";
import WorldFarm from "./components/worlds/WorldFarm.jsx";
import WorldRoad from "./components/worlds/WorldRoad.jsx";
import WorldMap from "./components/layout/WorldMap.jsx";

/**
 * @typedef {'map'|'farm'|'road'} ScreenId
 */

/**
 * Point d'entrée de FRACTOÏA — Sprint 4.
 *
 * Navigation sans react-router-dom : un état `screen` pilote l'affichage.
 * - `'map'`    → WorldMap (carte des mondes, hub permanent)
 * - `'farm'`   → Monde 1 · WorldFarm  (fraction-partage)
 * - `'road'`   → Monde 3 · WorldRoad  (fraction-magnitude)
 *
 * Les Mondes 2, 4 et 5 sont marqués `comingSoon` dans WorldMap
 * et seront routés ici dès que leurs composants seront disponibles (Sprint 5).
 */
function App() {
    const [screen, setScreen] = useState("map");
    const [lastWorld, setLastWorld] = useState(null);

    /** @param {string} id */
    const goTo = (id) => {
        setLastWorld(id);
        setScreen(id);
    };

    if (screen === "farm")
        return <WorldFarm onComplete={() => setScreen("map")} />;

    if (screen === "road")
        return <WorldRoad onComplete={() => setScreen("map")} />;

    return <WorldMap current={lastWorld} onSelect={goTo} />;
}

export default App;

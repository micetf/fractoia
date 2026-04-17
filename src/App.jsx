import { useState } from "react";
import WorldFarm from "./components/worlds/WorldFarm.jsx";
import WorldWorkshop from "./components/worlds/WorldWorkshop.jsx";
import WorldRoad from "./components/worlds/WorldRoad.jsx";
import WorldMarket from "./components/worlds/WorldMarket.jsx";
import WorldMap from "./components/layout/WorldMap.jsx";

/**
 * @typedef {'map'|'farm'|'workshop'|'road'|'market'} ScreenId
 */

/**
 * Point d'entrée de FRACTOÏA — Sprint 4.
 *
 * Navigation sans react-router-dom : un état `screen` pilote l'affichage.
 * - `'map'`      → WorldMap (carte des mondes, hub permanent)
 * - `'farm'`     → Monde 1 · fraction-partage
 * - `'workshop'` → Monde 2 · fraction-opérateur
 * - `'road'`     → Monde 3 · fraction-magnitude
 * - `'market'`   → Monde 4 · fraction-quotient
 *
 * Le Monde 5 (WorldFestival) est marqué comingSoon dans WorldMap
 * et sera routé ici au Sprint 5.
 */
function App() {
    const [screen, setScreen] = useState("map");
    const [lastWorld, setLastWorld] = useState(null);

    /** @param {ScreenId} id */
    const goTo = (id) => {
        setLastWorld(id);
        setScreen(id);
    };

    if (screen === "farm")
        return <WorldFarm onComplete={() => setScreen("map")} />;

    if (screen === "workshop")
        return <WorldWorkshop onComplete={() => setScreen("map")} />;

    if (screen === "road")
        return <WorldRoad onComplete={() => setScreen("map")} />;

    if (screen === "market")
        return <WorldMarket onComplete={() => setScreen("map")} />;

    return <WorldMap current={lastWorld} onSelect={goTo} />;
}

export default App;

import WorldNode from "../ui/WorldNode.jsx";
import { useGameProgression } from "../../hooks/useGameProgression.js";

/** @typedef {{ id: string, label: string, sub: string, emoji: string, worldId: number, x: number, y: number, comingSoon: boolean }} WorldEntry */

/**
 * Sprint A — WorldBridge (7) ajouté entre Granary (6) et Road (3).
 * Position (44, 22) sur l'île — PATH_D mis à jour pour passer par ce point.
 * @type {WorldEntry[]}
 */
const WORLDS = [
    {
        id: "farm",
        label: "La Ferme de Mila",
        sub: "Fraction-partage",
        emoji: "🌾",
        worldId: 1,
        x: 15,
        y: 78,
        comingSoon: false,
    },
    {
        id: "workshop",
        label: "L'Atelier de Koro",
        sub: "Fraction-opérateur",
        emoji: "🔨",
        worldId: 2,
        x: 28,
        y: 52,
        comingSoon: false,
    },
    {
        id: "granary",
        label: "Le Grenier de Koro",
        sub: "Fraction-addition",
        emoji: "🫙",
        worldId: 6,
        x: 38,
        y: 32,
        comingSoon: false,
    },
    {
        id: "bridge",
        label: "Le Pont de Léna",
        sub: "Fraction-comparaison",
        emoji: "🌉",
        worldId: 7,
        x: 44,
        y: 22,
        comingSoon: false,
    },
    {
        id: "road",
        label: "La Route des Étoiles",
        sub: "Fraction-magnitude",
        emoji: "⭐",
        worldId: 3,
        x: 50,
        y: 16,
        comingSoon: false,
    },
    {
        id: "market",
        label: "Le Marché de Sao",
        sub: "Fraction-quotient",
        emoji: "🏪",
        worldId: 4,
        x: 74,
        y: 52,
        comingSoon: false,
    },
    {
        id: "festival",
        label: "Le Grand Festival",
        sub: "Tous les sens",
        emoji: "🎪",
        worldId: 5,
        x: 62,
        y: 78,
        comingSoon: false,
    },
];

/**
 * Chemin principal passant par tous les nœuds dans l'ordre d'unlock.
 * Bridge (44,22) inséré entre Granary (38,32) et Road (50,16).
 */
const PATH_D =
    "M 15,78 C 20,65 24,58 28,52 " +
    "C 31,44 34,38 38,32 " +
    "C 40,28 42,25 44,22 " +
    "C 46,19 48,17 50,16 " +
    "C 57,25 65,38 74,52 " +
    "C 71,60 67,69 62,78";

const ISLAND_D =
    "M 8,87 C 5,73 8,59 14,47 C 20,35 28,25 38,17 " +
    "C 46,11 55,9 64,13 C 73,17 80,25 85,37 " +
    "C 90,49 90,61 87,73 C 84,83 77,89 66,91 " +
    "C 56,93 44,93 32,91 C 20,89 11,93 8,87 Z";

/**
 * Hub de navigation — carte des mondes de FRACTOÏA.
 *
 * Architecture : div position:relative contient le SVG (île + chemin) et les
 * WorldNode en overlay HTML absolu. Les coordonnées x/y (0-100) du tableau WORLDS
 * correspondent directement aux pourcentages CSS sur ce conteneur.
 * ⚠️ Ne jamais rendre les WorldNode à l'intérieur du <svg> — ce sont des <button>
 * HTML qui ne se positionnent pas dans un contexte SVG.
 *
 * @param {{ onSelect?: function(string): void }} props
 */
function WorldMap({ onSelect }) {
    const { getWorldProgress } = useGameProgression();

    const mapSize = "min(90vw, 480px)";

    return (
        <div
            style={{
                minHeight: "100vh",
                background:
                    "linear-gradient(160deg, #0c4a6e 0%, #075985 40%, #0369a1 100%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "1rem",
            }}
        >
            {/* Titre */}
            <div style={{ textAlign: "center", marginBottom: "1rem" }}>
                <h1
                    style={{
                        fontFamily: "'Baloo 2', sans-serif",
                        color: "#e0f2fe",
                        fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
                        fontWeight: 800,
                        margin: 0,
                        lineHeight: 1.1,
                    }}
                >
                    🏝️ FRACTOÏA
                </h1>
                <p
                    style={{
                        fontFamily: "'Nunito', sans-serif",
                        color: "#bae6fd",
                        fontSize: "0.85rem",
                        margin: "0.25rem 0 0",
                    }}
                >
                    Choisis ton monde
                </p>
            </div>

            {/*
             * Conteneur position:relative — les WorldNode s'y ancrent en absolu.
             * Le SVG et les nœuds HTML partagent exactement les mêmes dimensions.
             */}
            <div
                style={{
                    position: "relative",
                    width: mapSize,
                    height: mapSize,
                    filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.35))",
                }}
            >
                {/* SVG — île + chemin uniquement, pas de nœuds ici */}
                <svg
                    viewBox="0 0 100 100"
                    style={{ width: "100%", height: "100%", display: "block" }}
                    aria-hidden="true"
                >
                    <path
                        d={ISLAND_D}
                        fill="#d4a574"
                        stroke="#a0724a"
                        strokeWidth="0.8"
                    />
                    <path
                        d={PATH_D}
                        fill="none"
                        stroke="rgba(255,255,255,0.25)"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeDasharray="2 2"
                    />
                </svg>

                {/* WorldNode — overlay HTML absolu, coordonnées en % */}
                {WORLDS.map((w) => {
                    const progress = getWorldProgress(w.worldId);
                    return (
                        <WorldNode
                            key={w.id}
                            emoji={w.emoji}
                            label={w.label}
                            sub={w.sub}
                            comingSoon={w.comingSoon}
                            unlocked={progress?.unlocked ?? false}
                            stars={progress?.stars ?? 0}
                            onClick={() => onSelect?.(w.id)}
                            style={{
                                left: `${w.x}%`,
                                top: `${w.y}%`,
                                transform: "translate(-50%, -50%)",
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default WorldMap;

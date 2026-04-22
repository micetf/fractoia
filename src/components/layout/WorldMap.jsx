import WorldNode from "../ui/WorldNode.jsx";
import { useGameProgression } from "../../hooks/useGameProgression.js";

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
        id: "equinox",
        label: "La Fête de l'Équinoxe",
        sub: "Pourcentages",
        emoji: "🎭",
        worldId: 8,
        x: 68,
        y: 68,
        comingSoon: false,
    },
    {
        id: "festival",
        label: "Le Grand Festival",
        sub: "Tous les sens",
        emoji: "🎪",
        worldId: 5,
        x: 55,
        y: 82,
        comingSoon: false,
    },
];

// Chemin passant par les 8 nœuds dans l'ordre d'unlock
const PATH_D =
    "M 15,78 C 20,65 24,58 28,52 " +
    "C 31,44 34,38 38,32 " +
    "C 40,28 42,25 44,22 " +
    "C 46,19 48,17 50,16 " +
    "C 57,25 65,38 74,52 " +
    "C 72,58 70,63 68,68 " +
    "C 64,74 60,78 55,82";

const ISLAND_D =
    "M 8,87 C 5,73 8,59 14,47 C 20,35 28,25 38,17 " +
    "C 46,11 55,9 64,13 C 73,17 80,25 85,37 " +
    "C 90,49 90,61 87,73 C 84,83 77,89 66,91 " +
    "C 56,93 44,93 32,91 C 20,89 11,93 8,87 Z";

/**
 * Hub de navigation — 8 mondes.
 * ⚠️ WorldNode HTML en overlay — jamais à l'intérieur du <svg>.
 */
function WorldMap({ onSelect }) {
    const { getWorldProgress } = useGameProgression();
    const mapSize = "min(90vw, 480px)";

    return (
        <div
            style={{
                minHeight: "100vh",
                background:
                    "linear-gradient(160deg,#0c4a6e 0%,#075985 40%,#0369a1 100%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "1rem",
            }}
        >
            <div style={{ textAlign: "center", marginBottom: "1rem" }}>
                <h1
                    style={{
                        fontFamily: "'Baloo 2',sans-serif",
                        color: "#e0f2fe",
                        fontSize: "clamp(1.5rem,4vw,2.25rem)",
                        fontWeight: 800,
                        margin: 0,
                        lineHeight: 1.1,
                    }}
                >
                    🏝️ FRACTOÏA
                </h1>
                <p
                    style={{
                        fontFamily: "'Nunito',sans-serif",
                        color: "#bae6fd",
                        fontSize: ".85rem",
                        margin: ".25rem 0 0",
                    }}
                >
                    Choisis ton monde
                </p>
            </div>

            <div
                style={{
                    position: "relative",
                    width: mapSize,
                    height: mapSize,
                    filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.35))",
                }}
            >
                <svg
                    viewBox="0 0 100 100"
                    style={{ width: "100%", height: "100%", display: "block" }}
                    aria-hidden="true"
                >
                    <path
                        d={ISLAND_D}
                        fill="#d4a574"
                        stroke="#a0724a"
                        strokeWidth=".8"
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
                            onClick={() => onSelect(w.id)}
                            style={{
                                left: `${w.x}%`,
                                top: `${w.y}%`,
                                transform: "translate(-50%,-50%)",
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default WorldMap;

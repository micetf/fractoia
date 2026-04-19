import WorldNode from "../ui/WorldNode.jsx";
import { useGameProgression } from "../../hooks/useGameProgression.js";

/** @typedef {{ id: string, label: string, sub: string, emoji: string, worldId: number, x: number, y: number, comingSoon: boolean }} WorldEntry */

/**
 * Sprint 4 — WorldGranary (2bis) ajouté entre Workshop (2) et Road (3).
 * Position (38, 32) sur l'île ; PATH_D mis à jour pour passer par ce point.
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

const PATH_D =
    "M 15,78 C 20,65 24,58 28,52 " +
    "C 31,44 34,38 38,32 " +
    "C 42,24 46,19 50,16 " +
    "C 57,25 65,38 74,52 " +
    "C 71,60 67,69 62,78";

const ISLAND_D =
    "M 8,87 C 5,73 8,59 14,47 C 20,35 28,25 38,17 " +
    "C 46,11 55,9 64,13 C 73,17 80,25 85,37 " +
    "C 90,49 90,61 87,73 C 84,83 77,89 66,91 " +
    "C 56,93 44,93 32,91 C 20,89 11,93 8,87 Z";

/**
 * Hub de navigation — carte des mondes de FRACTOÏA.
 * @param {{ current?: string|null, onSelect: function(string) }} props
 */
function WorldMap({ current, onSelect }) {
    const { gameState, getWorldProgress } = useGameProgression();

    return (
        <div
            style={{
                minHeight: "100vh",
                background:
                    "linear-gradient(160deg, #082f49 0%, #0c4a6e 45%, #075985 100%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "1.5rem 1rem 2rem",
                boxSizing: "border-box",
            }}
        >
            <header style={{ textAlign: "center", marginBottom: "1.25rem" }}>
                <div style={{ fontSize: "2rem", marginBottom: "0.2rem" }}>
                    🗺️
                </div>
                <h1
                    style={{
                        fontFamily: "'Baloo 2', sans-serif",
                        color: "#e0f2fe",
                        fontSize: "2rem",
                        fontWeight: 800,
                        margin: 0,
                        letterSpacing: "-0.02em",
                    }}
                >
                    FRACTOÏA
                </h1>
                <p
                    style={{
                        color: "#7dd3fc",
                        fontFamily: "'Nunito', sans-serif",
                        fontSize: "0.85rem",
                        margin: "0.2rem 0 0.75rem",
                    }}
                >
                    Carte des mondes
                </p>
                <div
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.4rem",
                        backgroundColor: "rgba(251,191,36,0.14)",
                        border: "1px solid rgba(251,191,36,0.4)",
                        borderRadius: "999px",
                        padding: "0.3rem 1rem",
                        fontFamily: "'Baloo 2', sans-serif",
                        fontWeight: 700,
                        color: "#fcd34d",
                        fontSize: "0.9rem",
                    }}
                >
                    ⭐ {gameState.totalStars} étoile
                    {gameState.totalStars !== 1 ? "s" : ""}
                </div>
            </header>

            <div
                style={{
                    position: "relative",
                    width: "100%",
                    maxWidth: "36rem",
                    aspectRatio: "4 / 3",
                }}
            >
                {/* Couche SVG : décor île + chemin */}
                <svg
                    viewBox="0 0 100 100"
                    style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        overflow: "visible",
                    }}
                    aria-hidden="true"
                >
                    <defs>
                        <radialGradient
                            id="islandGrad"
                            cx="48%"
                            cy="58%"
                            r="52%"
                        >
                            <stop offset="0%" stopColor="#86efac" />
                            <stop offset="42%" stopColor="#4ade80" />
                            <stop offset="100%" stopColor="#166534" />
                        </radialGradient>
                        <radialGradient
                            id="oceanGlow"
                            cx="50%"
                            cy="50%"
                            r="50%"
                        >
                            <stop
                                offset="0%"
                                stopColor="#0ea5e9"
                                stopOpacity="0.12"
                            />
                            <stop
                                offset="100%"
                                stopColor="#0ea5e9"
                                stopOpacity="0"
                            />
                        </radialGradient>
                    </defs>
                    <ellipse
                        cx="50"
                        cy="50"
                        rx="52"
                        ry="52"
                        fill="url(#oceanGlow)"
                    />
                    <ellipse
                        cx="50"
                        cy="95"
                        rx="43"
                        ry="4.5"
                        fill="rgba(0,0,0,0.22)"
                    />
                    <path d={ISLAND_D} fill="url(#islandGrad)" />
                    <path
                        d={ISLAND_D}
                        fill="none"
                        stroke="#d4a96a"
                        strokeWidth="0.9"
                        opacity="0.45"
                    />
                    {/* Pic sommet */}
                    <polygon
                        points="50,3 43.5,17 56.5,17"
                        fill="#94a3b8"
                        opacity="0.8"
                    />
                    <polygon
                        points="50,3 46,12 54,12"
                        fill="#f1f5f9"
                        opacity="0.65"
                    />
                    {/* Chemin pointillé */}
                    <path
                        d={PATH_D}
                        fill="none"
                        stroke="rgba(253,211,77,0.7)"
                        strokeWidth="1.3"
                        strokeDasharray="2.5,2"
                        strokeLinecap="round"
                    />
                </svg>

                {/* Couche HTML : nœuds de monde */}
                {WORLDS.map((w) => {
                    const progress = getWorldProgress(w.worldId);
                    return (
                        <WorldNode
                            key={w.id}
                            emoji={w.emoji}
                            label={w.label}
                            sub={w.sub}
                            stars={progress.stars}
                            unlocked={progress.unlocked}
                            comingSoon={w.comingSoon}
                            active={current === w.id}
                            onClick={() => onSelect(w.id)}
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

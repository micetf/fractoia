import { useState } from "react";
import { useGameProgression } from "../../hooks/useGameProgression.js";
import ProgressStars from "../ui/ProgressStars.jsx";
import SenseBreakdown from "../ui/SenseBreakdown.jsx";
import AboutPrograms from "../ui/AboutPrograms.jsx";
import ExportSummary from "../ui/ExportSummary.jsx";
import { ERROR_MESSAGES } from "../../data/errorMessages.js";
import { WORLD2_CHALLENGES } from "../../data/challenges/world2.js";
import { WORLD2BIS_CHALLENGES } from "../../data/challenges/world2bis.js";
import { WORLD5_CHALLENGES } from "../../data/challenges/world5.js";

const WORLDS_META = [
    {
        id: 1,
        label: "🌾 La Ferme de Mila",
        color: "#f59e0b",
        level: "CE2-révision / CM1",
        attendu: "Fraction-partage · Fractions ≤ 1 (dén. ≤ 8)",
    },
    {
        id: 2,
        label: "🔨 L'Atelier de Koro",
        color: "#f97316",
        level: "CM1 · CM2",
        attendu: "Fraction-mesure puis opérateur",
    },
    {
        id: 6,
        label: "🫙 Le Grenier de Koro",
        color: "#eab308",
        level: "CM2",
        attendu: "Addition et soustraction (même dénominateur)",
    },
    {
        id: 7,
        label: "🌉 Le Pont de Léna",
        color: "#818cf8",
        level: "CM1 · CM2 · 6ème",
        attendu: "Comparer des fractions · Établir des égalités",
    },
    {
        id: 3,
        label: "⭐ La Route des Étoiles",
        color: "#6366f1",
        level: "CM1",
        attendu: "Fractions > 1 · Demi-droite · Encadrement",
    },
    {
        id: 4,
        label: "🏪 Le Marché de Sao",
        color: "#34d399",
        level: "6ème",
        attendu: "Fraction-quotient · a ÷ b = a/b",
    },
    {
        id: 8,
        label: "🎭 La Fête de l'Équinoxe",
        color: "#0ea5e9",
        level: "6ème",
        attendu: "Pourcentages · sens · calcul · proportion",
    },
    {
        id: 5,
        label: "🎪 Le Grand Festival",
        color: "#ec4899",
        level: "6ème — synthèse",
        attendu: "Tous les sens · Automatismes · Sans appui systématique",
    },
];

const calcStats = (r) => {
    if (!r.length) return { rate: 0, avg: 0, n: 0 };
    const ok = r.filter((x) => x.success).length;
    return {
        rate: Math.round((ok / r.length) * 100),
        avg:
            Math.round(
                (r.reduce((s, x) => s + x.attempts, 0) / r.length) * 10
            ) / 10,
        n: r.length,
    };
};

const Bar = ({ pct, color }) => (
    <div
        style={{ flex: 1, height: 7, borderRadius: 999, background: "#ede8de" }}
    >
        <div
            style={{
                width: `${pct}%`,
                height: "100%",
                borderRadius: 999,
                background: color,
                transition: "width .7s ease",
            }}
        />
    </div>
);

function WorldRow({ meta, data }) {
    const { rate, avg, n } = calcStats(data.results);
    const done = data.stars > 0;
    const biases = data.errorBiases ?? [];
    return (
        <div
            style={{
                padding: ".875rem 1rem .875rem 1.25rem",
                borderRadius: "1rem",
                background: done ? "#fff" : "#fdf9f4",
                border: `1.5px solid ${done ? meta.color + "44" : "#e8cfa4"}`,
                borderLeft: `4px solid ${done ? meta.color : "#e8cfa4"}`,
                opacity: data.unlocked ? 1 : 0.4,
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: ".75rem",
                    marginBottom: ".3rem",
                }}
            >
                <span
                    style={{
                        fontFamily: "'Baloo 2',sans-serif",
                        fontWeight: 700,
                        color: "#2d1a08",
                        fontSize: ".875rem",
                        flex: 1,
                    }}
                >
                    {meta.label}
                </span>
                {data.unlocked ? (
                    <ProgressStars count={data.stars} total={3} size="sm" />
                ) : (
                    <span style={{ fontSize: ".85rem" }}>🔒</span>
                )}
            </div>
            <div
                style={{
                    display: "inline-block",
                    fontSize: ".65rem",
                    fontFamily: "'Nunito',sans-serif",
                    fontWeight: 700,
                    color: meta.color,
                    background: meta.color + "18",
                    border: `1px solid ${meta.color}44`,
                    borderRadius: "999px",
                    padding: "1px 8px",
                    marginBottom: n > 0 ? ".4rem" : 0,
                }}
            >
                {meta.level}
            </div>
            {n > 0 && (
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: ".5rem",
                    }}
                >
                    <Bar pct={rate} color={meta.color} />
                    <span
                        style={{
                            fontFamily: "'Nunito',sans-serif",
                            fontSize: ".7rem",
                            color: "#7a5c3a",
                            whiteSpace: "nowrap",
                        }}
                    >
                        {rate}% · {avg} essai{avg !== 1 ? "s" : ""}
                    </span>
                </div>
            )}
            {/* Biais cognitifs détectés — Sprint H */}
            {biases.length > 0 && (
                <div
                    style={{
                        marginTop: ".4rem",
                        display: "flex",
                        flexWrap: "wrap",
                        gap: ".3rem",
                    }}
                >
                    {biases.map((b) => (
                        <span
                            key={b}
                            title={ERROR_MESSAGES[b]?.body}
                            style={{
                                fontFamily: "'Nunito',sans-serif",
                                fontSize: ".6rem",
                                fontWeight: 700,
                                color: "#92400e",
                                background: "#fef3c7",
                                border: "1px solid #fcd34d",
                                borderRadius: "999px",
                                padding: "1px 7px",
                                cursor: "help",
                            }}
                        >
                            ⚠️ {ERROR_MESSAGES[b]?.title ?? b}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}

function TeacherDashboard({ onClose }) {
    const { gameState, resetGame } = useGameProgression();
    const { totalStars, worlds } = gameState;
    const [aboutOpen, setAboutOpen] = useState(false);
    const [printOpen, setPrintOpen] = useState(false);

    const allR = worlds.flatMap((w) => w.results);
    const done = worlds.filter((w) => w.stars > 0).length;
    const gRate = allR.length
        ? Math.round((allR.filter((r) => r.success).length / allR.length) * 100)
        : 0;
    const world2 = worlds.find((w) => w.worldId === 2);
    const world6 = worlds.find((w) => w.worldId === 6);
    const world5 = worlds.find((w) => w.worldId === 5);

    const allBiases = worlds.flatMap((w) => w.errorBiases ?? []);
    const uniqueBiases = [...new Set(allBiases)];

    const handleReset = () =>
        window.confirm(
            "Effacer toute la progression ? Cette action est irréversible."
        ) && resetGame();
    const handlePrint = () => {
        setPrintOpen(true);
        setTimeout(() => window.print(), 200);
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                padding: "1.5rem 1rem",
                background: "linear-gradient(160deg,#fdf6ec 0%,#fef9ec 100%)",
            }}
        >
            <div
                style={{
                    maxWidth: "36rem",
                    margin: "0 auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: ".75rem",
                }}
            >
                <header
                    style={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                    }}
                >
                    <div>
                        <h1
                            style={{
                                fontFamily: "'Baloo 2',sans-serif",
                                color: "#2d1a08",
                                fontSize: "1.4rem",
                                fontWeight: 800,
                                margin: 0,
                                lineHeight: 1,
                            }}
                        >
                            📋 Tableau de bord
                        </h1>
                        <p
                            style={{
                                color: "#9c6b30",
                                fontFamily: "'Nunito',sans-serif",
                                fontSize: ".78rem",
                                margin: ".2rem 0 0",
                            }}
                        >
                            FRACTOÏA · Vue enseignant
                        </p>
                    </div>
                    <div style={{ display: "flex", gap: ".5rem" }}>
                        <button
                            onClick={handlePrint}
                            style={{
                                padding: ".45rem .875rem",
                                borderRadius: ".75rem",
                                border: "1.5px solid #e8cfa4",
                                background: "#fff",
                                color: "#5c3d1a",
                                fontFamily: "'Nunito',sans-serif",
                                fontWeight: 600,
                                cursor: "pointer",
                                fontSize: ".78rem",
                            }}
                        >
                            🖨️ Imprimer
                        </button>
                        {onClose && (
                            <button
                                onClick={onClose}
                                style={{
                                    padding: ".45rem 1rem",
                                    borderRadius: ".75rem",
                                    border: "1.5px solid #e8cfa4",
                                    background: "#fff",
                                    color: "#5c3d1a",
                                    fontFamily: "'Baloo 2',sans-serif",
                                    fontWeight: 700,
                                    cursor: "pointer",
                                    fontSize: ".8rem",
                                }}
                            >
                                ← Retour
                            </button>
                        )}
                    </div>
                </header>

                {allR.length === 0 && (
                    <div
                        style={{
                            background: "#fffbeb",
                            border: "1.5px solid #fcd34d",
                            borderRadius: "1rem",
                            padding: ".75rem 1rem",
                            fontFamily: "'Nunito',sans-serif",
                            fontSize: ".78rem",
                            color: "#92400e",
                            lineHeight: 1.5,
                        }}
                    >
                        <strong>⚠️ Note de transition — rentrée 2025</strong>
                        <br />
                        Le Monde 1 peut constituer la première rencontre avec
                        les fractions simples — ne pas le passer en accéléré.
                    </div>
                )}

                {/* Résumé global */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr 1fr",
                        gap: ".625rem",
                    }}
                >
                    {[
                        {
                            icon: "⭐",
                            val: `${totalStars}/${WORLDS_META.length * 3}`,
                            lbl: "Étoiles",
                        },
                        {
                            icon: "🗺️",
                            val: `${done}/${WORLDS_META.length}`,
                            lbl: "Terminés",
                        },
                        { icon: "🎯", val: `${gRate}%`, lbl: "Réussite" },
                    ].map(({ icon, val, lbl }) => (
                        <div
                            key={lbl}
                            style={{
                                background: "#fff",
                                borderRadius: ".875rem",
                                padding: ".75rem .5rem",
                                border: "1.5px solid #e8cfa4",
                                textAlign: "center",
                            }}
                        >
                            <div style={{ fontSize: "1.3rem" }}>{icon}</div>
                            <div
                                style={{
                                    fontFamily: "'Baloo 2',sans-serif",
                                    fontWeight: 800,
                                    color: "#2d1a08",
                                    fontSize: "1.1rem",
                                    lineHeight: 1.1,
                                }}
                            >
                                {val}
                            </div>
                            <div
                                style={{
                                    fontSize: ".68rem",
                                    color: "#9c6b30",
                                    fontFamily: "'Nunito',sans-serif",
                                }}
                            >
                                {lbl}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Lignes par monde */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: ".5rem",
                    }}
                >
                    {WORLDS_META.map((meta) => {
                        const data = worlds.find((w) => w.worldId === meta.id);
                        return data ? (
                            <WorldRow key={meta.id} meta={meta} data={data} />
                        ) : null;
                    })}
                </div>

                {/* Carte des obstacles globaux — Sprint H */}
                {uniqueBiases.length > 0 && (
                    <div
                        style={{
                            background: "#fffbeb",
                            border: "1.5px solid #fcd34d",
                            borderRadius: "1rem",
                            padding: ".875rem 1rem",
                        }}
                    >
                        <p
                            style={{
                                fontFamily: "'Baloo 2',sans-serif",
                                fontWeight: 800,
                                fontSize: ".85rem",
                                color: "#92400e",
                                margin: "0 0 .5rem",
                            }}
                        >
                            🔍 Obstacles cognitifs détectés
                        </p>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: ".4rem",
                            }}
                        >
                            {uniqueBiases.map((b) => {
                                const msg = ERROR_MESSAGES[b];
                                if (!msg) return null;
                                return (
                                    <div
                                        key={b}
                                        style={{
                                            fontSize: ".72rem",
                                            fontFamily: "'Nunito',sans-serif",
                                            color: "#7a5c3a",
                                            lineHeight: 1.5,
                                        }}
                                    >
                                        <strong style={{ color: "#92400e" }}>
                                            {msg.title}
                                        </strong>{" "}
                                        — {msg.body.replace(/🔍\s?/, "")}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {world2?.results?.length > 0 && (
                    <SenseBreakdown
                        results={world2.results}
                        challenges={WORLD2_CHALLENGES}
                        title="🔨 Atelier — mesure vs opérateur"
                    />
                )}
                {world6?.results?.length > 0 && (
                    <SenseBreakdown
                        results={world6.results}
                        challenges={WORLD2BIS_CHALLENGES}
                        title="🫙 Grenier — addition vs soustraction"
                    />
                )}
                {world5?.results?.length > 0 && (
                    <SenseBreakdown
                        results={world5.results}
                        challenges={WORLD5_CHALLENGES}
                        title="🎪 Grand Festival — détail par sens"
                    />
                )}

                {/* Fiche imprimable — masquée à l'écran, visible uniquement via print */}
                {printOpen && (
                    <div style={{ display: "none" }} className="print-only">
                        <ExportSummary
                            gameState={gameState}
                            worldsMeta={WORLDS_META}
                        />
                    </div>
                )}

                <AboutPrograms
                    open={aboutOpen}
                    onToggle={() => setAboutOpen((o) => !o)}
                    worldsMeta={WORLDS_META}
                />

                <div style={{ textAlign: "center", paddingBottom: "1.5rem" }}>
                    <button
                        onClick={handleReset}
                        style={{
                            padding: ".45rem 1.1rem",
                            borderRadius: ".75rem",
                            border: "1.5px solid #fca5a5",
                            background: "#fff5f5",
                            color: "#b91c1c",
                            fontFamily: "'Nunito',sans-serif",
                            fontWeight: 600,
                            cursor: "pointer",
                            fontSize: ".78rem",
                        }}
                    >
                        🗑️ Effacer la progression
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TeacherDashboard;

import { useState } from "react";
import { useGameProgression } from "../../hooks/useGameProgression.js";
import ProgressStars from "../ui/ProgressStars.jsx";
import SenseBreakdown from "../ui/SenseBreakdown.jsx";
import AboutPrograms from "../ui/AboutPrograms.jsx";
import { WORLD2_CHALLENGES } from "../../data/challenges/world2.js";
import { WORLD2BIS_CHALLENGES } from "../../data/challenges/world2bis.js";
import { WORLD5_CHALLENGES } from "../../data/challenges/world5.js";

/**
 * Sprint A : worldId 7 (Le Pont de Léna) ajouté entre Grenier (6) et Route (3).
 * Les totaux étoiles/mondes sont calculés dynamiquement depuis WORLDS_META.length.
 */
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
        level: "CM1 (unitaire) · CM2",
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
        level: "CM1 — objectif central",
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
        id: 5,
        label: "🎪 Le Grand Festival",
        color: "#ec4899",
        level: "6ème — synthèse",
        attendu: "Tous les sens · Sans appui systématique",
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
    const borderColor = done ? meta.color + "44" : "#e8cfa4";
    return (
        <div
            style={{
                padding: ".875rem 1rem .875rem 1.25rem",
                borderRadius: "1rem",
                background: done ? "#fff" : "#fdf9f4",
                border: `1.5px solid ${borderColor}`,
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
        </div>
    );
}

/**
 * Tableau de bord enseignant — FRACTOÏA.
 * @param {{ onClose?: function }} props
 */
function TeacherDashboard({ onClose }) {
    const { gameState, resetGame } = useGameProgression();
    const { totalStars, worlds } = gameState;
    const [aboutOpen, setAboutOpen] = useState(false);

    const allR = worlds.flatMap((w) => w.results);
    const done = worlds.filter((w) => w.stars > 0).length;
    const gRate = allR.length
        ? Math.round((allR.filter((r) => r.success).length / allR.length) * 100)
        : 0;
    const world2 = worlds.find((w) => w.worldId === 2);
    const world6 = worlds.find((w) => w.worldId === 6);
    const world5 = worlds.find((w) => w.worldId === 5);

    const handleReset = () =>
        window.confirm(
            "Effacer toute la progression ? Cette action est irréversible."
        ) && resetGame();

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
                {/* En-tête */}
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
                </header>

                {/* Alerte transition rentrée 2025 */}
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
                        Les élèves actuels de CM1/CM2 n'ont pas suivi le
                        programme de cycle 2 rénové. Le Monde 1 peut constituer
                        leur première rencontre avec les fractions simples — ne
                        pas le passer en accéléré.
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

                {world2?.results?.length > 0 && (
                    <SenseBreakdown
                        results={world2.results}
                        challenges={WORLD2_CHALLENGES}
                        title="🔨 Atelier de Koro — sens mesure vs opérateur"
                    />
                )}
                {world6?.results?.length > 0 && (
                    <SenseBreakdown
                        results={world6.results}
                        challenges={WORLD2BIS_CHALLENGES}
                        title="🫙 Grenier de Koro — addition vs soustraction"
                    />
                )}
                {world5?.results?.length > 0 && (
                    <SenseBreakdown
                        results={world5.results}
                        challenges={WORLD5_CHALLENGES}
                        title="🎪 Grand Festival — détail par sens"
                    />
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

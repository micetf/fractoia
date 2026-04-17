import { useGameProgression } from "../../hooks/useGameProgression.js";
import ProgressStars from "../ui/ProgressStars.jsx";
import { WORLD5_CHALLENGES } from "../../data/challenges/world5.js";

const WORLDS_META = [
    { id: 1, label: "🌾 La Ferme de Mila", color: "#f59e0b" },
    { id: 2, label: "🔨 L'Atelier de Koro", color: "#f97316" },
    { id: 3, label: "⭐ La Route des Étoiles", color: "#818cf8" },
    { id: 4, label: "🏪 Le Marché de Sao", color: "#34d399" },
    { id: 5, label: "🎪 Le Grand Festival", color: "#ec4899" },
];

const SENSE_META = {
    partage: { label: "Partage", color: "#f59e0b" },
    mesure: { label: "Mesure", color: "#3b82f6" },
    magnitude: { label: "Magnitude", color: "#818cf8" },
    quotient: { label: "Quotient", color: "#34d399" },
};

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
                style={{ display: "flex", alignItems: "center", gap: ".75rem" }}
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
                    <ProgressStars count={data.stars} size="sm" />
                ) : (
                    <span style={{ fontSize: ".7rem", color: "#b8956a" }}>
                        🔒
                    </span>
                )}
            </div>
            {done && (
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: ".5rem",
                        marginTop: ".5rem",
                    }}
                >
                    <Bar pct={rate} color={meta.color} />
                    <span
                        style={{
                            fontFamily: "'Nunito',sans-serif",
                            fontSize: ".7rem",
                            color: "#6b4e2a",
                            whiteSpace: "nowrap",
                        }}
                    >
                        {rate}% · {n} défis · ~{avg} essai{avg > 1 ? "s" : ""}
                    </span>
                </div>
            )}
        </div>
    );
}

function SenseBreakdown({ results }) {
    const byS = {};
    results.forEach((r) => {
        const s = WORLD5_CHALLENGES[r.challengeIndex]?.sense;
        if (!s) return;
        byS[s] = byS[s] ?? { ok: 0, n: 0 };
        byS[s].n++;
        if (r.success) byS[s].ok++;
    });
    const entries = Object.entries(byS);
    if (!entries.length) return null;
    return (
        <div
            style={{
                padding: ".875rem 1.25rem",
                borderRadius: "1rem",
                background: "#fff",
                border: "1.5px solid #fbcfe8",
                marginTop: ".5rem",
            }}
        >
            <p
                style={{
                    fontFamily: "'Baloo 2',sans-serif",
                    fontWeight: 700,
                    color: "#2d1a08",
                    fontSize: ".8rem",
                    margin: "0 0 .625rem",
                }}
            >
                🎯 Détail par sens — Le Grand Festival
            </p>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: ".425rem",
                }}
            >
                {entries.map(([sense, { ok, n }]) => {
                    const m = SENSE_META[sense] ?? {
                        label: sense,
                        color: "#9c7c5a",
                    };
                    return (
                        <div
                            key={sense}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: ".5rem",
                            }}
                        >
                            <span
                                style={{
                                    fontFamily: "'Nunito',sans-serif",
                                    fontSize: ".72rem",
                                    color: "#5c3d1a",
                                    width: "5rem",
                                    flexShrink: 0,
                                }}
                            >
                                {m.label}
                            </span>
                            <Bar
                                pct={Math.round((ok / n) * 100)}
                                color={m.color}
                            />
                            <span
                                style={{
                                    fontFamily: "'Nunito',sans-serif",
                                    fontSize: ".7rem",
                                    color: "#7a5c3a",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                {ok}/{n}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

/**
 * Tableau de bord enseignant — lit la progression depuis localStorage.
 * Résumé global + stats par monde + décomposition par sens (Monde 5).
 * La section "Détail par sens" n'apparaît que si world5.results est non vide
 * et que le champ `sense` est présent dans WORLD5_CHALLENGES.
 * @param {{ onClose?: function }} props
 */
function TeacherDashboard({ onClose }) {
    const { gameState, resetGame } = useGameProgression();
    const { totalStars, worlds } = gameState;
    const allR = worlds.flatMap((w) => w.results);
    const done = worlds.filter((w) => w.stars > 0).length;
    const gRate = allR.length
        ? Math.round((allR.filter((r) => r.success).length / allR.length) * 100)
        : 0;
    const world5 = worlds.find((w) => w.worldId === 5);

    const handleReset = () => {
        if (
            window.confirm(
                "Effacer toute la progression ? Cette action est irréversible."
            )
        )
            resetGame();
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                padding: "1.5rem 1rem",
                background: "linear-gradient(160deg,#fdf6ec 0%,#fef9ec 100%)",
            }}
        >
            <div style={{ maxWidth: "36rem", margin: "0 auto" }}>
                <header
                    style={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        marginBottom: "1.5rem",
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

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr 1fr",
                        gap: ".625rem",
                        marginBottom: "1.25rem",
                    }}
                >
                    {[
                        { icon: "⭐", val: `${totalStars}/15`, lbl: "Étoiles" },
                        { icon: "🗺️", val: `${done}/5`, lbl: "Terminés" },
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

                {world5?.results?.length > 0 && (
                    <SenseBreakdown results={world5.results} />
                )}

                <div
                    style={{
                        textAlign: "center",
                        marginTop: "2rem",
                        paddingBottom: "1.5rem",
                    }}
                >
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

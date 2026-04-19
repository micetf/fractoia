import { WORLD5_CHALLENGES } from "../../data/challenges/world5.js";

const SENSE_META = {
    partage: { label: "Partage", color: "#f59e0b" },
    mesure: { label: "Mesure", color: "#3b82f6" },
    magnitude: { label: "Magnitude", color: "#818cf8" },
    quotient: { label: "Quotient", color: "#34d399" },
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

/**
 * Décomposition des résultats du Monde 5 par sens de la fraction.
 * Visible dans le TeacherDashboard si world5.results est non vide.
 *
 * @param {{ results: Array }} props
 */
function SenseBreakdown({ results }) {
    const senses = [...new Set(WORLD5_CHALLENGES.map((c) => c.sense))];

    return (
        <div
            style={{
                background: "#fff",
                borderRadius: "1rem",
                padding: "1rem",
                border: "1.5px solid #e8cfa4",
            }}
        >
            <p
                style={{
                    fontFamily: "'Baloo 2',sans-serif",
                    fontWeight: 700,
                    color: "#2d1a08",
                    fontSize: ".8rem",
                    margin: "0 0 .6rem",
                }}
            >
                🎪 Grand Festival — détail par sens
            </p>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: ".4rem",
                }}
            >
                {senses.map((sense) => {
                    const sub = results.filter(
                        (_, i) => WORLD5_CHALLENGES[i]?.sense === sense
                    );
                    const ok = sub.filter((r) => r.success).length;
                    const n = sub.length;
                    if (!n) return null;
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

export default SenseBreakdown;

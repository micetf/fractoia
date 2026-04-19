/**
 * Section dépliable "À propos des programmes" pour le TeacherDashboard.
 * Affiche le tableau de correspondance Monde / Niveau / Attendu
 * issu du BO n°16 du 10 avril 2025.
 *
 * @param {{ open: boolean, onToggle: function, worldsMeta: Array }} props
 */
function AboutPrograms({ open, onToggle, worldsMeta }) {
    return (
        <div
            style={{
                background: "#f0fdf4",
                borderRadius: "1rem",
                border: "1.5px solid #bbf7d0",
                overflow: "hidden",
            }}
        >
            <button
                onClick={onToggle}
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: ".75rem 1rem",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "'Baloo 2',sans-serif",
                    fontWeight: 700,
                    color: "#166534",
                    fontSize: ".8rem",
                }}
            >
                📚 À propos des programmes (BO n°16, 2025)
                <span style={{ fontSize: ".7rem" }}>{open ? "▲" : "▼"}</span>
            </button>

            {open && (
                <div
                    style={{
                        padding: "0 1rem 1rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: ".6rem",
                    }}
                >
                    {worldsMeta.map((m) => (
                        <div
                            key={m.id}
                            style={{
                                fontSize: ".72rem",
                                fontFamily: "'Nunito',sans-serif",
                                color: "#14532d",
                                lineHeight: 1.6,
                                paddingLeft: ".625rem",
                                borderLeft: `3px solid ${m.color}`,
                            }}
                        >
                            <strong>{m.label}</strong>{" "}
                            <span
                                style={{
                                    display: "inline-block",
                                    fontSize: ".62rem",
                                    fontWeight: 700,
                                    color: m.color,
                                    background: m.color + "18",
                                    border: `1px solid ${m.color}44`,
                                    borderRadius: "999px",
                                    padding: "0 6px",
                                    marginLeft: "2px",
                                }}
                            >
                                {m.level}
                            </span>
                            <br />
                            {m.attendu}
                        </div>
                    ))}

                    <p
                        style={{
                            fontSize: ".68rem",
                            fontFamily: "'Nunito',sans-serif",
                            color: "#166534",
                            margin: ".25rem 0 0",
                            fontStyle: "italic",
                        }}
                    >
                        Bulletin officiel n°16 · 10 avril 2025 · Applicable
                        rentrée 2025
                    </p>
                </div>
            )}
        </div>
    );
}

export default AboutPrograms;

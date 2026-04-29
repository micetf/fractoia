import { ERROR_MESSAGES } from "../../data/errorMessages.js";

/**
 * Fiche récapitulative imprimable — Sprint H.
 * Déclenché par window.print() depuis TeacherDashboard.
 *
 * Affiche :
 *   - Résumé global (étoiles, mondes terminés, taux de réussite)
 *   - Par monde : étoiles + biais cognitifs rencontrés
 *
 * Stylé uniquement pour l'impression (@media print dans a11y-overrides.css).
 * En mode écran, rendu discret dans TeacherDashboard (section dépliable).
 *
 * @param {Object}   props
 * @param {Object}   props.gameState   - État complet du jeu
 * @param {Object[]} props.worldsMeta  - WORLDS_META de TeacherDashboard
 */
function ExportSummary({ gameState, worldsMeta }) {
    const { worlds, totalStars } = gameState;
    const maxStars = worldsMeta.length * 3;
    const done = worlds.filter((w) => w.stars > 0).length;
    const allR = worlds.flatMap((w) => w.results);
    const gRate = allR.length
        ? Math.round((allR.filter((r) => r.success).length / allR.length) * 100)
        : 0;
    const today = new Date().toLocaleDateString("fr-FR", { dateStyle: "long" });

    return (
        <div
            id="fractoia-print-summary"
            style={{
                fontFamily: "'Nunito',sans-serif",
                fontSize: ".85rem",
                color: "#2d1a08",
            }}
        >
            {/* En-tête */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    borderBottom: "2px solid #e8cfa4",
                    paddingBottom: ".5rem",
                    marginBottom: "1rem",
                }}
            >
                <div>
                    <h2
                        style={{
                            fontFamily: "'Baloo 2',sans-serif",
                            fontSize: "1.25rem",
                            fontWeight: 800,
                            margin: 0,
                        }}
                    >
                        📋 FRACTOÏA — Bilan de progression
                    </h2>
                    <p
                        style={{
                            margin: ".15rem 0 0",
                            fontSize: ".75rem",
                            color: "#9c6b30",
                        }}
                    >
                        Imprimé le {today}
                    </p>
                </div>
                <div
                    style={{
                        textAlign: "right",
                        fontSize: ".75rem",
                        color: "#9c6b30",
                    }}
                >
                    <div>
                        ⭐ {totalStars}/{maxStars} étoiles
                    </div>
                    <div>
                        🗺️ {done}/{worldsMeta.length} mondes
                    </div>
                    <div>🎯 {gRate}% de réussite</div>
                </div>
            </div>

            {/* Détail par monde */}
            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: ".78rem",
                }}
            >
                <thead>
                    <tr
                        style={{
                            borderBottom: "1px solid #e8cfa4",
                            textAlign: "left",
                        }}
                    >
                        <th style={{ padding: ".3rem .5rem", fontWeight: 700 }}>
                            Monde
                        </th>
                        <th style={{ padding: ".3rem .5rem", fontWeight: 700 }}>
                            Niveau
                        </th>
                        <th
                            style={{
                                padding: ".3rem .5rem",
                                fontWeight: 700,
                                whiteSpace: "nowrap",
                            }}
                        >
                            Étoiles
                        </th>
                        <th style={{ padding: ".3rem .5rem", fontWeight: 700 }}>
                            Obstacles rencontrés
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {worldsMeta.map((meta) => {
                        const data = worlds.find((w) => w.worldId === meta.id);
                        if (!data) return null;
                        const biases = data.errorBiases ?? [];
                        return (
                            <tr
                                key={meta.id}
                                style={{ borderBottom: "1px solid #f3e9d8" }}
                            >
                                <td style={{ padding: ".3rem .5rem" }}>
                                    {meta.label}
                                </td>
                                <td
                                    style={{
                                        padding: ".3rem .5rem",
                                        color: "#9c6b30",
                                    }}
                                >
                                    {meta.level}
                                </td>
                                <td style={{ padding: ".3rem .5rem" }}>
                                    {data.unlocked
                                        ? Array.from({ length: 3 }, (_, i) =>
                                              i < data.stars ? "⭐" : "☆"
                                          ).join("")
                                        : "🔒"}
                                </td>
                                <td
                                    style={{
                                        padding: ".3rem .5rem",
                                        fontSize: ".72rem",
                                        color: "#7a5c3a",
                                    }}
                                >
                                    {biases.length > 0
                                        ? biases
                                              .map(
                                                  (b) =>
                                                      ERROR_MESSAGES[b]
                                                          ?.title ?? b
                                              )
                                              .join(", ")
                                        : data.unlocked
                                          ? "—"
                                          : ""}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {/* Suggestions pédagogiques */}
            {allR.length > 0 && (
                <div
                    style={{
                        marginTop: "1rem",
                        padding: ".625rem .75rem",
                        background: "#fffbeb",
                        border: "1px solid #fcd34d",
                        borderRadius: ".5rem",
                    }}
                >
                    <p
                        style={{
                            fontWeight: 700,
                            fontSize: ".78rem",
                            margin: "0 0 .3rem",
                        }}
                    >
                        💡 Pistes de prolongement
                    </p>
                    <ul
                        style={{
                            margin: 0,
                            paddingLeft: "1.25rem",
                            fontSize: ".72rem",
                            color: "#7a5c3a",
                        }}
                    >
                        {gRate < 60 && (
                            <li>
                                Reprendre les défis en difficulté avec
                                manipulation physique (réglettes, papier plié).
                            </li>
                        )}
                        {gRate >= 60 && gRate < 80 && (
                            <li>
                                Travailler la verbalisation : demander à l'élève
                                d'expliquer sa démarche à voix haute.
                            </li>
                        )}
                        {gRate >= 80 && (
                            <li>
                                Proposer des défis de comparaison à
                                dénominateurs différents ou des fractions > 1.
                            </li>
                        )}
                        {worlds.some((w) =>
                            (w.errorBiases ?? []).includes(
                                "larger-denom-bigger"
                            )
                        ) && (
                            <li>
                                Biais "grand dénominateur = grande fraction" :
                                utiliser des pizzas ou des barres de Cuisenaire.
                            </li>
                        )}
                        {worlds.some((w) =>
                            (w.errorBiases ?? []).includes(
                                "fraction-always-lt-1"
                            )
                        ) && (
                            <li>
                                Biais "fraction toujours &lt; 1" : placer des
                                fractions impropes sur une frise numérique
                                physique.
                            </li>
                        )}
                        {worlds.some((w) =>
                            (w.errorBiases ?? []).includes("sum-of-parts")
                        ) && (
                            <li>
                                Biais "additionner les dénominateurs" : refaire
                                des additions avec des fractions de pizza de
                                même taille.
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default ExportSummary;

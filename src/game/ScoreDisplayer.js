import React from "react";

function ScoreDisplayer(props) {
  const { game, highlightedTeam } = props;

  return (
    <div className="pb-5 text-muted">
      {game.teams.map((team, i) => (
        <React.Fragment key={team.id}>
          {i > 0 && " | "}
          <span
            className={highlightedTeam.id === team.id ? "font-weight-bold" : ""}
          >
            E{team.id}: {team.points || "-"}
          </span>
        </React.Fragment>
      ))}
    </div>
  );
}

export default ScoreDisplayer;

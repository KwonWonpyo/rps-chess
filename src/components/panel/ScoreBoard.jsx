// ScoreBoard.jsx
import React from "react";

function ScoreBoard({ scoreBoard, teamSingle }) {
  const isScissorsOnTop = teamSingle === "SCISSORS";

  return (
    <div className="scoreboard-container mx-auto flex w-full max-w-md flex-row items-center rounded-lg bg-gray-100 p-2 shadow-md">
      {/* Conditional rendering for team order */}
      {isScissorsOnTop ? (
        <>
          {/* Team Scissors Section */}
          <TeamSection
            teamName="Team Scissors"
            scores={scoreBoard.teamScissors}
            color="red"
          />
          {/* Team Papers Section */}
          <TeamSection
            teamName="Team Papers"
            scores={scoreBoard.teamPapers}
            color="blue"
          />
        </>
      ) : (
        <>
          {/* Team Papers Section */}
          <TeamSection
            teamName="Team Papers"
            scores={scoreBoard.teamPapers}
            color="blue"
          />
          {/* Team Scissors Section */}
          <TeamSection
            teamName="Team Scissors"
            scores={scoreBoard.teamScissors}
            color="red"
          />
        </>
      )}
    </div>
  );
}

function TeamSection({ teamName, scores, color }) {
  return (
    <div
      className={`team-section flex flex-col items-center justify-center bg-${color}-100 mb-2 w-full rounded-md p-2 shadow-sm`}
    >
      <h2 className={`team-title text-lg font-bold text-${color}-600 mb-1`}>
        {teamName}
      </h2>
      <div className="score-details text-center">
        {Object.entries(scores).map(([key, value]) => (
          <p key={key} className="text-sm font-medium text-gray-700">
            <span className={`font-bold text-${color}-500 capitalize`}>
              {key}:
            </span>{" "}
            {value}
          </p>
        ))}
      </div>
    </div>
  );
}

export default ScoreBoard;

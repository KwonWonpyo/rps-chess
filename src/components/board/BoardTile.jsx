import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import classNames from "classnames";
import { GameContext } from "../../store/Context";

function BoardTile(props) {
  const game = useContext(GameContext);
  const hoverPreview = game.hoverPreview;
  const { x, y, pawn } = props;

  let highlight = false;
  game.highlights.forEach((highlight_tile) => {
    if (highlight_tile.x === x && highlight_tile.y === y) highlight = true;
  });

  let label = null;
  let teamColor = "bg-gray-300"; // default fallback
  if (pawn) {
    label = pawn.value ?? "UNKNOWN";
    teamColor = pawn.team === "SCISSORS" ? "bg-red-500" : "bg-blue-500";
  }
  let pawnClass;
  switch (label) {
    case "ROCK":
      pawnClass = "rock-icon";
      break;
    case "SCISSORS":
      pawnClass = "scissors-icon";
      break;
    case "PAPER":
      pawnClass = "paper-icon";
      break;
    case "UNKNOWN":
      pawnClass = "unknown-icon";
      break;
    default:
      break;
  }

  return (
    <button
      id={props.id}
      className={classNames(
        "m-0 h-16 w-16 border border-gray-300 md:h-24 md:w-24",
        {
          "bg-amber-400 hover:bg-orange-400": highlight,
          "bg-slate-200 hover:bg-slate-300": !highlight,
        }
      )}
      onClick={props.onClick}
    >
      {pawn && (
        <>
          <div
            className={classNames(
              "flex items-center justify-center",
              "m-auto h-14 w-14 md:h-20 md:w-20",
              "outline outline-1 outline-offset-2 outline-cyan-300 hover:outline-4",
              "rounded-full",
              teamColor,
              pawnClass
            )}
          >
            {pawn?.isOpen === false && (
              <div
                className={classNames(
                  "flex items-center justify-center",
                  "m-auto h-14 w-14 md:h-20 md:w-20",
                  "unknown-icon",
                  "absolute z-10",
                  "rounded-full",
                  teamColor,
                  {
                    "hover:opacity-20 hover:transition-opacity":
                      hoverPreview && game.team_single === pawn.team,
                  }
                )}
              />
            )}
          </div>
          {props.moveHelper}
        </>
      )}
    </button>
  );
}

export default observer(BoardTile);

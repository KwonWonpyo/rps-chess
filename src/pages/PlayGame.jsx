import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { GameContext } from "../store/Context";
import Board from "../components/board/Board";
import StageTitle from "../components/panel/StageTitle";
import GuideMessage from "../components/panel/GuideMessage";
import BackToMain from "../components/buttons/BackToMain";
import GameResult from "../components/panel/GameResult";
import GuideMessage2 from "../components/panel/GuideMessage2";

function PlayGame() {
  const game = useContext(GameContext);
  const field = game.field;

  let title;
  switch (game.mode) {
    case "SINGLE_PLAY":
      title = "AI 대전";
      break;
    case "DUO_PLAY":
      title = "오프라인 대전";
      break;
    default:
      title = "대전 모드";
      break;
  }
  let message;
  if (game.mode === "SINGLE_PLAY") {
    if (game.team_single === "SCISSORS")
      message = "보자기를 하나만 잡아도 승리!";
    else if (game.team_single === "PAPER") message = "가위를 모두 잡으면 승리!";
  } else {
    message = "상대방의 심리를 읽어 승리하세요!";
  }

  const handleMove = (x, y) => {
    if (game.stage !== "PLAY") return;
    const field = game.field;

    // click highlighted pawn --> hide helper
    if (game.selectedPawn === field[x][y]) {
      game.selectPawn(undefined);
      return;
    }

    // click empty square --> hide helper
    if (field[x][y] === undefined) {
      game.selectPawn(undefined);
      return;
    }

    // click opponent's pawn --> do nothing
    if (game.xIsNext === false && field[x][y].team === "SCISSORS") return;
    else if (game.xIsNext === true && field[x][y].team === "PAPER") return;

    // otherwise, highlight this pawn
    game.selectPawn(field[x][y]);
  };

  return (
    <>
      <StageTitle title={title} />
      <GuideMessage message={message} />
      <Board field={field} onClick={handleMove} />
      <GuideMessage2 game={game} turn={game.xIsNext} />
      <BackToMain />
      <GameResult game={game} stage={game.stage} />
    </>
  );
}

export default observer(PlayGame);

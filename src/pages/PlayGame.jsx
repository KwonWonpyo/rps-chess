import { useContext } from "react";
import Board from "../components/board/Board";
import { GameContext } from "../store/Context";
import StageTitle from "../components/panel/StageTitle";
import GuideMessage from "../components/panel/GuideMessage";
import BackToMain from "../components/buttons/BackToMain";

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

  return (
    <>
      <StageTitle title={title} />
      <GuideMessage message={message} />
      <Board field={field} onClick={() => {}} />
      <div className="mb-1 animate-pulse font-mono text-orange-200">
        {game.xIsNext
          ? "Player2가 움직일 차례입니다."
          : "Player1이 움직일 차례입니다."}
      </div>
      <BackToMain />
    </>
  );
}

export default PlayGame;

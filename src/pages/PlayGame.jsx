import { useContext } from "react";
import Board from "../components/board/Board";
import { GameContext } from "../store/Context";

function PlayGame() {
  const game = useContext(GameContext);
  const field = game.field;

  return (
    <>
      <div>여기는 대전 정보 표시창 입니다.</div>
      <Board field={field} />
    </>
  );
}

export default PlayGame;

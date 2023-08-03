import { useContext } from "react";
import { GameContext } from "../store/Context";
import { Link, Outlet } from "react-router-dom";
import PawnBase from "../components/pawn/PawnBase";
import ButtonSquare2 from "../components/buttons/ButtonSquare2";

function StartPage() {
  const game = useContext(GameContext);

  const initDuoPlay = () => {
    game.initField();
    game.highlights = [];
    game.stage = "SETUP_PAPER";
    game.team_single = undefined;
    game.hoverPreview = false;

    // 초기 미리보기 세팅
    for (let m = 0; m < 2; m++) {
      for (let n = 0; n < 5; n++) {
        game.highlights.push({ x: m, y: n });
        game.field[m][n] = new PawnBase("ROCK", true, "PAPER");
      }
    }
    for (let m = 3; m < 5; m++) {
      for (let n = 0; n < 5; n++) {
        game.field[m][n] = new PawnBase("ROCK", false, "SCISSORS");
      }
    }
  };

  return (
    <>
      <Link to={"./selectPlayerNumber"}>
        <ButtonSquare2 text={"게임 시작"} onClick={() => {}} />
      </Link>
      <Link to={"./howToPlay"}>
        <ButtonSquare2 text={"게임 설명"} onClick={() => {}} />
      </Link>
      <a
        className="m-1 text-lg font-bold text-cyan-400 hover:text-green-300"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
      <Outlet />
    </>
  );
}

export default StartPage;

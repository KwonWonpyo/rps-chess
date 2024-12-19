import { useContext } from "react";
import { GameContext } from "../store/Context";
import { Link, Outlet } from "react-router-dom";
import ButtonSquare2 from "../components/buttons/ButtonSquare2";

function StartPage() {
  const game = useContext(GameContext);

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
        href="https://github.com/KwonWonpyo/rps-chess"
        target="_blank"
        rel="noopener noreferrer"
      >
        Go to GitHub
      </a>
      <Outlet />
    </>
  );
}

export default StartPage;

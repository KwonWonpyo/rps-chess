import OnePlayer from "../resource/one_player.svg";
import TwoPlayer from "../resource/two_players_ver2.svg";
import ButtonSquare1 from "../components/buttons/ButtonSquare1";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { GameContext } from "../store/Context";
import BackToLink from "../components/buttons/BackToLink";

function SelectMode() {
  const game = useContext(GameContext);

  const initSinglePlay = (stage, team) => {
    game.initField();
    game.stage = stage;

    const test_pawn = {
      isOpen: true,
      value: "ROCK",
      team: team,
    };
    // 초기 미리보기 세팅
    for (let m = 3; m < 5; m++) {
      for (let n = 0; n < 5; n++) {
        game.highlights.push({ x: m, y: n });
        game.field[m][n] = test_pawn;
      }
    }
  };

  return (
    <>
      <Link to={"../../setupSinglePlay"}>
        <ButtonSquare1
          text={"가위 팀으로 플레이"}
          svg={OnePlayer}
          alt={"play as team scissors"}
          onClick={() => initSinglePlay("SETUP_SCISSORS", "SCISSORS")}
        />
      </Link>
      <Link to={"../../setupSinglePlay"}>
        <ButtonSquare1
          text={"보자기 팀으로 플레이"}
          svg={TwoPlayer}
          alt={"play as team papar"}
          onClick={() => initSinglePlay("SETUP_PAPER", "PAPER")}
        />
      </Link>
      <BackToLink backTo={"../"} />
    </>
  );
}

export default SelectMode;

import { useContext } from "react";
import { GameContext } from "../store/Context";
import { Link } from "react-router-dom";
import OnePlayer from "../resource/one_player.svg";
import TwoPlayer from "../resource/two_players_ver2.svg";
import PawnBase from "../components/pawn/PawnBase";
import ButtonSquare1 from "../components/buttons/ButtonSquare1";
import BackToLink from "../components/buttons/BackToLink";

function SelectPlayer() {
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
      <Link to={"../singlePlay"}>
        <ButtonSquare1
          text={"1인용 플레이"}
          svg={OnePlayer}
          alt={"one player"}
        />
      </Link>
      <Link to={"/setupDuoPlay"}>
        <ButtonSquare1
          text={"2인용 플레이"}
          svg={TwoPlayer}
          alt={"two players"}
          onClick={() => initDuoPlay()}
        />
      </Link>
      <BackToLink backTo={"../"} />
    </>
  );
}

export default SelectPlayer;

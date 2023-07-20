import { Link } from "react-router-dom";
import { useContext } from "react";
import { GameContext } from "../store/Context";
import ButtonSquare2 from "../components/buttons/ButtonSquare2";
import BackToLink from "../components/buttons/BackToLink";
import PawnBase from "../components/pawn/PawnBase";

function SelectMode() {
  const game = useContext(GameContext);

  const initSinglePlay = (stage, team) => {
    game.initField();
    game.stage = stage;
    game.team_single = team;
    game.highlights = [];

    // 초기 미리보기 세팅
    for (let m = 3; m < 5; m++) {
      for (let n = 0; n < 5; n++) {
        game.highlights.push({ x: m, y: n });
        game.field[m][n] = new PawnBase("ROCK", true, team);
      }
    }
    // 마우스 호버 시 미리보기 활성화
    game.hoverPreview = true;
  };

  return (
    <>
      <div>어느 팀으로 플레이하시겠습니까?</div>
      <div className="fles flex-col">
        <Link to={"../../setupSinglePlay"}>
          <ButtonSquare2
            text={"가위팀"}
            onClick={() => initSinglePlay("SETUP_SCISSORS", "SCISSORS")}
          />
        </Link>
        <Link to={"../../setupSinglePlay"}>
          <ButtonSquare2
            text={"보자기팀"}
            onClick={() => initSinglePlay("SETUP_PAPER", "PAPER")}
          />
        </Link>
        <BackToLink backTo={"../"} />
      </div>
    </>
  );
}

export default SelectMode;

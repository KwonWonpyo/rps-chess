import { useContext } from "react";
import { observer } from "mobx-react-lite";
import Board from "../components/board/Board";
import ButtonSimple from "../components/buttons/ButtonSimple";
import GuideMessage from "../components/panel/GuideMessage";
import StageTitle from "../components/panel/StageTitle";
import { GameContext } from "../store/Context";
import BackToLink from "../components/buttons/BackToLink";

function SetupSinglePlay() {
  const game = useContext(GameContext);

  let pawnType;
  let pawnNumber;
  switch (game.stage) {
    case "SETUP_SCISSORS":
      pawnType = "가위";
      pawnNumber = "2";
      break;
    case "SETUP_PAPER":
      pawnType = "보자기";
      pawnNumber = "2";
      break;
    default:
      pawnType = "바위";
      pawnNumber = "10";
      break;
  }

  const handleSetupSinglePlay = (x, y) => {
    if (!(x === 3 || x === 4)) return;
    const field = game.field;

    if (game.stage === "SETUP_SCISSORS") {
      if (field[x][y].value === "SCISSORS") {
        field[x][y].value = "ROCK";
        game.updateField(field);
        game.numScissors -= 1;
      } else if (field[x][y].value === "ROCK") {
        if (game.numScissors === 2) {
          alert("가위는 최대 2개까지 배치할 수 있습니다");
          return;
        }
        field[x][y].value = "SCISSORS";
        game.updateField(field);
        game.numScissors += 1;
      }
    } else if (game.stage === "SETUP_PAPER") {
      if (field[x][y]?.value === "PAPER") {
        field[x][y].value = "ROCK";
        game.updateField(field);
        game.numPapers -= 1;
      } else if (field[x][y]?.value === "ROCK") {
        if (game.numPapers === 2) {
          alert("보자기는 최대 2개만 배치할 수 있습니다.");
          return;
        }
        field[x][y].value = "PAPER";
        game.updateField(field);
        game.numPapers += 1;
      }
    }
  };

  const message = (
    <span>
      노란색 칸을 선택하여 {pawnType}를 {pawnNumber}개 배치해주세요
    </span>
  );
  return (
    <>
      <StageTitle title={"배치 단계"} />
      <GuideMessage message={message} />
      <Board field={game.field} handleClick={handleSetupSinglePlay} />
      <ButtonSimple text={"준비 완료"} />
      <BackToLink backTo={"/main/singlePlay"} />
    </>
  );
}

export default observer(SetupSinglePlay);

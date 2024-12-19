import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import Board from "../components/board/Board";
import ButtonSimple from "../components/buttons/ButtonSimple";
import GuideMessage from "../components/panel/GuideMessage";
import StageTitle from "../components/panel/StageTitle";
import { GameContext } from "../store/Context";
import BackToLink from "../components/buttons/BackToLink";
import PawnBase from "../components/pawn/PawnBase";

function SetupSinglePlay() {
  const game = useContext(GameContext);
  const navigate = useNavigate();

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
        field[x][y].changeValue("ROCK");
        game.updateField(field);
        game.scoreBoard.teamScissors.scissors -= 1;
      } else if (field[x][y].value === "ROCK") {
        if (game.scoreBoard.teamScissors.scissors === 2) {
          alert("가위는 최대 2개까지 배치할 수 있습니다");
          return;
        }
        field[x][y].changeValue("SCISSORS");
        game.updateField(field);
        game.scoreBoard.teamScissors.scissors += 1;
      }
    } else if (game.stage === "SETUP_PAPER") {
      if (field[x][y]?.value === "PAPER") {
        field[x][y].changeValue("ROCK");
        game.updateField(field);
        game.scoreBoard.teamPapers.papers -= 1;
      } else if (field[x][y]?.value === "ROCK") {
        if (game.scoreBoard.teamPapers.papers === 2) {
          alert("보자기는 최대 2개만 배치할 수 있습니다.");
          return;
        }
        field[x][y].changeValue("PAPER");
        game.updateField(field);
        game.scoreBoard.teamPapers.papers += 1;
      }
    }
  };

  const placeAIOpponent = (team) => {
    // 바위 배치
    for (let m = 0; m < 2; m++) {
      for (let n = 0; n < 5; n++) {
        game.field[m][n] = new PawnBase("ROCK", false, team);
      }
    }

    // 가위 또는 보자기를 랜덤 배치
    const x1 = Math.floor(Math.random() * 2); // 0~1
    const y1 = Math.floor(Math.random() * 5); // 0~4
    let x2 = Math.floor(Math.random() * 2);
    let y2 = Math.floor(Math.random() * 5);
    game.field[x1][y1].changeValue(team);
    while (x1 === x2 && y1 === y2) {
      x2 = Math.floor(Math.random() * 2);
      y2 = Math.floor(Math.random() * 5);
    }
    game.field[x2][y2].changeValue(team);
  };

  const handleReady = () => {
    if (game.stage === "SETUP_SCISSORS") {
      if (game.scoreBoard.teamScissors.scissors !== 2) {
        alert("가위를 2개 배치해야 합니다.");
      } else {
        game.field[3].forEach((pawn) => {
          pawn.setOpen(false);
        });
        game.field[4].forEach((pawn) => {
          pawn.setOpen(false);
        });
        game.mode = "SINGLE_PLAY";
        game.highlights = [];
        game.xIsNext = false;
        game.team_single = "SCISSORS";
        game.team_AI = "PAPER";
        placeAIOpponent("PAPER");
        game.updateScore();
        game.changeStage("PLAY");
        navigate("../game");
      }
    } else if (game.stage === "SETUP_PAPER") {
      if (game.scoreBoard.teamPapers.papers !== 2) {
        alert("보자기를 2개 배치해야 합니다.");
      } else {
        game.field[3].forEach((pawn) => {
          pawn.setOpen(false);
        });
        game.field[4].forEach((pawn) => {
          pawn.setOpen(false);
        });
        game.mode = "SINGLE_PLAY";
        game.highlights = [];
        game.xIsNext = false;
        game.team_single = "PAPER";
        game.team_AI = "SCISSORS";
        placeAIOpponent("SCISSORS");
        game.updateScore();
        game.changeStage("PLAY");
        navigate("../game");
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
      <Board field={game.field} onClick={handleSetupSinglePlay} />
      <ButtonSimple text={"준비 완료"} onClick={handleReady} />
      <BackToLink
        backTo={"/rps-chess/singlePlay"}
        text={"팀 선택으로 돌아가기"}
      />
    </>
  );
}

export default observer(SetupSinglePlay);

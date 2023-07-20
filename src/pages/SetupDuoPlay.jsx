import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import Board from "../components/board/Board";
import ButtonSimple from "../components/buttons/ButtonSimple";
import GuideMessage from "../components/panel/GuideMessage";
import StageTitle from "../components/panel/StageTitle";
import { GameContext } from "../store/Context";
import BackToLink from "../components/buttons/BackToLink";

function SetupDuoPlay() {
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

  const handleSetupDuoPlay = (x, y) => {
    const field = game.field;

    if (game.stage === "SETUP_SCISSORS") {
      if (!(x === 3 || x === 4)) return;
      if (field[x][y].value === "SCISSORS") {
        field[x][y].value = "ROCK";
        game.updateField(field);
        game.scoreBoard.teamScissors.scissors -= 1;
      } else if (field[x][y].value === "ROCK") {
        if (game.scoreBoard.teamScissors.scissors === 2) {
          alert("가위는 최대 2개까지 배치할 수 있습니다");
          return;
        }
        field[x][y].value = "SCISSORS";
        game.updateField(field);
        game.scoreBoard.teamScissors.scissors += 1;
      }
    } else if (game.stage === "SETUP_PAPER") {
      if (!(x === 0 || x === 1)) return;
      if (field[x][y]?.value === "PAPER") {
        field[x][y].value = "ROCK";
        game.updateField(field);
        game.scoreBoard.teamPapers.papers -= 1;
      } else if (field[x][y]?.value === "ROCK") {
        if (game.scoreBoard.teamPapers.papers === 2) {
          alert("보자기는 최대 2개만 배치할 수 있습니다.");
          return;
        }
        field[x][y].value = "PAPER";
        game.updateField(field);
        game.scoreBoard.teamPapers.papers += 1;
      }
    }
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
        game.mode = "DUO_PLAY";
        game.stage = "PLAY";
        game.highlights = [];
        navigate("../game");
      }
    } else if (game.stage === "SETUP_PAPER") {
      if (game.scoreBoard.teamPapers.papers !== 2) {
        alert("보자기를 2개 배치해야 합니다.");
      } else {
        game.highlights = [];
        game.field[0].forEach((pawn) => {
          pawn.setOpen(false);
        });
        game.field[1].forEach((pawn) => {
          pawn.setOpen(false);
        });
        game.field[3].forEach((pawn, index) => {
          pawn.setOpen(true);
          game.highlights.push({ x: 3, y: index });
        });
        game.field[4].forEach((pawn, index) => {
          pawn.setOpen(true);
          game.highlights.push({ x: 4, y: index });
        });
        game.stage = "SETUP_SCISSORS";
      }
    }
  };

  const title = game.stage === "SETUP_PAPER" ? "Player1 배치" : "Player2 배치";
  const message = (
    <span>
      노란색 칸을 선택하여 {pawnType}를 {pawnNumber}개 배치해주세요
    </span>
  );
  return (
    <>
      <StageTitle title={title} />
      <GuideMessage message={message} />
      <Board field={game.field} onClick={handleSetupDuoPlay} />
      <ButtonSimple text={"준비 완료"} onClick={handleReady} />
      <BackToLink backTo={"/main"} />
    </>
  );
}

export default observer(SetupDuoPlay);
